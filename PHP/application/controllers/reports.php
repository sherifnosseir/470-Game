<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class reports extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$data["title"] = "Tanks Reports";
		$data['assets'] = array('css' => null,
							'js' => array('reports/js/jscharts.js'));
		$data['error'] = "";
		
		$this->load->model('game_log_model');
		$data['gameData'] = $this->game_log_model->getGameStatistics();
		$data['max'] = $this->game_log_model->getMaxConnections();
		
		$data["view"] = 'reports/index.php';
		$this->load->view('template/template', $data);
	}

}