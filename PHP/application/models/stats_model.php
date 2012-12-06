<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class stats_model extends CI_Model{

function __construct(){
		parent::__construct();
	}
	
	function getUserStats()
	{
		$username = $this->session->userdata('username');
		
		$this->db->select("username, kills, deaths");
		$this->db->where("username", $username);
		$query = $this->db->get("users");
		
		$query = $query->result();
		$rank = $this->getUserRank($query[0]->kills);
		$info[] = array(
			'username' => $query[0]->username,
			'kills' => $query[0]->kills,
			'deaths' => $query[0]->deaths,
			'rank' => $rank+1
		);
		
		return $info;
	}
	
	function getUserRank($kills)
	{
		$sql = "SELECT COUNT(`id`) AS rank FROM `users` WHERE kills>?";
		$query = $this->db->query($sql, $kills);
		
		$query = $query->result();
		return $query[0]->rank;
	}
	
	//validate user information when logging in (make sure that the user does exist)
	function getTopGunTable(){
		$sql = "SELECT username, kills FROM `users` WHERE 1 ORDER BY kills DESC LIMIT 0, 10";
		$query = $this->db->query($sql);
			$info = "";
			foreach ($query->result() as $row){
				$info[] = Array(
				'username' => $row->username,
				'kills' => $row->kills,
				);
			}	

			if ($info==""){
				return null;
			}
			else{
				return $info;
			}

	}

	function getWorstGunTable(){
		$sql = "SELECT username, kills FROM `users` WHERE 1 ORDER BY kills ASC LIMIT 0, 10";
		$query = $this->db->query($sql);
			$info = "";
			foreach ($query->result() as $row){
				$info[] = Array(
				'username' => $row->username,
				'kills' => $row->kills,
				);
			}	

			if ($info==""){
				return null;
			}
			else{
				return $info;
			}
	}

	function getGraveTable(){
		$sql = "SELECT username, deaths FROM `users` WHERE 1 ORDER BY kills desc LIMIT 0, 10";
		$query = $this->db->query($sql);
			$info = "";
			foreach ($query->result() as $row){
				$info[] = Array(
				'username' => $row->username,
				'deaths' => $row->deaths,
				);
			}	

			if ($info==""){
				return null;
			}
			else{
				return $info;
			}
	}
	
}