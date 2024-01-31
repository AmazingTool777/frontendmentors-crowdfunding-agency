import { animate } from "./animations/intersectionobserver-based-animations.js";

/**
 * Setup of the animation of the pledges articles
 */
export function setupPledgesAnimation() {
  const pledges = document.querySelectorAll("[data-pledge-article]");

  animate(pledges, {
    from(element) {
      element.style.transform = "translateX(50%) skew(-20deg)";
      element.style.opacity = "0";
    },
    to(element) {
      element.style.transform = "translateX(0) skew(0deg)";
      element.style.opacity = element.classList.contains("pledge-card--out-of-stock") ? "0.5" : "1";
    },
    observerOptions: {
      threshold: 0.5,
    },
    duration: 300,
  });
}
