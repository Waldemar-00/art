const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        all = menu.querySelector('.all'),
        lovers = menu.querySelector('.lovers'),
        chef = menu.querySelector('.chef'),
        girl = menu.querySelector('.girl'),
        guy = menu.querySelector('.guy'),
        grandmother = menu.querySelector('.grandmother'),
        granddad = menu.querySelector('.granddad'),
        li = menu.querySelectorAll('li');
    
    const wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        markGirl = wrapper.querySelectorAll('.girl'),
        markLovers = wrapper.querySelectorAll('.lovers'),
        markGuy = wrapper.querySelectorAll('.guy'),
        markChef = wrapper.querySelectorAll('.chef'),
        no = document.querySelector('.portfolio-no');

    const filterType = (markType) => {
        markAll.forEach(one => {
            one.style.display = 'none';
            one.classList.remove('animated', 'fadeIn');
        });
        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');
        
        if (!markType) {
            no.classList.add('animated', 'fadeIn');
            no.style.display = 'block';
        } else {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        }
    };
    all.addEventListener('click', () => filterType( markAll ));
    lovers.addEventListener('click', () => filterType( markLovers ));
    chef.addEventListener('click', () => filterType( markChef ));
    girl.addEventListener('click', () => filterType(markGirl));
    guy.addEventListener('click', () => filterType(markGuy));
    grandmother.addEventListener('click', () => filterType());
    granddad.addEventListener('click', () => filterType());

    menu.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'LI') {
            li.forEach(li => {
                li.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });

};
export default filter;