

// Language translations
const translations = {
    ru: {
        // Language selector
        currentLanguage: "Русский",
        
        information_about_studant:"Информация об очереди",
        status_application: "Статус заявки",
        verification_title: "Проверка данных",
        verification_name: "Имя:",
        verification_age: "Возраст:",
        verification_cancel: "Отмена",
        verification_confirm: "Подтвердить",
        student_application:"Подать заявку в общежитие",
        login:"Войти в систему",
        
        // Navigation
        logo: "СТУДГОРОДОК",
        nav_about: "О кампусе",
        nav_services: "Услуги",
        nav_gallery: "Галерея",
        
        // Hero section
        hero_title: "СТУДЕНЧЕСКИЙ\nГОРОДОК",
        hero_description: "Современное пространство для учебы, жизни и развития. Инновационная инфраструктура, созданная для комфорта и успеха каждого студента.",
        hero_button: "Зарегистрироваться",
        hero_button2: "Авторизация",
        
        // About section
        about_title: "О нашем кампусе",
        about_description: "Современное образовательное пространство, где технологии встречаются с комфортом",
        feature1_title: "Умные общежития",
        feature1_description: "Современные комнаты с системой умного дома, индивидуальным дизайном и эргономичной мебелью для комфортного проживания",
        feature2_title: "Образовательные пространства",
        feature2_description: "Современные аудитории, лаборатории и коворкинги, оборудованные по последнему слову техники",
        feature3_title: "Экологичная среда",
        feature3_description: "Энергоэффективные здания, зеленые зоны и экологически чистые материалы для здоровой атмосферы",
        
        // Services section
        services_title: "Наши услуги",
        services_description: "Комплексный подход к организации студенческой жизни",
        service1_title: "Цифровая инфраструктура",
        service1_description: "Высокоскоростной интернет, облачные сервисы и цифровые образовательные платформы",
        service2_title: "Питание",
        service2_description: "Современные столовые и кафе с разнообразным и здоровым меню по доступным ценам",
        service3_title: "Безопасность",
        service3_description: "Круглосуточная охрана, система видеонаблюдения и современные системы контроля доступа",
        service4_title: "Спорт и здоровье",
        service4_description: "Современный спортивный комплекс, медицинский центр и зоны для активного отдыха",
        
        // Gallery section
        gallery_title: "Галерея кампуса",
        gallery_description: "Познакомьтесь с атмосферой нашего студенческого городка",
        
        // Student Form
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
        form_additional_info: "Дополнительная информация",
        form_additional_placeholder: "Особые пожелания, медицинские показания, другая важная информация...",
        form_submit: "Отправить заявку",
        
        // Footer
        footer_title: "СТУДЕНЧЕСКИЙ ГОРОДОК",
        footer_description: "Современное пространство для учебы, жизни и развития студентов с полным комплексом услуг и инфраструктуры.",
        footer_contacts: "Контакты",
        footer_address: "г. Минск, ул. Колесникова, 3",
        footer_links: "Быстрые ссылки",
        footer_copyright: "Студенческий городок. Все права защищены."
    },
    en: {
        currentLanguage: "English",
        information_about_studant:"Queue Information",
        status_application: "Application Status",
        verification_title: "Data Verification",
        verification_name: "Name:",
        verification_age: "Age:",
        verification_cancel: "Cancel",
        verification_confirm: "Confirm",
        student_application:"Submit a Dormitory Application",
        login:"Log in system",
        logo: "STUDENT CAMPUS",
        nav_about: "About Campus",
        nav_services: "Services",
        nav_gallery: "Gallery",
        hero_title: "STUDENT\nCAMPUS",
        hero_description: "Modern space for studying, living and development. Innovative infrastructure created for the comfort and success of every student.",
        hero_button: "Register Now",
        hero_button2:"authorization",
        about_title: "About Our Campus",
        about_description: "Modern educational space where technology meets comfort",
        feature1_title: "Smart Dormitories",
        feature1_description: "Modern rooms with smart home systems, individual design and ergonomic furniture for comfortable living",
        feature2_title: "Educational Spaces",
        feature2_description: "Modern classrooms, laboratories and coworking spaces equipped with the latest technology",
        feature3_title: "Eco-friendly Environment",
        feature3_description: "Energy-efficient buildings, green areas and environmentally friendly materials for a healthy atmosphere",
        services_title: "Our Services",
        services_description: "Comprehensive approach to student life organization",
        service1_title: "Digital Infrastructure",
        service1_description: "High-speed internet, cloud services and digital educational platforms",
        service2_title: "Catering",
        service2_description: "Modern canteens and cafes with diverse and healthy menus at affordable prices",
        service3_title: "Security",
        service3_description: "24/7 security, video surveillance system and modern access control systems",
        service4_title: "Sports & Health",
        service4_description: "Modern sports complex, medical center and active recreation areas",
        gallery_title: "Campus Gallery",
        gallery_description: "Get acquainted with the atmosphere of our student campus",
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
        form_additional_info: "Additional Information",
        form_additional_placeholder: "Special requests, medical conditions, other important information...",
        form_submit: "Submit Application",
        footer_title: "STUDENT CAMPUS",
        footer_description: "Modern space for studying, living and student development with a full range of services and infrastructure.",
        footer_contacts: "Contacts",
        footer_address: "Minsk, Kolesnikova str., 3",
        footer_links: "Quick Links",
        footer_copyright: "Student Campus. All rights reserved."
    },
    es: {
        currentLanguage: "Español",
        information_about_studant: "Información de la cola",
        status_application: "Estado de la Solicitud",
        verification_title: "Verificación de Datos",
        verification_name: "Nombre:",
        verification_age: "Edad:",
        verification_cancel: "Cancelar",
        verification_confirm: "Confirmar",
        student_application: "Enviar una solicitud de residencia",
        login: "Iniciar sesión",
        logo: "CAMPUS ESTUDIANTIL",
        nav_about: "Sobre el Campus",
        nav_services: "Servicios",
        nav_gallery: "Galería",
        hero_title: "CAMPUS\nESTUDIANTIL",
        hero_description: "Espacio moderno para estudiar, vivir y desarrollarse. Infraestructura innovadora creada para la comodidad y el éxito de cada estudiante.",
        hero_button: "Registrarse",
        hero_button2: "autorización",
        about_title: "Sobre nuestro campus",
        about_description: "Espacio educativo moderno donde la tecnología se encuentra con la comodidad",
        feature1_title: "Residencias inteligentes",
        feature1_description: "Habitaciones modernas con sistemas de domótica, diseño individual y muebles ergonómicos para una vida cómoda",
        feature2_title: "Espacios educativos",
        feature2_description: "Aulas modernas, laboratorios y espacios de coworking equipados con la última tecnología",
        feature3_title: "Medio ambiente ecológico",
        feature3_description: "Edificios energéticamente eficientes, zonas verdes y materiales ecológicos para un ambiente saludable",
        services_title: "Nuestros servicios",
        services_description: "Enfoque integral para la organización de la vida estudiantil",
        service1_title: "Infraestructura digital",
        service1_description: "Internet de alta velocidad, servicios en la nube y plataformas educativas digitales",
        service2_title: "Alimentación",
        service2_description: "Comedores y cafés modernos con menús diversos y saludables a precios asequibles",
        service3_title: "Seguridad",
        service3_description: "Vigilancia 24/7, sistema de videovigilancia y sistemas modernos de control de acceso",
        service4_title: "Deporte y salud",
        service4_description: "Complejo deportivo moderno, centro médico y zonas de recreo activo",
        gallery_title: "Galería del campus",
        gallery_description: "Conozca el ambiente de nuestro campus estudiantil",
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
        form_additional_info: "Información Adicional",
        form_additional_placeholder: "Solicitudes especiales, condiciones médicas, otra información importante...",
        form_submit: "Enviar Solicitud",
        footer_title: "CAMPUS ESTUDIANTIL",
        footer_description: "Espacio moderno para estudiar, vivir y desarrollarse con gama completa de servicios e infraestructura.",
        footer_contacts: "Contactos",
        footer_address: "Minsk, calle Kolesnikova, 3",
        footer_links: "Enlaces rápidos",
        footer_copyright: "Campus Estudiantil. Todos los derechos reservados."
    }
};

