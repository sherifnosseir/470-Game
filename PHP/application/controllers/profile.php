<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Profile extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function isLoggedIn()
	{
		$isLoggedIn = $this->session->userdata('isLoggedIn');

		if(!isset($isLoggedIn)||$isLoggedIn != true)
		{
			return false;
		}
		return true;
	}
	
	function index()
	{
		if(!$this->isLoggedIn())
		{
			redirect("login");
		}
		else
		{
			
			$data["title"] = "Profile";
			$data["assets"] = array('css' => array("signup/less/signup.less"),
									'js' => array("signup/js/signup.js"));
			$data['error'] = "";
		
			//Assets are used to load LESSCSS, or Javascript
/*			$data['assets'] = array('css' => null,
									'js' => array("login/js/bla.js", "login/js/blabla.js"));*/
			$data["view"] = 'signup/index.php';
			$this->load->view('template/template', $data);	
		}
	}

}