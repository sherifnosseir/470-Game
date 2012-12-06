<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8" />
<title>Admin elTanko</title>

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

<?php if($view == "game/index.php")
{
	?>
	<script>var username = "<?php echo $this->session->userdata("username"); ?>"</script>
	<?php
}

?>


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
	    <a class="brand" href="<?php echo base_url(); ?>admin"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_020_home.png" alt="Dashboard Icon"></img> Dashboard</a>
	    <ul class="nav pull-right">
	<?php $isLoggedIn = $this->session->userdata('admin_logged_in');
	if(!isset($isLoggedIn)||$isLoggedIn != true)
	{
	?>
		<li><a href="<?php echo base_url(); ?>admin/login"><i class="icon-user"></i> Login</a></li>
	<?php
	}
	else
	{
	?>	
		<li><a href="<?php echo base_url(); ?>admin/logout"><img src="<?php echo base_url(); ?>assets/icon/glyphicons_063_power.png" alt="Log Out Icon"></img> Logout</a></li>
	<?php

	}
	
	?>

	    </ul>
	  </div>
	</div>