import { animateCounter } from "./animations/counter.js";
import { elementIsVisible } from "./utils/is-visible.js";

/**
 * Setup of the stats numbers animation
 */
export function setupStatsNumbersAnimation() {
  const backedAmount = document.getElementById("highlight-backed-amount");
  const backersCount = document.getElementById("highlight-backers-count");

  let wasAnimated = {
    backedAmount: false,
    backersCount: false,
  };

  const DURATION = 1500;

  const numberFormatter = new Intl.NumberFormat("eng-US");

  function animateBackedAmount() {
    animateCounter({
      targetCount: 89_914,
      duration: DURATION,
      updateFn: (count) => {
        backedAmount.innerHTML = "$" + numberFormatter.format(count);
      },
    });
    wasAnimated.backedAmount = true;
  }

  function animateBackersCount() {
    animateCounter({
      targetCount: 5_007,
      duration: DURATION,
      updateFn: (count) => {
        backersCount.innerHTML = numberFormatter.format(count);
      },
    });
    wasAnimated.backersCount = true;
  }

  if (elementIsVisible(backedAmount)) {
    animateBackedAmount();
  }

  if (elementIsVisible(backersCount)) {
    animateBackersCount();
  }

  const backedAmountObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && !wasAnimated.backedAmount) {
        animateBackedAmount();
      }
    }
  });
  backedAmountObserver.observe(backedAmount);

  const backersCountObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && !wasAnimated.backersCount) {
        animateBackersCount();
      }
    }
  });
  backersCountObserver.observe(backersCount);
}
