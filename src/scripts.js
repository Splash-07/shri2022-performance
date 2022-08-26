(() => {


    function makeMenu(node) {
        let expanded = false;
        const links = document.querySelector('.header__links');

        node.addEventListener('click', () => {
            expanded = !expanded;
            node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            node.querySelector('.header__menu-text').textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
            links.classList.toggle('header__links_opened', expanded);
            links.classList.add('header__links-toggled');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        makeMenu(document.querySelector('.header__menu'))
    });
})();
