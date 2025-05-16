document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
 // Скрытие меню при прокрутке страницы
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            // Если прокручено вниз
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Для избежания отрицательных значений
    });
});
