	function getFormData(){
		$.ajax({                                      
		  url: "/elTanko/PHP/config/getFormData",	  //the script to call to get data
		  type: "POST",
		  data: "userid="+userid,                        //you can insert url argumnets here to pass to api.php
										   //for example "id=5&parent=6"
		  dataType: 'json',                //data format      
		  success: function(data)          //on recieve of reply
		  {
		  	console.log(data[0]);
		  	$("#username").val(data[0]['username']);
		  	$("#email").val(data[0]['email']);



		  } 
		});  
	}

	function sendFormData(){
		$.ajax({                                      
		  url: "/elTanko/PHP/config/sendFormData",	  //the script to call to get data
		  type: "POST",
		  data: $("#username").serialize()+"&"+$("#email").serialize()+"&"+$("#password").serialize()+"&"+$("#password2").serialize()+"&"+$("#password3").serialize(),
                        //you can insert url argumnets here to pass to api.php
										   //for example "id=5&parent=6"
		  dataType: 'json',                //data format      
		  success: function(data)          //on recieve of reply
		  {
		  	$("#response").html(data);


		  } 
		});  
	}

	$(document).ready(function() {
		getFormData();
		$('#save_button').click(function(e){
				e.preventDefault();
				sendFormData();
		});

	});