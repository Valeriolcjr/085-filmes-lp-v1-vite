/* =========================================================
   085 FILMES — V3 interactions
   GSAP / Lenis / Swiper
   Assinatura 085
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

/* -------------------------
   LOADER
------------------------- */
window.addEventListener("load", () => {
  const loader = document.querySelector(".site-loader");

  setTimeout(() => {
    loader?.classList.add("is-hidden");
    document.body.classList.add("is-ready");
    playHeroIntro();
  }, 1050);
});

function playHeroIntro() {
  const tl = gsap.timeline();

  tl.from(".hero-video-eyebrow", {
    y: 14,
    opacity: 0,
    duration: 0.55,
    ease: "power3.out"
  })
  .from(".hero-video-title", {
    y: 35,
    opacity: 0,
    duration: 0.85,
    ease: "power3.out"
  }, "-=.2")
  .from(".hero-video .hero-scroll-indicator", {
    y: 12,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out"
  }, "-=.35");
}

/* -------------------------
   LENIS
------------------------- */
const lenis = new Lenis({
  duration: 1.08,
  smoothWheel: true,
  wheelMultiplier: 0.86,
  touchMultiplier: 1.2
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* -------------------------
   HEADER
------------------------- */
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 60);
});

/* -------------------------
   SMOOTH ANCHORS
------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = link.getAttribute("href");

    if (!target || target === "#") return;

    const el = document.querySelector(target);

    if (!el) return;

    e.preventDefault();

    lenis.scrollTo(el, {
      offset: -72
    });
  });
});

/* -------------------------
   GENERIC REVEALS
------------------------- */

gsap.utils
  .toArray(".display-title")
  .forEach((title) => {

    gsap.from(title, {
      y: 80,
      opacity: 0,

      duration:
        1,

      ease:
        "power4.out",

      scrollTrigger: {
        trigger:
          title,

        start:
          "top 86%",

        once:
          true
      }
    });
  });

gsap.utils
  .toArray(".section-kicker")
  .forEach((kicker) => {

    gsap.from(kicker, {
      y: 18,
      opacity: 0,

      duration:
        .65,

      ease:
        "power3.out",

      scrollTrigger: {
        trigger:
          kicker,

        start:
          "top 92%",

        once:
          true
      }
    });
  });

/* -------------------------
   COUNTERS
------------------------- */

document
  .querySelectorAll(
    "[data-counter]"
  )
  .forEach((counter) => {

    const finalValue =
      Number(
        counter.dataset.counter ||
        0
      );

    const proxy = {
      value: 0
    };

    gsap.to(proxy, {

      value:
        finalValue,

      duration:
        1.6,

      ease:
        "power2.out",

      scrollTrigger: {

        trigger:
          counter,

        start:
          "top 88%",

        once:
          true
      },

      onUpdate:
        () => {

          counter.textContent =
            Math.round(
              proxy.value
            );
        }
    });
  });

/* -------------------------
   MANIFESTO
------------------------- */

gsap.from(
  ".manifesto-title",
  {
    y: 90,
    opacity: 0,

    duration:
      1.1,

    ease:
      "power4.out",

    scrollTrigger: {

      trigger:
        ".manifesto",

      start:
        "top 70%",

      once:
        true
    }
  }
);

gsap.to(
  ".manifesto-watermark",
  {
    xPercent:
      -12,

    scrollTrigger: {

      trigger:
        ".manifesto",

      start:
        "top bottom",

      end:
        "bottom top",

      scrub:
        1.2
    }
  }
);

/* -------------------------
   SWIPER — FILMES
------------------------- */

const filmsSwiper =
  new Swiper(
    ".films-swiper",
    {
      slidesPerView:
        "auto",

      spaceBetween:
        18,

      speed:
        850,

      grabCursor:
        true,

      navigation: {

        nextEl:
          ".films-next",

        prevEl:
          ".films-prev"
      },

      on: {

        slideChange(
          swiper
        ) {

          const current =
            swiper.realIndex +
            1;

          const total =
            swiper.slides
              .length;

          const currentEl =
            document
              .querySelector(
                ".films-current"
              );

          const totalEl =
            document
              .querySelector(
                ".films-total"
              );

          const bar =
            document
              .querySelector(
                ".progress-track i"
              );

          if (currentEl) {

            currentEl
              .textContent =
                String(current)
                  .padStart(
                    2,
                    "0"
                  );
          }

          if (totalEl) {

            totalEl
              .textContent =
                String(total)
                  .padStart(
                    2,
                    "0"
                  );
          }

          if (bar) {

            bar.style.width =
              `${
                (
                  current /
                  total
                ) *
                100
              }%`;
          }
        }
      }
    }
  );

