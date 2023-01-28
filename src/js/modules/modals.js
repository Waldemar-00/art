import { setTimeout } from "core-js";
import e from "cors";
let flag = true;
let pressed = false;
const modals = () => {
    function bindModal(openSelector, modalSelector, closeSelector, destroy = false) {
        const open = document.querySelectorAll(openSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const popups = document.querySelectorAll('[data-modal]');
        open.forEach(elem => elem.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
            
            if (destroy) {
                elem.remove();
            }
            popups.forEach(popup => popup.style.display = 'none');
                modal.style.display = 'block';
            modal.classList.add('faded');
            //! library -- animate.css -- modal.classList.add('animated', 'fadeIn');
                document.body.style.overflow = 'hidden';
                flag = false;
                pressed = true;
        }));
        close.addEventListener('click', () => {
            popups.forEach(popup => popup.style.display = 'none');
            modal.style.display = 'none';
            indentifierBrowser();
            flag = true;
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                popups.forEach(popup => popup.style.display = 'none');
                modal.style.display = 'none';
                indentifierBrowser();
            }
        });
    }

    bindModal('.button-design','.popup-design', 'div.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    // bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    // bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};
function showModalByTime(selector) {
    document.querySelector(selector).style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function indentifierBrowser() {
    if (navigator.userAgent.match('Firefox') ||
        (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor))) {
            document.body.style.overflow = '';
        } else {
                document.body.style.overflow = 'overlay';
            }
}
function openModalByScroll(selector) {
    window.addEventListener('scroll', () => {
        const maxScrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        //!document.body.scrollHeight -- for old browsers
        if (!pressed && window.scrollY + document.documentElement.clientHeight >= maxScrollHeight) {
            document.querySelector(selector).click();
            }
    });
}
openModalByScroll('.fixed-gift');

setTimeout(() => {
    if (flag) {
        showModalByTime(".popup-consultation");
    }
}, 60000);
export { indentifierBrowser };
export default modals;
