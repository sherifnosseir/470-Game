<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class Game extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
		$this->load->view('game/index.html');
	}

}