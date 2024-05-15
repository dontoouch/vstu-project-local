import React, { useEffect, useState  } from "react";
import "./style.css";
import Select from "react-select";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { addPunishmentsThunk } from "../../redux/actions/mainThunks";
import { connect } from "react-redux";


const AddingPunishments = ({ active, setActive , selectedRoom}) => {
const [selected,setSelected]=useState()
  useEffect (()=>{
    setSelected(selectedRoom[0])
  },[])


 
const [orderDate,setOrderDate]=useState()
const [orderNumber,setOrderNumber]=useState()
const [orderComment,setOrderComment]=useState()
const [orderAuthor,setOrderAuthor]=useState()

const onPostData = ()=>{
  fetch(
    // `http://192.168.11.57:18076/api/hostels/rooms/${foundRoom.id}/students?studentId=${foundStudent.id}`,
    `http://localhost:3001/room/${selected.id}/students/${selected.students.id}/order?=${orderDate}`,
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
    // `http://192.168.11.57:18076/api/hostels/rooms/${foundRoom.id}/students?studentId=${foundStudent.id}`,
    `http://localhost:3001/room/${selected.id}/students/${selected.students.id}/order?=${orderNumber}`,
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
    // `http://192.168.11.57:18076/api/hostels/rooms/${foundRoom.id}/students?studentId=${foundStudent.id}`,
    `http://localhost:3001/room/${selected.id}/students/${selected.students.id}/order?=${orderComment}`,
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
    // `http://192.168.11.57:18076/api/hostels/rooms/${foundRoom.id}/students?studentId=${foundStudent.id}`,
    `http://localhost:3001/room/${selected.id}/students/${selected.students.id}/order?=${orderAuthor}`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer" +
          JSON.parse(localStorage.getItem("user"))["access_token"],
      },
    }
  ).then((response) => response.json());
  console.log(selected);
  setActive(false)
}

  
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content-adding active" : "modal__content-adding"}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="select">
          <btn className="close" onClick={() => setActive(false)}></btn>
          <div className="select-block">
            <input type="date" value={orderDate} onChange={(e)=>{setOrderDate(e.target.value)}} />
            <input type="text" value={orderNumber} onChange={(e)=>{setOrderNumber(e.target.value)}}/>
            <input type="text" value={orderComment} onChange={(e)=>{setOrderComment(e.target.value)}}/>
            <input type="text" value={orderAuthor} onChange={(e)=>{setOrderAuthor(e.target.value)}}/>
    
          </div>
          
          <div className="btn-block">
            <button
              className="btn-approved"
              type="button"
              onClick={() => onPostData()}
            >
              Добавить студента
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


let mapStateToProps = (state) => {
  return {
    selectedRoom: state.additional.selectedRoom,
  };
};

export default connect(mapStateToProps, {
  AddingPunishments,
})(AddingPunishments);
