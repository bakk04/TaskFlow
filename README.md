# Compte Rendu TP 1 : Next.js - Du CSR au SSR

**Réalisé par :** Younes Bakkali Terghi  
**Établissement :** EMSI Rabat - 4ème année Ingénierie Informatique et Réseaux (Filière DISI)  
**Module :** Développement Front-End  
**Projet :** TaskFlow Next

---

## Objectif du TP

Comprendre la transition d'une architecture React classique (Client-Side Rendering) vers Next.js 14+ (Server-Side Rendering), en explorant le routing par dossiers, la différence entre Server et Client Components, et les requêtes de données sans `useEffect`.

---

## Réponses aux questions d'analyse

### Partie 1 : Architecture et structure

**Q1 : Comparez la structure de votre projet React (Vite) avec Next.js. Quelles différences ?**
- En React, le routing est géré manuellement avec `react-router-dom`.
- En Next.js, le routing est basé sur la structure des dossiers dans `app/`.
- Le dossier `src/` est remplacé par `app/`.
- La configuration diffère entre `vite.config.ts` et `next.config.ts`.

---

### Partie 2 : Routing par dossiers

**Q2 : Combien de fichiers avez-vous créés pour la route Login ?**
- Un seul fichier : `app/login/page.tsx`.
- En React Router, la route doit être définie manuellement dans `App.tsx`.

**Q3 : En Next.js, comment l’ID est-il récupéré par rapport à `useParams()` en React ?**
- En React : utilisation de `useParams()`.
- En Next.js : utilisation de `params` passés automatiquement au composant serveur.

---

### Partie 3 : Server Component et Fetch

**Q5 : En React SPA, combien de lignes fallait-il pour charger les projets ? Et en Next.js ?**
- En React SPA : utilisation de `useState`, `useEffect`, `fetch`, gestion du loading.
- En Next.js : requête directe dans une fonction async côté serveur avec beaucoup moins de code.

**Q6 : Observe-t-on la requête GET /projects dans le Network ? Pourquoi ?**
- Non.
- La requête est exécutée côté serveur, le navigateur reçoit directement le HTML rendu.

---

### Partie 4 : Client Component

**Q7 : Pourquoi faut-il `use client` pour Login et pas pour Dashboard ?**
- Login nécessite des interactions utilisateur (state, événements).
- Dashboard est un composant serveur sans interaction DOM.

**Q8 : Quel est l’équivalent de `useNavigate()` en Next.js ?**
- `useRouter()` du module `next/navigation`.

---

### Partie 5 : SSR et rendu

**Q9 : Que contient le HTML dans React SPA ?**
- Un conteneur vide `<div id="root"></div>`.

**Q10 : Que contient le HTML dans Next.js ?**
- Les données sont déjà présentes dans le HTML généré côté serveur.
- Cela améliore le SEO et le temps de chargement initial.

---

### Partie 6 : Structure et architecture Next.js

**Q11 : Pourquoi le Header ne se remonte pas entre les pages ?**
- Il est défini dans `layout.tsx` qui persiste entre les navigations.

**Q12 : Où créer un layout spécifique pour le Dashboard ?**
- Dans `app/dashboard/layout.tsx`.

**Q13 : Un Server Component peut-il utiliser `onClick` ?**
- Non, car il n’a pas accès au DOM ni aux événements utilisateur.

**Q14 : Faut-il transformer toute la page pour ajouter un bouton interactif ?**
- Non, il faut créer un composant client séparé.

**Q15 : Avantage sécurité du fetch côté serveur Next.js**
- Le backend reste caché au client.
- Les appels API ne sont pas exposés dans le navigateur.