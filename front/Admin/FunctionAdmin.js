// Инициализация иконок Lucide
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Инициализация приложения
    initApp();
});

// Константы API
const API_BASE = 'http://localhost:2000';

// Данные приложения
let appState = {
    dorms: [],
    queue: [],
    settled: [],
    filters: {
        dormType: "all",
        onlyFree: false,
        minScore: 0,
        maxScore: 100,
        minIncome: 0,
        maxIncome: 999999,
        onlyActivity: false
    },
    search: {
        queue: "",
        settled: ""
    },
    confirmAction: null
};

// API функции
async function apiGet(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`API GET error (${endpoint}):`, error);
        throw error;
    }
}

async function apiPost(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`API POST error (${endpoint}):`, error);
        throw error;
    }
}

// Загрузка данных с сервера
async function loadDorms() {
    try {
        appState.dorms = await apiGet('/dormitories');
    } catch (error) {
        console.error('Ошибка загрузки общежитий:', error);
        alert('Ошибка загрузки общежитий');
    }
}

async function loadQueue() {
    try {
        const queueData = await apiGet('/queue');
        // Преобразуем данные для фронтенда
        appState.queue = queueData.map(q => ({
            id: q.id,
            studentId: q.studentId,
            name: q.name,
            priority: q.priority,
            desiredType: q.desiredType,
            score: q.score,
            income: q.income,
            activity: q.activity,
            applicationDate: q.applicationDate,
            birth: q.birth,
            phone: q.phone
        }));
    } catch (error) {
        console.error('Ошибка загрузки очереди:', error);
        alert('Ошибка загрузки очереди');
    }
}

async function loadSettled() {
    try {
        const settledData = await apiGet('/residents');
        // Преобразуем данные для фронтенда
        appState.settled = settledData.map(r => ({
            id: r.id,
            studentId: r.studentId,
            name: r.name,
            dorm: r.dorm,
            settleDate: r.settleDate,
            evictionDate: r.evictionDate
        }));
    } catch (error) {
        console.error('Ошибка загрузки проживающих:', error);
        alert('Ошибка загрузки проживающих');
    }
}

