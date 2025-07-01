import { fetchFamily, submitRequest, fetchStats, fetchPoemsForMember } from './api.js';

let familyData = [];
let openPath = [];
let allNames = [];
let treeRoots = [];

const socket = io();

let currentParentForAddChild = null; 
let currentMemberForEdit = null;
let currentMemberForDelete = null;
let fullCommonNamesList = [];

function showModalMessage(modalId, message, isError = false) {
    const messageDiv = document.getElementById(`${modalId}-message`);
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.className = 'modal-message';
    messageDiv.classList.add(isError ? 'error' : 'success');
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'modal-message';
    }, 5000);
}

function closeRequestModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        const form = modal.querySelector('form');
        if (form) form.reset();
        const messageDiv = document.getElementById(`${modalId}-message`);
        if(messageDiv) {
            messageDiv.style.display = 'none';
            messageDiv.className = 'modal-message';
        }
        currentParentForAddChild = null;
        currentMemberForEdit = null;
        currentMemberForDelete = null;
    }
}

document.getElementById('add-child-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newChildName = document.getElementById('new-child-name').value;
    const newChildAvatarFile = document.getElementById('new-child-avatar-file').files[0];
    const newChildAvatarUrl = document.getElementById('new-child-avatar-url').value;

    if (!currentParentForAddChild || !newChildName) {
        showModalMessage('add-child-modal', 'الرجاء تعبئة جميع الحقول المطلوبة.', true);
        return;
    }
    const requestData = {
        parentId: currentParentForAddChild._id,
        parentName: currentParentForAddChild.name,
        newMember: { name: newChildName, avatar: newChildAvatarUrl }
    };
    try {
        const res = await submitRequest('add', requestData, newChildAvatarFile);
        showModalMessage('add-child-modal', res.message || 'تم إرسال طلبك بنجاح!', false);
        setTimeout(() => closeRequestModal('add-child-modal'), 2000);
    } catch (error) {
        showModalMessage('add-child-modal', error.message || 'فشل إرسال الطلب', true);
    }
});

document.getElementById('edit-member-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newName = document.getElementById('edit-new-name').value;
    const newAvatarFile = document.getElementById('edit-new-avatar-file').files[0];
    const newAvatarUrl = document.getElementById('edit-new-avatar-url').value;

    if (!currentMemberForEdit || !newName) {
        showModalMessage('edit-member-modal', 'الرجاء تعبئة الاسم الجديد.', true);
        return;
    }
    const requestData = {
        memberId: currentMemberForEdit._id,
        oldName: currentMemberForEdit.name,
        newName: newName,
        oldAvatar: currentMemberForEdit.avatar,
        newAvatar: newAvatarUrl
    };
    try {
        const res = await submitRequest('edit', requestData, newAvatarFile);
        showModalMessage('edit-member-modal', res.message, false);
        setTimeout(() => closeRequestModal('edit-member-modal'), 2000);
    } catch (error) {
        showModalMessage('edit-member-modal', error.message || 'فشل إرسال الطلب', true);
    }
});

document.getElementById('delete-member-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentMemberForDelete) {
        showModalMessage('delete-member-modal', 'خطأ: لم يتم تحديد العضو للحذف.', true);
        return;
    }
    const requestData = { memberId: currentMemberForDelete._id, memberName: currentMemberForDelete.name };
    try {
        const res = await submitRequest('delete', requestData);
        showModalMessage('delete-member-modal', res.message, false);
        setTimeout(() => closeRequestModal('delete-member-modal'), 2000);
    } catch (error) {
        showModalMessage('delete-member-modal', error.message || 'فشل إرسال الطلب', true);
    }
});

function showAddChildModal(parentMember) {
    currentParentForAddChild = parentMember;
    const modal = document.getElementById('add-child-modal');
    document.getElementById('add-child-parent-name').textContent = parentMember.name;
    modal.style.display = 'flex';
}
function showEditMemberModal(memberToEdit) {
    currentMemberForEdit = memberToEdit;
    const modal = document.getElementById('edit-member-modal');
    document.getElementById('edit-member-old-name').textContent = memberToEdit.name;
    document.getElementById('edit-new-name').value = memberToEdit.name;
    document.getElementById('edit-new-avatar-url').value = memberToEdit.avatar || '';
    modal.style.display = 'flex';
}
function showDeleteMemberModal(memberToDelete) {
    currentMemberForDelete = memberToDelete;
    const modal = document.getElementById('delete-member-modal');
    document.getElementById('delete-member-name').textContent = memberToDelete.name;
    document.getElementById('delete-member-id').value = memberToDelete._id;
    modal.style.display = 'flex';
}

