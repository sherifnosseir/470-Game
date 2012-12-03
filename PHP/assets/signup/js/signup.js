function check(field){
	if($("input.signup_"+field).val() == "")
	{
		$("#"+field+"_div").removeClass("success");
		$("#"+field+"_div").removeClass("error");
		$('#'+field+'-error-display').fadeOut(250);
		$('.submit-error-div').fadeOut(250);
	}
	else
	{
		$("#"+field+"_div").removeClass("success");
		$("#"+field+"_div").removeClass("error");
		$.ajax({
			type: "POST",
			url: base_url+"index.php/signup/check_"+field,
			data: field+"="+$("input.signup_"+field).val(),
			success: function(msg){
				if(msg=="true")
				{
					$("#"+field+"_div").addClass("success");
					$('#'+field+'-error-display').fadeOut(250);
				}
				else
				{
					$("#"+field+"_div").addClass("error");
					$('#'+field+'-error-display').fadeIn(250);
					var error = "";
					switch(field)
					{
						case "username":
						//<p>The Username field may only contain alpha-numeric characters, spaces, underscores, and dashes.</p>
							var textbox = document.getElementById("username");
							var textlength = textbox.value.length;
							if(textlength < 4)
							{
								error = "Username must be at least 4 characters";
							}
							else
							{
								if(msg.indexOf("alpha-numeric characters, spaces, underscores, and dashes") != -1)
								{
									error = "Only Alphabets, Numbers, _ or - allowed."
								}
								else
								{
									error = "Sorry, Username already taken. Please try again";
								}
							}
							break;
						case "email_address":
						//<p>The Email Address field must contain a unique value.</p>
						//<p>The Email Address field must contain a valid email address.</p>
							if(msg.indexOf("valid") != -1)
							{
								error = "Please enter a correct Email address";
							}
							else
							{
								error = "E-mail already used by another account";
							}
						break;
						case "password":
							var textbox = document.getElementById("password");
							var textlength = textbox.value.length;
							
							if(textlength < 4)
							{
								error = "Password too short. Must be at least 4 characters"
							}
							
							if(textlength > 32)
							{
								error = "Password too long. Not longer than 32 characters"
							}
							break;
					}
					$('#'+field+"-error-display p").html(error);
				}
			}
		});
		
		if(field=="password")
		{
			confirmPassword();
		}
	}
}

function confirmPassword()
{
	if($("input.signup_password2").val() == "")
	{
		$("#password2_div").removeClass("success");
		$("#password2_div").removeClass("error");
	}
	else
	{
		$("#password2_div").removeClass("success");
		$("#password2_div").removeClass("error");
		
		$.ajax({
			type: "POST",
			url: base_url+"index.php/signup/check_password2",
			data: "password="+$('input.signup_password').val()+"&password2="+$('input.signup_password2').val(),
			success: function(msg){
				if(msg=="true")
				{
					$("#password2_div").addClass("success");
					$('#password2-error-display').fadeOut(250);
				}
				else
				{
					$("#password2_div").addClass("error");
					error = "Password doesn't match. Check your password"
					$("#password2-error-display p").html(error);
					$('#password2-error-display').fadeIn(250);
				}
			}
		});
	}
}

function geturl(addr) {  
		var r = $.ajax({  
		 type: 'GET',  
		 url: addr,  
		 async: false  
		}).responseText;  
		return r;  
}; 

$(document).ready(function(){
	
	$(".help").hide();
	$(".error-display").hide();
	
	$('.signup_username').focus(function(){
		$("#username-help").fadeIn(250);
	});
	
	$('.signup_username').focusout(function(){
		$("#username-help").fadeOut(250);
	});
	
	$('.signup_password').focus(function(){
		$("#password-help").fadeIn(250);
	});
	
	$('.signup_password').focusout(function(){
		$("#password-help").fadeOut(250);
	});
	
	$('.ch-innerfeature #signup_content #password_help').hover(function(){
		$('.ch-innerfeature #signup_content #password_help_div').attr('hidden', false);
	},
	function()
	{
		$('.ch-innerfeature #signup_content #password_help_div').attr('hidden', true);
	});
	
	
	$('.ch-innerfeature #signup_content #username_help').click(function(){
		$('input.signup_username').focus();
	});
	
	$('.ch-innerfeature #signup_content #password_help').click(function(){
		$('input.signup_password').focus();
	});
	
	$('input.signup_username').focus();
	
	$('input.signup_email_address').blur(function(){
		check('email_address');
	});

	$('input.signup_username').blur(function(){
		check('username');
	});

	$('input.signup_password').blur(function(){
		check('password');
	});

	$('input.signup_password2').blur(function(){
		confirmPassword();
	});

	$('#signup_submit').submit(function() {
		var username = $('input.signup_username').val();
		var email_address = $('input.signup_email_address').val();
		var password = $('input.signup_password').val();
		var password2 = $('input.signup_password2').val();
		
		if(username != "" && email_address != "" && password != "" && password2 != "")
		{
			$.ajax({
				type: "POST",
				url: base_url+"index.php/signup/addUser",
				data: {username:username, email_address:email_address,password:password,password2:password2},
				success: function(msg){
					if(msg=="true")
					{
						$('input.signup_username').val("");
						$('input.signup_email_address').val("");
						$('input.signup_password').val("");
						$('input.signup_password2').val("");
						$('.submit-error-div').fadeIn(250);
						$('.submit-error-div').html("Account created successfully");
					}
					else if(msg=="db_error")
					{
						alert('db_error');
					}
					else
					{
						$('.submit-error-div').fadeIn(250);
						$('.submit-error-div').html("Please Fix Validation Errors");
						check("username");
						check("email_address");
						check("password");
						confirmPassword();
					}
				}
			});
		}
		else
		{
			$('.submit-error-div').fadeIn(250);
			$('.submit-error-div').html("Please Fill All Forms");
		}
		return false;
	});

});