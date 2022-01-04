-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04-Jan-2022 às 03:11
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `petshop`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedores`
--

CREATE TABLE `fornecedores` (
  `id` int(11) NOT NULL,
  `empresa` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `categoria` enum('ração','brinquedos') NOT NULL,
  `dataCriacao` datetime NOT NULL,
  `dataAtualizacao` datetime NOT NULL,
  `versao` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fornecedores`
--

INSERT INTO `fornecedores` (`id`, `empresa`, `email`, `categoria`, `dataCriacao`, `dataAtualizacao`, `versao`) VALUES
(1, 'Alura ração', 'alura@contato.com', 'ração', '2021-12-12 21:32:55', '2021-12-12 21:32:55', 0),
(2, 'Alura ração 2', 'alura@contato.com', 'ração', '2021-12-12 21:38:46', '2021-12-12 21:38:46', 0),
(4, 'Alura ração 4', 'alura@contato.com', 'ração', '2021-12-13 14:34:48', '2021-12-13 14:34:48', 0),
(5, 'Alura ração 5', 'alura@contato.com', 'ração', '2021-12-13 14:35:48', '2021-12-13 14:35:48', 0),
(7, 'Alura ração 7', 'alura@contato.com', 'ração', '2021-12-13 14:46:35', '2021-12-13 14:46:35', 0),
(8, 'Alura ração 8', 'alura@contato.com', 'ração', '2021-12-15 23:49:12', '2021-12-15 23:49:12', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
