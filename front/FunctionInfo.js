// Определяем текущую тему
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

// Переключаем тему
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Загружаем сохраненную тему
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// Загружаем данные только после нажатия кнопки
async function fetchStudentInfo() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const studentInfoElement = document.getElementById('studentInfo');
    const fetchButton = document.querySelector('.fetch-btn');
    
    // Показываем загрузку, скрываем ошибки и предыдущие данные
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    studentInfoElement.style.display = 'none';
    fetchButton.disabled = true;
    fetchButton.textContent = 'Загрузка...';
    
    try {
        // Запрос к серверу
        const response = await fetch('http://127.0.0.1:2000/get/students');
        const studentsData = await response.json();
        
        loadingElement.style.display = 'none';
        fetchButton.disabled = false;
        fetchButton.textContent = 'Получить информацию о студентах';
        
        displayStudentInfo(studentsData);
        
    } catch (error) {
        loadingElement.style.display = 'none';
        fetchButton.disabled = false;
        fetchButton.textContent = 'Получить информацию о студентах';
        
        errorElement.textContent = 'Ошибка при загрузке данных: ' + error.message;
        errorElement.style.display = 'block';
    }
}

function displayStudentInfo(students) {
    const studentInfoElement = document.getElementById('studentInfo');
    
    if (students.length === 0) {
        studentInfoElement.innerHTML = '<div class="error">Нет данных о студентах</div>';
        studentInfoElement.style.display = 'block';
        return;
    }
    
    let html = '<h2>Список студентов</h2>';
    
    students.forEach(student => {
        html += `
            <div class="student-card">
                <h3>Студент #${student.student_id}</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">ФИО:</span>
                        <span class="info-value">${student.full_name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Телефон:</span>
                        <span class="info-value">${student.phone_number}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Дата рождения:</span>
                        <span class="info-value">${student.date_of_birth}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Средний балл:</span>
                        <span class="info-value">${student.average_grade}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Общественная нагрузка:</span>
                        <span class="info-value">${student.has_public_work?"да":"нет"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Доход на члена семьи:</span>
                        <span class="info-value">${student.family_income_per_member} руб.</span>
                    </div>
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

// Загружаем сохраненную тему при загрузке страницы
document.addEventListener('DOMContentLoaded', loadSavedTheme);