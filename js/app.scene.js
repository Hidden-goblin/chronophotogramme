var app = app||{};
app.scene = (function(){
	var goToAccueil, goToSimulation, popup, lancerSimulation, reinitialiserSimulation;
	
	goToAccueil = function goToAccueil(e){
		if(typeof(e)!=='undefined')
			{
				e.preventDefault();
			}
		//Bind des événements
		$('#parametres').bind('submit',app.scene.goToSimulation);
		$('#buttonVersion').unbind('click').bind('click',app.scene.popup);
		$('#buttonInstructions').unbind('click').bind('click',app.scene.popup);
		//Remplissage des spans avec les valeurs par défaut
		$('#hauteur').text('La valeur doit être comprise entre '+$('#hauteurDepart').attr('min')+ ' et '+$('#hauteurDepart').attr('max'));
		$('#masse').text('La valeur doit être comprise entre '+$('#masseBille').attr('min')+ ' et '+$('#masseBille').attr('max'));
		$('#vitesse').text('La valeur doit être comprise entre '+$('#vitesseInitiale').attr('min')+ ' et '+$('#vitesseInitiale').attr('max'));
		//Test du navigateur
		app.tests.navigateur();
		//Modification du titre de la page
		$('#titrePage').text("Sélection des paramètres de simulation.");
    		// Changement de page
    		$('#simulation').hide();
    		$('#accueil').show();
    		// Remise à zéro de l'animation
    		reinitialiserSimulation();
    		//Suppression des données d'une éventuelle simulation.
    		window.localStorage.clear();
	};
	
	
	
	/* goToSimulation
	 * 
	 * Change l'affichage en masquant la page d'accueil et en montrant la page
	 * de simulation.
	 * Effectue l'ensemble des opérations de pré-simulation
	 * 		- récupération des paramètres
	 *		-positionnement de la bille et création des labels
	 *		-bind des boutons
	 */
	goToSimulation = function goToSimulation(e){
		if(typeof(e)!=='undefined')
		{
			e.preventDefault();
		}
		
		//Changement de page
    		$('#accueil').hide();
    		$('#simulation').show();

    	//Modification du titre de la page
    	 	$('#titrePage').text(" Effectuer la simultation.");
    		
		//Stockage des éléments du formulaire.
    		window.localStorage.setItem('hauteurDepart',$('#hauteurDepart').val());
    		window.localStorage.setItem('masseBille',$('#masseBille').val());
    		window.localStorage.setItem('gravite',app.setting.getGravite($('#lieu option:selected').val()));
    		window.localStorage.setItem('lieu',$('#lieu option:selected').val())
      		if(!$('#sens').is(':checked'))
			{
    			var temp = -$('#vitesseInitiale').val();
    			window.localStorage.setItem('vitesseInitiale', temp);
			}
    		else
    		{
    			window.localStorage.setItem('vitesseInitiale',$('#vitesseInitiale').val());
    		}
		
        // Calcul des constantes de simulation.
    		app.calcul.tMax();
			
    	//Placement des repères h=0, H0 et HMax
		if(app.calcul.positionExtreme()){
			$('#hauteurMaximaleAffiche').hide();
			$('#hauteurDepartAffiche').css({top:0}); // Modification de la valeur 110
			$('#hauteurDepartAffiche').html('h = '+Number(window.localStorage.getItem('hauteurDepart'))+'m');		
    	}
		else
		{
			var hda = 500 - Number(window.localStorage.getItem('hauteurDepart'))*Number(window.localStorage.getItem('echelle'));
			$('#hauteurMaximaleAffiche').show();
			$('#hauteurDepartAffiche').css({top:hda});
			$('#hauteurDepartAffiche').html('h = '+Number(window.localStorage.getItem('hauteurDepart'))+'m');
			$('#hauteurMaximaleAffiche').css({top:0});
			$('#hauteurMaximaleAffiche').html('h = '+Number(window.localStorage.getItem('hauteurMaximum'))+'m');
		}
		//Placement de la bille 
			$('#bille').css({top:500-Number(window.localStorage.getItem('hauteurDepart'))*Number(window.localStorage.getItem('echelle'))});
		//Création des tableaux de position et vitesse
    		app.calcul.tableauValeur();
    	//Remplissage des zones d'information
    		var message;
    		message = 'La masse de la bille est de '+Number(window.localStorage.getItem('masseBille'))+'g.<br />';
    		message += 'La hauteur de départ est de '+Number(window.localStorage.getItem('hauteurDepart'))+'m.<br />';
    		message += 'La vitesse initiale est de '+Math.abs(Number(window.localStorage.getItem('vitesseInitiale')))+'m/s';
    		if(Number(window.localStorage.getItem('vitesseInitiale'))!=0){
    			if(Number(window.localStorage.getItem('vitesseInitiale'))>0){
    				message += ' dans le sens du haut vers le bas.';
    			}
    			else
    			{
    				message += ' dans le sens du bas vers le haut.';
    			}
    		}
    		else
    		{
    			message += '.';
    		}
    		message += '<br /> Le lieu choisi est : ' + window.localStorage.getItem('lieu')+'.<br />';
    		message += 'La constante de pesanteur est g = '+ window.localStorage.getItem('gravite')+'N/kg.'
    		$('#parametresChoisis').html(message);
		//Bind des boutons et de leur aspect.
     	$('#animation').unbind('click').bind('click',app.scene.lancerSimulation);
     	$('#reset').bind('click',app.scene.reinitialiserSimulation);
     	$('#retourParam').bind('click',app.scene.goToAccueil);
    	
	};
		
	popup = function popup(e){
		if(typeof(e)!=='undefined')
		{
			e.preventDefault();
			if(e.target.id ==="buttonVersion")
    			{
    				$('#version').dialog({modal:true});
    				$('#version').dialog();
    			}
			else
			{
				if(e.target.id === "buttonInstructions")
    				{
						$('#instructions').dialog({modal:true});
						$('#instructions').dialog();
    				}
				else
    				{
						//console.log('Erreur de cible');
    				}
			}
		}
	};
	
	lancerSimulation = function lancerSimulation(e){
		if(typeof(e)!=='undefined')
		{
			e.preventDefault();
		}
		//Préparation de la simulation
		var nbreFrame = Number(window.localStorage.getItem('nombreFrame'));
		var leModulo = Math.max(Math.round(nbreFrame/10),2);
    	var pas = parseInt($('#dilatationTemps option:selected').val()); //Modification du temps pour le rafraichissement
    	// Affichages propres à la simulation
    	var chronoIsOn = true;
    	var message ='Le temps entre chaque image est de '+ leModulo*0.04 +' secondes.';
    	$('#intervale').html('');
    	$('#intervale').html(message);
    	reinitialiserSimulation();
    	$('#bille').css({top:500-Number(window.localStorage.getItem('hauteurDepart'))*Number(window.localStorage.getItem('echelle'))});
    	$('#bille').bind('mouseenter',app.scene.afficheInformation);
    	$('#bille').bind('mouseleave',app.scene.effaceInformation);
    	//Simulation
    	app.simulation.start(chronoIsOn,pas,nbreFrame);
    	//Modification des boutons
    	//var temps = pas*nbreFrame;
    	//arret = setTimeout(function(){$('#arret').unbind('click').hide();$('#chargement').hide();},temps);
    	$('#animation').unbind('click');
    	$('#animation').css({opacity:.5});
    	$('#reset').unbind('click').bind('click',app.scene.reinitialiserSimulation);
		$('#reset').css({opacity:1});
	};

	reinitialiserSimulation = function reinitialiserSimulation(e){
		if(typeof(e)!=='undefined')
		{
			e.preventDefault();
		}

    	$('#eprouvette').empty();
    	$('#eprouvette').append('<div id="bille">0</div>');
    	$('#bille').css({top:500-Number(window.localStorage.getItem('hauteurDepart'))*Number(window.localStorage.getItem('echelle'))});
    	$('#animation').unbind('click').bind('click', lancerSimulation);
    	$('#animation').css({opacity:1});
    	$('#reset').unbind('click');
		$('#reset').css({opacity:.5});
		$('#erreurs').html('');
	};

	afficheInformation = function afficheInformation(e){
		
		var frame = Number(e.target.innerHTML);
		var pos = JSON.parse(window.localStorage.getItem('position'));
		var vit = JSON.parse(window.localStorage.getItem('vitesse'));
		
		$('#resultat').html('Le numero d\'apparition de la bille est le '+frame+'<br />La hauteur est de '+Math.round(Number(pos[frame])*100)/100+'m.<br /> La vitesse est de '+Math.round(Number(vit[frame])*100)/100+'m/s');		
	};
	
	effaceInformation = function effaceInformation(e){
		$('#resultat').html('');
	};
	return {
		goToAccueil:goToAccueil, 
		goToSimulation:goToSimulation,
		popup:popup,
		lancerSimulation:lancerSimulation, 
		reinitialiserSimulation:reinitialiserSimulation,
		afficheInformation:afficheInformation,
		effaceInformation:effaceInformation};
	
})();
