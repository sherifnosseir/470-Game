	//get page
	function geturl(addr) {  
		var r = $.ajax({  
		 type: 'GET',  
		 url: addr,  
		 async: false  
		}).responseText;  
		return r;  
	};

	function getTables(){
		$("#topStatsTable").html(geturl("/elTanko/PHP/stats/getTables"));
	}


	$(document).ready(function() {
		setInterval(getTables, 800);

	});