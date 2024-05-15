// import { getRooms, getStudent } from "../../api/api";
// import {setRooms, setStudent } from "./mainActions";

import { getRooms , deleteRooms } from "../../api/api";
import { setRooms  , setRoom , addStudent, setSelectedRoom ,getSelectedRoom,addPunishments, deletePunishments} from "./mainActions";




export const getRoomsThunk = () => {
  return (dispatch) => {
    getRooms().then((data) => {
      dispatch(setRooms(data));
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
//-------------------------------------------------
export const addPunishmentsThunk  = (roomStudent) => {
  return (dispatch) => {
    dispatch(addPunishments(roomStudent));
  };
};


export const deletePunishmentsThunk = (punishmentsId) => {
  return (dispatch) => {
    deletePunishments(punishmentsId).then((data) => {
      dispatch(deletePunishments(data));
    });
  };
};
//-------------------------------------------------

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
