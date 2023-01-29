import first from "ee-first";

const sliders = (slides, direction, previous, nexter) => {
    let firstSlide = 1;
    const items = document.querySelectorAll(slides);

    function toSlide(n) {
        if (n > items.length) {
            firstSlide = 1;
        }
        if (n < 1) {
            firstSlide = items.length;
        }

        items.forEach( item => {
            item.style.display = 'none';
            item.classList.add('animated');
        });
        items[firstSlide - 1].style.display = 'block';
    }
    toSlide(firstSlide);
    function slideStep(step) {
        toSlide(firstSlide += step);
    }
    try {
        const prev = document.querySelector(previous);
        const next = document.querySelector(nexter);
        prev.addEventListener('click', () => {
            slideStep(- 1);
            items[firstSlide - 1].classList.remove('slideInLeft');
            items[firstSlide - 1].classList.add('slideInRight');
        });
        next.addEventListener('click', () => {
            slideStep(1);
            items[firstSlide - 1].classList.remove('slideInRight');
            items[firstSlide - 1].classList.add('slideInLeft');
        });

    } catch (e) { }

    function slideVertical(dir) {
        if (dir === 'vertical') {
            const interval = setInterval(() => {
                slideStep(1);
                items[firstSlide - 1].classList.add('slideInDown');
                items.forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        clearInterval(interval);
                    });
                    item.addEventListener('mouseleave', () => {
                        slideVertical(direction);
                    });
                });
            }, 3000);
        } else {
            const interval = setInterval(() => {
            slideStep(1);
                items[firstSlide - 1].classList.remove('slideInRight');
                items[firstSlide - 1].classList.add('slideInLeft');
                items.forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        clearInterval(interval);
                    });
                    item.addEventListener('mouseleave', () => {
                        slideVertical(direction);
                    });
                });
            }, 4000);
        }
    }
    slideVertical(direction);
};
export default sliders;
// sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
// sliders('.main-slider-item', 'vertical', '', '');