// FunctionAdmin.js - Complete Fixed Version with Type Matching
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
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

// Функция для нормализации типа общежития
function normalizeDormType(type) {
    if (!type) return type;
    const typeMap = {
        'Семейное': 'семейное',
        'семейное': 'семейное',
        'family': 'семейное',
        'Не семейное': 'несемейное',
        'несемейное': 'несемейное',
        'regular': 'несемейное'
    };
    return typeMap[type] || type;
}

// Функция для проверки соответствия типов
function isDormTypeMatching(studentType, dormType) {
    const normalizedStudentType = normalizeDormType(studentType);
    const normalizedDormType = normalizeDormType(dormType);
    return normalizedStudentType === normalizedDormType;
}

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
        const dormData = await apiGet('/dormitories');
        // Нормализуем типы общежитий при загрузке
        appState.dorms = dormData.map(d => ({
            ...d,
            type: normalizeDormType(d.type)
        }));
        console.log('Dorms loaded:', appState.dorms);
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
        console.log('Queue loaded:', appState.queue);
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
        console.log('Settled loaded:', appState.settled);
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
    const queueSearch = document.getElementById('queue-search');
    if (queueSearch) {
        queueSearch.addEventListener('input', function(e) {
            appState.search.queue = e.target.value;
            renderQueue();
        });
    }
    
    // Поиск в проживающих
    const settledSearch = document.getElementById('settled-search');
    if (settledSearch) {
        settledSearch.addEventListener('input', function(e) {
            appState.search.settled = e.target.value;
            renderSettled();
        });
    }
    
    // Фильтры общежитий
    const dormTypeFilter = document.getElementById('dorm-type-filter');
    if (dormTypeFilter) {
        dormTypeFilter.addEventListener('change', function(e) {
            appState.filters.dormType = e.target.value;
            renderDorms();
        });
    }
    
    const onlyFreeToggle = document.getElementById('only-free-toggle');
    if (onlyFreeToggle) {
        onlyFreeToggle.addEventListener('change', function(e) {
            appState.filters.onlyFree = e.target.checked;
            renderDorms();
        });
    }
    
    // Модальное окно фильтров очереди
    const queueFilterBtn = document.getElementById('queue-filter-btn');
    if (queueFilterBtn) {
        queueFilterBtn.addEventListener('click', function() {
            openQueueFilterModal();
        });
    }
    
    const closeFilterModal = document.getElementById('close-filter-modal');
    if (closeFilterModal) {
        closeFilterModal.addEventListener('click', function() {
            closeQueueFilterModal();
        });
    }
    
    const applyFilters = document.getElementById('apply-filters');
    if (applyFilters) {
        applyFilters.addEventListener('click', function() {
            applyQueueFilters();
        });
    }
    
    // Печать отчетов
    const printQueue = document.getElementById('print-queue');
    if (printQueue) {
        printQueue.addEventListener('click', function() {
            printReport('queue');
        });
    }
    
    const printSettled = document.getElementById('print-settled');
    if (printSettled) {
        printSettled.addEventListener('click', function() {
            printReport('settled');
        });
    }
    
    const printDorms = document.getElementById('print-dorms');
    if (printDorms) {
        printDorms.addEventListener('click', function() {
            printReport('dorms');
        });
    }
    
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
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Обновление активного контента вкладок
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const activeTab = document.getElementById(`${tabId}-tab`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
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
    
    const dormCount = document.getElementById('dorm-count');
    const livingCount = document.getElementById('living-count');
    const queueCount = document.getElementById('queue-count');
    const freeCount = document.getElementById('free-count');
    const occupancyPercent = document.getElementById('occupancy-percent');
    
    if (dormCount) dormCount.textContent = stats.dormCount;
    if (livingCount) livingCount.textContent = stats.living;
    if (queueCount) queueCount.textContent = stats.inQueue;
    if (freeCount) freeCount.textContent = stats.totalFree;
    if (occupancyPercent) occupancyPercent.textContent = `${stats.avgOccupancyPercent}%`;
}

