import { fetchFamily, saveFamily, fetchRequests, processRequest, directAddMember, directEditMember, directDeleteMember, fetchAllPoems, addPoem, deletePoem } from './api.js';
import { verifyAuth } from './auth-utils.js';

if (!verifyAuth()) {}

let familyData = [];

function getFlatFamilyList(nodes) {
    const flatList = [];
    function traverse(node, ancestors = []) {
        if (!node) return;
        const ancestorNames = ancestors.map(a => a.name).reverse();
        const fullName = [node.name, ...ancestorNames].join(' بن ');
        flatList.push({ 
            id: node._id, 
            name: node.name, 
            fullName, 
            isDeceased: node.isDeceased || false,
            birthYear: node.birthYear,
            noChildrenContext: node.noChildrenContext || 'DEFAULT'
        });
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => traverse(child, [...ancestors, node]));
        }
    }
    nodes.forEach(root => traverse(root));
    return flatList;
}

function populateMemberSelects(flatList) {
    const selects = [
        document.getElementById('add-parent-select'),
        document.getElementById('edit-member-select'),
        document.getElementById('remove-member-select'),
        document.getElementById('poem-poet-select')
    ];
    
    selects.forEach(select => {
        if (!select) return;
        const currentVal = select.value;
        const defaultOptionText = select.id === 'poem-poet-select' ? '-- اختر الشاعر --' : '-- اختر عضواً --';
        select.innerHTML = `<option value="" disabled selected>${defaultOptionText}</option>`;
        flatList.sort((a, b) => a.fullName.localeCompare(b.fullName, 'ar')).forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = member.fullName;
            option.dataset.name = member.name;
            option.dataset.isDeceased = member.isDeceased;
            option.dataset.birthYear = member.birthYear || '';
            option.dataset.noChildrenContext = member.noChildrenContext;
            select.appendChild(option);
        });
        select.value = currentVal;
    });
}

function showTab(tabId) {
    // ======== السطر الذي تم تصحيحه ========
    document.querySelectorAll('#admin-panel > form, #admin-panel > div:not(.tabs):not(#admin-message):not(.data-editor-section)').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    // ======== نهاية التصحيح ========

    document.querySelectorAll('.tabs button').forEach(button => {
        button.classList.remove('active');
    });

    const elementToShow = document.getElementById(`${tabId}-form`);
    if (elementToShow) {
        if (elementToShow.tagName === 'FORM') {
            elementToShow.style.display = 'flex';
        } else {
            elementToShow.style.display = 'block';
        }
        elementToShow.classList.add('active');
    }
    
    const buttonToShow = document.getElementById(`tab-${tabId}`);
    if (buttonToShow) {
        buttonToShow.classList.add('active');
    }
}

function getRequestTypeText(type) {
    const types = { add: 'طلب إضافة', edit: 'طلب تعديل', delete: 'طلب حذف' };
    return types[type] || type;
}

async function handleRequestAction(requestId, action, updatedData = null) {
    try {
        const result = await processRequest(requestId, action, null, updatedData);
        alert(result.message || 'تمت معالجة الطلب بنجاح.');
        await loadRequests();
    } catch (error) {
        alert('فشل في معالجة الطلب: ' + (error.message || 'خطأ غير معروف'));
    }
}

function openModifyModal(request) {
    const modal = document.getElementById('modify-request-modal');
    const form = document.getElementById('modify-request-form');
    const container = document.getElementById('modify-fields-container');

    if (!modal || !form || !container) {
        return;
    }

    form.reset();
    container.innerHTML = '';

    document.getElementById('modify-request-id').value = request._id;
    document.getElementById('modify-request-type').value = request.type;

    const data = request.requestData;

    if (request.type === 'add') {
        const parentName = data.parentName || 'غير محدد';
        container.innerHTML = `<div><label>اسم الأب:</label><input type="text" value="${parentName}" disabled></div><div><label>اسم الابن الجديد:</label><input type="text" id="mod-new-name" value="${data.newMember.name}" required></div>`;
    } else if (request.type === 'edit') {
        container.innerHTML = `<div><label>الاسم الحالي:</label><input type="text" value="${data.oldName}" disabled></div><div><label>الاسم الجديد المقترح:</label><input type="text" id="mod-new-name" value="${data.newName}" required></div>`;
    } else {
        alert('لا يمكن تعديل طلبات الحذف، يمكنك فقط الموافقة أو الرفض.');
        return;
    }
    
    modal.style.display = 'flex';
}

