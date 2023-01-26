import { setTimeout } from "core-js";
import e from "cors";
// let  flag = true;
const modals = () => {
    function bindModal(openSelector, modalSelector, closeSelector, closeTrigger = true) {
        const open = document.querySelectorAll(openSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const popups = document.querySelectorAll('[data-modal]');
        open.forEach(elem => elem.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
            popups.forEach(popup => popup.style.display = 'none');

                modal.style.display = 'block';
                modal.classList.add('faded');
                document.body.style.overflow = 'hidden';
                //flag = false;
        }));
        console.log(close);
        console.log(modal);
        close.addEventListener('click', () => {
            popups.forEach(popup => popup.style.display = 'none');
            modal.style.display = 'none';
            indentifierBrowser();
            //flag = true;

        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeTrigger) {
                popups.forEach(popup => popup.style.display = 'none');
                modal.style.display = 'none';
                indentifierBrowser();
                //flag = true;
            }
        });
    }

    bindModal('.button-design','.popup-design', 'div.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup .popup_close');
    // bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
    // bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    // bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};
// function showModalByTime(selector) {
    // document.querySelector(selector).style.display = 'block';
    // document.body.style.overflow = 'hidden';
// }
function indentifierBrowser() {
    if (navigator.userAgent.match('Firefox') ||
        (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor))) {
            document.body.style.overflow = '';
        } else {
                document.body.style.overflow = 'overlay';
            }
}
//export { showModalByTime, flag } ;
export { indentifierBrowser };
export default modals;