const filmsTotal =
  filmsSwiper.slides.length;

const filmsTotalEl =
  document.querySelector(
    ".films-total"
  );

const filmsProgressBar =
  document.querySelector(
    ".films-swiper .progress-track i"
  );

if (filmsTotalEl) {
  filmsTotalEl.textContent =
    String(filmsTotal).padStart(2, "0");
}

if (filmsProgressBar && filmsTotal > 0) {
  filmsProgressBar.style.width =
    `${100 / filmsTotal}%`;
}

/* -------------------------
   SWIPER — CAMPANHAS
------------------------- */

new Swiper(
  ".campaign-swiper",
  {
    slidesPerView:
      "auto",

    spaceBetween:
      18,

    speed:
      850,

    grabCursor:
      true,

    navigation: {

      nextEl:
        ".campaign-next",

      prevEl:
        ".campaign-prev"
    }
  }
);

/* -------------------------
   CUSTOM CURSOR
------------------------- */

const cursor =
  document.querySelector(
    ".custom-cursor"
  );

const cursorText =
  cursor?.querySelector(
    "span"
  );

if (
  cursor &&
  window
    .matchMedia(
      "(pointer: fine)"
    )
    .matches
) {

  window.addEventListener(
    "mousemove",
    (e) => {

      gsap.to(
        cursor,
        {
          x:
            e.clientX,

          y:
            e.clientY,

          duration:
            0.18,

          ease:
            "power2.out"
        }
      );
    }
  );

  const cursorTargets = [

    [
      ".cursor-view",
      "VER"
    ],

    [
      ".cursor-drag",
      "ARRASTE"
    ],

    [
      ".cursor-play",
      "ASSISTIR"
    ]
  ];

  cursorTargets
    .forEach(
      (
        [
          selector,
          label
        ]
      ) => {

        document
          .querySelectorAll(
            selector
          )
          .forEach(
            (el) => {

              el.addEventListener(
                "mouseenter",
                () => {

                  if (
                    cursorText
                  ) {

                    cursorText
                      .textContent =
                        label;
                  }

                  cursor
                    .classList
                    .add(
                      "is-active"
                    );
                }
              );

              el.addEventListener(
                "mouseleave",
                () => {

                  cursor
                    .classList
                    .remove(
                      "is-active"
                    );
                }
              );
            }
          );
      }
    );
}

/* -------------------------
   MAGNETIC ELEMENTS
------------------------- */

document
  .querySelectorAll(
    ".magnetic"
  )
  .forEach(
    (element) => {

      element
        .addEventListener(
          "mousemove",
          (event) => {

            const rect =
              element
                .getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width /
              2;

            const y =
              event.clientY -
              rect.top -
              rect.height /
              2;

            gsap.to(
              element,
              {
                x:
                  x *
                  0.12,

                y:
                  y *
                  0.12,

                duration:
                  0.3,

                ease:
                  "power2.out"
              }
            );
          }
        );

      element
        .addEventListener(
          "mouseleave",
          () => {

            gsap.to(
              element,
              {
                x: 0,
                y: 0,

                duration:
                  0.55,

                ease:
                  "elastic.out(1, .45)"
              }
            );
          }
        );
    }
  );

/* -------------------------
   PROCESS ACTIVE STEP
------------------------- */

document
  .querySelectorAll(
    ".process-step"
  )
  .forEach(
    (step) => {

      ScrollTrigger
        .create(
          {
            trigger:
              step,

            start:
              "top 55%",

            end:
              "bottom 45%",

            onEnter:
              () =>
                setActiveStep(
                  step
                ),

            onEnterBack:
              () =>
                setActiveStep(
                  step
                )
          }
        );
    }
  );

