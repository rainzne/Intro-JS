Conception : 
Dans un premier temps on est partie sur une base similaire qui est donné dans le sujet gdoc.
Ensuite on a fait des améliorations au fur et a mesure on a commencé par la gestion des obstacles, des sorties, des joueurs.
De plus, nous sommes partie sur les fonctions de gestions de temps (timer) et de scoring c'est dernière étaient plus simple mais quand même difficile dans l'ensemble à implémenter car notre base établi nous a freinez dans leur conception les idées qu'on avait pour leur création ne correspondez pas. Donc a dû envisagez d'autre solution qui finalement on porté leur fruit. Par exemple nous avons utilsé le mot clé ".every" Pour notre fonction de scoring on a du la divisé en plusieurs partie pour nous permettre de répondre a la contrainte.
La colision entre les joueurs a était plutot "simple" a faire vu qu'on s'est inspiré de fonction colision avec les obstacles.
Pour finir on a développer d'autre malus comme des  lasers c'est derniers n'ont pas étaient difficile a implémenter de fait qu'on avais deja les bases pour ces derniers mais aussi par les nombreux exemples reçu par le biai de M.Buffa


-----------------------------------
Class Player : 

draw() qui nous permet de dessiner les animations des sprites des joueurs.

move() permet au joueur de se déplacer dans l'aire de jeu

handleinput() permet de savoir si une touche est appyuer

handleCollisionWithObstacle() gère la collision des obstacles permet au joueurs de ne pas les franchirs

CollisionJoueur() gère la collision avec les autres joueurs de pousser les joueurs de chaque côté si collision
-------------------
Class Bonus : 

getImage() permet d'avoir l'image de notre bonus

getPattern() nous permets de recuperer le pattern de notre bonus pour faire de l'animation

draw() permet de dessiner notre bonus
-------------------
Class DeathZone : 
getImage() permet d'avoir l'image de notre Deathzone

getPattern() nous permets de recuperer le pattern de notre DeathZone pour faire de l'animation

draw() permet de dessiner notre Deathzone
-------------------
Class Goal :

getRandomColor() permet de randomiser notre sortie

draw() permet de dessiner notre goal
-------------------
Class Level : 

recuper les positions de nos joueurs

loadLevel() permet de charcher nos levels
-------------------
Class Malus : 
draw() permet de dessiner notre malus
-------------------
Class Obstacle :
draw() 
permet de dessiner les obstacles
-------------------
Class Canvas :
Crée notre canvas
-------------------
Main : 
setLocalStorageData() enregistre une valeur dans le localStorage en utilisant une paire clé-valeur.

getLevelData()  récupère des données de niveau depuis une URL donnée.

init() :initialise le canvas au chargement de la page.

startCountdown(): lance un décompte avant le début de chaque niveau, les joueurs ne peuvent pas bouger jusqu'a la fin de ce dernier.

Timeout() : Quand notre timer atteind 0 on gele les joueurs et on lance un conteur on passe au niveau suivant et on relance le timer

TimerLevel() : Permet d'avoir un timer pour nos niveaux 

NextLevel(): charge le niveau suivant

gameLoop(): boucle de jeu

resultats() permet de recuperer le score des joueurs

afficherScores() afficher le score des joueurs

afficherScoresEnd() afficher le score final

StoreScoreEnd() store localement le score
-------------------------
difficulté : 

Un point difficile a était la gestion des collisions avec les obstacles.
Dans un premier temps on a fait une fonction simple mais qui ne fonctionné par comme on l'entendait, voire pas du tout dans certain cas. Du coup on a du la modifié plusieurs fois, car on avais pris en compte les collisions horizontale et verticale, mais pas celle des coins ou c'est les deux à la fois et c'est cette dernière qu'on a eu du mal a implémenter.. On s'est inspiré de plusieurs codes pour résoudre ce problème et notre code maintenant fonctionne.
Comprendre comment fonctionne Github Pages on a mis quelque temps a commprendre les erreurs qu'on a reçu mais au final vers la fin on a réussi.
----------------------------------
Point a améliorer : 
les déplacements quand on touche un obstacle reste le même c'est a dire quand on a touché un obstacle et qu'on le dépasse si on appuye par exemple sur une touche pour se déplacer vers le bas cela ne fonctionne pas il faut arreter d'appuyer sur la touche sur laquel on appuye pour pouvoir avoir de nouveau tout les déplacements possible.
------------------------------------
Comment jouer : 
vous arrivez sur un écran d'accueil simple ou vous pouvez choisir combien de joueur jouent : 

red : UP : Z ; down : S  ; left : Q ; right : D

blue : UP : ArrowUp ; down : ArrowDown  ; left : ArrowLeft ; right : ArrowRight

green : UP : 5 ; down : 2  ; left : 1 ; right : 3 ( pad num)

yellow : UP : I ; down : K  ; left : J ; right : L

ensuite un timer de 3 seconde apparait et vous avez 50 secondes pour rejoindre l'arrivé (carré de 2x2 qui brille) passer ce délai les joueurs seront geler sur place et ne gagnerons pas de points.
Le premier joueur a atteindre la sortie gagne 3pts le deuxieme 2 le troiseme 2 et le dernier 0

Vous avez évidemment des malus et bonus qui seront mis de temps en temps sur certains levels alors faites bien attention.. Mais il y aurai aussi des ennemis dans les niveau les plus hauts alors ne soyez pas déconcentrer.

Une fois tout les niveaux finit un écran récap sera donnéer pour voire votre score.






