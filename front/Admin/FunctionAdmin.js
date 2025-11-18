// FunctionAdmin.js
const adminTranslations = {
    ru: {
        admin_title: "Панель управления общежитиями",
        btn_back: "Назад",
        btn_refresh: "Обновить",
        btn_refresh_list: "Обновить список",
        nav_queue: "Очередь",
        nav_dormitories: "Общежития",
        nav_residents: "Заселенные",
        nav_reports: "Отчеты",
        queue_title: "Очередь на заселение",
        dormitories_title: "Управление общежитиями",
        residents_title: "Заселенные студенты",
        reports_title: "Отчеты и статистика",
        filter_all_types: "Все типы",
        filter_family: "Семейные",
        filter_single: "Несемейные",
        filter_all_dorms: "Все общежития",
        status_pending: "В ожидании",
        status_approved: "Одобренные",
        status_all: "Все",
        report_vacancy: "Свободные места",
        report_queue: "Статистика очереди",
        report_settlement: "Статистика заселения",
        report_click_generate: "Нажмите для генерации отчета",
        no_data: "Нет данных",
        error_loading: "Ошибка загрузки данных",
        settle_confirm: "Заселить этого студента?",
        reject_confirm: "Отклонить эту заявку?",
        evict_confirm: "Выселить этого студента?",
        success_settle: "Студент успешно заселен!",
        success_reject: "Заявка отклонена!",
        success_evict: "Студент выселен!",
        error_action: "Ошибка при выполнении действия",
        total_capacity: "Всего мест",
        occupied: "Занято",
        free: "Свободно",
        vacancy_rate: "Свободно (%)",
        dorm_type: "Тип",
        total_in_queue: "Всего в очереди",
        high_priority: "Высокий приоритет",
        medium_priority: "Средний приоритет",
        low_priority: "Низкий приоритет",
        total_settled: "Заселено всего",
        this_month: "За текущий месяц",
        avg_wait_time: "Среднее время в очереди",
        days: "дней",
        rooms: "Комнаты",
        room: "Комната",
        residents: "Жильцы",
        free_rooms: "Свободные комнаты",
        btn_settle: "Заселить",
        btn_reject: "Отклонить",
        btn_evict: "Выселить",
        btn_refresh_queue: "Обновить очередь",
        search_placeholder: "Поиск по имени",
        phone: "Телефон",
        gpa: "Средний балл",
        income: "Доход на члена семьи",
        public_work: "Общественная работа",
        application_date: "Дата заявки",
        check_in_date: "Дата заселения",
        no_free_rooms: "Нет свободных комнат"
    },
    en: {
        admin_title: "Dormitory Management Panel",
        btn_back: "Back",
        btn_refresh: "Refresh",
        btn_refresh_list: "Refresh List",
        nav_queue: "Queue",
        nav_dormitories: "Dormitories",
        nav_residents: "Residents",
        nav_reports: "Reports",
        queue_title: "Settlement Queue",
        dormitories_title: "Dormitories Management",
        residents_title: "Settled Students",
        reports_title: "Reports and Statistics",
        filter_all_types: "All Types",
        filter_family: "Family",
        filter_single: "Single",
        filter_all_dorms: "All Dormitories",
        status_pending: "Pending",
        status_approved: "Approved",
        status_all: "All",
        report_vacancy: "Vacant Places",
        report_queue: "Queue Statistics",
        report_settlement: "Settlement Statistics",
        report_click_generate: "Click to generate report",
        no_data: "No data",
        error_loading: "Error loading data",
        settle_confirm: "Settle this student?",
        reject_confirm: "Reject this application?",
        evict_confirm: "Evict this student?",
        success_settle: "Student settled successfully!",
        success_reject: "Application rejected!",
        success_evict: "Student evicted!",
        error_action: "Error performing action",
        total_capacity: "Total Capacity",
        occupied: "Occupied",
        free: "Free",
        vacancy_rate: "Vacancy Rate",
        dorm_type: "Type",
        total_in_queue: "Total in queue",
        high_priority: "High priority",
        medium_priority: "Medium priority",
        low_priority: "Low priority",
        total_settled: "Total settled",
        this_month: "This month",
        avg_wait_time: "Average wait time",
        days: "days",
        rooms: "Rooms",
        room: "Room",
        residents: "Residents",
        free_rooms: "Free rooms",
        btn_settle: "Settle",
        btn_reject: "Reject",
        btn_evict: "Evict",
        btn_refresh_queue: "Refresh Queue",
        search_placeholder: "Search by name",
        phone: "Phone",
        gpa: "GPA",
        income: "Income per family member",
        public_work: "Public work",
        application_date: "Application date",
        check_in_date: "Check-in date",
        no_free_rooms: "No free rooms"
    },
    es: {
        admin_title: "Panel de Gestión de Residencias",
        btn_back: "Atrás",
        btn_refresh: "Actualizar",
        btn_refresh_list: "Actualizar Lista",
        nav_queue: "Cola",
        nav_dormitories: "Residencias",
        nav_residents: "Residentes",
        nav_reports: "Informes",
        queue_title: "Cola de Asignación",
        dormitories_title: "Gestión de Residencias",
        residents_title: "Estudiantes Alojados",
        reports_title: "Informes y Estadísticas",
        filter_all_types: "Todos los Tipos",
        filter_family: "Familiar",
        filter_single: "Individual",
        filter_all_dorms: "Todas las Residencias",
        status_pending: "Pendiente",
        status_approved: "Aprobado",
        status_all: "Todos",
        report_vacancy: "Plazas Vacantes",
        report_queue: "Estadísticas de Cola",
        report_settlement: "Estadísticas de Asignación",
        report_click_generate: "Haga clic para generar informe",
        no_data: "No hay datos",
        error_loading: "Error al cargar datos",
        settle_confirm: "¿Alojar a este estudiante?",
        reject_confirm: "¿Rechazar esta solicitud?",
        evict_confirm: "¿Desalojar a este estudiante?",
        success_settle: "¡Estudiante alojado con éxito!",
        success_reject: "¡Solicitud rechazada!",
        success_evict: "¡Estudiante desalojado!",
        error_action: "Error al realizar la acción",
        total_capacity: "Capacidad Total",
        occupied: "Ocupado",
        free: "Libre",
        vacancy_rate: "Tasa de Ocupación",
        dorm_type: "Tipo",
        total_in_queue: "Total en cola",
        high_priority: "Alta prioridad",
        medium_priority: "Prioridad media",
        low_priority: "Baja prioridad",
        total_settled: "Total alojados",
        this_month: "Este mes",
        avg_wait_time: "Tiempo medio de espera",
        days: "días",
        rooms: "Habitaciones",
        room: "Habitación",
        residents: "Residentes",
        free_rooms: "Habitaciones libres",
        btn_settle: "Alojar",
        btn_reject: "Rechazar",
        btn_evict: "Desalojar",
        btn_refresh_queue: "Actualizar Cola",
        search_placeholder: "Buscar por nombre",
        phone: "Teléfono",
        gpa: "Promedio",
        income: "Ingreso por miembro familiar",
        public_work: "Trabajo público",
        application_date: "Fecha de solicitud",
        check_in_date: "Fecha de ingreso",
        no_free_rooms: "No hay habitaciones libres"
    }
};

