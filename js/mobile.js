(function($, document, window){
	
	$(document).ready(function(){

		//  main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});
 
	});

	$(window).load(function(){

	});

})(jQuery, document, window);