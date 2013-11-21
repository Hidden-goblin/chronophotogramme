/*
 * Application.
 * module scene :
 * 	Prend en charge toutes les actions sur les pages de l'utilisateur
 * 		goToAccueil(event) :
 *				affiche la page d'accueil et efface les informations du localStorage
 *		goToSimulation(event):
 *				affiche la page de la simulation, récupère les données du formulaire,
 *				appelle les fonctions de calcul de pré-simulation.
 *		popup(event):
 *				fonction de bind pour le lancement de la fenêtre modale utilisé dans 
 * 				la notice d'emploi et la licence
 *		lancerSimulation(event):
 *				fonction de paramètre de bind pour le lancement de la simulation. Elle 
 *				appelle les fonctions du module simulation.
 *		reinitialiserSimulation(event):
 *				fonction de paramètre de bind pour la remise à zéro de la simulation.
 *		afficheInformation(event):
 *				fonction de paramètre de bind pour l'affiche des informations de position
 *				et vitesse au survol d'une image de la bille par la souris.
 *		effaceInformation(event):
 *				fonction de paramètre de bind pour effacer les informations affichées par 
 *				afficheInformation lors de la sortie de la souris du dessus d'une image.
 *			*** 			***			***			***			***
 * module setting :
 * 	Table des constantes de gravitation des planètes du système solaire
 * 		Number getGravite(String) : 
 *				renvoie la valeur de la gravité de la Planete ou false si
 *				il n'est pas possible de trouver la valeur dans le tableau.
 *		Number getValeur(String,String):
 *				renvoie la valeur correspondant à la hauteur, masse, vitesse fixé en minimum
 *				ou en maximum.
 * 			***			***			***			***
 * module simulation :
 * 	Effectue toutes les actions propres à la simulation.
 * 		[liste des méthodes]
 * 			***			***			***			***
 * module calcul:
 *	Effectue tous les calculs de la simulation
 * 			***			***			***			***
 * module tests:
 *	Effectue les tests en relation avec le navigateur ou de validation de formulaire.
 * 			***			***			***			***
 */
$(function(){
	console.log(app);
	app.scene.goToAccueil();
	});