let currentLang = 'ru';
let currentSection = 'queue';

function initAdminPage() {
    setupEventListeners();
    loadSavedTheme();
    loadSavedLanguage();
    updateTranslations();
    loadQueue();
    loadDormitories();
    loadResidents();
}

function setupEventListeners() {
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) languageBtn.addEventListener('click', toggleLanguageDropdown);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    document.addEventListener('click', closeLanguageDropdown);

    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    const dormFilter = document.getElementById('dormFilter');
    const statusFilter = document.getElementById('statusFilter');
    const residentDormFilter = document.getElementById('residentDormFilter');
    const dormitoriesTypeFilter = document.getElementById('dormitoriesTypeFilter');

    if (dormFilter) dormFilter.addEventListener('change', loadQueue);
    if (statusFilter) statusFilter.addEventListener('change', loadQueue);
    if (residentDormFilter) residentDormFilter.addEventListener('change', loadResidents);
    if (dormitoriesTypeFilter) dormitoriesTypeFilter.addEventListener('change', loadDormitories);
}

function toggleLanguageDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

function closeLanguageDropdown(e) {
    if (!e.target.closest('.language-selector')) {
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) dropdown.classList.remove('show');
    }
}

function changeLanguage(lang) {
    currentLang = lang || 'ru';
    updateTranslations();
    const curEl = document.getElementById('currentLanguage');
    if (curEl) curEl.textContent = lang === 'ru' ? 'Русский' : lang === 'en' ? 'English' : 'Español';
    localStorage.setItem('preferredLanguage', lang);
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.remove('show');
}

