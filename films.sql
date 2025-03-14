-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 14 mrt 2025 om 09:16
-- Serverversie: 10.4.28-MariaDB
-- PHP-versie: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `films`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `films`
--

CREATE TABLE `films` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `url_trailer` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `votes` int(11) DEFAULT 0,
  `timestamp` bigint(20) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `films`
--

INSERT INTO `films` (`id`, `title`, `description`, `category`, `url_trailer`, `image_url`, `votes`, `timestamp`, `date`) VALUES
(1, 'batman', 'ik ben batman', 'Actie', 'https://www.youtube.com/', '/images/1740749381321.jpg', 0, NULL, NULL),
(2, 'hoi', 'hoi', 'hoi', 'https://www.youtube.com/@enzoknoltwee', '/images/1740750203099.jpg', 0, NULL, NULL),
(3, 'hoiiii', 'hoi', 'hoi', 'https://www.youtube.com/@enzoknoltwee', '/images/1740750225982.jpg', 0, NULL, NULL),
(4, 'hallo', 'hoi', 'hoi', 'https://www.youtube.com/@enzoknoldrie', '/images/1740753005285.jpg', 0, NULL, NULL),
(5, 'ignore', 'hoi', 'hoi', 'https://www.youtube.com/@furtjuh', '/images/1740753087888.jpg', 0, NULL, NULL),
(6, 'hoi', 'hoi', 'hoi', 'https://www.youtube.com/@furtjuh', '/images/1740753383424.png', 0, NULL, NULL),
(7, 'hoi', 'hoi', 'hoi', 'https://www.youtube.com/@enzoknoldrie', '/images/1740753515489.jpg', 0, NULL, NULL),
(8, 'hoi', 'hoi', 'hoi', 'https://www.youtube.com/', '/images/1740753865735.jpg', 0, NULL, NULL),
(9, 'The Flash', 'fastest man alve', 'action', 'https://www.theflash.com/', '/images/1740753934751.webp', 0, NULL, NULL),
(10, 'The abyys', 'hoi', 'hoi', 'https://www.theflash.com/', '/images/1740754091033.png', 0, NULL, NULL),
(11, 'darkmatter', 'hoi', 'hoi', 'https://www.youtube.com/', '/images/1740754200052.png', 0, NULL, NULL),
(12, 'HEART', 'BELONGS', 'TO ', 'https://www.youtube.com/@furtjuh', '/images/1740754330633.png', 0, NULL, NULL),
(13, 'hoi', 'hoi', 'hoi', 'https://www.youtube.com/@enzoknoldrie', '/images/1740754390297.png', 0, NULL, NULL),
(14, 'YOU KNOW MY HEART BELONGS TO YOUUUUU I SESE YOU WANT IT TOOO', 'THE ONLY PERSON GAVE ME LIFEEEEEEE', 'KNOW I SEE YOU ON THE OTHER SIDEEEEEE', 'https://www.theflash.com/', '/images/1740754563547.png', 0, NULL, NULL),
(15, 'YOU KNOW MY HEART BELONGS TO YOUUUUU I SESE YOU WANT IT TOOO', 'THE ONLY PERSON GAVE ME LIFEEEEEEE', 'KNOW I SEE YOU ON THE OTHER SIDEEEEEE', 'https://www.theflash.com/', '/images/1740754800796.png', 0, NULL, NULL),
(16, 'banaan', 'appel', 'fruit', 'https://www.youtube.com/@furtjuh', '/images/1740754829611.png', 0, NULL, NULL),
(17, 'test', 'test', 'test', 'https://www.youtube.com/@enzoknoldrie', '/images/1740755067471.jpg', 0, NULL, NULL),
(18, 'hoi', 'hoi', 'hoi', 'https://www.youtube.com/@enzoknoltwee', '/images/1740844881683.jpg', 0, NULL, NULL);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `films`
--
ALTER TABLE `films`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
