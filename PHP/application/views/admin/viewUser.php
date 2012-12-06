<div class="container">
	<div class="row well">
		<div class="leaderboard">
			<h2>Summary about <?php echo $userinfo['username']; ?></h2>
		</div>
	
			<div class="row well">
				<div class="span12">
					<p>Kills: <?php echo $userinfo['kills']; ?></p>
					<p>Deaths: <?php echo $userinfo['deaths']; ?></p>
				</div>
			</div>

	<div class="row well">
		<div class="leaderboard">
			<h2>Actions</h2>
		</div>
	
		<div class="row form-actions span10">
			<div class="span10">
				<?php if ($userinfo['banned'] == 0)
				{ ?>
					<form action="<?php echo base_url()."admin/banUser/".$userinfo['username']; ?>" method="post" accept-charset="utf-8">
						<div class="control-group" id="reason">
							<label class="control-label" for="reason">Reason</label>
							<div class="controls">
								<input type="text" name="reason" id="reason" class="span8" value="<?= set_value('reason'); ?>" placeholder="Reason">
							</div>
						</div>
						<button type="submit" class="btn btn-danger"><i class="icon-remove icon-white"></i> Ban User</button>
					</form>
				<?php 
				}
				else
				{ ?>
					<p>Banned for: <?php echo $bannedReason["reason"]; ?></p>
					<form action="<?php echo base_url()."admin/unBanUser/".$userinfo['username']; ?>" method="post" accept-charset="utf-8">
						<button type="submit" class="btn btn-success"><i class="icon-ok icon-white"></i> Unban User</button>
					</form>
				<?php } ?>
			</div>
		</div>
	</div>
</div>