function updateTranslations() {
    const langData = adminTranslations[currentLang] || adminTranslations.ru;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) element.textContent = langData[key];
    });
    
    // Update search placeholders
    const searchInput = document.getElementById('searchByName');
    if (searchInput) searchInput.placeholder = langData.search_placeholder;
    
    const searchResidentInput = document.getElementById('searchResidentByName');
    if (searchResidentInput) searchResidentInput.placeholder = langData.search_placeholder;
    
    updateSelectOptions();
}

function updateSelectOptions() {
    const langData = adminTranslations[currentLang];
    
    const dormFilter = document.getElementById('dormFilter');
    if (dormFilter) {
        dormFilter.options[0].text = langData.filter_all_types;
        if (dormFilter.options[1]) dormFilter.options[1].text = langData.filter_family;
        if (dormFilter.options[2]) dormFilter.options[2].text = langData.filter_single;
    }

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        if (statusFilter.options[0]) statusFilter.options[0].text = langData.status_pending;
        if (statusFilter.options[1]) statusFilter.options[1].text = langData.status_approved;
        if (statusFilter.options[2]) statusFilter.options[2].text = langData.status_all;
    }

    const residentDormFilter = document.getElementById('residentDormFilter');
    if (residentDormFilter && residentDormFilter.options.length > 0) {
        residentDormFilter.options[0].text = langData.filter_all_dorms;
    }

    const dormitoriesTypeFilter = document.getElementById('dormitoriesTypeFilter');
    if (dormitoriesTypeFilter) {
        dormitoriesTypeFilter.options[0].text = langData.filter_all_types;
        if (dormitoriesTypeFilter.options[1]) dormitoriesTypeFilter.options[1].text = langData.filter_family;
        if (dormitoriesTypeFilter.options[2]) dormitoriesTypeFilter.options[2].text = langData.filter_single;
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'ru';
    changeLanguage(savedLanguage);
}

// =======================
// Навигация секций
// =======================
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const target = document.getElementById(sectionName + '-section');
    if (target) target.classList.add('active');

    const caller = Array.from(document.querySelectorAll('.nav-btn')).find(b => {
        const attr = b.getAttribute('onclick') || '';
        return attr.includes(`showSection('${sectionName}')`) || attr.includes(`showSection("${sectionName}")`);
    });
    if (caller) caller.classList.add('active');

    currentSection = sectionName;
    if (sectionName === 'queue') loadQueue();
    if (sectionName === 'dormitories') loadDormitories();
    if (sectionName === 'residents') loadResidents();
}

// Мэппинг значения фильтра типа (frontend -> backend)
function mapDormFilterValue(val) {
    if (!val) return '';
    if (val === 'family') return 'семейное';
    if (val === 'single') return 'несемейное';
    return val;
}

// =======================
// Загрузка и отображение очереди
// =======================
async function loadQueue() {
    const dormFilterRaw = document.getElementById('dormFilter') ? document.getElementById('dormFilter').value : '';
    const dormFilter = mapDormFilterValue(dormFilterRaw);
    const statusFilterRaw = document.getElementById('statusFilter') ? document.getElementById('statusFilter').value : 'all';
    const searchByName = document.getElementById('searchByName') ? document.getElementById('searchByName').value : '';
    
    const statusMap = {
        'all': 'all',
        'pending': 'pending',
        'approved': 'approved'
    };
    const statusFilter = statusMap[statusFilterRaw] || 'all';

    try {
        const url = new URL('http://127.0.0.1:2000/get/queue');
        if (dormFilter) url.searchParams.set('dormType', dormFilter);
        if (statusFilter) url.searchParams.set('status', statusFilter);
        if (searchByName) url.searchParams.set('search', searchByName);
        
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const students = await response.json();
        displayQueue(Array.isArray(students) ? students : []);
    } catch (error) {
        console.error('Ошибка загрузки очереди:', error);
        showMessage(adminTranslations[currentLang].error_loading, 'error');
        const q = document.getElementById('queueList');
        if (q) q.innerHTML = `<div class="error">${adminTranslations[currentLang].error_loading}</div>`;
    }
}

