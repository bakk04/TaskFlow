<<<<<<< HEAD
# Réponses aux questions théoriques - TP 2 : Auth Context & Protected Layout

## Partie 3 : Auth Context & Provider

**Q2 : Pourquoi le `useAuth()` lance une erreur si le context est `null` ? Quel bug ça prévient ?**
* [cite_start]**Réponse :** L'erreur est lancée intentionnellement si `useAuth` est appelé en dehors de l'arbre de composants enveloppé par `<AuthProvider>`[cite: 251, 261, 264]. 
* **Bug prévenu :** Cela empêche des bugs silencieux et des crashs d'application du type `Cannot read properties of null (reading 'state')`. En forçant cette vérification, on s'assure que tout composant essayant de consommer le contexte d'authentification a bien accès aux valeurs `state` et `dispatch` définies par le Provider.

**Q3 : Sans Context, comment feriez-vous pour partager le `user` entre Header, Sidebar et Login ? Combien de props ?**
* [cite_start]**Réponse :** Sans Context, il faudrait utiliser la technique du "Prop Drilling" (forage de props)[cite: 276]. Cela consisterait à stocker l'état de l'utilisateur dans le composant racine (ex: `App`) et à le faire descendre manuellement via des props à chaque niveau de l'arbre des composants. 
* [cite_start]**Nombre de props :** Cela nécessiterait de passer au moins une prop `user` (et potentiellement une prop `onLogin`/`onLogout`) à travers plusieurs composants intermédiaires pour atteindre le `Header`, la `Sidebar` et la page de `Login`, rendant le code lourd et difficile à maintenir[cite: 276].

---

## Partie 4 : Page Login avec formulaire contrôlé

**Q4 : Pourquoi `e.preventDefault()` est indispensable dans `handleSubmit` ?**
* [cite_start]**Réponse :** Par défaut, la soumission d'un formulaire HTML (`<form>`) provoque le rechargement complet de la page web[cite: 285, 346]. En React, un rechargement de page entraîne la perte de tout l'état de l'application (le State). [cite_start]`e.preventDefault()` annule ce comportement par défaut, permettant à React de gérer la soumission de manière asynchrone via JavaScript (avec `fetch`) tout en conservant l'état actuel[cite: 285, 288, 346].

**Q5 : Que fait la destructuration `{ password, ...user } = users[0]` ? Pourquoi exclure le password ?**
* [cite_start]**Réponse :** Cette syntaxe extrait la propriété `password` de l'objet utilisateur (récupéré depuis la base de données) et rassemble toutes les propriétés restantes (comme `id`, `name`, `email`) dans un nouvel objet nommé `user`[cite: 295, 347].
* [cite_start]**Pourquoi :** On exclut le mot de passe pour des raisons de sécurité[cite: 202, 347]. [cite_start]Il ne faut jamais stocker d'informations sensibles comme un mot de passe en clair dans le State global (Context) de l'application front-end, car il serait facilement accessible et n'a aucune utilité pour l'interface une fois la connexion validée[cite: 202, 296].

---

## Partie 5 & 6 : Protected Layout et Flux de déconnexion

**Q6 : Pourquoi le Dashboard est un composant séparé et pas tout dans App ?**
* [cite_start]**Réponse :** Séparer le `Dashboard` permet une meilleure séparation des responsabilités[cite: 365, 400]. [cite_start]Le composant `App` se concentre uniquement sur la logique de routage conditionnel : afficher `<Login />` si l'utilisateur n'est pas authentifié, ou `<Dashboard />` s'il l'est[cite: 359, 362, 364]. [cite_start]Le `Dashboard`, quant à lui, encapsule toute la logique (récupération des données, layout avec Sidebar et Header) spécifique à l'espace connecté[cite: 365, 371].

