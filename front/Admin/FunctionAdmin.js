// FunctionAdmin.js
let currentSection = 'queue';

function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    const target = document.getElementById(sectionName + '-section');
    if (target) target.classList.add('active');

    // поставим active кнопке — ищем data-section или onclick
    let caller = document.activeElement;
    if (!caller || !caller.classList.contains('nav-btn')) {
        caller = document.querySelector(`.nav-btn[data-section="${sectionName}"]`) ||
                 Array.from(document.querySelectorAll('.nav-btn')).find(b => {
                    const attr = b.getAttribute('onclick') || '';
                    return attr.includes(`showSection('${sectionName}')`) || attr.includes(`showSection("${sectionName}")`);
                 });
    }
    if (caller) caller.classList.add('active');

    currentSection = sectionName;

    switch (sectionName) {
        case 'queue': loadQueue(); break;
        case 'dormitories': loadDormitories(); break;
        case 'residents': loadResidents(); break;
        case 'reports': break;
    }
}

function mapDormFilterValue(val) {
    if (!val) return '';
    if (val === 'family') return 'семейное';
    if (val === 'single') return 'несемейное';
    return val; // if already Russian or custom
}

async function loadQueue() {
    const dormFilterRaw = document.getElementById('dormFilter') ? document.getElementById('dormFilter').value : '';
    const dormFilter = mapDormFilterValue(dormFilterRaw);
    const statusFilter = document.getElementById('statusFilter') ? document.getElementById('statusFilter').value : 'all';

    try {
        const response = await fetch(`http://127.0.0.1:2000/get/queue?dormType=${encodeURIComponent(dormFilter)}&status=${encodeURIComponent(statusFilter)}`);
        const students = await response.json();
        displayQueue(Array.isArray(students) ? students : []);
    } catch (error) {
        console.error('Ошибка загрузки очереди:', error);
        document.getElementById('queueList').innerHTML = '<div class="error">Ошибка загрузки данных</div>';
    }
}

// Отображение очереди
function displayQueue(students) {
    const queueList = document.getElementById('queueList');

    if (!students || students.length === 0) {
        queueList.innerHTML = '<div class="no-data">Нет студентов в очереди</div>';
        return;
    }

    let html = '';
    students.forEach((student, index) => {
        const priority = Number(student.calculated_priority ?? 0);
        const priorityClass = priority > 0.7 ? 'priority-high' : priority > 0.4 ? 'priority-medium' : 'priority-low';
        const priorityPercent = (priority * 100).toFixed(1);
        const dormTypeText = student.desired_dormitory_type || student.desired_dormitory_type === '' ? (student.desired_dormitory_type || '—') : '—';

        html += `
            <div class="queue-item ${priorityClass}" data-student-id="${student.student_id}">
                <div class="queue-rank">${index + 1}</div>
                <div class="student-info">
                    <strong>${escapeHtml(student.full_name || '—')}</strong>
                    <div>Тип: ${escapeHtml(dormTypeText)} | Приоритет: ${priorityPercent}%</div>
                    <div>Балл: ${student.average_grade ?? '—'} | Доход: ${student.family_income_per_member ?? '—'} руб.</div>
                    <div>Общественная работа: ${student.has_public_work ? 'Да' : 'Нет'}</div>
                </div>
                <div class="queue-actions">
                    <button class="btn-settle" onclick="settleStudent(${student.student_id})">
                        <i class="fas fa-home"></i> Заселить
                    </button>
                    <button class="btn-reject" onclick="rejectApplication(${student.student_id})">
                        <i class="fas fa-times"></i> Отклонить
                    </button>
                </div>
            </div>
        `;
    });

    queueList.innerHTML = html;
}

async function settleStudent(studentId) {
    if (!confirm('Заселить этого студента?')) return;
    try {
        const resp = await fetch('http://127.0.0.1:2000/settle/student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ studentId })
        });
        const result = await resp.json();
        if (result.success) {
            alert('Студент успешно заселен!');
            loadQueue();
            loadResidents();
            loadDormitories();
        } else {
            alert('Ошибка: ' + (result.message || 'неизвестно'));
        }
    } catch (err) {
        alert('Ошибка при заселении: ' + (err.message || err));
    }
}

