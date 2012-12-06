<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Game_log_model extends CI_Model{

function __construct(){
		parent::__construct();
	}
	
	function addUserLoginSession($username)
	{
		$date = date('Y-m-d');
		$data = array(
			"username" => $username,
			"date" => $date
		);
		
		$this->db->insert("user_login_log", $data);
	}
	
	function getGameStatistics()
	{
		$this->db->select("date, COUNT(date) AS count");
		$this->db->order_by("date", "asc");
		$this->db->group_by("date");
		$query = $this->db->get("user_login_log");
		
		if($query->num_rows==0)
		{
			return false;
		}
		else
		{
			$query = $query->result();
			return $query;
		}
	}
	
	function getMaxConnections()
	{
		$this->db->select("date, COUNT(date) AS MAX");
		$this->db->group_by("date");
		$this->db->order_by("MAX", "desc");
		$query = $this->db->get("user_login_log");
		
		if($query->num_rows==0)
		{
			return false;
		}
		else
		{
			$query = $query->result_array();
			return $query[0];
		}
	}
}