import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function fetchClubs() {
            setLoading(true);
            try {
                const res = await axios.get("/api/clubs");
                if (!mounted) return;
                setClubs(res.data || []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        err.response?.data?.error ||
                        t("Impossible de charger les clubs")
                );
            } finally {
                setLoading(false);
            }
        }

        fetchClubs();
        return () => {
            mounted = false;
        };
    }, []);

    async function handleDelete(id) {
        if (!confirm(t("Voulez-vous vraiment supprimer ce club ?"))) return;
        try {
            const token = localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            await axios.delete(`/api/clubs/${id}`, { headers });
            setClubs((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            alert(err.response?.data?.error || t("Suppression échouée"));
        }
    }

    if (loading)
        return <div className="container">Chargement des clubs...</div>;
    if (error)
        return (
            <div className="container">
                <div className="alert alert-danger">{error}</div>
            </div>
        );

    return (
        <>
            <h1 className="hero-title">{t("Voici equipes")}</h1>
            <div className="container">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="display-6">{t("ListeClub")}</h2>
                        <Link to="/clubs/create" className="btn btn-primary">
                            {t("AjouterClub")}
                        </Link>
                    </div>
                </div>

                {clubs.length === 0 && <div>{t("NoClubs")}</div>}

                <div className="club-list">
                    {clubs.map((club) => (
                        <div key={club.id} className="club-card">
                            <div className="card h-100">
                                <div className="card-body d-flex">
                                    <div className="club-meta">
                                        <Link to={`/clubs/${club.id}`}>
                                            <h5 className="club-name">
                                                {club.name}
                                            </h5>
                                        </Link>
                                        <p className="text-muted mb-0">
                                            {club.city}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
