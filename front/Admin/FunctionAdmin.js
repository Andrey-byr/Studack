// Инициализация иконок Lucide
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Инициализация приложения
    initApp();
});

// Данные приложения
let appState = {
    dorms: [
        { id: 1, address: "ул. Ломоносова, 12", type: "семейное", total: 120, free: 14, feature: "Отдельные кухни" },
        { id: 2, address: "ул. Советская, 8", type: "несемейное", total: 300, free: 42, feature: "Спортивный зал" },
        { id: 3, address: "ул. Гагарина, 25", type: "несемейное", total: 250, free: 3, feature: "Большая библиотека" }
    ],
    queue: [
        { id: 1, name: "Иванов И.И.", priority: 134, desiredType: "несемейное", score: 91, income: 12000, activity: true, applicationDate: "2025-11-01", birth: "2004-06-01", phone: "+7 900 111-22-33" },
        { id: 2, name: "Петрова А.Н.", priority: 98, desiredType: "семейное", score: 89, income: 15500, activity: false, applicationDate: "2025-10-20", birth: "2003-01-12", phone: "+7 900 444-55-66" },
        { id: 3, name: "Смирнов Д.А.", priority: 110, desiredType: "несемейное", score: 85, income: 10000, activity: true, applicationDate: "2025-11-10", birth: "2005-09-10", phone: "+7 900 777-88-99" }
    ],
    settled: [
        { id: 1, name: "Кузнецов А.А.", dorm: "ул. Ломоносова, 12", settleDate: "2025-09-01", evictionDate: null },
        { id: 2, name: "Горбунова Е.В.", dorm: "ул. Советская, 8", settleDate: "2025-08-15", evictionDate: null }
    ],
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

// Инициализация приложения
function initApp() {
    // Настройка обработчиков событий
    setupEventListeners();
    
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
                <button class="action-btn settle-btn" data-id="${student.id}">
                    <i data-lucide="plus"></i> Заселить
                </button>
                <button class="action-btn reject-btn" data-id="${student.id}">
                    Отклонить
                </button>
            </div>
        `;
        
        queueList.appendChild(queueItem);
        
        // Добавление обработчиков событий для кнопок
        queueItem.querySelector('.settle-btn').addEventListener('click', function() {
            openSettleConfirm(student.id);
        });
        
        queueItem.querySelector('.reject-btn').addEventListener('click', function() {
            openRejectConfirm(student.id);
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
    
    filteredSettled.forEach(resident => {
        const settledItem = document.createElement('div');
        settledItem.className = 'settled-item';
        settledItem.innerHTML = `
            <div>
                <div class="student-name">${resident.name}</div>
                <div class="student-details">Общежитие: ${resident.dorm} · Заселен: ${resident.settleDate}</div>
            </div>
            <div class="settled-actions">
                <button class="action-btn evict-btn" data-id="${resident.id}">
                    <i data-lucide="door-closed"></i> Выселить
                </button>
            </div>
        `;
        
        settledList.appendChild(settledItem);
        
        // Добавление обработчиков событий для кнопок
        settledItem.querySelector('.evict-btn').addEventListener('click', function() {
            openEvictConfirm(resident.id);
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

// Открытие подтверждения заселения
function openSettleConfirm(studentId) {
    const student = appState.queue.find(s => s.id === studentId);
    if (!student) return;
    
    const recommended = autoSelectDorm(student.desiredType);
    appState.confirmAction = {
        type: "settle",
        studentId: student.id,
        recommendedDormId: recommended ? recommended.id : null,
        selectedDormId: recommended ? recommended.id : null
    };
    
    showConfirmModal();
}

// Открытие подтверждения отклонения
function openRejectConfirm(studentId) {
    appState.confirmAction = {
        type: "reject",
        studentId: studentId
    };
    
    showConfirmModal();
}

// Открытие подтверждения выселения
function openEvictConfirm(residentId) {
    appState.confirmAction = {
        type: "evict",
        residentId: residentId
    };
    
    showConfirmModal();
}

// Показать модальное окно подтверждения
function showConfirmModal() {
    const confirmContent = document.getElementById('confirm-content');
    
    if (appState.confirmAction.type === 'settle') {
        const student = appState.queue.find(s => s.id === appState.confirmAction.studentId);
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
function applyConfirm() {
    if (!appState.confirmAction) return;
    
    if (appState.confirmAction.type === 'settle') {
        const student = appState.queue.find(s => s.id === appState.confirmAction.studentId);
        const dorm = appState.dorms.find(d => d.id === Number(appState.confirmAction.selectedDormId));
        
        if (!student || !dorm) {
            cancelConfirm();
            return;
        }
        
        // Обновление состояния
        appState.dorms = appState.dorms.map(d => 
            d.id === dorm.id ? { ...d, free: Math.max(0, d.free - 1) } : d
        );
        
        appState.queue = appState.queue.filter(s => s.id !== student.id);
        
        appState.settled = [
            ...appState.settled,
            { 
                id: Date.now(), 
                name: student.name, 
                dorm: dorm.address, 
                settleDate: new Date().toISOString().slice(0, 10), 
                evictionDate: null 
            }
        ];
    }
    
    if (appState.confirmAction.type === 'reject') {
        appState.queue = appState.queue.filter(s => s.id !== appState.confirmAction.studentId);
    }
    
    if (appState.confirmAction.type === 'evict') {
        appState.settled = appState.settled.filter(r => r.id !== appState.confirmAction.residentId);
    }
    
    // Обновление интерфейса
    renderDashboard();
    renderQueue();
    renderSettled();
    renderDorms();
    
    cancelConfirm();
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