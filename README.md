# Compte Rendu TP 2 : Server Actions, API Routes & Authentification

**Étudiant :** Younes Bakkali Terghi  
**Module :** Développement Front-End (Next.js)  
**Projet :** TaskFlow Next (Séance 2)

---

## 1. Introduction
Ce TP consistait à faire évoluer l'application **TaskFlow** d'une architecture orientée client vers une architecture Fullstack utilisant les fonctionnalités avancées de Next.js 15 : les **Server Actions** pour les mutations, les **API Routes** pour remplacer un backend externe, et une gestion d'**authentification sécurisée** par cookies.

---

## 2. Réponses aux Questions d'Analyse

### Partie 1 : Server Actions - Ajout de projet
**Q1 : En React SPA, que fallait-il faire après un POST pour voir le nouveau projet ? (indice : setProjects). Ici ?**
- En React SPA, il fallait gérer un état local avec `useState` et mettre à jour le tableau manuellement (ex: `setProjects([...projects, newProject])`) ou relancer un `useEffect`.
- Avec Next.js et les Server Actions, on utilise `revalidatePath('/dashboard')`. Cela demande au serveur d'invalider le cache de la page et de renvoyer les données fraîches, sans aucune gestion d'état manuelle côté client.

### Partie 2 : Server Actions - CRUD
*(Note : Le document passe directement à Q3)*

**Q3 : Le bouton supprimer est un `<form>` avec un `<input type="hidden">`. Pourquoi pas un `onClick` ?**
- Le Dashboard est un **Server Component**. Les Server Components ne supportent pas les gestionnaires d'événements interactifs comme `onClick`. 
- L'utilisation d'un formulaire est la méthode native du web pour envoyer des données au serveur. Cela permet à l'action d'être traitée par le serveur de manière robuste, même avant que le JavaScript ne soit totalement chargé sur le client (Progressive Enhancement).

### Partie 3 : API Routes - Backend intégré
**Q4 : Testez http://localhost:3000/api/projects dans le navigateur. Que voyez-vous ?**
- On observe le contenu brut du fichier `db.json` au format JSON. Cela confirme que notre API Route fonctionne correctement et expose les données des projets via un endpoint REST standard.

**Q5 : Quelle est la différence entre une API Route et une Server Action ?**
- **API Route :** C'est un point de terminaison HTTP public (REST) qui peut être appelé par n'importe quel client (mobile, navigateur, autre serveur). Elle utilise les méthodes standards (GET, POST, PUT, DELETE).
- **Server Action :** C'est une fonction asynchrone interne à Next.js, appelée via une requête POST spécifique gérée par le framework. Elle est plus simple à intégrer aux formulaires et permet une revalidation automatique du cache UI.

### Partie 4 : Authentification avec cookies
**Q6 : Comparez ce Login avec celui de React SPA. Combien de useState en moins ?**
- On économise environ **4 hooks useState**. Au lieu de gérer `email`, `password`, `loading` et `error` séparément, on utilise le hook `useActionState` qui centralise tout l'état du formulaire dans un seul objet `state` retourné par la Server Action.

**Q7 : Après le login, voyez-vous le cookie 'session' ? Pouvez-vous le lire avec document.cookie ?**
- Le cookie est visible dans l'onglet "Application" des outils de développement.
- Cependant, il est **impossible** de le lire via `document.cookie` dans la console car il est marqué comme `httpOnly`. C'est une sécurité majeure contre le vol de session par injection de scripts (XSS).

### Partie 5 : Middleware
**Q8 : En React SPA, ProtectedRoute affichait brièvement le Dashboard avant de rediriger. Ici, que se passe-t-il ?**
- Il n'y a aucun "flash" de contenu. Le **Middleware** intercepte la requête côté serveur avant même que le rendu de la page ne commence. Si l'utilisateur n'est pas authentifié, il est redirigé immédiatement.

**Q9 : Le middleware.ts est à la racine, pas dans app/. Pourquoi ?**
- Le middleware est une fonctionnalité de bas niveau qui doit s'appliquer à l'ensemble du projet (pages, API, fichiers statiques). Sa position à la racine lui permet d'intercepter toutes les requêtes avant qu'elles n'arrivent dans le système de routage du dossier `app/`.

### Partie 6 : Logout & Layout
**Q10 : Le layout est un Server Component. Il lit le cookie DIRECTEMENT avec cookies(). En React SPA, comment faisait-on ?**
- En SPA, on devait souvent utiliser un `Context Provider` (AuthContext) qui entourait l'application, et vérifier l'état dans un `useEffect` après le chargement de la page, ce qui créait une dépendance au côté client.

---

## 3. Questions de Réflexion (Partie 7)

**Q11 : Server Actions vs API Routes — lequel utiliseriez-vous pour un formulaire de création de projet ? Pour une app mobile ?**
- Pour le **formulaire web** : Server Action, car elle est optimisée pour Next.js et simplifie la revalidation de l'UI.
- Pour l'**app mobile** : API Route, car elle fournit un endpoint REST standard que l'application mobile peut consommer facilement.

**Q12 : Avantage de sécurité de Next.js (cookies + middleware) vs React SPA ?**
- La sécurité est renforcée car les secrets (JWT ou données de session) ne sont jamais stockés dans le stockage local (localStorage) accessible par JS. Le middleware garantit une protection au niveau du réseau serveur, rendant les contournements beaucoup plus difficiles.

**Q13 : Si vous arrêtez json-server, les API Routes fonctionnent-elles toujours ? Pourquoi ?**
- Oui, car les API Routes que nous avons créées lisent et écrivent directement dans `db.json` via le module `fs` de Node.js. Nous n'avons plus besoin de dépendance externe pour le stockage des données.

**Q14 : Le cookie est HttpOnly. Un script XSS injecté dans la page peut-il le voler ?**
- Non. Le navigateur bloque tout accès au cookie via `document.cookie` pour les scripts. Le jeton de session reste donc à l'abri des attaques par injection.

---

## 4. Structure Finale du Projet
Conformément au récapitulatif du TP, la structure est la suivante :
- `app/actions/` : Logique serveur (Projets & Auth).
- `app/api/` : Endpoints REST internes.
- `app/components/` : Composants UI réutilisables (LogoutButton).
- `middleware.ts` : Protection des routes.
- `db.json` : Base de données locale.