document.querySelectorAll('.close-modal-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const modalId = e.target.closest('.request-modal').id;
        closeRequestModal(modalId);
    });
});

async function loadStats() {
    try {
        const stats = await fetchStats();

        document.getElementById('total-members-stat').textContent = stats.totalMembers || 0;
        document.getElementById('generations-stat').textContent = stats.generations || 0;
        document.getElementById('living-stat').textContent = stats.living || 0;
        document.getElementById('deceased-stat').textContent = stats.deceased || 0;

        const commonNamesEl = document.getElementById('common-names-stat');
        const toggleBtn = document.getElementById('toggle-common-names');
        
        if (commonNamesEl) {
            fullCommonNamesList = stats.mostCommonNames || [];
            if (fullCommonNamesList.length > 0) {
                commonNamesEl.innerHTML = fullCommonNamesList
                    .map(item => `<li>${item.name} <span>(${item.count} مرات)</span></li>`)
                    .join('');
                
                if (fullCommonNamesList.length > 5) {
                    toggleBtn.style.display = 'block';
                } else {
                    toggleBtn.style.display = 'none';
                }
            } else {
                commonNamesEl.innerHTML = '<li>لا توجد بيانات كافية</li>';
                toggleBtn.style.display = 'none';
            }
        }
    } catch (error) {
        console.error("Failed to load stats:", error);
    }
}

document.getElementById('toggle-common-names')?.addEventListener('click', (e) => {
    const list = document.getElementById('common-names-stat');
    const btn = e.target;
    list.classList.toggle('expanded');
    btn.textContent = list.classList.contains('expanded') ? 'عرض أقل' : 'عرض الكل';
});

async function initFamilyTree() {
  loadStats();
  try {
    const data = await fetchFamily();
    familyData = data;
    treeRoots = data;
    if (!Array.isArray(familyData) || familyData.length === 0) {
        document.getElementById('family-tree').innerHTML = '<p>لا توجد بيانات شجرة للعرض.</p>';
        return;
    }
    allNames = [];
    familyData.forEach(root => generateFullNames(root, [], allNames));
    let currMemberInPath = getMemberByPath(familyData, openPath);
    if (openPath.length === 0 || !currMemberInPath) {
        renderRoots();
    } else {
        renderBranch(currMemberInPath);
    }
  } catch (error) {
    document.getElementById('family-tree').innerHTML = '<p style="color:red;">فشل تحميل بيانات الشجرة.</p>';
  }
}

document.addEventListener('DOMContentLoaded', initFamilyTree);
socket.on('familyUpdate', () => {
  initFamilyTree();
});

function createMemberDiv(member, isMain = false) {
    const div = document.createElement('div');
    div.className = 'centered-member' + (isMain ? ' main-member' : '');
  
    if (member.isDeceased) {
        div.classList.add('deceased-member');
    }

    if (member.hasPoems) {
        const poemIcon = document.createElement('span');
        poemIcon.className = 'poem-icon';
        poemIcon.innerHTML = '📜';
        poemIcon.title = 'عرض قصائد الشخص';
        poemIcon.onclick = (e) => {
            e.stopPropagation();
            openPoemModal(member);
        };
        div.appendChild(poemIcon);
    }

    const optionsBtn = document.createElement('button');
    optionsBtn.className = 'member-options-btn';
    optionsBtn.innerHTML = '&#8942;';
    div.appendChild(optionsBtn);

    const optionsMenu = document.createElement('div');
    optionsMenu.className = 'member-options-menu';
    optionsMenu.style.display = 'none';

    const addChildBtn = document.createElement('button');
    addChildBtn.textContent = 'إضافة ابن';
    addChildBtn.onclick = (e) => { e.stopPropagation(); showAddChildModal(member); };
    optionsMenu.appendChild(addChildBtn);

    const editMemberBtn = document.createElement('button');
    editMemberBtn.textContent = 'تعديل';
    editMemberBtn.onclick = (e) => { e.stopPropagation(); showEditMemberModal(member); };
    optionsMenu.appendChild(editMemberBtn);

    const deleteMemberBtn = document.createElement('button');
    deleteMemberBtn.textContent = 'حذف';
    deleteMemberBtn.onclick = (e) => { e.stopPropagation(); showDeleteMemberModal(member); };
    optionsMenu.appendChild(deleteMemberBtn);
    div.appendChild(optionsMenu);

    optionsBtn.onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll('.member-options-menu').forEach(menu => {
            if (menu !== optionsMenu) menu.style.display = 'none';
        });
        optionsMenu.style.display = optionsMenu.style.display === 'none' ? 'flex' : 'none';
    };
  
    const img = document.createElement('img');
    img.src = member.avatar || 'assets/images/test.jpeg';
    img.alt = member.name;
    img.className = "centered-avatar";
    div.appendChild(img);

    const nameDiv = document.createElement('div');
    nameDiv.className = "centered-name";
    nameDiv.textContent = member.name;
    div.appendChild(nameDiv);

    return div;
}

