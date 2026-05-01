# TaskFlow Next.js

TaskFlow est une application de gestion de projets collaborative construite avec Next.js 15+, TypeScript, et Prisma.

## Fonctionnalités (Séance 3 - Full-Stack & Performance)

- **Backend Intégré (Prisma + SQLite)** : Migration complète de `json-server` vers une base de données SQLite gérée par l'ORM Prisma.
- **Server Actions & API Routes** : Gestion du CRUD (Create, Read, Update, Delete) pour les projets.
- **Authentification par Cookies** : Système de session sécurisé avec `httpOnly` cookies et Middleware pour la protection des routes.
- **Optimisations de Performance** :
  - **`next/font`** : Utilisation de la police Inter optimisée localement.
  - **`next/image`** : Chargement optimisé des images dans la page 404.
  - **Streaming & Suspense** : Utilisation de `loading.tsx` pour un affichage progressif du Dashboard.
  - **Error Boundaries** : Gestion robuste des erreurs avec `error.tsx`.
- **Static Site Generation (SSG)** : Pré-génération des pages de projet avec `generateStaticParams` pour des performances optimales.

## Installation

1. Clonez le dépôt.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez la base de données Prisma :
   ```bash
   npx prisma migrate dev --name init
   ```
4. Insérez les données initiales (Seed) :
   ```bash
   npx tsx prisma/seed.ts
   ```

## Utilisation

Lancer le serveur de développement :
```bash
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

### Identifiants de test
- **Email** : `admin@taskflow.com`
- **Mot de passe** : `password123`

## Structure du Projet

- `app/` : Routes, layouts, et composants Next.js (App Router).
- `app/actions/` : Server Actions pour les mutations de données.
- `app/api/` : Endpoints API pour les intégrations externes.
- `lib/prisma.ts` : Singleton client Prisma.
- `prisma/` : Schéma de base de données et fichiers de migration.
- `public/` : Assets statiques (images, etc.).
