function slide() {
    let slideNow = 0;
    let translateWidth = 0;
    let slideCount = document.querySelectorAll('.slide__wrapper-container-item').length;
    let slideNext = document.querySelector('.slide__wrapper-btn-next');
    let slidePrev = document.querySelector('.slide__wrapper-btn-prev')
    let navigationContainer = document.querySelector('.slide__wrapper-btn-navigation');
    const delay = 500;
    addNavBtn();
    function addNavBtn() {
        for (let i = 0; i < slideCount; i++) {
            const navButton = document.createElement('div');
            navButton.classList.add('slide__wrapper-btn-navigation-btn');
            navButton.setAttribute('data-index', i);
            if (i === 0) {
                navButton.classList.add('navigation-active');
            }
            navigationContainer.appendChild(navButton);
        }

        const navBtns = document.querySelectorAll('.slide__wrapper-btn-navigation-btn');
        navBtns.forEach(navBtn => {
            navBtn.addEventListener('click', function () {
                slideNow = navBtn.getAttribute('data-index');
                updateSlides();
                updateNavigation(navBtns);
            });
        });
    }


    slideNext.addEventListener('click', function () {
        slideNext.style.pointerEvents = 'none';
        if (slideNow < slideCount - 1) {
            slideNow++;
            updateSlides();
            updateNavigation(document.querySelectorAll('.slide__wrapper-btn-navigation-btn'));
        }
        setTimeout(() => slideNext.style.pointerEvents = 'auto', delay);
    })

    slidePrev.addEventListener('click', function () {
        slidePrev.style.pointerEvents = 'none';
        if (slideNow > 0) {
            slideNow--;
            updateSlides();
            updateNavigation(document.querySelectorAll('.slide__wrapper-btn-navigation-btn'));
        }
        setTimeout(() => slidePrev.style.pointerEvents = 'auto', delay);
    })
    function updateSlides() {
        document.querySelectorAll('.slide__wrapper-container-item').forEach(slide => {
            translateWidth = -slide.offsetWidth * slideNow;
            slide.style.transform = "translate(" + translateWidth + "px, 0)";
        });
    }

    function updateNavigation(navBtns) {
        navBtns.forEach(btn => btn.classList.remove('navigation-active'));
        navBtns[slideNow].classList.add('navigation-active');
    }
}
slide();