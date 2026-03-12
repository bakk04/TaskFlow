# Réponses aux questions théoriques et corrections - TP 3 : React Router, Axios & CRUD

Ce document contient les réponses aux questions de compréhension ainsi que l'identification des bugs volontaires glissés dans le sujet du TP 3.

## Partie 2 & 3 : Protected Route et Navigation

[cite_start]**Q1 : Pourquoi utiliser le composant `<Navigate />` et pas le hook `Maps()` ici ?** [cite: 526]
* [cite_start]**Réponse :** Dans un composant React (comme `ProtectedRoute`), le rendu (le `return`) doit être déclaratif[cite: 518, 524]. [cite_start]Le composant `<Navigate />` est conçu pour être retourné dans le JSX pour déclencher une redirection de manière déclarative[cite: 524]. Le hook `Maps()`, en revanche, est impératif ; il s'utilise uniquement en réponse à un événement (comme un clic de bouton) ou à l'intérieur d'un `useEffect`, mais jamais directement dans le corps de la fonction de rendu principal.

**Bug Volontaire (Login) :**
* [cite_start]**Problème :** Dans le `useEffect` du composant `Login`, la ligne `if (state.user) navigate(from);` cause un problème dans l'historique de navigation[cite: 540, 574].
* **Correction :** Il faut utiliser `Maps(from, { replace: true });`.

[cite_start]**Q2 : Quelle différence entre `Maps(from)` et `Maps(from, { replace: true })` ?** [cite: 576]
* **Réponse :** * `Maps(from)` ajoute une nouvelle entrée dans la pile d'historique du navigateur (History API). [cite_start]Si l'utilisateur clique sur le bouton "Retour", il reviendra sur la page de Login (ce qui n'est pas logique s'il est déjà connecté)[cite: 574, 575].
    * [cite_start]`Maps(from, { replace: true })` remplace l'entrée actuelle (la page de Login) par la nouvelle cible (`from`) dans l'historique[cite: 576]. Le bouton "Retour" ramènera alors l'utilisateur à la page précédant la tentative de connexion, ce qui correspond au comportement attendu d'un point de vue expérience utilisateur (UX).

---

## Partie 4 : Dashboard & Optimisation d'état

[cite_start]**Q3 : Après un POST, pourquoi fait-on `setProjects(prev => [...prev, data])` plutôt qu'un re-fetch GET ?** [cite: 679]
* **Réponse :** C'est une question d'optimisation (Mise à jour optimiste du DOM). [cite_start]L'API nous renvoie déjà l'objet créé avec son nouvel ID (le `data` du POST)[cite: 625]. En mettant à jour le state localement en ajoutant ce nouvel objet à la liste existante, on évite une requête réseau supplémentaire (le GET), ce qui réduit la charge sur le serveur et rend l'interface beaucoup plus rapide et réactive pour l'utilisateur.

---

## Partie 5 : Page ProjectDetail (Résolution des bugs)

Il y a deux bugs dans le fichier `ProjectDetail.tsx` :

[cite_start]**BUG 1 : Le tableau de dépendances du `useEffect`** [cite: 698]
* **Problème :** `}, []);`
* **Explication :** Le `useEffect` ne s'exécute qu'une seule fois au montage. Si l'utilisateur navigue d'un projet à un autre (l'ID dans l'URL change), le composant ne rechargera pas les nouvelles données car `id` n'est pas surveillé.
* **Correction :** `}, [id, navigate]);`

[cite_start]**BUG 2 : L'affichage du nom de l'utilisateur** [cite: 707]
* **Problème :** `userName={authState.user.name}`
* **Explication :** Si, pour une raison quelconque, la session expire ou si le state n'est pas encore totalement initialisé, `authState.user` peut être `null`. Essayer de lire `.name` sur `null` fera crasher toute l'application React.
* [cite_start]**Correction :** Utiliser l'optional chaining (comme fait dans le Dashboard) : `userName={authState.user?.name}`[cite: 639].

---

## Partie 6 : Routage

