<div class="container">	
	<div class="row well span4 offset3">
		<h2>Admin Login</h2>
		<br/>
			<?echo form_fieldset();?>
			
			<?if(validation_errors()):?>
				<ul class="CH_error CH_info">
					<?echo validation_errors('<li>','</li>')?>
				</ul>
			<?endif;?>
			<?php
			echo form_open('admin/login');?>
			<div class="span4">
				<input type="text" name="admin_username" placeholder="Username">
				<input type="password" name="admin_password" placeholder="Password">
			</div>
			<div class="span4 offset2">
				<input type="submit" class="btn btn-primary" value="Login"></input>
			</div>

			<?echo form_fieldset_close();?>
	</div>
</div>