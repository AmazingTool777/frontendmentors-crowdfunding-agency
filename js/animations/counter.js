/**
 * Update function of the UI after each frame
 * @callback UpdateUIFn
 * @argument {number} count The current count at the frame
 */

/**
 * @typedef CounterAnimationArguments
 * @property {number|undefined} startCount The start value of the count animation
 * @property {number} targetCount The final count
 * @property {number} duration The duration
 * @property {UpdateUIFn} updateFn A callback where we should update the UI
 */

/**
 * Sets up an animation counter
 *
 * @param {CounterAnimationArguments} args The arguments
 */
export function animateCounter(args) {
  const { startCount = 0, targetCount, duration, updateFn } = args;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentCount = Math.floor(progress * (targetCount - startCount) + startCount);

    updateFn(currentCount);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}
