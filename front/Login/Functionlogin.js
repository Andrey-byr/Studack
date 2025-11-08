// FunctionLogin.js
const loginTranslations = {
    ru: {
        login_title: "Авторизация администратора",
        login_subtitle: "Система управления студенческим городком",
        form_title: "Доступ для администратора",
        form_subtitle: "Введите данные для входа в систему управления",
        login_username: "Логин администратора",
        login_password: "Пароль",
        login_button: "Войти в систему",
        btn_back: "На главную"
    },
    en: {
        login_title: "Admin Authorization",
        login_subtitle: "Student Campus Management System",
        form_title: "Admin Access",
        form_subtitle: "Enter credentials to access management system",
        login_username: "Admin username",
        login_password: "Password",
        login_button: "Login to System",
        btn_back: "Back to Main"
    },
    es: {
        login_title: "Autorización de Administrador",
        login_subtitle: "Sistema de Gestión del Campus Estudiantil",
        form_title: "Acceso de Administrador",
        form_subtitle: "Ingrese credenciales para acceder al sistema",
        login_username: "Usuario administrador",
        login_password: "Contraseña",
        login_button: "Acceder al Sistema",
        btn_back: "Volver al Inicio"
    }
};

// Правильные учетные данные
const VALID_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

let currentLang = 'ru';

function initLoginPage() {
    setupEventListeners();
    loadSavedTheme();
    loadSavedLanguage();
    updateTranslations();
}

function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
    
    const passwordToggle = document.getElementById('passwordToggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePasswordVisibility);
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
    localStorage.setItem('preferredLanguage', lang);
    updateTranslations();
    
    document.getElementById('currentLanguage').textContent = 
        lang === 'ru' ? 'Русский' : lang === 'en' ? 'English' : 'Español';
    
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
    const langData = loginTranslations[currentLang];
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('#passwordToggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

function validateCredentials(username, password) {
    return username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password;
}

async function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Базовая валидация
    if (!username || !password) {
        showMessage(
            currentLang === 'ru' ? 'Пожалуйста, заполните все поля' :
            currentLang === 'en' ? 'Please fill in all fields' :
            'Por favor, complete todos los campos',
            'error'
        );
        return;
    }
    
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    
    // Показываем индикатор загрузки
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>' + 
        (currentLang === 'ru' ? ' Вход...' : 
         currentLang === 'en' ? ' Signing in...' : 
         ' Iniciando sesión...');
    loginBtn.disabled = true;
    
    try {
        // Имитация запроса к серверу
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Проверка учетных данных
        if (validateCredentials(username, password)) {
            showMessage(
                currentLang === 'ru' ? 'Вход выполнен успешно!' :
                currentLang === 'en' ? 'Login successful!' :
                '¡Inicio de sesión exitoso!',
                'success'
            );
            
            // Переход на страницу админ-панели
            setTimeout(() => {
                // ВМЕСТО ЭТОГО ПОКАЖИТЕ СООБЩЕНИЕ:
                showMessage(
                    currentLang === 'ru' ? 'Вход выполнен! Страница админки в разработке.' :
                    currentLang === 'en' ? 'Login successful! Admin page under development.' :
                    '¡Inicio de sesión exitoso! Página de admin en desarrollo.',
                    'success'
                );
            }, 1000);
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = '../Admin/admin.html';
            
        } else {
            throw new Error('INVALID_CREDENTIALS');
        }
        
    } catch (error) {
        if (error.message === 'INVALID_CREDENTIALS') {
            showMessage(
                currentLang === 'ru' ? 'Неверный логин или пароль' :
                currentLang === 'en' ? 'Invalid username or password' :
                'Usuario o contraseña incorrectos',
                'error'
            );
        } else {
            showMessage(
                currentLang === 'ru' ? 'Произошла ошибка при входе' :
                currentLang === 'en' ? 'An error occurred during login' :
                'Ocurrió un error durante el inicio de sesión',
                'error'
            );
        }
    } finally {
        // Восстанавливаем кнопку
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    }
}

function showMessage(message, type) {
    // Удаляем существующие сообщения
    const existingMessage = document.querySelector('.login-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Создаем новое сообщение
    const messageEl = document.createElement('div');
    messageEl.className = `login-message login-message-${type}`;
    messageEl.textContent = message;
    
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

function goToMainPage() {
    try {
        window.location.href = '../Main/сайт главная.html';
    } catch (error) {
        console.log('Redirecting to main page...');
        alert(currentLang === 'ru' ? 'Перенаправление на главную страницу' :
              currentLang === 'en' ? 'Redirecting to main page' :
              'Redirigiendo a la página principal');
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', initLoginPage);