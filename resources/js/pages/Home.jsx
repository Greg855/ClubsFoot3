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
                            <div className="card h-100 shadow-sm">
                                <div className="card-body p-3">
                                    <div className="d-flex align-items-center">
                                        {club.image && (
                                            <div className="me-3 d-none d-md-block">
                                                <img src={club.image.startsWith('http') ? club.image : `/storage/${club.image}`} alt={club.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
                                            </div>
                                        )}

                                        <div className="club-meta">
                                            <Link to={`/clubs/${club.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <h4 className="club-name mb-1 fw-bold" style={{ fontSize: '1.15rem' }}>{club.name}</h4>
                                            </Link>
                                            <p className="text-muted mb-0 small">{club.city}</p>
                                        </div>

                                        <div className="ms-auto d-flex align-items-center">
                                            <Link to={`/clubs/${club.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Éditer</Link>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(club.id)}>Supprimer</button>
                                        </div>
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