function getMemberByPath(roots, pathArr) {
  if (!pathArr || pathArr.length === 0) return null;
  let node = roots.find(root => root.name === pathArr[0]);
  for (let i = 1; i < pathArr.length; i++) {
      if (!node) break;
      node = (node.children || []).find(c => c.name === pathArr[i]);
  }
  return node;
}

function createTitleElement() {
    if (openPath.length === 0) {
        return null;
    }
    const titleContainer = document.createElement('div');
    titleContainer.id = 'title-container';

    const reversedPath = [...openPath].reverse();
    const titleElement = document.createElement('div');
    titleElement.className = 'node-title';
    titleElement.innerHTML = reversedPath.join(' <span class="bin-text">بن</span> ');
    
    titleContainer.appendChild(titleElement);
    return titleContainer;
}

function generateFullNames(node, ancestors = [], flatList) {
    if (!node) return;
    const reversedAncestorsNames = [...ancestors].reverse().map(a => a.name);
    node.fullSearchName = [node.name, ...reversedAncestorsNames].join(' بن ');
    flatList.push({ name: node.name, nodeRef: node, ancestors: [...ancestors] });
    if (node.children) {
        node.children.forEach(child => generateFullNames(child, [...ancestors, node], flatList));
    }
}

function performSearch(searchTerm) {
    const normalizedSearchTerms = searchTerm.replace(/بن/g, ' ').toLowerCase().split(/\s+/).filter(Boolean);
    if (normalizedSearchTerms.length === 0) return [];
    return allNames.filter(item => {
        const personAndParents = [item.nodeRef.name.toLowerCase(), ...item.ancestors.map(a => a.name.toLowerCase())];
        return normalizedSearchTerms.every((term, i) => (personAndParents[i] || '').startsWith(term));
    });
}

function displaySearchResults(results) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';
    if (results.length === 0) {
        searchResultsDiv.style.display = 'none';
        return;
    }
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.textContent = item.nodeRef.fullSearchName;
        resultItem.onclick = () => navigateToNode(item.nodeRef);
        searchResultsDiv.appendChild(resultItem);
    });
    searchResultsDiv.style.display = 'block';
}

function navigateToNode(targetNode) {
    const flatItem = allNames.find(item => item.nodeRef._id === targetNode._id);
    if (!flatItem) return;
    openPath = [...flatItem.ancestors.map(a => a.name), targetNode.name];
    renderBranch(targetNode);
    document.getElementById('searchBox').value = '';
    document.getElementById('searchResults').style.display = 'none';
}

document.getElementById('searchIcon')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('searchBox').classList.toggle('active');
    if (document.getElementById('searchBox').classList.contains('active')) {
        document.getElementById('searchBox').focus();
    }
});
document.getElementById('searchBox')?.addEventListener('input', (e) => {
    const term = e.target.value.trim();
    if (term.length < 1) {
        document.getElementById('searchResults').style.display = 'none';
        return;
    }
    displaySearchResults(performSearch(term));
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        document.getElementById('searchBox').classList.remove('active');
        document.getElementById('searchResults').style.display = 'none';
    }
    if (!e.target.closest('.member-options-btn')) {
        document.querySelectorAll('.member-options-menu').forEach(menu => menu.style.display = 'none');
    }
});

