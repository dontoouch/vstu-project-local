import React, {
    useMemo,
    useRef,
    useState,
    useEffect,
    useCallback,
  } from "react";
  import {
    getRoomsThunk,
    setRoomThunk,
    deleteRoomsThunk,
    setSelectedRoomThunk,
  } from "../../redux/actions/mainThunks";

  import { connect } from "react-redux";
  import { AgGridReact } from "ag-grid-react";
  import "ag-grid-enterprise";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColumnGroup } from "ag-grid-enterprise";

const PopulationGrid = ({
    rooms,
    getRoomsThunk,
    setSelectedRoomThunk,
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
            headerName: "Кол-во сободных мест",
            valueGetter: (params) => {
                const bigRoom = params.data.roomType === "BIG" ? 3 : undefined
                const littleRoom = params.data.roomType === "LITTLE" ? 2 : undefined
                if(params.data.students.length < bigRoom) {
                    return bigRoom - params.data.students.length
                }
                if(params.data.students.length < littleRoom) {
                    return littleRoom - params.data.students.length
                }
                return 0
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

      const gridOptions = {
        onRowClicked: event => {
          console.log(event.data);
          setSelectedRoomThunk([event.data]);
        }
    }


  return (
    <div style={containerStyle}>

        <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
                ref={gridRef}
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
                // onGridReady= {onGridReady}
                gridOptions = {gridOptions}
            />
        </div>
    </div>
    
    
  )
}

let mapStateToProps = (state) => {
    return {
      rooms: state.mainPage.rooms,
      selectedRoom:state.additional.room
      // students: state.mainPage.students,
    };
  };
  
  export default connect(mapStateToProps, {
    getRoomsThunk,
    setRoomThunk,
    deleteRoomsThunk,
    setSelectedRoomThunk
  })(PopulationGrid);
