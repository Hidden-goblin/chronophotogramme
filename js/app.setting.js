var app = app||{};
app.setting=(function(){
	var lieu,  getGravite, valeurExtremale, getValeur;
	
	//Pas nécessaire
	function isNumber(n) {
		  return !isNaN(parseFloat(n)) && isFinite(n);
		}
	
	lieu = {Mercure : 3.70 ,
			Venus : 8.93,
			Terre : 9.81,
			Mars : 3.73,
			Jupiters : 24.82,
			Saturne : 10.59,
			Uranus : 8.93,
			Neptune : 11.18,
			Lune : 1.57
			};
	valeurExtremale = {	masse : {min : 10, max : 100},
						vitesse : {min : 0, max :10},
						hauteur : {min : 1, max : 10}};
	
	getGravite = function getGravite(ici){
		var retour = lieu[ici];
		//if(!isNumber(retour)) //.isNumeric vient de JQuery?
		if(!$.isNumeric(retour))
		{
			retour = false;
		}
		return retour;
	};
	
	getValeur = function getValeur(pour,quoi){
		return valeurExtremale[pour][quoi];
	};
	
	return {
		getGravite : getGravite,
		getValeur : getValeur
	};
}());
