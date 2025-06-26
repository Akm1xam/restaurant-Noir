document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav ul');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Фиксированная шапка при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Динамическая загрузка меню
    const menuItems = {
        starters: [
            { name: "Тартар из говядины", description: "С маринованными грибами и трюфельным маслом", price: "1200" },
            { name: "Утиная грудка", description: "С грушевым пюре и лесными орехами", price: "1100" },
            { name: "Тыквенный суп", description: "С кокосовым молоком и имбирём", price: "900" }
        ],
        mains: [
            { name: "Филе миньон", description: "С картофельным пюре и красным вином соусом", price: "2500" },
            { name: "Лосось на гриле", description: "С овощами и лимонным беарнезом", price: "1900" },
            { name: "Утка конфи", description: "С яблочным пюре и брюссельской капустой", price: "2200" }
        ],
        desserts: [
            { name: "Шоколадный фондан", description: "С ванильным мороженым и ягодами", price: "800" },
            { name: "Тирамису", description: "Классический с маскарпоне и кофе", price: "750" },
            { name: "Чизкейк", description: "С малиновым соусом и мятой", price: "700" }
        ],
        drinks: [
            { name: "Красное вино", description: "Château Lafite Rothschild, 2015", price: "1500" },
            { name: "Беллое вино", description: "Domaine Leflaive, 2018", price: "1400" },
            { name: "Коктейль 'Noir'", description: "Джин, тоник, чёрная смородина", price: "900" }
        ]
    };

    const menuContainer = document.querySelector('.menu-items');
    const categoryBtns = document.querySelectorAll('.category-btn');

    function loadMenuItems(category) {
        menuContainer.innerHTML = '';
        menuItems[category].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="menu-price">${item.price} ₽</span>
            `;
            menuContainer.appendChild(menuItem);
        });
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            loadMenuItems(category);
        });
    });

    // Загружаем закуски по умолчанию
    if (menuContainer) {
        loadMenuItems('starters');
    }

    // Анимации при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.menu-item, .promo-card, .form-group');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Устанавливаем начальные стили для анимации
    const initAnimationStyles = function() {
        const elements = document.querySelectorAll('.menu-item, .promo-card, .form-group');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
        });
    };

    if (document.querySelector('.menu-item') || document.querySelector('.promo-card') || document.querySelector('.form-group')) {
        initAnimationStyles();
        window.addEventListener('scroll', animateOnScroll);
        // Запускаем сразу на случай, если элементы уже в зоне видимости
        animateOnScroll();
    }
});