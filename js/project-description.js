/**
 * Setup of the project description content
 */
export function setupProjectDescription() {
  const twistElt = document.getElementById("project-description-twist");

  function setProjectDescription() {
    const twist = window.innerWidth >= 768 ? "beautiful &" : "beautifully";
    twistElt.innerText = twist;
  }

  setProjectDescription();

  window.addEventListener("resize", setProjectDescription);
}
