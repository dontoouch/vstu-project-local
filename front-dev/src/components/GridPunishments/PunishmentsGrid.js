import React, { useMemo, useRef, useState, useEffect,useCallback  } from "react";
import {
  getRoomsThunk,
  setRoomThunk,
  deletePunishmentsThunk,
} from "../../redux/actions/mainThunks";

import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ModalEdit from "../ModalEdit/ModalEdit";
import AddingPunishments from "../AddingPunishments";

const PunishmentsGrid = ({ selectedRoom }) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "183px", width: "100%" }), []);
  const gridRef = useRef();
  const [modalEditActive, setModalEditActive] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [selected, setSelected] = useState([]);
  console.log(gridRef);

  useEffect(() => {
    setSelected(selectedRoom);
  }, [selectedRoom]);
console.log(selected.students);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Дата",
      field: "orderData",
      valueGetter: (params) => {
        if (params.data.students === undefined) {
          return "";
        }
        return params.data.students.order !== undefined
          ? `${params.data.students.order.orderData}`
          : "Нет данных";
      },
    },
    {
      headerName: "№ приказа",
      valueGetter: (params) => {
        if (params.data.students === undefined) {
          return "";
        }
        return params.data.students.order !== undefined
          ? `${params.data.students.order.orderNumber}`
          : "Нет данных";
      },
    },
    {
      headerName: "Комментарий",
      valueGetter: (params) => {
        if (params.data.students === undefined) {
          return "";
        }
        return params.data.students.order !== undefined
          ? `${params.data.students.order.orderComment}`
          : "Нет данных";
      },
    },
    {
      headerName: "Автор",
      valueGetter: (params) => {
        if (params.data.students === undefined) {
          return "";
        }
        return params.data.students.order !== undefined
          ? `${params.data.students.order.author}`
          : "Нет данных";
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      filter: "agSetColumnFilter",
      floatingFilter: true,
      resizable: false,
      cellDataType: true,
      enableRowGroup: true,
      suppressMovable: true,
    };
  }, []);

  const defaultColGroupDef = useMemo(() => {
    return {
      marryChildren: true,
    };
  }, []);

  const columnTypes = useMemo(() => {
    return {
      numberColumn: { filter: "agSetNumberColumnFilter" },
      booleanColumn: { filter: "BooleanColumnFilter" },
    };
  }, []);
  const autosizeColumn = (params) => {
    params.api.sizeColumnsToFit();
  };

  const localeText = useMemo(() => {
    return {
      selectAll: "(Выбрать всё)", // '(Select All)'
      selectAllSearchResults: "Выберите все результаты поиска", // '(Select All Search Results)'
      addCurrentSelectionToFilter: "Добавить текущий выбор в фильтр", // 'Add current selection to filter'
      rowGroupColumnsEmptyMessage:
        "Перетащите сюда, чтобы установить группы строк", // 'Drag here to set row groups'
      searchOoo: "Поиск...", // 'Search...'
      blanks: "(Пустые)", // '(Blanks)'
      noMatches: "Нет совпадений", // 'No matches'
      true: "Да", // 'True'
      false: "Нет", // 'False'
      pinColumn: "Закрепить столбец", // 'Pin Column',
      pinLeft: "Закрепить слева", // 'Pin Left'
      pinRight: "Закрепить справа", // 'Pin Right'
      noPin: "Открепить", // 'No Pin'
      autosizeThiscolumn: "Авторазмер этого столбца", // 'Autosize This Column'
      autosizeAllColumns: "Авторазмер всех столбцов", // 'Autosize All Columns'
      groupBy: "Группа по", // 'Group by'
      resetColumns: "Сброс", // 'Reset Columns'
      expandAll: "Развернуть все группы строк", // 'Expand All Row Groups'
      collapseAll: "Закрыть все группы строк", // 'Close All Row Groups'
    };
  }, []);

  const onRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    console.log(selectedData);
  
    // eslint-disable-next-line no-restricted-globals
    let conf = confirm("Вы точно хотите удалить запись?");
  
    if (conf) {
      gridRef.current.api.applyTransaction({
        remove: selectedData,
        
      });console.log(selectedData[0].id);
      fetch(
        // `http://192.168.11.57:18076/api/hostels/rooms/${selectedData[0].id}/students?studentId=${selectedData[0].students.id}`,
        `http://localhost:3001/room/${selectedData[0].id}/students/${selectedData[0].students.id}/order?=${selectedData[0].students.order}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer" +
              JSON.parse(localStorage.getItem("user"))["access_token"],
          },
        }
      ).then((response) => response.json());
  
      selectedData[0].students.order = [];
    }
  }, []);
  
 
  
  const OnAddStudents = () => {
    setModalAdd(true);
  };
 

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
      <ModalEdit active={modalEditActive} setActive={setModalEditActive} />
      <AddingPunishments active={modalAdd} setActive={setModalAdd} />
      <div className="btn-contol-block">
          <button className="btn-control" onClick={onRemoveSelected}>
            Удалить запись
          </button>
        
          <button className="btn-control" type="button" onClick={OnAddStudents}>
            Добавить запись
          </button>
        </div>
        <AgGridReact
           ref={gridRef}
          colResizeDefault={"shift"}
          // localeText={localeText}
          groupDisplayType="multiplyColumns"
          rowGroupPanelShow={"always"}
          groupDefaultExpanded={0}
          rowData={selected}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          defaultColGroupDef={defaultColGroupDef}
          columnTypes={columnTypes}
          rowSelection="single"
          autosizeColumn={autosizeColumn}
        />
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
  getRoomsThunk,
  setRoomThunk,
  deletePunishmentsThunk,
})(PunishmentsGrid);