function displayQueue(students) {
    const queueList = document.getElementById('queueList');
    const langData = adminTranslations[currentLang];
    if (!queueList) return;

    if (!students || students.length === 0) {
        queueList.innerHTML = `<div class="no-data">${langData.no_data}</div>`;
        return;
    }

    let html = '';
    students.forEach((student, index) => {
        const priority = Number(student.calculated_priority ?? 0);
        const priorityClass = priority > 0.7 ? 'priority-high' : priority > 0.4 ? 'priority-medium' : 'priority-low';
        const priorityPercent = (priority * 100).toFixed(1);
        const dormTypeText = student.desired_dormitory_type || '—';
        const publicWorkText = student.has_public_work ? langData.public_work + ': Да' : langData.public_work + ': Нет';

        html += `
            <div class="queue-item ${priorityClass}" data-student-id="${student.student_id}">
                <div class="queue-rank">${index + 1}</div>
                <div class="student-info">
                    <strong>${escapeHtml(student.full_name || '—')}</strong>
                    <div class="student-details">
                        <span><i class="fas fa-home"></i> ${langData.dorm_type}: ${escapeHtml(dormTypeText)}</span>
                        <span><i class="fas fa-star"></i> ${langData.high_priority}: ${priorityPercent}%</span>
                    </div>
                    <div class="student-details">
                        <span><i class="fas fa-graduation-cap"></i> ${langData.gpa}: ${escapeHtml(String(student.average_grade ?? '—'))}</span>
                        <span><i class="fas fa-money-bill"></i> ${langData.income}: ${escapeHtml(String(student.family_income_per_member ?? '—'))}</span>
                    </div>
                    <div class="student-details">
                        <span><i class="fas fa-phone"></i> ${langData.phone}: ${escapeHtml(student.phone_number || '—')}</span>
                        <span><i class="fas fa-calendar"></i> ${langData.application_date}: ${formatDate(student.application_date)}</span>
                    </div>
                    <div>${publicWorkText}</div>
                </div>
                <div class="queue-actions">
                    <button class="btn-settle" onclick="settleStudent(${student.student_id})" title="${langData.btn_settle}">
                        <i class="fas fa-home"></i> ${langData.btn_settle}
                    </button>
                    <button class="btn-reject" onclick="rejectApplication(${student.student_id})" title="${langData.btn_reject}">
                        <i class="fas fa-times"></i> ${langData.btn_reject}
                    </button>
                </div>
            </div>
        `;
    });

    queueList.innerHTML = html;
}

// =======================
// Действия: заселение / отклонение
// =======================
async function settleStudent(studentId) {
    if (!confirm(adminTranslations[currentLang].settle_confirm)) return;
    try {
        const resp = await fetch('http://127.0.0.1:2000/settle/student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ studentId })
        });
        const result = await resp.json();
        if (result.success) {
            showMessage(adminTranslations[currentLang].success_settle, 'success');
            loadQueue();
            loadResidents();
            loadDormitories();
        } else {
            showMessage(adminTranslations[currentLang].error_action + ': ' + (result.message || adminTranslations[currentLang].no_free_rooms), 'error');
        }
    } catch (err) {
        showMessage(adminTranslations[currentLang].error_action + ': ' + (err.message || err), 'error');
    }
}

async function rejectApplication(studentId) {
    if (!confirm(adminTranslations[currentLang].reject_confirm)) return;
    try {
        const resp = await fetch('http://127.0.0.1:2000/reject/application', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ studentId })
        });
        const result = await resp.json();
        if (result.success) {
            showMessage(adminTranslations[currentLang].success_reject, 'success');
            loadQueue();
        } else {
            showMessage(adminTranslations[currentLang].error_action + ': ' + (result.message || 'неизвестно'), 'error');
        }
    } catch (err) {
        showMessage(adminTranslations[currentLang].error_action + ': ' + (err.message || err), 'error');
    }
}

// =======================
// Общежития (загрузка и отображение)
// =======================
async function loadDormitories() {
    try {
        const dormitoriesTypeFilter = document.getElementById('dormitoriesTypeFilter') ? document.getElementById('dormitoriesTypeFilter').value : '';
        const dormFilter = mapDormFilterValue(dormitoriesTypeFilter);

        const url = new URL('http://127.0.0.1:2000/get/dormitories');
        if (dormFilter) url.searchParams.set('type', dormFilter);

        const resp = await fetch(url.toString());
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const dorms = await resp.json();
        displayDormitories(Array.isArray(dorms) ? dorms : []);
        populateResidentDormFilter(Array.isArray(dorms) ? dorms : []);
    } catch (err) {
        console.error('Ошибка загрузки общежитий:', err);
        showMessage(adminTranslations[currentLang].error_loading, 'error');
        const d = document.getElementById('dormitoriesList');
        if (d) d.innerHTML = `<div class="error">${adminTranslations[currentLang].error_loading}</div>`;
    }
}

