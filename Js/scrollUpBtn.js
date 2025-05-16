// Получаем кнопку прокрутки
const scrollUpBtn = document.getElementById('scrollUpBtn');
// Функция для показа/скрытия кнопки прокрутки
window.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
        scrollUpBtn.classList.add('show'); // Показать кнопку
    } else {
        scrollUpBtn.classList.remove('show'); // Скрыть кнопку
    }
});
// Функция для плавного скролла наверх при клике на кнопку
scrollUpBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,  // Прокрутка в начало страницы
        behavior: 'smooth'  // Плавное прокручивание
    });
});
