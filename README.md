# Réponses au TP Séance 5 : Sécurité JWT, Redux Toolkit & Performance

Ce document contient les réponses aux questions de compréhension et d'observation issues du TP TaskFlow sur l'optimisation et la sécurisation d'une application React.

---

## Partie 1 : Sécurité XSS dans TaskFlow

**Q1 : Le script s'exécute-t-il ? Pourquoi ? Que fait React avec les strings dans le JSX ?**
> Non, le script `<img src=x onerror=alert("HACK")>` ne s'exécute pas. React protège nativement l'application contre les attaques XSS (Cross-Site Scripting) en échappant automatiquement toutes les variables sous forme de chaînes de caractères (strings) avant de les insérer dans le DOM. Le code HTML malveillant est traité et affiché comme du simple texte brut.

**Q2 : Que se passe-t-il cette fois (avec `dangerouslySetInnerHTML`) ?**
> Le script malveillant s'exécute et la boîte d'alerte "HACK" apparaît à l'écran. L'attribut `dangerouslySetInnerHTML` désactive volontairement la protection native de React, forçant le navigateur à interpréter la chaîne fournie comme du véritable code HTML et JavaScript. Il ne faut jamais l'utiliser pour injecter des données provenant d'utilisateurs.

---

## Partie 2 : Authentification JWT simulée

**Q3 : Ouvrez Network (F12). Faites un GET /projects. Voyez-vous le header `Authorization: Bearer ...` ?**
> Oui. Grâce à l'intercepteur Axios configuré via `setAuthToken`, le faux token généré et stocké dans l'état global est automatiquement intercepté et injecté dans les en-têtes (headers) de chaque requête HTTP sortante.

**Q4 : Pourquoi stocker le token en mémoire (state React) et PAS dans localStorage ?**
> Le `localStorage` est vulnérable aux failles XSS car il est lisible par n'importe quel script JavaScript exécuté sur la page. Un script malveillant pourrait facilement le récupérer. À l'inverse, le state React est isolé dans la mémoire locale de l'application, rendant son accès beaucoup plus difficile pour les scripts tiers.

---

## Partie 3 : Migrer l'auth vers Redux Toolkit

**Q5 : Comparez `authSlice.ts` avec votre ancien `authReducer.ts`. Qu'est-ce qui a changé ?**
> Redux Toolkit (RTK) modernise et simplifie considérablement la gestion de l'état :
> 1. **Disparition des `switch/case` et des Action Types :** `createSlice` génère automatiquement les actions et leurs types associés en fonction des reducers définis.
> 2. **Immutabilité simplifiée grâce à Immer :** Il n'est plus nécessaire d'utiliser le spread operator (`...state`) pour cloner l'état précédent. RTK utilise la librairie *Immer* en arrière-plan, ce qui permet d'écrire du code qui *semble* muter l'état (ex: `state.user = action.payload.user`) tout en générant un nouvel objet immuable de manière sécurisée.

---

## Partie 4 : Performance - React.memo & useCallback

**Q6 : Combien de composants se re-rendent quand on toggle la sidebar ? Lesquels ne DEVRAIENT PAS ?**
> Sans optimisation, le basculement (toggle) de la Sidebar provoque le re-rendu du parent (le composant gérant l'état `isOpen`), de la `Sidebar` elle-même, **mais aussi du `MainContent`** (et de tous ses composants enfants). Le `MainContent` ne devrait absolument pas se re-rendre, car ses données (props) n'ont subi aucune modification.

**Q7 : Pourquoi MainContent ne se re-rend plus ? Que compare React.memo ?**
> `React.memo` enveloppe le composant et intercepte les re-rendus. Il effectue une **comparaison de surface (shallow comparison)** des anciennes et des nouvelles props. Si les références en mémoire (pour les objets/tableaux) et les valeurs (pour les primitives comme les strings/booléens) sont identiques, React déduit que le composant n'a pas changé et saute son re-rendu.

**Q8 : Quelle différence entre `useMemo` et `useCallback` ? Quand utiliser chacun ?**
> - **`useCallback`** mémorise **la référence d'une fonction**. On l'utilise principalement pour passer des fonctions en props à des composants enfants optimisés avec `React.memo`, évitant ainsi que le parent ne recrée une nouvelle référence de fonction à chaque rendu, ce qui briserait la mémoïsation de l'enfant.
> - **`useMemo`** mémorise **le résultat d'une fonction** (une valeur de retour). On l'utilise pour mettre en cache des calculs lourds ou empêcher la recréation de gros objets/tableaux à chaque rendu d'un composant.

---

## Partie 6 : React Profiler

**Q10 : Observations du Profiler (Avant/Après optimisations)**
> *(Ces observations correspondent au comportement attendu après l'application des optimisations du TP)*
>
> - **a) Toggle sidebar :** Après l'ajout de `React.memo` et de `useCallback`, le `MainContent` est "mémoisé" et ignoré par le Profiler. Seule la `Sidebar` et le gestionnaire d'état se re-rendent. Le temps de rendu global chute de manière significative.
> - **b) Ajouter un projet :** Le hook `useProjects` met à jour l'état, provoquant le re-rendu naturel des composants qui consomment cette liste (ex: la `Sidebar` pour afficher le nouvel item).
> - **c) Naviguer vers un ProjectDetail :** Démontage de la vue précédente et montage des nouveaux composants liés à la route (comportement normal du Router).
> - **d) Se déconnecter :** L'action `logout()` vide le store Redux. La condition de protection de route renvoie vers `/login`, entraînant le démontage de l'interface d'administration entière.
>
> **Conclusion :** Oui, les re-renders inutiles (notamment ceux de la vue principale lors des interactions isolées avec le menu) ont été supprimés avec succès grâce à l'implémentation de la mémoïsation.