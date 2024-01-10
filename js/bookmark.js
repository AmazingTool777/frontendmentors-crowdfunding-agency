import { BOOKMARK_TOGGLE, store } from "./redux/store.js";

export function renderBookmarkButton() {
  const bookmarkBtn = document.getElementById("bookmark-btn");

  bookmarkBtn.addEventListener("click", () => {
    store.dispatch({
      type: BOOKMARK_TOGGLE,
    });
  });

  store.subscribe(() => {
    const state = store.getState();
    const modifierClass = "bookmark-btn--marked";
    if (state.isBookmarked) {
      bookmarkBtn.setAttribute("aria-label", "Remove from bookmarks");
      bookmarkBtn.classList.add(modifierClass);
    } else {
      bookmarkBtn.setAttribute("aria-label", "Bookmark");
      bookmarkBtn.classList.remove(modifierClass);
    }
  });
}