async function loadRequests() {
    const listDiv = document.getElementById('requests-list');
    listDiv.innerHTML = '<p class="loading-requests">جاري تحميل الطلبات...</p>';
    
    try {
        const requests = await fetchRequests();
        listDiv.innerHTML = requests.length === 0 ? '<p>لا توجد طلبات معلقة.</p>' : '';
        
        requests.forEach(request => {
            const card = document.createElement('div');
            card.className = 'request-card';
            const data = request.requestData;
            let bodyHtml = '';

            if (request.type === 'add') {
                bodyHtml = `<div class="detail-item"><strong>الأب:</strong> ${data.parentName}</div><div class="detail-item"><strong>الاسم الجديد:</strong> ${data.newMember.name}</div>`;
            } else if (request.type === 'edit') {
                bodyHtml = `<div class="detail-item"><strong>الاسم الحالي:</strong> ${data.oldName}</div><div class="detail-item"><strong>الاسم الجديد:</strong> ${data.newName}</div>`;
            } else if (request.type === 'delete') {
                bodyHtml = `<div class="detail-item"><strong>العضو المطلوب حذفه:</strong> ${data.memberName}</div>`;
            }

            card.innerHTML = `<div class="request-header"><span class="request-type ${request.type}">${getRequestTypeText(request.type)}</span></div><div class="request-body">${bodyHtml}</div><div class="request-actions"><button class="approve-btn" data-id="${request._id}">موافقة</button><button class="reject-btn" data-id="${request._id}">رفض</button>${request.type !== 'delete' ? `<button class="modify-btn" data-id="${request._id}">تعديل وموافقة</button>` : ''}</div>`;
            listDiv.appendChild(card);
        });

        listDiv.querySelectorAll('.approve-btn').forEach(btn => btn.onclick = () => handleRequestAction(btn.dataset.id, 'approved'));
        listDiv.querySelectorAll('.reject-btn').forEach(btn => btn.onclick = () => handleRequestAction(btn.dataset.id, 'rejected'));
        listDiv.querySelectorAll('.modify-btn').forEach(btn => {
            btn.onclick = () => {
                const requestToModify = requests.find(r => r._id === btn.dataset.id);
                if (requestToModify) openModifyModal(requestToModify);
            };
        });

    } catch (error) {
        listDiv.innerHTML = '<p class="error">فشل تحميل الطلبات.</p>';
    }
}

async function loadPoemsAdmin() {
    const container = document.getElementById('poems-list-container');
    container.innerHTML = '<p>جاري تحميل القصائد...</p>';
    try {
        const poems = await fetchAllPoems();
        if (!poems || poems.length === 0) {
            container.innerHTML = '<p>لم تتم إضافة أي قصائد بعد.</p>';
            return;
        }
        container.innerHTML = '';
        poems.forEach(poem => {
            const poemDiv = document.createElement('div');
            poemDiv.className = 'poem-item';
            poemDiv.innerHTML = `
                <h4>${poem.title}</h4>
                <div class="poem-item-author">الشاعر: ${poem.poet ? poem.poet.name : 'غير معروف'}</div>
                <div class="poem-item-content">${poem.content}</div>
                <div class="poem-item-actions">
                    <button class="delete-poem-btn" data-id="${poem._id}">حذف</button>
                </div>
            `;
            container.appendChild(poemDiv);
        });

        container.querySelectorAll('.delete-poem-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const poemId = e.target.dataset.id;
                if (confirm('هل أنت متأكد من حذف هذه القصيدة؟')) {
                    const result = await deletePoem(poemId);
                    alert(result.message);
                    loadPoemsAdmin();
                }
            });
        });
    } catch (error) {
        container.innerHTML = '<p class="error">فشل تحميل القصائد.</p>';
    }
}

