gsap.registerPlugin(ScrollTrigger);


//Lenis
const lenis = new Lenis({
  duration: 3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
  autoRaf: false
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)



// On Scrolling move card right (_SECTION 2)
const cards = document.querySelector(".cards");
const totalScroll = cards.scrollWidth - window.innerWidth;

gsap.to(cards, {
  x: -totalScroll,
  scale: 0.9,
  ease: "none",
  scrollTrigger: {
    trigger: ".section-2",
    start: "top 90%",
    end: "bottom center",
    scrub: true,
  }
});

// SECTION-3
const pincards = gsap.utils.toArray(".cardok");
const lastCard = pincards[pincards.length - 1];

pincards.forEach((cardok, index) => {
  // scale animation
  gsap.to(cardok, {
    scale: () => 1 - (pincards.length - index) * 0.025,
    ease: "none",
    scrollTrigger: {
      trigger: cardok,
      start: "top bottom-=100",
      end: "top top+=40",
      scrub: true,
      invalidateOnRefresh: true,
    }
  });

  // pinning logic - end when last card reaches top
  ScrollTrigger.create({
    trigger: cardok,
    start: "top top",
    endTrigger: lastCard,
    end: "top top",
    pin: true,
    pinSpacing: false,
    id: "pin",
    invalidateOnRefresh: true
  });
});

//    // ✅ Split text into characters only once
function splitToChars(el) {
  if (!el || el.dataset.split === "true") return;
  const text = el.textContent.trim();
  el.textContent = "";
  [...text].forEach(ch => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(span);
  });
  el.dataset.split = "true";
}

function initServiceTextAnimations() {
  document.querySelectorAll(".text-animate-smooth").forEach(heading => {
    splitToChars(heading);
    const chars = heading.querySelectorAll(".char");

    // Create individual scroll trigger for each heading
    gsap.fromTo(
      chars,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse", // ✅ play and reverse each time
          markers: false
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", initServiceTextAnimations);
window.addEventListener("resize", () => ScrollTrigger.refresh());



// CONATCT
function initTextAnimation() {
  const text_anim_container = document.querySelector(".text-anim-container");
  if (!text_anim_container) return;

  const text_anim_lines = text_anim_container.querySelectorAll(".text-up-rotate");

  // ✅ Kill only triggers related to this section (not all)
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger === text_anim_container) trigger.kill();
  });

  // ✅ Create the text animation
  gsap.fromTo(
    text_anim_lines,
    {
      rotationX: -100,
      opacity: 0,
      transformOrigin: "50% 50% -50px",
    },
    {
      rotationX: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: text_anim_container,
        start: "top 60%",
        end: "bottom 20%",
        toggleActions: "play none none reverse", // plays again on scroll up/down
        markers: false,
      },
    }
  );
}

document.addEventListener("DOMContentLoaded", initTextAnimation);

// ✅ Only refresh ScrollTrigger layout, don't re-init
window.addEventListener("resize", () => ScrollTrigger.refresh());



// SECTION-5
gsap.registerPlugin(ScrollTrigger);
// PANEL Z-ORDER
gsap.set(".section5 .panel", { zIndex: (i, t, arr) => arr.length - i });
let images = gsap.utils.toArray(".section5 .panel:not(.purple)");

// PANEL IMAGE REVEAL SCROLL
images.forEach((img, i) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section5-panels",
      start: () => "top -" + (window.innerHeight * (i + 1)),
      end: () => "+=" + window.innerHeight,
      scrub: true,
      invalidateOnRefresh: true,
    }
  }).to(img, { height: 0 });
});

// TEXT STACK ANIMATION
gsap.set(".section5 .panel-text", {
  zIndex: (i, t, arr) => arr.length - i,
  opacity: 0,
  filter: "blur(12px)",
  y: 80
});

let texts = gsap.utils.toArray(".section5 .panel-text");

texts.forEach((txt, i) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section5-panels",
      start: () => "top -" + (window.innerHeight * i),
      end: () => "+=" + window.innerHeight,
      scrub: true,
      invalidateOnRefresh: true
    }
  })
    .to(txt, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      ease: "power2.out",
      duration: 0.4
    })
    .to(txt, {
      opacity: 0,
      filter: "blur(10px)",
      y: -60,
      duration: 0.5,
      ease: "power2.in",
    }, 0.85);
});

// PIN MAIN PANEL SECTION
ScrollTrigger.create({
  trigger: ".section5-panels",
  start: "top top",
  end: () => "+=" + ((images.length + 1) * window.innerHeight),
  pin: true,
  scrub: true,
  invalidateOnRefresh: true,
});

// Ensure heading and p default style (no animation)
gsap.set(".section5 .panel-text h3, .section5 .panel-text p", {
  opacity: 1,
  filter: "blur(0px)",
  y: 0
});
ScrollTrigger.refresh();


// SECTION 4  (entry)
gsap.fromTo(".section-4 .card",
  {
    opacity: 0,
    y: 80,
    scale: 0.8
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".section-4",
      start: "top 40%",
      end: "top 20%",
      toggleActions: "play none none reverse"
    }
  }
);
ScrollTrigger.refresh();


// EXIT TIMELINE
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-4",
    start: "top top",
    end: "bottom top",
    scrub: true,
  }
});

// LinkedIn: move up + fade
tl.to(".linkedin-card", {
  y: -200,
  opacity: 0,
  ease: "none"
}, 0);

// Facebook: move right + fade
tl.to(".facebook-card", {
  x: 200,
  opacity: 0,
  ease: "none"
}, 0);

// Instagram: scale down + fade
tl.to(".instagram-card", {
  scale: 0,
  opacity: 0,
  ease: "none"
}, 0);

// Twitter: rotate + fly up + fade
tl.to(".twitter-card", {
  y: -200,
  rotate: 20,
  opacity: 0,
  ease: "none"
}, 0);

// Whatsapp: slide left + fade
tl.to(".whatsapp-card", {
  x: -200,
  opacity: 0,   // ✅ fix here
  ease: "none"
}, 0);

// YouTube: zoom big then vanish
tl.to(".youtube-card", {
  scale: 1.5,
  opacity: 0,   // ✅ fix here
  ease: "none"
}, 0);

ScrollTrigger.refresh();


// SECTION 6 (HORIZONTAL SCROLL)
 const section6Wrapper = document.querySelector(".section6-wrapper");
const section6TotalScroll = section6Wrapper.scrollWidth - window.innerWidth;

gsap.to(section6Wrapper, {
  x: () => `-${section6TotalScroll}`,
  ease: "none",
  scrollTrigger: {
    trigger: ".section6-horizontal",
    start: "top top",
    end: () => "+=" + section6TotalScroll,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  }
});
ScrollTrigger.refresh();
