import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//IMPORT SCREENS
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Cart from "./pages/Cart";
import GameDetails from "./pages/GameDetails";
import GameCRUD from "./pages/GameCRUD";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/review-details" element={<Game />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/GameCRUD" element={<GameCRUD />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
