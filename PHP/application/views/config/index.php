<div class="row well span6 offset3" id="signup_form">

	<fieldset>
	<legend><h2>Edit Profile</h2></legend>
	</fieldset>
	
	<action form="<?php echo base_url(); ?>login/signup" method="post" accept-charset="utf-8" id="signup_">
		<br />
		<div class="row">
			<div class="control-group span4 offset1" id="username_div">
				<label class="control-label" for="username">Username: </label>
				<div class="controls">
					<input required readonly=true type="text" name="username" id="username" value="" class="signup_username span4" maxlength="100" placeholder="Username">
				</div>
			</div>
		</div>
		
		<div id="username-help" class="help offset5">
			
		</div>
		
		<div id="username-error-display" class="error-display">
			<p></p>
		</div>
	
		<div class="row">
			<div class="control-group span4 offset1" id="email_address_div">
				<label class="control-label" for="email">Email: </label>
				<div class="controls">
					<input required type="text" name="email" id="email" value="" class="signup_email_address span4" maxlength="100" placeholder="Email Address">
				</div>
			</div>
		</div>
		
		<div id="email_address-error-display" class="error-display">
			<p></p>
		</div>
	
		<div class="row">
			<div class="control-group span4 offset1" id="password_div">
				<label class="control-label" for="password">Old Password: </label>
				<div class="controls">
					<input required type="password" name="password" id="password" value="" class="signup_password span4" maxlength="100" placeholder="Password">
				</div>
			</div>
		</div>
		
		<div id="password-help" class="help offset5">
			
		</div>
		
		<div id="password-error-display" class="error-display">
			<p></p>
		</div>
	
		<div class="row">
			<div class="control-group span4 offset1" id="password2_div">
				<label class="control-label" for="password2">New Password: </label>
				<div class="controls">
					<input required type="password" id="password2" name="password2" value="" class="signup_password2 span4" maxlength="100" placeholder="Confirm Password">
					<label class="control-label" for="password2">New Password Confirm: </label>
					<input required type="password" id="password3" name="password3" value="" class="signup_password2 span4" maxlength="100" placeholder="Confirm Password">
				</div>
			</div>
		</div>
		
		<div id="password2-error-display" class="error-display">
			<p></p>
		</div>
	
	

		<div class="row">
			<input id="save_button" required type="submit" name="save" value="Save" class="signup_submit btn btn-primary offset4">
			<div class="submit-error-div span4 offset1"></div>
		</div>
		<p id="response"></p>
	</form>
	

	
</div>
