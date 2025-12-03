// resources/js/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Clubs from "./components/Clubs";
import AddClub from "./components/AddClub";
import EditClub from "./components/EditClub";
import ShowClub from "./components/ShowClub";
import "../css/app.css";
import "./i18n";
import AuthContext from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        try {
            const { exp } = jwtDecode(token);
            if (!(exp * 1000 > Date.now())) {
                localStorage.removeItem("token");
                return false;
            }
        } catch (err) {
            console.error("Invalid token", err);
            localStorage.removeItem("token");
            return false;
        }
        return true;
    });

    const login = (token) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/clubs" element={<Clubs />} />
                    <Route path="/clubs/create" element={<AddClub />} />
                    <Route path="/clubs/:id/edit" element={<EditClub />} />
                    <Route path="/clubs/:id" element={<ShowClub />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Layout>
        </AuthContext.Provider>
    );
};

export default App;
