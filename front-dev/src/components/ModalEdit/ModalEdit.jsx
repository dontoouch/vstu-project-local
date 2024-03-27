import React, { useState } from "react";
import "./modal.css"


const ModalEdit = ({active, setActive , data}) =>{

const [activeBtn,setActiveBtn] = useState(false)
let [inputValue,setInputValue]= useState('')
let [dataRow,setDataRow] = useState()




const getSelectedRow = () => {
  
  setActiveBtn(true)
  const selectedRow = data()
  console.log(selectedRow)
  if(selectedRow !== undefined) {
    setDataRow(selectedRow)
    setInputValue(selectedRow)
  }
  else {
    alert('Студент не выбран')
  }
}


const overWriteData = () => {
  setDataRow((currentData)=>({
    ...currentData,
    roomNumber: Number(inputValue.roomNumber) || Number(inputValue),
  }));
  console.log(dataRow)
  
}

    return (  
      <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
      >
        <div
          className={active ? "modal__content active" : "modal__content"}
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Изменение студента</h3>
          <div className="modal-btn">
            <button className="btn-control" onClick={getSelectedRow} type="button" formtarget="blank">
                Получить данные 
            </button>
            <button className="btn-control" type="button" formtarget="blank" onClick={overWriteData} >Отправить</button>
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
                  // value={activeBtn ? inputValue.students.surname : "Нет данных"}
                />
              </div>
              <div className="form__input-wrap">
                <label for="Фамилия">Фамилия</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Фамилия"
                  id="Фамилия"
                  value={activeBtn ? inputValue.students.surname : "Нет данных"}
                />
              </div>
              <div className="form__input-wrap">
                <label for="Имя">Имя</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Имя"
                  id="Имя"
                  value={activeBtn ? inputValue.students.name: "Нет данных"}
                />
              </div>
              <div className="form__input-wrap">
                <label for="Отчество">Отчество</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Отчество"
                  id="Отчество"
                  value={activeBtn ? inputValue.students.patronymic : "Нет данных"}  
                />
              </div>
              
              
              <div className="form__input-wrap">
                <label for="Курс">Курс</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Курс"
                  id="Курс"
                  // value={activeBtn ? inputValue.students.surname : "Нет данных"}
                />
              </div>
              <div className="form__input-wrap">
                <label for="Факультет">Факультет</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Факультет"
                  id="Факультет"
                  // value={activeBtn ? inputValue.students.surname : "Нет данных"}
                />
              </div>
              <div className="form__input-wrap">
                <label for="Группа">Группа</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Группа"
                  id="Группа"
                  // value={activeBtn ? inputValue.students.surname : "Нет данных"}
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
                value={activeBtn ? inputValue.roomNumber   : 'Нет данных' }
                onChange={(e)=> setInputValue(e.target.value)}
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
                // value={activeBtn ? inputValue.roomNumber   : 'Нет данных' }
                // onChange={(e)=> setInputValue(e.target.value)}
              />
            </div>
            <div className="form__input-wrap">
              <label for="Период обучения">Период обучения</label>
              <input
                className="form__input"
                type="text"
                placeholder="Период обучения"
                id="Период обучения"
                // value={activeBtn ? inputValue.roomNumber   : 'Нет данных' }
                // onChange={(e)=> setInputValue(e.target.value)}
              />
            </div>
            <div className="form__input-wrap">
              <label for="Номер договора">Номер договора</label>
              <input
                className="form__input"
                type="text"
                placeholder="Номер договора"
                id="Номер договора"
                // value={activeBtn ? inputValue.roomNumber   : 'Нет данных' }
                // onChange={(e)=> setInputValue(e.target.value)}
              />
            </div>
          </form>
          <h4>Период обучения</h4>
          <h4>Домашний адрес</h4>
          <h4>Контактный телефон</h4>
        </div>
      </div>
    )
}

export default ModalEdit;