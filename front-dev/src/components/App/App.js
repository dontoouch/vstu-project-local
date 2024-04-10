import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login.js";
import AuthProvider from "../../hoc/AuthProvider";
import RequireAuth from "../../hoc/RequireAuth";
import Layout from "../Layout";

import GridExample from "../Grid/Grid";
import Characteristic from "../Characteristic/index.jsx";
import Population from "../Population/Population.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />}></Route>
          <Route path="/main" element={
              <RequireAuth role={["USER", "HEAD_OF_DEPARTMENT", "RECTOR"]}>
                <GridExample/>
              </RequireAuth>
            }
          />
          <Route path="char" element={<Characteristic/>}/>
          <Route path="population" element={<Population />}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