// Инициализация приложения
async function initApp() {
    // Настройка обработчиков событий
    setupEventListeners();
    
    // Загружаем данные с сервера
    try {
        await Promise.all([loadDorms(), loadQueue(), loadSettled()]);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        alert('Ошибка загрузки данных с сервера');
    }
    
    // Первоначальный рендеринг
    renderDashboard();
    renderQueue();
    renderSettled();
    renderDorms();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Переключение вкладок
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Поиск в очереди
    document.getElementById('queue-search').addEventListener('input', function(e) {
        appState.search.queue = e.target.value;
        renderQueue();
    });
    
    // Поиск в проживающих
    document.getElementById('settled-search').addEventListener('input', function(e) {
        appState.search.settled = e.target.value;
        renderSettled();
    });
    
    // Фильтры общежитий
    document.getElementById('dorm-type-filter').addEventListener('change', function(e) {
        appState.filters.dormType = e.target.value;
        renderDorms();
    });
    
    document.getElementById('only-free-toggle').addEventListener('change', function(e) {
        appState.filters.onlyFree = e.target.checked;
        renderDorms();
    });
    
    // Модальное окно фильтров очереди
    document.getElementById('queue-filter-btn').addEventListener('click', function() {
        openQueueFilterModal();
    });
    
    document.getElementById('close-filter-modal').addEventListener('click', function() {
        closeQueueFilterModal();
    });
    
    document.getElementById('apply-filters').addEventListener('click', function() {
        applyQueueFilters();
    });
    
    // Печать отчетов
    document.getElementById('print-queue').addEventListener('click', function() {
        printReport('queue');
    });
    
    document.getElementById('print-settled').addEventListener('click', function() {
        printReport('settled');
    });
    
    document.getElementById('print-dorms').addEventListener('click', function() {
        printReport('dorms');
    });
    
    // Закрытие модальных окон при клике вне их
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

// Переключение вкладок
function switchTab(tabId) {
    // Обновление активных кнопок вкладок
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Обновление активного контента вкладок
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabId}-tab`).classList.add('active');
    
    // Обновление контента при переключении вкладок
    if (tabId === 'queue') {
        renderQueue();
    } else if (tabId === 'settled') {
        renderSettled();
    } else if (tabId === 'dorms') {
        renderDorms();
    }
}

// Рендеринг дашборда
function renderDashboard() {
    const stats = calculateStats();
    
    document.getElementById('dorm-count').textContent = stats.dormCount;
    document.getElementById('living-count').textContent = stats.living;
    document.getElementById('queue-count').textContent = stats.inQueue;
    document.getElementById('free-count').textContent = stats.totalFree;
    document.getElementById('occupancy-percent').textContent = `${stats.avgOccupancyPercent}%`;
}

// Расчет статистики
function calculateStats() {
    const dormCount = appState.dorms.length;
    const inQueue = appState.queue.length;
    const living = appState.settled.length;
    const totalFree = appState.dorms.reduce((acc, d) => acc + d.free, 0);
    const avgOccupancyPercent = Math.round(
        (appState.dorms.reduce((acc, d) => acc + ((d.total - d.free) / d.total), 0) / (appState.dorms.length || 1)) * 100
    );
    
    return { dormCount, inQueue, living, totalFree, avgOccupancyPercent };
}

// Рендеринг очереди
function renderQueue() {
    const queueList = document.getElementById('queue-list');
    const filteredQueue = getFilteredQueue();
    
    queueList.innerHTML = '';
    
    if (filteredQueue.length === 0) {
        queueList.innerHTML = '<div class="no-data">Нет заявок, соответствующих фильтрам</div>';
        return;
    }
    
    filteredQueue.forEach(student => {
        const badge = getPriorityBadge(student.priority);
        
        const queueItem = document.createElement('div');
        queueItem.className = 'queue-item';
        queueItem.innerHTML = `
            <div class="queue-info">
                <div class="queue-header">
                    <div class="priority-badge ${badge.class}">${badge.text}</div>
                    <div>
                        <div class="student-name">${student.name}</div>
                        <div class="student-details">Заявка: ${student.applicationDate} · Приоритет: <span class="font-bold">${student.priority}</span></div>
                    </div>
                </div>
                <div class="student-details">Баллы: ${student.score} · Доход: ${student.income} · Общественная работа: ${student.activity ? 'Да' : 'Нет'}</div>
            </div>
            <div class="queue-actions">
                <button class="action-btn settle-btn" data-student-id="${student.studentId}">
                    <i data-lucide="plus"></i> Заселить
                </button>
                <button class="action-btn reject-btn" data-application-id="${student.id}">
                    Отклонить
                </button>
            </div>
        `;
        
        queueList.appendChild(queueItem);
        
        // Добавление обработчиков событий для кнопок
        queueItem.querySelector('.settle-btn').addEventListener('click', function() {
            const studentId = parseInt(this.getAttribute('data-student-id'));
            openSettleConfirm(studentId);
        });
        
        queueItem.querySelector('.reject-btn').addEventListener('click', function() {
            const applicationId = parseInt(this.getAttribute('data-application-id'));
            openRejectConfirm(applicationId);
        });
    });
    
    // Обновление иконок
    lucide.createIcons();
}

// Получение отфильтрованной очереди
function getFilteredQueue() {
    return appState.queue
        .filter(q => q.name.toLowerCase().includes(appState.search.queue.toLowerCase()))
        .filter(q => q.score >= appState.filters.minScore && q.score <= appState.filters.maxScore)
        .filter(q => q.income >= appState.filters.minIncome && q.income <= appState.filters.maxIncome)
        .filter(q => (!appState.filters.onlyActivity || q.activity))
        .slice()
        .sort((a, b) => b.priority - a.priority);
}

// Получение бейджа приоритета
function getPriorityBadge(priority) {
    if (priority >= 120) return { text: "Высокий", class: "priority-high" };
    if (priority >= 90) return { text: "Средний", class: "priority-medium" };
    return { text: "Низкий", class: "priority-low" };
}

// Рендеринг проживающих
function renderSettled() {
    const settledList = document.getElementById('settled-list');
    const filteredSettled = getFilteredSettled();
    
    settledList.innerHTML = '';
    
    if (filteredSettled.length === 0) {
        settledList.innerHTML = '<div class="no-data">Нет проживающих, соответствующих фильтрам</div>';
        return;
    }
    
    filteredSettled.forEach(resident => {
        const settledItem = document.createElement('div');
        settledItem.className = 'settled-item';
        settledItem.innerHTML = `
            <div>
                <div class="student-name">${resident.name}</div>
                <div class="student-details">Общежитие: ${resident.dorm} · Заселен: ${resident.settleDate}</div>
            </div>
            <div class="settled-actions">
                <button class="action-btn evict-btn" data-resident-id="${resident.id}">
                    <i data-lucide="door-closed"></i> Выселить
                </button>
            </div>
        `;
        
        settledList.appendChild(settledItem);
        
        // Добавление обработчиков событий для кнопок
        settledItem.querySelector('.evict-btn').addEventListener('click', function() {
            const residentId = parseInt(this.getAttribute('data-resident-id'));
            openEvictConfirm(residentId);
        });
    });
    
    // Обновление иконок
    lucide.createIcons();
}

// Получение отфильтрованных проживающих
function getFilteredSettled() {
    return appState.settled.filter(s => 
        s.name.toLowerCase().includes(appState.search.settled.toLowerCase())
    );
}

// Рендеринг общежитий
function renderDorms() {
    const dormsGrid = document.getElementById('dorms-grid');
    const filteredDorms = getFilteredDorms();
    
    dormsGrid.innerHTML = '';
    
    if (filteredDorms.length === 0) {
        dormsGrid.innerHTML = '<div class="no-data">Нет общежитий, соответствующих фильтрам</div>';
        return;
    }
    
    filteredDorms.forEach(dorm => {
        const percentFree = Math.round((dorm.free / dorm.total) * 100);
        const percentOccupied = 100 - percentFree;
        const status = getDormStatus(dorm);
        
        const dormCard = document.createElement('div');
        dormCard.className = 'dorm-card';
        dormCard.innerHTML = `
            <div class="dorm-status ${status}"></div>
            <div class="dorm-title">Общежитие #${dorm.id}</div>
            <div class="dorm-info">
                <p><b>Адрес:</b> ${dorm.address}</p>
                <p><b>Тип:</b> ${dorm.type}</p>
                <p><b>Особенность:</b> ${dorm.feature}</p>
            </div>
            <div class="dorm-stats">
                <div class="free-count">Свободно: ${dorm.free}</div>
                <div class="occupied-count">Занято: ${dorm.total - dorm.free} / ${dorm.total}</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentOccupied}%"></div>
            </div>
            <div class="occupancy-text">Заполнено: ${percentOccupied}%</div>
        `;
        
        dormsGrid.appendChild(dormCard);
    });
}

// Получение статуса общежития
function getDormStatus(dorm) {
    const percentFree = Math.round((dorm.free / dorm.total) * 100);
    if (percentFree > 20) return "status-green";
    if (percentFree >= 5) return "status-yellow";
    return "status-red";
}

// Получение отфильтрованных общежитий
function getFilteredDorms() {
    let filtered = appState.dorms.filter(d => 
        appState.filters.dormType === "all" || d.type === appState.filters.dormType
    );
    
    if (appState.filters.onlyFree) {
        filtered = filtered.filter(d => d.free > 0);
    }
    
    return filtered.slice().sort((a, b) => b.free - a.free);
}

// Открытие модального окна фильтров очереди
function openQueueFilterModal() {
    document.getElementById('min-score').value = appState.filters.minScore;
    document.getElementById('max-score').value = appState.filters.maxScore;
    document.getElementById('min-income').value = appState.filters.minIncome;
    document.getElementById('max-income').value = appState.filters.maxIncome;
    document.getElementById('only-activity').checked = appState.filters.onlyActivity;
    
    document.getElementById('queue-filter-modal').classList.add('active');
}

// Закрытие модального окна фильтров очереди
function closeQueueFilterModal() {
    document.getElementById('queue-filter-modal').classList.remove('active');
}

// Применение фильтров очереди
function applyQueueFilters() {
    appState.filters.minScore = Number(document.getElementById('min-score').value) || 0;
    appState.filters.maxScore = Number(document.getElementById('max-score').value) || 100;
    appState.filters.minIncome = Number(document.getElementById('min-income').value) || 0;
    appState.filters.maxIncome = Number(document.getElementById('max-income').value) || 999999;
    appState.filters.onlyActivity = document.getElementById('only-activity').checked;
    
    closeQueueFilterModal();
    renderQueue();
}

// Автоматический выбор общежития
function autoSelectDorm(desiredType) {
    const candidates = appState.dorms.filter(d => 
        (desiredType ? d.type === desiredType : true) && d.free > 0
    );
    
    if (!candidates.length) return null;
    
    candidates.sort((a, b) => b.free - a.free);
    return candidates[0];
}

// Установка действия подтверждения
function setConfirmAction(action) {
    appState.confirmAction = action;
    showConfirmModal();
}

// Открытие подтверждения заселения
function openSettleConfirm(studentId) {
    const student = appState.queue.find(s => s.studentId === studentId);
    if (!student) return;
    
    const recommended = autoSelectDorm(student.desiredType);
    setConfirmAction({
        type: "settle",
        studentId: studentId,
        recommendedDormId: recommended ? recommended.id : null,
        selectedDormId: recommended ? recommended.id : null
    });
}

// Открытие подтверждения отклонения
function openRejectConfirm(applicationId) {
    setConfirmAction({
        type: "reject",
        applicationId: applicationId
    });
}

// Открытие подтверждения выселения
function openEvictConfirm(residentId) {
    setConfirmAction({
        type: "evict",
        residentId: residentId
    });
}

// Показать модальное окно подтверждения
function showConfirmModal() {
    const confirmContent = document.getElementById('confirm-content');
    
    if (appState.confirmAction.type === 'settle') {
        const student = appState.queue.find(s => s.studentId === appState.confirmAction.studentId);
        const recommendedDorm = appState.dorms.find(d => d.id === appState.confirmAction.recommendedDormId);
        
        confirmContent.innerHTML = `
            <h3>Заселение — выбор общежития</h3>
            <div class="student-details">Студент: <b>${student.name}</b> · Желаемый тип: <b>${student.desiredType}</b></div>
            
            <div class="mt-3">
                <div class="student-details">Рекомендуемое общежитие:</div>
                <div class="student-name">${recommendedDorm ? recommendedDorm.address : 'Нет доступных'}</div>
            </div>
            
            <div class="mt-3">
                <select id="dorm-select" class="confirm-select">
                    ${appState.dorms
                        .filter(d => d.free > 0 && (student.desiredType ? d.type === student.desiredType : true))
                        .map(d => `<option value="${d.id}" ${d.id === appState.confirmAction.selectedDormId ? 'selected' : ''}>№${d.id} · ${d.address} (Свободно: ${d.free})</option>`)
                        .join('')}
                </select>
            </div>
            
            <div class="modal-actions">
                <button id="cancel-confirm" class="cancel-btn">Отмена</button>
                <button id="apply-confirm" class="confirm-btn">Заселить</button>
            </div>
        `;
        
        // Обработчик изменения выбора общежития
        document.getElementById('dorm-select').addEventListener('change', function(e) {
            appState.confirmAction.selectedDormId = Number(e.target.value);
        });
    } else {
        const actionText = appState.confirmAction.type === 'reject' ? 'Отклонить заявку?' : 'Выселить студента?';
        
        confirmContent.innerHTML = `
            <h3>Подтверждение</h3>
            <p class="student-details">${actionText}</p>
            <div class="modal-actions">
                <button id="cancel-confirm" class="cancel-btn">Отмена</button>
                <button id="apply-confirm" class="confirm-btn">Подтвердить</button>
            </div>
        `;
    }
    
    // Обработчики для кнопок подтверждения
    document.getElementById('cancel-confirm').addEventListener('click', cancelConfirm);
    document.getElementById('apply-confirm').addEventListener('click', applyConfirm);
    
    document.getElementById('confirm-modal').classList.add('active');
}

// Отмена подтверждения
function cancelConfirm() {
    appState.confirmAction = null;
    document.getElementById('confirm-modal').classList.remove('active');
}

// Применение подтверждения
async function applyConfirm() {
    if (!appState.confirmAction) return;

    try {
        if (appState.confirmAction.type === 'settle') {
            await apiPost('/settle', {
                studentId: appState.confirmAction.studentId,
                dormitoryId: Number(appState.confirmAction.selectedDormId)
            });
        } 
        else if (appState.confirmAction.type === 'reject') {
            await apiPost('/reject', {
                applicationId: appState.confirmAction.applicationId
            });
        } 
        else if (appState.confirmAction.type === 'evict') {
            await apiPost('/evict', {
                habitationId: appState.confirmAction.residentId
            });
        }

        // Перезагружаем данные с сервера
        await Promise.all([loadDorms(), loadQueue(), loadSettled()]);
        
        // Обновляем интерфейс
        renderDashboard();
        renderQueue();
        renderSettled();
        renderDorms();
        
        cancelConfirm();
        
    } catch (error) {
        console.error('Ошибка выполнения действия:', error);
        alert('Ошибка при выполнении действия: ' + error.message);
    }
}

// Печать отчета
function printReport(which) {
    const title = `Отчёт — ${which}`;
    let content = {};
    
    if (which === "queue") content = getFilteredQueue();
    if (which === "settled") content = getFilteredSettled();
    if (which === "dorms") content = getFilteredDorms();
    
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    printWindow.document.write(`
        <html>
            <head>
                <title>${title}</title>
                <meta charset="utf-8" />
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    pre { white-space: pre-wrap; }
                </style>
            </head>
            <body>
                <h1>${title}</h1>
                <pre>${JSON.stringify(content, null, 2)}</pre>
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Добавляем стиль для сообщения об отсутствии данных
const style = document.createElement('style');
style.textContent = `
    .no-data {
        text-align: center;
        padding: 2rem;
        color: #6b7280;
        font-style: italic;
    }
`;
document.head.appendChild(style);