function renderRoots() {
    const container = document.getElementById('family-tree');
    container.innerHTML = '';
    document.getElementById('back-button-wrapper').style.display = 'none';
    
    const rootsRow = document.createElement('div');
    rootsRow.className = 'simple-children-row';
    familyData.forEach(root => {
        const rootDiv = createMemberDiv(root);
        rootDiv.onclick = (e) => {
            e.stopPropagation();
            openPath = [root.name];
            renderBranch(root);
        };
        rootsRow.appendChild(rootDiv);
    });
    container.appendChild(rootsRow);
}

function renderBranch(currentMember) {
    const container = document.getElementById('family-tree');
    container.innerHTML = '';
    document.getElementById('back-button-wrapper').style.display = 'flex';

    const titleElement = createTitleElement();
    if (titleElement) {
        container.appendChild(titleElement);
    }

    const mainMemberDiv = createMemberDiv(currentMember, true);
    container.appendChild(mainMemberDiv);

    if (currentMember.children && currentMember.children.length > 0) {
        const childrenSection = document.createElement('div');
        childrenSection.className = 'children-section';
        container.appendChild(childrenSection);
        const childrenRow = document.createElement('div');
        childrenRow.className = 'children-row';
        childrenSection.appendChild(childrenRow);
        const childrenDivs = currentMember.children.map(child => {
            const childDiv = createMemberDiv(child);
            childDiv.onclick = (e) => {
                e.stopPropagation();
                openPath.push(child.name);
                renderBranch(child);
            };
            childrenRow.appendChild(childDiv);
            return childDiv;
        });
        requestAnimationFrame(() => drawLines(mainMemberDiv, childrenDivs, childrenSection));
    } else {
        const noChildrenMessages = {
            'DEFAULT': 'لم تُسجل له ذرية بعد',
            'HISTORICAL_FINAL': 'لم يُعقِب',
            'PRIVATE': 'ذريته غير مسجلة',
            'IS_CHILD': ''
        };
        const context = currentMember.noChildrenContext || 'DEFAULT';
        const message = noChildrenMessages[context];

        if (message) {
            container.insertAdjacentHTML('beforeend', `<div class="no-children">${message}</div>`);
        }
    }
    bindBackButtonEvent();
}

function handleBackButtonClick() {
    if (openPath.length > 1) {
        openPath.pop();
        renderBranch(getMemberByPath(familyData, openPath));
    } else {
        openPath = [];
        renderRoots();
    }
}
function bindBackButtonEvent() {
    const btn = document.getElementById('treeBackButton');
    btn.removeEventListener('click', handleBackButtonClick);
    btn.addEventListener('click', handleBackButtonClick);
}

function drawLines(parentDiv, childrenDivs, svgContainer) {
    const existingSvg = svgContainer.querySelector('.line-svg');
    if (existingSvg) existingSvg.remove();
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('class', 'line-svg');
    
    const containerRect = svgContainer.getBoundingClientRect();
    
    svg.setAttribute('width', containerRect.width);
    svg.setAttribute('height', containerRect.height);

    const parentRect = parentDiv.getBoundingClientRect();
    const parentBottomX = (parentRect.left + parentRect.width / 2) - containerRect.left;

    const branchPointY = 40; 
    const mainStem = document.createElementNS("http://www.w3.org/2000/svg", "line");
    mainStem.setAttribute('x1', parentBottomX);
    mainStem.setAttribute('y1', 0);
    mainStem.setAttribute('x2', parentBottomX);
    mainStem.setAttribute('y2', branchPointY);
    svg.appendChild(mainStem);

    childrenDivs.forEach(childDiv => {
        const childRect = childDiv.getBoundingClientRect();
        const childTopX = (childRect.left + childRect.width / 2) - containerRect.left;
        const childTopY = childRect.top - containerRect.top;
        
        const hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        hLine.setAttribute('x1', parentBottomX);
        hLine.setAttribute('y1', branchPointY);
        hLine.setAttribute('x2', childTopX);
        hLine.setAttribute('y2', branchPointY);
        svg.appendChild(hLine);
        
        const vLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        vLine.setAttribute('x1', childTopX);
        vLine.setAttribute('y1', branchPointY);
        vLine.setAttribute('x2', childTopX);
        vLine.setAttribute('y2', childTopY);
        svg.appendChild(vLine);
    });

    svgContainer.prepend(svg);
    setTimeout(() => svg.classList.add('active'), 50);
}

