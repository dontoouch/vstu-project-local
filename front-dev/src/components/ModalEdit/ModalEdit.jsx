import React, { useEffect, useState } from "react";
import {
  getRoomsThunk,
  setRoomThunk,
  deleteRoomsThunk,
  setSelectedRoomThunk,
} from "../../redux/actions/mainThunks";
import Select from "react-select";
import { connect } from "react-redux";
import "./modal.css";

const ModalEdit = ({
  active,
  setActive,
  selectedRoom,
  rooms,
  setSelectedRoomThunk,
}) => {
  let [roomInput, setRoomInput] = useState();
  let [roomType, setRoomType] = useState();
  let [day, setDay] = useState();
  let [selected, setSelected] = useState();
  const [currentName, setCurrentName] = useState();

  useEffect(() => {
    setSelected(selectedRoom[0]);
    setRoomInput(selectedRoom[0]?.roomNumber);
  }, [selectedRoom]);

  const optionsName = rooms.map((item) => {
    return {
      value: item,
      label: `${item.students.name} ${item.students.patronymic} ${item.students.surname} ${item.roomNumber} ${item.roomType === "BIG" ? "Б" : "М"}`,
    };
  });

  const onPost = () => {
    let prevStateRoom = selectedRoom[0].roomNumber;
    let prevStateType = selectedRoom[0].roomType;
    let currentRoom = roomInput;
    let currentType = roomType;
    // TODO currentType null
      if (
        currentRoom !== prevStateRoom && currentType !== prevStateType
      ) {
        fetch(
          `http://localhost:3001/room/${selected.id}/?roomNumber=${currentRoom} && roomType=${currentType}`,
          //TODO
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer" +
                JSON.parse(localStorage.getItem("user"))["access_token"],
            },
          }
        ).then((response) => response.json());
      }
    setActive(false);
    //TODO кол-во дней хз куда отправлять
    // setSelectedRoomThunk([])
  };

  const onSwap = () => {
    if(currentName === undefined) return
    let tempRoomNumber = selected.roomNumber;
    let tempRoomType = selected.roomType;
    console.log(selected)
    selected.roomNumber = currentName.roomNumber
    selected.roomType = currentName.roomType
    setSelectedRoomThunk([selected])
    //TODO ПРЯМ ХЗ КАК ЭТА ХЕРНЯ БУДЕТ РАБОТАТЬ В РЕАЛЬНОСТИ УЧИТЫВАЯ ТО ЧТО МЫ МЕНЯЕМ ПОЛЯ РАСПАРШЕННЫХ ДАННЫХ А НЕ ИСХОДНЫХ 
    // НУЖНО СВАПАТЬ СТУДЕНТОВ А НЕ ЦИФРЫ КОМНАТ
    // НЕСЛОЖНАЯ РЕАЛИЗАЦИЯ === ВПАДЛУ
    fetch(
      `http://localhost:3001/room/${selected.id}/?roomNumber=${selected.roomNumber} && roomType=${selected.roomType}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer" +
            JSON.parse(localStorage.getItem("user"))["access_token"],
        },
      }
    ).then((response) => response.json());
    fetch(
      `http://localhost:3001/room/${currentName.id}/?roomNumber=${tempRoomNumber} && roomType=${tempRoomType}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer" +
            JSON.parse(localStorage.getItem("user"))["access_token"],
        },
      }
    ).then((response) => response.json());
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <btn className="close" onClick={() => setActive(false)}></btn>
        <h3 style={{ fontWeight: "bold" }}>Изменение студента</h3>
        <div className="modal-btn">
          <button
            className="btn-control"
            type="button"
            formtarget="blank"
            onClick={onPost}
          >
            Отправить
          </button>
          <div className="selectionBlock">
            <button
              className="btn-control"
              type="button"
              formtarget="blank"
              onClick={onSwap}
            >
              Поменять местами
            </button>
            <Select
              className="select"
              options={optionsName}
              onChange={(newValue) => setCurrentName(newValue.value)}
              placeholder="Выберите с кем поменять "
              value={
                currentName
                  ? optionsName.find((c) => c.value === currentName)
                  : ""
              }/>
          </div>
        </div>
        <form className="form" action="#">
          <div className="form__input-wrap">
            <label for="npp">npp</label>
            <input
              className="form__input"
              type="text"
              placeholder="npp"
              id="npp"
              value={selected?.npp ? selected?.npp : "Нет данных"}
            />
          </div>
          <div className="form__input-wrap">
            <label for="День рождения">День рождения</label>
            <input
              className="form__input"
              type="text"
              placeholder="День рождения"
              id="День рождения"
              value={
                selected?.students?.birthDay
                  ? selected?.students?.birthDay
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Пол">Пол</label>
            <input
              className="form__input"
              type="text"
              placeholder="Пол"
              id="Пол"
              value={
                selected?.students?.sex === 0
                  ? "Женский"
                  : selected?.students.sex === 1
                  ? "Мужской"
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Фамилия">Фамилия</label>
            <input
              className="form__input"
              type="text"
              placeholder="Фамилия"
              id="Фамилия"
              value={
                selected?.students?.surname
                  ? selected?.students?.surname
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Имя">Имя</label>
            <input
              className="form__input"
              type="text"
              placeholder="Имя"
              id="Имя"
              value={
                selected?.students?.name
                  ? selected?.students?.name
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Отчество">Отчество</label>
            <input
              className="form__input"
              type="text"
              placeholder="Отчество"
              id="Отчество"
              value={
                selected?.students?.patronymic
                  ? selected?.students?.patronymic
                  : "Нет данных"
              }
            />
          </div>

          <div className="form__input-wrap">
            <label for="Курс">Курс</label>
            <input
              className="form__input"
              type="text"
              placeholder="Курс"
              id="Курс"
              value={
                selected?.students?.group?.currentCourse
                  ? selected?.students?.group?.currentCourse
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Факультет">Факультет</label>
            <input
              className="form__input"
              type="text"
              placeholder="Факультет"
              id="Факультет"
              value={
                selected?.students?.specialization?.name
                  ? selected?.students?.specialization?.name
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Группа">Группа</label>
            <input
              className="form__input"
              type="text"
              placeholder="Группа"
              id="Группа"
              value={
                selected?.students?.group?.name
                  ? selected?.students?.group?.name
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Ин.студент">Ин.студент</label>
            <input
              className="form__input"
              type="text"
              placeholder="Ин.студент"
              id="Ин.студент"
              value={
                selected?.students?.foreign
                  ? selected?.students?.foreign
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Форма обучения">Форма обучения</label>
            <input
              className="form__input"
              type="text"
              placeholder="бюджет/внебюджет"
              id="Форма обучения"
              value={
                selected?.students?.formEducation
                  ? selected?.students?.formEducation
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="№ комнаты">№ комнаты</label>
            <input
              className="form__input"
              type="text"
              placeholder="№ комнаты"
              id="№ комнаты"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
            />
          </div>

          <div className="form__input-wrap">
            <label for="дни">Кол-во дней в месяце</label>
            <input
              className="form__input"
              type="text"
              placeholder="дни"
              id="дни"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              // TODO
            />
          </div>
          <div className="form__input-wrap">
            <label for="Статус обучения">Статус обучения</label>
            <input
              className="form__input"
              type="text"
              placeholder="Статус обучения"
              id="Статус обучения"
              value={
                selected?.students?.group?.spec?.status
                  ? selected?.students?.group?.spec?.status
                  : "Нет данных"
              }
            />
          </div>
          <div className="form__input-wrap">
            <label for="Период обучения">Период обучения</label>
            <input
              className="form__input"
              type="text"
              placeholder="Период обучения"
              id="Период обучения"
              value={`${
                selected?.students?.group?.yearStart
                  ? selected?.students?.group?.yearStart
                  : "Нет данных"
              }-${
                selected?.students?.group?.yearEnd
                  ? selected?.students?.group?.yearEnd
                  : "Нет данных"
              }`}
            />
          </div>
        </form>
        <div className="additional-info">
          <h4>
            <span style={{ fontWeight: "bold", color: "#333333" }}>
              Домашний адрес:{" "}
            </span>
            {selected?.students?.addressState &&
            selected?.students?.addressRegion &&
            selected?.students?.addressCity
              ? `${selected?.students?.addressState} область, ${selected?.students?.addressRegion} район, г. ${selected?.students?.addressCity} `
              : "Нет данных"}
          </h4>
          <h4>
            <span style={{ fontWeight: "bold", color: "#333333" }}>
              Телефон:{" "}
            </span>
            {selected?.students?.phone
              ? selected?.students?.phone
              : "Нет данных"}
          </h4>
        </div>
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

export default connect(mapStateToProps, {
  getRoomsThunk,
  setRoomThunk,
  deleteRoomsThunk,
  setSelectedRoomThunk,
})(ModalEdit);
