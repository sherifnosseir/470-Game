<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Admin_model extends CI_Model{

function __construct(){
		parent::__construct();
	}
	
	function validate($usr, $pass)
	{
		$sql = "select * from admin where username = ? and password = ?";
		$params = array($usr, md5($pass));
		$query = $this->db->query($sql,$params);

		if($query->num_rows() > 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	function countTotalMembersInTable($table)
	{
		$this->db->select("username");
		$query = $this->db->get($table);
		
		return $query->num_rows();	
	}
	
	function getAllUsers($offset)
	{
		$this->db->select("username, email");
		$query = $this->db->get("users", 5, $offset);
		
		return $query;
	}
	
	function getBannedUsers($offset)
	{
		$this->db->from("bannedUsers");
		$this->db->select("username, email, reason");
		$this->db->limit(5, $offset);
		
		$query = $this->db->get();
		
		return $query;
	}
	
	function check_exist($field)
	{
		$this->db->where($field);
	    $query=$this->db->get("users");
	    if($query->num_rows()>0)
	    {
	        return true;
	    }
	    else
	    {
	        return false;
	    }
	}
	
	function check_user_exist($usr)
	{
		$field = array('username'=> $usr);
		
		return $this->check_exist($field);
	}
	
	function ban_user($usr, $val, $reason)
	{
		$data = array(
						'banned' => $val
					);
		$this->db->where('username', $usr);
		$this->db->update('users', $data);
		
		if($val == 1)
		{
			$data = array(
				'username' => $usr,
				'reason' => $reason
			);		
		
			$this->db->insert('bannedUsers', $data);
		}
		else 
		{
			$this->db->where("username", $usr);
			$this->db->delete('bannedUsers');
		}
	}
	
	function getBanReason($username)
	{
		$this->db->select("reason");
		$this->db->where("username", $username);
		
		$query = $this->db->get("bannedUsers");
		$query = $query->result_array();
		return $query[0];
	}
	
	function getUserInfo($username)
	{
		$this->db->where("username", $username);
		$query = $this->db->get("users");
		
		$query = $query->result_array();
		return $query[0];
	}

}