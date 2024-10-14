import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import ViewTickets from "views/tickets/ViewTickets.jsx";
import UserTickets from "views/tickets/UserTicket.jsx";
import TicketDetail from "views/tickets/TicketDetail.jsx"





const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="*" element={<Navigate to="/admin/index" replace />} />
        
        {/* <Route path="/admin/tickets" element={<ViewTickets/>} /> */}
      <Route path="/admin/tickets" element={<ViewTickets/>}/>
      <Route path="/user/tickets" element={<UserTickets/>}/>
      <Route path="/admin/tickets/:id" element={<TicketDetail/>}/>


      </Routes>
    </BrowserRouter>
  </Provider>
);
