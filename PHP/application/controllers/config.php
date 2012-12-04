<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class config extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$data["title"] = "Tanks Dashboard";
		$data['assets'] = array('css' => null,
							'js' => array("config/config.js"));
		$data['error'] = "";
		
		//Assets are used to load LESSCSS, or Javascript
/*		$data['assets'] = array('css' => null,
								'js' => array("login/js/bla.js", "login/js/blabla.js"));*/
		$data["view"] = 'config/index.php';
		$this->load->view('template/template', $data);
	}

	function getFormData(){
		$userid = $_POST['userid'];
		$form_data = $this->config_model->getFormData($userid);
		echo json_encode($form_data);
	}

	function sendFormData(){
		$userid = $_POST['username'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		$password2 = $_POST['password2'];
		$password3 = $_POST['password3'];
		$response = "";
		if(strlen($password3)==0 or strlen($password2)==0 or strlen($password)==0 or strlen($email)==0 or strlen($userid)==0){
			$response = 'Please fill out form completely';
		}

		else if ($password2!=$password3){
			$response = 'passwords do not match';
		}

		else{
			$response = $this->config_model->sendFormData($userid,$email,$password,$password2,$password3);
		}

		echo json_encode($response);
	}

}