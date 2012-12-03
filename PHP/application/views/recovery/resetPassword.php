<div class="row well span6 offset3">

	<fieldset>
	<legend><h2>Login</h2></legend>
	</fieldset>	

	<form action="<?php echo base_url(); ?>recovery/resetPassword2" method="post" accept-charset="utf-8">
		
		<br />
		<div class="row">
			<div class="control-group span4 offset1">
				<label class="control-label" for="username">Username/Email: </label>
				<div class="controls">
					<input type="text" name="email" readonly=true value="<?php echo $email; ?>" id="email" maxlength="100" class="span4" placeholder="Username or Email Address">
				</div>
			</div>
		</div>
		
		<input type="hidden" name="token" value="<?php echo $token; ?>">
		
		<div class="row">
			<div class="control-group span4 offset1">
				<label class="control-label" for="password">Password: </label>
				<div class="controls">
					<input type="password" name="password" value="" id="password" maxlength="100" class="span4" placeholder="Password">
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="control-group span4 offset1" id="password2_div">
				<label class="control-label" for="password2">Confirm Password: </label>
				<div class="controls">
					<input type="password" id="password2" name="password2" value="" class="signup_password2 span4" maxlength="100" placeholder="Confirm Password">
				</div>
			</div>
		</div>
		
		<div class="row">
			<input type="submit" name="submit" value="Reset Password" id="reset" class="login_submit btn btn-primary offset1">
		</div>
	<hr>
	<div class="submit-error-div span4 offset1"><?php echo $error; ?></div>
	
	</form>
</div>