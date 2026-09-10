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

  tl.to(".hero-title .line > span", {
    y: 0,
    duration: 0.95,
    ease: "power4.out",
    stagger: 0.11
  })
  .from(".hero .reveal-up", {
    y: 26,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.08
  }, "-=.55")
  .from(".hero-code-label", {
    y: 14,
    opacity: 0,
    duration: .55,
    ease: "power3.out"
  }, "-=.45");
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
   HERO — CÓDIGO 085
------------------------- */

const heroVisual =
  document.querySelector(".hero-085-code");

const heroDigits =
  [...document.querySelectorAll(".hero-digit")];

if (heroVisual && heroDigits.length) {

  heroVisual.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        heroVisual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      heroDigits.forEach(
        (digit, index) => {

          const depth =
            (index - 1) * 6;

          gsap.to(digit, {
            x:
              x *
              (14 + Math.abs(depth)),

            y:
              y * 12,

            rotateY:
              x *
              (index === 1
                ? -7
                : 7),

            rotateX:
              -y * 5,

            duration:
              0.6,

            ease:
              "power2.out"
          });

          const digitNumber =
            digit.querySelector(
              ".digit-number"
            );

          if (digitNumber) {

            gsap.to(
              digitNumber,
              {
                x:
                  x *
                  (index === 1
                    ? 8
                    : 14),

                duration:
                  0.6,

                ease:
                  "power2.out"
              }
            );
          }
        }
      );
    }
  );

  heroVisual.addEventListener(
    "mouseleave",
    () => {

      gsap.to(heroDigits, {
        x: 0,
        y: 0,

        rotateX: 0,
        rotateY: 0,

        duration: 0.75,

        ease:
          "power3.out"
      });

      gsap.to(
        ".digit-number",
        {
          x: 0,

          duration:
            0.75,

          ease:
            "power3.out"
        }
      );
    }
  );
}

/* Entrada dos números do hero */

gsap.from(".hero-digit", {
  y: 75,
  opacity: 0,
  rotateX: 18,

  duration:
    1.05,

  ease:
    "power4.out",

  stagger:
    0.1,

  delay:
    1.25
});

/* Linha inferior */

gsap.to(
  ".hero-code-line span",
  {
    scaleX: 1.8,

    scrollTrigger: {
      trigger:
        ".hero",

      start:
        "top top",

      end:
        "bottom top",

      scrub:
        1
    }
  }
);

/* Movimento individual */

gsap.to(
  ".hero-digit-0",
  {
    yPercent: -13,

    scrollTrigger: {
      trigger:
        ".hero",

      start:
        "top top",

      end:
        "bottom top",

      scrub:
        1
    }
  }
);

gsap.to(
  ".hero-digit-8",
  {
    yPercent: -24,

    scrollTrigger: {
      trigger:
        ".hero",

      start:
        "top top",

      end:
        "bottom top",

      scrub:
        1
    }
  }
);

gsap.to(
  ".hero-digit-5",
  {
    yPercent: -36,

    scrollTrigger: {
      trigger:
        ".hero",

      start:
        "top top",

      end:
        "bottom top",

      scrub:
        1
    }
  }
);

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

/* -------------------------
   SWIPER — FOTO
------------------------- */

new Swiper(
  ".photo-swiper",
  {
    slidesPerView:
      "auto",

    spaceBetween:
      14,

    speed:
      800,

    grabCursor:
      true,

    navigation: {

      nextEl:
        ".photo-next",

      prevEl:
        ".photo-prev"
    }
  }
);

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
   SERVICE PREVIEW
------------------------- */

const serviceList =
  document.querySelector(
    ".service-list"
  );

const servicePreview =
  document.querySelector(
    ".service-preview"
  );

