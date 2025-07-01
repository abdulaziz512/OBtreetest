require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// --- تعريف المسارات ---
const DATA_PATH = path.join(__dirname, '..', 'data', 'family.json');
const STATIC_PATH = path.join(__dirname, '..');
const UPLOADS_PATH = path.join(__dirname, '..', 'assets', 'uploads');

// --- إعدادات Express ---
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(STATIC_PATH));
app.use('/assets/uploads', express.static(UPLOADS_PATH));


// --- المتغيرات البيئية ---
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PLAIN_PASSWORD = process.env.ADMIN_PLAIN_PASSWORD;
let ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = '1h';
const MONGODB_URI = process.env.MONGODB_URI;

// --- الاتصال بقاعدة البيانات ---
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- تعريف نماذج Mongoose ---
const memberSchema = new mongoose.Schema({
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    name: { type: String, required: true },
    avatar: { type: String, default: 'assets/images/test.jpeg' },
    isDeceased: { type: Boolean, default: false },
    birthYear: { type: Number },
    noChildrenContext: { type: String, default: 'DEFAULT' },
    children: []
});
memberSchema.add({ children: [memberSchema] });
const Member = mongoose.model('Member', memberSchema);

const poemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    poet: { type: String, ref: 'Member', required: true },
}, { timestamps: true });
const Poem = mongoose.model('Poem', poemSchema);

const requestSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['add', 'edit', 'delete'] },
    status: { type: String, required: true, default: 'pending', enum: ['pending', 'approved', 'rejected', 'modified_and_approved'] },
    requesterInfo: { ip: { type: String } },
    requestData: { type: mongoose.Schema.Types.Mixed, required: true },
    responseMessage: { type: String },
    processedBy: { type: String },
    processedAt: { type: Date }
}, { timestamps: true });
const Request = mongoose.model('Request', requestSchema);

