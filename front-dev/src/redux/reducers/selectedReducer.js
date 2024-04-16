import { SET_SELECTED_ROOM, GET_SELECTED_ROOM } from "../types/mainTypes";

let initialState = {
  selectedRoom: [],
};

const selectedReducer = (state = initialState, action) => {
  console.log(action);
  console.log(state)

  switch (action.type) {
    case SET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: action.selectedRoom,
      };

    case GET_SELECTED_ROOM:
      return {
        ...state,
        // selectedRoom: action.selectedRoom,
      };

    default:
      return state;
  }
};

export default selectedReducer;
