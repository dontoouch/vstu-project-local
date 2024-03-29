import "./style.css";

import React, { useState , useEffect } from "react";
// import {
//   getRoomsThunk,
//   setRoomThunk,
//   deleteRoomsThunk,
// } from "../../redux/actions/mainThunks";
// import { connect } from "react-redux";
import Select from "react-select";




const Characteristic = ({
  rooms,
  getRoomsThunk,

}) => {
  const [parseRoomsData, setParseRoomsData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [selectedStudents,setSelectedStudents] = useState([])

  useEffect(() => {
    // getRoomsThunk();
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
    setParseRoomsData(tempArr)
  };

  const [currentName, setCurrentName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");

  const optionsName = 
  parseRoomsData !==undefined
      ? parseRoomsData.map((item) => {
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
  
  const setName = (newValue) => {
    setCurrentName(newValue.value)
    getSelectedStudents()
  }

  const setRoom = (newValue) => {
    setCurrentRoom(newValue.value)
    getSelectedStudents()
  }

  const getSelectedStudents = () => {
    
    const selectedRow = parseRoomsData.find(
      (item) =>
        `${item.students.name} ${item.students.patronymic} ${item.students.surname}` ===
        currentName
    );

    if(selectedRow !== undefined) {
      setSelectedStudents(selectedRow)
      console.log(selectedRow)
    } 

  }

    return (  
      <div className="container">
        <div className="header-char">
          <h3>Характеристика</h3>
          <div className="select-char">
          <Select
                className="select-content"
                options={optionsName}
                // onChange={(newValue) => setCurrentName(newValue.value)}
                onChange={setName}
                value={
                  currentName
                    ? optionsName.find((c) => c.value === currentName)
                    : ""
                }
              />
          <Select
                className="select-content"
                options={optionsRoom}
                onChange={setRoom}
                value={
                  currentRoom
                    ? optionsRoom.find((c) => c.value === currentRoom)
                    : ""
                }
              />
          </div>
        </div>
        <div className="main-char">
          <p>ФИО - {currentName}</p>
          <p>День рождения</p>
          <p>Родители(Номера,ФИО)</p>
          <p>Номер общежития - {selectedStudents.hostel !== undefined ? (selectedStudents.hostel === 'HOSTEL_3' ? "3" : "2") : "Нет данных"}</p>
          <p>Номер комнаты - {selectedStudents !== undefined ? `${selectedStudents.roomNumber} ${selectedStudents.roomType === "LITTLE" ? "М" : "Б"}` : "Нет данных"}</p>
          <p>Группа - {selectedStudents.students !== undefined ? selectedStudents.students.group !== undefined ? selectedStudents.students.group.name : "Нет данных" : "Нет данных"}</p>
          <p>Курс - {selectedStudents.students !== undefined ? selectedStudents.students.group !== undefined ? selectedStudents.students.group.currentCourse : "Нет данных": "Нет данных"}</p>
          <p>Факультет - {selectedStudents.students !== undefined ? selectedStudents.students.group !== undefined ? selectedStudents.students.group.spec !== undefined ? selectedStudents.students.group.spec.name : "Нет данных" : "Нет данных" : "Нет данных"}</p>
          <p>Общ.занятость</p>
          <p>Взыскания</p>
          <p>Льготы</p>
          <p>Номер телефона - {selectedStudents.students !== undefined ? selectedStudents.students.phone : "Нет данных"}</p> 
          <p>Домашний адрес - {selectedStudents.students !== undefined ? selectedStudents.students.addressCity : "Нет данных"}</p>
          <p>Соседи(ФИО, номера)</p>

        </div>
      </div>
    )
}

// let mapStateToProps = (state) => {
//   return {
//     rooms: state.mainPage.rooms,
//     // students: state.mainPage.students,
//   };
// };

// export default connect(mapStateToProps, {
//   getRoomsThunk,
//   setRoomThunk,
//   deleteRoomsThunk,
//   // getStudentsThunk,
// })(Characteristic);

export default Characteristic;