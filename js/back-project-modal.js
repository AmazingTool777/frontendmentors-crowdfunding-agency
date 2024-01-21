import { store, PLEDGE_SELECTED, PLEDGE_ENTERED, FEEDBACK_CLOSED } from "./redux/store.js";

/**
 * Setup of the pledges modal UI
 */
export function setupBackProjectModal() {
  const backProjectBtn = document.getElementById("back-project-btn");
  const backProjectModal = document.getElementById("back-project-modal");
  const pledgeForm = document.getElementById("modal-pledge-form");

  function showBackProjectModal() {
    backProjectModal.showModal();
    document.body.style.overflow = "hidden";
  }

  function closeBackProjectModal() {
    backProjectModal.close();
    document.body.style.overflow = "auto";
    store.dispatch({
      type: PLEDGE_SELECTED,
      payload: null,
    });
    pledgeForm.reset();
  }

  backProjectBtn.addEventListener("click", showBackProjectModal);
  backProjectModal.addEventListener("close", closeBackProjectModal);

  const feedbackModal = document.getElementById("feedback-modal");

  function handleFeedbackModalClose() {
    store.dispatch({
      type: FEEDBACK_CLOSED,
    });
  }

  feedbackModal.addEventListener("close", handleFeedbackModalClose);

  const backedAmountHighlight = document.getElementById("highlight-backed-amount");
  const pledgesQuantityHighlight = document.getElementById("highlight-backers-count");
  const backingProgress = document.querySelector("[data-backing-progress]");
  const backingProgressInner = document.querySelector("[data-backing-progress] > div");

  // Render of the stats data on state changes
  store.subscribe(() => {
    const state = store.getState();
    const formatter = new Intl.NumberFormat("en-US");
    backedAmountHighlight.innerText = "$" + formatter.format(state.backedAmount);
    pledgesQuantityHighlight.innerText = formatter.format(state.backersCount);
    const progress = state.backedAmount / 1000;
    backingProgress.setAttribute("data-backing-progress", progress);
    backingProgress.setAttribute("aria-value-now", progress);
    backingProgressInner.style.width = `${progress}%`;
  });

  // Setup and Render of the pledges data and UI
  for (const pledge of store.getState().pledges) {
    const id = `modal-${pledge.id}-pledge`;
    const modalPledgeItem = document.getElementById(id);
    const radioId = `${pledge.id}-pledge`;
    const modalPledgeRadio = document.getElementById(radioId);

    function handlePledgeRadioChecked() {
      store.dispatch({
        type: PLEDGE_SELECTED,
        payload: this.value,
      });
    }

    modalPledgeRadio.addEventListener("change", handlePledgeRadioChecked);

    const inputId = `${pledge.id}-pledge-amount`;
    const modalPledgeAmountInput = document.getElementById(inputId);
    const selectRewardBtn = document.querySelector(`[data-pledge-id=${pledge.id}]`);

    function handlePledgeSelected() {
      showBackProjectModal();
      store.dispatch({
        type: PLEDGE_SELECTED,
        payload: pledge.id,
      });
    }

    selectRewardBtn?.addEventListener("click", handlePledgeSelected);

    const modalPledgeAmountSection = document.querySelector(`[data-modal-pledge-amount-enter="${inputId}"]`);
    const modalPledgeAmountBtn = document.querySelector(`[data-modal-pledge-amount-submit="${pledge.id}"]`);
    const pledgeQuantityElts = document.querySelectorAll(`[data-pledge-quantity="${pledge.id}"]`);

    function hidePledgeEnterSection() {
      modalPledgeItem?.classList?.remove("modal-pledge--selected");
      modalPledgeAmountSection?.setAttribute("aria-hidden", true);
    }

    store.subscribe(() => {
      const state = store.getState();
      const { selectedPledgeId } = state;
      if (pledge.id === selectedPledgeId) {
        modalPledgeRadio.click();
        modalPledgeItem?.classList?.add("modal-pledge--selected");
        modalPledgeAmountSection.setAttribute("aria-hidden", false);
        modalPledgeItem.scrollIntoView();
        modalPledgeAmountInput.focus();
      } else {
        hidePledgeEnterSection();
      }
      const _pledge = state.pledges.find(({ id }) => pledge.id === id);
      if (_pledge && _pledge.minAmount > 0 && _pledge.leftCount <= 0) {
        modalPledgeAmountSection?.remove();
        modalPledgeItem?.classList?.remove("modal-pledge--selected");
        modalPledgeItem?.classList?.add("modal-pledge--out-of-stock");
        if (selectRewardBtn) {
          selectRewardBtn.innerHTML = "Out of stock";
          selectRewardBtn.disabled = true;
        }
      }
      for (const elt of pledgeQuantityElts) {
        elt.innerHTML = _pledge.leftCount;
      }
    });

    function handlePledgeEntered(e) {
      e.preventDefault();
      store.dispatch({
        type: PLEDGE_ENTERED,
        payload: {
          pledgeId: pledge.id,
          amount: parseInt(modalPledgeAmountInput.value),
        },
      });
      hidePledgeEnterSection();
      pledgeForm.reset();
      backProjectModal.close();
      setTimeout(() => {
        const state = store.getState();
        if (state.thereIsFeedback && !backProjectModal.getAttribute("open")) {
          feedbackModal.showModal();
        }
      }, 400);
    }

    modalPledgeAmountBtn?.addEventListener("click", handlePledgeEntered);
  }
}