async function rejectApplication(studentId) {
    if (!confirm('Отклонить эту заявку?')) return;
    try {
        const resp = await fetch('http://127.0.0.1:2000/reject/application', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ studentId })
        });
        const result = await resp.json();
        if (result.success) {
            alert('Заявка отклонена!');
            loadQueue();
        } else {
            alert('Ошибка: ' + (result.message || 'неизвестно'));
        }
    } catch (err) {
        alert('Ошибка при отклонении: ' + (err.message || err));
    }
}

async function loadDormitories() {
    try {
        const resp = await fetch('http://127.0.0.1:2000/get/dormitories');
        const dorms = await resp.json();
        displayDormitories(Array.isArray(dorms) ? dorms : []);
        populateResidentDormFilter(Array.isArray(dorms) ? dorms : []);
    } catch (err) {
        console.error('Ошибка загрузки общежитий:', err);
        document.getElementById('dormitoriesList').innerHTML = '<div class="error">Ошибка загрузки</div>';
    }
}

function displayDormitories(dorms) {
    const dormList = document.getElementById('dormitoriesList');
    if (!dorms || dorms.length === 0) {
        dormList.innerHTML = '<div class="no-data">Нет общежитий</div>';
        return;
    }

    let html = '';
    dorms.forEach(dorm => {
        const total = dorm.total_capacity ?? 0;
        const occupied = dorm.current_occupants ?? (total - (dorm.Available_seats ?? 0));
        const free = total - occupied;
        const vacancyRate = total > 0 ? ((free / total) * 100).toFixed(1) : '0.0';
        const typeText = dorm.dormitory_type_family ?? '—';

        html += `
            <div class="dorm-card">
                <h3>${escapeHtml(dorm.address || '—')}</h3>
                <div class="dorm-stats">
                    <div class="stat-item"><div class="stat-value">${total}</div><div class="stat-label">Всего мест</div></div>
                    <div class="stat-item"><div class="stat-value">${occupied}</div><div class="stat-label">Занято</div></div>
                    <div class="stat-item"><div class="stat-value">${free}</div><div class="stat-label">Свободно</div></div>
                    <div class="stat-item"><div class="stat-value">${vacancyRate}%</div><div class="stat-label">Свободно (%)</div></div>
                </div>
                <div class="dorm-info"><p><strong>Тип:</strong> ${escapeHtml(typeText)}</p></div>
            </div>
        `;
    });
    dormList.innerHTML = html;
}

function populateResidentDormFilter(dorms) {
    const select = document.getElementById('residentDormFilter');
    if (!select) return;
    const cur = select.value;
    select.innerHTML = '<option value="">Все общежития</option>';
    dorms.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.dormitory_id;
        opt.textContent = d.address || `Общежитие ${d.dormitory_id}`;
        select.appendChild(opt);
    });
    if (cur) select.value = cur;
}

async function loadResidents() {
    try {
        const dormFilter = document.getElementById('residentDormFilter') ? document.getElementById('residentDormFilter').value : '';
        const resp = await fetch(`http://127.0.0.1:2000/get/residents?dormId=${encodeURIComponent(dormFilter)}`);
        const residents = await resp.json();
        displayResidents(Array.isArray(residents) ? residents : []);
    } catch (err) {
        console.error('Ошибка загрузки жильцов:', err);
        document.getElementById('residentsList').innerHTML = '<div class="error">Ошибка загрузки</div>';
    }
}

