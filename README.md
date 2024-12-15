# Jeu Multijoueur 2D - README

## 📖 Conception

Le projet a été initialement basé sur une structure proposée dans un sujet Google Docs. Nous avons progressivement amélioré et enrichi le jeu, notamment en développant :  
- La gestion des obstacles, des sorties et des joueurs.  
- Un système de **timer** pour limiter la durée des niveaux.  
- Un **système de scoring** pour récompenser les joueurs.  

### Points techniques développés :
- La gestion des **collisions entre joueurs** s'est inspirée des collisions avec les obstacles, ce qui a simplifié sa mise en œuvre.
- Implémentation de nouveaux malus, comme des **lasers**, grâce à des bases solides déjà établies.

## 📂 Classes et Méthodes

### `Player`
- **`draw()`** : Dessine les animations des sprites des joueurs.  
- **`move()`** : Permet aux joueurs de se déplacer.  
- **`handleInput()`** : Gère les entrées clavier.  
- **`handleCollisionWithObstacle()`** : Gère les collisions avec les obstacles.  
- **`CollisionJoueur()`** : Gère les collisions entre joueurs, les déplaçant en cas de contact.  

### `Bonus`
- **`getImage()`** : Récupère l’image du bonus.  
- **`getPattern()`** : Récupère le motif pour les animations.  
- **`draw()`** : Dessine les bonus.  

### `DeathZone`
- **`getImage()`** : Récupère l’image de la zone mortelle.  
- **`getPattern()`** : Récupère son motif.  
- **`draw()`** : Dessine la zone de mort.  

### `Goal`
- **`getRandomColor()`** : Génère une couleur aléatoire pour la sortie.  
- **`draw()`** : Dessine la sortie.  

### `Level`
- **`recupererLesPositionsDesJoueurs()`** : Récupère les positions initiales des joueurs.  
- **`loadLevel()`** : Charge un niveau à partir de données prédéfinies.  

### `Malus`
- **`draw()`** : Dessine les malus.  

### `Obstacle`
- **`draw()`** : Dessine les obstacles.  

### `Main`
- **`setLocalStorageData()`** : Enregistre une valeur localement.  
- **`getLevelData()`** : Charge les données d'un niveau depuis une URL.  
- **`init()`** : Initialise le canvas à l’ouverture de la page.  
- **`startCountdown()`** : Lance un compte à rebours avant le début du niveau.  
- **`Timeout()`** : Fige les joueurs lorsque le timer atteint 0 et passe au niveau suivant.  
- **`TimerLevel()`** : Gère le timer pour chaque niveau.  
- **`NextLevel()`** : Charge le niveau suivant.  
- **`gameLoop()`** : Boucle principale du jeu.  
- **`resultats()`** : Récupère les scores des joueurs.  
- **`afficherScores()`** : Affiche les scores pendant le jeu.  
- **`afficherScoresEnd()`** : Affiche les scores finaux.  
- **`StoreScoreEnd()`** : Stocke les scores localement.  

## ⚠️ Difficultés rencontrées
- **Collisions avec obstacles** : Initialement, la gestion des collisions ne fonctionnait pas comme prévu et a nécessité plusieurs révisions.  
- **Utilisation de GitHub Pages** : La compréhension de cet outil a demandé du temps, mais nous avons fini par réussir à déployer le projet.  

## 🔧 Points à améliorer
- **Déplacements des joueurs après collisions** : Lorsqu’un joueur touche un obstacle, certains comportements restent imprécis.  

## 🎮 Comment jouer ?

1. Choisissez le **nombre de joueurs** sur l'écran d'accueil :  
   - **Red** : Z (haut), S (bas), Q (gauche), D (droite).  
   - **Blue** : Flèches directionnelles.  
   - **Green** : Pavé numérique : 5 (haut), 2 (bas), 1 (gauche), 3 (droite).  
   - **Yellow** : I (haut), K (bas), J (gauche), L (droite).  

2. Une fois le jeu lancé :  
   - Un **compte à rebours de 3 secondes** précède chaque niveau.  
   - Les joueurs ont **50 secondes** pour atteindre la sortie (un carré 2x2 brillant).  

### Scoring
- **Premier** : +3 points  
- **Deuxième** : +2 points  
- **Troisième** : +2 points  
- **Dernier** : +0 point  

3. Attention aux **malus** et **bonus** :  
   - Ces objets peuvent influencer le score ou les déplacements.  
   - Les ennemis apparaissent dans les niveaux plus avancés.

4. À la fin des niveaux, un écran récapitulatif affiche les scores finaux.

---
Bon jeu ! 🚀
