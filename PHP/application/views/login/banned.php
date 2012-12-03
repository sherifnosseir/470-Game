<div class="row well span4 offset3">
	<div class="leaderboard offset1">
		<h2>Banned</h2>
	</div>
	<div class="form-actions">
		<p>Sorry <?php echo $username; ?>, you've been banned.</p>
		
		<?php if($reason!=""){ ?>
		<h4>Reason:</h4>
		<p><?php echo $reason; ?></p>
		<?php } ?>
	</div>
	
	<div class="form-actions">
		<p class="help-block">Please Contact <a href="<?php echo base_url(); ?>contactus/">Support</a></p>
	</div>
</div>