import { adminLogin } from './api.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('error-message');

    try {
        const res = await adminLogin(username, password);

        if (res.success) {
            localStorage.setItem('authToken', res.token);
            window.location.href = 'admin.html';
        } else {
            errorMessageDiv.textContent = res.message || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.';
        }
    } catch (error) {
        console.error("Login request failed:", error);
        errorMessageDiv.textContent = 'حدث خطأ في الاتصال بالخادم.';
    }
});