**Q8 : Dessinez le flux du callback `onLogout` :**
* **Flux de déconnexion :**
    ```text
    1. [cite_start][Header] : L'utilisateur clique sur le bouton "Déconnexion" (onClick)[cite: 418, 433].
          │
          ▼
    2. [cite_start][Header props] : Appelle la fonction callback `onLogout`[cite: 408, 433].
          │
          ▼
    3. [cite_start][App] : Exécute le `dispatch({ type: 'LOGOUT' })` fourni par le `useAuth`[cite: 392, 433].
          │
          ▼
    4. [cite_start][authReducer] : Intercepte l'action 'LOGOUT' et remet le state à `initialState` (user = null)[cite: 221, 235].
          │
          ▼
    5. [cite_start][Context] : La mise à jour du state déclenche un re-rendu (re-render) du composant `App`[cite: 433].
          │
          ▼
    6. [App] : Vérifie `authState.user`. [cite_start]Comme il est null, rend `<Login />` à la place du `<Dashboard />`[cite: 359, 362, 433].
    ```

---

## Partie 7 - BONUS : useLayoutEffect

**Q9 : Pourquoi le flash disparaît avec `useLayoutEffect` ?**
* **Réponse :** Le navigateur traite l'affichage de l'écran en plusieurs étapes. 
  * [cite_start]Avec `useEffect`, la modification du DOM (Commit) est faite, le navigateur peint l'écran (Paint) avec la position initiale (0,0), *puis* l'effet s'exécute, recalcule la position et repeint l'écran (d'où le flash)[cite: 489, 493]. 
  * [cite_start]Avec `useLayoutEffect`, l'effet s'exécute de manière synchrone juste après la mise à jour du DOM (Commit), mais **avant** que le navigateur ne peigne l'écran (Paint)[cite: 494, 495, 496]. [cite_start]Le navigateur attend que les calculs du `useLayoutEffect` soient terminés pour dessiner l'interface finale directement avec les bonnes coordonnées, éliminant ainsi le flash[cite: 491, 496]. 
**Q10 : Pourquoi ne pas utiliser `useLayoutEffect` partout si c'est mieux ?**
* [cite_start]**Réponse :** Parce que `useLayoutEffect` est **bloquant** pour le rendu visuel[cite: 496, 497]. [cite_start]Comme le navigateur attend la fin de l'exécution de l'effet pour peindre l'écran[cite: 496], si vous y placez des opérations lourdes ou lentes (comme des requêtes réseau), l'application paraîtra figée ou mettra du temps à s'afficher pour l'utilisateur. `useEffect` est asynchrone et laisse le navigateur faire son rendu fluide, il est donc préférable de l'utiliser par défaut, sauf pour des problèmes très spécifiques de calcul de position dans le DOM (comme ici avec l'info-bulle).
=======
# Réponses aux questions théoriques - TP React & Web Moderne

Ce document contient les réponses aux questions de compréhension posées lors du TP de Développement Front-End.

## Partie 1 : Initialisation du projet

**Question :** Ouvrez `index.html`. Que contient le `<body>` ? [cite_start]Lien avec le CSR ? [cite: 22]
* **Réponse :** Le `<body>` contient uniquement une balise vide `<div id="root"></div>` et l'inclusion du script principal `main.tsx`. 
* **Lien avec le CSR (Client-Side Rendering) :** Contrairement au rendu côté serveur (SSR) où le HTML arrive déjà construit, en CSR, le serveur renvoie une page HTML presque vide. C'est React, exécuté par le navigateur (le client), qui va injecter et construire toute l'interface utilisateur dynamiquement à l'intérieur de la balise `#root`.

---

## Partie 2 : Backend avec json-server

[cite_start]**Question :** Quelle différence entre des données en dur dans le code et une API REST ? [cite: 69]
* **Données en dur :** Elles sont écrites directement dans les fichiers source de l'application. Pour les modifier, il faut changer le code source et recompiler l'application.
* **API REST :** L'application récupère les données dynamiquement via des requêtes HTTP (ex: via `json-server`). Cela sépare le frontend des données, permettant de modifier le contenu sans toucher au code de l'interface et de simuler un environnement réel client-serveur.

