-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2019 at 03:49 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `addressbook`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `addressID` int(10) UNSIGNED NOT NULL,
  `street` varchar(150) NOT NULL,
  `city` varchar(64) NOT NULL,
  `country` varchar(32) NOT NULL,
  `province` varchar(16) NOT NULL,
  `postal_code` varchar(12) NOT NULL,
  `latlng` point NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`addressID`, `street`, `city`, `country`, `province`, `postal_code`, `latlng`) VALUES
(2, '', 'czczcz', 'x', 'X', 'x', '\0\0\0\0\0\0\0\0\0\0\0\0\07@\0\0\0\0\0ÄA@'),
(5, 'sss', 'Smithfield', 'USA', 'North Carolina', '27577', '\0\0\0\0\0\0\0›ÒÅx∏√A@úêê∑îS¿'),
(6, 'sss', 'Smithfield', 'USA', 'North Carolina', '27577', '\0\0\0\0\0\0\0›ÒÅx∏√A@úêê∑îS¿');

-- --------------------------------------------------------

--
-- Table structure for table `ipgeolocation`
--

CREATE TABLE `ipgeolocation` (
  `geoname_id` int(10) UNSIGNED NOT NULL,
  `ip` varchar(15) NOT NULL,
  `country_name` varchar(30) NOT NULL,
  `country_capital` varchar(30) NOT NULL,
  `state_prov` varchar(30) NOT NULL,
  `district` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `country_flag` varchar(150) NOT NULL,
  `organization` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ipgeolocation`
--

INSERT INTO `ipgeolocation` (`geoname_id`, `ip`, `country_name`, `country_capital`, `state_prov`, `district`, `city`, `zipcode`, `latitude`, `longitude`, `country_flag`, `organization`) VALUES
(5978353, '206.167.123.9', 'Canada', 'Ottawa', 'Quebec', 'Hull', 'Gatineau', 'J8Z 1C8', 45.4553, -75.7652, 'https://ipgeolocation.io/static/flags/ca_64.png', 'College Heritage'),
(6174337, '206.167.12.9', 'Canada', 'Ottawa', 'Quebec', 'Ville-Marie', 'Montreal', 'H3B', 45.5024, -73.5669, 'https://ipgeolocation.io/static/flags/ca_64.png', 'Reseau d\'Informations Scientifiques du Quebec (RIS');

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `personId` int(10) UNSIGNED NOT NULL,
  `first` varchar(40) NOT NULL,
  `last` varchar(70) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `addressID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`personId`, `first`, `last`, `phone`, `addressID`) VALUES
(6, 'Anna', 'k', '(819)311-111-11', 5),
(7, 'Anna', 'k', '(819)311-111-11', 6);

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

CREATE TABLE `track` (
  `track_id` int(10) UNSIGNED NOT NULL,
  `ip` varchar(15) NOT NULL,
  `uri` varchar(150) NOT NULL,
  `occurred` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `track`
--

INSERT INTO `track` (`track_id`, `ip`, `uri`, `occurred`) VALUES
(1, '192.168.123.9', '/favicon.ico', '2019-05-29 13:47:31'),
(2, '206.167.123.9', '/favicon.ico', '2019-05-29 13:47:31'),
(3, '206.167.123.9', '/favicon.ico', '2019-05-29 13:47:31'),
(4, '206.167.123.9', '/favicon.ico', '2019-05-29 13:47:31'),
(5, '206.167.123.9', '/favicon.ico', '2019-05-29 13:47:31'),
(6, '206.167.123.9', '/favicon.ico', '2019-05-29 13:47:31'),
(7, '206.167.123.9', '/api/addressBook/viewAddress/6', '2019-05-29 13:47:31'),
(8, '206.167.123.9', '/api/addressBook/viewAddress/6', '2019-05-29 13:47:31'),
(26, '206.167.123.9', '/hello', '2019-05-29 13:47:31'),
(58, '206.167.123.9', '/api/ipgeolocation/AllTracks', '2019-05-29 13:47:31'),
(116, '206.167.12.9', '/api/ipgeolocation/AllTracks', '2019-05-29 13:47:31'),
(117, '206.167.12.9', '/api/ipgeolocation/AllTracks', '2019-05-29 13:47:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressID`);

--
-- Indexes for table `ipgeolocation`
--
ALTER TABLE `ipgeolocation`
  ADD PRIMARY KEY (`geoname_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`personId`),
  ADD KEY `addressID` (`addressID`);

--
-- Indexes for table `track`
--
ALTER TABLE `track`
  ADD PRIMARY KEY (`track_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `addressID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ipgeolocation`
--
ALTER TABLE `ipgeolocation`
  MODIFY `geoname_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6174338;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `personId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `track`
--
ALTER TABLE `track`
  MODIFY `track_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`addressID`) REFERENCES `address` (`addressID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
