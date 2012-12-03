<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Recovery extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		
	}
	
	function forgotPassword()
	{
		$data["title"] = "TheGame Login";
		$data["assets"] = array('css' => null,
							'js' => null);
		
		$data["title"] = "recover password";
		$data['view'] = 'recovery/forgotPassword';
		$this->load->view('template/template.php', $data);
	}
	
	function resetPassword()
	{
		$email = $this->input->post("email");
		$this->load->model('recovery_model');
		
		if($this->recovery_model->validateEmail($email))
		{
			$config = Array(
			'protocol'=> 'smtp',
			'smtp_host' => 'ssl://smtp.googlemail.com',
			'smtp_port' => 465,
			'smtp_user' =>'elTankoTeam@gmail.com',
			'smtp_pass'=>'elTankoSuperGame'
			);
			
			$this->load->library('email', $config);
			
			$token = $this->recovery_model->checkExistingRecovery($email);
			if($token == false)
			{
				//generate new recovery token and send it	
				$token = md5($email);
				$this->recovery_model->insertToken($email, $token);
			}
			
			$message = "Click here to continue reseting your password!: ".base_url()."recovery/recover/$token";
			
			$this->email->set_newline("\r\n");

			$this->email->from('elTankoTeam@gmail.com', "ElTanko");
			$this->email->to($email);
			$this->email->subject("ElTanko Password Recovery");
			$this->email->message($message);

			if($this->email->send())
			{
				$data['assets'] = null;
				$data['title'] = 'Email sent';
				$data['message_title'] = "Email Sent...";
				$data['message'] = "You should receive an email momentarily with the rest of the instructions";
				$data['view'] = 'recovery/message.php';
				$this->load->view('template/template', $data);
			}
			else
			{
				show_error($this->email->print_debugger());
			}
		}
		else
		{
			$data['assets'] = null;
			$data['title'] = 'Error';
			$data['message_title'] = "Email Not Found...";
			$data['message'] = "Sorry, We don't have this email in our records.";
			$data['view'] = 'recovery/message.php';
			$this->load->view('template/template', $data);
		}
	}
	
	function recover($token)
	{
		$this->load->model('recovery_model');
		
		$userInfo = $this->recovery_model->checkToken($token);
		if($userInfo == false)
		{
			$data['assets'] = null;
			$data['title'] = 'Error';
			$data['message_title'] = "Unable to continue...";
			$data['message'] = "You're not suppose to be here";
			$data['view'] = 'recovery/message.php';
			$this->load->view('template/template', $data);
		}
		else
		{
			$userInfo = $userInfo->result();
			$this->resetPassword1($userInfo[0]->email, $userInfo[0]->token);
		}
	}
	
	function resetPassword1($email, $token)
	{	$userInfo = $this->recovery_model->checkToken($token);
		if($userInfo == false)
		{
			$data['assets'] = null;
			$data['title'] = 'Error';
			$data['message_title'] = "Unable to continue...";
			$data['message'] = "You're not suppose to be here";
			$data['error'] = "";
			$data['view'] = 'recovery/message.php';
			$this->load->view('template/template', $data);
		}
		else
		{
			$data['assets'] = null;
			$data['title'] = 'Reset Password';
			$data['email'] = $email;
			$data['token'] = $token;
			$data['error'] = "";
			$data['view'] = 'recovery/resetPassword.php';
			$this->load->view('template/template', $data);
		}
	}
	
	function resetPassword2()
	{
		$email = $this->input->post("email");
		$token = $this->input->post("token");
		$password = $this->input->post("password");
		$confirmPassword = $this->input->post("password2");
		
		$this->form_validation->set_rules('email', 'Email Address', 'trim|required|valid_email');
		$this->form_validation->set_rules('password','Password','trim|required|min_length[4]|max_length[32]');
		$this->form_validation->set_rules('password2','Password Confirm','trim|required|matches[password]');
		
		if ($this->form_validation->run() == FALSE){
			//Error
			$data['assets'] = null;
			$data['title'] = 'Reset Password';
			$data['email'] = $email;
			$data['token'] = $token;
			$data['error'] = validation_errors('<div class="alert span3"><a class="close" data-dismiss="alert"">×</a>','</div>');
			$data['view'] = 'recovery/resetPassword.php';
			$this->load->view('template/template', $data);
		}
		else
		{
			//Pass
			$this->load->model('recovery_model');
			if($this->recovery_model->tokenCheckAndExpire($email, $token))
			{
				//All good
				$this->recovery_model->updateUserPassword($email, $password);
				$data['assets'] = null;
				$data['title'] = 'Success';
				$data['message_title'] = "Password reset complete...";
				$data['message'] = "You have successfully reset your password";
				$data['view'] = 'recovery/message.php';
				$this->load->view('template/template', $data);
			}
			else
			{
				//Invalid token
				$data['assets'] = null;
				$data['title'] = 'Error';
				$data['message_title'] = "Error...";
				$data['message'] = "You are not suppose to be here!";
				$data['view'] = 'recovery/message.php';
				$this->load->view('template/template', $data);
			}
		}
	}

}