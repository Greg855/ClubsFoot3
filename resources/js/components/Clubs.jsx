import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowClub({ clubId: propClubId }) {
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getIdFromPath() {
        if (propClubId) return propClubId;
        const parts = window.location.pathname.split('/').filter(Boolean);
        const idx = parts.indexOf('clubs');
        if (idx !== -1 && parts.length > idx + 1) return parts[idx + 1];
        return parts.length ? parts[parts.length - 1] : null;
    }

    const id = getIdFromPath();

    useEffect(() => {
        if (!id) {
            setError('Club id not found in URL');
            setLoading(false);
            return;
        }

        let mounted = true;

        async function fetchClub() {
            setLoading(true);
            try {
                const res = await axios.get(`/api/clubs/${id}`);
                if (!mounted) return;
                setClub(res.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'Failed to load club');
            } finally {
                setLoading(false);
            }
        }

        fetchClub();

        return () => { mounted = false };
    }, [id, propClubId]);

    async function handleDelete() {
        if (!confirm('Voulez-vous vraiment supprimer ce club ?')) return;
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            await axios.delete(`/api/clubs/${id}`, { headers });
            // Redirect to home after delete
            window.location.href = '/';
        } catch (err) {
            alert(err.response?.data?.error || 'Delete failed');
        }
    }

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!club) return <div>Aucun club trouvé.</div>;

    return (
        <div className="container">
            <div className="d-flex align-items-center mb-3">
                {club.image && (
                    <img src={club.image.startsWith('http') ? club.image : `/storage/${club.image}`} alt={club.name} className="rounded me-3" style={{ width: 96, height: 96, objectFit: 'cover' }} />
                )}
                <div>
                    <h1 className="mb-0">{club.name}</h1>
                    <small className="text-muted">Créé le: {new Date(club.created_at).toLocaleString()}</small>
                </div>
            </div>

            <div className="mb-3">
                <h4>Statistiques de l'équipe :</h4>
                <ul>
                    <li>Matches joués: {club.matches_played}</li>
                    <li>Matches gagnés: {club.matches_won}</li>
                    <li>Matches perdus: {club.matches_lost}</li>
                    <li>Matches nuls: {club.matches_drawn}</li>
                </ul>
            </div>

            <div className="buttons mb-3">
                {/* Show edit/delete only if current user is owner/admin (backend also enforces this) */}
                {club.can_edit && (
                    <>
                        <a href={`/clubs/${id}/edit`} className="btn btn-info me-2">Modifier</a>
                        <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                    </>
                )}
                <a href="/" className="btn btn-secondary ms-2">Retour</a>
            </div>

            <div>
                <h2>Joueurs</h2>
                {club.joueurs && club.joueurs.length ? (
                    club.joueurs.map(j => (
                        <div key={j.id} className="mb-2">
                            <h5>{j.name} (#{j.id})</h5>
                            <p><strong>Poste:</strong> {j.position} • <strong>Pays:</strong> {j.country}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucun joueur enregistré.</p>
                )}
            </div>
        </div>
    );
}
