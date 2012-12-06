<div class="row">
	<div class="span12">
		<h3>My Stats</h3>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Kills</th>
					<th>Deaths</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><?php echo $userStats[0]['rank']; ?></td>
					<td><?php echo $userStats[0]['kills']; ?></td>
					<td><?php echo $userStats[0]['deaths']; ?></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>


<div class="row">
	<div class="span4">
		<h3> Top Gun </h3>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Rank</th>
					<th>User</th>
					<th>Kills</th>
				</tr>
			</thead>
			<tbody>
				<?php 
				$count = 1;
				foreach ($topGun as $row)
				{
				?>
				<tr>
					<td><?php echo $count; ?></td>
					<td><?php echo $row['username']; ?></td>
					<td><?php echo $row['kills']; ?></td>
				</tr>
				<?php 
				$count++;
				}
				?>
			</tbody>
		</table>
	</div>

	<div class="span4">
		<h3> Worst Gun </h3>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Rank</th>
					<th>User</th>
					<th>Kills</th>
				</tr>
			</thead>
			<tbody>
					<?php 
					$count = 1;
					foreach ($worstGun as $row)
					{
					?>
					<tr>
						<td><?php echo $count; ?></td>
						<td><?php echo $row['username']; ?></td>
						<td><?php echo $row['kills']; ?></td>
					</tr>
					<?php 
					$count++;
					}
					?>
			</tbody>
		</table>
	</div>

	<div class="span4">
		<h3> Graveyard Bound </h3>
		<table id="myTable" class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Rank</th>
					<th>User</th>
					<th>Deaths</th>
				</tr>
			</thead>
			<tbody>
				<?php 
				$count = 1;
				foreach ($graveYard as $row)
				{
				?>
				<tr>
					<td><?php echo $count; ?></td>
					<td><?php echo $row['username']; ?></td>
					<td><?php echo $row['deaths']; ?></td>
				</tr>
				<?php 
				$count++;
				}
				?>
			</tbody>
		</table>
	</div>
</div>