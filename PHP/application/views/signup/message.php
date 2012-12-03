<div class="row well span4 offset3">
	<div class="leaderboard offset1">
		<h2>
			<?php if(!isset($message_title))
			{
				echo "404 - Y U NO PLAY GAME!";
			}
			else
			{
				echo $title;
			}
		 	?>
		</h2>
	</div>
	<div class="form-actions">
		<p><?php if(!isset($message_title))
		{
			echo "404 - Y U NO PLAY GAME!";
		}
		else
		{
			echo $message;
		}
		?></p>
	</div>
</div>