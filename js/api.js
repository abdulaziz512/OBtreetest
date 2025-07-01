export function fetchFamily() {
  return fetch('/api/family').then(res => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

export function fetchStats() {
  return fetch('/api/stats').then(res => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

export function saveFamily(data) {
  const token = localStorage.getItem('authToken');
  return fetch('/api/family', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            alert('انتهت صلاحية الجلسة أو غير مصرح لك. يرجى تسجيل الدخول مرة أخرى.');
            window.location.href = 'admin.html';
        }
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

export function adminLogin(username, password) {
  return fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

export function uploadAvatar(file) {
  const token = localStorage.getItem('authToken');
  const formData = new FormData();
  formData.append('avatar', file);
  return fetch('/api/upload', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token },
    body: formData
  }).then(res => {
    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            alert('انتهت صلاحية الجلسة أو غير مصرح لك. يرجى تسجيل الدخول مرة أخرى.');
            window.location.href = 'admin.html';
        }
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

export async function submitRequest(type, requestData, avatarFile = null) {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('requestData', JSON.stringify(requestData));

  if (avatarFile) {
    formData.append('avatar', avatarFile);
  }

  const response = await fetch('/api/requests', {
    method: 'POST',
    body: formData
  });

  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.message || `HTTP error! status: ${response.status}`);
    error.data = responseData;
    throw error;
  }

  return responseData;
}

export function fetchRequests(status = 'pending') {
    const token = localStorage.getItem('authToken');
    return fetch(`/api/admin/requests?status=${status}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => {
        if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
                alert('انتهت صلاحية الجلسة أو غير مصرح لك. يرجى تسجيل الدخول مرة أخرى.');
                window.location.href = 'login.html';
            }
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    });
}

export function processRequest(requestId, action, responseMessage = null, updatedData = null) {
    const token = localStorage.getItem('authToken');
    return fetch(`/api/admin/requests/${requestId}/process`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({ action, responseMessage, updatedData })
    }).then(res => {
        if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
                alert('انتهت صلاحية الجلسة أو غير مصرح لك. يرجى تسجيل الدخول مرة أخرى.');
                window.location.href = 'login.html';
            }
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    });
}

export function directAddMember(parentId, newMember) {
    const token = localStorage.getItem('authToken');
    return fetch('/api/admin/direct-add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ parentId, newMember })
    }).then(res => {
        if(!res.ok) throw new Error("فشل إضافة العضو");
        return res.json();
    });
}

export function directEditMember(memberId, newName, newAvatar, isDeceased, birthYear, noChildrenContext) {
    const token = localStorage.getItem('authToken');
    return fetch('/api/admin/direct-edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ memberId, newName, newAvatar, isDeceased, birthYear, noChildrenContext })
    }).then(res => {
        if(!res.ok) throw new Error("فشل تعديل العضو");
        return res.json();
    });
}

export function directDeleteMember(memberId) {
    const token = localStorage.getItem('authToken');
    return fetch('/api/admin/direct-delete', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ memberId })
    }).then(res => {
        if(!res.ok) throw new Error("فشل حذف العضو");
        return res.json();
    });
}

// ========= دوال API الجديدة الخاصة بالقصائد =========
export function fetchAllPoems() {
    const token = localStorage.getItem('authToken');
    return fetch('/api/poems', {
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => res.json());
}

export function addPoem(poemData) {
    const token = localStorage.getItem('authToken');
    return fetch('/api/poems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(poemData)
    }).then(res => res.json());
}

export function deletePoem(poemId) {
    const token = localStorage.getItem('authToken');
    return fetch(`/api/poems/${poemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => res.json());
}

export function fetchPoemsForMember(memberId) {
    return fetch(`/api/members/${memberId}/poems`).then(res => res.json());
}