import { getData } from "./services/requests";
const showStylesFromServer = (wrapper, buttonSelector) => {
    const button = document.querySelector(buttonSelector);


    // button.addEventListener('click', (e) => {
        // styles.forEach(style => {
            // style.classList.add('animated', 'fadeInUp');
            // style.classList.remove("hidden-lg", "hidden-md", "hidden-sm","hidden-xs");
            // style.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
        // });
        // button.style.display = "none";
    // });
    button.addEventListener("click", (e) => {
        getData('http://localhost:3000/styles')
            .then(response => createStyle(response))
            .catch(error => console.log(error));
        e.target.style.display = "none";
    });
    const createStyle = (response) => {
        response.forEach(({src, title, link}) => {
            const style = document.createElement('div');
            style.classList.add('animated', 'fadeInUp', "col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
            style.innerHTML = `
	            <div class=styles-block>
		            <img src=${src} alt=style>
		            <h4>${title}</h4>
		            <a href=${link}>Подробнее</a>
	            </div>
            `;
            document.querySelector(wrapper).append(style);
        });
    };
};
export default showStylesFromServer;