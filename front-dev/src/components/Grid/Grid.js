import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  getRoomsThunk,
  setRoomThunk,
  deleteRoomsThunk,
  setSelectedRoomThunk,
} from "../../redux/actions/mainThunks";
import { connect } from "react-redux";
import ModalEdit from "../ModalEdit/ModalEdit";
import AddingStudents from "../AddingStudents";
import Loader from "../Loader/Loader";
import { NavLink } from "react-router-dom";
import adminDefs from "./roleDefs/AdminDefs";
import curatorDefs from "./roleDefs/CuratorDefs";
import userDefs from "./roleDefs/UserDefs";
import { roles } from "./roles";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MenuModule,
]);

const GridExample = ({
  rooms,
  getRoomsThunk,
  setRoomThunk,
  setSelectedRoomThunk,
}) => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [modalEditActive, setModalEditActive] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    getRoomsThunk();
  }, []);

  function onCellValueChanged(event) {
    let currentPath = event.colDef.field;
    console.log(
      "onCellValueChanged: " + event.colDef.field + " = " + event.newValue
    );
    fetch(
      `http://192.168.11.57:18076/api/students/${
        event.data.students.id
      }/?${currentPath}=${event.newValue === "Да" ? true : false}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer" + JSON.parse(localStorage.getItem("user"))["access_token"],
        },
        body: JSON.stringify({
          aprroved: event.data.students.approved === "Да" ? true : false,
        }),
      }
    ).then((response) => response.json());
  }

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      filter: "agSetColumnFilter",
      floatingFilter: true,
      resizable: false,
      cellDataType: true,
      enableRowGroup: true,
      suppressMovable: true,
      onCellValueChanged: onCellValueChanged,
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

  const gridOptions = {
    onGridReady: (event) => {
      event.api.sizeColumnsToFit();
    },
    isGroupOpenByDefault: (params) => {
      return params.field === "hostel";
    },
    onRowClicked: (event) => {
      console.log(event);
      setSelectedRoomThunk([event.data]);
    },
    columnDefs: roles.find((role) => role === "ADMIN")
      ? adminDefs
      : roles.find((role) => role === "CURATOR")
      ? curatorDefs
      : userDefs,
  };

  const onGridReady = useCallback(
    (rooms) => {
      if (rooms !== undefined) {
        rooms.forEach((item) => {
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
    },
    [rooms]
  );

  let tempArr = [];

  const updateDataStudents = (room) => {
    tempArr.push(room);
    setRoomThunk(tempArr);
  };

  const onRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();

    // eslint-disable-next-line no-restricted-globals
    let conf = confirm("Вы точно хотите удалить студента?");

    if (conf) {
      gridRef.current.api.applyTransaction({
        remove: selectedData,
      });
      fetch(
        // `http://192.168.11.57:18076/api/hostels/rooms/${selectedData[0].id}/students?studentId=${selectedData[0].students.id}`,
        `http://localhost:3001/room/${selectedData[0].id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer" +
              JSON.parse(localStorage.getItem("user"))["access_token"],
          },
          body: JSON.stringify({
            roomId: selectedData[0].id,
            studentId: selectedData[0].students.id,
          }),
        }
      ).then((response) => response.json());

      selectedData[0].students = [];
    }
  }, []);

  function onEditableSelected() {
    const selectedData = gridRef.current.api.getSelectedRows();
    if (selectedData[0] !== undefined) {
      setModalEditActive(true);
    } else {
      alert("Выберите студента");
    }
  }

  const OnAddStudents = () => {
    setModalAdd(true);
  };

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  const loadingCellRenderer = useCallback(<Loader />);

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

  return (
    <div style={containerStyle}>
      <ModalEdit active={modalEditActive} setActive={setModalEditActive} />
      <AddingStudents active={modalAdd} setActive={setModalAdd} />
      <div className="containerGrid">
        <div className="btn-contol-block">
          {roles.find((role) => role === "ADMIN") && (
            <>
              <button className="btn-control" onClick={onRemoveSelected}>
                Удалить студента
              </button>

              <button className="btn-control" onClick={onEditableSelected}>
                Изменить студента
              </button>
              <button
                className="btn-control"
                type="button"
                onClick={OnAddStudents}
              >
                Добавить студента
              </button>
              <NavLink
                to="/population"
                className="btn-control"
                onClick={() => setSelectedRoomThunk([])}
              >
                Кол-во свободных комнат
              </NavLink>
              <button
                onClick={onBtExport}
                className="btn-control"
                type="button"
              >
                Архив
              </button>
            </>
          )}

          <NavLink to="/char" className="btn-control">
            Характеристика
          </NavLink>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            colResizeDefault={"shift"}
            localeText={localeText}
            groupDisplayType="multiplyColumns"
            rowGroupPanelShow={"always"}
            groupDefaultExpanded={0}
            rowData={rooms}
            // columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            defaultColGroupDef={defaultColGroupDef}
            columnTypes={columnTypes}
            onGridReady={onGridReady(rooms)}
            rowSelection="single"
            gridOptions={gridOptions}
            loadingCellRenderer={loadingCellRenderer}
          />
        </div>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    rooms: state.mainPage.rooms,
  };
};

export default connect(mapStateToProps, {
  getRoomsThunk,
  setRoomThunk,
  deleteRoomsThunk,
  setSelectedRoomThunk,
})(GridExample);