function setActiveStep(
  activeStep
) {

  document
    .querySelectorAll(
      ".process-step"
    )
    .forEach(
      (step) => {

        step
          .classList
          .toggle(
            "active",
            step ===
              activeStep
          );
      }
    );
}

/* -------------------------
   PARALLAX
------------------------- */

gsap.to(
  ".showreel-bg",
  {
    yPercent:
      10,

    scale:
      1.1,

    scrollTrigger: {

      trigger:
        ".showreel",

      start:
        "top bottom",

      end:
        "bottom top",

      scrub:
        1
    }
  }
);

gsap.utils
  .toArray(
    ".behind-card"
  )
  .forEach(
    (
      card,
      index
    ) => {

      gsap.from(
        card,
        {
          y:
            55 +
            index *
            8,

          opacity:
            0,

          duration:
            .9,

          ease:
            "power3.out",

          scrollTrigger: {

            trigger:
              card,

            start:
              "top 90%",

            once:
              true
          }
        }
      );
    }
  );

/* -------------------------
   SHOWREEL MODAL
------------------------- */

const modal =
  document.querySelector(
    ".video-modal"
  );

const openButtons =
  document.querySelectorAll(
    ".showreel-play"
  );

const closeButton =
  document.querySelector(
    ".modal-close"
  );

openButtons
  .forEach(
    (button) => {

      button
        .addEventListener(
          "click",
          () => {

            modal
              ?.classList
              .add(
                "is-open"
              );

            modal
              ?.setAttribute(
                "aria-hidden",
                "false"
              );

            document.body
              .classList
              .add(
                "modal-open"
              );

            lenis.stop();
          }
        );
    }
  );

closeButton
  ?.addEventListener(
    "click",
    closeModal
  );

modal
  ?.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        modal
      ) {

        closeModal();
      }
    }
  );

window
  .addEventListener(
    "keydown",
    (event) => {

      if (
        event.key ===
        "Escape"
      ) {

        closeModal();
      }
    }
  );

function closeModal() {

  if (!modal?.classList.contains("is-open")) {
    return;
  }

  modal
    ?.classList
    .remove(
      "is-open"
    );

  modal
    ?.setAttribute(
      "aria-hidden",
      "true"
    );

  document.body
    .classList
    .remove(
      "modal-open"
    );

  lenis.start();
}

/* -------------------------
   FILMS MODAL
------------------------- */

const filmModal = document.querySelector("#filmModal");
const filmModalVideo = document.querySelector("#filmModalVideo");
const filmModalTitle = document.querySelector("#filmModalTitle");
const filmModalClose = document.querySelector(".film-modal-close");
const filmsCarousel = document.querySelector(".films-swiper");
let activeFilmTrigger = null;
let filmPointerStart = null;
let suppressFilmClickUntil = 0;

document.querySelectorAll(".film-poster").forEach((poster) => {
  poster.addEventListener("error", () => {
    poster.hidden = true;
  }, { once: true });
});

function openFilmModal(trigger) {
  if (!filmModal || !filmModalVideo || !trigger?.dataset.video) {
    return;
  }

  activeFilmTrigger = trigger;
  filmModalVideo.src = trigger.dataset.video;
  filmModalTitle.textContent = trigger.dataset.title || "";
  filmModalVideo.load();
  filmModal.classList.add("is-open");
  filmModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  lenis.stop();
  filmModalClose?.focus();
}

function closeFilmModal() {
  if (!filmModal?.classList.contains("is-open") || !filmModalVideo) {
    return;
  }

  filmModalVideo.pause();

  try {
    filmModalVideo.currentTime = 0;
  } catch {
    // The media may not have loaded metadata yet.
  }

  filmModalVideo.removeAttribute("src");
  filmModalVideo.load();
  filmModal.classList.remove("is-open");
  filmModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lenis.start();
  activeFilmTrigger?.focus({ preventScroll: true });
  activeFilmTrigger = null;
}

filmsCarousel?.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".swiper-slide")) {
    filmPointerStart = { x: event.clientX, y: event.clientY };
  }
}, true);

document.addEventListener("pointerup", (event) => {
  if (!filmPointerStart) {
    return;
  }

  const distance = Math.hypot(
    event.clientX - filmPointerStart.x,
    event.clientY - filmPointerStart.y
  );

  if (distance > 8) {
    suppressFilmClickUntil = Date.now() + 500;
  }

  filmPointerStart = null;
});

