// import { getRooms, getStudent } from "../../api/api";
// import {setRooms, setStudent } from "./mainActions";

import { getRooms , deleteRooms , getNeedHostel } from "../../api/api";
import { setRooms  , setRoom , addStudent, setSelectedRoom ,getSelectedRoom, setNeedHostel } from "./mainActions";

export const getRoomsThunk = () => {
  return (dispatch) => {
    getRooms().then((data) => {
      dispatch(setRooms(data));
    });
  };
};

export const getNeedHostelThunk = () => {
  return (dispatch) => {
    getNeedHostel().then((data) => {
      dispatch(setNeedHostel(data));
    });
  };
};

export const setRoomThunk = (room) => {
  return (dispatch) => {
    dispatch(setRoom(room));
  };
};

export const setSelectedRoomThunk = (selectedRoom) => {
  // console.log(selectedRoom)
  return (dispatch) => {
    dispatch(setSelectedRoom(selectedRoom));
  };
};

export const getSelectedRoomThunk = () => {
  return (dispatch) => {
    dispatch(getSelectedRoom());
  };
};

export const addStudentThunk  = (roomStudent) => {
  return (dispatch) => {
    dispatch(addStudent(roomStudent));
  };
};

export const deleteRoomsThunk = (roomId) => {
  return (dispatch) => {
    deleteRooms(roomId).then((data) => {
      dispatch(deleteRooms(data));
    });
  };
};

// export const setRoomsThunk = (data) => {
//   return (dispatch) => {
//       dispatch(setRooms(data)
//       );
//   };
// };

// export const getStudentsThunk = (id) => {
//   return (dispatch) => {
//     getStudent(id).then((data) => {
//       dispatch(setStudent(data));
//     });
//   };
// };
