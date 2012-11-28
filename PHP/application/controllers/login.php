<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$data["title"] = "TheGame Login";
		$data['assets'] = array('css' => null,
							'js' => null);
		
		//Assets are used to load LESSCSS, or Javascript
/*		$data['assets'] = array('css' => null,
								'js' => array("login/js/bla.js", "login/js/blabla.js"));*/
		$data["view"] = 'login/index.php';
		$this->load->view('template/template', $data);
	}

}