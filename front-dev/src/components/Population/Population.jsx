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

  useEffect(() => {
    setSelected(selectedRoom[0]);
  }, [selectedRoom]);

  return (
    <div className="containerPop">
      <div className="navContainer">
        <NavLink to="/main" className="btn-back">
          Назад
        </NavLink>
        {/* <button onClick={() => getSelectedRoomThunk()}>1</button> */}

        <div className="checkboxContainer">
          <div className="checkboxStyle">
            <input
              type="checkbox"
              checked={popRoom}
              onChange={() => {
                setPopRoom(!popRoom);
                setMaleFemale(false);
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
              }}
            />
            <label htmlFor="checkbox">Женские/мужские комнаты</label>
          </div>
        </div>

        {/* <div className="checkboxStyle">
                <input type="checkbox3" checked={popRoom} onChange={() =>setPopRoom(!popRoom)}/>
                <label htmlFor="checkbox3">Тип комнаты</label>
            </div> */}
      </div>
      <main>
        <div className="gridTable">
          {popRoom && <PopulationGrid />}
          {maleFemale && <MaleFemaleBlock />}
        </div>
        <div className="sidebar">
          <h2>Проживающие</h2>
          <div className="sidebarBlock">
            {selected?.students?.map((item) => {
              return (
                <div>{`${item.name} ${item.patronymic} ${item.surname} ${item?.phone}`}</div>
              );
            })}
          </div>
        </div>
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
