document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const slides = document.querySelectorAll('.feedback-slide');
    let currentIndex = 0;

    // Функция для обновления состояния слайдера
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            const offset = index - currentIndex;
            let position;

            // Базовое расстояние для ближайших слайдов (offset = 1 или -1)
            const baseDistance = 100; // Базовое расстояние в процентах
            const extraDistance = baseDistance * 1.2; // Увеличиваем на 20% для дальних слайдов

            // Если слайд дальше, чем на 1 позицию, увеличиваем расстояние
            if (offset <= -2) {
                position = -extraDistance * Math.abs(offset); // Для слайдов слева
            } else if (offset >= 2) {
                position = extraDistance * offset; // Для слайдов справа
            } else {
                position = baseDistance * offset; // Для ближайших слайдов
            }

            // Позиционируем слайды через left
            slide.style.left = `${position}%`;

            if (offset === 0) {
                slide.classList.add('active');
            }
        });
    }

    // Переход к следующему слайду
    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    // Переход к предыдущему слайду
    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    // Инициализация слайдера
    updateSlider();
});