filmsCarousel?.addEventListener("click", (event) => {
  if (event.detail !== 0 && Date.now() < suppressFilmClickUntil) {
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressFilmClickUntil = 0;
    return;
  }

  const slide = event.target.closest(".project-slide");
  const trigger = event.target.closest(".film-open") || slide?.querySelector(".film-open");

  if (trigger) {
    openFilmModal(trigger);
  }
}, true);

filmModalClose?.addEventListener("click", closeFilmModal);

filmModal?.addEventListener("click", (event) => {
  if (!event.target.closest(".film-modal-content")) {
    closeFilmModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFilmModal();
  }
});

/* -------------------------
   ASSINATURA 085 — SCROLL STORY

   0 = Conceito
   8 = Produção
   5 = Entrega

   Depois:

   0 = Filme
   8 = Foto
   5 = Campanha
------------------------- */

const signatureSection =
  document.querySelector(
    ".signature-085"
  );

if (
  signatureSection
) {

  const signatureTl =
    gsap.timeline(
      {
        scrollTrigger: {

          trigger:
            signatureSection,

          start:
            "top top",

          end:
            "bottom bottom",

          scrub:
            1.1
        }
      }
    );

  signatureTl
    .fromTo(
      ".signature-digits",
      {
        scale: 0.86,
        rotateX: 7
      },
      {
        scale: 1,
        rotateX: 0,
        duration: 0.18,
        ease: "none"
      }
    )
    .to(
      ".signature-progress b",
      {
        scaleX: 0.04,
        duration: 0.12,
        ease: "none"
      },
      0
    )
    .to(
      ".sig-0",
      {
        xPercent: -13,
        rotateY: -8,
        rotateZ: -1.3,
        duration: 0.22,
        ease: "none"
      }
    )
    .to(
      ".sig-8",
      {
        yPercent: -7,
        scale: 1.05,
        duration: 0.22,
        ease: "none"
      },
      "<"
    )
    .to(
      ".sig-5",
      {
        xPercent: 13,
        rotateY: 8,
        rotateZ: 1.3,
        duration: 0.22,
        ease: "none"
      },
      "<"
    )
    .to(
      ".sig-label-stage-1",
      {
        opacity: 0,
        y: -14,
        duration: 0.14,
        stagger: 0.02,
        ease: "none"
      }
    )
    .to(
      ".sig-label-stage-2",
      {
        opacity: 1,
        y: 0,
        duration: 0.16,
        stagger: 0.025,
        ease: "none"
      },
      "<+.035"
    )
    .to(
      ".signature-progress b",
      {
        scaleX: 0.34,
        duration: 0.16,
        ease: "none"
      },
      "<"
    )
    .to(
      ".sig-label-stage-2",
      {
        opacity: 0,
        y: -14,
        duration: 0.14,
        stagger: 0.02,
        ease: "none"
      }
    )
    .to(
      ".sig-label-stage-3",
      {
        opacity: 1,
        y: 0,
        duration: 0.16,
        stagger: 0.025,
        ease: "none"
      },
      "<+.035"
    )
    .to(
      ".signature-progress b",
      {
        scaleX: 0.67,
        duration: 0.16,
        ease: "none"
      },
      "<"
    )
    .to(
      ".sig-label-stage-3",
      {
        opacity: 0,
        y: -14,
        duration: 0.14,
        stagger: 0.02,
        ease: "none"
      }
    )
    .to(
      ".sig-label-stage-4",
      {
        opacity: 1,
        y: 0,
        duration: 0.18,
        stagger: 0.025,
        ease: "none"
      },
      "<+.035"
    )
    .to(
      ".signature-word-start",
      {
        opacity: 0,
        y: -8,
        duration: 0.12,
        ease: "none"
      },
      "<"
    )
    .to(
      ".signature-word-end",
      {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: "none"
      },
      "<"
    )
    .to(
      ".signature-progress b",
      {
        scaleX: 1,
        duration: 0.18,
        ease: "none"
      },
      "<"
    )
    .to(
      ".sig-number",
      {
        scale: 0.93,
        duration: 0.15,
        stagger: 0.01,
        ease: "none"
      }
    )
    .to(
      ".signature-center-mark",
      {
        opacity: 0.075,
        duration: 0.15,
        ease: "none"
      },
      "<"
    );
}

