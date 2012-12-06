<script type="text/javascript" charset="utf-8" src="<?php echo base_url(); ?>assets/admin/js/pagination.js"></script>
<div class="">
	<?php foreach ($users as $row)
	{ ?>
		<div class="row">
			<div class="span5">
				<h2><a href="<?= base_url().'admin/viewUser/'.$row->username; ?>"><?php echo $row->username;?></a></h2>
				<p><?php echo $row->email;?></p>
			</div>
		</div>
		<hr>
	<?php } ?>
	
	<div class="pagination">
		<ul>
			<?= $this->pagination->create_links();?>
		</ul>
	</div>
</div>