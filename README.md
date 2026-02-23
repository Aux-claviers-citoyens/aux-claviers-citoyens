# ACC

Plateforme de tournois avec un backend Python (FastAPI) et un frontend Nuxt 4.

## Structure
- `backend/` : API, logique metier, modeles, migrations Alembic, tests.
- `frontend/` : application Nuxt, pages, composants, tests.
- `docker-compose.yml` : stack locale (backend, frontend, Postgres).

## Demarrage rapide (Docker)
```bash
docker compose up --build
```
- Frontend: http://localhost:8080
- Backend: http://localhost:8400

## Developpement local
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

## Tests et qualite
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
Les variables d'environnement sont definies dans `docker-compose.yml` et `backend/ci.env`.
Ne pas committer de secrets; utiliser des valeurs factices et documenter les variables requises.
Le frontend expose une couche de service pour basculer entre deux backends. Verifier la config
dans `frontend/services` et ajuster les variables/URLs ciblees selon l'environnement.