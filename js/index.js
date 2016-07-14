$('#search__box').on('keyup', function(){
	var c = $(this).val(); 
	var per_page = 5; 
	var with_people = true; 
	var app = '100266a'; 
	var t = $.now();

	if (c.length == 0){
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

function processSuggestions(suggestions){
	$('#search__suggestions').empty(); 
	$('#search__suggestions').css('display', 'block'); 

	for (var i = 0; i < suggestions.length; i++){
		$('#search__suggestions').append('<li class="search__suggestions__item">' + 
											'<a class="suggestions__link" href="https://www.viki.com/' + suggestions[i].u.w + '">' +  
										 	'<img class="suggestions__img" alt="" src="' + suggestions[i].i + '"/>' + 
										 	'<span class="suggestions__description">' + suggestions[i].tt + '</span>' + 
										 	'</a>' + 
										  '</li>'); 
 	}
	
	console.log(suggestions); 
}