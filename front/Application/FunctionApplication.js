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
        form_financial_info: "Финансовая информация",
        form_family_income: "Средний доход на члена семьи (в месяц)",
        form_income_note: "Укажите средний доход на одного члена семьи в белорусских рублях",
        form_submit: "Отправить заявку",
        success_title: "Заявка успешно отправлена!",
        priority_text: "Ваш приоритет в очереди:",
        priority_low: "Низкий приоритет",
        priority_medium: "Средний приоритет",
        priority_high: "Высокий приоритет",
        success_message: "Ваша заявка принята в обработку. Мы свяжемся с вами при наличии свободных мест.",
        btn_main: "На главную",
        btn_another: "Подать еще одну заявку"
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
        form_financial_info: "Financial Information",
        form_family_income: "Average Income per Family Member (monthly)",
        form_income_note: "Specify the average income per family member in Belarusian rubles",
        form_submit: "Submit Application",
        success_title: "Application Submitted Successfully!",
        priority_text: "Your queue priority:",
        priority_low: "Low priority",
        priority_medium: "Medium priority",
        priority_high: "High priority",
        success_message: "Your application has been accepted for processing. We will contact you when places become available.",
        btn_main: "To Main Page",
        btn_another: "Submit Another Application"
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
        form_financial_info: "Información Financiera",
        form_family_income: "Ingreso Promedio por Miembro Familiar (mensual)",
        form_income_note: "Especifique el ingreso promedio por miembro familiar en rublos bielorrusos",
        form_submit: "Enviar Solicitud",
        success_title: "¡Solicitud Enviada Exitosamente!",
        priority_text: "Su prioridad en la cola:",
        priority_low: "Prioridad baja",
        priority_medium: "Prioridad media",
        priority_high: "Prioridad alta",
        success_message: "Su solicitud ha sido aceptada para procesamiento. Nos contactaremos con usted cuando haya plazas disponibles.",
        btn_main: "A la Página Principal",
        btn_another: "Enviar Otra Solicitud"
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
        alert(currentLang === 'ru' ? 'Средний балл должен быть от 2.0 до 10.0' : 
              currentLang === 'en' ? 'Average grade must be from 2.0 to 10.0' : 
              'El promedio debe ser de 2.0 a 10.0');
        e.target.value = '';
        e.target.focus();
    }
}

function calculatePriority() {
    const income = parseFloat(document.getElementById('familyIncome')?.value) || 0;
    const gpa = parseFloat(document.getElementById('gpa')?.value) || 0;
    const hasPublicWork = document.getElementById('publicWork')?.checked || false;
    
    const incomeWeight = 0.5;
    const gradeWeight = 0.3;
    const activityBonus = 0.2;
    
    const maxIncome = 5000;
    const normalizedIncome = Math.max(0, 1 - (income / maxIncome));
    const normalizedGrade = Math.max(0, (gpa - 2.0) / 8.0);
    const activityPoints = hasPublicWork ? activityBonus : 0;
    
    const priority = (normalizedIncome * incomeWeight) + 
                    (normalizedGrade * gradeWeight) + 
                    activityPoints;
    
    return Math.min(1, Math.max(0, priority));
}

async function submitApplication(e) {
    e.preventDefault();
    
    const requiredFields = ['fullName', 'birthDate', 'phone', 'gpa', 'familyIncome'];
    for (let field of requiredFields) {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            alert(currentLang === 'ru' ? 'Пожалуйста, заполните все обязательные поля' :
                  currentLang === 'en' ? 'Please fill in all required fields' :
                  'Por favor, complete todos los campos obligatorios');
            element.focus();
            return;
        }
    }
    
    const gpaValue = parseFloat(document.getElementById('gpa').value);
    if (gpaValue < 2.0 || gpaValue > 10.0) {
        alert(currentLang === 'ru' ? 'Средний балл должен быть от 2.0 до 10.0' : 
              currentLang === 'en' ? 'Average grade must be from 2.0 to 10.0' : 
              'El promedio debe ser de 2.0 a 10.0');
        return;
    }
    
    const finalPriority = calculatePriority();
    const priorityPercent = Math.round(finalPriority * 100);
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        birthDate: document.getElementById('birthDate').value,
        phone: document.getElementById('phone').value,
        gpa: gpaValue,
        publicWork: document.getElementById('publicWork').checked,
        familyIncome: parseFloat(document.getElementById('familyIncome').value),
        priority: finalPriority,
        applicationDate: new Date().toISOString(),
        status: 'pending'
    };
    
    try {
        const response = await fetch('http://127.0.0.1:2000/add/students', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showSuccessModal(priorityPercent);
        } else {
            throw new Error('Server error: ' + response.status);
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        showSuccessModal(priorityPercent);
    }
}

function showSuccessModal(priorityPercent) {
    const modal = document.getElementById('successModal');
    const finalPriorityElement = document.getElementById('finalPriority');
    const priorityDescriptionElement = document.getElementById('priorityDescription');
    
    if (finalPriorityElement) {
        finalPriorityElement.textContent = priorityPercent + '%';
    }
    
    let description;
    let descriptionKey;
    if (priorityPercent >= 70) {
        description = applicationTranslations[currentLang].priority_high;
        descriptionKey = 'priority_high';
    } else if (priorityPercent >= 40) {
        description = applicationTranslations[currentLang].priority_medium;
        descriptionKey = 'priority_medium';
    } else {
        description = applicationTranslations[currentLang].priority_low;
        descriptionKey = 'priority_low';
    }
    
    if (priorityDescriptionElement) {
        priorityDescriptionElement.textContent = description;
        priorityDescriptionElement.setAttribute('data-translate', descriptionKey);
    }
    
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
    }
    
    const form = document.getElementById('studentForm');
    if (form) {
        form.reset();
    }
}

function goToMainPage() {
    try {
        window.location.href = '../Main/сайт главная.html';
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
        window.location.href = '../Info/info.html';
    } catch (error) {
        const link = document.createElement('a');
        link.href = '../Info/info.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

document.addEventListener('DOMContentLoaded', initApplicationPage);

document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        changeLanguage(lang);
    });
});