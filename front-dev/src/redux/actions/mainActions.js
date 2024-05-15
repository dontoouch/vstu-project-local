
import {SET_ROOMS , SET_ROOM , DELETE_ROOM, ADD_STUDENT, SET_SELECTED_ROOM , GET_SELECTED_ROOM, ADD_PUNISHMENTS, DELETE_PUNISHMENTS, SET_NEED_HOSTEL } from "../types/mainTypes";

// import {SET_ROOMS, SET_STUDENTS } from "../types/mainTypes";
export const setRooms = (rooms) => ({
  type: SET_ROOMS,
  rooms: rooms,
});

export const setNeedHostel = (rooms) => ({
  type: SET_NEED_HOSTEL,
  needHostel: rooms,
});

export const setRoom = (rooms) => ({
  type: SET_ROOM,
  rooms: rooms,
});

export const setSelectedRoom = (selectedRoom) => ({
  type: SET_SELECTED_ROOM,
  selectedRoom: selectedRoom,
});

export const getSelectedRoom = (action,state) => ({
  type: GET_SELECTED_ROOM,
  // selectedRoom: state,
});

export const addStudent = (roomStudent) => ({
  type: ADD_STUDENT,
  rooms: roomStudent,
});
//-------------------------------------------------
export const addPunishments = (roomStudent)=>({
  type: ADD_PUNISHMENTS,
  rooms:roomStudent,
})

export const deletePunishments = (roomStudent)=>({
  type: DELETE_PUNISHMENTS,
  rooms:roomStudent,
})
//-------------------------------------------------
export const deleteRooms = (rooms) => ({
  type: DELETE_ROOM,
  rooms: rooms,
});

// export const setStudent = (students) => ({
//   type: SET_STUDENTS,
//   students: students,
// });
