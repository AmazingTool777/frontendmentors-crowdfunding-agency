import { elementIsVisible } from "../utils/is-visible.js";

/**
 * @callback AnimationPhaseFn
 * @argument {HTMLElement} element The HTML element being animated
 */

/**
 * Options for a basic animation
 * @typedef BasicAnimationOptions
 * @property {AnimationPhaseFn} from The callback that sets the initial state of the animated HTML elements
 * @property {AnimationPhaseFn} to The callback that sets the final state of the animated HTML elements
 * @property {number|undefined} duration The duration of the animation. It translates to the transition duration in ms
 * @property {IntersectionObserverInit|undefined} observerOptions The options for the intersection observer
 * @property {boolean} reverse Whether the animation should be reversed when the animated element leaves the screen
 */

/**
 * Animation on (an) element(s) using the `IntersectionObserver` API
 * @param {HTMLElement|HTMLElement[]|NodeList|HTMLCollection} elements The HTML element(s) to animate
 * @param {BasicAnimationOptions} options The animation options
 */
export function animate(elements, options) {
  const { from, to, duration = 400, observerOptions, reverse = false } = options;

  let elts =
    Array.isArray(elements) || elements instanceof HTMLCollection || elements instanceof NodeList
      ? elements
      : [elements];

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        to(entry.target);
      } else if (reverse) {
        from(entry.target);
      }
    }
  }, observerOptions);

  for (const elt of elts) {
    from(elt);
    elt.style.transition = `${duration}ms`;
    if (elementIsVisible(elt)) {
      setTimeout(() => {
        to(elt);
      }, 0);
    }
    observer.observe(elt);
  }
}
