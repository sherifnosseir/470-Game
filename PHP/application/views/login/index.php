<div class="row well span6 offset3">

	<fieldset>
	<legend><h2>Login</h2></legend>
	</fieldset>	

	<form action="<?php echo base_url(); ?>login/check_login_info" method="post" accept-charset="utf-8">
		
		<br />
		<div class="row">
			<div class="control-group span4 offset1">
				<label class="control-label" for="username">Username/Email: </label>
				<div class="controls">
					<input type="text" name="username" value="<?php echo $username['value']; ?>" id="username" maxlength="100" class="login_username span4" placeholder="Username or Email Address">
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="control-group span4 offset1">
				<label class="control-label" for="password">Password: </label>
				<div class="controls">
					<input type="password" name="password" value="" id="password" maxlength="100" class="login_password span4" placeholder="Password">
				</div>
			</div>
		</div>
		
		<div class="row">
			<a href="<?php echo base_url(); ?>login/recover" class="offset1">Forgot Password?</a>
			<input type="submit" name="submit" value="Login" id="login" class="login_submit btn btn-primary offset1">
		</div>
		
		<div class="row">
			<a href="<?php echo base_url(); ?>signup" class="offset1">Don't have an account?</a>
		</div>
	<hr>
	<div class="submit-error-div span4 offset1"><?php echo $error; ?></div>
	
	</form>
</div>