<div class="row well span5 offset3">
	<div class="leaderboard">
		<h2>Forgot Password</h2>
	</div>
	
	<div class="form-actions">
		<form action="<?php echo base_url(); ?>recovery/resetPassword" method="post" accept-charset="utf-8">

			<div class="row">
				<div class="submit-error-div span4"><?php echo $error; ?></div>
			</div>
			
			<br />
			<div class="row">
				<div class="control-group span4">
					<label class="control-label" for="username">Email: </label>
					<div class="controls">
						<input type="text" name="email" value="" id="email" maxlength="100" class="span4" placeholder="Email Address">
					</div>
				</div>
			</div>

			<div class="row">
				<div class="span4 offset1">
					<input type="submit" name="submit" value="Recover Password" id="recover" class="btn btn-danger">
				</div>
			</div>
	</div>
</div>