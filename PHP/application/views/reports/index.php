<div class="container">
	<div class="leaderboard">
		<h2>Busiest Day Ever: <?php echo $max['date']; ?></h2>
		<h2>With a count of <?php echo $max['MAX']; ?> users</h2>
	</div>
	<div id="chartcontainer">Please enable Javascript</div>
	
	<script type="text/javascript">
		var myData = new Array(
			<?php
			$count = count($gameData);
			$counter = 1;
			foreach ($gameData as $row)
			{
				if($counter == $count)
				{?>
					["<?php echo $row->date; ?>", <?php echo $row->count; ?>]);
				<?php 
				}
				else
				{?>
					["<?php echo $row->date; ?>", <?php echo $row->count; ?>],
				<?php
					$counter++;
				}
			} ?>
			
		var myChart = new JSChart('chartcontainer', 'bar');
		
		var width = $(window).width();
		var height = $(window).height();
		myChart.resize(width-500, height-150);
		myChart.setDataArray(myData);
		myChart.setAxisNameX('Date');
		myChart.setAxisNameY('# Users');
		myChart.setTitle('Users Per Day');
		myChart.draw();
		
		$(window).resize(function() {
		  	var width = $(window).width();
			var height = $(window).height();
			myChart.resize(width-400, height-100);
		});
	</script>
</div>