---

## Partie 3 : Composants avec Props

[cite_start]**Question :** Pourquoi `className` au lieu de `class` en JSX ? [cite: 85]
* **Réponse :** Le JSX n'est pas du HTML pur, il est transpilé en JavaScript. Le mot `class` étant un mot-clé réservé en JavaScript (utilisé pour la programmation orientée objet), React utilise `className` pour cibler l'attribut HTML correspondant et éviter les conflits syntaxiques.

**Question :** Pourquoi `key={p.id}` est obligatoire dans `.map()` ? [cite_start]Que se passe-t-il avec l'index ? [cite: 105]
* **Obligation :** La prop `key` aide le DOM Virtuel de React à identifier de manière unique quels éléments ont changé, été ajoutés ou supprimés, ce qui optimise grandement les performances lors des re-rendus.
* **Problème avec l'index :** Utiliser l'index du tableau (`0, 1, 2...`) comme clé est une mauvaise pratique si la liste peut changer (tri, filtrage, suppression). Si l'ordre change, les index changent aussi, ce qui peut causer des bugs visuels et des problèmes d'état imprévisibles dans React.

---

## Partie 4 : State, useEffect & Fetch

**Q1 : Combien de fois le `useEffect` s'exécute-t-il ? [cite_start]Pourquoi ?** [cite: 166]
* **Réponse :** Il s'exécute **une seule fois**, juste après le premier rendu (montage) du composant. Cela est dû au tableau de dépendances vide `[]` passé en deuxième argument de `useEffect`.

**Q2 : Arrêtez json-server (Ctrl+C) et rechargez. [cite_start]Que se passe-t-il ?** [cite: 167]
* **Réponse :** Les requêtes `fetch` échouent car l'API REST ne répond plus. Le bloc `catch` du code intercepte l'erreur (visible avec un `console.error`), le `loading` passe à `false`, mais l'interface s'affichera vide (sans projets ni colonnes) car les states `projects` et `columns` restent à leur valeur initiale (des tableaux vides).

**Q3 : Ouvrez Network (F12). Voyez-vous les requêtes vers `localhost:4000` ? [cite_start]Code HTTP ?** [cite: 168]
* **Réponse :** Oui, dans l'onglet Network (Réseau), on observe deux requêtes de type `fetch/XHR` vers `/projects` et `/columns`. Si `json-server` est lancé, leur code HTTP est **200 (OK)**, indiquant que la requête a réussi.

**Q4 : Les nouvelles données s'affichent ? [cite_start]Décrivez le cycle complet.** [cite: 171]
* **Réponse :** Oui, si on modifie `db.json` et qu'on recharge la page, les nouvelles données s'affichent. 
* **Cycle complet :**
    1. Rechargement de la page : Montage initial des composants (le state `loading` est vrai).
    2. Déclenchement du `useEffect` `->` lancement des requêtes `fetch`.
    3. Réception des nouvelles données du `json-server`.
    4. Mise à jour du State via `setProjects` et `setColumns`.
    5. La modification du State provoque un re-rendu de l'application avec les nouvelles données et met à jour le DOM de la page.

[cite_start]**Q5 : Dessinez le flux (json-server, fetch, useState, useEffect, composants, props).** [cite: 172, 173]
* **Flux de l'application :**
    ```text
    [json-server] (API REST)
          │
          ▼
    [useEffect] -> exécute la fonction -> [fetch] (Requêtes HTTP)
                                              │
                                              ▼
                                       [useState] (Mise à jour de projects & columns)
                                              │
                                              ▼
                                   [Composant Parent (App)] (Déclenche un re-rendu)
                                              │
                                              ▼
                                           [props]
                                              │
               ┌──────────────────────────────┼─────────────────────────────┐
               ▼                              ▼                             ▼
        [Header (title)]           [Sidebar (projects)]         [MainContent (columns)]
    ```
>>>>>>> 3ec81033ccddc94ef63aae1c38e3453a15ef533b
