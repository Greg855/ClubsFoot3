import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import i18n from "../i18n";
import axios from "axios";
import { AuthContext } from "../AuthContext";

export default function Navbar() {
    const { t } = useTranslation();
    const authContext = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [current, setCurrent] = useState(i18n.language || "en");

    useEffect(() => {
        const handleChange = (lng) => setCurrent(lng);
        i18n.on("languageChanged", handleChange);
        return () => i18n.off("languageChanged", handleChange);
    }, []);

    const changeLanguage = async (lang) => {
        try {
            const response = await fetch(`/lang/${lang}`, {
                method: "GET",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                },
            });
            if (response.ok) {
                i18n.changeLanguage(lang);
            }
        } catch (error) {
            console.error("Failed to change language:", error);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "/api/logout",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            authContext.logout();
            navigate("/");
        }
    };

    const languages = [
        { code: "fr", label: "Français", flag: "/images/fr.png" },
        { code: "en", label: "English", flag: "/images/en.png" },
        { code: "jp", label: "日本語", flag: "/images/jp.png" },
    ];

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/images/premierleague.webp"
                        width="64"
                        height="56"
                        alt="logo"
                        style={{ marginRight: 12 }}
                    />
                    <span>{t("PremierLeague")}</span>
                </Link>
                <div className="form-group">
                    <input
                        type="text"
                        className="typeahead form-control"
                        id="club_search"
                        name="query"
                        placeholder={t("Rechercher") + "..."}
                    />
                    <button type="submit" className="btn btn-primary">
                        {t("Rechercher")}
                    </button>
                </div>
                {/* LANGUE */}
                <div className="navbar-nav ms-auto">
                    <div className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="languageDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src={
                                    languages.find((l) => l.code === current)
                                        ?.flag
                                }
                                width="30"
                                height="20"
                                alt="lang"
                            />
                        </a>

                        <ul
                            className="dropdown-menu"
                            aria-labelledby="languageDropdown"
                        >
                            {languages.map((lng) => (
                                <li key={lng.code}>
                                    <button
                                        className="dropdown-item d-flex align-items-center"
                                        onClick={() => changeLanguage(lng.code)}
                                    >
                                        <img
                                            src={lng.flag}
                                            width="30"
                                            height="20"
                                            alt={lng.label}
                                            className="me-2"
                                        />
                                        {lng.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {!authContext.isLoggedIn ? (
                        <div className="nav-item">
                            <Link className="nav-link text-light" to="/login">
                                {t("Connexion")}
                            </Link>
                            <Link
                                className="nav-link text-light"
                                to="/register"
                            >
                                {t("Inscription")}
                            </Link>
                        </div>
                    ) : (
                        <div className="nav-item">
                            <a
                                className="nav-link text-light"
                                href="#"
                                onClick={handleLogout}
                            >
                                {t("Deconnexion")}
                            </a>
                        </div>
                    )}
                    <div className="nav-item">
                        <Link className="nav-link text-light" to="/about">
                            {t("Apropos")}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
