document.addEventListener('DOMContentLoaded', function() {
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || {
        name: "Иван Иванов",
        job: "Веб-разработчик",
        about: "Я профессиональный веб-разработчик с 5-летним опытом работы. Специализируюсь на создании современных веб-приложений с использованием React и Node.js.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
        projects: ["Корпоративный сайт для компании X", "Интернет-магазин мебели", "Мобильное приложение для заказа еды"],
        email: "ivan.ivanov@example.com",
        theme: "minimal"
    };

    portfolioData.phone = portfolioData.phone || "+7 (123) 456-7890";
    portfolioData.social = portfolioData.social || "@ivan_developer";

    let currentSlide = 0;
    let slidesCount = 0;
    let isFullscreen = false;
    let animationSpeed = 0.6;
    let transitionSpeed = 0.6;
    let transitionType = 'slide';

    function generateProfessionText(profession) {
        const texts = {
            "веб-разработчик": `Как веб-разработчик с опытом работы, я специализируюсь на создании современных, отзывчивых веб-приложений. 
            Моя работа включает в себя проектирование архитектуры приложений, написание чистого и эффективного кода, 
            а также тесное взаимодействие с дизайнерами и другими членами команды для достижения наилучших результатов.`,
            
            "дизайнер": `Как дизайнер, я сосредоточен на создании эстетичных и функциональных интерфейсов. 
            Моя работа включает исследование пользовательского опыта, создание прототипов и визуальных концепций, 
            а также тестирование дизайна на реальных пользователях для достижения оптимального результата.`,
            
            "программист": `Как программист, я обладаю глубокими знаниями в области разработки программного обеспечения. 
            Моя работа включает анализ требований, проектирование архитектуры, написание и тестирование кода, 
            а также постоянное обучение новым технологиям и методологиям разработки.`,
            
            "маркетолог": `Как маркетолог, я специализируюсь на разработке и реализации стратегий продвижения. 
            Моя работа включает анализ рынка, сегментацию аудитории, создание контент-стратегий и 
            измерение эффективности маркетинговых кампаний для достижения бизнес-целей.`
        };
        
        const lowerProfession = profession.toLowerCase();
        return texts[lowerProfession] || `Как ${profession}, я обладаю уникальным набором навыков и опытом, которые позволяют мне эффективно решать профессиональные задачи. 
        Моя работа включает анализ потребностей, разработку решений и их реализацию для достижения наилучших результатов.`;
    }

    function generateAboutText(about) {
        const baseText = about;
        const additionalTexts = [
            "В своей работе я уделяю особое внимание качеству и деталям. Постоянное обучение и развитие - это мой основной принцип, который позволяет мне оставаться в курсе последних тенденций в моей области.",
            "Я убеждён, что успех любого проекта зависит от слаженной работы команды и чёткого понимания целей. Именно поэтому я всегда стараюсь наладить эффективную коммуникацию со всеми участниками процесса.",
            "Мой подход к работе сочетает в себе творческое мышление и аналитический подход. Это позволяет мне находить нестандартные решения сложных задач и реализовывать их на практике.",
            "За время своей карьеры я работал над множеством проектов различного масштаба - от небольших локальных решений до крупных корпоративных систем. Этот опыт научил меня быстро адаптироваться к новым условиям и находить оптимальные пути решения задач.",
            "Я ценю в работе не только результат, но и сам процесс. Для меня важно, чтобы каждый этап работы был продуманным, логичным и приносил удовлетворение как мне, так и клиенту."
        ];
        
        const randomAdditional = additionalTexts[Math.floor(Math.random() * additionalTexts.length)];
        
        return `${baseText} ${randomAdditional}`;
    }

    function generateProjectDescription(projectName) {
        const techs = ["React", "Node.js", "MongoDB", "Express", "Redux", "TypeScript", "Vue.js", "Angular", "Django", "Flask", "Laravel"];
        const randomTechs = [...techs].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        const descriptions = [
            `Проект "${projectName}" был разработан с использованием ${randomTechs.join(", ")}. Основной задачей было создание удобного интерфейса и надежной backend-части. В ходе работы были реализованы сложные механизмы взаимодействия и обеспечена высокая производительность системы.`,
            `В рамках проекта "${projectName}" я занимался разработкой на ${randomTechs.join(", ")}. Были созданы основные функциональные модули, реализована интеграция со сторонними сервисами и обеспечена безопасность данных.`,
            `"${projectName}" - это проект, где я применил ${randomTechs.join(", ")} для решения бизнес-задач. Особое внимание было уделено UX/UI дизайну и оптимизации процессов, что значительно улучшило пользовательский опыт.`,
            `Разрабатывая "${projectName}", я использовал ${randomTechs.join(", ")} для создания масштабируемого и поддерживаемого решения. Проект включал в себя разработку API, админ-панели и мобильной адаптации.`
        ];
        
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    function generateSlides() {
        const wrapper = document.getElementById('slides-wrapper');
        const nav = document.getElementById('slide-nav');
        
        wrapper.innerHTML = '';
        nav.innerHTML = '';
        
        const slide1 = document.createElement('div');
        slide1.className = 'slide';
        slide1.innerHTML = `
            <h2 class="slide-title">Добро пожаловать в моё портфолио</h2>
            <div class="slide-content">
                <div class="profile-container">
                    <div class="profile-text editable" contenteditable="true" id="slide1-text">
                        <p>Меня зовут <strong>${portfolioData.name}</strong>, я <strong>${portfolioData.job}</strong>.</p>
                        <p>${generateProfessionText(portfolioData.job)}</p>
                        <p>Мои ключевые навыки: ${portfolioData.skills.join(", ")}.</p>
                        <p>В этом портфолио я собрал свои лучшие работы и профессиональные достижения.</p>
                    </div>
                    <div class="profile-image" id="profile-image">
                        <i class="fas fa-user fa-5x" style="color: #ccc;"></i>
                        <div class="profile-image-upload">
                            <i class="fas fa-camera"></i>
                            <input type="file" id="profile-upload" accept="image/*" style="display: none;">
                        </div>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide1);
        
        const slide2 = document.createElement('div');
        slide2.className = 'slide';
        slide2.innerHTML = `
            <h2 class="slide-title">Обо мне</h2>
            <div class="slide-content">
                <div class="profile-container">
                    <div class="profile-text editable" contenteditable="true" id="slide2-text">
                        ${generateAboutText(portfolioData.about)}
                    </div>
                    <div class="skills-container">
                        <h3>Ключевые компетенции</h3>
                        <ul style="margin-top: 15px; padding-left: 20px;">
                            <li>Профессиональный опыт</li>
                            <li>Техническая экспертиза</li>
                            <li>Решение сложных задач</li>
                            <li>Работа в команде</li>
                            <li>Постоянное развитие</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide2);
        
        const slide3 = document.createElement('div');
        slide3.className = 'slide';
        slide3.innerHTML = `
            <h2 class="slide-title">Мои проекты</h2>
            <div class="slide-content">
                <div class="projects-grid" id="projects-grid">
                    ${portfolioData.projects.map(project => `
                        <div class="project-card">
                            <h3 class="editable" contenteditable="true">${project}</h3>
                            <p class="editable" contenteditable="true">
                                ${generateProjectDescription(project)}
                            </p>
                        </div>
                    `).join('')}
                    <div class="add-project" id="add-project">
                        <i class="fas fa-plus-circle" style="font-size: 2rem; color: var(--primary); margin-bottom: 10px;"></i>
                        <div>Добавить проект</div>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide3);
        
        const slide4 = document.createElement('div');
        slide4.className = 'slide';
        slide4.innerHTML = `
            <h2 class="slide-title">Мои сертификаты</h2>
            <div class="slide-content">
                <div class="certificates-grid">
                    <div class="certificate-card">
                        <div class="certificate-image">
                            <i class="fas fa-certificate fa-4x" style="color: #ccc;"></i>
                            <div class="certificate-image-upload">
                                <i class="fas fa-camera"></i>
                                <input type="file" class="certificate-upload" accept="image/*" style="display: none;">
                            </div>
                        </div>
                        <div class="certificate-details" style="padding: 15px;">
                            <div class="editable" contenteditable="true" style="min-height: 60px;">Название сертификата</div>
                        </div>
                    </div>
                    <div class="certificate-card">
                        <div class="certificate-image">
                            <i class="fas fa-certificate fa-4x" style="color: #ccc;"></i>
                            <div class="certificate-image-upload">
                                <i class="fas fa-camera"></i>
                                <input type="file" class="certificate-upload" accept="image/*" style="display: none;">
                            </div>
                        </div>
                        <div class="certificate-details" style="padding: 15px;">
                            <div class="editable" contenteditable="true" style="min-height: 60px;">Название сертификата</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide4);
        
        const slide5 = document.createElement('div');
        slide5.className = 'slide';
        slide5.innerHTML = `
            <h2 class="slide-title">Контакты</h2>
            <div class="slide-content">
                <div class="contact-info">
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div>
                            <div class="editable" contenteditable="true">${portfolioData.email}</div>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-phone-alt"></i>
                        </div>
                        <div>
                            <div class="editable" contenteditable="true">${portfolioData.phone}</div>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-link"></i>
                        </div>
                        <div>
                            <div class="editable" contenteditable="true">${portfolioData.social}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide5);
        
        slidesCount = wrapper.children.length;
        for (let i = 0; i < slidesCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'slide-dot';
            dot.dataset.slide = i;
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            nav.appendChild(dot);
        }
        
        setTimeout(() => {
            document.querySelectorAll('.slide')[0].classList.add('active');
        }, 100);
        
        initEditor();
    }
    
    function goToSlide(index) {
        if (index < 0 || index >= slidesCount) return;
        
        const wrapper = document.getElementById('slides-wrapper');
        const dots = document.querySelectorAll('.slide-dot');
        
        currentSlide = index;
        
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        const currentActiveSlide = document.querySelector('.slide.active');
        if (currentActiveSlide) {
            currentActiveSlide.classList.remove('active');
        }
        
        const newActiveSlide = document.querySelectorAll('.slide')[currentSlide];
        newActiveSlide.classList.add('active');
    }
    
    function nextSlide() {
        if (currentSlide < slidesCount - 1) {
            goToSlide(currentSlide + 1);
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }
    
    function toggleFullscreen() {
        const elem = document.documentElement;
        
        if (!isFullscreen) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            isFullscreen = true;
            document.getElementById('fullscreen-btn').innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            isFullscreen = false;
            document.getElementById('fullscreen-btn').innerHTML = '<i class="fas fa-expand"></i>';
        }
    }
    
    function initEditor() {
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const toolId = this.id;
                
                document.querySelectorAll('.settings-section').forEach(section => {
                    section.style.display = 'none';
                });
                
                if (toolId === 'text-tool') {
                    document.getElementById('font-section').style.display = 'block';
                } else if (toolId === 'color-tool') {
                    document.getElementById('color-section').style.display = 'block';
                } else if (toolId === 'theme-tool') {
                    document.getElementById('theme-section').style.display = 'block';
                } else if (toolId === 'animation-tool') {
                    document.getElementById('animation-section').style.display = 'block';
                }
                
                document.getElementById('settings-panel').classList.add('open');
            });
        });
        
        document.getElementById('close-settings').addEventListener('click', function() {
            document.getElementById('settings-panel').classList.remove('open');
        });
        
        document.querySelectorAll('[data-font]').forEach(btn => {
            btn.addEventListener('click', function() {
                const fontFamily = this.getAttribute('data-font');
                document.querySelectorAll('.editable').forEach(el => {
                    el.style.fontFamily = fontFamily;
                });
            });
        });
        
        document.querySelectorAll('[data-color]').forEach(btn => {
            btn.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                document.execCommand('foreColor', false, color);
            });
        });
        
        document.getElementById('bold-btn').addEventListener('click', function() {
            document.execCommand('bold', false, null);
        });
        
        document.getElementById('italic-btn').addEventListener('click', function() {
            document.execCommand('italic', false, null);
        });
        
        document.getElementById('underline-btn').addEventListener('click', function() {
            document.execCommand('underline', false, null);
        });
        
        document.getElementById('font-size').addEventListener('input', function() {
            document.querySelectorAll('.editable').forEach(el => {
                el.style.fontSize = this.value + 'px';
            });
        });
        
        document.querySelectorAll('[data-animation]').forEach(btn => {
            btn.addEventListener('click', function() {
                const animation = this.getAttribute('data-animation');
                document.querySelectorAll('.slide-title').forEach(el => {
                    el.style.animation = `${animation} ${animationSpeed}s ease forwards`;
                });
                document.querySelectorAll('.slide-content').forEach(el => {
                    el.style.animation = `${animation} ${animationSpeed}s ease forwards`;
                });
            });
        });
        
        document.getElementById('animation-speed').addEventListener('input', function() {
            animationSpeed = parseFloat(this.value);
        });
        
        document.querySelectorAll('[data-transition]').forEach(btn => {
            btn.addEventListener('click', function() {
                transitionType = this.getAttribute('data-transition');
                const wrapper = document.getElementById('slides-wrapper');
                wrapper.style.transition = `transform ${transitionSpeed}s ${transitionType}`;
            });
        });
        
        document.getElementById('transition-speed').addEventListener('input', function() {
            transitionSpeed = parseFloat(this.value);
            const wrapper = document.getElementById('slides-wrapper');
            wrapper.style.transition = `transform ${transitionSpeed}s ${transitionType}`;
        });
        
        document.querySelectorAll('.profile-image-upload, .certificate-image-upload').forEach(uploadBtn => {
            uploadBtn.addEventListener('click', function() {
                const input = this.querySelector('input[type="file"]');
                input.click();
            });
        });
        
        document.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const container = this.closest('.profile-image, .certificate-image');
                        container.innerHTML = `<img src="${e.target.result}">` + container.innerHTML;
                    }.bind(this);
                    reader.readAsDataURL(this.files[0]);
                }
            });
        });
        
        document.getElementById('add-project').addEventListener('click', function() {
            const projectsGrid = document.getElementById('projects-grid');
            const newProject = document.createElement('div');
            newProject.className = 'project-card';
            newProject.innerHTML = `
                <h3 class="editable" contenteditable="true">Новый проект</h3>
                <p class="editable" contenteditable="true">
                    Опишите ваш проект здесь. Какие технологии использовались, какие задачи решались и какие результаты были достигнуты.
                </p>
            `;
            projectsGrid.insertBefore(newProject, this);
        });
        
        document.getElementById('save-btn').addEventListener('click', function() {
            const presentationData = {
                slides: [],
                theme: 'light',
                updatedAt: new Date().toISOString()
            };
            
            document.querySelectorAll('.slide').forEach((slide, index) => {
                presentationData.slides.push({
                    id: index + 1,
                    content: slide.innerHTML
                });
            });
            
            localStorage.setItem('portfolioPresentation', JSON.stringify(presentationData));
            alert('Презентация успешно сохранена!');
        });
        
        document.getElementById('export-btn').addEventListener('click', function() {
            alert('Функция экспорта в PDF будет реализована в будущем');
        });
        
        document.getElementById('toggle-toolbar').addEventListener('click', function() {
            document.getElementById('toolbar').classList.toggle('hidden');
            this.innerHTML = document.getElementById('toolbar').classList.contains('hidden') ? 
                '<i class="fas fa-chevron-right"></i>' : '<i class="fas fa-chevron-left"></i>';
        });
        
        document.getElementById('next-slide').addEventListener('click', nextSlide);
        document.getElementById('prev-slide').addEventListener('click', prevSlide);
        
        document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'f11') {
                e.preventDefault();
                toggleFullscreen();
            }
        });
    }
    
    document.addEventListener('DOMContentLoaded', generateSlides);
});