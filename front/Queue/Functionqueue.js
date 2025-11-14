// Functionqueue.js - Modern Queue Management System
let currentLang = 'ru';
let currentUser = null;
let queueData = [];

// Translation dictionary
const translations = {
    ru: {
        title: "Статус вашей заявки",
        subtitle: "Проверьте текущее положение в очереди на заселение",
        backToMain: "На главную",
        newApplication: "Новая заявка",
        loading: "Загрузка...",
        noApplication: "Заявка не найдена",
        noApplicationText: "Подайте новую заявку для получения места в очереди",
        refresh: "Обновить статус",
        yourPosition: "Ваша позиция в очереди",
        totalApplications: "Всего заявок в очереди",
        priorityLevel: "Уровень приоритета",
        estimatedWait: "Примерное время ожидания",
        progress: "Прогресс",
        currentQueue: "Текущая очередь на заселение",
        yourApplication: "Ваша заявка",
        days: "дней",
        high: "Высокий",
        medium: "Средний",
        low: "Низкий",
        fullName: "ФИО",
        income: "Доход на члена семьи",
        grade: "Средний балл",
        publicWork: "Общественная работа",
        dormType: "Тип общежития",
        priority: "Приоритет",
        position: "Позиция",
        yes: "Да",
        no: "Нет",
        error: "Ошибка",
        errorLoading: "Ошибка загрузки данных"
    },
    en: {
        title: "Your Application Status",
        subtitle: "Check your current position in the accommodation queue",
        backToMain: "Back to Main",
        newApplication: "New Application",
        loading: "Loading...",
        noApplication: "Application Not Found",
        noApplicationText: "Submit a new application to get a place in the queue",
        refresh: "Refresh Status",
        yourPosition: "Your position in queue",
        totalApplications: "Total applications in queue",
        priorityLevel: "Priority level",
        estimatedWait: "Estimated waiting time",
        progress: "Progress",
        currentQueue: "Current Accommodation Queue",
        yourApplication: "Your application",
        days: "days",
        high: "High",
        medium: "Medium",
        low: "Low",
        fullName: "Full Name",
        income: "Family Income per Member",
        grade: "Average Grade",
        publicWork: "Public Work",
        dormType: "Desired Dormitory Type",
        priority: "Priority",
        position: "Position",
        yes: "Yes",
        no: "No",
        error: "Error",
        errorLoading: "Error loading data"
    },
    es: {
        title: "Estado de tu Solicitud",
        subtitle: "Verifica tu posición actual en la cola de alojamiento",
        backToMain: "Volver al Inicio",
        newApplication: "Nueva Solicitud",
        loading: "Cargando...",
        noApplication: "Solicitud No Encontrada",
        noApplicationText: "Envía una nueva solicitud para obtener un lugar en la cola",
        refresh: "Actualizar Estado",
        yourPosition: "Tu posición en la cola",
        totalApplications: "Total de solicitudes en cola",
        priorityLevel: "Nivel de prioridad",
        estimatedWait: "Tiempo de espera estimado",
        progress: "Progreso",
        currentQueue: "Cola Actual de Alojamiento",
        yourApplication: "Tu solicitud",
        days: "días",
        high: "Alto",
        medium: "Medio",
        low: "Bajo",
        fullName: "Nombre Completo",
        income: "Ingreso Familiar por Miembro",
        grade: "Promedio General",
        publicWork: "Trabajo Público",
        dormType: "Tipo de Residencia Deseado",
        priority: "Prioridad",
        position: "Posición",
        yes: "Sí",
        no: "No",
        error: "Error",
        errorLoading: "Error al cargar datos"
    }
};

async function initStatusPage() {
    setupEventListeners();
    loadSavedTheme();
    loadSavedLanguage();
    await loadCurrentUser();
    await loadQueueData();
    updateUI();
}

function setupEventListeners() {
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.addEventListener('click', toggleLanguageDropdown);
    }
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    document.addEventListener('click', closeLanguageDropdown);
}

function toggleLanguageDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.toggle('show');
}

function closeLanguageDropdown(e) {
    if (!e.target.closest('.language-selector')) {
        const dropdown = document.getElementById('languageDropdown');
        dropdown.classList.remove('show');
    }
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateUI();
    
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.remove('show');
}

function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'ru';
    changeLanguage(savedLanguage);
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

