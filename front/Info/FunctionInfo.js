// Language translations - расширенные
const translations = {
    ru: {
        currentLanguage: "Русский",
        back_button: "Назад",
        header_title: "Информация об общежитиях",
        header_subtitle: "Актуальные данные о доступности комнат в реальном времени",
        fetch_button: "Обновить информацию",
        loading_text: "Загрузка данных...",
        dorm_info_title: "Статус общежитий",
        dorm_info_description: "Получите актуальную информацию о доступных комнатах",
        family_dorm: "Семейное общежитие",
        regular_dorm: "Стандартное общежитие",
        free_rooms: "Свободных комнат",
        total_rooms: "Всего комнат",
        occupancy: "Заполненность",
        footer_title: "СТУДЕНЧЕСКИЙ ГОРОДОК",
        footer_description: "Современное пространство для учебы, жизни и развития студентов с полным комплексом услуг и инфраструктуры.",
        footer_contacts: "Контакты",
        footer_address: "г. Минск, ул. Колесникова, 3",
        footer_links: "Быстрые ссылки",
        footer_copyright: "Студенческий городок. Все права защищены.",
        nav_about: "О кампусе",
        nav_services: "Услуги",
        nav_gallery: "Галерея"
    },
    en: {
        currentLanguage: "English",
        back_button: "Back",
        header_title: "Dormitory Information",
        header_subtitle: "Real-time room availability data",
        fetch_button: "Refresh Information",
        loading_text: "Loading data...",
        dorm_info_title: "Dormitory Status",
        dorm_info_description: "Get up-to-date information about available rooms",
        family_dorm: "Family Dormitory",
        regular_dorm: "Standard Dormitory",
        free_rooms: "Available Rooms",
        total_rooms: "Total Rooms",
        occupancy: "Occupancy",
        footer_title: "STUDENT CAMPUS",
        footer_description: "Modern space for studying, living and student development with a full range of services and infrastructure.",
        footer_contacts: "Contacts",
        footer_address: "Minsk, Kolesnikova str., 3",
        footer_links: "Quick Links",
        footer_copyright: "Student Campus. All rights reserved.",
        nav_about: "About Campus",
        nav_services: "Services",
        nav_gallery: "Gallery"
    },
    es: {
        currentLanguage: "Español",
        back_button: "Atrás",
        header_title: "Información de Residencias",
        header_subtitle: "Datos de disponibilidad de habitaciones en tiempo real",
        fetch_button: "Actualizar Información",
        loading_text: "Cargando datos...",
        dorm_info_title: "Estado de Residencias",
        dorm_info_description: "Obtenga información actualizada sobre habitaciones disponibles",
        family_dorm: "Residencia Familiar",
        regular_dorm: "Residencia Estándar",
        free_rooms: "Habitaciones Disponibles",
        total_rooms: "Total Habitaciones",
        occupancy: "Ocupación",
        footer_title: "CAMPUS ESTUDIANTIL",
        footer_description: "Espacio moderno para estudiar, vivir y desarrollarse con gama completa de servicios e infraestructura.",
        footer_contacts: "Contactos",
        footer_address: "Minsk, calle Kolesnikova, 3",
        footer_links: "Enlaces rápidos",
        footer_copyright: "Campus Estudiantil. Todos los derechos reservados.",
        nav_about: "Sobre el Campus",
        nav_services: "Servicios",
        nav_gallery: "Galería"
    }
};

let currentLang = 'ru';