// --- دوال مساعدة ---
function findMemberRecursive(members, memberId) {
    for (const member of members) {
        if (member._id.toString() === memberId.toString()) return member;
        if (member.children && member.children.length > 0) {
            const found = findMemberRecursive(member.children, memberId);
            if (found) return found;
        }
    }
    return null;
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
bcrypt.hash(ADMIN_PLAIN_PASSWORD, 10, (err, hash) => { ADMIN_PASSWORD_HASH = hash; });


// =================================================================
// ========================== واجهات API ===========================
// =================================================================

app.get('/api/family', async (req, res) => {
    try {
        const familyMembers = await Member.find({}).lean();
        const poems = await Poem.find({}).select('poet').lean();
        
        const membersWithPoems = new Set();
        poems.forEach(poem => {
            membersWithPoems.add(poem.poet.toString());
        });

        function markMembersWithPoems(members) {
            for (const member of members) {
                if (membersWithPoems.has(member._id.toString())) {
                    member.hasPoems = true;
                }
                if (member.children && member.children.length > 0) {
                    markMembersWithPoems(member.children);
                }
            }
        }

        markMembersWithPoems(familyMembers);
        res.json(familyMembers);
    } catch (err) {
        res.status(500).json({ error: 'خطأ في قراءة البيانات من قاعدة البيانات' });
    }
});

app.get('/api/stats', async (req, res) => {
    try {
        const roots = await Member.find({});
        let totalCount = 0, maxDepth = 0, livingCount = 0, deceasedCount = 0;
        const nameCounts = {};
        let allMembersForAgeCalc = [];

        function traverse(node, depth) {
            if (!node) return;
            totalCount++;
            if (depth > maxDepth) maxDepth = depth;
            nameCounts[node.name] = (nameCounts[node.name] || 0) + 1;
            node.isDeceased ? deceasedCount++ : livingCount++;
            allMembersForAgeCalc.push(node);
            if (node.children && node.children.length > 0) {
                node.children.forEach(child => traverse(child, depth + 1));
            }
        }
        
        roots.forEach(root => traverse(root, 1));
        
        const oldestMembers = allMembersForAgeCalc
            .filter(member => !member.isDeceased && member.birthYear)
            .sort((a, b) => a.birthYear - b.birthYear)
            .slice(0, 5)
            .map(member => ({ name: member.name, birthYear: member.birthYear }));

        const mostCommonNames = Object.entries(nameCounts)
            .sort(([,a],[,b]) => b - a)
            .map(([name, count]) => ({ name, count }));

        res.json({
            totalMembers: totalCount,
            generations: maxDepth,
            mostCommonNames,
            living: livingCount,
            deceased: deceasedCount,
            oldestMembers: oldestMembers
        });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم عند جلب الإحصائيات' });
    }
});

// === واجهات API الجديدة الخاصة بالقصائد ===
app.get('/api/poems', authenticateToken, async (req, res) => {
    try {
        const poems = await Poem.find().populate('poet', 'name').sort({ createdAt: -1 });
        res.json(poems);
    } catch (error) { res.status(500).json({ message: "فشل جلب القصائد" }); }
});

app.post('/api/poems', authenticateToken, async (req, res) => {
    try {
        const { title, content, poet } = req.body;
        if(!title || !content || !poet) return res.status(400).json({ message: "الرجاء تعبئة جميع الحقول" });
        const newPoem = new Poem({ title, content, poet });
        await newPoem.save();
        io.emit('familyUpdate');
        res.status(201).json({ success: true, message: 'تمت إضافة القصيدة بنجاح' });
    } catch (error) { res.status(400).json({ message: "فشل إضافة القصيدة", error }); }
});

app.delete('/api/poems/:id', authenticateToken, async (req, res) => {
    try {
        await Poem.findByIdAndDelete(req.params.id);
        io.emit('familyUpdate');
        res.json({ success: true, message: 'تم حذف القصيدة بنجاح' });
    } catch (error) { res.status(500).json({ message: "فشل حذف القصيدة" }); }
});

app.get('/api/members/:id/poems', async (req, res) => {
    try {
        const poems = await Poem.find({ poet: req.params.id }).select('title content');
        res.json(poems);
    } catch (error) { res.status(500).json({ message: "فشل جلب قصائد العضو" }); }
});

// === بقية واجهات API ===
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    if (username !== ADMIN_USERNAME) {
        return res.status(401).json({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }
    try {
        const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        if (match) {
            const token = jwt.sign({ username: ADMIN_USERNAME, role: 'admin' }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'حدث خطأ أثناء تسجيل الدخول' });
    }
});

const uploadRequestAvatar = multer({ dest: UPLOADS_PATH });
app.post('/api/requests', uploadRequestAvatar.single('avatar'), async (req, res) => {
    try {
        const { type, requestData } = req.body;
        if (!requestData || !type) return res.status(400).json({ success: false, message: 'بيانات الطلب ناقصة.' });

        const parsedData = JSON.parse(requestData);
        if (req.file) {
            const avatarPath = `assets/uploads/${req.file.filename}`;
            if (type === 'add') parsedData.newMember.avatar = avatarPath;
            else if (type === 'edit') parsedData.newAvatar = avatarPath;
        }

        const newRequest = new Request({
            type,
            requestData: parsedData,
            requesterInfo: { ip: req.ip }
        });

        await newRequest.save();
        res.json({ success: true, message: 'تم إرسال طلبك بنجاح. سيتم مراجعته.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'فشل إرسال الطلب.' });
    }
});

app.get('/api/admin/requests', authenticateToken, async (req, res) => {
    try {
        const requests = await Request.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ success: false, message: 'فشل جلب الطلبات.' });
    }
});

app.put('/api/admin/requests/:id/process', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { action, updatedData } = req.body;
        const request = await Request.findById(id);

        if (!request || request.status !== 'pending') {
            return res.status(404).json({ success: false, message: 'الطلب غير موجود أو تمت معالجته.' });
        }

        if (action === 'approved') {
            const familyMembers = await Member.find({}).lean();
            let dataToUse = JSON.parse(JSON.stringify(request.requestData));

            if (updatedData) {
                if (request.type === 'add' && updatedData.newMember) dataToUse.newMember.name = updatedData.newMember.name;
                if (request.type === 'edit' && updatedData.newName) dataToUse.newName = updatedData.newName;
            }

            let modificationSuccess = false;
            if (request.type === 'add') {
                const parent = findMemberRecursive(familyMembers, dataToUse.parentId);
                if (parent) {
                    parent.children.push({ ...dataToUse.newMember, _id: new mongoose.Types.ObjectId().toString(), children: [] });
                    modificationSuccess = true;
                }
            } else if (request.type === 'edit') {
                const member = findMemberRecursive(familyMembers, dataToUse.memberId);
                if (member) {
                    member.name = dataToUse.newName;
                    if (dataToUse.newAvatar) member.avatar = dataToUse.newAvatar;
                    modificationSuccess = true;
                }
            } else if (request.type === 'delete') {
                const findAndRemove = (nodes, memberId) => {
                    for (let i = nodes.length - 1; i >= 0; i--) {
                        if (nodes[i]._id.toString() === memberId) {
                            nodes.splice(i, 1);
                            return true;
                        }
                        if (nodes[i].children && findAndRemove(nodes[i].children, memberId)) return true;
                    }
                    return false;
                };
                if (findAndRemove(familyMembers, dataToUse.memberId)) modificationSuccess = true;
            }

            if (modificationSuccess) {
                await Member.deleteMany({});
                await Member.insertMany(familyMembers);
                request.status = updatedData ? 'modified_and_approved' : 'approved';
                io.emit('familyUpdate');
            } else {
                request.status = 'rejected';
                request.responseMessage = 'فشل التطبيق: لم يتم العثور على العضو المطلوب في الشجرة.';
            }

        } else if (action === 'rejected') {
            request.status = 'rejected';
            request.responseMessage = 'تم رفض الطلب.';
        }
        
        request.processedBy = req.user.username;
        request.processedAt = new Date();
        await request.save();

        res.json({ success: true, message: 'تمت معالجة الطلب بنجاح.' });
    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم.' });
    }
});

