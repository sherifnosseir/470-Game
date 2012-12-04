	function getTables(){
		$.ajax({                                      
		  url: "/elTanko/PHP/stats/getTables",	  //the script to call to get data
		  type: "POST",
		  data: "userid="+userid,                        //you can insert url argumnets here to pass to api.php
										   //for example "id=5&parent=6"
		  dataType: 'json',                //data format      
		  success: function(data)          //on recieve of reply
		  {
		  	console.log(data['top_gun'].length);

		  	if(data['top_gun']!=null){
		  		top_gun_rows = data['top_gun'].length;
		  		top_gun_tbody = "";
		  		for(i=0;i<top_gun_rows;i++){
		  			top_gun_tbody += '<tr>' + '<td>' + data['top_gun'][i]['username'] + '</td>' + '<td>' + data['top_gun'][i]['kills'] + '</td>' + '</tr>';	
		  		}
		  		$('#top_gun').html(top_gun_tbody);
		  	}
		  	else{
		  		$('#top_gun').html("");
		  	}

		  	if(data['worst_gun']!=null){
		  		worst_gun_rows = data['worst_gun'].length;
		  		worst_gun_tbody = "";
		  		for(i=0;i<worst_gun_rows;i++){
		  			worst_gun_tbody += '<tr>' + '<td>' + data['worst_gun'][i]['username'] + '</td>' + '<td>' + data['worst_gun'][i]['kills'] + '</td>' + '</tr>';	
		  		}
		  		$('#worst_gun').html(worst_gun_tbody);
		  	}
		  	else{
		  		$('#worst_gun').html("");
		  	}

		  	if(data['grave_yard']!=null){
		  		grave_yard_rows = data['grave_yard'].length;
		  		grave_yard_tbody = "";
		  		for(i=0;i<grave_yard_rows;i++){
		  			grave_yard_tbody += '<tr>' + '<td>' + data['grave_yard'][i]['username'] + '</td>' + '<td>' + data['grave_yard'][i]['deaths'] + '</td>' + '</tr>';	
		  		}
		  		$('#grave_yard').html(grave_yard_tbody);
		  	}
		  	else{
		  		$('#grave_yard').html("");
		  	}



		  } 
		});  
	}


	$(document).ready(function() {
		setInterval(getTables, 800);

	});