function displayDormitories(dorms) {
    const dormList = document.getElementById('dormitoriesList');
    const langData = adminTranslations[currentLang];
    if (!dormList) return;
    if (!dorms || dorms.length === 0) {
        dormList.innerHTML = `<div class="no-data">${langData.no_data}</div>`;
        return;
    }

    let html = '';
    dorms.forEach(dorm => {
        const total = dorm.total_capacity ?? 0;
        const available = (dorm.Available_seats !== undefined && dorm.Available_seats !== null) ? dorm.Available_seats : 0;
        const occupied = dorm.occupied_rooms ?? (total - available);
        const free = available;
        const vacancyRate = total > 0 ? ((free / total) * 100).toFixed(1) : '0.0';
        const typeText = dorm.dormitory_type_family ?? '—';
        const freeRooms = Math.max(0, (dorm.rooms_count ?? 0) - (dorm.occupied_rooms ?? 0));

        html += `
            <div class="dorm-card">
                <div class="dorm-header">
                    <h3><i class="fas fa-building"></i> ${escapeHtml(dorm.address || '—')}</h3>
                    <span class="dorm-type ${typeText === 'семейное' ? 'family-type' : 'single-type'}">${escapeHtml(typeText)}</span>
                </div>
                <div class="dorm-stats">
                    <div class="stat-item">
                        <div class="stat-value">${total}</div>
                        <div class="stat-label">${langData.total_capacity}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value ${occupied > 0 ? 'occupied' : ''}">${occupied}</div>
                        <div class="stat-label">${langData.occupied}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value ${free > 0 ? 'free' : 'no-free'}">${free}</div>
                        <div class="stat-label">${langData.free}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value ${free > 0 ? 'free' : 'no-free'}">${vacancyRate}%</div>
                        <div class="stat-label">${langData.vacancy_rate}</div>
                    </div>
                </div>
                <div class="dorm-details">
                    <div class="detail-item">
                        <i class="fas fa-door-closed"></i>
                        <span>${langData.rooms}: ${dorm.rooms_count ?? 0}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-door-open"></i>
                        <span>${langData.free_rooms}: ${freeRooms}</span>
                    </div>
                </div>
                <div class="dorm-status">
                    <div class="status-indicator ${free > 0 ? 'has-vacancy' : 'no-vacancy'}">
                        ${free > 0 ? '<i class="fas fa-check-circle"></i> Есть свободные места' : '<i class="fas fa-times-circle"></i> Нет свободных мест'}
                    </div>
                </div>
            </div>
        `;
    });

    dormList.innerHTML = html;
}

function populateResidentDormFilter(dorms) {
    const select = document.getElementById('residentDormFilter');
    if (!select) return;
    const cur = select.value;
    const langData = adminTranslations[currentLang];

    select.innerHTML = `<option value="">${langData.filter_all_dorms}</option>`;
    dorms.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.dormitory_id;
        opt.textContent = d.address || `Общежитие ${d.dormitory_id}`;
        select.appendChild(opt);
    });
    if (cur) select.value = cur;
}

// =======================
// Жильцы (загрузка и отображение)
// =======================
async function loadResidents() {
    try {
        const dormFilter = document.getElementById('residentDormFilter') ? document.getElementById('residentDormFilter').value : '';
        const searchResidentByName = document.getElementById('searchResidentByName') ? document.getElementById('searchResidentByName').value : '';
        
        const url = new URL('http://127.0.0.1:2000/get/residents');
        if (dormFilter) url.searchParams.set('dormId', dormFilter);
        if (searchResidentByName) url.searchParams.set('search', searchResidentByName);
        
        const resp = await fetch(url.toString());
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const residents = await resp.json();
        displayResidents(Array.isArray(residents) ? residents : []);
    } catch (err) {
        console.error('Ошибка загрузки жильцов:', err);
        showMessage(adminTranslations[currentLang].error_loading, 'error');
        const list = document.getElementById('residentsList');
        if (list) list.innerHTML = `<div class="error">${adminTranslations[currentLang].error_loading}</div>`;
    }
}

