import './space.css';
import '../../../index.css';
import { useEffect, useRef, useState } from 'react';

// Импортируем GSAP прямо сюда
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Регистрируем плагины GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function SpacePage() {
  // --- Refs для всех DOM-элементов, которыми мы управляем ---
  const mainWrapperRef = useRef(null);
  const horizontalContainerRef = useRef(null);
  const panelsContainerRef = useRef(null);
  const panelsRef = useRef([]); // Ref для массива панелей
  const progressFillRef = useRef(null);
  const navTextRef = useRef(null);
  const copyEmailBtnRef = useRef(null);
  const copyTooltipRef = useRef(null);
  const sectionNavItemsRef = useRef([]); // Ref для массива элементов навигации

  // State для управления состоянием меню
  const [menuExpanded, setMenuExpanded] = useState(false);

  // --- Основной useEffect, который запускает всю логику анимации ---
  useEffect(() => {
    // Вся логика из space.js теперь живет здесь.
    // Используем .current, чтобы получить доступ к реальным DOM-элементам
    const pageContainer = horizontalContainerRef.current?.closest(".page-container");
    const panels = panelsContainerRef.current?.querySelectorAll(".panel");
    const parallaxElements = horizontalContainerRef.current?.querySelectorAll(".parallax");
    const sectionNavItems = mainWrapperRef.current?.querySelectorAll(".section-nav-item");
    
    if (!pageContainer || !panels || !parallaxElements || !sectionNavItems) {
      console.error("Один или несколько ключевых элементов не найдены в DOM.");
      return;
    }

    const SMOOTH_FACTOR = 0.065;
    const WHEEL_SENSITIVITY = 1.0;
    const PANEL_COUNT = panels.length;
    let targetX = 0;
    let currentX = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let panelWidth = window.innerWidth;
    let maxScroll = (PANEL_COUNT - 1) * panelWidth;
    let isAnimating = false;
    let currentPanel = 0;
    let lastPanel = -1;
    let isDragging = false;
    let startX = 0;
    let startScrollX = 0;
    let velocityX = 0;
    let lastTouchX = 0;
    let lastTouchTime = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const handleCopyEmail = () => {
      const emailElement = mainWrapperRef.current?.querySelector(".email");
      if (emailElement) {
        navigator.clipboard.writeText(emailElement.textContent).then(() => {
          copyTooltipRef.current?.classList.add("active");
          setTimeout(() => {
            copyTooltipRef.current?.classList.remove("active");
          }, 2000);
        });
      }
    };

    const handleNavItemClick = (e) => {
      const item = e.currentTarget;
      const index = Number.parseInt(item.getAttribute("data-index"));
      targetX = index * panelWidth;
      sectionNavItems.forEach(navItem => navItem.classList.remove("active"));
      item.classList.add("active");
      startAnimation();
    };

    // --- ИЗМЕНЕНИЕ 1: Функция для скролла колесиком закомментирована ---
    // const handleWheel = (e) => {
    //   e.preventDefault();
    //   targetX = clamp(targetX + e.deltaY * WHEEL_SENSITIVITY, 0, maxScroll);
    //   startAnimation();
    // };

    const handleMouseDown = (e) => {
        if (e.target.closest(".left-menu") || e.target.closest(".copy-email")) return;
        isDragging = true;
        startX = e.clientX;
        startScrollX = currentX;
        lastTouchX = e.clientX;
        lastTouchTime = Date.now();
        document.body.style.cursor = "grabbing";
        e.preventDefault();
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        targetX = clamp(startScrollX - dx, 0, maxScroll);
        const currentTime = Date.now();
        const timeDelta = currentTime - lastTouchTime;
        if (timeDelta > 0) {
            const touchDelta = lastTouchX - e.clientX;
            velocityX = (touchDelta / timeDelta) * 15;
        }
        lastTouchX = e.clientX;
        lastTouchTime = currentTime;
        startAnimation();
    };
    
    const handleMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.cursor = "grab";
        if (Math.abs(velocityX) > 0.5) {
            targetX = clamp(targetX + velocityX * 8, 0, maxScroll);
        }
        const nearestPanel = Math.round(targetX / panelWidth);
        targetX = nearestPanel * panelWidth;
        startAnimation();
    };
    
    const handleTouchStart = (e) => {
        if (e.target.closest(".left-menu") || e.target.closest(".copy-email")) return;
        isDragging = true;
        startX = e.touches[0].clientX;
        startScrollX = currentX;
        lastTouchX = e.touches[0].clientX;
        lastTouchTime = Date.now();
    };
    
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - startX;
        targetX = clamp(startScrollX - dx, 0, maxScroll);
        const currentTime = Date.now();
        const timeDelta = currentTime - lastTouchTime;
        if (timeDelta > 0) {
            const touchDelta = lastTouchX - e.touches[0].clientX;
            velocityX = (touchDelta / timeDelta) * 12;
        }
        lastTouchX = e.touches[0].clientX;
        lastTouchTime = currentTime;
        e.preventDefault();
        startAnimation();
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      if (Math.abs(velocityX) > 0.5) {
        targetX = clamp(targetX + velocityX * 6, 0, maxScroll);
      }
      const nearestPanel = Math.round(targetX / panelWidth);
      targetX = nearestPanel * panelWidth;
      startAnimation();
    };
    
    const updateParallax = () => {
      const PARALLAX_INTENSITY = 0.2;
      parallaxElements.forEach((element) => {
        if (!element) return;
        const speed = Number.parseFloat(element.dataset.speed) || 0.2;
        const moveX = -currentX * speed * PARALLAX_INTENSITY;
        element.style.transform = `translateX(${moveX}px)`;
      });
    };

    const updateDimensions = (animate = true) => {
      panelWidth = window.innerWidth;
      maxScroll = (PANEL_COUNT - 1) * panelWidth;
      targetX = currentPanel * panelWidth;
      currentX = targetX;
      panels.forEach(panel => panel.style.width = `${panelWidth}px`);
      if (animate) {
        panelsContainerRef.current.classList.add("transitioning");
        setTimeout(() => panelsContainerRef.current.classList.remove("transitioning"), 400);
      }
      panelsContainerRef.current.style.transform = `translateX(-${currentX}px)`;
      updateParallax();
    };

    const updatePageCount = () => {
      const currentPanelIndex = Math.round(currentX / panelWidth) + 1;
      const formattedIndex = currentPanelIndex.toString().padStart(2, "0");
      const totalPanels = PANEL_COUNT.toString().padStart(2, "0");
      if (navTextRef.current) navTextRef.current.textContent = `${formattedIndex} / ${totalPanels}`;
      sectionNavItems.forEach((item, index) => {
        if (index === currentPanelIndex - 1) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    };
    
    const updateProgress = () => {
        targetProgress = currentX / maxScroll;
        currentProgress = lerp(currentProgress, targetProgress, SMOOTH_FACTOR * 1.5);
        if (progressFillRef.current) progressFillRef.current.style.transform = `scaleX(${currentProgress})`;
    };
    
    const updateActivePanel = () => {
        currentPanel = Math.round(currentX / panelWidth);
        if (currentPanel !== lastPanel) {
            panels.forEach(panel => panel.classList.remove("was-active", "active"));
            if (panels[currentPanel]) {
                panels[currentPanel].classList.add("active");
            }
            for (let i = 0; i < panels.length; i++) {
                if (i < currentPanel) {
                    panels[i].classList.add("visited");
                } else {
                    panels[i].classList.remove("visited");
                }
            }
            lastPanel = currentPanel;
        }
    };
    
    let animationFrameId;
    const animate = () => {
      currentX = lerp(currentX, targetX, SMOOTH_FACTOR);
      panelsContainerRef.current.style.transform = `translateX(-${currentX}px)`;
      updateProgress();
      updatePageCount();
      updateActivePanel();
      updateParallax();
      if (Math.abs(targetX - currentX) > 0.1 || isAnimating) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    };
    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };

    const handleResize = () => updateDimensions();

    copyEmailBtnRef.current?.addEventListener("click", handleCopyEmail);
    sectionNavItems.forEach(item => item.addEventListener("click", handleNavItemClick));
    // --- ИЗМЕНЕНИЕ 2: Слушатель события 'wheel' закомментирован ---
    // horizontalContainerRef.current?.addEventListener("wheel", handleWheel, { passive: false });
    horizontalContainerRef.current?.addEventListener("mousedown", handleMouseDown);
    horizontalContainerRef.current?.addEventListener("touchstart", handleTouchStart, { passive: true });
    horizontalContainerRef.current?.addEventListener("touchmove", handleTouchMove, { passive: false });
    horizontalContainerRef.current?.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    updateDimensions();
    updateActivePanel();
    updatePageCount();
    startAnimation();

    // --- Функция очистки, которая будет вызвана при размонтировании компонента ---
    return () => {
        cancelAnimationFrame(animationFrameId);
        
        copyEmailBtnRef.current?.removeEventListener("click", handleCopyEmail);
        sectionNavItems.forEach(item => item.removeEventListener("click", handleNavItemClick));
        // --- ИЗМЕНЕНИЕ 3: Удаление слушателя 'wheel' закомментировано ---
        // horizontalContainerRef.current?.removeEventListener("wheel", handleWheel);
        horizontalContainerRef.current?.removeEventListener("mousedown", handleMouseDown);
        horizontalContainerRef.current?.removeEventListener("touchstart", handleTouchStart);
        horizontalContainerRef.current?.removeEventListener("touchmove", handleTouchMove);
        horizontalContainerRef.current?.removeEventListener("touchend", handleTouchEnd);
        
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("resize", handleResize);
    };

  }, []); // Пустой массив зависимостей означает, что этот useEffect выполнится только один раз.

  // ... остальная часть вашего компонента остается без изменений ...
  useEffect(() => {
    if (mainWrapperRef.current) {
      if (menuExpanded) {
        mainWrapperRef.current.classList.add('menu-expanded');
      } else {
        mainWrapperRef.current.classList.remove('menu-expanded');
      }
    }
  }, [menuExpanded]);

  const handleMenuClick = () => {
    setMenuExpanded(prev => !prev);
  };

  return (
    // ... ваш JSX остается без изменений ...
    <>
      <div ref={mainWrapperRef} className="main-wrapper">
        <div className="left-menu"> {/* leftMenuRef больше не нужен, т.к. поиск идет от mainWrapperRef */}
          <div className="left-menu-top">
            <button onClick={handleMenuClick} className="menu-btn" aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="left-menu-middle">
            <div className="logo font-dela">ПРОСТРАНСТВО</div>
          </div>
          <div className="section-nav">
            {[
              "Вступление", "Мэтью", "За Гранью", "Рик",
              "Космос", "Диалог", "Бесконечность", "Видение", "Контакты"
            ].map((label, i) => (
              <a key={i} className="section-nav-item font-dela" data-index={i}>
                <span className="section-nav-item-number">{String(i + 1).padStart(2, "0")}</span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="page-container">
          <div className="horizontal-container cursor-slider-area" ref={horizontalContainerRef}>
            <div className="navigation">
              <div className="nav-text">СКРОЛЛ</div>
              <div className="nav-progress">
                <div ref={progressFillRef} className="nav-progress-fill"></div>
              </div>
              <div ref={navTextRef} className="nav-text">01 / 09</div>
            </div>
            
            <div ref={panelsContainerRef} className="panels-container">
              {/* Все панели остаются без изменений */}
              <section className="panel panel-split editorial-split" data-index="0">
                <div className="editorial-content">
                  <div className="panel-content">
                    <div className="chapter">Разговор</div>
                    <h1 className="title split-text font-dela">Когда вы смотрите на звезды, вы на самом деле смотрите в прошлое. Наше время здесь кратко, но наш взгляд вечен.</h1>
                    <div className="text">
                      <p className="split-text">Бескрайняя пустота космоса дает нам перспективу. Она напоминает, насколько мы малы в великой схеме вещей. И все же, это не умаляет нас — это возвышает наше существование до чего-то чудесного.</p>
                    </div>
                  </div>
                </div>
                <div className="editorial-image">
                  <div className="image-wrapper">
                    <img src="https://cdn.cosmos.so/996569d5-2f19-40e9-9504-af3009286f9f.jpeg" alt="Space perspective" className="parallax" data-speed="0.3"/>
                  </div>
                </div>
              </section>

              <section className="panel panel-full" data-index="1">
                <div className="image-wrapper">
                  <img src="https://cdn.cosmos.so/6828e15d-6b7e-4116-ba62-99493fa821cf.jpeg" alt="Cave opening" className="panel-full-background parallax" data-speed="0.2"/>
                </div>
                <div className="panel-full-overlay"></div>
                <div className="panel-full-content">
                  <div className="chapter">Мэтью</div>
                  <h2 className="title split-text font-dela">Вселенная не заботится о наших планах. Она вознаграждает лишь наше присутствие.</h2>
                  <div className="text">
                    <p className="split-text">Мы думаем, что знаем, что там, снаружи, но, черт возьми, мы едва коснулись поверхности. Мы словно дети, впервые открывающие глаза. Каждое открытие — это лишь начало десяти тысяч новых вопросов.</p>
                  </div>
                </div>
              </section>

              <section className="panel panel-fixed" data-index="2">
                <div className="image-wrapper">
                  <img src="https://cdn.cosmos.so/47895928-9611-45a3-b94d-0d8ef8ac02dc.jpeg" alt="Galaxy view" className="panel-fixed-image parallax" data-speed="0.25"/>
                </div>
                <div className="panel-fixed-content">
                  <div className="space-text font-dela">ЗА ГРАНЬЮ</div>
                </div>
              </section>

              <section className="panel panel-split editorial-split" data-index="3">
                <div className="editorial-image">
                  <div className="image-wrapper">
                    <img src="https://cdn.cosmos.so/a28a9abc-6d7a-4160-a44b-2d9968c689c6.jpeg" alt="Space explorer" className="parallax" data-speed="0.3"/>
                  </div>
                </div>
                <div className="editorial-content">
                  <div className="panel-content">
                    <div className="chapter">Рик</div>
                    <h2 className="title split-text font-dela">Тишина — это холст, на котором вселенная являет себя.</h2>
                    <div className="text">
                      <p className="split-text">В пустоте есть что-то глубокое. Она совсем не пуста. Она полна потенциала. Пространство между вещами — вот где происходит волшебство. Нас тянет исследовать не потому, что мы хотим завоевывать, а потому, что мы жаждем понять.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="panel panel-full" data-index="4">
                <div className="image-wrapper">
                  <img src="https://cdn.cosmos.so/e3817e25-3312-43ea-b666-75aa0bc4b5ae.jpeg" alt="Deep space" className="panel-full-background parallax" data-speed="0.2"/>
                </div>
                <div className="panel-full-overlay"></div>
                <div className="panel-full-content">
                  <div className="beyond-text font-dela">КОСМОС</div>
                  <div className="text">
                    <p className="split-text">Иногда я думаю о том, что каждый атом в наших телах был выкован в сердце умирающей звезды. Мы не просто во вселенной — вселенная в нас. Эта связь, — вот что движет нами вперед.</p>
                  </div>
                </div>
              </section>

              <section className="panel panel-split" data-index="5">
                <div className="panel-left">
                  <div className="panel-content">
                    <div className="direction-label">Мэтью</div>
                    <div className="quote-container">
                      <div className="quote">"Я всегда подходил к космосу с чувством удивления. Это как смотреть на свое отражение в зеркале, которое уходит в бесконечность. Вы видите себя, но вы также видите и за пределы себя."</div>
                      <div className="author">ИНТЕРСТЕЛЛАР, 2014</div>
                    </div>
                    <div className="image-container">
                      <div className="image-wrapper">
                        <img src="https://cdn.cosmos.so/f22462ad-b33d-448d-aa08-cfbbbe79ef42.jpeg" alt="Space journey" className="parallax" data-speed="0.15"/>
                      </div>
                    </div>
                    <div className="conclusion-text">
                      <p className="split-text">Смотреть туда — значит на самом деле смотреть сюда. Вопросы, которые мы задаем о звездах, — это на самом деле вопросы о нас самих.</p>
                    </div>
                  </div>
                </div>
                <div className="panel-right">
                  <div className="panel-content">
                    <div className="direction-label">Рик</div>
                    <div className="quote-container">
                      <div className="quote">"Великое искусство создает пространство. Великое пространство создает перспективу. Когда мы стоим на краю известного, вот где начинается истинное творчество."</div>
                      <div className="author">ТВОРЧЕСКИЙ ПРОЦЕСС, 2022</div>
                    </div>
                    <div className="full-quote">
                      "Вселенная не спешит, и все же все свершается. Это парадокс, который мы пытаемся понять, — бесконечное терпение в паре с постоянной эволюцией."
                    </div>
                    <div className="text">
                      <p className="split-text">То, что мы обнаруживаем там, меняет все здесь. Каждое откровение о далекой галактике меняет то, как мы видим себя на этой бледно-голубой точке.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="panel panel-full" data-index="6">
                <div className="image-wrapper">
                  <img src="https://cdn.cosmos.so/ee8be9fb-15f6-4f3b-a13f-309cbf5453c2.jpeg" alt="Space infinite" className="panel-full-background parallax" data-speed="0.3"/>
                </div>
                <div className="panel-full-overlay"></div>
                <div className="panel-full-content">
                  <div className="mega-text font-dela">БЕСКОНЕЧНОСТЬ</div>
                  <div className="text">
                    <p className="split-text">Вселенная расширяется во всех направлениях одновременно, бесконечно сложная и бесконечно простая. Мы лишь мимолетное скопление звездной пыли, наблюдающее за космическим танцем.</p>
                  </div>
                </div>
              </section>
              
              <section className="panel panel-video" data-index="7">
                <video className="video-background" autoPlay loop muted playsInline>
                  <source src="https://cdn.cosmos.so/fdfc1996-66fd-4536-8d36-0ad173a4acff.mp4" type="video/mp4"/>
                </video>
                <div className="panel-video-overlay"></div>
                <div className="panel-video-content">
                  <div className="mega-text font-dela">ВИДЕНИЕ</div>
                </div>
              </section>

              <section className="panel panel-contact" data-index="8">
                <div className="contact-container">
                  <div className="contact-content">
                    <div className="space-text contact-name font-dela">СВЯЖИТЕСЬ С НАМИ</div>
                    <div className="email-wrapper">
                      <a href="mailto:hi@filip.fyi" className="email">hi@filip.fyi</a>
                      <button ref={copyEmailBtnRef} className="copy-email" title="Copy email" aria-label="Copy email to clipboard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                      <span ref={copyTooltipRef} className="copy-tooltip">Скопировано!</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}