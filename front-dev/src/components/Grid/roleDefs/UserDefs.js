export const userDefs = [
    {
      headerName: "Номер общежития",
      field: "hostel",
      editable: false,
      rowGroup: true,
      hide: true,
      valueGetter: (params) => {
        if (params.data.hostel === "HOSTEL_2") {
          return "№2";
        }
        if (params.data.hostel === "HOSTEL_3") {
          return "№3";
        }
        return "unknown";
      },
    },
    { headerName: "Этаж", field: "floor", editable: false },
    {
      headerName: "ФИО",
      valueGetter: (params) => {
        if (params.data === undefined) {
          return "";
        }
        return params.data.students !== undefined
          ? `${params.data.students.surname} ${params.data.students.name} ${params.data.students.patronymic}`
          : "Нет данных";
      },
      cellEditor: "agSelectCellEditor",
  
      //   cellEditorParams: {
      //     values: rooms.map((item) =>
      //       item.students !== undefined
      //         ? `${item.students.surname} ${item.students.name} ${item.students.patronymic}`
      //         : "Нет данных"
      //     ),
      //   },
      //   valueSetter: (params) => {
      //     params.data.name = params.newValue;
      //     params.data.surname = params.newValue;
      //     params.data.patronymic = params.newValue;
      //     return true;
      //   },
    },
  
    {
      headerName: "№ комнаты",
      field: "roomNumber",
      type: "numberColumn",
      editable: false,
    },
  
    {
      headerName: "Тип комнаты",
      field: "roomType",
      valueGetter: (params) => {
        if (params.data === undefined) {
          return "";
        }
        if (params.data.roomType === "LITTLE") {
          return "М";
        }
        if (params.data.roomType === "BIG") {
          return "Б";
        }
        if (params.data.roomType === "Б") {
          return "Б";
        }
        if (params.data.roomType === "М") {
          return "М";
        }
        return "unknown";
      },
      valueSetter: (params) => {
        params.data.roomType = params.newValue;
        return true;
      },
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["М", "Б"],
      },
    },
  ];
  
  export default userDefs;
  