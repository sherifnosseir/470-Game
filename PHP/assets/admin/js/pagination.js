$(document).ready(function(){
	
	//get page
	function geturl(addr) {  
		var r = $.ajax({  
		 type: 'GET',  
		 url: addr,  
		 async: false  
		}).responseText;  
		return r;  
	};
	
	$(".pagination a").click(function(e){
		e.preventDefault();
		
		var view = $(this).attr("href");
		$(".paginatedDiv").html(geturl(view));	
	});
});