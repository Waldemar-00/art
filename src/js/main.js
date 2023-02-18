import modals from "./modules/modals";
import sliders from "./modules/sliders";
import formsFn from "./modules/forms";
import mask from "./modules/mask";
import showMoreStyles from "./modules/showMoreStyles";
import checkTextInInputs from "./modules/checkTextInInput";
import showStylesFromServer from "./modules/showStylesFromServer";
import calculate from "./modules/calculate";
import filter from "./modules/filter";
import showPictures from "./modules/showPictures";
import accordion from "./modules/accordion";
import accordionOnJS from "./modules/accordionOnJS";
import burger from "./modules/burger";
import scrolling from "./modules/scrolling";
import scrollingFrame from "./modules/scrollingFrame";
import scrollHtml from "./modules/htmlScroll";
import dragDrop from "./modules/drag&Drop";
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
    showMoreStyles('.styles-2', '.button-styles');
    // showStylesFromServer('#styles .row', '.button-styles');
    calculate('#size', '#material', '#options', '.promocode', '.calc-price');
    filter();
    showPictures('.sizes-block');
    //accordion('.accordion-heading', '.accordion-block');
    accordionOnJS('.accordion-heading');
    burger('.burger', '.burger-menu');
    //scrolling('.pageup');
    //scrollingFrame('.pageup');
    scrollHtml('.pageup');
    dragDrop();
});