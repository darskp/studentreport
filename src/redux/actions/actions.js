import { actions } from "../constants/constants";

export const selectChapter = (chapterID) => {
  return {
    type: actions.SELECT_CHAPTER,
    payload: chapterID,
  };
};
