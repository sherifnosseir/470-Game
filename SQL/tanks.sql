-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 06, 2012 at 06:39 AM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tanks`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'sherif', 'c8570e8aa5717ce8860122cec48ba2b2');

-- --------------------------------------------------------

--
-- Table structure for table `bannedUsers`
--

CREATE TABLE IF NOT EXISTS `bannedUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `reason` varchar(225) DEFAULT 'Please contact <a href="#">Support</a>',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `bannedUsers`
--

INSERT INTO `bannedUsers` (`id`, `username`, `email`, `reason`) VALUES
(1, 'testing', 'test@test.com', 'Please contact <a href="#">Support</a>'),
(4, 'sherif', '', 'CHECKING BAN!');

-- --------------------------------------------------------

--
-- Table structure for table `game_stats`
--

CREATE TABLE IF NOT EXISTS `game_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_logins` int(11) NOT NULL,
  `unique_logins` int(11) NOT NULL,
  `unique_visits` int(11) NOT NULL,
  `db_time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `game_stats`
--


-- --------------------------------------------------------

--
-- Table structure for table `userRecovery`
--

CREATE TABLE IF NOT EXISTS `userRecovery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `token` varchar(225) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `userRecovery`
--


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `team_id` int(255) NOT NULL,
  `tank_id` int(255) NOT NULL,
  `date_created` varchar(255) NOT NULL,
  `kills` int(255) NOT NULL,
  `deaths` int(255) NOT NULL,
  `logged_in` varchar(255) NOT NULL,
  `banned` varchar(255) NOT NULL,
  `db_time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `nickname`, `team_id`, `tank_id`, `date_created`, `kills`, `deaths`, `logged_in`, `banned`, `db_time_stamp`) VALUES
(1, 'kennych', '869ab5e4754de802a9b2f5c6916fca22', 'kennychetal@gmail.com', 'xor-kenny', 1, 1, '2012-11-18 20:28:00', 2, 99, '', '', '2012-12-03 20:04:51'),
(2, 'sherif', 'c8570e8aa5717ce8860122cec48ba2b2', 'sherifnosseir@gmail.com', 'sherifzilla', 2, 2, '', 122, 33, '', '1', '2012-12-05 20:52:07'),
(3, 'guest', '77f99348fb83cef7667843e1b95134d5', '', '', 3, 3, '', 0, 0, '', '', '2012-11-19 22:12:41'),
(4, 'default', 'c21f969b5f03d33d43e04f8f136e7682', 'default@default.default', 'dEfAuLt', 4, 4, '', 0, 0, '', '', '2012-11-21 01:47:07'),
(6, 'admin', '21232f297a57a5a743894a0e4a801fc3', '', '', 0, 5, '', 0, 0, '', '', '2012-11-21 22:45:31'),
(7, 'test', '098f6bcd4621d373cade4e832627b4f6', '', '', 0, 6, '', 0, 0, '', '', '2012-11-21 23:45:19'),
(8, 'tech', 'd9f9133fb120cd6096870bc2b496805b', '', '', 0, 7, '', 0, 0, '', '', '2012-11-22 01:53:26'),
(9, 'akenny', 'df271ab32a7f8313dcff4eed3e8b8fe0', '', '', 0, 8, '', 0, 0, '', '', '2012-11-22 13:39:14'),
(10, 'jax', '7e65a9b554bbc9817aa049ce38c84a72', '', '', 0, 9, '', 54, 23, '', '', '2012-12-03 20:04:59'),
(11, 'kenny2', '525ec4649a43fc5850b3e785fa5bbf11', '', '', 0, 10, '', 0, 0, '', '', '2012-11-26 21:06:48'),
(14, 'gregoryz', '8a26fc58ddf3571c205897b2cc2609a9', '', '', 0, 13, '', 0, 0, '', '', '2012-11-28 02:18:18');

-- --------------------------------------------------------

--
-- Table structure for table `user_login_log`
--

CREATE TABLE IF NOT EXISTS `user_login_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `user_login_log`
--

INSERT INTO `user_login_log` (`id`, `username`, `date`) VALUES
(2, 'kennych', '0000-00-00'),
(3, 'kennych', '0000-00-00'),
(4, 'kennych', '2012-12-06'),
(5, 'chief', '2012-12-03'),
(6, 'chief', '2012-12-03'),
(7, 'sherif', '2012-12-04'),
(8, 'sherif', '2012-12-04'),
(9, 'kennych', '2012-12-02'),
(10, 'kennych', '2012-12-02'),
(11, 'kennych', '2012-12-01'),
(12, 'kennych', '2012-12-01'),
(13, 'sherif', '2012-12-01'),
(14, 'sherif', '2012-12-01');
