import "./style.css";

import React, { useState, useEffect,useRef,useCallback } from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import PunishmentsGrid from "../GridPunishments/PunishmentsGrid";


const Characteristic = ({ selectedRoom, rooms }) => {
  // const [neighbors, setNeighbors] = useState([]);
  const [selected, setSelected] = useState([]);
  const [roomsData, setRoomsData] = useState([]);


  useEffect(() => {
    setSelected(selectedRoom[0]);
    setRoomsData(rooms);
  }, [selectedRoom, rooms]);




  return (
    
    <div className="container">
      
      <div className="header-char">
        <h3>Характеристика</h3>
        <div className="select-char">
          <NavLink to="/main" className="btn-back" >
            Назад
          </NavLink>
        </div>
      </div>
      <div className="main__wrap">
        <div className="main-char">
          <button type="submit" className="char__photo">
            Добавить фото
          </button>
          <div className="char__wrap">
            <p className="char__title">{`${selected?.students?.surname} ${selected?.students?.name} ${selected?.students?.patronymic} `}</p>
            <p className="char__text">
              {selected?.students !== undefined
                ? selected?.students?.lastDocument
                  ? selected?.students?.lastDocument?.birthDate
                  : "Нет данных"
                : "Нет данных"}
            </p>
            <p className="char__text">
              {selected?.students !== undefined
                ? selected.students.phone
                : "Нет данных"}
            </p>
            <div className="char__text-wrap">
              <p className="char__text">
                Факультет -{" "}
                {selected?.students?.group?.spec?.name !== undefined
                  ? selected.students.group.spec.name
                  : "Нет данных"}
              </p>
              <p className="char__text">
                Курс -{" "}
                {selected?.students?.group !== undefined
                  ? selected?.students?.group?.currentCourse
                  : "Нет данных"}
              </p>
              <p className="char__text">
                Группа -{" "}
                {selected?.students?.group !== undefined
                  ? selected.students.group.name
                  : "Нет данных"}
              </p>
            </div>
            <div className="char__text-wrap">
              <p className="char__text">
                Номер общежития -{" "}
                {selected?.hostel !== undefined
                  ? selected?.hostel === "HOSTEL_3"
                    ? "3"
                    : "2"
                  : "Нет данных"}
              </p>
              <p className="char__text">
                Номер комнаты -{" "}
                {selected !== undefined
                  ? `${selected.roomNumber} ${
                      selected.roomType === "LITTLE" ? "М" : "Б"
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
                    {selected?.students !== undefined
                      ? selected?.students?.lastDocument
                        ? selected?.students?.lastDocument?.fatherFullName
                        : "Нет данных"
                      : "Нет данных"}
                  </p>
                  <p className="char__text">
                    {selected?.students !== undefined
                      ? selected?.students?.lastDocument
                        ? selected?.students?.lastDocument?.fatherPhone
                        : "Нет данных"
                      : "Нет данных"}
                  </p>
                </div>
                <div className="char__wrap-parents">
                  <p className="char__text">
                    {selected?.students !== undefined
                      ? selected?.students?.lastDocument
                        ? selected?.students?.lastDocument?.motherFullName
                        : "Нет данных"
                      : "Нет данных"}
                  </p>
                  <p className="char__text">
                    {selected?.students !== undefined
                      ? selected?.students?.lastDocument
                        ? selected?.students?.lastDocument?.motherPhone
                        : "Нет данных"
                      : "Нет данных"}
                  </p>
                </div>
              </div>

              <p className="char__title">Домашний адрес</p>
              <div className="char__wrap-parents">
                <p className="char__text">
                  область{" "}
                  {selected?.students !== undefined
                    ? selected?.students?.addressState
                    : "Нет данных"}
                </p>
                <p className="char__text">
                  г.
                  {selected?.students !== undefined
                    ? selected?.students?.addressCity
                    : "Нет данных"}
                </p>
                <p className="char__text">
                  ул.
                  {selected?.students !== undefined
                    ? selected?.students?.addressStreet
                    : "Нет данных"}
                </p>
                <p className="char__text">
                  д.
                  {selected?.students !== undefined
                    ? selected?.students?.addressHouse
                    : "Нет данных"}
                </p>
                <p className="char__text">
                  кв.
                  {selected?.students !== undefined
                    ? selected?.students?.addressFlat
                    : "Нет данных"}
                </p>
              </div>
              <p className="char__title">Общ.занятость</p>
              <p className="char__title">Соседи</p>
              {selected?.students !== undefined && (
                <div className="neighbors">
                  {roomsData.map((item) => {
                    if (
                      item.roomNumber === selected.roomNumber &&
                      item?.students?.id !== selected.students.id
                    ) {
                      return (
                        <div className="neighbors-item">
                          <p className="char__text">{`${item.students.surname} ${item.students.name} ${item.students.patronymic}`}</p>
                          <p className="char__text">{item.students.phone}</p>
                          <p className="char__text">{`${item.students.addressState} область, ${item.students.addressRegion} район, г.${item.students.addressCity}`}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      
        <p className="char__title">Взыскания</p>

        <PunishmentsGrid />
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    selectedRoom: state.additional.selectedRoom,
    rooms: state.mainPage.rooms,
  };
};

export default connect(mapStateToProps)(Characteristic);
