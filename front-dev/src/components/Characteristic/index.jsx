import "./style.css";

import React, { useState , useEffect } from "react";
import {
  getRoomsThunk,
  setRoomThunk,
  deleteRoomsThunk,
} from "../../redux/actions/mainThunks";
import { connect } from "react-redux";
import Select from "react-select";




const Characteristic = ({
  rooms,
  getRoomsThunk,

}) => {
  const [dataState, setDataState] = useState([]);
  const [roomsData, setRoomsData] = useState([]);

  useEffect(() => {
    getRoomsThunk();
    // fetch("http://192.168.11.57:18076/api/hostels/1/rooms", {
    fetch("http://localhost:3001/room", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["access_token"],
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRoomsData(data)
        if (data !== undefined) {
          data.forEach((item) => {
            if (item.students.length > 0) {
              item.students.forEach((st) => {
                updateDataStudents({
                  ...item,
                  students: st,
                });
              });
            }
          });
        }

      })

  }, []);


  let tempArr = [];

  const updateDataStudents = (room) => {
    tempArr.push(room);
    setDataState(tempArr)
  };

  const [currentName, setCurrentName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");

  const optionsName = 
    dataState !==undefined
      ? dataState.map((item) => {
          return {
            value: `${item.students.name} ${item.students.patronymic} ${item.students.surname}`,
            label: `${item.students.name} ${item.students.patronymic} ${item.students.surname}`,
          };
        })
      :"unknown";

  const optionsRoom =
    roomsData !== undefined
      ? roomsData.map((item) => {
          return {
            value: `${item.roomNumber} ${item.roomType === "LITTLE" ? "М" : "Б"}`,
            label: `${item.roomNumber} ${item.roomType === "LITTLE" ? "М" : "Б"}`,
          };
        })
      : "unknown";

    return (  
      <div>
        <div className="header-char">
          <h3>Характеристика</h3>
          <div className="select-char">
          <Select
                className="select-content"
                options={optionsName}
                onChange={(newValue) => setCurrentName(newValue.value)}
                value={
                  currentName
                    ? optionsName.find((c) => c.value === currentName)
                    : ""
                }
              />
          <Select
                className="select-content"
                options={optionsRoom}
                onChange={(newValue) => setCurrentRoom(newValue.value)}
                value={
                  currentRoom
                    ? optionsRoom.find((c) => c.value === currentRoom)
                    : ""
                }
              />
          </div>
        </div>
      </div>
    )
}

let mapStateToProps = (state) => {
  return {
    rooms: state.mainPage.rooms,
    // students: state.mainPage.students,
  };
};

export default connect(mapStateToProps, {
  getRoomsThunk,
  setRoomThunk,
  deleteRoomsThunk,
  // getStudentsThunk,
})(Characteristic);