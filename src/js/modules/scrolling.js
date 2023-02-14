const scrolling = (selectorUp) => {
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 2750) {
            document.querySelector(selectorUp).style.opacity = 1;
        } else if (document.documentElement.scrollTop < 1650) {
            document.querySelector(selectorUp).style.opacity = 0;
        }
    });
    const smoothly = () => {
        document.querySelector(selectorUp).addEventListener('click', function (e) {
            const scrollTop = Math.round(document.documentElement.scrollTop || document.body.scrollTop);
            //Math.round for Edge only
            if (this.hash !== '') {
                e.preventDefault();
                let hashElem = document.querySelector(this.hash);
                //`.${this.hash.substring(1)}` for getElementById
                let top = 0;
                while (hashElem.offsetParent) {
                    top += hashElem.offsetTop;
                    hashElem = hashElem.offsetParent;
                }
                top = Math.round(top);
                smoothScroll(scrollTop, top, this.hash);
            }

        });
    };
    const smoothScroll = (from, to, hash) => {
        const timeInterval = 1;
        let prevScrollTop;
        let speed;

        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        }
        const move = setInterval(function () {
            const scrollTop = Math.round(document.documentElement.scrollTop || document.body.scrollTop);
            if (prevScrollTop === scrollTop || (to > from && scrollTop >= to) || (from > to && to >= scrollTop)) {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {
                document.body.scrollTop += speed;
                document.documentElement.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };
    smoothly();
};
export default scrolling;
