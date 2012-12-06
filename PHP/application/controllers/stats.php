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
		$data["userStats"] = $this->stats_model->getUserStats();
		$data['topGun'] = $this->stats_model->getTopGunTable();
		$data['worstGun'] = $this->stats_model->getWorstGunTable();
		$data['graveYard'] = $this->stats_model->getGraveTable();
		
		$this->load->view('stats/topStats.php', $data);
	}

}