if (
  serviceList &&
  servicePreview &&
  window
    .matchMedia(
      "(pointer: fine)"
    )
    .matches
) {

  serviceList
    .addEventListener(
      "mousemove",
      (event) => {

        gsap.to(
          servicePreview,
          {
            left:
              event.clientX +
              18,

            top:
              event.clientY +
              18,

            duration:
              .18,

            ease:
              "power2.out"
          }
        );
      }
    );

  document
    .querySelectorAll(
      ".service-item"
    )
    .forEach(
      (item) => {

        item
          .addEventListener(
            "mouseenter",
            () => {

              servicePreview
                .classList
                .add(
                  "is-visible"
                );

              const label =
                item.dataset
                  .service ||
                "085";

              const span =
                servicePreview
                  .querySelector(
                    "span"
                  );

              if (!span) {
                return;
              }

              span.textContent =

                label ===
                "motion"
                  ? "3D"

                : label ===
                  "photo"
                  ? "FOTO"

                : label ===
                  "film"
                  ? "FILME"

                : label ===
                  "campaign"
                  ? "AD"

                : label ===
                  "creative"
                  ? "IDEIA"

                  : "PÓS";
            }
          );

        item
          .addEventListener(
            "mouseleave",
            () => {

              servicePreview
                .classList
                .remove(
                  "is-visible"
                );
            }
          );
      }
    );
}

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
    ".showreel-play, .project-play"
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

  /*
    ENTRADA
    O 085 aparece como
    um único código.
  */

  signatureTl

    .fromTo(
      ".signature-digits",

      {
        scale:
          0.86,

        rotateX:
          7
      },

      {
        scale:
          1,

        rotateX:
          0,

        duration:
          0.18,

        ease:
          "none"
      }
    )

    .to(
      ".signature-progress b",

      {
        scaleX:
          0.34,

        duration:
          0.18,

        ease:
          "none"
      },

      0
    )

    /*
      OS NÚMEROS COMEÇAM
      A GANHAR
      INDEPENDÊNCIA
    */

    .to(
      ".sig-0",

      {
        xPercent:
          -13,

        rotateY:
          -8,

        rotateZ:
          -1.3,

        duration:
          0.22,

        ease:
          "none"
      }
    )

    .to(
      ".sig-8",

      {
        yPercent:
          -7,

        scale:
          1.05,

        duration:
          0.22,

        ease:
          "none"
      },

      "<"
    )

    .to(
      ".sig-5",

      {
        xPercent:
          13,

        rotateY:
          8,

        rotateZ:
          1.3,

        duration:
          0.22,

        ease:
          "none"
      },

      "<"
    )

    .to(
      ".signature-progress b",

      {
        scaleX:
          0.62,

        duration:
          0.22,

        ease:
          "none"
      },

      "<"
    )

    /*
      CONCEITO
      PRODUÇÃO
      ENTREGA
      SAEM
    */

    .to(
      ".sig-label-process",

      {
        opacity:
          0,

        y:
          -18,

        duration:
          0.16,

        stagger:
          0.02,

        ease:
          "none"
      }
    )

    /*
      FILME
      FOTO
      CAMPANHA
      ENTRAM
    */

    .to(
      ".sig-label-output",

      {
        opacity:
          1,

        y:
          0,

        duration:
          0.18,

        stagger:
          0.025,

        ease:
          "none"
      },

      "<+.03"
    )

    .to(
      ".signature-word-start",

      {
        opacity:
          0,

        y:
          -8,

        duration:
          0.12,

        ease:
          "none"
      },

      "<"
    )

    .to(
      ".signature-word-end",

      {
        opacity:
          1,

        y:
          0,

        duration:
          0.12,

        ease:
          "none"
      },

      "<"
    )

    .to(
      ".signature-progress b",

      {
        scaleX:
          1,

        duration:
          0.18,

        ease:
          "none"
      },

      "<"
    )

    /*
      FECHAMENTO
    */

    .to(
      ".sig-number",

      {
        scale:
          0.93,

        duration:
          0.15,

        stagger:
          0.01,

        ease:
          "none"
      }
    )

    .to(
      ".signature-center-mark",

      {
        opacity:
          0.075,

        duration:
          0.15,

        ease:
          "none"
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