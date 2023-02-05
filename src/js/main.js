import modals from "./modules/modals";
import sliders from "./modules/sliders";
import formsFn from "./modules/forms";
import mask from "./modules/mask";
import checkTextInInputs from "./modules/checkTextInInput";
import { indentifierBrowser } from "./modules/modals";
window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    indentifierBrowser();
    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    formsFn();
    mask('[name="phone"]');
    checkTextInInputs('[name="name"]');
    checkTextInInputs('[name="message"]');
});