$(document).ready(function(){

	var view = $('#users_content').attr("val");
	
	switch (view) {
		case 'bannedUsers':
			$("#allUsers_container").removeClass("active");
			$("#bannedUsers_container").addClass("active");
			break;
		default:
			$("#allUsers_container").addClass("active");
			$("#bannedUsers_container").removeClass("active");
			break;
	}

	//get page
	function geturl(addr) {  
		var r = $.ajax({  
		 type: 'GET',  
		 url: addr,  
		 async: false  
		}).responseText;  
		return r;  
	};

	//show page
	var users_view = base_url+'admin/'+view;
	$('#users_content').html(geturl(users_view));
	
	$("a#allUsers_div").click(function(e)
	{
		e.preventDefault();
		
		$("#allUsers_container").addClass("active");
		$("#reportedUsers_container").removeClass("active");
		$("#bannedUsers_container").removeClass("active");
		
		var users_view = base_url+'admin/allUsers';
		$('#users_content').html(geturl(users_view));
		
		window.history.pushState("Manage Users", "Manage Users", base_url+'admin/home/allUsers');
	});
	
	$("a#bannedUsers_div").click(function(e)
	{
		e.preventDefault();
		
		$("#allUsers_container").removeClass("active");
		$("#reportedUsers_container").removeClass("active");
		$("#bannedUsers_container").addClass("active");
		
		var users_view = base_url+'admin/bannedUsers';
		$('#users_content').html(geturl(users_view));
		
		window.history.pushState("Manage Users", "Manage Users", base_url+'admin/home/bannedUsers');
	});
	
});