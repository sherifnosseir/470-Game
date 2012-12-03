<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Recovery_model extends CI_Model{

function __construct(){
		parent::__construct();
	}
	
	function validateEmail($email)
	{
		$this->db->select("email");
		$this->db->where("email", $email);
		$query = $this->db->get("users");
		
		if($query->num_rows() > 0)
		{
			return true;
		}
		return false;
	}
	
	function checkExistingRecovery($email)
	{
		$this->db->select("email, token");
		$this->db->where("email", $email);
		$query = $this->db->get("userRecovery");
		
		if($query->num_rows() > 0)
		{
			$query = $query->result();
			return $query[0]->token;
		}
		return false;
	}
	
	function insertToken($email, $token)
	{
		$data = array(
			"email" => $email,
			"token" => $token
		);
		
		$this->db->insert("userRecovery", $data);
	}
	
	function checkToken($token)
	{
		$this->db->select("email, token");
		$this->db->where("token", $token);
		$query = $this->db->get("userRecovery");
		
		if($query->num_rows() > 0)
		{
			return $query;
		}
		return false;
	}
	
	function tokenCheckAndExpire($email, $token)
	{
		$this->db->select("email");
		$this->db->where("email = '$email' AND token = '$token'");
		$query = $this->db->get("userRecovery");
		
		if($query->num_rows>0)
		{
			$this->db->where("email = '$email' AND token = '$token'");
			$this->db->delete("userRecovery");
			return true;
		}
		else
		{
			return false;
		}
	}
	
	function updateUserPassword($email, $password)
	{
		$data = array(
			"password" => md5($password),
		);
		
		$this->db->where("email", $email);
		$this->db->update("users", $data);
	}

}