async function loadCurrentUser() {
    try {
        const studentId = localStorage.getItem('id');
        if (!studentId) {
            console.log('No student ID found in localStorage');
            return;
        }

        // Получаем данные очереди и находим текущего пользователя
        const response = await fetch('http://127.0.0.1:2000/get/queue');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const userData = data.find(item => item.student_id == studentId);
        
        if (userData) {
            currentUser = userData;
            console.log('Current user loaded:', currentUser);
        } else {
            console.log('User not found in queue data');
            currentUser = null;
        }
    } catch (error) {
        console.error('Error loading current user:', error);
        showError(translations[currentLang].errorLoading);
    }
}

async function loadQueueData() {
    try {
        const response = await fetch('http://127.0.0.1:2000/get/queue');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        queueData = await response.json();
        console.log('Queue data loaded:', queueData);

        // Сортируем по приоритету (по убыванию)
        queueData.sort((a, b) => b.calculated_priority - a.calculated_priority);

    } catch (error) {
        console.error('Error loading queue data:', error);
        showError(translations[currentLang].errorLoading);
        queueData = [];
    }
}

function showError(message) {
    const statusContent = document.getElementById('statusContent');
    if (statusContent) {
        statusContent.innerHTML = `
            <div class="no-application">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>${translations[currentLang].error}</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

function updateUI() {
    updateHeader();
    displayStatus();
    displayQueue();
}

function updateHeader() {
    const headerTitle = document.querySelector('.header-content h1');
    const headerSubtitle = document.querySelector('.header-content p');
    const backBtn = document.querySelector('.back-btn span');
    const newAppBtn = document.querySelector('.info-btn span');
    const refreshBtn = document.querySelector('.status-actions .btn');
    const queueTitle = document.querySelector('.queue-section h3');
    const currentLanguage = document.getElementById('currentLanguage');

    if (headerTitle) headerTitle.textContent = translations[currentLang].title;
    if (headerSubtitle) headerSubtitle.textContent = translations[currentLang].subtitle;
    if (backBtn) backBtn.textContent = translations[currentLang].backToMain;
    if (newAppBtn) newAppBtn.textContent = translations[currentLang].newApplication;
    if (refreshBtn) refreshBtn.innerHTML = `<i class="fas fa-sync-alt"></i> ${translations[currentLang].refresh}`;
    if (queueTitle) queueTitle.textContent = translations[currentLang].currentQueue;
    if (currentLanguage) {
        currentLanguage.textContent = currentLang === 'ru' ? 'Русский' : 
                                    currentLang === 'en' ? 'English' : 'Español';
    }
}

function displayStatus() {
    const statusContent = document.getElementById('statusContent');
    
    if (!currentUser) {
        statusContent.innerHTML = `
            <div class="no-application">
                <i class="fas fa-file-alt"></i>
                <h3>${translations[currentLang].noApplication}</h3>
                <p>${translations[currentLang].noApplicationText}</p>
            </div>
        `;
        return;
    }

    const userPosition = queueData.findIndex(item => item.student_id === currentUser.student_id) + 1;
    const totalInQueue = queueData.length;
    const priorityLevel = getPriorityLevel(currentUser.calculated_priority);
    const estimatedWait = Math.floor(userPosition * 2.5);
    const progressPercentage = totalInQueue > 0 ? ((totalInQueue - userPosition + 1) / totalInQueue) * 100 : 0;

    statusContent.innerHTML = `
        <div class="status-info">
            <div class="status-item">
                <strong>${translations[currentLang].fullName}:</strong>
                <span>${currentUser.full_name || 'Не указано'}</span>
            </div>
            <div class="status-item">
                <strong>${translations[currentLang].income}:</strong>
                <span>${(currentUser.family_income_per_member || 0).toLocaleString()} ₽</span>
            </div>
            <div class="status-item">
                <strong>${translations[currentLang].grade}:</strong>
                <span>${currentUser.average_grade || 'Не указано'}</span>
            </div>
            <div class="status-item">
                <strong>${translations[currentLang].publicWork}:</strong>
                <span>${currentUser.has_public_work ? translations[currentLang].yes : translations[currentLang].no}</span>
            </div>
            <div class="status-item">
                <strong>${translations[currentLang].dormType}:</strong>
                <span>${currentUser.desired_dormitory_type || 'Не указано'}</span>
            </div>
            <div class="status-item">
                <strong>${translations[currentLang].yourPosition}:</strong>
                <span class="queue-position">${userPosition}</span>
            </div>
            <div class="status-item">
                <strong>${translations[currentLang].totalApplications}:</strong>
                <span>${totalInQueue}</span>
            </div>
            <div class="status-item">
                <strong>${translations[currentLang].priorityLevel}:</strong>
                <span class="priority-badge ${priorityLevel}">
                    ${translations[currentLang][priorityLevel]}
                </span>
            </div>
            <div class="status-item">
                <strong>${translations[currentLang].estimatedWait}:</strong>
                <span>${estimatedWait} ${translations[currentLang].days}</span>
            </div>
            <div class="progress-container">
                <div class="progress-label">
                    ${translations[currentLang].progress}: ${Math.round(progressPercentage)}%
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
        </div>
    `;
}

function displayQueue() {
    const queueList = document.getElementById('queueList');
    
    if (queueData.length === 0) {
        queueList.innerHTML = `<div class="no-application">${translations[currentLang].noApplication}</div>`;
        return;
    }

    let queueHTML = '';
    
    queueData.forEach((item, index) => {
        const position = index + 1;
        const isCurrentUser = currentUser && item.student_id === currentUser.student_id;
        const priorityLevel = getPriorityLevel(item.calculated_priority);
        const publicWorkText = item.has_public_work ? translations[currentLang].yes : translations[currentLang].no;

        queueHTML += `
            <div class="queue-item ${isCurrentUser ? 'current-user' : ''}">
                <div class="queue-rank">${position}</div>
                <div class="queue-info">
                    <div class="queue-header">
                        <strong>${item.full_name || 'Не указано'}</strong>
                        <span class="priority-badge ${priorityLevel}">
                            ${translations[currentLang][priorityLevel]}
                        </span>
                    </div>
                    <div class="queue-details">
                        <div class="detail-row">
                            <span>${translations[currentLang].income}: ${(item.family_income_per_member || 0).toLocaleString()} ₽</span>
                            <span>${translations[currentLang].grade}: ${item.average_grade || 'Не указано'}</span>
                        </div>
                        <div class="detail-row">
                            <span>${translations[currentLang].publicWork}: ${publicWorkText}</span>
                            <span>${translations[currentLang].dormType}: ${item.desired_dormitory_type || 'Не указано'}</span>
                        </div>
                        ${isCurrentUser ? `<div class="user-indicator">${translations[currentLang].yourApplication}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    queueList.innerHTML = queueHTML;
}

function getPriorityLevel(priority) {
    if (!priority) return 'low';
    if (priority > 0.7) return 'high';
    if (priority > 0.4) return 'medium';
    return 'low';
}

async function refreshStatus() {
    const statusContent = document.getElementById('statusContent');
    const queueList = document.getElementById('queueList');
    
    statusContent.innerHTML = `
        <div class="loading-status">
            <i class="fas fa-spinner fa-spin"></i>
            <p>${translations[currentLang].loading}</p>
        </div>
    `;
    
    queueList.innerHTML = `
        <div class="loading-status">
            <i class="fas fa-spinner fa-spin"></i>
            <p>${translations[currentLang].loading}</p>
        </div>
    `;
    
    try {
        await loadCurrentUser();
        await loadQueueData();
        updateUI();
    } catch (error) {
        console.error('Error refreshing status:', error);
        showError(translations[currentLang].errorLoading);
    }
}

function goToMainPage() {
    window.location.href = '../Main/Main.html';
}

function goToApplicationPage() {
    window.location.href = '../Application/application.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initStatusPage().catch(error => {
        console.error('Error initializing page:', error);
        showError(translations[currentLang].errorLoading);
    });
});

// Language selection handlers
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// Add some CSS for new elements
const additionalStyles = `
    .queue-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
        gap: 10px;
    }
    .detail-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
        font-size: 0.85rem;
        flex-wrap: wrap;
        gap: 5px;
    }
    .user-indicator {
        background: var(--secondary);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        margin-top: 6px;
        display: inline-block;
    }
    .loading-status {
        text-align: center;
        padding: 40px;
        color: var(--text);
    }
    .loading-status i {
        font-size: 2rem;
        margin-bottom: 15px;
        color: var(--secondary);
    }
    @media (max-width: 768px) {
        .queue-header {
            flex-direction: column;
            align-items: flex-start;
        }
        .detail-row {
            flex-direction: column;
            align-items: flex-start;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.innerText = additionalStyles;
document.head.appendChild(styleSheet);