// Language management
let currentLang = 'ru';

function changeLanguage(lang) {
    currentLang = lang;
    const langData = translations[lang];
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = langData[key];
            } else {
                // Handle newlines in titles
                if (key === 'hero_title') {
                    element.innerHTML = langData[key].replace('\n', '<br>');
                } else {
                    element.textContent = langData[key];
                }
            }
        }
    });
    
    // Update current language display
    document.getElementById('currentLanguage').textContent = langData.currentLanguage;
    
    // Save to localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Close dropdown
    document.getElementById('languageDropdown').classList.remove('show');
}

// Language selector functionality
document.getElementById('languageBtn').addEventListener('click', function() {
    document.getElementById('languageDropdown').classList.toggle('show');
});

document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.language-selector')) {
        document.getElementById('languageDropdown').classList.remove('show');
    }
});

// Load saved language
const savedLanguage = localStorage.getItem('preferredLanguage') || 'ru';
changeLanguage(savedLanguage);

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('header');
    if (parallax) {
        parallax.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});
function goToStudentInfo() {
    window.location.href = `../Info/info.html`
}
function goToStudentApplication(){
    window.location.href = `../Application/application.html`
}
function goToLogin(){
    window.location.href = `../Login/login.html`
}

function goToQueue() {
    window.location.href = `../Queue/queue.html`;
}

