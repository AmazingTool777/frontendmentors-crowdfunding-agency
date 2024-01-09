/**
 * Event listener of the overlay
 * @callback EventListener
 * @param {Event} event The event object
 */

/**
 * A function that creates an HTML element
 * @callback ElementFactory
 * @returns {HTMLElement}
 */

/**
 * The options of the overlay setup
 * @typedef OverlaySetupOptions
 * @property {HTMLElement|ElementFactory} element The overlay's HTML DOM element
 * @property {boolean|undefined} noScroll Whether to allow the body to scrollable or not when the overlay is shown
 * @property {EventListener|undefined} onClick Click event listener
 */

/**
 * Sets an overlay
 * 
 * @param {OverlaySetupOptions} options The options
 */
export function setupOverlay(options) {
  let show = false;

  const element = typeof options.element === "function" ? options.element() : options.element;

  const noScroll = options.noScroll ?? true;

  /**
   * Toggles the show state of the overlay
   * 
   * @param {boolean|undefined} show The next show state of the overlay. If not specified, the next show state is the negation of the current show state.
   */
  function toggle(toShow) {
    const _toShow = toShow ?? !show;
    if (_toShow) {
      if (noScroll) {
        document.body.style.overflowY = "hidden";
      }
      const firstScript = document.querySelector("body > script");
      if (firstScript) {
        document.body.insertBefore(element, firstScript);
      } else {
        document.body.appendChild(element);
      }
    } else {
      element.remove();
      if (noScroll) {
        document.body.style.overflowY = "auto";
      }
    }
    show = _toShow;
  }

  element.addEventListener("click", (e) => {
    options.onClick && options.onClick(e);
  });

  return {
    toggle,
    show: () => toggle(true),
    hide: () => toggle(false),
  }
}