function displayResidents(residents) {
    const list = document.getElementById('residentsList');
    if (!residents || residents.length === 0) {
        list.innerHTML = '<div class="no-data">Нет заселенных студентов</div>';
        return;
    }

    let html = '';
    residents.forEach(r => {
        html += `
            <div class="queue-item">
                <div class="student-info">
                    <strong>${escapeHtml(r.full_name || '—')}</strong>
                    <div>Общежитие: ${escapeHtml(r.address || '—')}</div>
                    <div>Комната: ${escapeHtml(String(r.room_id))}</div>
                    <div>Заселен: ${escapeHtml(formatDate(r.check_in_date))}</div>
                </div>
                <div class="queue-actions">
                    <button class="btn-reject" onclick="evictStudent(${r.residence_id})">
                        <i class="fas fa-sign-out-alt"></i> Выселить
                    </button>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

async function evictStudent(residenceId) {
    if (!confirm('Выселить этого студента?')) return;
    try {
        const resp = await fetch('http://127.0.0.1:2000/evict/student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ residenceId })
        });
        const result = await resp.json();
        if (result.success) {
            alert('Студент выселен!');
            loadResidents();
            loadQueue();
            loadDormitories();
        } else {
            alert('Ошибка: ' + (result.message || 'неизвестно'));
        }
    } catch (err) {
        alert('Ошибка при выселении: ' + (err.message || err));
    }
}

// Отчеты
async function generateVacancyReport() {
    try {
        const resp = await fetch('http://127.0.0.1:2000/get/vacancy-report');
        const report = await resp.json();
        let html = '<table class="report-table"><tr><th>Общежитие</th><th>Тип</th><th>Всего</th><th>Занято</th><th>Свободно</th><th>Загрузка</th></tr>';
        (report || []).forEach(d => {
            const total = d.total_capacity ?? 0;
            const occupied = d.current_occupants ?? 0;
            const free = d.free_spaces ?? d.Available_seats ?? 0;
            const percent = d.vacancy_percent !== undefined ? d.vacancy_percent : (total ? ((free/total)*100).toFixed(1) : '0.0');
            const cls = Number(percent) > 20 ? 'high-vacancy' : 'low-vacancy';
            html += `<tr><td>${escapeHtml(d.address || '—')}</td><td>${escapeHtml(d.dormitory_type_family || '—')}</td><td>${total}</td><td>${occupied}</td><td class="${cls}">${free}</td><td class="${cls}">${percent}%</td></tr>`;
        });
        html += '</table>';
        document.getElementById('vacancyStats').innerHTML = html;
    } catch (err) {
        document.getElementById('vacancyStats').innerHTML = 'Ошибка загрузки отчета';
    }
}

async function generateQueueReport() {
    try {
        const resp = await fetch('http://127.0.0.1:2000/get/queue-report');
        const r = await resp.json();
        document.getElementById('queueStats').innerHTML = `<div class="stats-overview">
            <p><strong>Всего в очереди:</strong> ${r.total ?? 0}</p>
            <p><strong>Высокий приоритет:</strong> ${r.highPriority ?? 0}</p>
            <p><strong>Средний приоритет:</strong> ${r.mediumPriority ?? 0}</p>
            <p><strong>Низкий приоритет:</strong> ${r.lowPriority ?? 0}</p>
        </div>`;
    } catch (err) {
        document.getElementById('queueStats').innerHTML = 'Ошибка загрузки отчета';
    }
}

async function generateSettlementReport() {
    try {
        const resp = await fetch('http://127.0.0.1:2000/get/settlement-report');
        const r = await resp.json();
        document.getElementById('settlementStats').innerHTML = `<div class="stats-overview">
            <p><strong>Заселено всего:</strong> ${r.totalSettled ?? 0}</p>
            <p><strong>За текущий месяц:</strong> ${r.thisMonth ?? 0}</p>
            <p><strong>Среднее время в очереди:</strong> ${r.avgWaitTime ?? 0} дней</p>
        </div>`;
    } catch (err) {
        document.getElementById('settlementStats').innerHTML = 'Ошибка загрузки отчета';
    }
}

function goBack() {
    window.location.href = '../Main/Main.html';
}

document.addEventListener('DOMContentLoaded', function() {
    loadQueue();
});

// Утилиты
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}
function escapeHtml(s) {
    if (s === undefined || s === null) return '';
    return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'", '&#039;');
}