function ModalOpen() {
    const modal = document.getElementById("verificationModal");
    modal.classList.add("active");
    
    document.body.style.overflow = "hidden";
    
    document.getElementById("inputName").value = "";
    document.getElementById("inputAge").value = "";
}

function ModalClose() {
    const modal = document.getElementById("verificationModal");
    modal.classList.remove("active");
    
    document.body.style.overflow = "auto";
}

function showModalMessage(message, type = 'info') {
    const existingMessages = document.querySelectorAll('.modal-message');
    existingMessages.forEach(msg => {
        if (msg.classList.contains(`modal-message-${type}`)) {
            msg.remove();
        }
    });
    
    
    const messageEl = document.createElement('div');
    messageEl.className = `modal-message modal-message-${type}`;
    

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    messageEl.innerHTML = `
        <span class="modal-message-icon">${icons[type] || icons.info}</span>
        <span class="modal-message-content">${message}</span>
        <button class="modal-message-close">&times;</button>
    `;
    

    document.body.appendChild(messageEl);
    

    const closeBtn = messageEl.querySelector('.modal-message-close');
    closeBtn.addEventListener('click', () => {
        removeModalMessage(messageEl);
    });
    

    const durations = {
        success: 5000,
        error: 7000,
        warning: 6000,
        info: 4000
    };
    
    const autoRemoveTimeout = setTimeout(() => {
        removeModalMessage(messageEl);
    }, durations[type] || 5000);
    

    function removeModalMessage(element) {
        if (element && element.parentNode) {
            clearTimeout(autoRemoveTimeout);
            element.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (element && element.parentNode) {
                    element.remove();
                }
            }, 300);
        }
    }
    

    messageEl.removeMessage = () => removeModalMessage(messageEl);
    
    return messageEl;
}


function showModalFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    

    field.classList.add('modal-field-error');
    

    showModalMessage(message, 'error');
    

    field.focus();
    

    const clearErrorHandler = () => {
        field.classList.remove('modal-field-error');
        field.removeEventListener('input', clearErrorHandler);
        field.removeEventListener('focus', clearErrorHandler);
    };
    
    field.addEventListener('input', clearErrorHandler);
    field.addEventListener('focus', clearErrorHandler);
}


function clearModalFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('modal-field-error');
    }
}


function clearAllModalErrors() {
    const errorFields = document.querySelectorAll('.modal-field-error');
    errorFields.forEach(field => field.classList.remove('modal-field-error'));
}


document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('closeModal').addEventListener('click', ModalClose);
    

    document.getElementById('cancelVerification').addEventListener('click', ModalClose);
    

    document.getElementById('verificationModal').addEventListener('click', function(event) {
        if (event.target === this) {
            ModalClose();
        }
    });
    

    document.getElementById('confirmVerification').addEventListener('click', function() {
        const name = document.getElementById("inputName").value.trim();
        const age = document.getElementById("inputAge").value.trim();
        

        clearAllModalErrors();
        
        let hasErrors = false;
        

        if (!name) {
            showModalFieldError('inputName', 'Пожалуйста, введите имя');
            hasErrors = true;
        } else if (name.length < 2) {
            showModalFieldError('inputName', 'Имя должно содержать минимум 2 символа');
            hasErrors = true;
        }
        

        if (!age) {
            showModalFieldError('inputAge', 'Пожалуйста, введите возраст');
            hasErrors = true;
        } else {
            const ageNum = parseInt(age);
            if (isNaN(ageNum) || ageNum < 1 || ageNum > 100) {
                showModalFieldError('inputAge', 'Возраст должен быть числом от 1 до 100');
                hasErrors = true;
            }
        }
        
        if (hasErrors) {
            return; // Не переходим дальше при ошибках
        }
        
        // Если ошибок нет, показываем успешное сообщение
        showModalMessage('Данные подтверждены! Переходим дальше...', 'success');
        
        // Закрываем модальное окно и переходим
        setTimeout(() => {
            ModalClose();
            window.location.href = "../Queue/queue.html";
        }, 1500);
    });
});