<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class stats extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$data["title"] = "Tanks Dashboard";
		$data['assets'] = array('css' => null,
							'js' => array("stats/stats.js"));
		$data['error'] = "";
		
		//Assets are used to load LESSCSS, or Javascript
/*		$data['assets'] = array('css' => null,
								'js' => array("login/js/bla.js", "login/js/blabla.js"));*/
		$data["view"] = 'stats/index.php';
		$this->load->view('template/template', $data);
	}

	function getTables(){
		$userid = $_POST['userid'];
		$top_gun = $this->stats_model->getTopGunTable($userid);
		$worst_gun = $this->stats_model->getWorstGunTable($userid);
		$grave_yard = $this->stats_model->getGraveTable($userid);
		$array = Array(
		'top_gun' => $top_gun,
		'worst_gun' => $worst_gun,
		'grave_yard' => $grave_yard,
		);
		echo json_encode($array);
	}

}