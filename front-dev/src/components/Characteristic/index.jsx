import "./style.css";

import React, { useState, useEffect } from "react";
// import {
//   getRoomsThunk,
//   setRoomThunk,
//   deleteRoomsThunk,
// } from "../../redux/actions/mainThunks";
// import { connect } from "react-redux";
import Select from "react-select";

const Characteristic = ({ rooms, getRoomsThunk }) => {
  const [parseRoomsData, setParseRoomsData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

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
        setRoomsData(data);
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
      });
  }, []);

  let tempArr = [];

  const updateDataStudents = (room) => {
    tempArr.push(room);
    setParseRoomsData(tempArr);
  };

  const [currentName, setCurrentName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");

  const optionsName =
    parseRoomsData !== undefined
      ? parseRoomsData.map((item) => {
          return {
            value: `${item.students.name} ${item.students.patronymic} ${item.students.surname}`,
            label: `${item.students.name} ${item.students.patronymic} ${item.students.surname}`,
          };
        })
      : "unknown";

  const optionsRoom =
    roomsData !== undefined
      ? roomsData.map((item) => {
          return {
            value: `${item.roomNumber} ${
              item.roomType === "LITTLE" ? "М" : "Б"
            }`,
            label: `${item.roomNumber} ${
              item.roomType === "LITTLE" ? "М" : "Б"
            }`,
          };
        })
      : "unknown";

  const setName = (newValue) => {
    setCurrentName(newValue.value);
    getSelectedStudents();
  };

  const setRoom = (newValue) => {
    setCurrentRoom(newValue.value);
    getSelectedStudents();
  };

  const getSelectedStudents = () => {
    const selectedRow = parseRoomsData.find(
      (item) =>
        `${item.students.name} ${item.students.patronymic} ${item.students.surname}` ===
        currentName
    );

    if (selectedRow !== undefined) {
      setSelectedStudents(selectedRow);
      console.log(selectedRow);
    }
  };

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
      <div className="main__wrap">
        <div className="main-char">
          <button type="submit" className="char__photo">
            Добавить фото
          </button>
          <div className="char__wrap">
            <p className="char__title">{currentName}</p>
            <p className="char__text">
              {selectedStudents.students !== undefined
                ? selectedStudents.students.lastDocument ? selectedStudents.students.lastDocument.birthDate
                : "Нет данных": "Нет данных"}
            </p>
            <p className="char__text">
              {selectedStudents.students !== undefined
                ? selectedStudents.students.phone
                : "Нет данных"}
            </p>
            <div className="char__text-wrap">
              <p className="char__text">
                Факультет -{" "}
                {selectedStudents.students !== undefined
                  ? selectedStudents.students.group !== undefined
                    ? selectedStudents.students.group.spec !== undefined
                      ? selectedStudents.students.group.spec.department.faculty
                          .shortName
                      : "Нет данных"
                    : "Нет данных"
                  : "Нет данных"}
              </p>
              <p className="char__text">
                Курс -{" "}
                {selectedStudents.students !== undefined
                  ? selectedStudents.students.group !== undefined
                    ? selectedStudents.students.group.currentCourse
                    : "Нет данных"
                  : "Нет данных"}
              </p>
              <p className="char__text">
                Группа -{" "}
                {selectedStudents.students !== undefined
                  ? selectedStudents.students.group !== undefined
                    ? selectedStudents.students.group.name
                    : "Нет данных"
                  : "Нет данных"}
              </p>
            </div>
            <div className="char__text-wrap">
              <p className="char__text">
                Номер общежития -{" "}
                {selectedStudents.hostel !== undefined
                  ? selectedStudents.hostel === "HOSTEL_3"
                    ? "3"
                    : "2"
                  : "Нет данных"}
              </p>
              <p className="char__text">
                Номер комнаты -{" "}
                {selectedStudents !== undefined
                  ? `${selectedStudents.roomNumber} ${
                      selectedStudents.roomType === "LITTLE" ? "М" : "Б"
                    }`
                  : "Нет данных"}
              </p>
            </div>

            <p className="char__text">Льготы</p>
            <div className="char__wrap">
              <p className="char__title">Родители</p>
              <div className="char__wrap">
                <div className="char__wrap-parents">
                  <p className="char__text">
                    {selectedStudents.students !== undefined ? selectedStudents.students.lastDocument
                      ? selectedStudents.students.lastDocument.fatherFullName
                      : "Нет данных": "Нет данных"}
                  </p>
                  <p className="char__text">
                    {selectedStudents.students !== undefined ? selectedStudents.students.lastDocument
                      ? selectedStudents.students.lastDocument.fatherPhone
                      : "Нет данных": "Нет данных"}
                  </p>
                </div>
                <div className="char__wrap-parents">
                  <p className="char__text">
                    {selectedStudents.students !== undefined ? selectedStudents.students.lastDocument
                      ? selectedStudents.students.lastDocument.motherFullName
                      : "Нет данных": "Нет данных"}{" "}
                  </p>
                  <p className="char__text">
                    {selectedStudents.students !== undefined ? selectedStudents.students.lastDocument
                      ? selectedStudents.students.lastDocument.motherPhone
                      : "Нет данных": "Нет данных"}
                  </p>
                </div>
              </div>

              <p className="char__title">Домашний адрес</p>
              <div className="char__wrap-parents">
                <p className="char__text">
                  область{" "}
                  {selectedStudents.students !== undefined
                    ? selectedStudents.students.addressState
                    : "Нет данных"}
                </p>
                <p className="char__text">
                  г.
                  {selectedStudents.students !== undefined
                    ? selectedStudents.students.addressCity
                    : "Нет данных"}
                </p>
                <p className="char__text">
                  ул.
                  {selectedStudents.students !== undefined
                    ? selectedStudents.students.addressStreet
                    : "Нет данных"}
                </p>
                <p className="char__text">
                  д.
                  {selectedStudents.students !== undefined
                    ? selectedStudents.students.addressHouse
                    : "Нет данных"}
                </p>
                <p className="char__text">
                  кв.
                  {selectedStudents.students !== undefined
                    ? selectedStudents.students.addressFlat
                    : "Нет данных"}
                </p>
              </div>
              <p className="char__title">Общ.занятость</p>

              <p className="char__title">Соседи</p>
              <div>
                <div className="char__wrap-parents">
                  <p className="char__text">1- </p>
                  <p className="char__text">+34888454</p>
                </div>
                <div className="char__wrap-parents">
                  <p className="char__text">2- </p>
                  <p className="char__text">+34888454</p>
                </div>
                <div className="char__wrap-parents">
                  <p className="char__text">3- </p>
                  <p className="char__text">+34888454</p>
                </div>
                <div className="char__wrap-parents">
                  <p className="char__text">4- </p>
                  <p className="char__text">+34888454</p>
                </div>
                <p className="char__title">Взыскания</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
