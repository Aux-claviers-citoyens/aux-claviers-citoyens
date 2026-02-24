# ACC

Plateforme de tournois e-sport, portée par un backend Python (FastAPI) et un frontend Nuxt 4.

## Organisation du projet
Projet en collaboration entre des étudiants en BTS et des militaires.
- Les étudiants BTS sont missionnés pour créer le backend de l’application.
- Les militaires développent le front.

Le backend actuel est temporaire et a vocation à être remplacé par le backend des BTS conforme au cahier des charges.

## Contexte
Dans le cadre du projet Aux Claviers Citoyens, l’application doit permettre de compter le score des
parties, de gérer les tournois et leurs participants, et de proposer une expérience connectée à des
objets numériques.

## Objectifs
L’application doit permettre :
- La gestion de l’authentification
- La gestion des utilisateurs
- La gestion du tournoi (création, modification, affichage des résultats, …)
- La gestion des équipes
- La gestion des matchs

Un bonus prévoit la réalisation d’un « front-end » inspiré de la maquette fournie ou d’une
interface alternative.

## Périmètre fonctionnel (contrat d’API)
Le contrat d’API couvre les domaines suivants :
- Authentification (OAuth2 Password Token, login, inscription, utilisateur courant)
- Utilisateurs (récupération, mise à jour des informations, changement de mot de passe)
- Tournois (liste, création, lecture, mise à jour, suppression)
- Équipes (liste par tournoi, création, lecture, mise à jour, suppression)
- Rounds et matchs (liste des rounds, lecture d’un round, liste des matchs, lecture d’un match, mise à jour des points)

### Endpoints (contrat d’API)
Base : `/api/v1`
- `/auth/token`
- `/auth/login`
- `/auth/register`
- `/auth/me`
- `/users/{userId}`
- `/users/{userId}/password`
- `/tournaments`
- `/tournaments/{tournamentId}`
- `/tournaments/{tournamentId}/teams`
- `/tournaments/{tournamentId}/teams/{teamId}`
- `/tournaments/{tournamentId}/rounds`
- `/tournaments/{tournamentId}/rounds/{roundId}`
- `/tournaments/{tournamentId}/matches`
- `/tournaments/{tournamentId}/matches/{matchId}`
- `/tournaments/{tournamentId}/matches/{matchId}/point`

## Structure du projet
- `backend/` : API, logique métier, modèles, migrations Alembic, tests.
- `frontend/` : application Nuxt, pages, composants, tests.
- `docker-compose.yml` : stack locale (backend, frontend, Postgres).

## Démarrage rapide (Docker)
```bash
docker compose up --build
```
- Frontend : http://localhost:8080
- Backend : http://localhost:8400

## Développement local
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pipenv install
pipenv run pytest
```

## Tests et qualité
### Frontend
```bash
cd frontend
npm run test:unit
npm run format
```

### Backend
```bash
cd backend
pytest
bash check.sh
bash precommit.sh
```

## Configuration
Les variables d’environnement sont définies dans `docker-compose.yml` et `backend/ci.env`.
Ne pas committer de secrets ; utiliser des valeurs factices et documenter les variables requises.
Le frontend expose une couche de service pour basculer entre deux backends. Vérifier la config
dans `frontend/services` et ajuster les variables/URLs ciblées selon l’environnement.

## Ressources
- Cahier des charges : `CdC ACC.md`
