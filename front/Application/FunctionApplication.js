// FunctionApplication.js
const applicationTranslations = {
    ru: {
        btn_back:"На главную",
        btn_status:"Статус заявки",
        application_title: "Подача заявки в общежитие",
        application_description: "Заполните анкету для рассмотрения вашей заявки на заселение в студенческий городок",
        contact_title: "Регистрация студента",
        contact_description: "Заполните анкету для заселения в студенческий городок",
        form_personal_info: "Личная информация",
        form_full_name: "ФИО",
        form_birth_date: "Дата рождения",
        form_phone: "Номер телефона",
        form_academic_info: "Учебная информация",
        form_gpa: "Средний балл",
        form_gpa_note: "От 2.0 до 10.0",
        form_public_work: "Общественная нагрузка",
        form_public_work_label: "Наличие общественной нагрузки",
        form_public_work_note: "Участие в студенческих организациях, волонтерство и т.д.",
        form_dormitory_type: "Тип общежития",
        form_dormitory_type_label: "Выберите тип общежития",
        form_regular_dorm: "Обычное общежитие",
        form_family_dorm: "Семейное общежитие",
        form_dormitory_note: "Семейное общежитие предназначено для студентов, состоящих в браке",
        form_financial_info: "Финансовая информация",
        form_family_income: "Средний доход на члена семьи (в месяц)",
        form_income_note: "Укажите средний доход на одного члена семьи в белорусских рублях",
        form_submit: "Отправить заявку",
        error_required: "Пожалуйста, заполните все обязательные поля",
        error_gpa_range: "Средний балл должен быть от 2.0 до 10.0",
        error_future_date: "Дата рождения не может быть в будущем",
        error_negative_income: "Доход не может быть отрицательным",
        error_full_name: "Введите полное ФИО (минимум имя и фамилию)",
        error_server: "Ошибка при отправке заявки",
        success_submit: "Заявка успешно отправлена!"
    },
    en: {
        btn_back:"to the main",
        btn_status:"application status",
        application_title: "Dormitory Application",
        application_description: "Fill out the application form for consideration of your accommodation in the student campus",
        contact_title: "Student Registration",
        contact_description: "Fill out the application form for campus accommodation",
        form_personal_info: "Personal Information",
        form_full_name: "Full Name",
        form_birth_date: "Date of Birth",
        form_phone: "Phone Number",
        form_academic_info: "Academic Information",
        form_gpa: "Average Grade",
        form_gpa_note: "From 2.0 to 10.0",
        form_public_work: "Public Activities",
        form_public_work_label: "Participation in public activities",
        form_public_work_note: "Participation in student organizations, volunteering, etc.",
        form_dormitory_type: "Dormitory Type",
        form_dormitory_type_label: "Select dormitory type",
        form_regular_dorm: "Regular Dormitory",
        form_family_dorm: "Family Dormitory",
        form_dormitory_note: "Family dormitory is intended for married students",
        form_financial_info: "Financial Information",
        form_family_income: "Average Income per Family Member (monthly)",
        form_income_note: "Specify the average income per family member in Belarusian rubles",
        form_submit: "Submit Application",
        error_required: "Please fill in all required fields",
        error_gpa_range: "Average grade must be from 2.0 to 10.0",
        error_future_date: "Birth date cannot be in the future",
        error_negative_income: "Income cannot be negative",
        error_full_name: "Please enter full name (at least first and last name)",
        error_server: "Error submitting application",
        success_submit: "Application submitted successfully!"
    },
    es: {
        btn_back:"Inicio",
        btn_status:"estado de la solicitud",
        application_title: "Solicitud de Residencia",
        application_description: "Complete el formulario de solicitud para considerar su alojamiento en el campus estudiantil",
        contact_title: "Registro de Estudiante",
        contact_description: "Complete el formulario de solicitud para alojamiento en el campus",
        form_personal_info: "Información Personal",
        form_full_name: "Nombre Completo",
        form_birth_date: "Fecha de Nacimiento",
        form_phone: "Número de Teléfono",
        form_academic_info: "Información Académica",
        form_gpa: "Promedio de Calificaciones",
        form_gpa_note: "De 2.0 a 10.0",
        form_public_work: "Actividades Públicas",
        form_public_work_label: "Participación en actividades públicas",
        form_public_work_note: "Participación en organizaciones estudiantiles, voluntariado, etc.",
        form_dormitory_type: "Tipo de Residencia",
        form_dormitory_type_label: "Seleccione el tipo de residencia",
        form_regular_dorm: "Residencia Regular",
        form_family_dorm: "Residencia Familiar",
        form_dormitory_note: "La residencia familiar está destinada a estudiantes casados",
        form_financial_info: "Información Financiera",
        form_family_income: "Ingreso Promedio por Miembro Familiar (mensual)",
        form_income_note: "Especifique el ingreso promedio por miembro familiar en rublos bielorrusos",
        form_submit: "Enviar Solicitud",
        error_required: "Por favor, complete todos los campos obligatorios",
        error_gpa_range: "El promedio debe ser de 2.0 a 10.0",
        error_future_date: "La fecha de nacimiento no puede ser en el futuro",
        error_negative_income: "El ingreso no puede ser negativo",
        error_full_name: "Por favor ingrese nombre completo (al menos nombre y apellido)",
        error_server: "Error al enviar la solicitud",
        success_submit: "¡Solicitud enviada con éxito!"
    }
};

