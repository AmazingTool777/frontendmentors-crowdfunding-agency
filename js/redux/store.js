import * as Redux from "../lib/redux.js";

export const BOOKMARK_TOGGLE = "BOOKMARK_TOGGLE";

/**
 * The state
 * @typedef ReduxState
 * @property {boolean} isBookmarked Whether the page has been bookmarked or not
 */

/**
 * @var {ReduxState}
 */
const initialState = {
  isBookmarked: false,
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