app.post('/api/admin/direct-add', authenticateToken, async (req, res) => {
    try {
        const { parentId, newMember } = req.body;
        const familyMembers = await Member.find({}).lean();
        const parent = findMemberRecursive(familyMembers, parentId);
        if (!parent) return res.status(404).json({ message: 'الأب غير موجود.' });

        parent.children.push({ ...newMember, _id: new mongoose.Types.ObjectId().toString(), children: [], isDeceased: false });
        await Member.deleteMany({});
        await Member.insertMany(familyMembers);
        io.emit('familyUpdate');
        res.json({ success: true });
    } catch (err) { res.status(500).json({ message: 'خطأ في الخادم' }); }
});

app.put('/api/admin/direct-edit', authenticateToken, async (req, res) => {
    try {
        const { memberId, newName, newAvatar, isDeceased, birthYear, noChildrenContext } = req.body;
        const familyMembers = await Member.find({}).lean();
        const member = findMemberRecursive(familyMembers, memberId);
        if (!member) return res.status(404).json({ message: 'العضو غير موجود.' });

        member.name = newName;
        member.isDeceased = isDeceased;
        member.birthYear = birthYear ? Number(birthYear) : null;
        member.noChildrenContext = noChildrenContext || 'DEFAULT';
        if (newAvatar) member.avatar = newAvatar;
        
        await Member.deleteMany({});
        await Member.insertMany(familyMembers);
        io.emit('familyUpdate');
        res.json({ success: true });
    } catch (err) { 
        console.error("Error in direct-edit:", err);
        res.status(500).json({ message: 'خطأ في الخادم' }); 
    }
});

app.post('/api/admin/direct-delete', authenticateToken, async (req, res) => {
    try {
        const { memberId } = req.body;
        let familyMembers = await Member.find({}).lean();
        
        const findAndRemove = (nodes, id) => {
            for (let i = nodes.length - 1; i >= 0; i--) {
                if (nodes[i]._id.toString() === id) {
                    nodes.splice(i, 1);
                    return true;
                }
                if (nodes[i].children && findAndRemove(nodes[i].children, id)) return true;
            }
            return false;
        };

        if (!findAndRemove(familyMembers, memberId)) {
            return res.status(404).json({ message: 'العضو غير موجود.' });
        }

        await Member.deleteMany({});
        await Member.insertMany(familyMembers);
        io.emit('familyUpdate');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: 'خطأ في الخادم' });
    }
});

// --- المسارات النهائية ---
app.get('*', (req, res) => {
    res.sendFile(path.join(STATIC_PATH, 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('FamilyTree server running on port', PORT));
io.on('connection', (socket) => console.log('A user connected via WebSockets'));