let currentLang = 'ru';

function initApplicationPage() {
    setupEventListeners();
    loadSavedTheme();
    loadSavedLanguage();
    updateTranslations();
}

function setupEventListeners() {
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', submitApplication);
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    const gpaInput = document.getElementById('gpa');
    if (gpaInput) {
        gpaInput.addEventListener('change', validateGPA);
    }
    
    // Добавляем обработчики для очистки ошибок при вводе
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => clearFieldError(input.id));
        input.addEventListener('focus', () => clearFieldError(input.id));
    });
    
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.addEventListener('click', toggleLanguageDropdown);
    }
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    document.addEventListener('click', closeLanguageDropdown);
    
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
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
    const langData = applicationTranslations[lang];
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
    
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

function updateTranslations() {
    const langData = applicationTranslations[currentLang];
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('375')) {
        value = value.substring(3);
    }
    
    value = value.substring(0, 9);
    let formattedValue = '+375 (';
    
    if (value.length > 0) {
        formattedValue += value.substring(0, 2);
    }
    if (value.length > 2) {
        formattedValue += ') ' + value.substring(2, 5);
    }
    if (value.length > 5) {
        formattedValue += '-' + value.substring(5, 7);
    }
    if (value.length > 7) {
        formattedValue += '-' + value.substring(7, 9);
    }
    
    e.target.value = formattedValue;
}

function validateGPA(e) {
    const value = parseFloat(e.target.value);
    if (value < 2.0 || value > 10.0) {
        showFieldError('gpa', applicationTranslations[currentLang].error_gpa_range);
        e.target.value = '';
    } else {
        clearFieldError('gpa');
    }
}



// Функция для показа ошибки поля
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Добавляем класс ошибки
    field.classList.add('field-error');
    
    // Показываем сообщение об ошибке
    showMessage(message, 'error');
    
    // Фокусируемся на поле с ошибкой
    field.focus();
}

// Функция для очистки ошибки поля
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('field-error');
    }
}

// Очистка всех ошибок
function clearAllErrors() {
    const errorFields = document.querySelectorAll('.field-error');
    errorFields.forEach(field => field.classList.remove('field-error'));
}