[cite_start]**Q4 : Testez ces scénarios :** [cite: 754]
* [cite_start]**a) `/dashboard` sans être connecté :** Le composant `ProtectedRoute` intercepte la route et redirige vers `/login`[cite: 524, 747].
* [cite_start]**b) `/projects/1` sans être connecté :** Même chose, `ProtectedRoute` redirige vers `/login` car l'état `user` est null[cite: 524, 750].
* [cite_start]**c) `/nimportequoi` :** La route `path="*"` intercepte l'URL inconnue et redirige vers `/dashboard` (avec un `replace`)[cite: 753]. Ensuite, si l'utilisateur n'est pas connecté, le `ProtectedRoute` de `/dashboard` le redirigera vers `/login`.
* [cite_start]**d) `/` (racine) :** La route `path="/"` redirige vers `/dashboard`[cite: 752].
* **e) Connecté puis bouton Retour du navigateur :** L'utilisateur revient à la page précédente. [cite_start]Si nous avons bien utilisé `{ replace: true }` lors du login, il ne reverra jamais le formulaire de connexion[cite: 524, 576].

---

## Partie 7 : Sidebar & Liens de navigation

**Q5 : Quelle différence entre `<Link>` et `<NavLink>` ? [cite_start]Pourquoi `NavLink` ici ?** [cite: 780]
* **Réponse :** Les deux composants évitent le rechargement complet de la page pour la navigation SPA (Single Page Application). Cependant, `<NavLink>` est "intelligent" : il sait si le chemin vers lequel il pointe (`to`) correspond à l'URL actuelle du navigateur[cite: 768].
* [cite_start]**Pourquoi l'utiliser :** Dans la `Sidebar`, cela permet d'exposer la propriété `isActive` dans sa prop `className`, ce qui nous permet d'appliquer conditionnellement la classe CSS `.active` pour mettre en surbrillance le projet actuellement sélectionné[cite: 768, 770].

---

## Partie 8 : ProjectForm réutilisable

**Bug Volontaire (ProjectForm) :**
* [cite_start]**Problème :** Il manque une instruction essentielle dans la fonction `handleSubmit`[cite: 799].
* **Correction :** Il faut ajouter `e.preventDefault();` avant d'appeler `onSubmit(name, color)`. Sans cela, la soumission du formulaire rechargera la page entière[cite: 804].

**Q6 : Ce composant sert pour le POST ET le PUT. [cite_start]Qu'est-ce qui change entre les deux usages ?** [cite: 812]
* **Réponse :** Ce qui change, ce sont les "Props" (les paramètres) qu'on lui passe depuis le composant parent[cite: 785].
    * [cite_start]**Pour le POST (Création) :** On ne lui passe pas d'`initialName` ni d'`initialColor` (il prendra les valeurs par défaut vides)[cite: 787, 788, 793]. [cite_start]La fonction passée à `onSubmit` exécutera un `api.post()`[cite: 654].
    * **Pour le PUT (Modification) :** On lui injectera les données actuelles du projet via `initialName` et `initialColor` pour pré-remplir le formulaire. La fonction `onSubmit` exécutera un `api.put()`.

---

## Partie 9 : Gestion des erreurs

**Q7 : Arrêtez json-server et tentez un POST. [cite_start]Le message s'affiche ?** [cite: 835]
* **Réponse :** Oui, la requête va échouer (Network Error) puisque le backend est éteint. Le bloc `catch` va intercepter cette exception et mettre à jour le state `error`, ce qui déclenchera l'affichage conditionnel du message d'erreur dans l'interface[cite: 823, 832].

**Q8 : Avec fetch, un 404 ne lance PAS d'erreur. [cite_start]Avec Axios, que se passe-t-il ?** [cite: 836]
* **Réponse :** Contrairement à l'API native `fetch` qui ne rejette la promesse qu'en cas de panne réseau (et où il faut vérifier manuellement `res.ok`), Axios simplifie la gestion des erreurs. Si le serveur renvoie un code de statut HTTP de type erreur (4xx comme 404 Not Found, ou 5xx comme 500 Internal Server Error), Axios **rejette automatiquement la promesse**, ce qui vous fait basculer directement dans le bloc `catch`[cite: 823, 836].