/* =========================================================
   RECALL 085 — HOVER INTERATIVO
   ========================================================= */

const recallSection =
  document.querySelector(
    ".recall-085"
  );

const recallBrand =
  document.querySelector(
    ".recall-brand"
  );

const recallBrandWrap =
  document.querySelector(
    ".recall-brand-wrap"
  );

const recallItems =
  [
    ...document
      .querySelectorAll(
        ".recall-item"
      )
  ];

const recallCopy =
  document.querySelector(
    ".recall-copy"
  );

const recallCopyKicker =
  document.querySelector(
    ".recall-copy-kicker"
  );

const recallDigits = {

  "0":
    document
      .querySelector(
        ".recall-digit-0"
      ),

  "8":
    document
      .querySelector(
        ".recall-digit-8"
      ),

  "5":
    document
      .querySelector(
        ".recall-digit-5"
      )
};

/* TEXTO PADRÃO */

const defaultRecallCopy =
  recallCopy
    ?.dataset
    .defaultCopy ||

  "Da ideia ao último detalhe, tudo faz parte do mesmo movimento.";


/* TITULO PADRÃO */

const defaultRecallKicker =
  "085 / EM MOVIMENTO";


/* TÍTULOS DINÂMICOS */

const recallKickers = {

  "0":
    "085 / FILME",

  "8":
    "085 / FOTOGRAFIA",

  "5":
    "085 / CAMPANHA"
};


let recallCopyTween =
  null;


/* -------------------------
   ALTERAÇÃO DE COPY
------------------------- */

function setRecallCopy(
  text,
  kicker =
    defaultRecallKicker
) {

  if (
    !recallCopy
  ) {
    return;
  }

  recallCopyTween
    ?.kill();


  const copyTimeline =
    gsap.timeline();


  copyTimeline

    .to(
      recallCopy,
      {
        opacity:
          0,

        y:
          9,

        duration:
          0.16,

        ease:
          "power2.in"
      }
    )

    .add(
      () => {

        recallCopy
          .textContent =
            text;

        if (
          recallCopyKicker
        ) {

          recallCopyKicker
            .textContent =
              kicker;
        }
      }
    )

    .fromTo(
      recallCopy,

      {
        opacity:
          0,

        y:
          9
      },

      {
        opacity:
          1,

        y:
          0,

        duration:
          0.34,

        ease:
          "power3.out"
      }
    );


  recallCopyTween =
    copyTimeline;
}


/* -------------------------
   ATIVAR ITEM
------------------------- */

function activateRecall(
  item
) {

  if (
    !item ||
    !recallSection ||
    !recallBrand
  ) {
    return;
  }


  const key =
    item
      .dataset
      .recall;


  const copy =
    item
      .dataset
      .copy ||
    defaultRecallCopy;


  recallSection
    .classList
    .add(
      "has-active-item"
    );


  recallItems
    .forEach(
      (button) => {

        button
          .classList
          .toggle(
            "is-active",
            button ===
              item
          );
      }
    );


  /* LIMPA ESTADOS */

  recallBrand
    .classList
    .remove(
      "is-active-0",
      "is-active-8",
      "is-active-5"
    );


  /* DEFINE ATIVO */

  recallBrand
    .classList
    .add(
      `is-active-${key}`
    );


  /* ANIMAÇÃO DOS NÚMEROS */

  Object
    .entries(
      recallDigits
    )
    .forEach(
      (
        [
          digitKey,
          digit
        ]
      ) => {

        if (
          !digit
        ) {
          return;
        }


        if (
          digitKey ===
          key
        ) {

          gsap.to(
            digit,
            {
              scale:
                1.1,

              y:
                -7,

              rotateZ:
                digitKey === "0"
                  ? -1.2

                  : digitKey === "5"
                  ? 1.2

                  : 0,

              duration:
                0.46,

              ease:
                "power3.out",

              overwrite:
                true
            }
          );

        } else {

          gsap.to(
            digit,
            {
              scale:
                0.94,

              y:
                3,

              rotateZ:
                0,

              duration:
                0.46,

              ease:
                "power3.out",

              overwrite:
                true
            }
          );
        }
      }
    );


  /* ATUALIZA TEXTO */

  setRecallCopy(
    copy,
    recallKickers[key] ||
    defaultRecallKicker
  );
}


