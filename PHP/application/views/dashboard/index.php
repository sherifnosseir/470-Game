<div class="container">
	<div class="leaderboard">
		<h2>Hello <?php echo $this->session->userdata("username"); ?></h2>
		<h2>What would you like to do?</h2>
	</div>
	
	<ul class="nav nav-tabs nav-stacked">
	 	<li><a href="game">Play Game</a></li>
		<li><a href="stats">View Stats</a></li>
		<li><a href="reports">See game reports and growth</a></li>
	</ul>
</div>