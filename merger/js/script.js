// Тема приложения
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.textContent = newTheme === 'light' ? 'Тёмная тема' : 'Светлая тема';
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.textContent = savedTheme === 'light' ? 'Тёмная тема' : 'Светлая тема';
    }
}

// Форматирование данных
function formatDate(dateString) {
    if (!dateString) return 'Не указана';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    } catch (e) {
        return 'Неверный формат даты';
    }
}

function formatCurrency(amount) {
    if (!amount) return 'Не указан';
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatBoolean(value) {
    return value ? 'Да' : 'Нет';
}

// Основные функции приложения
async function fetchStudentInfo() {
    console.log('Функция fetchStudentInfo вызвана');
    
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const studentInfoElement = document.getElementById('studentInfo');
    const fetchButton = document.querySelector('.fetch-btn');
    
    if (!loadingElement || !errorElement || !studentInfoElement || !fetchButton) {
        console.error('Не найдены необходимые DOM элементы');
        return;
    }
    
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    studentInfoElement.style.display = 'none';
    fetchButton.disabled = true;
    fetchButton.textContent = 'Загрузка...';
    
    try {
        console.log('Начинаем загрузку данных...');
        const response = await fetch('api/get_students.php');
        
        console.log('Получен ответ:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('Данные получены:', result);
        
        if (!result.success) {
            throw new Error(result.error || 'Неизвестная ошибка сервера');
        }
        
        loadingElement.style.display = 'none';
        fetchButton.disabled = false;
        fetchButton.textContent = 'Обновить данные студентов';
        
        displayStudentInfo(result.data);
        updateStatistics(result.data);
        
    } catch (error) {
        console.error('Error fetching student data:', error);
        loadingElement.style.display = 'none';
        fetchButton.disabled = false;
        fetchButton.textContent = 'Обновить данные студентов';
        
        errorElement.textContent = `Ошибка при загрузке данных: ${error.message}`;
        errorElement.style.display = 'block';
    }
}

function updateStatistics(students) {
    const totalStudents = students.length;
    const occupiedRooms = new Set(students.filter(s => s.room_info).map(s => s.room_info.room_id)).size;
    
    const grades = students.map(s => s.average_grade).filter(grade => grade !== null);
    const avgGrade = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2) : 0;
    
    const totalStudentsElement = document.getElementById('totalStudents');
    const occupiedRoomsElement = document.getElementById('occupiedRooms');
    const avgGradeElement = document.getElementById('avgGrade');
    
    if (totalStudentsElement) totalStudentsElement.textContent = totalStudents;
    if (occupiedRoomsElement) occupiedRoomsElement.textContent = occupiedRooms;
    if (avgGradeElement) avgGradeElement.textContent = avgGrade;
}

function displayStudentInfo(students) {
    const studentInfoElement = document.getElementById('studentInfo');
    if (!studentInfoElement) return;
    
    if (!students || students.length === 0) {
        studentInfoElement.innerHTML = '<div class="no-data">Нет данных о студентах в базе данных</div>';
        studentInfoElement.style.display = 'block';
        return;
    }
    
    let html = '<h2>Список студентов</h2>';
    
    students.forEach(student => {
        const hasResidence = student.residence_info !== null;
        const isCheckedOut = hasResidence && student.residence_info.check_out_date !== null;
        const hasRoom = student.room_info !== null;
        
        let status = 'Проживает';
        let statusClass = '';
        
        if (isCheckedOut) {
            status = 'Выселен';
            statusClass = 'status-checked-out';
        } else if (!hasRoom) {
            status = 'Без комнаты';
            statusClass = 'status-no-room';
        }
        
        html += `
            <div class="student-card">
                <h3>
                    ${student.full_name}
                    <span class="student-status ${statusClass}">${status}</span>
                </h3>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">ID студента:</span>
                        <span class="info-value">${student.id}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Телефон:</span>
                        <span class="info-value">${student.phone_number}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Дата рождения:</span>
                        <span class="info-value">${formatDate(student.date_of_birth)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Средний балл:</span>
                        <span class="info-value">${student.average_grade || 'Не указан'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Общественная работа:</span>
                        <span class="info-value">${formatBoolean(student.has_public_work)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Доход на члена семьи:</span>
                        <span class="info-value">${formatCurrency(student.family_income)}</span>
                    </div>
                    
                    ${student.residence_info ? `
                    <div class="info-item">
                        <span class="info-label">Дата заселения:</span>
                        <span class="info-value">${formatDate(student.residence_info.check_in_date)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Дата выселения:</span>
                        <span class="info-value">${formatDate(student.residence_info.check_out_date) || 'Не выселен'}</span>
                    </div>
                    ` : ''}
                    
                    ${student.room_info ? `
                    <div class="info-item">
                        <span class="info-label">Комната:</span>
                        <span class="info-value">№${student.room_info.room_id} (корпус ${student.room_info.building_number}, этаж ${student.room_info.floor})</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Вместимость комнаты:</span>
                        <span class="info-value">${student.room_info.capacity} чел.</span>
                    </div>
                    ` : ''}
                    
                    ${student.dormitory_info ? `
                    <div class="info-item">
                        <span class="info-label">Общежитие:</span>
                        <span class="info-value">${student.dormitory_info.address}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Тип общежития:</span>
                        <span class="info-value">${student.dormitory_info.type}</span>
                    </div>
                    ` : ''}
                    
                    ${student.application_info ? `
                    <div class="info-item">
                        <span class="info-label">Дата заявки:</span>
                        <span class="info-value">${formatDate(student.application_info.application_date)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Желаемый тип:</span>
                        <span class="info-value">${student.application_info.desired_type}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    studentInfoElement.innerHTML = html;
    studentInfoElement.style.display = 'block';
}

function goBack() {
    window.history.back();
}

// Функция для тестирования с локальными данными
function useTestData() {
    console.log('Используем тестовые данные');
    const testData = [
        {
            id: 1,
            full_name: "Эва",
            date_of_birth: "2000-05-15",
            phone_number: "+79991234567",
            average_grade: 4.5,
            has_public_work: true,
            family_income: 25000,
            room_info: {
                room_id: 1,
                building_number: 1,
                floor: 3,
                capacity: 2
            },
            dormitory_info: {
                dormitory_id: 1,
                address: "ул. Студенческая, д. 15",
                type: "блочного типа",
                total_capacity: 300
            },
            residence_info: {
                check_in_date: "2025-09-02",
                check_out_date: null
            },
            application_info: {
                application_date: "2025-09-01",
                desired_type: "блочного типа"
            }
        },
        {
            id: 2,
            full_name: "Иван Петров",
            date_of_birth: "2001-03-20",
            phone_number: "+79997654321",
            average_grade: 4.2,
            has_public_work: false,
            family_income: 18000,
            room_info: null,
            dormitory_info: null,
            residence_info: null,
            application_info: {
                application_date: "2025-09-10",
                desired_type: "коридорного типа"
            }
        }
    ];
    
    displayStudentInfo(testData);
    updateStatistics(testData);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем приложение');
    loadSavedTheme();
    
    // Добавляем обработчики событий
    const fetchButton = document.querySelector('.fetch-btn');
    const themeButton = document.getElementById('themeBtn');
    const backButton = document.querySelector('.back-btn');
    
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchStudentInfo);
    }
    
    if (themeButton) {
        themeButton.addEventListener('click', toggleTheme);
    }
    
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }
    
    // Автоматически загружаем данные при открытии страницы
    fetchStudentInfo();
    
    // Для тестирования используйте локальные данные (раскомментируйте строку ниже):
    // useTestData();
});