/* -------------------------
   RESET
------------------------- */

function resetRecall() {

  if (
    !recallSection ||
    !recallBrand
  ) {
    return;
  }


  recallSection
    .classList
    .remove(
      "has-active-item"
    );


  recallItems
    .forEach(
      (button) => {

        button
          .classList
          .remove(
            "is-active"
          );
      }
    );


  recallBrand
    .classList
    .remove(
      "is-active-0",
      "is-active-8",
      "is-active-5"
    );


  Object
    .values(
      recallDigits
    )
    .forEach(
      (digit) => {

        if (
          !digit
        ) {
          return;
        }

        gsap.to(
          digit,
          {
            scale:
              1,

            y:
              0,

            rotateZ:
              0,

            duration:
              0.5,

            ease:
              "power3.out",

            overwrite:
              true
          }
        );
      }
    );


  setRecallCopy(
    defaultRecallCopy,
    defaultRecallKicker
  );
}


/* -------------------------
   EVENTOS DE HOVER
------------------------- */

recallItems
  .forEach(
    (item) => {

      item
        .addEventListener(
          "mouseenter",
          () => {

            activateRecall(
              item
            );
          }
        );


      item
        .addEventListener(
          "focus",
          () => {

            activateRecall(
              item
            );
          }
        );
    }
  );


const recallItemsContainer =
  document.querySelector(
    ".recall-items"
  );


recallItemsContainer
  ?.addEventListener(
    "mouseleave",
    () => {

      resetRecall();
    }
  );


recallItemsContainer
  ?.addEventListener(
    "focusout",
    (event) => {

      const nextFocused =
        event
          .relatedTarget;

      if (
        !nextFocused ||
        !recallItemsContainer
          .contains(
            nextFocused
          )
      ) {

        resetRecall();
      }
    }
  );


/* -------------------------
   PARALLAX SUTIL NO 085
------------------------- */

if (
  recallBrandWrap &&
  recallBrand &&
  window
    .matchMedia(
      "(pointer: fine)"
    )
    .matches
) {

  recallBrandWrap
    .addEventListener(
      "mousemove",
      (event) => {

        const rect =
          recallBrandWrap
            .getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          0.5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          0.5;


        gsap.to(
          recallBrand,
          {
            x:
              x *
              13,

            y:
              y *
              8,

            rotateY:
              x *
              4,

            rotateX:
              -y *
              3,

            duration:
              0.55,

            ease:
              "power2.out",

            overwrite:
              "auto"
          }
        );
      }
    );


  recallBrandWrap
    .addEventListener(
      "mouseleave",
      () => {

        gsap.to(
          recallBrand,
          {
            x:
              0,

            y:
              0,

            rotateX:
              0,

            rotateY:
              0,

            duration:
              0.7,

            ease:
              "power3.out",

            overwrite:
              "auto"
          }
        );
      }
    );
}


/* -------------------------
   ENTRADA DA SEÇÃO
------------------------- */

gsap.from(
  ".recall-brand",
  {
    y:
      55,

    opacity:
      0,

    duration:
      0.9,

    ease:
      "power4.out",

    scrollTrigger: {

      trigger:
        ".recall-085",

      start:
        "top 78%",

      once:
        true
    }
  }
);


gsap.from(
  ".recall-item",
  {
    x:
      34,

    opacity:
      0,

    duration:
      0.65,

    stagger:
      0.08,

    ease:
      "power3.out",

    scrollTrigger: {

      trigger:
        ".recall-085",

      start:
        "top 75%",

      once:
        true
    }
  }
);


gsap.from(
  ".recall-copy-wrap",
  {
    y:
      22,

    opacity:
      0,

    duration:
      0.7,

    ease:
      "power3.out",

    scrollTrigger: {

      trigger:
        ".recall-085",

      start:
        "top 72%",

      once:
        true
    }
  }
);


/* -------------------------
   REFRESH
------------------------- */

setTimeout(
  () => {

    ScrollTrigger
      .refresh();

  },
  1500
);