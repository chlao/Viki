$(document).ready(function(){
	$('#search__box').focus(); 
}); 

$('#search__box').on('keyup', function(){
	var c = $(this).val(); 
	var per_page = 5; 
	var with_people = true; 
	var app = '100266a'; 
	var t = $.now();

	if (c.length == 0 || $.trim(c) == ''){
		$('#search__suggestions').css('display', 'none'); 
	} else {

		$.ajax({
			url: 'https://api.viki.io/v4/search.json?' + 
				 'c=' + c + 
				 '&per_page=' + per_page + 
				 '&with_people=' + with_people + 
				 '&app=' + app + 
				 '&t=' + t, 
			dataType: 'jsonp', 
			jsonp: "callback",
			success: processSuggestions
		}); 
	}
}); 

var processSuggestions = debounce(function (suggestions){
	var searchValue = $('#search__box').val(); 

	if (searchValue.length == 0 || $.trim(searchValue) == ''){
		$('#search__suggestions').css('display', 'none'); 
	} else {
		$('#search__suggestions').empty(); 
		$('#search__suggestions').css('display', 'block'); 

		for (var i = 0; i < suggestions.length; i++){
			$('#search__suggestions').append('<li class="suggestions__item clearfix">' + 
												'<a class="suggestions__link" href="https://www.viki.com/' + suggestions[i].u.w + '">' +  
											 	'<img class="suggestions__img" alt="" src="' + suggestions[i].i + '"/>' + 
											 	'<div class="suggestions__description">' + suggestions[i].tt + '</div>' + 
											 	'</a>' + 
											  '</li>'); 
	 	} 
	}
}, 300); 


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};