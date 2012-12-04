<div class="row well span6 offset3" id="signup_form">

	<fieldset>
	<legend><h2>Signup</h2></legend>
	</fieldset>	
	
	<form action="<?php echo base_url(); ?>login/signup" method="post" accept-charset="utf-8" id="signup_submit">
		<br />
		<div class="row">
			<div class="control-group span4 offset1" id="username_div">
				<label class="control-label" for="username">Username: </label>
				<div class="controls">
					<input type="text" name="username" id="username" value="" class="signup_username span4" maxlength="100" placeholder="Username">
				</div>
			</div>
		</div>
		
		<div id="username-help" class="help offset5">
			<p>Username must be at least 4 characters</p>
		</div>
		
		<div id="username-error-display" class="error-display">
			<p></p>
		</div>
	
		<div class="row">
			<div class="control-group span4 offset1" id="email_address_div">
				<label class="control-label" for="email">Email: </label>
				<div class="controls">
					<input type="text" name="email_address" id="email" value="" class="signup_email_address span4" maxlength="100" placeholder="Email Address">
				</div>
			</div>
		</div>
		
		<div id="email_address-error-display" class="error-display">
			<p></p>
		</div>
	
		<div class="row">
			<div class="control-group span4 offset1" id="password_div">
				<label class="control-label" for="password">Password: </label>
				<div class="controls">
					<input type="password" name="password" id="password" value="" class="signup_password span4" maxlength="100" placeholder="Password">
				</div>
			</div>
		</div>
		
		<div id="password-help" class="help offset5">
			<p>Password must be at least 6 characters long.</p>
		</div>
		
		<div id="password-error-display" class="error-display">
			<p></p>
		</div>
	
		<div class="row">
			<div class="control-group span4 offset1" id="password2_div">
				<label class="control-label" for="password2">Confirm Password: </label>
				<div class="controls">
					<input type="password" id="password2" name="password2" value="" class="signup_password2 span4" maxlength="100" placeholder="Confirm Password">
				</div>
			</div>
		</div>
		
		<div id="password2-error-display" class="error-display">
			<p></p>
		</div>
	
	

		<div class="row">
			<input type="submit" name="submit" value="Sign Up" class="signup_submit btn btn-primary offset4">
			<div class="submit-error-div span4 offset1"></div>
		</div>
	</form>
	
</div>
