import * as Redux from "../lib/redux.js";

export const BOOKMARK_TOGGLE = "BOOKMARK_TOGGLE";
export const PLEDGE_SELECTED = "PLEDGE_SELECTED";
export const PLEDGE_ENTERED = "PLEDGE_ENTERED";
export const FEEDBACK_CLOSED = "FEEDBACK_CLOSED";

/**
 * The data for a pledge
 * @typedef PledgeState
 * @property {string} id The id
 * @property {number} minAmount The minimum amount of money required for the pledge
 * @property {number} leftCount The count of the rewards left
 */

/**
 * The state
 * @typedef ReduxState
 * @property {boolean} isBookmarked Whether the page has been bookmarked or not
 * @property {number} backersCount The total count of backers
 * @property {number} backedAmount The amount of money backed so far
 * @property {string|null} selectedPledgeId The id of the selected pledge in the modal
 * @property {PledgeState[]} pledges The pledges
 * @property {boolean} thereIsFeedback Whether there is a feedback to show or not
 */

/**
 * @type {ReduxState}
 */
const initialState = {
  isBookmarked: false,
  backedAmount: 89_914,
  backersCount: 5_007,
  selectedPledgeId: null,
  pledges: [
    {
      id: "no-reward",
      leftCount: 0,
      minAmount: 0,
    },
    {
      id: "bamboo-stand",
      leftCount: 101,
      minAmount: 25,
    },
    {
      id: "black-edition-stand",
      leftCount: 64,
      minAmount: 75,
    },
    {
      id: "mahogany-stand",
      leftCount: 0,
      minAmount: 200,
    },
  ],
  thereIsFeedback: false,
};

/**
 * The reducer function
 * @function
 * @param {ReduxState} state The previous state
 * @param {ReduxAction} action The dispatched action
 * @returns {ReduxState}
 */
function reducer(state = initialState, action) {
  switch (action.type) {
    case BOOKMARK_TOGGLE:
      return { ...state, isBookmarked: action.payload ?? !state.isBookmarked };

    case PLEDGE_SELECTED:
      return { ...state, selectedPledgeId: action.payload };

    case PLEDGE_ENTERED: {
      const { pledgeId, amount } = action.payload;
      const backedAmount = state.backedAmount + amount;
      const pledges = [...state.pledges];
      const i = pledges.findIndex((pledge) => pledge.id === pledgeId);
      const pledge = { ...state.pledges[i] };
      pledge.leftCount--;
      pledges[i] = pledge;
      return { ...state, backersCount: state.backersCount + 1, pledges, backedAmount, thereIsFeedback: true };
    }

    case FEEDBACK_CLOSED:
      return { ...state, thereIsFeedback: false };

    default:
      return state;
  }
}

/**
 * Redux action
 * @typedef ReduxAction
 * @property {string} type The type of the action
 * @property {any|undefined} payload The action payload
 */

/**
 * Redux dispatch function
 * @callback ReduxDispatchFn
 * @param {ReduxAction} action The action to dispatch
 */

/**
 * Empty function
 * @callback EmptyFn
 */

/**
 * State getter
 * @callback ReduxStateGetter
 * @returns {ReduxState}
 */

/**
 * Enmty
 * @callback ReduxDispatchFn
 * @param {ReduxAction} action The action to dispatch
 */

/**
 * Signature of a redux store
 * @typedef ReduxStore
 * @property {ReduxDispatchFn} dispatch The dispatch function
 * @property {EmptyFn} subscribe The subscribe function
 * @property {ReduxStateGetter} getState The state getter
 */

/**
 * @type {ReduxStore}
 */
export const store = Redux.createStore(reducer);