window.addEventListener('resize', () => {
    if (openPath.length > 0) {
        renderBranch(getMemberByPath(familyData, openPath));
    } else {
        renderRoots();
    }
});

function openPoemModal(member) {
    const modal = document.getElementById('poem-modal');
    const title = document.getElementById('poem-modal-title');
    const container = document.getElementById('poem-accordion-container');

    if (!modal || !title || !container) return;
    
    title.textContent = `قصائد: ${member.name}`;
    container.innerHTML = '<p>جاري تحميل القصائد...</p>';
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('visible'), 10);

    fetchPoemsForMember(member._id).then(poems => {
        if (!poems || poems.length === 0) {
            container.innerHTML = '<p>لا توجد قصائد مسجلة لهذا الشخص.</p>';
            return;
        }
        container.innerHTML = '';
        poems.forEach(poem => {
            const item = document.createElement('div');
            item.className = 'accordion-item';

            const header = document.createElement('button');
            header.className = 'accordion-header';
            header.textContent = poem.title;

            const content = document.createElement('div');
            content.className = 'accordion-content';
            const paragraph = document.createElement('p');
            paragraph.innerText = poem.content;
            content.appendChild(paragraph);

            item.appendChild(header);
            item.appendChild(content);
            container.appendChild(item);

            header.addEventListener('click', () => {
                const isActive = header.classList.contains('active');
                
                container.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
                container.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
                
                if (!isActive) {
                    header.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    });
}

function closePoemModal() {
    const modal = document.getElementById('poem-modal');
    if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => (modal.style.display = 'none'), 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const closeBtn = document.getElementById('close-welcome-modal');
    const nameButtons = document.querySelectorAll('.name-btn');
    const thankYouMessageDiv = document.getElementById('thank-you-message');

    if (welcomeOverlay && closeBtn && nameButtons.length > 0) {
        const messages = {
            "عبدالعزيز فواز العبيريد": "يتقدم القائمون على الشجرة بخالص الشكر والامتنان للأستاذ/ عبدالعزيز بن فواز العبيريد على جهوده الاستثنائية ومتابعته الحثيثة في تدقيق بيانات الشجرة، وتحديثها بكل ما يتعلق بالمواليد والوفيات وتعديلات الأسماء، فله منا كل التقدير على هذا العمل المتقن الذي كان له الأثر الأكبر في صحة ودقة المعلومات.",
            "ناصر عبدالرحمن العبيريد": "كما نتوجه بوافر الشكر وعظيم الثناء للأستاذ/ ناصر بن عبدالرحمن العبيريد، الذي تكرم بتزويدنا بالملف المرجعي (PDF)، والذي شكّل حجر الزاوية والنواة الأساسية التي قام عليها هذا المشروع. فلولا هذه المادة القيمة التي قدمها، لما رأى هذا العمل النور بهذه الصورة المتكاملة."
        };

        const showWelcomeModal = () => {
            welcomeOverlay.style.display = 'flex';
            setTimeout(() => {
                welcomeOverlay.classList.add('visible');
            }, 10);
        };

        const hideWelcomeModal = () => {
            welcomeOverlay.classList.remove('visible');
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 300);
            localStorage.setItem('welcomePopupClosedAt', new Date().getTime().toString());
        };

        closeBtn.addEventListener('click', hideWelcomeModal);
        welcomeOverlay.addEventListener('click', (e) => {
            if (e.target === welcomeOverlay) {
                hideWelcomeModal();
            }
        });

        nameButtons.forEach(button => {
            button.addEventListener('click', () => {
                const name = button.dataset.name;
                if (messages[name]) {
                    thankYouMessageDiv.innerHTML = messages[name];
                    thankYouMessageDiv.style.display = 'block';
                }
            });
        });

        const lastClosedTimestamp = localStorage.getItem('welcomePopupClosedAt');
        const currentTime = new Date().getTime();
        const fifteenMinutesInMillis = 15 * 60 * 1000;

        if (!lastClosedTimestamp || (currentTime - parseInt(lastClosedTimestamp, 10)) > fifteenMinutesInMillis) {
            showWelcomeModal();
        }
    }

    document.getElementById('close-poem-modal')?.addEventListener('click', closePoemModal);
    document.getElementById('poem-modal')?.addEventListener('click', (e) => {
        if(e.target.id === 'poem-modal') closePoemModal();
    });
});