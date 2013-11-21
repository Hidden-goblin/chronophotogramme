var app =app||{};
app.calcul=(function(){
	var tMax, tableauValeur, positionExtreme;
	
	/* Calcul de la durée de la chute.
	 * stocke cette durée dans le localStorage du navigateur sous "dureeChute"
	 */
	tMax = function tMax(){
		var vitesseInitiale = Number(window.localStorage.getItem('vitesseInitiale'));
		var gravite = Number(window.localStorage.getItem('gravite'));
		var hauteurDepart = Number(window.localStorage.getItem('hauteurDepart'));
		var delta = Math.pow(vitesseInitiale,2)+2*gravite*hauteurDepart;
		//Calcul de la durée maximum de chute
		dureeMax =(Math.sqrt(delta) - vitesseInitiale)/gravite; 
		//Stockage de cette durée
		window.localStorage.setItem('dureeChute',dureeMax);
				
	};
	
	/*
	 *  Calcul de l'altitude maximale atteinte
	 *  stocke cette hauteur dans le localStorage du navigateur sous "hauteurMaximum"
	 *  stocke l'échelle de simulation dans le localStorage du navigateur sous "echelle"
	 *  renvoie vrai si la position extreme est la hauteur de départ
	 *  renvoie faux si la position extreme est plus grande que la hauteur de départ.
	 */
	positionExtreme = function positionExtreme(){
		var vitesseInitiale = Number(window.localStorage.getItem('vitesseInitiale'));
		var gravite = Number(window.localStorage.getItem('gravite'));
		var hauteurDepart = Number(window.localStorage.getItem('hauteurDepart'));
		var hauteurMaximale;
		var retour;
		if(vitesseInitiale < 0)
		{
			hauteurMaximale = hauteurDepart - .5*vitesseInitiale*vitesseInitiale/gravite + vitesseInitiale*vitesseInitiale/gravite;
			retour = false;
		}
		else
		{
			hauteurMaximale = hauteurDepart;
			retour = true;
		}
		window.localStorage.setItem('hauteurMaximum',Math.round(hauteurMaximale*100)/100);
		window.localStorage.setItem('echelle',500/hauteurMaximale);
		return retour;
	};
	
	/* Crée les tableaux itération-position et iteration-vitesse
	 * stocke ces deux tableaux dans le localStorage du navigateur sous 'position' et 'vitesse'
	 */
	tableauValeur = function tableauValeur(hauteurDepart,vitesseInitiale,gravite){
		// Equation en hauteur du type : h = hauteurDepart - .5*gravite*t^2-vitesseInitiale*t
		var vitesseInitiale = Number(window.localStorage.getItem('vitesseInitiale'));
		var gravite = Number(window.localStorage.getItem('gravite'));
		var hauteurDepart = Number(window.localStorage.getItem('hauteurDepart'));
		var echelle = Number(window.localStorage.getItem('echelle'));
		var position =[];
		var vitesse = [];
		var nombreFrame = 0;
		var tReel;
		position[0]=0;
		vitesse[0]=0;
		do{
			tReel = .04*nombreFrame;
			position[nombreFrame] = hauteurDepart - .5*gravite*tReel*tReel - vitesseInitiale*tReel;
			var temp = 500 - echelle*position[nombreFrame];
			vitesse[nombreFrame] = Math.abs(-gravite*tReel - vitesseInitiale);
			nombreFrame = nombreFrame + 1;
		}while(position[nombreFrame -1]>0);
		nombreFrame--;
		window.localStorage.setItem('nombreFrame',nombreFrame);	
		window.localStorage.setItem('position',JSON.stringify(position));
		window.localStorage.setItem('vitesse',JSON.stringify(vitesse));
	};
	
	return{ tMax:tMax,
			 tableauValeur:tableauValeur,
			 positionExtreme:positionExtreme};
}());