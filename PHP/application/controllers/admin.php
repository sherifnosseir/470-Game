<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		if ($this->_is_logged_in()) 
			$this->home();
		else
		{
			$data['view'] = 'admin/login';
			$data['assets'] = array('css' => null,
									'js' => null);
			$this->load->view('admin/template/template.php',$data); 
		}
	}
	
	//check if admin is already logged in
	function _is_logged_in()
	{
		return $this->session->userdata('admin_logged_in');
	}
	
	//Login forum for admins
	function login()
	{
		if ($this->_is_logged_in())
		{
			redirect('admin');
		}
	
		$this->load->library("form_validation");
		$this->form_validation->set_message('_validate_credentials','That Email and Password combination is not valid');
		$this->form_validation->set_rules('username','username','trim|required');
		$this->form_validation->set_rules('password','Password','trim|required');
		$this->form_validation->set_rules('username', 'username', 'callback__validate_credentials');
		
		if ($this->form_validation->run() == TRUE)
		{
			redirect('admin/');
		}
		else
		{
			$this->index();
		}
	}
	
	//validate admin credentials
	function _validate_credentials()
	{
		$query = false;
		$this->load->model('admin_model');
		$match = $this->admin_model->validate($this->input->post('admin_username'), $this->input->post('admin_password'));
		
		if($match)
		{
			$data = array(
				'admin_usr'=>$this->input->post('username'),
				'admin_logged_in'=> true
			);

			$this->session->set_userdata($data);
			return true;
		}
		return false;
	}
	
	//logout
	//destroy cookie session
	function logout()
	{
		$this->session->unset_userdata('admin_logged_in');
		$this->session->unset_userdata('admin_usr');
		redirect('admin');
	}
	
	function home()
	{
		if($this->uri->total_segments() > 2)
		{
			$tab = $this->uri->segment(3);
			if(strcasecmp($tab, "allUsers") && strcasecmp($tab, "bannedUsers"))
			{
				$tab = "allUsers";
			}
		}
		else
		{
			$tab = "allUsers";			
		}
		
		$data['tab'] = $tab;
		$data['view'] = 'admin/index';
		$data['assets'] = array('css' => null,
								'js' => array('admin/js/admin.js'));
		$this->load->view('admin/template/template.php',$data); 
		
	}
	
	function allUsers()
	{
		$offset = $this->uri->segment(3);
		
		if($offset == null)
		{
			$offset = 0;
		}
		
		$this->load->model('admin_model');
		$this->load->library('pagination');
		$count = $this->admin_model->countTotalMembersInTable("users");
	   	$users = $this->admin_model->getAllUsers($offset);

		$config['base_url'] = base_url().'admin/allUsers';
		$config['total_rows'] = $count;
		$config['per_page'] = 5;
		$config['uri_segment'] = 3;
		$config['next_tag_open'] = '<li>';
		$config['next_tag_close'] = '</li>';
		$config['prev_tag_open'] = '<li>';
		$config['prev_tag_close'] = '</li>';
		$config['num_tag_open'] = '<li>';
		$config['num_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="disabled"><a href="#">';
		$config['cur_tag_close'] = '</a></li>';

		$this->pagination->initialize($config);
	
		$data['users'] = $users->result();
		
		$this->load->view('admin/usersView', $data);	
	}
	
	function bannedUsers()
	{
		$offset = $this->uri->segment(3);
		
		if($offset == null)
		{
			$offset = 0;
		}
		
		$this->load->model('admin_model');
		$this->load->library('pagination');
		$count = $this->admin_model->countTotalMembersInTable("bannedUsers");
	   	$users = $this->admin_model->getBannedUsers($offset);

		$config['base_url'] = base_url().'admin/allUsers';
		$config['total_rows'] = $count;
		$config['per_page'] = 5;
		$config['uri_segment'] = 3;
		$config['next_tag_open'] = '<li>';
		$config['next_tag_close'] = '</li>';
		$config['prev_tag_open'] = '<li>';
		$config['prev_tag_close'] = '</li>';
		$config['num_tag_open'] = '<li>';
		$config['num_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="disabled"><a href="#">';
		$config['cur_tag_close'] = '</a></li>';
		

		$this->pagination->initialize($config);
		
		$data['users'] = $users->result();
		
		$this->load->view('admin/usersView', $data);
	}
	
	function viewUser($username)
	{
		$this->load->model('admin_model');
		$userinfo = $this->admin_model->getUserInfo($username);
		$data['assets'] = array('css' => null,
								'js' => null);
								
		if($userinfo['banned'] == 1)
		{
			$data['bannedReason'] = $this->admin_model->getBanReason($username);
		}						
		
		$data['userinfo'] = $userinfo;
		
		$data['view'] = "admin/viewUser";
		$this->load->view('admin/template/template.php',$data);
	}
	
	function banUser($username)
	{
		if (!$this->_is_logged_in()) 
			redirect('admin');

		$this->load->model('admin_model');
	
		$reason = $this->input->post("reason");
	
		if($this->admin_model->check_user_exist($username)) {
			$this->admin_model->ban_user($username, '1', $reason);
		}
		redirect('admin/viewUser/'.$username);
	}

	function unBanUser($username)
	{
		if (!$this->_is_logged_in()) 
			redirect('admin');
	
		$this->load->model('admin_model');
	
		if($this->admin_model->check_user_exist($username)) {
			$this->admin_model->ban_user($username, '0', "");
		}
		redirect('admin/viewUser/'.$username);
	}

}