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
    function slideMove(step) {
        toSlide(firstSlide += step);
    }
    try {
        const prev = document.querySelector(previous);
        const next = document.querySelector(nexter);
        prev.addEventListener('click', () => {
            slideMove(- 1);
            items[firstSlide - 1].classList.remove('slideInLeft');
            items[firstSlide - 1].classList.add('slideInRight');
        });
        next.addEventListener('click', () => {
            slideMove(1);
            items[firstSlide - 1].classList.remove('slideInRight');
            items[firstSlide - 1].classList.add('slideInLeft');
        });

    } catch(e) {}
};
export default sliders;