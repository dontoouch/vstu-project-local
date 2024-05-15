export const adminDefs = [
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
  {
    headerName: "Ин.студент",
    valueGetter: (params) => {
      return params.data?.students?.foreignStudent === true
        ? "Да"
        : params.data?.students?.foreignStudent === false
        ? "Нет"
        : "";
    },
  },
  {
    headerName: "Форма обучения",
    valueGetter: (params) => {
      return params.data?.students?.formEducation;
    },
  },
  {
    headerName: "Курс",
    valueGetter: (params) => {
      return params?.data?.students?.group?.currentCourse;
    },
  },
  {
    headerName: "Группа",
    valueGetter: (params) => {
      return params?.data?.students?.group?.name;
    },
  },
  {
    headerName: "Пол",
    valueGetter: (params) => {
      return params?.data?.students?.sex === 0
        ? "Ж"
        : params?.data?.students?.sex === 1
        ? "М"
        : "";
    },
  },
  {
    headerName: "№ факультета",
    valueGetter: (params) => {
      return params?.data?.students?.group?.facultyId;
    },
  },
  {
    headerName: "ДР",
    valueGetter: (params) => {
      return params?.data?.students?.birthDate;
    },
  },
  {
    headerName: "Подтвержденный",
    field: "approved",
    valueGetter: (params) => {
      if (params.data === undefined) {
        return "";
      }
      if (params.data.students.approved === true) {
        return "Да";
      }
      if (params.data.students.approved === false) {
        return "Нет";
      }
      if (params.data.students.approved === "Да") {
        return "Да";
      }
      if (params.data.students.approved === "Нет") {
        return "Нет";
      }

      return "unknown";
    },
    valueSetter: (params) => {
      params.data.students.approved = params.newValue;
      return true;
    },
    type: "booleanColumn",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Да", "Нет"],
    },
  },
  {
    headerName: "Действующая комната",
    field: "status",
    valueGetter: (params) => {
      if (params.data === undefined) {
        return "";
      }
      if (params.data.status === "ACTIVE") {
        return "Да";
      }
      if (params.data.status === "DELETED") {
        return "Нет";
      }
      if (params.data.status === "Да") {
        return "Да";
      }
      if (params.data.status === "Нет") {
        return "Нет";
      }

      return "unknown";
    },
    type: "booleanColumn",
    valueSetter: (params) => {
      params.data.status = params.newValue;
      return true;
    },
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Да", "Нет"],
    },
  },

  // editable: () => JSON.parse(localStorage.user).email === "admin@gmail.com" ? true : false,
];

export default adminDefs;
