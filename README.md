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
