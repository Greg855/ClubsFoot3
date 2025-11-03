Placez ici les images à utiliser par le thème (je ne peux pas copier vos fichiers depuis votre dossier Téléchargements).

Recommandation :
- Copiez l'image principale du bandeau (ex : premierleague.webp) dans ce dossier et nommez-la `premierleague.webp`.
- Pour les images de clubs, copiez-les dans ce dossier et utilisez un nom clair (ex : `grizzlies.jpeg`, `salleClasse.png`). Les vues du site utilisent l'URL `/images/<nom-du-fichier>` ou les uploads sont stockés dans `storage/app/public/images` et accessibles via `/storage/images/<nom>` si vous avez lancé `php artisan storage:link`.

Exemples d'usage :
- Hero banner : `/images/premierleague.webp`
- Club card thumbnail (manuellement): `/images/grizzlies.jpeg`

Après avoir copié les images, rechargez la page dans le navigateur. Si vous utilisez des fichiers uploadés via le formulaire, assurez-vous que `php artisan storage:link` a été exécuté pour exposer `storage/app/public` en `public/storage`.

Si vous voulez, je peux ajouter automatiquement les images au projet si vous me fournissez les fichiers image ici (upload), ou je peux vous guider pour les copier depuis votre ordinateur vers ce dossier.
