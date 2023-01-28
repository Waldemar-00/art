import modals from "./modules/modals";
import sliders from "./modules/sliders";
import { indentifierBrowser } from "./modules/modals";
window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    indentifierBrowser();
    modals();
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
});