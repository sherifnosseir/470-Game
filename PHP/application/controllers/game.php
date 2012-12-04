<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

class game extends CI_Controller{

function __construct()
	{
		parent::__construct();
	}
	
	function index()
	{
				
		$data["title"] = "ElTanko Game";
		$data['assets'] = array('css' => array("game/css/game.less"),
								'js' => array(	"game/scripts/md5.js",
											"game/scripts/socket.io-client/dist/socket.io.js",
											"game/scripts/modernizr.js",
											"game/scripts/loader.js",
											"game/scripts/jquery.rightClick.js"));
		$data['error'] = "";
		$data['view'] = "game/index.html";
		$this->load->view('template/template', $data);
	}

}