// Расчет статистики
function calculateStats() {
    const dormCount = appState.dorms.length;
    const inQueue = appState.queue.length;
    const living = appState.settled.length;
    const totalFree = appState.dorms.reduce((acc, d) => acc + (d.free || 0), 0);
    const totalCapacity = appState.dorms.reduce((acc, d) => acc + (d.total || 1), 0);
    const occupied = totalCapacity - totalFree;
    const avgOccupancyPercent = Math.round((occupied / (totalCapacity || 1)) * 100);
    
    return { dormCount, inQueue, living, totalFree, avgOccupancyPercent };
}

// Рендеринг очереди
function renderQueue() {
    const queueList = document.getElementById('queue-list');
    if (!queueList) return;
    
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
        const settleBtn = queueItem.querySelector('.settle-btn');
        if (settleBtn) {
            settleBtn.addEventListener('click', function() {
                const studentId = parseInt(this.getAttribute('data-student-id'));
                openSettleConfirm(studentId);
            });
        }
        
        const rejectBtn = queueItem.querySelector('.reject-btn');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function() {
                const applicationId = parseInt(this.getAttribute('data-application-id'));
                openRejectConfirm(applicationId);
            });
        }
    });
    
    // Обновление иконок
    lucide.createIcons();
}

// Получение отфильтрованной очереди
function getFilteredQueue() {
    return appState.queue
        .filter(q => q.name && q.name.toLowerCase().includes(appState.search.queue.toLowerCase()))
        .filter(q => q.score >= appState.filters.minScore && q.score <= appState.filters.maxScore)
        .filter(q => q.income >= appState.filters.minIncome && q.income <= appState.filters.maxIncome)
        .filter(q => (!appState.filters.onlyActivity || q.activity))
        .slice()
        .sort((a, b) => b.priority - a.priority);
}

// Получение бейджа приоритета
function getPriorityBadge(priority) {
    if (priority >= 650) return { text: "Высокий", class: "priority-high" };
    if (priority >= 200) return { text: "Средний", class: "priority-medium" };
    return { text: "Низкий", class: "priority-low" };
}

// Рендеринг проживающих
function renderSettled() {
    const settledList = document.getElementById('settled-list');
    if (!settledList) return;
    
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
        const evictBtn = settledItem.querySelector('.evict-btn');
        if (evictBtn) {
            evictBtn.addEventListener('click', function() {
                const residentId = parseInt(this.getAttribute('data-resident-id'));
                openEvictConfirm(residentId);
            });
        }
    });
    
    // Обновление иконок
    lucide.createIcons();
}

// Получение отфильтрованных проживающих
function getFilteredSettled() {
    return appState.settled.filter(s => 
        s.name && s.name.toLowerCase().includes(appState.search.settled.toLowerCase())
    );
}

