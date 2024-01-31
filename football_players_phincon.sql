-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 31, 2024 at 10:01 AM
-- Server version: 10.6.4-MariaDB-log
-- PHP Version: 8.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `football_players_phincon`
--

-- --------------------------------------------------------

--
-- Table structure for table `club`
--

CREATE TABLE `club` (
  `club_id` int(11) NOT NULL,
  `club_name` varchar(255) NOT NULL,
  `club_location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `club`
--

INSERT INTO `club` (`club_id`, `club_name`, `club_location`) VALUES
(1, 'Liverpool FC', 'Liverpool, England'),
(2, 'Manchester United', 'Manchester, England'),
(3, 'AS Roma', 'Rome, Italy'),
(4, 'Inter Miami', 'Florida, USA'),
(5, 'Al-Nassr', 'Riyadh, Saudi Arabia'),
(6, 'FC Barcelona', 'Catalonia, Spain');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `player_id` int(11) NOT NULL,
  `player_name` varchar(255) NOT NULL,
  `club_id` varchar(255) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`player_id`, `player_name`, `club_id`, `is_deleted`) VALUES
(1, 'Mohamed Salah', '1', 0),
(2, 'Virgil Van Dijk', '1', 0),
(3, 'Antony Spin', '2', 0),
(4, 'Marcus Rashford', '2', 0),
(5, 'Radja Nainggolan', '1', 1),
(6, 'Lionel Messi', '4', 0),
(7, 'Cristiano Ronaldo', '5', 0),
(8, 'Sadio Mane', '6', 0),
(9, 'Robert Lewandowski', '6', 0);

-- --------------------------------------------------------

--
-- Table structure for table `player_position_relation`
--

CREATE TABLE `player_position_relation` (
  `pp_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player_position_relation`
--

INSERT INTO `player_position_relation` (`pp_id`, `player_id`, `position_id`) VALUES
(1, 1, 10),
(2, 1, 9),
(3, 2, 3),
(4, 3, 10),
(5, 4, 8),
(6, 4, 9),
(7, 5, 5),
(8, 5, 6),
(9, 5, 7),
(10, 7, 8),
(11, 7, 9),
(13, 8, 8);

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `position_id` int(11) NOT NULL,
  `position_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`position_id`, `position_name`) VALUES
(1, 'Goalkeeper'),
(2, 'Right Back'),
(3, 'Center Back'),
(4, 'Left Back'),
(5, 'Defensive Midfielder'),
(6, 'Central Midfielder'),
(7, 'Attacking Midfielder'),
(8, 'Left Wing'),
(9, 'Striker'),
(10, 'Right Wing');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`club_id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`player_id`);

--
-- Indexes for table `player_position_relation`
--
ALTER TABLE `player_position_relation`
  ADD PRIMARY KEY (`pp_id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `club`
--
ALTER TABLE `club`
  MODIFY `club_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `player_position_relation`
--
ALTER TABLE `player_position_relation`
  MODIFY `pp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
