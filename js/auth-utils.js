// js/auth-utils.js
// لا يمكن استخدام jwt.verify هنا مباشرة لأنها وظيفة خاصة بـ Node.js
// سنكتفي بالتحقق من وجود التوكن وانتهاء صلاحيته (إذا كان توكن JWT).
// في تطبيقات الإنتاج، يجب أن يتم التحقق الكامل من التوكن بواسطة الخادم في كل طلب.

export function verifyAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }

    try {
        // فك تشفير الجزء الثاني (payload) من التوكن
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const tokenData = JSON.parse(atob(base64));

        // التحقق من تاريخ انتهاء الصلاحية
        if (tokenData.exp * 1000 < Date.now()) {
            localStorage.removeItem('authToken');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
        return false;
    }
}