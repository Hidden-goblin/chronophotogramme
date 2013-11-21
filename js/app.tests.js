var app = app||{};
app.tests =(function(){
	var navigateur, verification;
	//Bind fonction keyup : valeur de type number entre min et max
	navigateur = function navigateur(){
		if(!Modernizr.inputtypes.number){
		//Bind du keyup sur les formulaires
		$('#hauteurDepart').bind('keyup',app.tests.verification);
		$('#masseBille').bind('keyup',app.tests.verification);
		$('#vitesseInitiale').bind('keyup',app.tests.verification);
		//Ajout d'information
		$('.info').show();
	}
	};
	
	verification = function verification(e){
		var min = Number(e.target.getAttribute('min'));
		var max = Number(e.target.getAttribute('max'));
		var valeur = e.target.value;
		if($.isNumeric(valeur))
			{
				valeur = Number(valeur);
			if(valeur < min || valeur > max )
				{
					//Pas ok
					$(this).css({'background-color':'red'});
					$('#parametres').unbind('submit');					
				}
			else
				{
					//OK
					$(this).css({'background-color':'white'});
					$('#parametres').bind('submit',app.scene.goToSimulation);
				}
			}
		else
			{
				//Pas ok
			$(this).css({'background-color':'red'});
			$('#parametres').unbind('submit');			
			}
	};
	
	return({navigateur:navigateur,
			verification:verification});
}());