<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class config_model extends CI_Model{

function __construct(){
		parent::__construct();
	}
	
	//validate user information when logging in (make sure that the user does exist)
	function getFormData($userid){
		$sql = "SELECT username, email FROM `users` WHERE username = ? ORDER BY kills desc";
		$query = $this->db->query($sql,$userid);
		$info = "";
		foreach ($query->result() as $row){
				$info[] = Array(
				'username' => $row->username,
				'email' => $row->email,
				);
			}	

			if ($info==""){
				return null;
			}
			else{
				return $info;
			}
		return $userid;
	}

	function sendFormData($userid,$email,$password,$password2,$password3){
			$this->db->select('password');
			$this->db->from('users');
			$this->db->where('username', $userid);
			$query = $this->db->get();
			$row = $query->row();
			$currentpassword = $row->password;
			$response = "";
			if(md5($password)!=$currentpassword){
				$response = "Old Password does not match";

			}

			else{
				$data = array(
					'username' => $userid,
					'password' => md5($password3),
					'email' => $email
					);
				$this->db->where('username',$userid);
				 $this->db->update('users', $data); 
				$response = "Succesfully Saved";
			}

		return $response;

	}
	
}