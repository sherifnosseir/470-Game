<? 
$state  = 1;
if ($state =1){
	$url = "http://localhost/elTanko/PHP/game";
}
else{
	$url = "http://cmpt470.csil.sfu.ca:9016/index.html";
}

?>


<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8" />
<title><?php echo $title; ?></title>

<SCRIPT type="text/javascript">
    base_url = "<?=base_url() ?>";
</SCRIPT>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/global/css/bootstrap.min.css" type="text/css" media="screen" title="no title" charset="utf-8">

<?if(!empty($css)):?>
 	<?foreach($css as $asset):?>
 		<link href="<?php echo base_url(); ?>assets/<?php echo $asset; ?>" rel="stylesheet/less" type="text/css" media="screen">
  	<?endforeach;?>
<?endif;?>

<?// echo base_url();?>

<script src="<?php echo base_url(); ?>assets/global/js/jquery-1.8.2.min.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo base_url(); ?>assets/global/js/less.js"></script>
<script src="<?php echo base_url(); ?>assets/global/js/bootstrap.min.js"></script>
<?if(!empty($js)):?>
 	<?foreach($js as $asset): ?>
 		<script type="text/javascript" src="<?php echo base_url(); ?>assets/<?php echo $asset; ?>"></script>
 	<?endforeach;?>
<?endif;?>
</head>

<body>
	
	<div class="navbar">
	  <div class="navbar-inner">
	    <a class="brand" href="<?php echo base_url(); ?>dashboard"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_020_home.png" alt="Dashboard Icon"></img> Dashboard</a>
	    <ul class="nav pull-right">
	<?php $isLoggedIn = $this->session->userdata('isLoggedIn');
	if(!isset($isLoggedIn)||$isLoggedIn != true)
	{
	?>
		<li class="active"><a href="<? echo base_url();?>game"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_086_display.png" alt="Game Icon"></img> Game</a></li>
		<li><a href="<?php echo base_url(); ?>login"><i class="icon-user"></i> Login</a></li>
		<li><a href="<?php echo base_url(); ?>signup"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_063_power.png" alt="Log Out Icon"></img> Sign Up</a></li>
	<?php
	}
	else
	{

	?>	
		<script>var userid = "<?php echo $this->session->userdata("username"); ?>"</script>
		<li class="active"><a href="<? echo base_url();?>game"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_086_display.png" alt="Game Icon"></img> Game</a></li>
	  	<li><a href="<?php echo base_url(); ?>config"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_019_cogwheel.png" alt="Configuration Icon"></img> Configuration</a></li>
	  	<li><a href="<?php echo base_url(); ?>reports"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_041_charts.png" alt="Reports Icon"></img> Reports</a></li>
		<li><a href="<?php echo base_url(); ?>stats"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_040_stats.png" alt="Stats Icon"></img> Statistics</a></li>
		<li><a href="#"><i class="icon-user"></i> <?php echo $this->session->userdata("username"); ?></a></li>
		<li><a href="<?php echo base_url(); ?>login/logout"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_063_power.png" alt="Log Out Icon"></img> Logout</a></li>
	<?php

	}
	
	?>

	    </ul>
	  </div>
	</div>

<?php
if($view != "game/index.php")
{
?>
	<div class="container">
<?php
} 
?>