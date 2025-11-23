import React from 'react';

export default function About() {
    return (
        <div className="container py-4">
            <h1>About this application</h1>

            <h4>Authors: Greg and Anas</h4>

            <p>
                <strong>420-5H6 MO Transactional Web Applications</strong>
                <br />
                Fall 2025, Collège Montmorency
            </p>

            <h5>Typical usage / verification steps</h5>
            <ol>
                <li>Register or Login via the top-right menu. Expected: successful authentication and redirect to home.</li>
                <li>Open the "List of clubs" and click a club to view details. Expected: club page shows stats and players.</li>
                <li>Use "Add a club" to create a new club. Expected: club appears in the list.</li>
                <li>On a club page: use "Add a player" to attach a player to the club. Expected: player appears on the club show page.</li>
                <li>Edit or delete a club (if you are the owner). Expected: changes persist or the club is removed.</li>
                <li>Switch language from the menu. Expected: UI texts update to the selected language.</li>
            </ol>

            <h5>Database diagram (current schema)</h5>
            <pre style={{ background: '#f8f9fa', border: '1px solid #ddd', padding: 10, whiteSpace: 'pre-wrap' }}>
{`Tables:
- users (id, name, email, user_role, password, remember_token, timestamps)
- clubs (id, name, city, matches_played, matches_won, matches_lost, matches_drawn, user_id -> users.id, image, timestamps)
- joueurs (id, position, name, matches_played, country, clubs_id -> clubs.id, timestamps)

Relationships:
users 1 --- * clubs
clubs 1 --- * joueurs`}
            </pre>

            <h5>References / inspirations</h5>
            <p>Laravel documentation, Bootstrap examples, and various tutorial pages.</p>

            <a href="/" className="btn btn-secondary">Return to the homepage</a>
        </div>
    );
}
