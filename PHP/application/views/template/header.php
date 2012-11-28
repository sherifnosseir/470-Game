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

<div class="navbar">
  <div class="navbar-inner">
    <a class="brand" href="#">The Game</a>
    <ul class="nav">
      <li class="active"><a href="#">Home</a></li>
	</ul>
	
	<ul class="nav pull-right">
      <li><a href="#">Sign Up</a></li>
      <li><a href="#">Login</a></li>
    </ul>
  </div>
</div>

<body>