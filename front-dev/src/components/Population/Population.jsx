import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import PopulationGrid from "../PopulationGrid";
import "./style.css";
import MaleFemaleBlock from "../MaleFemaleBlock";

const Population = () => {
  const [popRoom, setPopRoom] = useState(true);
  const [maleFemale, setMaleFemale] = useState(false);


  return (
    <div className="containerPop">
      <div className="navContainer">
      <NavLink to="/main" className="btn-back">Назад</NavLink>
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
      <div className="gridTable">
        {popRoom && <PopulationGrid />}
        {maleFemale && <MaleFemaleBlock />}
      </div>
    </div>
  );
};

export default Population;
