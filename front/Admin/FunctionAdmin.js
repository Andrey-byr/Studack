// FunctionAdmin.js
let currentSection = 'queue';

function showSection(sectionName) {
    // Скрыть все секции
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Убрать активный класс у всех кнопок
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показать выбранную секцию
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Активировать соответствующую кнопку
    event.currentTarget.classList.add('active');
    
    currentSection = sectionName;
    
    // Загрузить данные для секции
    switch(sectionName) {
        case 'queue':
            loadQueue();
            break;
        case 'dormitories':
            loadDormitories();
            break;
        case 'residents':
            loadResidents();
            break;
        case 'reports':
            // Отчеты загружаются по клику
            break;
    }
}

// Загрузка очереди
async function loadQueue() {
    const dormFilter = document.getElementById('dormFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    try {
        const response = await fetch(`http://127.0.0.1:2000/get/queue?dormType=${dormFilter}&status=${statusFilter}`);
        const students = await response.json();
        displayQueue(students);
    } catch (error) {
        console.error('Ошибка загрузки очереди:', error);
        document.getElementById('queueList').innerHTML = '<div class="error">Ошибка загрузки данных</div>';
    }
}

// Отображение очереди
function displayQueue(students) {
    const queueList = document.getElementById('queueList');
    
    if (students.length === 0) {
        queueList.innerHTML = '<div class="no-data">Нет студентов в очереди</div>';
        return;
    }
    
    let html = '';
    students.forEach((student, index) => {
        const priorityClass = student.priority > 0.7 ? 'priority-high' : 
                             student.priority > 0.4 ? 'priority-medium' : 'priority-low';
        
        const priorityPercent = (student.priority * 100).toFixed(1);
        const dormTypeText = student.dorm_type_preference === 'family' ? 'Семейное' : 'Несемейное';
        
        html += `
            <div class="queue-item ${priorityClass}" data-student-id="${student.student_id}">
                <div class="queue-rank">${index + 1}</div>
                <div class="student-info">
                    <strong>${student.full_name}</strong>
                    <div>Тип: ${dormTypeText} | Приоритет: ${priorityPercent}%</div>
                    <div>Балл: ${student.average_grade} | Доход: ${student.family_income_per_member} руб.</div>
                    <div>Общественная работа: ${student.has_public_work ? 'Да' : 'Нет'}</div>
                    ${student.family_status ? `<div>Семейное положение: ${student.family_status}</div>` : ''}
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

// Заселение студента
async function settleStudent(studentId) {
    if (!confirm('Заселить этого студента?')) return;
    
    try {
        const response = await fetch('http://127.0.0.1:2000/settle/student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({studentId})
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Студент успешно заселен!');
            loadQueue();
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        alert('Ошибка при заселении: ' + error.message);
    }
}

// Отклонение заявки
async function rejectApplication(studentId) {
    if (!confirm('Отклонить эту заявку?')) return;
    
    try {
        const response = await fetch('http://127.0.0.1:2000/reject/application', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({studentId})
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Заявка отклонена!');
            loadQueue();
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        alert('Ошибка при отклонении заявки: ' + error.message);
    }
}

// Загрузка информации об общежитиях
async function loadDormitories() {
    try {
        const response = await fetch('http://127.0.0.1:2000/get/dormitories');
        const dorms = await response.json();
        displayDormitories(dorms);
    } catch (error) {
        console.error('Ошибка загрузки общежитий:', error);
    }
}

// Отображение общежитий
function displayDormitories(dorms) {
    const dormList = document.getElementById('dormitoriesList');
    
    let html = '';
    dorms.forEach(dorm => {
        const vacancyRate = ((dorm.total_capacity - dorm.current_occupants) / dorm.total_capacity * 100).toFixed(1);
        const dormTypeText = dorm.dormitory_type.includes('семей') ? 'Семейное' : 'Несемейное';
        
        html += `
            <div class="dorm-card">
                <h3>${dorm.address}</h3>
                <div class="dorm-stats">
                    <div class="stat-item">
                        <div class="stat-value">${dorm.total_capacity}</div>
                        <div class="stat-label">Всего мест</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${dorm.current_occupants}</div>
                        <div class="stat-label">Занято</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${dorm.total_capacity - dorm.current_occupants}</div>
                        <div class="stat-label">Свободно</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${vacancyRate}%</div>
                        <div class="stat-label">Загрузка</div>
                    </div>
                </div>
                <div class="dorm-info">
                    <p><strong>Тип:</strong> ${dormTypeText}</p>
                    <p><strong>Корпусов:</strong> ${dorm.building_count}</p>
                </div>
            </div>
        `;
    });
    
    dormList.innerHTML = html;
}

// Загрузка заселенных студентов
async function loadResidents() {
    try {
        const dormFilter = document.getElementById('residentDormFilter').value;
        const response = await fetch(`http://127.0.0.1:2000/get/residents?dormId=${dormFilter}`);
        const residents = await response.json();
        displayResidents(residents);
    } catch (error) {
        console.error('Ошибка загрузки жильцов:', error);
    }
}

// Отображение заселенных студентов
function displayResidents(residents) {
    const residentsList = document.getElementById('residentsList');
    
    if (residents.length === 0) {
        residentsList.innerHTML = '<div class="no-data">Нет заселенных студентов</div>';
        return;
    }
    
    let html = '';
    residents.forEach(resident => {
        html += `
            <div class="queue-item">
                <div class="student-info">
                    <strong>${resident.full_name}</strong>
                    <div>Общежитие: ${resident.address}</div>
                    <div>Комната: ${resident.building_number}-${resident.floor}-${resident.room_number}</div>
                    <div>Заселен: ${resident.check_in_date}</div>
                </div>
                <div class="queue-actions">
                    <button class="btn-reject" onclick="evictStudent(${resident.residence_id})">
                        <i class="fas fa-sign-out-alt"></i> Выселить
                    </button>
                </div>
            </div>
        `;
    });
    
    residentsList.innerHTML = html;
}

// Выселение студента
async function evictStudent(residenceId) {
    if (!confirm('Выселить этого студента?')) return;
    
    try {
        const response = await fetch('http://127.0.0.1:2000/evict/student', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({residenceId})
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Студент выселен!');
            loadResidents();
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        alert('Ошибка при выселении: ' + error.message);
    }
}

// Генерация отчета о свободных местах
async function generateVacancyReport() {
    try {
        const response = await fetch('http://127.0.0.1:2000/get/vacancy-report');
        const report = await response.json();
        
        let html = '<table class="report-table">';
        html += '<tr><th>Общежитие</th><th>Тип</th><th>Всего мест</th><th>Занято</th><th>Свободно</th><th>Загрузка</th></tr>';
        
        report.forEach(dorm => {
            const vacancyRate = ((dorm.total_capacity - dorm.current_occupants) / dorm.total_capacity * 100).toFixed(1);
            const vacancyClass = vacancyRate > 20 ? 'high-vacancy' : 'low-vacancy';
            
            html += `
                <tr>
                    <td>${dorm.address}</td>
                    <td>${dorm.dormitory_type}</td>
                    <td>${dorm.total_capacity}</td>
                    <td>${dorm.current_occupants}</td>
                    <td class="${vacancyClass}">${dorm.total_capacity - dorm.current_occupants}</td>
                    <td class="${vacancyClass}">${vacancyRate}%</td>
                </tr>
            `;
        });
        
        html += '</table>';
        document.getElementById('vacancyStats').innerHTML = html;
    } catch (error) {
        document.getElementById('vacancyStats').innerHTML = 'Ошибка загрузки отчета';
    }
}

// Генерация отчета об очереди
async function generateQueueReport() {
    try {
        const response = await fetch('http://127.0.0.1:2000/get/queue-report');
        const report = await response.json();
        
        let html = `<div class="stats-overview">
            <p><strong>Всего в очереди:</strong> ${report.total}</p>
            <p><strong>Высокий приоритет:</strong> ${report.highPriority}</p>
            <p><strong>Средний приоритет:</strong> ${report.mediumPriority}</p>
            <p><strong>Низкий приоритет:</strong> ${report.lowPriority}</p>
        </div>`;
        
        document.getElementById('queueStats').innerHTML = html;
    } catch (error) {
        document.getElementById('queueStats').innerHTML = 'Ошибка загрузки отчета';
    }
}

// Генерация отчета о заселении
async function generateSettlementReport() {
    try {
        const response = await fetch('http://127.0.0.1:2000/get/settlement-report');
        const report = await response.json();
        
        let html = `<div class="stats-overview">
            <p><strong>Заселено всего:</strong> ${report.totalSettled}</p>
            <p><strong>За текущий месяц:</strong> ${report.thisMonth}</p>
            <p><strong>Среднее время в очереди:</strong> ${report.avgWaitTime} дней</p>
        </div>`;
        
        document.getElementById('settlementStats').innerHTML = html;
    } catch (error) {
        document.getElementById('settlementStats').innerHTML = 'Ошибка загрузки отчета';
    }
}

// Назад к главной странице
function goBack() {
    window.location.href = '../Main/сайт главная.html';
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    loadQueue();
});