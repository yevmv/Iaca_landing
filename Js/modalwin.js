    function toggleForm() {
        const form = document.getElementById('contactForm');
        const backdrop = document.getElementById('modalBackdrop');
        const button = document.querySelector('.contact-button');
        const body = document.body;
        const isActive = form.classList.toggle('active');
        backdrop.classList.toggle('active', isActive);
        body.classList.toggle('modal-open', isActive); // Блокировка прокрутки
        form.setAttribute('aria-hidden', !isActive);
        button.setAttribute('aria-expanded', isActive);
        if (isActive) {
            document.getElementById('name').focus();
            document.addEventListener('keydown', handleEsc);
        } else {
            document.removeEventListener('keydown', handleEsc);
        }
    }
    function closeForm() {
        const form = document.getElementById('contactForm');
        const backdrop = document.getElementById('modalBackdrop');
        const button = document.querySelector('.contact-button');
        const body = document.body;
        form.classList.remove('active');
        backdrop.classList.remove('active');
        body.classList.remove('modal-open'); 
        form.setAttribute('aria-hidden', 'true');
        button.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', handleEsc);
    }
    function handleEsc(event) {
        if (event.key === 'Escape') {
            closeForm();
        }
    }
    function openForm(formType) {
        // Открытие модального окна
        toggleForm();
    
        // Очистка всех полей
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const companyNameInput = document.getElementById('companyName');
        const projectDescriptionInput = document.getElementById('projectDescription');
        const expectedResultsInput = document.getElementById('expectedResults');
        const urgencyInput = document.getElementById('urgency');
        const additionalInfoInput = document.getElementById('additionalInfo');

        nameInput.value = '';
        emailInput.value = '';
        companyNameInput.value = '';
        projectDescriptionInput.value = '';
        expectedResultsInput.value = '';
        urgencyInput.value = '';
        additionalInfoInput.value = '';
        messageInput.value = '';

        if (formType === 'brief') {
            messageInput.placeholder = 'Заполните информацию для брифа...';
            document.querySelector('.contact-form h2').innerText = 'Заполнение брифа';
            // Показываем поля для брифа
            document.querySelector('.companyName').style.display = 'block';
            document.querySelector('.projectDescription').style.display = 'block';
            document.querySelector('.expectedResults').style.display = 'block';
            document.querySelector('.urgency').style.display = 'block';
            document.querySelector('.additionalInfo').style.display = 'block';
        } else if (formType === 'question') {
            messageInput.placeholder = 'Введите свой вопрос...';
            document.querySelector('.contact-form h2').innerText = 'Задать вопрос';
            // Скрываем поля для брифа
            document.querySelector('.companyName').style.display = 'none';
            document.querySelector('.projectDescription').style.display = 'none';
            document.querySelector('.expectedResults').style.display = 'none';
            document.querySelector('.urgency').style.display = 'none';
            document.querySelector('.additionalInfo').style.display = 'none';
        }
    }