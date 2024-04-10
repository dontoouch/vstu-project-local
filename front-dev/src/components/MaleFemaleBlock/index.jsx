import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    useEffect,
  } from "react";
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

const MaleFemaleBlock = ({
    rooms,
    getRoomsThunk,
  }) => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100vh", width: "100%" }), []);


    useEffect(() => {
        getRoomsThunk();
      }, []);

    const [columnDefs, setColumnDefs] = useState([
        {
          headerName: "Номер общежития",
          field: "hostel",
          valueGetter: (params) => {
            if (params.data.hostel === "HOSTEL_2") {
              return "2";
            }
            if (params.data.hostel === "HOSTEL_3") {
              return "3";
            }
            return "unknown";
          },
        },   
        {
            headerName: "Номер комнаты",
            field: "roomNumber",
        },  
        {
            headerName: "Тип комнаты",
            field: "roomType",
            valueGetter: (params) => {
                if (params.data.roomType === "BIG") {
                  return "Б";
                }
                if (params.data.roomType === "LITTLE") {
                  return "М";
                }
                return "unknown";
              },
        },  
        {
            headerName: "Женская/мужская",
            valueGetter: (params) => {
                console.log(params.data.students[0])
                if (params.data.students[0].sex === 0) {
                  return "Женская";
                }
                if (params.data.students[0].sex === 1) {
                    return "Мужская";
                  }
                return "unknown";
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
                rowData={rooms}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                defaultColGroupDef={defaultColGroupDef}
                columnTypes={columnTypes}
                rowSelection="single"
            />
        </div>
    </div>
    
    
  )
}

let mapStateToProps = (state) => {
    return {
      rooms: state.mainPage.rooms,
      // students: state.mainPage.students,
    };
  };
  
  export default connect(mapStateToProps, {
    getRoomsThunk,
    setRoomThunk,
    deleteRoomsThunk,
  })(MaleFemaleBlock);
