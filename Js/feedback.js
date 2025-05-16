document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const slides = document.querySelectorAll('.feedback-slide');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let diffX = 0;
    // Функция для обновления состояния слайдера
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            const offset = index - currentIndex;
            let position;
            // Базовое расстояние для ближайших слайдов (offset = 1 или -1)
            const baseDistance = 100; // Базовое расстояние в процентах
            const extraDistance = baseDistance * 1.2; // Увеличиваем на 20% для дальних слайдов
            // Позиционирование только для неактивных слайдов
            if (offset !== 0) {
                if (offset <= -2) {
                    position = -extraDistance * Math.abs(offset); // Для слайдов слева
                } else if (offset >= 2) {
                    position = extraDistance * offset; // Для слайдов справа
                } else {
                    position = baseDistance * offset; // Для ближайших слайдов
                }
                slide.style.left = `${position}%`;
            } else {
                // Для активного слайда убираем left, чтобы CSS управлял позицией
                slide.style.left = '';
                slide.classList.add('active');
            }

            slide.style.display = 'block'; // Гарантируем видимость
        });
    }
    // Свайпы для мобильных
    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            diffX = 0; // сбрасываем значение на старте
        });
        slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            diffX = startX - currentX; // рассчитываем разницу в движении
            // Разрешаем прокрутку страницы, если свайп слишком маленький
            if (Math.abs(diffX) < 10) {
                return; // слишком маленькое движение - продолжаем прокрутку страницы
            }
            e.preventDefault(); // предотвращаем прокрутку страницы только если движение значительное
            slides.forEach((slide, index) => {
                const offset = index - currentIndex;
                let position;
                const baseDistance = 100;
                const extraDistance = baseDistance * 1.2;

                if (offset !== 0) {
                    if (offset <= -2) {
                        position = -extraDistance * Math.abs(offset);
                    } else if (offset >= 2) {
                        position = extraDistance * offset;
                    } else {
                        position = baseDistance * offset;
                    }
                    slide.style.left = `calc(${position}% - ${diffX}px)`;
                } else {
                    slide.style.left = '';
                }
            });
        });
        slider.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            // Если движение было значительным (больше 20px), переключаем слайд
            if (Math.abs(diffX) > 40) {
                if (diffX > 20 && currentIndex < slides.length - 1) {
                    currentIndex++;
                } else if (diffX < -20 && currentIndex > 0) {
                    currentIndex--;
                }
            }
            updateSlider(); // Обновляем состояние слайдера
        });
    }
    // Кнопки для десктопа
    if (prevButton && nextButton) {
        nextButton.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        prevButton.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }
    // Инициализация слайдера
    updateSlider();
});
