

// Language translations
const translations = {
    ru: {
        // Language selector
        currentLanguage: "Русский",
        
        // Navigation
        logo: "СТУДГОРОДОК",
        nav_about: "О кампусе",
        nav_services: "Услуги",
        nav_gallery: "Галерея",
        nav_contact: "Регистрация",
        
        // Hero section
        hero_title: "СТУДЕНЧЕСКИЙ\nГОРОДОК",
        hero_description: "Современное пространство для учебы, жизни и развития. Инновационная инфраструктура, созданная для комфорта и успеха каждого студента.",
        hero_button: "Зарегистрироваться",
        
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
        logo: "STUDENT CAMPUS",
        nav_about: "About Campus",
        nav_services: "Services",
        nav_gallery: "Gallery",
        nav_contact: "Registration",
        hero_title: "STUDENT\nCAMPUS",
        hero_description: "Modern space for studying, living and development. Innovative infrastructure created for the comfort and success of every student.",
        hero_button: "Register Now",
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
        logo: "CAMPUS ESTUDIANTIL",
        nav_about: "Sobre el Campus",
        nav_services: "Servicios",
        nav_gallery: "Galería",
        nav_contact: "Registro",
        hero_title: "CAMPUS\nESTUDIANTIL",
        hero_description: "Espacio moderno para estudiar, vivir y desarrollarse. Infraestructura innovadora creada para la comodidad y el éxito de cada estudiante.",
        hero_button: "Registrarse",
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

// Student Form Functionality
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const fullName = document.getElementById('fullName').value;
    const birthDate = document.getElementById('birthDate').value;
    const phone = document.getElementById('phone').value;
    const gpa = document.getElementById('gpa').value;
    const familyIncome = document.getElementById('familyIncome').value;
    
    if (!fullName || !birthDate || !phone || !gpa || !familyIncome) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Collect form data
    const formData = {
        fullName: fullName,
        birthDate: birthDate,
        phone: phone,
        gpa: parseFloat(gpa),
        publicWork: document.getElementById('publicWork').checked,
        familyIncome: parseFloat(familyIncome),
    };
    
    fetch('http://127.0.0.1:2000/add/students',
    {
        method: 'POST',
        headers: 
        {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)

    }).then(()=>{console.log('Успешно отправлены')})


    console.log('Student Form Data:', formData);
    
    // Show success message
    const successMessage = translations[currentLang].form_submit + ' успешно отправлена!';
    alert(successMessage + ' Мы свяжемся с вами в ближайшее время.');
    
    // Reset form
    this.reset();
});

// Phone number formatting for Belarus
document.getElementById('phone').addEventListener('input', function(e) {
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
});

// GPA validation
document.getElementById('gpa').addEventListener('change', function(e) {
    const value = parseFloat(e.target.value);
    if (value < 2.0 || value > 10.0) {
        alert('Средний балл должен быть от 2.0 до 10.0');
        e.target.value = '';
    }
});

// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        const size = Math.random() * 20 + 10;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDelay = `${Math.random() * 10}s`;
        element.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(element);
    }
}

createFloatingElements();

// Parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('header');
    if (parallax) {
        parallax.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});
function goToStudentInfo() {
const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
window.location.href = `info.html?theme=${currentTheme}`;
}