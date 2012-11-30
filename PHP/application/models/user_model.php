<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class user_model extends CI_Model{

function __construct(){
		parent::__construct();
	}
	
	//validate user information when logging in (make sure that the user does exist)
	function validate_user()
	{
		//$this->input->post('name_of_input') is used to grab information from an input box (used instead of $_POST['name_of_input'])
		$this->db->where("username", $this->input->post('username'));
		//md5 is a built in function in php to encrypt the password (security)
		$this->db->where("password", md5($this->input->post('password')));
		
		$query = $this->db->get('users');
		
		if($query->num_rows() == 1)
		{
			return true;
		}
	}
	
	//When applying, check that no other user has the same username
	function check_duplicate()
	{
		$this->db->where("username", $this->input->post('username'));
		$query = $this->db->get('users');
		
		//$query->num_rows() returns how many rows there are in the query
		//in this case... if it's 1, then there is already a user in the database with the same username as the one the applyee is trying to use.
		if($query->num_rows() == 1)
		{
			return false;
		}
		
		else
		{
			return true;
		}
	}
	
	//Insert a user into database
	function add_user()
	{
		$data = Array(
			'name' => $this->input->post('full_name'),
			'address' => $this->input->post('address'),
			'phone' => $this->input->post('phone'),
			'username' => $this->input->post('username'),
			'password' => md5($this->input->post('password'))
			);
		
		$insert = $this->db->insert('user', $data);
		
		return $insert;
	}
	
	//get a user's id - only used for logging in
	//This function is used to add the user id to the cookie
	function get_id()
	{
		$this->db->select('id');
		$this->db->where("username", $this->input->post('username'));
		$query = $this->db->get('users');
		
		foreach($query->result() as $row)
		{
			$sid = $row->id;
		}
		
		return $sid;
	}
	
	//Get all information about a user
	function get_user()
	{
		$user = $this->session->userdata('username');
		$this->db->where("username", $user);

		$query = $this->db->get('users');

		foreach ($query->result() as $row)
	   	{
	     	$info = Array(
				'sid' => $row->id,
				'name' => $row->name,
				'username' => $row->username,
				'phone' => $row->phone,
				'fleetid' => $row->fleet_id,
				'address' => $row->address,
			);
	   	}

		return $info;
	}
	
	//update information about a user
	function update($query)
	{
		$this->db->query($query);
	}
	
}