<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class stats_model extends CI_Model{

function __construct(){
		parent::__construct();
	}
	
	//validate user information when logging in (make sure that the user does exist)
	function getTopGunTable($userid){
		$sql = "SELECT username, kills FROM `users` WHERE 1 ORDER BY kills DESC";
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

	function getWorstGunTable($userid){
		$sql = "SELECT username, kills FROM `users` WHERE 1 ORDER BY kills ASC";
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

	function getGraveTable($userid){
		$sql = "SELECT username, deaths FROM `users` WHERE 1 ORDER BY kills desc";
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