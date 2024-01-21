import { renderBookmarkButton } from "./bookmark.js";
import { setupNavbarMenu } from "./components/navbar-menu.js";
import { setupOverlay } from "./components/overlay.js";
import { setupBackProjectModal } from "./back-project-modal.js";

// Navbar menu overlay
const overlay = setupOverlay({
  element: () => {
    const element = document.createElement("div");
    element.classList.add("navbar-menu-overlay");
    return element;
  },
  onClick() {
    navbarMenu.close();
  },
});
// Navbar menu
const navbarMenu = setupNavbarMenu({
  menuId: "navbar-menu",
  desktopBreakpoint: 1024,
  onOpen({ menu, activator }) {
    overlay.show();
    menu.classList.remove("hide-mobile");
    const title = "Close the navigation menu";
    activator.setAttribute("title", title);
    activator.setAttribute("aria-label", title);
    const [img] = activator.children;
    img.setAttribute("src", "assets/img/icon-close-menu.svg");
    img.setAttribute("alt", "Close");
  },
  onClose({ menu, activator }) {
    overlay.hide();
    menu.classList.add("hide-mobile");
    const title = "Open the navigation menu";
    activator.setAttribute("title", title);
    activator.setAttribute("aria-label", title);
    const [img] = activator.children;
    img.setAttribute("src", "assets/img/icon-hamburger.svg");
    img.setAttribute("alt", "Hamburger menu");
  },
  animated: true,
});

// Bookmark button rendering
renderBookmarkButton();

// Setup of `back this project` modal
setupBackProjectModal();
