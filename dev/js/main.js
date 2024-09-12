
const inputs = document.querySelectorAll('input');





    function validateForm() {
        const alerts = document.querySelectorAll('input[id="name"], input[id="email"], input[id="tel"]');
        const alertBtn = document.querySelector('.modal__wrapper-form-btn');
        const telInput = document.querySelector('input[id="tel"]');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.placeholder = '';
            });

            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.placeholder = input.dataset.placeholder;
                }
            });

            input.dataset.placeholder = input.placeholder;
        });

        telInput.addEventListener('keyup', function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
            this.value = this.value.slice(0, 12);
            const value = this.value;
            if (value.length > 0) {
                let formattedValue = '+7 (';
                if (value.length > 1) {
                    formattedValue += value.substring(1, 4);
                    if (value.length > 4) {
                        formattedValue += ') ' + value.substring(4, 7);
                        if (value.length > 7) {
                            formattedValue += '-' + value.substring(7, 9);
                            if (value.length > 9) {
                                formattedValue += '-' + value.substring(9, 11);
                            }
                        }
                    }
                }
                this.value = formattedValue;
            }

        });
        alertBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let hasError = false;
            alerts.forEach(alert => {
                let nextAlert = alert.nextSibling;
                let errorMsg = document.querySelector('.modal__wrapper-form-error');

                if (alert.value.trim() === '') {
                    hasError = true;
                    if (!nextAlert || !(nextAlert instanceof HTMLElement) || !nextAlert.classList.contains('modal__wrapper-form-alert')) {
                        alert.classList.add('error-msg');
                        const errorAlert = document.createElement('div');
                        errorAlert.textContent = 'This field is required';
                        errorAlert.className = 'modal__wrapper-form-alert';
                        alert.parentNode.insertBefore(errorAlert, nextAlert);
                        errorMsg.style.display = 'block';
                    }
                } else {
                    if (nextAlert && nextAlert instanceof HTMLElement && nextAlert.classList.contains('modal__wrapper-form-alert')) {
                        nextAlert.remove();
                        alert.classList.remove('error-msg');
                    }
                }

            });
            if (!hasError) {
                document.querySelector('.modal__wrapper-form').style.display = 'none';
                //document.querySelector('.modal__wrapper-form').submit();
                const modalContainer = document.querySelector('.modal__wrapper');
                const modalBlock = document.createElement('div');
                modalBlock.className = 'modal__nice';
                modalBlock.innerHTML = `<img src="img/nice-img.png" alt="img">
                <div class="modal__nice-title">Thank you!</div>
                <div class="modal__nice-desc">Thank you, we have received your application and will contact you soon!</div>
                <button class="modal__nice-btn">Super!</button>`;
                modalContainer.appendChild(modalBlock);
                document.querySelector('.modal__nice-btn').addEventListener('click', function () {
                    document.querySelector('.modal__wrapper-form').submit();
                });
            }
        });
    }

    function modalOpenClose() {
        const modalOpenBtns = document.querySelectorAll('.sticky-wrapper__contact-btn');
        const modalClose = document.querySelector('.modal__wrapper-btn');
        const modal = document.querySelector('.modal');

        modalOpenBtns.forEach(modalOpenBtn=> {
            modalOpenBtn.addEventListener('click', function () {
                modal.style.display = 'flex';
            });
        });
        modalClose.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    function cookies() {
        const cookieCloseBtns = document.querySelectorAll('.cookie-close');
        const cookieBanner = document.querySelector('.cookie-container');
        const cookieAccept = document.querySelector('.cookie__wrapper-btn-accept');

        document.addEventListener('DOMContentLoaded', function() {
            localStorage.clear();
            if (!localStorage.getItem('cookiesAccepted')) {
                cookieBanner.style.display = 'flex';
            }
            cookieAccept.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieBanner.style.display = 'none';
            });
            cookieCloseBtns.forEach(cookieCloseBtn => {
                cookieCloseBtn.addEventListener('click', function () {
                    cookieBanner.style.display = 'none';
                });
            });
        });
    }

    function burgerMenu() {
        const openBurger = document.querySelector('.mobile-container__menu-btn');
        const closeBurger = document.querySelector('.mobile-container__wrapper-close');
        const burgerMenu = document.querySelector('.mobile-container__wrapper');
        const mobileFormOpen = document.querySelector('.sticky-wrapper__contact-btn');

        openBurger.addEventListener('click', function (){
            burgerMenu.style.display = 'block';
            burgerMenu.style.transform = 'translateX(0)';
        });
        function closeMenu() {
            burgerMenu.style.display = 'none';
            burgerMenu.style.transform = 'translateX(-105%)';
        }
        closeBurger.addEventListener('click', closeMenu)
        mobileFormOpen.addEventListener('click',closeMenu);

    }


    burgerMenu();
    cookies();
    modalOpenClose();
    validateForm();