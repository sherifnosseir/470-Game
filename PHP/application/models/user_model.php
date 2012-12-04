<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model{

function __construct(){
		parent::__construct();
	}
	
	//validate user information when logging in (make sure that the user does exist)
	function validate()
	{
		//$this->input->post('name_of_input') is used to grab information from an input box (used instead of $_POST['name_of_input'])
		$username = $this->input->post("username");
		$this->db->where("username = '$username' or email = '$username'");
		//md5 is a built in function in php to encrypt the password (security)
		$this->db->where("password", md5($this->input->post('password')));
		
		$query = $this->db->get('users');
		
		if($query->num_rows() == 1)
		{
			return true;
		}
		return false;
	}
	
	//Insert a user into database
	function add_user()
	{
		$data = array(
			'username'=>$this->input->post('username'),
			'email'=>$this->input->post('email_address'),
			'password'=>md5($this->input->post('password')),
			);

		$insert = $this->db->insert('users', $data);
		return $insert;
	}
	
	//get a user's id - only used for logging in
	//This function is used to add the user id to the cookie
	function get_id()
	{
		$this->db->select('id');
		$username = $this->input->post("username");
		$this->db->where("username = '$username' or email = '$username'");

		$query = $this->db->get('users');
		
		foreach($query->result() as $row)
		{
			$sid = $row->id;
		}
		
		return $sid;
	}
	
	//Get all information about a user
	function getUserInfo($username)
	{
		$this->db->where("username = '$username' or email = '$username'");

		$query = $this->db->get('users');

		foreach ($query->result() as $row)
	   	{
	     	$info = Array(
				'id' => $row->id,
				'email' => $row->email,
				'username' => $row->username,
				'tank_id' => $row->tank_id
			);
	   	}

		return $info;
	}
	
	function isBanned($info)
	{
		$this->db->where("username = '$info' OR email = '$info'");
		$query = $this->db->get("bannedUsers");
		
		if($query->num_rows()>0)
		{
			$query = $query->result();
			return $query;
		}
		return false;
	}
	
	//update information about a user
	function update($query)
	{
		$this->db->query($query);
	}
	
}