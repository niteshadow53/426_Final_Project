-- phpMyAdmin SQL Dump
-- version 4.4.1.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Dec 10, 2017 at 10:40 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `ncaa_web_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `brackets`
--

CREATE TABLE `brackets` (
  `bracket_id` int(11) unsigned NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `user` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brackets`
--

INSERT INTO `brackets` (`bracket_id`, `name`, `user`) VALUES
(1, 'bestbracket', 0),
(4, 'bestbracket2', 0);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `picks`
--

CREATE TABLE `picks` (
  `pick_id` int(11) unsigned NOT NULL,
  `game` int(11) DEFAULT NULL,
  `winner` int(11) DEFAULT NULL,
  `bracket` int(11) DEFAULT NULL,
  `round` int(11) DEFAULT NULL,
  `region` char(2) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `picks`
--

INSERT INTO `picks` (`pick_id`, `game`, `winner`, `bracket`, `round`, `region`) VALUES
(1, 0, 1, 1, 0, '00'),
(2, 2, 3, 1, 0, '00'),
(3, 4, 5, 1, 0, '00'),
(4, 6, 7, 1, 0, '00'),
(5, 0, 7, 1, 1, '00'),
(6, 0, 1, 1, 0, 'ff'),
(7, 2, 3, 1, 0, 'ff'),
(8, 0, 7, 1, 1, 'ff'),
(9, 0, 25, 1, 2, '00');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) unsigned NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_id`, `name`, `nickname`) VALUES
(1, 'North Carolina', 'Tar Heels'),
(3, 'Xavier', NULL),
(5, 'Northwestern', NULL),
(7, 'Arkansas', NULL),
(9, 'Duke', NULL),
(10, 'Gonzaga', NULL),
(11, 'Notre Dame', NULL),
(12, 'Maryland', NULL),
(13, 'West Virginia', NULL),
(14, 'St Marys', NULL),
(15, 'Butler', NULL),
(16, 'Kansas State', NULL),
(17, 'Dayton', NULL),
(18, 'FGCU', NULL),
(19, 'Arizona', NULL),
(20, 'Kentucky', NULL),
(21, 'Villanova', NULL),
(22, 'UNCW', NULL),
(23, 'Florida', NULL),
(24, 'USC', NULL),
(25, 'New Mexico St', NULL),
(26, 'South Carolina', NULL),
(27, 'UC Davis', NULL),
(28, 'Miami', NULL),
(29, 'Iowa State', NULL),
(30, 'Purdue', NULL),
(31, 'Creighton', NULL),
(32, 'Oregon', NULL),
(33, 'Michigan', NULL),
(34, 'Louisville', NULL),
(35, 'Minnesota', NULL),
(36, 'UCLA', NULL),
(37, 'Wisconsin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `passwd` char(64) NOT NULL,
  `salt` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `passwd`, `salt`) VALUES
(0, 'user11', 'da0fa7bed00f6c96ee78bfbbba6ed296d05a34c9cf607a9a1a9575d0f3f36e92', 'd4db5571066dfcd78f52cc4e0b875aaf'),
(25, 'user128', '5ed6bee3843ee1bb34d1af5171d431ce612df96cd66627b562b5b9f2729f87d1', '8f85199f5b99619b011995faf8487a6b'),
(27, 'user129', 'd62ae44265fce9f0be3d8510d7ae29c734122f3746fdab1452b936f95d349ff9', '3f45579e6641d312f3db09b15a312ef8'),
(31, 'user130', 'b9da7b0dba4e8839a139480ce362ac293a296c2b31e6fb7cdae874477c4e0484', '6b8e81b013490ffa9c5ad2781061d5c5'),
(32, 'user130" --', 'b32c2b75ea4821d3d073964a264e44d684bc3355bf6c45a6ba6058852b65dd54', 'e255d8eef0f4e6f17fc947176b98e351'),
(35, 'user131', 'af2066484d3a67e5d10a2dfac5f82cf8938bef96225be638eb8271be2d458141', '0f67dc05f0a3c750966804d87dfeab7a'),
(36, 'user132', '86ab3c1db4db0784b28a58406ba77d3a0711566d84e58a36115c25ffb8318ae1', '1354e98e3eaebe3c1e2c0b627baaecb6'),
(37, 'user999', '4e96d81bb9c3834d381199902b7eef5db4e244228d870b33f3e72067ad0969df', 'a704ec6f425bab7e41e15c061752bf9b'),
(38, 'user', '76f28a09ddd342092ea1615ca9eec64fa81b7ef503b4533bba5939d5f8e7704d', 'bd9632174f002013191f912999f13848');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brackets`
--
ALTER TABLE `brackets`
  ADD PRIMARY KEY (`bracket_id`),
  ADD UNIQUE KEY `name` (`name`,`user`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `picks`
--
ALTER TABLE `picks`
  ADD PRIMARY KEY (`pick_id`),
  ADD KEY `game` (`game`,`round`,`region`,`bracket`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brackets`
--
ALTER TABLE `brackets`
  MODIFY `bracket_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `picks`
--
ALTER TABLE `picks`
  MODIFY `pick_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
