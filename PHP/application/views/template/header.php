<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8" />
<title><?php echo $title; ?></title>

<script src="<?php echo base_url(); ?>assets/global/js/less.js"></script>
<script src="<?php echo base_url(); ?>assets/global/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/global/css/bootstrap.min.css" type="text/css" media="screen" title="no title" charset="utf-8">

<?if(!empty($css)):?>
 	<?foreach($css as $asset):?>
 		<link href="<?php echo base_url(); ?>assets/<?php echo $asset; ?>" rel="stylesheet/less" type="text/css" media="screen">
  	<?endforeach;?>
<?endif;?>
<?if(!empty($js)):?>
 	<?foreach($js as $asset): ?>
 		<script type="text/javascript" src="<?php echo base_url(); ?>assets/<?php echo $asset; ?>"></script>
 	<?endforeach;?>
<?endif;?>

</head>

<body>

<div id="container">
  <div id="header">
    <h1>Tank Logo</h1> 
    <h1>Version Logo</h1>
    <ul id="navigation">
      <li><a title="Dashboard" href="index.php/"><img src="assets/icon/glyphicons_020_home.png" alt="Dashboard Icon"></img>Dashboard</a></li>
      <li><a title="Game" href="index.php/game"><img src="assets/icon/glyphicons_086_display.png" alt="Game Icon"></img>Game</a></li>
      <li><a title="Configuration" href="index.php/config"><img src="assets/icon/glyphicons_019_cogwheel.png" alt="Configuration Icon"></img>Configuration</a></li>
      <li><a title="Reports" href="index.php/reports"><img src="assets/icon/glyphicons_041_charts.png" alt="Reports Icon"></img>Reports</a></li>
      <li><a title="Statistics" href="index.php/stats"><img src="assets/icon/glyphicons_040_stats.png" alt="Stats Icon"></img>Statistics</a></li>
      <li><a title="Sign Up" href="index.php/login/signup"><img src="assets/icon/glyphicons_063_power.png" alt="Log Out Icon"></img>Sign Up</a></li>
    </ul>
  </div>
