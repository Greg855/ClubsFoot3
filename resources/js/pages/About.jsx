import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="container py-4">
            <h1>À propos</h1>

            <h4>Auteurs : Greg et Anas</h4>

            <p>
                <strong>
                    420-267 MO — Développer un site Web et une application pour
                    Internet
                </strong>
                <br />
                Automne 2021, Collège Montmorency
            </p>

            <h5>Procédure de vérification (étapes d'utilisation typiques)</h5>
            <ol>
                <li>
                    Accéder à l'application : ouvrir la page d'accueil (`/`).
                    Attendu : la liste des clubs s'affiche (si des données
                    existent) et la barre de navigation est visible.
                </li>
                <li>
                    Rechercher un club : utiliser le champ de recherche dans la
                    barre de navigation, saisir un nom de club et cliquer sur
                    "Rechercher". Attendu : résultats filtrés ou message
                    indiquant l'absence de résultats.
                </li>
                <li>
                    Consulter un club : cliquer sur un club dans la liste pour
                    aller sur sa page détail (`/clubs/:id`). Attendu : affichage
                    des infos du club (nom, ville, statistiques, image si
                    présente) et, si applicable, la liste des joueurs liés.
                </li>
                <li>
                    Ajouter un club : (si connecté) aller sur `/clubs/add`,
                    remplir le formulaire et soumettre. Attendu : nouveau club
                    créé et redirection vers la liste ou la page du club. Si la
                    création échoue, des messages d'erreur doivent s'afficher.
                </li>
                <li>
                    Modifier / supprimer un club : (si connecté) utiliser les
                    actions d'édition ou suppression depuis la page du club ou
                    la liste. Attendu : modifications persistées en base;
                    suppression retire l'enregistrement.
                </li>
                <li>
                    Gestion des joueurs : depuis la page d'un club, vérifier la
                    création, modification et suppression de joueurs associés.
                    Attendu : la relation club ↔ joueurs fonctionne (joueurs
                    affichés, ajoutés et supprimés correctement).
                </li>
                <li>
                    Authentification : tester l'inscription (`/register`) et la
                    connexion (`/login`). Attendu : accès aux fonctionnalités
                    réservées après authentification (ex.
                    ajouter/éditer/supprimer).
                </li>
                <li>
                    Changement de langue : utiliser le sélecteur de langue dans
                    la barre de navigation. Attendu : textes traduits lorsque la
                    langue est disponible.
                </li>
            </ol>

            <h5>Résultats attendus et comportement en cas d'erreur</h5>
            <ul>
                <li>
                    Les actions CRUD (Créer, Lire, Mettre à jour, Supprimer)
                    doivent renvoyer un message de succès ou d'erreur clair.
                </li>
                <li>
                    Si une action ne fonctionne pas, vérifier la console du
                    navigateur pour des erreurs JS et le serveur Laravel pour
                    des erreurs PHP/SQL.
                </li>
                <li>
                    Si la recherche ne retourne rien, un message type "Aucun
                    résultat" doit apparaître.
                </li>
                <li>
                    Les images sont optionnelles : si elles manquent, une image
                    par défaut ou un espace vide est toléré.
                </li>
            </ul>

            <h5>Diagramme de la base de données actuelle</h5>
            <pre
                style={{
                    background: "#f8f9fa",
                    border: "1px solid #ddd",
                    padding: 10,
                    whiteSpace: "pre-wrap",
                }}
            >
                Users - id (PK) - name - email - password - email_verified_at -
                remember_token - created_at - updated_at Clubs - id (PK) - name
                - city - matches_played - matches_won - matches_lost -
                matches_drawn - image (nullable) - created_at - updated_at
                Joueurs - id (PK) - position - name - matches_played - country -
                clubs_id (FK -> clubs.id) - image (nullable) - created_at -
                updated_at Relations : - `joueurs.clubs_id` référençant
                `clubs.id` (ON DELETE CASCADE, ON UPDATE CASCADE) - (Remarque)
                `clubs.user_id` est commenté dans la migration : pas de relation
                explicite vers `users` pour l'instant.
            </pre>

            <h5>Remarques finales</h5>
            <p>
                Ces étapes permettent de vérifier les exigences du TP3 :
                navigation, CRUD, authentification, recherche et relations de la
                base de données.
            </p>

            <Link to="/" className="btn btn-secondary">
                Retour à l'accueil
            </Link>
        </div>
    );
}
