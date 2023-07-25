import { actions } from "../constants/constants";

let initialState = {
      selectedChapterId: null,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SELECT_CHAPTER:
      return {
        ...state,
        selectedChapterId: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;