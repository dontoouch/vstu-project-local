import { SET_NEED_HOSTEL } from "../types/mainTypes";

let initialState = {
  needHostel: [],
};

const needHostelReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_NEED_HOSTEL:
      return {
        ...state,
        rooms: [...action.rooms],
      };
    default:
      return state;
  }
};


export default needHostelReducer;