async function loadData() {
    const adminMessage = document.getElementById('admin-message');
    adminMessage.textContent = 'جاري تحميل البيانات...';
    try {
        familyData = await fetchFamily();
        
        const dataEditor = document.getElementById('data-editor');
        if(dataEditor) dataEditor.value = JSON.stringify(familyData, null, 2);

        const flatList = getFlatFamilyList(familyData);
        populateMemberSelects(flatList);

        adminMessage.textContent = 'تم تحميل البيانات بنجاح.';
    } catch (error) {
        adminMessage.textContent = 'خطأ في تحميل البيانات.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.tabs button').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.id.replace('tab-', '');
            showTab(tabId);
            if (tabId === 'requests') { loadRequests(); }
            if (tabId === 'poems') { loadPoemsAdmin(); }
        });
    });

    loadData();
    showTab('add');

    document.getElementById('add-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const parentId = document.getElementById('add-parent-select').value;
        const newMember = {
            name: document.getElementById('new-name').value,
            avatar: document.getElementById('new-avatar-url').value || 'assets/images/test.jpeg',
            birthYear: document.getElementById('add-birth-year').value || null
        };
        try {
            await directAddMember(parentId, newMember);
            alert('تم إضافة العضو بنجاح');
            document.getElementById('add-form').reset();
            await loadData();
        } catch(err) {
            alert('فشل إضافة العضو: ' + err.message);
        }
    });

    document.getElementById('edit-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const memberId = document.getElementById('edit-member-select').value;
        const newName = document.getElementById('edit-new-name').value;
        const newAvatar = document.getElementById('edit-new-avatar-url').value;
        const isDeceased = document.getElementById('edit-is-deceased').checked;
        const birthYear = document.getElementById('edit-birth-year').value;
        const noChildrenContext = document.getElementById('edit-no-children-context').value;
        try {
            await directEditMember(memberId, newName, newAvatar, isDeceased, birthYear, noChildrenContext);
            alert('تم تعديل العضو بنجاح');
            document.getElementById('edit-form').reset();
            await loadData();
        } catch(err) {
            alert('فشل تعديل العضو: ' + err.message);
        }
    });

    document.getElementById('remove-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!confirm("هل أنت متأكد من أنك تريد حذف هذا العضو وجميع فروعه؟")) return;
        const memberId = document.getElementById('remove-member-select').value;
        try {
            await directDeleteMember(memberId);
            alert('تم حذف العضو بنجاح');
            await loadData();
        } catch(err) {
            alert('فشل حذف العضو: ' + err.message);
        }
    });

    document.getElementById('save-all-btn')?.addEventListener('click', async () => {
        if (!confirm("هل أنت متأكد من حفظ التغييرات؟ هذا سيقوم بالكتابة فوق كل بيانات الشجرة الحالية.")) return;
        const dataEditor = document.getElementById('data-editor');
        try {
            const dataToSave = JSON.parse(dataEditor.value);
            await saveFamily(dataToSave);
            alert('تم حفظ بيانات الشجرة بنجاح.');
            await loadData();
        } catch (error) {
            alert('خطأ في تنسيق JSON أو فشل الحفظ.');
        }
    });
    
    document.getElementById('modify-request-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const requestId = document.getElementById('modify-request-id').value;
        const requestType = document.getElementById('modify-request-type').value;
        
        let updatedData = {};
        const modNewNameInput = document.getElementById('mod-new-name');
        if (modNewNameInput && modNewNameInput.value) {
            if (requestType === 'add') {
                updatedData.newMember = { name: modNewNameInput.value };
            } else if (requestType === 'edit') {
                updatedData.newName = modNewNameInput.value;
            }
        }

        await handleRequestAction(requestId, 'approved', updatedData);
        document.getElementById('modify-request-modal').style.display = 'none';
    });

    document.querySelector('.close-modal-btn[data-modal="modify-request-modal"]')?.addEventListener('click', () => {
        document.getElementById('modify-request-modal').style.display = 'none';
    });

    document.getElementById('edit-member-select')?.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        document.getElementById('edit-new-name').value = selectedOption.dataset.name;
        document.getElementById('edit-is-deceased').checked = selectedOption.dataset.isDeceased === 'true';
        document.getElementById('edit-birth-year').value = selectedOption.dataset.birthYear;
        document.getElementById('edit-no-children-context').value = selectedOption.dataset.noChildrenContext || 'DEFAULT';
    });

    document.getElementById('edit-is-deceased')?.addEventListener('change', (e) => {
        const contextSelect = document.getElementById('edit-no-children-context');
        if (e.target.checked) {
            if (contextSelect.value === 'DEFAULT') {
                contextSelect.value = 'HISTORICAL_FINAL';
            }
        }
    });

    document.getElementById('poem-submission-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const poemData = {
            title: document.getElementById('poem-title').value,
            content: document.getElementById('poem-content').value,
            poet: document.getElementById('poem-poet-select').value,
        };

        if (!poemData.title || !poemData.content || !poemData.poet) {
            alert("الرجاء تعبئة جميع الحقول.");
            return;
        }

        try {
            const result = await addPoem(poemData);
            alert(result.message);
            if (result.success) {
                document.getElementById('poem-submission-form').reset();
                loadPoemsAdmin();
            }
        } catch(err) {
            alert("حدث خطأ أثناء إضافة القصيدة.");
            console.error("Add poem error:", err);
        }
    });
});