import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  getRoomsThunk,
  setRoomThunk,
  deleteRoomsThunk,
} from "../../redux/actions/mainThunks";

import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const PunishmentsGrid = ({ selectedRoom }) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "183px", width: "100%" }), []);

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(selectedRoom);
  }, [selectedRoom]);

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

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          // ref={gridRef}
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
  deleteRoomsThunk,
})(PunishmentsGrid);
