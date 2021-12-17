import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import AddPage from "./pages/AddPage/AddPage";
import AppPage from "./pages/AppPage/AppPage";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="add" element={<AddPage />} />
          <Route path="/" element={<AppPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
