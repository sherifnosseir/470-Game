<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller{

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
		if($this->isLoggedIn())
		{
			redirect("dashboard");
		}
		else
		{	
			$data["title"] = "TheGame Login";
			$data['assets'] = array('css' => null,
								'js' => null);
		
			//Assets are used to load LESSCSS, or Javascript
/*			$data['assets'] = array('css' => null,
									'js' => array("login/js/bla.js", "login/js/blabla.js"));*/
								
			$data["username"] = array(
				              'name'        => 'username',
				              'id'          => 'username',
				              'value'       => '',
				              'maxlength'   => '100',
				         	'class'		=> 'login_username'
				            );
			$data["password"] = array(
						              'name'        => 'password',
						              'id'          => 'password',
						              'value'       => '',
						              'maxlength'   => '100',
						              'class'		=> 'login_password'
						            );
			$data['error'] = "";
		
			$data["view"] = 'login/index.php';
			$this->load->view('template/template', $data);
		}
	}
	
	function check_login_info(){
		$this->load->library("form_validation");
		$this->form_validation->set_message('_validate_credentials','That Email and Password combination is not valid');
		$this->form_validation->set_message('_notbanned','You have been banned from the game!');
		$this->form_validation->set_rules('username','username','trim|required');
		$this->form_validation->set_rules('password','Password','trim|required');
		$this->form_validation->set_rules('nothing','Credentials','callback__validate_credentials');

		$username = $this->input->post("username");
		if($this->form_validation->run()== TRUE){
			$this->load->model('user_model');
			
			$banInfo = $this->user_model->isBanned($username);
			
			if($banInfo == false)
			{
				$userInfo = $this->user_model->getUserInfo($username);
				
				$data = array(
					'username'=> $userInfo["username"],
					'isLoggedIn'=> true
					);

				$this->session->set_userdata($data);
				redirect("dashboard");
			}
			else
			{
				$this->bannedUser($banInfo[0]->username, $banInfo[0]->reason);
			}
		}
		else
		{
			$data["title"] = "TheGame Login";
			$data['assets'] = array('css' => null,
								'js' => null);

			//Assets are used to load LESSCSS, or Javascript
	/*		$data['assets'] = array('css' => null,
									'js' => array("login/js/bla.js", "login/js/blabla.js"));*/

			$data["username"] = array(
				              'name'        => 'username',
				              'id'          => 'username',
				              'value'       => $username,
				              'maxlength'   => '100',
				         	'class'		=> 'login_username'
				            );
			$data["password"] = array(
						              'name'        => 'password',
						              'id'          => 'password',
						              'value'       => '',
						              'maxlength'   => '100',
						              'class'		=> 'login_password'
						            );
			$data['error'] = "Please check your username or password";

			$data["view"] = 'login/index.php';
			$this->load->view('template/template', $data);
		}
	}
	
	function _validate_credentials(){
		$query = false;
		$this->load->model('user_model');
		$query = $this->user_model->validate();

		if($query)
		{
			return true;
		}
		return false;
	}
	
	function bannedUser($username, $reason)
	{	
		$data['title'] = 'Banned';
		$data['reason'] = $reason;
		$data['username'] = $username;
		$data['view'] = 'login/banned';
		$data['assets'] = null;
		$this->load->view('template/template.php', $data);
	}
	
	function logout()
	{
		$this->session->sess_destroy();
		redirect("dashboard");
	}
}