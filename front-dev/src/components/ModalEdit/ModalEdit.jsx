import React, { useState } from "react";
import "./modal.css";

const ModalEdit = ({ active, setActive, data }) => {
  const [activeBtn, setActiveBtn] = useState(false);
  let [inputValue, setInputValue] = useState("");
  let [dataRow, setDataRow] = useState();

  const getSelectedRow = () => {
    setActiveBtn(true);
    const selectedRow = data();
    console.log(selectedRow);
    if (selectedRow !== undefined) {
      setDataRow(selectedRow);
      setInputValue(selectedRow);
    } else {
      alert("Студент не выбран");
    }
  };

  const overWriteData = () => {
    setDataRow((currentData) => ({
      ...currentData,
      roomNumber: Number(inputValue.roomNumber) || Number(inputValue),
    }));
    console.log(dataRow);
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
        <h3 style={{fontWeight: "bold"}}>Изменение студента</h3>
        <div className="modal-btn">
          <button
            className="btn-control"
            onClick={getSelectedRow}
            type="button"
            formtarget="blank"
          >
            Получить данные
          </button>
          <button
            className="btn-control"
            type="button"
            formtarget="blank"
            onClick={overWriteData}
          >
            Отправить
          </button>
        </div>
        <form className="form" action="#">
          <div className="form__input-wrap">
            <label for="npp">npp</label>
            <input
              className="form__input"
              type="text"
              placeholder="npp"
              id="npp"
              value={activeBtn ? inputValue.students.surname : "Нет данных"}
            />
          </div>
          <div className="form__input-wrap">
            <label for="День рождения">День рождения</label>
            <input
              className="form__input"
              type="text"
              placeholder="День рождения"
              id="День рождения"
              // value={activeBtn ? inputValue.students.surname : "Нет данных"}
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
                activeBtn
                  ? inputValue.students.sex === 0
                    ? "Женский"
                    : "Мужской"
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
                activeBtn
                  ? inputValue.students.surname
                    ? inputValue.students.surname
                    : "Нет данных"
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
                activeBtn
                  ? inputValue.students.name
                    ? inputValue.students.name
                    : "Нет данных"
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
                activeBtn
                  ? inputValue.students.patronymic
                    ? inputValue.students.patronymic
                    : "Нет данных"
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
                activeBtn
                  ? inputValue.students.group.currentCourse
                    ? inputValue.students.group.currentCourse
                    : "Нет данных"
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
                activeBtn
                  ? inputValue.students.specialization.name
                    ? inputValue.students.specialization.name
                    : "Нет данных"
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
                activeBtn
                  ? inputValue.students.group.name
                    ? inputValue.students.group.name
                    : "Нет данных"
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
              // value={activeBtn ? inputValue.students.surname : "Нет данных"}
            />
          </div>
          <div className="form__input-wrap">
            <label for="Форма обучения">Форма обучения</label>
            <input
              className="form__input"
              type="text"
              placeholder="бюджет/внебюджет"
              id="Форма обучения"
              // value={activeBtn ? inputValue.students.surname : "Нет данных"}
            />
          </div>
          <div className="form__input-wrap">
            <label for="№ комнаты">№ комнаты</label>
            <input
              className="form__input"
              type="text"
              placeholder="№ комнаты"
              id="№ комнаты"
              value={
                activeBtn
                  ? inputValue.roomNumber
                    ? inputValue.roomNumber
                    : "Нет данных"
                  : "Нет данных"
              }
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="form__input-wrap">
            <label for="дни">Кол-во дней в месяце</label>
            <input
              className="form__input"
              type="text"
              placeholder="дни"
              id="дни"
              // value={activeBtn ? inputValue.roomNumber   : 'Нет данных' }
              // onChange={(e)=> setInputValue(e.target.value)}
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
                activeBtn
                  ? inputValue.students.group.spec.status
                    ? inputValue.students.group.spec.status === "ACTIVE"
                      ? "Активен"
                      : "Не активен"
                    : "Нет данных"
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
              value={
                activeBtn
                  ? `${
                      inputValue.students.group.yearStart
                        ? inputValue.students.group.yearStart
                        : "Нет данных"
                    }-${
                      inputValue.students.group.yearEnd
                        ? inputValue.students.group.yearEnd
                        : "Нет данных"
                    }`
                  : "Нет данных"
              }
            />
          </div>
          {/* <div className="form__input-wrap">
              <label for="Номер договора">Номер договора</label>
              <input
                className="form__input"
                type="text"
                placeholder="Номер договора"
                id="Номер договора"
                // value={activeBtn ? inputValue.roomNumber   : 'Нет данных' }
                // onChange={(e)=> setInputValue(e.target.value)}
              />
            </div> */}
        </form>
        <div className="additional-info">
          <h4>
            <span style={{fontWeight: "bold", color: "#333333"}}>Домашний адрес: </span>
            {activeBtn
              ? `${inputValue.students.addressState} область, ${inputValue.students.addressRegion} район, г. ${inputValue.students.addressCity} `
              : "Нет данных"}
          </h4>
          <h4>
            <span style={{fontWeight: "bold", color: "#333333"}}>Телефон: </span>
            {activeBtn
              ? `${inputValue.students.phone} `
              : "Нет данных"}
          </h4>
        </div>

        
      </div>
    </div>
  );
};

export default ModalEdit;
