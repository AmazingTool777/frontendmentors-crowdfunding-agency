/**
 * The function signature of a callback that is called during a phase of an element such as the toggle and the menu
 * @callback ElementPhaseCallback
 * @param {HTMLElement} element The element as a DOM element
 */

/**
 * Toggle phase callback elements arguments
 * @typedef {Object} TogglePhaseElements
 * @property {HTMLElement} activator The toggle DOM element
 * @property {HTMLElement} menu The menu DOM element
 */

/**
 * Toggle phase callback
 * @callback TogglePhaseCallback
 * @param {TogglePhaseElements} elements The elements manipulated in a toggle phase
 */

/**
 * The options for a navbar menu
 * @typedef {Object} NavbarMenuOptions
 * @property {string} menuId The id of the navbar menu
 * @property {string|undefined} dataAttribute The name of of the HTML attribute on the toggle that holds the id of the target menu
 * @property {boolean|undefined} defaultOpen Whether the menu should be open by default or not
 * @property {boolean|undefined} animated Whether the menu should be animated or not during a toggle phase
 * @property {number|undefined} desktopBreakpoint The desktop viewport in px beyond which the menu should always remain open
 * @property {TogglePhaseCallback} onOpen When the menu gets open
 * @property {TogglePhaseCallback} onClose When the menu gets closed
 */

/**
 * Main: Sets up a navbar menu
 * 
 * @param {NavbarMenuOptions} options The navbar menu options
 */
export function setupNavbarMenu(options) {
  const dataAttr = options?.dataAttribute ?? "data-navbar-menu-toggle-target";

  const activator = document.querySelector(`[${dataAttr}="${options.menuId}"]`);
  const menu = document.getElementById(options.menuId);

  let isOpen  = false;

  /**
   * Toggles the menu
   * 
   * @param {boolean|undefined} toOpen The next open state of the menu. If not specified, the next open state is the negation of the current open state.
   */
  function toggle(toOpen) {
    const _toOpen = toOpen ?? !isOpen;
    if (_toOpen) {
      options.onOpen({ menu, activator });
      if (options.animated) {
        menu.classList.add("enter", "enter-from");
        setTimeout(() => {
          menu.classList.add("enter-to");
        }, 0);
      }
    } else {
      if (options.animated) {
        menu.classList.remove("enter-to");
        menu.classList.add("leave", "leave-from");
        setTimeout(() => {
          menu.classList.add("leave-to");
        }, 0);
      } else {
        options.onClose({ menu, activator });
      }
    }
    menu.setAttribute("aria-hidden", !_toOpen);
    isOpen = _toOpen;
  }

  if (options.animated) {
    menu.addEventListener("transitionend", () => {
      if (menu.classList.contains("leave")) {
        options.onClose({ menu, activator });
        menu.classList.remove("leave", "leave-from", "leave-to");
      } else if (menu.classList.contains("enter")) {
        menu.classList.remove("enter", "enter-from");
      }
    });
  }

  if (options.defaultOpen) {
    toggle(true);
  }

  activator.addEventListener("click", () => {
    toggle();
  });

  if (options.desktopBreakpoint) {
    window.addEventListener("resize", () => {
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (screenWidth >= options.desktopBreakpoint) {
        if (isOpen) {
          toggle(false);
          menu.setAttribute("aria-hidden", false);
        }
        activator.setAttribute("aria-hidden", true);
      } else {
        menu.setAttribute("aria-hidden", !isOpen);
        activator.setAttribute("aria-hidden", false);
      }
    });
  }

  return {
    toggle,
    open: () => toggle(true),
    close: () => toggle(false),
  }
}