<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class dashboard extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$data["title"] = "Tanks Dashboard";
		$data['assets'] = array('css' => null,
							'js' => null);
		$data['error'] = "";
		
		//Assets are used to load LESSCSS, or Javascript
/*		$data['assets'] = array('css' => null,
								'js' => array("login/js/bla.js", "login/js/blabla.js"));*/
		$data["view"] = 'dashboard/index.php';
		$this->load->view('template/template', $data);
	}


	function login_fail()
	{
		$data['view'] = "login_view";
		$data['title'] = "Can not log in";
		$data['error'] = "user doesn't exist";
		$this->load->view('includes/template', $data);
	}
	
	//This function is called when a user is successfully created
	function successful()
	{
		$data['view'] = "login_view";
		$data['title'] = "Login";
		$data['error'] = "Your Application has been granted, feel free to login.";
		$this->load->view('includes/template', $data);
	}
	
	//called when an error during login occurs, like the user isnt logged in
	function error()
	{
		
		//Destroy cookie
		$this->session->sess_destroy();
		
		redirect("login/loginerror");
	}
		
	//if trying to gain user access without logging in
	function loginerror()
	{
		$data['view'] = "login_view";
		$data['title'] = "Login";
		$data['error'] = "Please Login";
		$this->load->view('includes/template', $data);
	}
	
	//This function validates the user's log in information
	function validate_input()
	{
		//Form validation...
		//Set Rules ('name of input in view','error message name','rules');
		//for rules refer to http://codeigniter.com/user_guide/libraries/form_validation.html
		$this->form_validation->set_rules('username', 'Username', 'trim|required');
		$this->form_validation->set_rules('phone', 'phone number', 'numeric|less_than[9999999999]|greater_than[1000000000]');
		$this->form_validation->set_rules('gpa', 'GPA', 'decimal[2]|greater_that[0.00]|less_than[4.33]');

		//If form validation fails
		if($this->form_validation->run() == FALSE){
			$this->index();
		}
		else
		{
			//Validate if user is in database and if login information is correct
			if($this->user_model->validate_user()){
				
				//create a session with the following information
				//Username - userid - and a variable is_logged_in to validate the user session
				$session_info = array(
					'username' => $this->input->post('username'),
					'sid' => $this->user_model->get_id(),
					'is_logged_in' => true
				);
				
				//Set the session information
				$this->session->set_userdata($session_info);
				
				//redirect to university/index controller
				redirect('dashboard');
			}
			else{
				//if user isn't valudated, go to login/login_fail function fail
				redirect("login/login_fail");
			}
		}
	}
		
	//This function is called when a user signs out
	function signout()
	{
		//when the user signs out, destroy the session to ensure that user can't go beyond log in process
		$this->session->sess_destroy();
		redirect('login');
	}

}