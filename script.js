// Cкрипт для загрузки контента
document.addEventListener("DOMContentLoaded", function() {
    const sidebarContainer = document.getElementById('sidebarContainer');
    const headerContainer = document.getElementById('headerContainer');

    // Загрузка боковой панели
    const loadSidebar = function() {
        const xhrSidebar = new XMLHttpRequest();
        xhrSidebar.open('GET', 'sidebar.html', true);
        xhrSidebar.onreadystatechange = function () {
            if (xhrSidebar.readyState === 4 && xhrSidebar.status === 200) {
                sidebarContainer.innerHTML = xhrSidebar.responseText;
                initSidebar();  // Вызываем функцию инициализации боковой панели после ее загрузки
            }
        };
        xhrSidebar.send();
    };

    // Загрузка заголовка
    const loadHeader = function() {
        const xhrHeader = new XMLHttpRequest();
        xhrHeader.open('GET', 'header.html', true);
        xhrHeader.onreadystatechange = function () {
            if (xhrHeader.readyState === 4 && xhrHeader.status === 200) {
                headerContainer.innerHTML = xhrHeader.responseText;
                // Добавьте инициализацию для вашего заголовка, если необходимо
            }
        };
        xhrHeader.send();
    };

    // Вызываем функции загрузки при загрузке страницы
    loadSidebar();
    loadHeader();
});

// Cкрипт для управления боковой панелью и content
function initSidebar() {
    let btn = document.querySelector("#menu_btn");
    let sidebar = document.querySelector(".sidebar");
    const content = document.querySelector('.content');
    const overlay = document.querySelector('.overlay'); // Добавляем overlay

    function toggleSidebar() {
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (screenWidth > 1000) {
            if (sidebar.classList.contains('active')) {
                content.style.left = '266px';
                content.style.width = 'calc(100% - 266px - 2.1%)';
            } else {
                content.style.left = '85px';
                content.style.width = 'calc(100% - 85px - 2.1%)';
            }
        } else {
            content.style.left = '0';
            content.style.width = '100%';
        }
    }

    function toggleOverlay() {
        overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedToggleSidebar = debounce(toggleSidebar, 250);

    btn.onclick = function() {
        sidebar.classList.toggle("active");
        toggleSidebar();
        toggleOverlay();
    };

    window.addEventListener('resize', function() {
        debouncedToggleSidebar();
    });

    window.onload = function() {
        toggleSidebar();
        toggleOverlay();
    };
}