// Рендеринг общежитий
function renderDorms() {
    const dormsGrid = document.getElementById('dorms-grid');
    if (!dormsGrid) return;
    
    const filteredDorms = getFilteredDorms();
    
    dormsGrid.innerHTML = '';
    
    if (filteredDorms.length === 0) {
        dormsGrid.innerHTML = '<div class="no-data">Нет общежитий, соответствующих фильтрам</div>';
        return;
    }
    
    filteredDorms.forEach(dorm => {
        const percentFree = Math.round(((dorm.free || 0) / (dorm.total || 1)) * 100);
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
                <div class="occupied-count">Занято: ${(dorm.total || 0) - (dorm.free || 0)} / ${dorm.total}</div>
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
    const percentFree = Math.round(((dorm.free || 0) / (dorm.total || 1)) * 100);
    if (percentFree > 20) return "status-green";
    if (percentFree >= 5) return "status-yellow";
    return "status-red";
}

// Получение отфильтрованных общежитий
function getFilteredDorms() {
    let filtered = appState.dorms.filter(d => 
        appState.filters.dormType === "all" || isDormTypeMatching(d.type, appState.filters.dormType)
    );
    
    if (appState.filters.onlyFree) {
        filtered = filtered.filter(d => (d.free || 0) > 0);
    }
    
    return filtered.slice().sort((a, b) => (b.free || 0) - (a.free || 0));
}

// Автоматический выбор общежития с проверкой типа
function autoSelectDorm(desiredType) {
    const candidates = appState.dorms.filter(d => 
        (desiredType ? isDormTypeMatching(d.type, desiredType) : true) && (d.free || 0) > 0
    );
    
    if (!candidates.length) return null;
    
    candidates.sort((a, b) => (b.free || 0) - (a.free || 0));
    return candidates[0];
}

// Открытие модального окна фильтров очереди
function openQueueFilterModal() {
    const minScore = document.getElementById('min-score');
    const maxScore = document.getElementById('max-score');
    const minIncome = document.getElementById('min-income');
    const maxIncome = document.getElementById('max-income');
    const onlyActivity = document.getElementById('only-activity');
    
    if (minScore) minScore.value = appState.filters.minScore;
    if (maxScore) maxScore.value = appState.filters.maxScore;
    if (minIncome) minIncome.value = appState.filters.minIncome;
    if (maxIncome) maxIncome.value = appState.filters.maxIncome;
    if (onlyActivity) onlyActivity.checked = appState.filters.onlyActivity;
    
    const modal = document.getElementById('queue-filter-modal');
    if (modal) modal.classList.add('active');
}

// Закрытие модального окна фильтров очереди
function closeQueueFilterModal() {
    const modal = document.getElementById('queue-filter-modal');
    if (modal) modal.classList.remove('active');
}

// Применение фильтров очереди
function applyQueueFilters() {
    const minScore = document.getElementById('min-score');
    const maxScore = document.getElementById('max-score');
    const minIncome = document.getElementById('min-income');
    const maxIncome = document.getElementById('max-income');
    const onlyActivity = document.getElementById('only-activity');
    
    if (minScore) appState.filters.minScore = Number(minScore.value) || 0;
    if (maxScore) appState.filters.maxScore = Number(maxScore.value) || 100;
    if (minIncome) appState.filters.minIncome = Number(minIncome.value) || 0;
    if (maxIncome) appState.filters.maxIncome = Number(maxIncome.value) || 999999;
    if (onlyActivity) appState.filters.onlyActivity = onlyActivity.checked;
    
    closeQueueFilterModal();
    renderQueue();
}

// Установка действия подтверждения
function setConfirmAction(action) {
    appState.confirmAction = action;
    showConfirmModal();
}

// Открытие подтверждения заселения с проверкой типа
function openSettleConfirm(studentId) {
    const student = appState.queue.find(s => s.studentId === studentId);
    if (!student) return;
    
    const recommended = autoSelectDorm(student.desiredType);
    setConfirmAction({
        type: "settle",
        studentId: studentId,
        studentDesiredType: student.desiredType, // Сохраняем желаемый тип студента
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

// Показать модальное окно подтверждения с проверкой типов
function showConfirmModal() {
    const confirmContent = document.getElementById('confirm-content');
    if (!confirmContent) return;
    
    if (appState.confirmAction.type === 'settle') {
        const student = appState.queue.find(s => s.studentId === appState.confirmAction.studentId);
        const recommendedDorm = appState.dorms.find(d => d.id === appState.confirmAction.recommendedDormId);
        
        // Получаем доступные общежития с проверкой типа
        const availableDorms = appState.dorms.filter(d => 
            (d.free || 0) > 0 && 
            (appState.confirmAction.studentDesiredType ? isDormTypeMatching(d.type, appState.confirmAction.studentDesiredType) : true)
        );
        
        confirmContent.innerHTML = `
            <h3>Заселение — выбор общежития</h3>
            <div class="student-details">Студент: <b>${student.name}</b></div>
            <div class="student-details">Желаемый тип: <b>${student.desiredType || 'Не указан'}</b></div>
            
            <div class="mt-3">
                <div class="student-details">Рекомендуемое общежитие:</div>
                <div class="student-name">${recommendedDorm ? `${recommendedDorm.address} (Тип: ${recommendedDorm.type})` : 'Нет доступных'}</div>
            </div>
            
            <div class="mt-3">
                <label class="student-details">Выберите общежитие:</label>
                <select id="dorm-select" class="confirm-select">
                    ${availableDorms.length > 0 
                        ? availableDorms.map(d => 
                            `<option value="${d.id}" ${d.id === appState.confirmAction.selectedDormId ? 'selected' : ''}>
                                №${d.id} · ${d.address} (Тип: ${d.type}, Свободно: ${d.free})
                            </option>`
                          ).join('')
                        : '<option value="">Нет доступных общежитий подходящего типа</option>'
                    }
                </select>
            </div>
            
            ${availableDorms.length === 0 ? `
                <div class="mt-3 warning-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    Нет доступных общежитий типа "${student.desiredType}". 
                    Рассмотрите возможность изменения типа общежития для студента.
                </div>
            ` : ''}
            
            <div class="modal-actions">
                <button id="cancel-confirm" class="cancel-btn">Отмена</button>
                <button id="apply-confirm" class="confirm-btn" ${availableDorms.length === 0 ? 'disabled' : ''}>Заселить</button>
            </div>
        `;
        
        // Обработчик изменения выбора общежития
        const dormSelect = document.getElementById('dorm-select');
        if (dormSelect) {
            dormSelect.addEventListener('change', function(e) {
                appState.confirmAction.selectedDormId = Number(e.target.value);
            });
        }
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
    const cancelConfirm = document.getElementById('cancel-confirm');
    if (cancelConfirm) {
        cancelConfirm.addEventListener('click', cancelConfirm);
    }
    
    const applyConfirm = document.getElementById('apply-confirm');
    if (applyConfirm) {
        applyConfirm.addEventListener('click', applyConfirmAction);
    }
    
    const modal = document.getElementById('confirm-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Отмена подтверждения
function cancelConfirm() {
    appState.confirmAction = null;
    const modal = document.getElementById('confirm-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Применение подтверждения
async function applyConfirmAction() {
    if (!appState.confirmAction) return;

    try {
        if (appState.confirmAction.type === 'settle') {
            // Дополнительная проверка типа перед заселением
            const student = appState.queue.find(s => s.studentId === appState.confirmAction.studentId);
            const selectedDorm = appState.dorms.find(d => d.id === appState.confirmAction.selectedDormId);
            
            if (student && selectedDorm && !isDormTypeMatching(student.desiredType, selectedDorm.type)) {
                if (!confirm(`Внимание! Студент желает общежитие типа "${student.desiredType}", но выбран тип "${selectedDorm.type}". Продолжить заселение?`)) {
                    return;
                }
            }
            
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
    
    .priority-high {
        background: #dc2626;
        color: white;
    }
    
    .priority-medium {
        background: #ea580c;
        color: white;
    }
    
    .priority-low {
        background: #16a34a;
        color: white;
    }
    
    .status-green {
        background: #16a34a;
    }
    
    .status-yellow {
        background: #eab308;
    }
    
    .status-red {
        background: #dc2626;
    }
    
    .dorm-status {
        height: 4px;
        border-radius: 2px 2px 0 0;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
        margin: 8px 0;
    }
    
    .progress-fill {
        height: 100%;
        background: #3b82f6;
        transition: width 0.3s ease;
    }
    
    .warning-message {
        background: #fef3cd;
        border: 1px solid #ffeaa7;
        border-radius: 4px;
        padding: 12px;
        color: #856404;
        font-size: 0.9rem;
    }
    
    .warning-message i {
        color: #f39c12;
        margin-right: 8px;
    }
    
    .confirm-select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 14px;
    }
    
    .modal-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 20px;
    }
    
    .cancel-btn {
        padding: 8px 16px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .cancel-btn:hover {
        background: #4b5563;
    }
    
    .confirm-btn {
        padding: 8px 16px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .confirm-btn:hover:not(:disabled) {
        background: #2563eb;
    }
    
    .confirm-btn:disabled {
        background: #9ca3af;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);