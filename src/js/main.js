import modals from "./modules/modals";
import sliders from "./modules/sliders";
import { indentifierBrowser } from "./modules/modals";
window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    indentifierBrowser();
    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    //sliders('.portfolio-block', '');
});