function changeLanguage(lang) {
    currentLang = lang;
    const langData = translations[lang];
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
    
    // Update current language display
    document.getElementById('currentLanguage').textContent = langData.currentLanguage;
    
    localStorage.setItem('preferredLanguage', lang);
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

// Проверяем, существует ли элемент themeToggle
if (themeToggle) {
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
}

// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    if (!container) return;
    
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

// Загрузка информации об общежитиях
async function fetchDormInfo() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const dormInfoElement = document.getElementById('dormInfo');
    const fetchButton = document.querySelector('.btn');

    // Проверяем существование элементов
    if (!loadingElement || !errorElement || !dormInfoElement || !fetchButton) {
        console.error('One or more required elements not found');
        return;
    }

    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    dormInfoElement.style.display = 'none';

    fetchButton.disabled = true;
    fetchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';

    try {
        // Эмуляция запроса к API
        await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация задержки сети
        
        // Здесь будет реальный запрос к API
        // const response = await fetch('/api/dormitories');
        // const dormData = await response.json();
        
        // Временные данные для демонстрации
        const dormData = [
            { 
                type: 'family', 
                free_rooms: 12, 
                total_rooms: 50,
                icon: 'fas fa-home'
            },
            { 
                type: 'regular', 
                free_rooms: 47, 
                total_rooms: 200,
                icon: 'fas fa-building'
            }
        ];

        loadingElement.style.display = 'none';
        fetchButton.disabled = false;
        const langData = translations[currentLang];
        fetchButton.innerHTML = `<i class="fas fa-sync-alt"></i> ${langData.fetch_button}`;

        displayDormInfo(dormData);

    } catch (error) {
        loadingElement.style.display = 'none';
        fetchButton.disabled = false;
        const langData = translations[currentLang];
        fetchButton.innerHTML = `<i class="fas fa-sync-alt"></i> ${langData.fetch_button}`;

        errorElement.textContent = 'Ошибка загрузки: ' + error.message;
        errorElement.style.display = 'block';
    }
}

function displayDormInfo(dorms) {
    const dormInfoElement = document.getElementById('dormInfo');
    if (!dormInfoElement) return;

    const langData = translations[currentLang];
    
    let html = '';

    dorms.forEach(dorm => {
        const dormType = dorm.type === 'family' ? langData.family_dorm : langData.regular_dorm;
        const percentage = Math.round((dorm.free_rooms / dorm.total_rooms) * 100);
        const occupancy = 100 - percentage;
        
        html += `
            <div class="dorm-card">
                <div class="dorm-icon">
                    <i class="${dorm.icon}"></i>
                </div>
                <div class="dorm-type">${dormType}</div>
                <div class="dorm-rooms">${langData.free_rooms}: <strong>${dorm.free_rooms}</strong></div>
                <div class="dorm-rooms">${langData.total_rooms}: <strong>${dorm.total_rooms}</strong></div>
                <div class="dorm-capacity">${langData.occupancy}: <strong>${occupancy}%</strong></div>
            </div>
        `;
    });

    dormInfoElement.innerHTML = html;
    dormInfoElement.style.display = 'grid';
}

function goBack() {
    window.history.back();
}

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

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add data-translate attributes to elements that need translation
    const headerTitle = document.querySelector('.header-content h1');
    const headerSubtitle = document.querySelector('.header-content p');
    const sectionTitle = document.querySelector('.section-title-modern h2');
    const sectionDescription = document.querySelector('.section-title-modern p');
    const fetchButton = document.querySelector('.btn');
    const loadingElement = document.getElementById('loading');
    
    if (headerTitle) headerTitle.setAttribute('data-translate', 'header_title');
    if (headerSubtitle) headerSubtitle.setAttribute('data-translate', 'header_subtitle');
    if (sectionTitle) sectionTitle.setAttribute('data-translate', 'dorm_info_title');
    if (sectionDescription) sectionDescription.setAttribute('data-translate', 'dorm_info_description');
    if (fetchButton) fetchButton.setAttribute('data-translate', 'fetch_button');
    
    // Create floating elements
    createFloatingElements();
    
    // Apply translations
    changeLanguage(currentLang);
    
    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.status-header');
        if (parallax) {
            parallax.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }
    });
    
    // Auto-fetch data on page load
    setTimeout(fetchDormInfo, 500);
});