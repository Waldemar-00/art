const scrollingFrame = (selectorUp) => {
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 2750) {
            document.querySelector(selectorUp).style.opacity = 1;
        } else if (document.documentElement.scrollTop < 1650) {
            document.querySelector(selectorUp).style.opacity = 0;
        }
    });
    const links = document.querySelectorAll('[href^="#"]');
    const speed = 0.7;
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const documentTop = document.documentElement.scrollTop;
            const blockTop = document.querySelector(this.hash).getBoundingClientRect().top;
            let start = null;

            const goFrame = () => {
                if (start === null) {
                    start = performance.now();
                }
                const progress = performance.now() - start;
                const step = (blockTop < 0 ? Math.max(documentTop - progress / speed, documentTop + blockTop) :
                    Math.min(documentTop + progress / speed, documentTop + blockTop));
                document.documentElement.scrollTo({ left: 0, top: step, behavior: 'smooth' });
                if (step !== documentTop + blockTop) {
                    requestAnimationFrame(goFrame);
                } else {
                    location.hash = this.hash;
                }
            };
            requestAnimationFrame(goFrame);
        });
    });
};
export default scrollingFrame;
