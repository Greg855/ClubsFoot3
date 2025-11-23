import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function fetchClubs() {
            setLoading(true);
            try {
                const res = await axios.get('/api/clubs');
                if (!mounted) return;
                setClubs(res.data || []);
            } catch (err) {
                setError(err.response?.data?.message || err.response?.data?.error || 'Impossible de charger les clubs');
            } finally {
                setLoading(false);
            }
        }

        fetchClubs();
        return () => { mounted = false };
    }, []);

    async function handleDelete(id) {
        if (!confirm('Voulez-vous vraiment supprimer ce club ?')) return;
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            await axios.delete(`/api/clubs/${id}`, { headers });
            setClubs(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            alert(err.response?.data?.error || 'Suppression échouée');
        }
    }

    if (loading) return <div className="container">Chargement des clubs...</div>;
    if (error) return <div className="container"><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Clubs</h1>
                <a className="btn btn-primary" href="/clubs/create">Ajouter un club</a>
            </div>

            {clubs.length === 0 && (
                <div>Aucun club trouvé.</div>
            )}

            <div className="row">
                {clubs.map(club => (
                    <div key={club.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            {club.image && (
                                <img
                                    src={club.image.startsWith('http') ? club.image : `/storage/${club.image}`}
                                    className="card-img-top"
                                    alt={club.name}
                                    style={{ height: 160, objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{club.name}</h5>
                                <p className="card-text text-muted">{club.city}</p>
                                <p className="mb-2">Matches: {club.matches_played} • W: {club.matches_won} • L: {club.matches_lost}</p>
                                <div className="mt-auto d-flex">
                                    <a href={`/clubs/${club.id}`} className="btn btn-sm btn-outline-primary me-2">Voir</a>
                                    {club.can_edit && (
                                        <>
                                            <a href={`/clubs/${club.id}/edit`} className="btn btn-sm btn-info me-2">Modifier</a>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(club.id)}>Supprimer</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
