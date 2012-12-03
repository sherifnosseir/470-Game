<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Signup extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$data["title"] = "Tanks Sign Up";
		$data["assets"] = array('css' => array("signup/less/signup.less"),
								'js' => array("signup/js/signup.js"));
		$data['error'] = "";
		
		//Assets are used to load LESSCSS, or Javascript
/*		$data['assets'] = array('css' => null,
								'js' => array("login/js/bla.js", "login/js/blabla.js"));*/
		$data["view"] = 'signup/index.php';
		$this->load->view('template/template', $data);
	}
	
	function addUser()
	{
			$this->load->library("form_validation");		
			
			$this->form_validation->set_message('is_unique', 'That %s is already taken');
			$this->form_validation->set_rules('username','Username','callback__alpha_dash_space|trim|required|min_length[4]|is_unique[users.username]');
			$this->form_validation->set_rules('email_address','Email Address','trim|required|valid_email|is_unique[users.email]');
			$this->form_validation->set_rules('password','Password','trim|required|min_length[4]|max_length[32]');
			$this->form_validation->set_rules('password2','Password Confirm','trim|required|matches[password]');

			if($this->form_validation->run()== FALSE){
				echo validation_errors('<div class="alert span3 offset1"><a class="close" data-dismiss="alert"">×</a>','</div>');
			}
			else{
				$this->load->model('user_model');
				if($query = $this->user_model->add_user()){
					echo 'true';
				}
				else{
					echo 'db_error';
				}
			}
	}
	
	//Sign up AJAX validations
	function check_username(){
	    $this->load->library("form_validation");
		$this->form_validation->set_rules('username','Username','callback__alpha_dash_space|trim|required|min_length[4]|is_unique[users.username]');
		if($this->form_validation->run()== FALSE){
	        //echo "false";
			echo validation_errors();
	     }
	    else{
	        echo "true";
	     }
	}
	
	function _alpha_dash_space($str_in = '')
	{
	    if (! preg_match("/^([-a-z0-9_])+$/i", $str_in))
	    {
	        $this->form_validation->set_message('_alpha_dash_space', 'The %s field may only contain alpha-numeric characters, spaces, underscores, and dashes.');
	        return FALSE;
	    }
	    else
	    {
	        return TRUE;
	    }
	}
	
	function check_email_address(){
	    $this->load->library("form_validation");
	    $this->form_validation->set_rules('email_address','Email Address','trim|required|valid_email|is_unique[users.email]');
		if($this->form_validation->run()== FALSE){
	        echo validation_errors();
	     }
	    else{
	        echo "true";
	     }
	}
	function check_password(){
	    $this->load->library("form_validation");
	    $this->form_validation->set_rules('password','Password','trim|required|min_length[4]|max_length[32]');
		if($this->form_validation->run()== FALSE){
	        echo "false";
	     }
	    else{
	        echo "true";
	     }
	}
	function check_password2(){
	    $this->load->library("form_validation");

	    $this->form_validation->set_rules('password2','Password Confirm','trim|required|matches[password]');
		if($this->form_validation->run()== FALSE){
	        echo "false";
	     }
	    else{
	        echo "true";
	     }
	}

}