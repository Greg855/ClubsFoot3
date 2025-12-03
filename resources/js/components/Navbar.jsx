import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function Navbar() {
    const { t } = useTranslation();
    const isLoggedIn = window?.laravel?.isLoggedIn ?? false;
    const [current, setCurrent] = useState(i18n.language || "en");
    console.log(t("AucunResultat"));
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

    const languages = [
        { code: "fr", label: "Français", flag: "/images/fr.png" },
        { code: "en", label: "English", flag: "/images/en.png" },
        { code: "jp", label: "日本語", flag: "/images/jp.png" },
    ];

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img
                        src="/images/premierleague.webp"
                        width="64"
                        height="56"
                        alt="logo"
                        style={{ marginRight: 12 }}
                    />
                    <span>{t("PremierLeague")}</span>
                </a>
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
                {/* LANGUE */}{" "}
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

                    {!isLoggedIn ? (
                        <div className="nav-item">
                            <a className="nav-link text-light" href="/login">
                                {t("Connexion")}
                            </a>
                            <a className="nav-link text-light" href="/register">
                                {t("Inscription")}
                            </a>
                        </div>
                    ) : (
                        <div className="nav-item">
                            <a
                                className="nav-link text-light"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .getElementById("logout-form")
                                        ?.submit();
                                }}
                            >
                                {t("Deconnexion")}
                            </a>
                        </div>
                    )}
                    <div className="nav-item">
                        <a className="nav-link text-light" href="/apropos">
                            {t("Apropos")}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
