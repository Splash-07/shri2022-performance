(() => {
    function bind(nodes, event, handler) {
        Array.from(nodes).forEach(node => {
            node.addEventListener(event, handler);
        });
    }
    function makeTabs(node) {
        let selected = node.querySelector('.section__tab_active').dataset.id;
        const tabs = node.querySelectorAll('.section__tab');
        const list = Array.from(tabs).map(node => node.dataset.id);
        const select = node.querySelector('.section__select');

        function generateContent(tabId) {
            const items = [
                {
                    icon: "event__icon_light2",
                    label: "Освещение",
                    title: "Xiaomi Yeelight LED Smart Bulb",
                    subtitle: "Включено"
                },
                {
                    icon: "event__icon_light",
                    label: "Освещение",
                    title: "D-Link Omna 180 Cam",
                    subtitle: "Включится в 17:00"
                },
                {
                    icon: "event__icon_temp",
                    label: "Температура",
                    title: "Elgato Eve Degree Connected",
                    subtitle: "Выключено до 17:00"
                },
                {
                    icon: "event__icon_light",
                    label: "Освещение",
                    title: "LIFX Mini Day & Dusk A60 E27",
                    subtitle: "Включится в 17:00"
                },
                {
                    icon: "event__icon_light2",
                    label: "Освещение",
                    title: "Xiaomi Mi Air Purifier 2S",
                    subtitle: "Включено"
                },
                {
                    icon: "event__icon_light",
                    label: "Освещение",
                    title: "Philips Zhirui",
                    subtitle: "Выключено"
                },
                {
                    icon: "event__icon_light2",
                    label: "Освещение",
                    title: "Xiaomi Mi Air Purifier 2S",
                    subtitle: "Включено"
                },
            ]
            const contentByTabIdMap = {
                kitchen: [
                    "Xiaomi Yeelight LED Smart Bulb",
                    "Elgato Eve Degree Connected"
                ],
                hall: [
                    "Philips Zhirui",
                    "Xiaomi Mi Air Purifier 2S",
                ],
                lights: [
                    "D-Link Omna 180 Cam",
                    "LIFX Mini Day & Dusk A60 E27",
                    "Xiaomi Mi Air Purifier 2S",
                    "Philips Zhirui",
                ],
                cameras: [
                    "Xiaomi Mi Air Purifier 2S",
                ],
            }
            const list = document.createElement("ul")
            list.classList.add('section__panel-list')

            const content = tabId === 'all' ?
                items.map(item => generateNode(item)) :
                contentByTabIdMap[tabId].map(content => {
                    const item = items.find(item => item.title === content)
                    return generateNode(item)
                })

            content.forEach(c => list.appendChild(c))
            return list
        }
        function generateNode (item) {
            const listItem = document.createElement('li')
            listItem.classList.add('event')

            const button = document.createElement('button')
            button.classList.add('event__button')

            const icon = document.createElement('span')
            icon.classList.add('event__icon')
            icon.classList.add(`${item.icon}`)
            icon.ariaRoleDescription = 'img'
            icon.ariaLabel = item.label

            const title = document.createElement('h4')
            title.classList.add('event__title')
            title.textContent = item.title

            const subtitle = document.createElement('span')
            subtitle.classList.add('event__subtitle')
            subtitle.textContent = item.subtitle

            button.appendChild(icon)
            button.appendChild(title)
            button.appendChild(subtitle)
            listItem.appendChild(button)

            return listItem
        }

        function selectTab(newId) {
            const newTab = node.querySelector(`.section__tab[data-id=${newId}]`);
            const oldTab = node.querySelector('.section__tab_active');
            const panel = node.querySelector(`.section__panel`);

            selected = newId;

            oldTab.classList.remove('section__tab_active');
            oldTab.setAttribute('aria-selected', 'false');
            oldTab.removeAttribute('tabindex');
            newTab.classList.add('section__tab_active');
            newTab.setAttribute('aria-selected', 'true');
            newTab.setAttribute('tabindex', '0');
            newTab.focus({
                preventScroll: true
            });

            select.value = newId;
            panel.innerText = ''

            panel.appendChild(generateContent(newId))
        }



        select.addEventListener('input', () => {
            selectTab(select.value);
        });

        bind(tabs, 'click', event => {
            const newId = event.target.dataset.id;
            selectTab(newId);
        });

        bind(tabs, 'keydown', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            let index = list.indexOf(selected);
            if (event.which === 37) {
                // left
                --index;
            } else if (event.which === 39) {
                // right
                ++index;
            } else if (event.which === 36) {
                // home
                index = 0;
            } else if (event.which === 35) {
                // end
                index = list.length - 1;
            } else {
                return;
            }

            if (index >= list.length) {
                index = 0;
            } else if (index < 0) {
                index = list.length - 1;
            }

            selectTab(list[index]);
            event.preventDefault();
        });
    }
    Array.from(document.querySelectorAll('.main__devices')).forEach(makeTabs);
})()
