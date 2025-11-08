// FunctionStatus.js
let currentLang = 'ru';

function initStatusPage() {
    setupEventListeners();
    loadSavedTheme();
    loadSavedLanguage();
    displayStatus();
    loadQueue();
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
    document.getElementById('currentLanguage').textContent = 
        lang === 'ru' ? 'Русский' : lang === 'en' ? 'English' : 'Español';
    localStorage.setItem('preferredLanguage', lang);
    
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

function displayStatus() {
    const statusContent = document.getElementById('statusContent');
    
    // Получаем сохраненные данные заявки
    const savedApplication = localStorage.getItem('lastApplication');
    
    if (!savedApplication) {
        statusContent.innerHTML = `
            <div class="no-application">
                <i class="fas fa-file-alt"></i>
                <h3>Заявка не найдена</h3>
                <p>Подайте новую заявку для получения места в очереди</p>
            </div>
        `;
        return;
    }
    
    const application = JSON.parse(savedApplication);
    const position = Math.floor(Math.random() * 50) + 1; // Демо-позиция
    const totalInQueue = 50; // Общее количество
    
    statusContent.innerHTML = `
        <div class="status-info">
            <div class="status-item">
                <strong>ФИО:</strong>
                <span>${application.fullName}</span>
            </div>
            <div class="status-item">
                <strong>Дата подачи:</strong>
                <span>${application.applicationDate}</span>
            </div>
            <div class="status-item">
                <strong>Ваша позиция в очереди:</strong>
                <span class="queue-position">${position}</span>
            </div>
            <div class="status-item">
                <strong>Всего заявок в очереди:</strong>
                <span>${totalInQueue}</span>
            </div>
            <div class="status-item">
                <strong>Уровень приоритета:</strong>
                <span class="priority-badge ${application.priority > 0.7 ? 'high' : application.priority > 0.4 ? 'medium' : 'low'}">
                    ${application.priority > 0.7 ? 'Высокий' : application.priority > 0.4 ? 'Средний' : 'Низкий'}
                </span>
            </div>
            <div class="status-item">
                <strong>Примерное время ожидания:</strong>
                <span>${Math.floor(position * 2.5)} дней</span>
            </div>
            <div class="progress-container">
                <div class="progress-label">
                    Прогресс: ${Math.round(((totalInQueue - position + 1) / totalInQueue) * 100)}%
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((totalInQueue - position + 1) / totalInQueue) * 100}%"></div>
                </div>
            </div>
        </div>
    `;
}

function loadQueue() {
    const queueList = document.getElementById('queueList');
    const savedApplication = localStorage.getItem('lastApplication');
    
    if (!savedApplication) {
        queueList.innerHTML = '<div class="no-application">Нет данных об очереди</div>';
        return;
    }
    
    const userApplication = JSON.parse(savedApplication);
    const userPosition = Math.floor(Math.random() * 50) + 1;
    
    // Генерируем демо-очередь
    let queueHTML = '';
    const totalInQueue = 50;
    
    for (let i = 1; i <= totalInQueue; i++) {
        const isCurrentUser = i === userPosition;
        const randomPriority = Math.random();
        let priorityText, priorityClass;
        
        if (randomPriority > 0.7) {
            priorityText = 'Высокий';
            priorityClass = 'high';
        } else if (randomPriority > 0.4) {
            priorityText = 'Средний';
            priorityClass = 'medium';
        } else {
            priorityText = 'Низкий';
            priorityClass = 'low';
        }
        
        const names = ['Иванов Иван', 'Петрова Анна', 'Сидоров Алексей', 'Козлова Мария', 'Смирнов Дмитрий'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        queueHTML += `
            <div class="queue-item ${isCurrentUser ? 'current-user' : ''}">
                <div class="queue-rank">${i}</div>
                <div class="queue-info">
                    <strong>${isCurrentUser ? userApplication.fullName : randomName}</strong>
                    <div class="queue-details">
                        Приоритет: <span class="priority-badge ${priorityClass}">${priorityText}</span>
                        ${isCurrentUser ? ' • <strong>Ваша заявка</strong>' : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    queueList.innerHTML = queueHTML;
}

function refreshStatus() {
    const statusContent = document.getElementById('statusContent');
    const queueList = document.getElementById('queueList');
    
    statusContent.innerHTML = `
        <div class="loading-status">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Обновление статуса...</p>
        </div>
    `;
    
    queueList.innerHTML = `
        <div class="loading-status">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Обновление очереди...</p>
        </div>
    `;
    
    setTimeout(() => {
        displayStatus();
        loadQueue();
    }, 1500);
}

function goToMainPage() {
    window.location.href = '../Main/сайт главная.html';
}

function goToApplicationPage() {
    window.location.href = 'application.html';
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initStatusPage);

// Обработчики для выбора языка
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        changeLanguage(lang);
    });
});