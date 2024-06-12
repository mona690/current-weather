(function ($, document, window) {
  $(document).ready(function () {
    // Cloning main navigation for mobile menu
    $(".mobile-navigation").append($(".main-navigation .menu").clone());

    // Mobile menu toggle
    $(".menu-toggle").click(function () {
      $(".mobile-navigation").slideToggle();
    });

   // Map setup
   var map = $(".map");
   var latitude = map.data("latitude");
   var longitude = map.data("longitude");

   if (map.length) {
	 var iframeUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3153.853980397094!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1626788937452!5m2!1sen!2sus`;
	 var iframe = `<iframe width="100%" height="400" frameborder="0" style="border:0" src="${iframeUrl}" allowfullscreen></iframe>`;
	 map.html(iframe);
   }
 });

 $(window).load(function () {});
})(jQuery, document, window);