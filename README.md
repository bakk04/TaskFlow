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