function displayResidents(residents) {
    const list = document.getElementById('residentsList');
    const langData = adminTranslations[currentLang];
    if (!list) return;

    if (!residents || residents.length === 0) {
        list.innerHTML = `<div class="no-data">${langData.no_data}</div>`;
        return;
    }

    let html = '';
    residents.forEach(r => {
        html += `
            <div class="queue-item resident-item">
                <div class="student-info">
                    <strong><i class="fas fa-user"></i> ${escapeHtml(r.full_name || '—')}</strong>
                    <div class="resident-details">
                        <span><i class="fas fa-building"></i> ${escapeHtml(r.address || '—')}</span>
                        <span><i class="fas fa-door-open"></i> ${langData.room}: ${escapeHtml(String(r.room_number || r.room_id || '—'))}</span>
                    </div>
                    <div class="resident-details">
                        <span><i class="fas fa-calendar-check"></i> ${langData.check_in_date}: ${formatDate(r.check_in_date)}</span>
                        <span><i class="fas fa-id-card"></i> ID: ${r.student_id}</span>
                    </div>
                </div>
                <div class="queue-actions">
                    <button class="btn-reject" onclick="evictStudent(${r.residence_id})" title="${langData.btn_evict}">
                        <i class="fas fa-sign-out-alt"></i> ${langData.btn_evict}
                    </button>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

async function evictStudent(residenceId) {
    if (!confirm(adminTranslations[currentLang].evict_confirm)) return;
    try {
        const resp = await fetch('http://127.0.0.1:2000/evict/student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ residenceId })
        });
        const result = await resp.json();
        if (result.success) {
            showMessage(adminTranslations[currentLang].success_evict, 'success');
            loadResidents();
            loadQueue();
            loadDormitories();
        } else {
            showMessage(adminTranslations[currentLang].error_action + ': ' + (result.message || 'неизвестно'), 'error');
        }
    } catch (err) {
        showMessage(adminTranslations[currentLang].error_action + ': ' + (err.message || err), 'error');
    }
}

// =======================
// Отчёты
// =======================
async function generateVacancyReport() {
    try {
        const resp = await fetch('http://127.0.0.1:2000/get/vacancy-report');
        const report = await resp.json();
        const langData = adminTranslations[currentLang];

        let html = `<div class="report-table-container">
            <table class="report-table">
                <thead>
                    <tr>
                        <th>${langData.dormitories_title}</th>
                        <th>${langData.dorm_type}</th>
                        <th>${langData.total_capacity}</th>
                        <th>${langData.occupied}</th>
                        <th>${langData.free}</th>
                        <th>${langData.vacancy_rate}</th>
                    </tr>
                </thead>
                <tbody>`;

        (report || []).forEach(d => {
            const total = d.total_capacity ?? 0;
            const occupied = d.current_occupants ?? (total - (d.Available_seats ?? 0));
            const free = d.free_spaces ?? d.Available_seats ?? 0;
            const percent = (d.vacancy_percent !== undefined && d.vacancy_percent !== null) ? d.vacancy_percent : (total ? ((free/total)*100).toFixed(1) : '0.0');
            const cls = Number(percent) > 20 ? 'high-vacancy' : Number(percent) > 5 ? 'medium-vacancy' : 'low-vacancy';
            html += `<tr>
                <td>${escapeHtml(d.address || '—')}</td>
                <td>${escapeHtml(d.dormitory_type_family || '—')}</td>
                <td>${total}</td>
                <td>${occupied}</td>
                <td class="${cls}">${free}</td>
                <td class="${cls}">${percent}%</td>
            </tr>`;
        });
        html += '</tbody></table></div>';
        const el = document.getElementById('vacancyStats');
        if (el) el.innerHTML = html;
    } catch (err) {
        console.error('Ошибка генерации отчета вакансий:', err);
        const el = document.getElementById('vacancyStats');
        if (el) el.innerHTML = `<div class="error">${adminTranslations[currentLang].error_loading}</div>`;
    }
}

async function generateQueueReport() {
    try {
        const resp = await fetch('http://127.0.0.1:2000/get/queue-report');
        const r = await resp.json();
        const langData = adminTranslations[currentLang];
        const el = document.getElementById('queueStats');
        if (el) {
            el.innerHTML = `<div class="stats-overview">
                <div class="stat-card">
                    <div class="stat-number">${r.total ?? 0}</div>
                    <div class="stat-title">${langData.total_in_queue}</div>
                </div>
                <div class="stat-card priority-high">
                    <div class="stat-number">${r.highPriority ?? 0}</div>
                    <div class="stat-title">${langData.high_priority}</div>
                </div>
                <div class="stat-card priority-medium">
                    <div class="stat-number">${r.mediumPriority ?? 0}</div>
                    <div class="stat-title">${langData.medium_priority}</div>
                </div>
                <div class="stat-card priority-low">
                    <div class="stat-number">${r.lowPriority ?? 0}</div>
                    <div class="stat-title">${langData.low_priority}</div>
                </div>
            </div>`;
        }
    } catch (err) {
        console.error('Ошибка генерации отчета очереди:', err);
        const el = document.getElementById('queueStats');
        if (el) el.innerHTML = `<div class="error">${adminTranslations[currentLang].error_loading}</div>`;
    }
}

async function generateSettlementReport() {
    try {
        const resp = await fetch('http://127.0.0.1:2000/get/settlement-report');
        const r = await resp.json();
        const langData = adminTranslations[currentLang];
        const el = document.getElementById('settlementStats');
        if (el) {
            el.innerHTML = `<div class="stats-overview">
                <div class="stat-card">
                    <div class="stat-number">${r.totalSettled ?? 0}</div>
                    <div class="stat-title">${langData.total_settled}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${r.thisMonth ?? 0}</div>
                    <div class="stat-title">${langData.this_month}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${r.avgWaitTime ?? 0}</div>
                    <div class="stat-title">${langData.avg_wait_time} (${langData.days})</div>
                </div>
            </div>`;
        }
    } catch (err) {
        console.error('Ошибка генерации отчета заселения:', err);
        const el = document.getElementById('settlementStats');
        if (el) el.innerHTML = `<div class="error">${adminTranslations[currentLang].error_loading}</div>`;
    }
}

function goBack() {
    window.location.href = '../Main/Main.html';
}

// =======================
// Утилиты
// =======================
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}

function escapeHtml(s) {
    if (s === undefined || s === null) return '';
    return String(s)
        .replaceAll('&','&amp;')
        .replaceAll('<','&lt;')
        .replaceAll('>','&gt;')
        .replaceAll('"','&quot;')
        .replaceAll("'", '&#039;');
}

function showMessage(message, type) {
    const existing = document.querySelector('.admin-message');
    if (existing) existing.remove();
    const messageEl = document.createElement('div');
    messageEl.className = `admin-message admin-message-${type}`;
    messageEl.textContent = message;
    document.body.appendChild(messageEl);
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (messageEl.parentNode) messageEl.remove();
            }, 300);
        }
    }, 4000);
}

// Поиск студента по имени (расширенный)
window.searchStudent = async function(name) {
    if (!name) {
        showMessage('Введите имя для поиска (в консоли: searchStudent("Иван"))', 'error');
        return;
    }
    try {
        const url = new URL('http://127.0.0.1:2000/search/students');
        url.searchParams.set('name', name);
        const resp = await fetch(url.toString());
        const data = await resp.json();
        console.log('searchStudent result:', data);
        if (!data || data.length === 0) {
            showMessage(adminTranslations[currentLang].no_data, 'error');
            return;
        }
        
        // Показываем подробную информацию о найденных студентах
        let message = `Найдено студентов: ${data.length}\n\n`;
        data.forEach((student, index) => {
            message += `${index + 1}. ${student.full_name}\n`;
            message += `   GPA: ${student.average_grade || '—'}\n`;
            message += `   Доход: ${student.family_income_per_member || '—'}\n`;
            message += `   Заселен: ${student.is_settled ? 'Да' : 'Нет'}\n`;
            message += `   Комната: ${student.room_id || '—'}\n`;
            message += `   Дата заселения: ${formatDate(student.check_in_date) || '—'}\n`;
            message += `   Последняя заявка: ${formatDate(student.last_application_date) || '—'}\n\n`;
        });
        
        alert(message);
    } catch (err) {
        console.error(err);
        showMessage(adminTranslations[currentLang].error_loading, 'error');
    }
};

document.addEventListener('DOMContentLoaded', initAdminPage);