// Функция для показа сообщений
function showMessage(message, type) {
    // Удаляем существующие сообщения
    const existingMessage = document.querySelector('.application-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Создаем новое сообщение
    const messageEl = document.createElement('div');
    messageEl.className = `application-message application-message-${type}`;
    messageEl.textContent = message;
    
    // Добавляем в тело документа
    document.body.appendChild(messageEl);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 300);
        }
    }, 5000);
}

async function submitApplication(e) {
    e.preventDefault();
    
    // Очищаем предыдущие ошибки
    clearAllErrors();
    
    let hasErrors = false;
    let firstErrorField = null;
    
    // Проверка обязательных полей
    const requiredFields = ['fullName', 'birthDate', 'phone', 'gpa', 'familyIncome'];
    for (let field of requiredFields) {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            if (!firstErrorField) firstErrorField = field;
            showFieldError(field, applicationTranslations[currentLang].error_required);
            hasErrors = true;
        }
    }
    
    if (hasErrors) {
        if (firstErrorField) {
            document.getElementById(firstErrorField).focus();
        }
        return;
    }
    
    // Проверка GPA
    const gpaValue = parseFloat(document.getElementById('gpa').value);
    if (gpaValue < 2.0 || gpaValue > 10.0) {
        showFieldError('gpa', applicationTranslations[currentLang].error_gpa_range);
        document.getElementById('gpa').focus();
        return;
    }
    
    // Проверка даты рождения (не будущее время)
    const birthDate = new Date(document.getElementById('birthDate').value);
    const today = new Date();
    if (birthDate > today) {
        showFieldError('birthDate', applicationTranslations[currentLang].error_future_date);
        document.getElementById('birthDate').focus();
        return;
    }
    
    // Проверка дохода (не отрицательный)
    const incomeValue = parseFloat(document.getElementById('familyIncome').value);
    if (incomeValue < 0) {
        showFieldError('familyIncome', applicationTranslations[currentLang].error_negative_income);
        document.getElementById('familyIncome').focus();
        return;
    }
    
    // Проверка ФИО (минимум 2 слова)
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName.split(' ').length < 2) {
        showFieldError('fullName', applicationTranslations[currentLang].error_full_name);
        document.getElementById('fullName').focus();
        return;
    }
    
    const dormitoryType = document.querySelector('input[name="dormitoryType"]:checked').value;
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        birthDate: document.getElementById('birthDate').value,
        phone: document.getElementById('phone').value,
        gpa: gpaValue,
        publicWork: document.getElementById('publicWork').checked,
        familyIncome: incomeValue
    };

    try {
        // Сначала добавляем студента и получаем его ID

        const responseStudent = await fetch('http://127.0.0.1:2000/add/students', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        const studentResult = await responseStudent.json();

        if (studentResult.success) {
            const formApplication = {
                date: new Date().toISOString().split('T')[0], 
                type: dormitoryType === 'family' ? "Семейное" : "Не семейное",
            };

            const responseApplication = await fetch('http://127.0.0.1:2000/add/application', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formApplication)
            });

            const applicationResult = await responseApplication.json();

            if (applicationResult.success) {
                showMessage(applicationTranslations[currentLang].success_submit, 'success')
                setTimeout(() => {
                    localStorage.setItem("id", studentResult.studentId)
                    goToStudentInfo();
                }, 1500);
            } else {
                showMessage(applicationTranslations[currentLang].error_server, 'error');
            }
        } else {
            showMessage(applicationTranslations[currentLang].error_server, 'error');
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        showMessage(applicationTranslations[currentLang].error_server, 'error');
    }
}


function goToMainPage() {
    try {
        window.location.href = '../Main/Main.html';
    } catch (error) {
        const link = document.createElement('a');
        link.href = '../Main/сайт главная.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function goToStudentInfo() {
    try {
        window.location.href = '../Queue/queue.html';
    } catch (error) {
        const link = document.createElement('a');
        link.href = '../Info/info.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

document.addEventListener('DOMContentLoaded', initApplicationPage);