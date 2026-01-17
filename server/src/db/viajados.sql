-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2026 at 05:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `viajados`
--

-- --------------------------------------------------------

--
-- Table structure for table `favoritos_hoteis`
--

CREATE TABLE `favoritos_hoteis` (
  `idFavoritoHotel` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idHoteis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `favoritos_voos`
--

CREATE TABLE `favoritos_voos` (
  `idFavoritoVoo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idVoos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `hospedagem`
--

CREATE TABLE `hospedagem` (
  `idHospedagem` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idHoteis` int(11) NOT NULL,
  `localizacao_hotel` varchar(255) NOT NULL,
  `data_entrada` date NOT NULL,
  `data_saida` date NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `hoteis`
--

CREATE TABLE `hoteis` (
  `idHoteis` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `preco_diaria` decimal(10,0) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `avaliacao` int(11) DEFAULT NULL CHECK (`avaliacao` between 0 and 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `hoteis`
--

INSERT INTO `hoteis` (`idHoteis`, `nome`, `preco_diaria`, `descricao`, `avaliacao`) VALUES
(1, 'Hotel Paraíso', 250, 'Hotel de luxo com vista para o mar', 4),
(2, 'Pousada do Sol', 150, 'Aconchegante pousada no centro', 3),
(3, 'Resort das Águas', 450, 'Resort com piscinas termais', 5);

-- --------------------------------------------------------

--
-- Table structure for table `reserva_voo`
--

CREATE TABLE `reserva_voo` (
  `idReserva` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idVoos` int(11) NOT NULL,
  `data_reserva` datetime NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `nacionalidade` varchar(255) DEFAULT NULL,
  `sexo` enum('M','F') DEFAULT NULL,
  `foto_usuario` longblob DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nome`, `email`, `senha`, `cpf`, `data_nascimento`, `nacionalidade`, `sexo`, `foto_usuario`, `ativo`) VALUES
(1, 'Conta Teste', 'teste@viajados.com', '$2b$10$UvzJfUp6CN6492cIeW.UPu1G.h4HEnrS5IXBw0nPG7GSGhd36A0hG', '12345678910', '2025-04-20', 'Brasileiro', 'M', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `voos`
--

CREATE TABLE `voos` (
  `idVoos` int(11) NOT NULL,
  `destino` varchar(255) NOT NULL,
  `preco` decimal(10,0) NOT NULL,
  `origem` varchar(255) NOT NULL,
  `data` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `voos`
--

INSERT INTO `voos` (`idVoos`, `destino`, `preco`, `origem`, `data`) VALUES
(1, 'São Paulo', 300, 'Rio de Janeiro', '2025-04-01 08:00:00'),
(2, 'Salvador', 450, 'São Paulo', '2025-04-02 14:30:00'),
(3, 'Porto Alegre', 280, 'Curitiba', '2025-04-03 10:15:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favoritos_hoteis`
--
ALTER TABLE `favoritos_hoteis`
  ADD PRIMARY KEY (`idFavoritoHotel`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idHoteis` (`idHoteis`);

--
-- Indexes for table `favoritos_voos`
--
ALTER TABLE `favoritos_voos`
  ADD PRIMARY KEY (`idFavoritoVoo`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idVoos` (`idVoos`);

--
-- Indexes for table `hospedagem`
--
ALTER TABLE `hospedagem`
  ADD PRIMARY KEY (`idHospedagem`),
  ADD KEY `hospedagem_index_0` (`idHoteis`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `hoteis`
--
ALTER TABLE `hoteis`
  ADD PRIMARY KEY (`idHoteis`);

--
-- Indexes for table `reserva_voo`
--
ALTER TABLE `reserva_voo`
  ADD PRIMARY KEY (`idReserva`),
  ADD KEY `reserva_voo_index_0` (`idVoos`,`idUsuario`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Indexes for table `voos`
--
ALTER TABLE `voos`
  ADD PRIMARY KEY (`idVoos`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favoritos_hoteis`
--
ALTER TABLE `favoritos_hoteis`
  MODIFY `idFavoritoHotel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favoritos_voos`
--
ALTER TABLE `favoritos_voos`
  MODIFY `idFavoritoVoo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hospedagem`
--
ALTER TABLE `hospedagem`
  MODIFY `idHospedagem` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hoteis`
--
ALTER TABLE `hoteis`
  MODIFY `idHoteis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reserva_voo`
--
ALTER TABLE `reserva_voo`
  MODIFY `idReserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `voos`
--
ALTER TABLE `voos`
  MODIFY `idVoos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favoritos_hoteis`
--
ALTER TABLE `favoritos_hoteis`
  ADD CONSTRAINT `favoritos_hoteis_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `favoritos_hoteis_ibfk_2` FOREIGN KEY (`idHoteis`) REFERENCES `hoteis` (`idHoteis`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `favoritos_voos`
--
ALTER TABLE `favoritos_voos`
  ADD CONSTRAINT `favoritos_voos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `favoritos_voos_ibfk_2` FOREIGN KEY (`idVoos`) REFERENCES `voos` (`idVoos`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `hospedagem`
--
ALTER TABLE `hospedagem`
  ADD CONSTRAINT `hospedagem_ibfk_1` FOREIGN KEY (`idHoteis`) REFERENCES `hoteis` (`idHoteis`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `reserva_voo`
--
ALTER TABLE `reserva_voo`
  ADD CONSTRAINT `reserva_voo_ibfk_1` FOREIGN KEY (`idVoos`) REFERENCES `voos` (`idVoos`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `reserva_voo_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
