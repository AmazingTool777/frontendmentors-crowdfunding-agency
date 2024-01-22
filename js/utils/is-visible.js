/**
 * Checks whether an HTML element is visible on the screen or not
 * @param {HTMLElement} element The HTML element
 */
export function elementIsVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
