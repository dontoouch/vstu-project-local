import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import PopulationGrid from "../PopulationGrid";
import "./style.css";
import MaleFemaleBlock from "../MaleFemaleBlock";
import { getSelectedRoomThunk } from "../../redux/actions/mainThunks";

import { connect } from "react-redux";

const Population = ({ selectedRoom, getSelectedRoomThunk }) => {
  const [popRoom, setPopRoom] = useState(true);
  const [maleFemale, setMaleFemale] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedRoom[0]);
    setIsSelected(true);
  }, [selectedRoom]);

  return (
    <div className="containerPop">
      <div className="navContainer">
        <NavLink to="/main" className="btn-back">
          Назад
        </NavLink>
        <div className="checkboxContainer">
          <div className="checkboxStyle">
            <input
              type="checkbox"
              checked={popRoom}
              onChange={() => {
                setPopRoom(!popRoom);
                setMaleFemale(false);
                setIsSelected(false);
              }}
            />
            <label htmlFor="checkbox">Свободные комнаты</label>
          </div>
          <div className="checkboxStyle">
            <input
              type="checkbox"
              checked={maleFemale}
              onChange={() => {
                setPopRoom(false);
                setMaleFemale(!maleFemale);
                setIsSelected(false);
              }}
            />
            <label htmlFor="checkbox">Женские/мужские комнаты</label>
          </div>
        </div>
      </div>
      <main>
        <div className="gridTable" style={{ width: isSelected ? "100%" : "60%" }}>
          {popRoom && <PopulationGrid />}
          {maleFemale && <MaleFemaleBlock />}
        </div>
        {(selected!== undefined && isSelected) && (
          <div className="sidebar">
            <h2>Проживающие</h2>
            <h3 style={{ fontWeight: "bold" }}>
              Номер комнаты: {selected?.roomNumber}
            </h3>
            <div className="sidebarBlock">
              {selected?.students?.map((item) => {
                return (
                  <div className="sidebarItem">
                    <p>
                      <span style={{ fontWeight: "bold" }}>ФИО: </span>
                      {`${item.name} ${item.patronymic} ${item.surname} `}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Номер телефона:{" "}
                      </span>
                      {`${item?.phone}`}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Факультет: </span>
                      {`${item?.specialization?.name}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    selectedRoom: state.additional.selectedRoom,
    // students: state.mainPage.students,
  };
};

export default connect(mapStateToProps, {
  getSelectedRoomThunk,
})(Population);
