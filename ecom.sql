-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 08, 2021 at 06:43 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'sparsh18', '$2a$10$nLSn3YS7VyBHY2q7fcwr8.Q7t/gbRDF0AtyW7rPmKtJqtdN3hqx7W'),
(2, 'sparsh', '$2a$10$bTDx/HNiJmAepiCM6HB9JOdS8KMyYlsi/mDKnhXRLm68TbLw3Tgzi'),
(3, 'sp', '$2a$10$36Yk9.8V80rUMH52wC6DsOnq0Vy7Ch7JD3.NgRM3M0BHb/iLtv40i');

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `pincode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `area`, `pincode`) VALUES
(2, 'NN', '111111'),
(4, 'Ashok', '211111');

-- --------------------------------------------------------

--
-- Table structure for table `orderhistory`
--

CREATE TABLE `orderhistory` (
  `id` int(255) NOT NULL,
  `orderid` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `userid` int(255) NOT NULL,
  `products` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderhistory`
--

INSERT INTO `orderhistory` (`id`, `orderid`, `date`, `userid`, `products`, `qty`, `status`) VALUES
(4, '1197120163811', '2020-08-19 16:38:11', 2, ' 2', ' 1', 'a'),
(5, '1197120172951', '2020-08-19 17:29:51', 2, ' 1 2', ' 2 1', 'a'),
(7, '2247120203137', '2020-08-24 20:31:37', 2, ' 11', ' 2', 'a'),
(8, '2247120203859', '2020-08-24 20:38:59', 2, ' 12', ' 2', 'a'),
(9, '3297120203456', '2020-08-29 20:34:56', 3, ' 11', ' 2', 'a'),
(10, '33171200281', '2020-08-31 00:28:01', 3, ' 13', ' 2', 'a'),
(11, '331712002956', '2020-08-31 00:29:56', 3, ' 11', ' 2', 'a');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image1` varchar(255) NOT NULL,
  `image2` varchar(255) NOT NULL,
  `image3` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `stock` int(255) NOT NULL,
  `tag` varchar(20) NOT NULL DEFAULT 'n',
  `code` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `image1`, `image2`, `image3`, `description`, `stock`, `tag`, `code`) VALUES
(6, 'Sample 1', 'pexels-cottonbro-4614204.jpg', '', '', 'sample', 25, 'b', 'xxx'),
(7, 'Sample 2', 'pexels-cottonbro-4614110.jpg', '', '', 'sss', 40, 'b', 'xxx1xx'),
(8, 'Sample 3', 'pexels-pixabay-259756.jpg', '', '', 'xcv', 45, 'b', 'xxx3x'),
(9, 'Sample 4', 'pexels-artem-beliaikin-994523.jpg', '', '', 'ddddddddddd', 20, 'b', 'xxx'),
(10, 'Sample 5', 'pexels-pixabay-325876.jpg', '', '', 'ddddddddddd', 34, 'b', 'sd43'),
(11, 'Sample 6', 'pexels-terje-sollie-298863.jpg', '', '', 'ddddddddddddddd', 48, 'a', '5rfcd4'),
(13, 'SAMPLE', 'pexels-pixabay-235525.jpg', '', '', 'dddffgh', 23, 'a', 'xxx');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('92VjIF-5kLUIscERlW4CdXyDETyjB9Oz', 1600088015, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-09-14T12:53:35.383Z\",\"httpOnly\":true,\"path\":\"/\"},\"admin\":{\"u\":\"root\"}}'),
('IkKczui3dKNIeeIGfYVNfwrpTIHOqHwq', 1600089495, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-09-14T13:18:15.158Z\",\"httpOnly\":true,\"path\":\"/\"},\"admin\":{\"u\":\"root\"}}'),
('QcAA6-yQvW0XgANGlMtdhAr8vV3QRIxp', 1617575351, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-04-04T22:29:10.833Z\",\"httpOnly\":true,\"path\":\"/\"},\"cart\":{\"items\":{\"13\":{\"item\":{\"id\":13,\"name\":\"SAMPLE\",\"image1\":\"pexels-pixabay-235525.jpg\",\"image2\":\"\",\"image3\":\"\",\"description\":\"dddffgh\",\"stock\":23,\"tag\":\"a\",\"code\":\"xxx\"},\"qty\":1}},\"totalQty\":1},\"flash\":{},\"admin\":{\"u\":\"root\"}}'),
('e-vsUpBvsNpEQIXvEoDlB-iIkqESwimx', 1600090641, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2020-09-14T13:37:20.731Z\",\"httpOnly\":true,\"path\":\"/\"},\"admin\":{\"u\":\"root\"}}'),
('htgkuIe0La_a62ZUJx5lgBDUa3SVwSgp', 1600174055, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2020-09-15T12:47:34.606Z\",\"httpOnly\":true,\"path\":\"/\"},\"admin\":{\"u\":\"root\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `pincode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `webdetail`
--

CREATE TABLE `webdetail` (
  `id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `webdetail`
--

INSERT INTO `webdetail` (`id`, `email`, `contact`, `address`) VALUES
(1, 'ex@example.com', '+91 XX XXX XXXXX', 'XXXXX XXXXXX XXXXX XXXXXXX XXXXXX');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD UNIQUE KEY `UNIQUE` (`id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD UNIQUE KEY `UNIQUE` (`id`);

--
-- Indexes for table `orderhistory`
--
ALTER TABLE `orderhistory`
  ADD UNIQUE KEY `UNIQUE` (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD UNIQUE KEY `UNIQUE` (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `UNIQUE` (`id`);

--
-- Indexes for table `webdetail`
--
ALTER TABLE `webdetail`
  ADD UNIQUE KEY `UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orderhistory`
--
ALTER TABLE `orderhistory`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `webdetail`
--
ALTER TABLE `webdetail`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
