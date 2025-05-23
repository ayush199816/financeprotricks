-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 25, 2025 at 07:54 AM
-- Wersja serwera: 10.6.21-MariaDB
-- Wersja PHP: 8.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `hdadmin_sfm`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `AffiliateClick`
--

CREATE TABLE `AffiliateClick` (
  `id` varchar(191) NOT NULL,
  `linkId` varchar(191) NOT NULL,
  `ip` varchar(191) NOT NULL,
  `userAgent` text DEFAULT NULL,
  `referrer` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `AffiliateClick`
--

INSERT INTO `AffiliateClick` (`id`, `linkId`, `ip`, `userAgent`, `referrer`, `createdAt`) VALUES
('09877be0-f103-4d91-ad15-79773bb70739', '32a12239-1319-4aba-b0d0-e79325bd486b', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '', '2025-04-17 21:18:59');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `AffiliateLink`
--

CREATE TABLE `AffiliateLink` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `startupId` varchar(191) NOT NULL,
  `clicks` int(11) NOT NULL DEFAULT 0,
  `conversions` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `AffiliateLink`
--

INSERT INTO `AffiliateLink` (`id`, `name`, `code`, `userId`, `startupId`, `clicks`, `conversions`, `createdAt`, `updatedAt`) VALUES
('26996f1d-1d44-4402-b3ea-3c72f14f913f', 'Oskar Konstanciak', 'c01f264d', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'de03b03d-9bec-4a62-a80f-bf8430feeb94', 0, 0, '2025-04-23 07:23:51', '2025-04-23 07:23:51'),
('2e3f99a8-687e-4933-9e90-5175075383bf', 'Oskar Employee 1', '244f77da', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2073b043-d55d-4735-88c7-2714cb16d05a', 0, 0, '2025-04-18 02:59:43', '2025-04-18 02:59:43'),
('32a12239-1319-4aba-b0d0-e79325bd486b', 'Ayush Gupta', 'f1262be7', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2073b043-d55d-4735-88c7-2714cb16d05a', 1, 0, '2025-04-17 19:18:36', '2025-04-17 21:18:59'),
('6e73e772-d5d2-47fb-8766-18671c5f998f', 'Ayush Gupta', '26bd8d39', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', 0, 0, '2025-04-23 09:45:22', '2025-04-23 09:45:22'),
('8d1409f8-090a-4fca-97ce-c4c75cbeadbf', 'Oskar Konstanciak', '7d4ef1a2', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2073b043-d55d-4735-88c7-2714cb16d05a', 0, 0, '2025-04-18 02:45:12', '2025-04-18 02:45:12'),
('ff509efb-575a-460c-ac11-acbfe7862f3f', 'Ayush Gupta', '26f94577', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '0c8fdc1d-62d0-4755-a3cb-85684ecb7c0e', 0, 0, '2025-04-18 07:19:52', '2025-04-18 07:19:52');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `channel_members`
--

CREATE TABLE `channel_members` (
  `id` varchar(36) NOT NULL,
  `channel_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `joined_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `channel_members`
--

INSERT INTO `channel_members` (`id`, `channel_id`, `user_id`, `joined_at`) VALUES
('02d6fbb5-acd5-4a66-8722-28e8718eb790', 'cf93219d-38a7-4609-a410-c487815131ac', '48efb3e0-41d1-4696-88f5-0b85dc3b833f', '2025-04-24 01:58:18'),
('035e6762-1cbe-4f40-8ebc-4a068f5d2b79', 'cf93219d-38a7-4609-a410-c487815131ac', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-24 01:58:18'),
('105c8e12-9617-428c-bdb7-c5acc404280f', '05542fc3-369f-42a4-8f4a-de236505cdbf', 'f60e934e-6b0b-434e-b289-9d6304f7c256', '2025-04-24 01:58:18'),
('17ee01af-0f3a-4013-a96a-f7f675eaded0', 'cf93219d-38a7-4609-a410-c487815131ac', 'cf7a9c53-15d2-4dac-be3c-3a2660196b6e', '2025-04-24 01:58:18'),
('1a16bac4-56e2-4986-9d09-6e74463397d7', 'cf93219d-38a7-4609-a410-c487815131ac', 'f3dfaa3f-c7ee-401f-a3cc-968a9ea42714', '2025-04-24 01:58:18'),
('21e48ec7-b5e7-43e5-b069-9ad274b46d2d', '05542fc3-369f-42a4-8f4a-de236505cdbf', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-24 01:58:18'),
('2ca489f2-03e5-4ff6-86d3-32ee14122743', '05542fc3-369f-42a4-8f4a-de236505cdbf', '58bb769e-92ac-4524-a530-977b3cb874f1', '2025-04-24 01:58:18'),
('2e29850b-731e-4d32-a76b-eb33b81c4fe7', '05542fc3-369f-42a4-8f4a-de236505cdbf', 'cf7a9c53-15d2-4dac-be3c-3a2660196b6e', '2025-04-24 01:58:18'),
('33f76e47-a897-4b7c-b803-4910634d13ca', '05542fc3-369f-42a4-8f4a-de236505cdbf', '6e0a2dc2-bd92-4218-900e-ea56a77b0b7b', '2025-04-24 01:58:18'),
('3691db4d-40a1-4fa4-ac99-a1194f6b51e2', '05542fc3-369f-42a4-8f4a-de236505cdbf', 'test-user-id', '2025-04-24 01:58:18'),
('38b25f72-5f07-4ef7-ae86-bc791eb1dd92', '05542fc3-369f-42a4-8f4a-de236505cdbf', 'f3dfaa3f-c7ee-401f-a3cc-968a9ea42714', '2025-04-24 01:58:18'),
('3a6225b4-c6d8-411e-b5c6-f5ad1dd5ef65', 'cf93219d-38a7-4609-a410-c487815131ac', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2025-04-24 01:58:18'),
('3fa83c50-3b9b-4ab8-a7b1-10672105997d', '05542fc3-369f-42a4-8f4a-de236505cdbf', '1167cc74-8515-4434-9ee5-4c605f5145c8', '2025-04-24 01:58:18'),
('44cfcbec-f7a7-4431-b1d4-3f8fb66b459c', '05542fc3-369f-42a4-8f4a-de236505cdbf', '6195dc3c-a2bd-448e-bdfc-85489d28233d', '2025-04-24 01:58:18'),
('4b17aa31-be31-4529-a5fc-4358a8ed1814', 'cf93219d-38a7-4609-a410-c487815131ac', '9a48592d-ad7b-4b3e-97a1-0f09d79098ee', '2025-04-24 01:58:18'),
('4cedd6a9-00b4-4d2c-b1f9-20bc9b566a73', '05542fc3-369f-42a4-8f4a-de236505cdbf', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 01:50:07'),
('4e0158c8-39fa-46c7-89c9-741786ecbbe6', '05542fc3-369f-42a4-8f4a-de236505cdbf', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2025-04-24 01:58:18'),
('50df0a96-2398-43b4-b134-bc8d3a56860d', '05542fc3-369f-42a4-8f4a-de236505cdbf', '30659612-84db-47b5-be95-fdd49a89950b', '2025-04-24 01:58:18'),
('5aebc6ff-8c4c-4cba-bc55-90d7587624ed', '05542fc3-369f-42a4-8f4a-de236505cdbf', '48efb3e0-41d1-4696-88f5-0b85dc3b833f', '2025-04-24 01:58:18'),
('5b72c881-5b52-4db8-9ce5-353d2c162ad6', '05542fc3-369f-42a4-8f4a-de236505cdbf', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 01:58:18'),
('5f8d5632-f518-4b74-b964-d2d5fb51928c', 'cf93219d-38a7-4609-a410-c487815131ac', '8ef26d1c-ae99-40a8-b07f-c900121ac9d4', '2025-04-24 01:58:18'),
('6c0c7c31-f4ba-40cd-888c-967d807c6b78', 'cf93219d-38a7-4609-a410-c487815131ac', 'f60e934e-6b0b-434e-b289-9d6304f7c256', '2025-04-24 01:58:18'),
('79d6d7b1-e6ab-40f6-b3eb-84a86de26c14', 'cf93219d-38a7-4609-a410-c487815131ac', 'test-user-id', '2025-04-24 01:58:18'),
('86a97540-25e8-4e4e-b324-47b516ef8291', 'cf93219d-38a7-4609-a410-c487815131ac', '58bb769e-92ac-4524-a530-977b3cb874f1', '2025-04-24 01:58:18'),
('875c9b15-ab61-41d0-aa2d-b22b78276a80', 'cf93219d-38a7-4609-a410-c487815131ac', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 01:58:18'),
('a4698120-93eb-4717-8add-28227224dd71', 'cf93219d-38a7-4609-a410-c487815131ac', '6e0a2dc2-bd92-4218-900e-ea56a77b0b7b', '2025-04-24 01:58:18'),
('af0585ec-75dd-4f67-b90d-6b8cbde94cee', '05542fc3-369f-42a4-8f4a-de236505cdbf', '9a48592d-ad7b-4b3e-97a1-0f09d79098ee', '2025-04-24 01:58:18'),
('b4c25851-c6f3-4236-8b9b-692c507a1c19', 'cf93219d-38a7-4609-a410-c487815131ac', 'fd783af9-b72c-4304-890f-51a864a73fbf', '2025-04-24 01:58:18'),
('c2bf0db6-a272-4e90-855b-1e7d61341080', 'cf93219d-38a7-4609-a410-c487815131ac', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 01:50:07'),
('dac02358-46f7-4861-8f9e-28eb68400dfa', 'cf93219d-38a7-4609-a410-c487815131ac', '1167cc74-8515-4434-9ee5-4c605f5145c8', '2025-04-24 01:58:18'),
('e035fe49-830e-4ebf-a312-e0ebd53bc36d', 'cf93219d-38a7-4609-a410-c487815131ac', '6195dc3c-a2bd-448e-bdfc-85489d28233d', '2025-04-24 01:58:18'),
('e8dca2c9-0750-4eae-b7f5-79745a6f8540', 'cf93219d-38a7-4609-a410-c487815131ac', '30659612-84db-47b5-be95-fdd49a89950b', '2025-04-24 01:58:18'),
('f2db2e8b-3339-462b-9682-3929f6509a69', '05542fc3-369f-42a4-8f4a-de236505cdbf', '8ef26d1c-ae99-40a8-b07f-c900121ac9d4', '2025-04-24 01:58:18'),
('f725f594-d897-4956-8e2f-bcdba6486b42', '05542fc3-369f-42a4-8f4a-de236505cdbf', 'fd783af9-b72c-4304-890f-51a864a73fbf', '2025-04-24 01:58:18');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chat_channels`
--

CREATE TABLE `chat_channels` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_by` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_public` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `chat_channels`
--

INSERT INTO `chat_channels` (`id`, `name`, `description`, `created_by`, `created_at`, `updated_at`, `is_public`) VALUES
('05542fc3-369f-42a4-8f4a-de236505cdbf', 'Support Chat', 'Get help with the platform', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 01:50:07', '2025-04-24 01:50:07', 1),
('cf93219d-38a7-4609-a410-c487815131ac', 'General Discussion', 'General discussion for all users', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 01:50:07', '2025-04-24 01:50:07', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chat_groups`
--

CREATE TABLE `chat_groups` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `startup_id` varchar(36) DEFAULT NULL,
  `created_by` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `chat_groups`
--

INSERT INTO `chat_groups` (`id`, `name`, `description`, `startup_id`, `created_by`, `created_at`, `updated_at`) VALUES
('027d1fec-b30f-467d-9e85-7d922cd03a4b', 'Test Group Chat', 'Group chat for Test', '65108bb2-a42f-4147-8b7d-960cfd9f1b83', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 01:58:18', '2025-04-24 01:58:18'),
('0fb5a916-1763-4d29-90be-38cf7be6b56c', 'Affiliate DATA Test Group Chat', 'Group chat for Affiliate DATA Test', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 01:58:18', '2025-04-24 01:58:18'),
('7d86d9f7-73d3-47da-8612-a666b2a99a0e', 'SFORGER sfm Group Chat', 'Group chat for SFORGER sfm', 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 01:58:18', '2025-04-24 01:58:18'),
('9e8d4059-d2e4-4cc9-a7fe-538874a08fb3', 'SFORGER sfc Group Chat', 'Group chat for SFORGER sfc', 'ede3a25f-5951-4a7f-b6ca-85341ad03c96', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 01:58:18', '2025-04-24 01:58:18'),
('bcd891a7-7071-427f-bfbc-5290a4c5a2a8', 'Test Group Chat', 'Group chat for Test', 'c2dd37c1-89b6-49b4-89aa-d41aacd88c06', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 01:58:18', '2025-04-24 01:58:18'),
('e6e6e49e-ac1b-4a32-9a86-3f1c25b5c847', 'text Group Chat', 'Group chat for text', 'ada3613b-b62c-4819-93c5-d370f5e58476', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 01:58:18', '2025-04-24 01:58:18'),
('f04d7a4f-fad7-4aaf-b83e-69127d6df400', 'test community Group Chat', 'Group chat for test community', 'c17166ba-bfe6-45c2-aa4b-e86ab75c20a8', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 01:58:18', '2025-04-24 01:58:18');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Discussion`
--

CREATE TABLE `Discussion` (
  `id` varchar(191) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `startupId` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `DiscussionComment`
--

CREATE TABLE `DiscussionComment` (
  `id` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `discussionId` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `documents`
--

CREATE TABLE `documents` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `filePath` varchar(191) NOT NULL,
  `fileType` varchar(191) NOT NULL,
  `fileSize` int(11) NOT NULL,
  `startupId` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `documents`
--

INSERT INTO `documents` (`id`, `name`, `description`, `filePath`, `fileType`, `fileSize`, `startupId`, `userId`, `createdAt`, `updatedAt`) VALUES
('008e23e4-74cd-419a-8ac4-fa8778872f27', 'testk.jnjb ', 'fsd', 'uploads/documents/doc-1745345250967-96161216.jpeg', 'image/jpeg', 28876, 'f5f508d2-64dd-4ea8-8f26-3a933943023e', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-22 20:07:30.968', '2025-04-22 20:07:30.968'),
('06d62a1b-7ff7-4db4-8293-d2dc9c1b1a98', 'test', 'test', 'uploads/documents/doc-1745116654561-207375992.jpg', 'image/jpeg', 13684, '2073b043-d55d-4735-88c7-2714cb16d05a', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-20 04:37:34.562', '2025-04-20 04:37:34.562');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Education`
--

CREATE TABLE `Education` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `fieldOfStudy` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `Education`
--

INSERT INTO `Education` (`id`, `userId`, `institution`, `degree`, `fieldOfStudy`, `startDate`, `endDate`, `description`, `createdAt`, `updatedAt`) VALUES
('025e74b3-1d48-11f0-9438-bc2411fc335d', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'test', 'test', 'test', '2021-07-01', NULL, NULL, '2025-04-19 19:59:16', '2025-04-19 19:59:16'),
('8fe45537-1edd-11f0-9438-bc2411fc335d', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'DIT', 'Btech', 'Computer Science and Engg', '2017-07-31', '2021-06-29', NULL, '2025-04-21 20:22:19', '2025-04-21 20:22:43'),
('bb58111c-1fbe-11f0-99bf-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'ddddddddddddd', 'dddddddddd', 'dddddddddddd', '2025-04-01', NULL, NULL, '2025-04-22 23:14:09', '2025-04-22 23:14:09');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Experience`
--

CREATE TABLE `Experience` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `current` tinyint(1) DEFAULT 0,
  `description` text DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `Experience`
--

INSERT INTO `Experience` (`id`, `userId`, `title`, `company`, `location`, `startDate`, `endDate`, `current`, `description`, `createdAt`, `updatedAt`) VALUES
('07f679b3-bb1a-4412-bcfa-22e91a93da11', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'Sfm', 'te', NULL, '2025-04-15', NULL, 0, 'test', '2025-04-19 13:09:16', '2025-04-21 19:32:29'),
('2a1fa80f-1d57-11f0-9438-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'xxxxxxxx', 'xxxxxxxx', NULL, '2025-04-07', NULL, 0, 'ddddddddd', '2025-04-19 21:47:45', '2025-04-19 21:47:45'),
('a18c5a3c-1ed6-11f0-9438-bc2411fc335d', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'b, ', 'b,b', NULL, '2025-04-01', NULL, 0, NULL, '2025-04-21 19:32:43', '2025-04-21 19:32:43'),
('a6283709-1d47-11f0-9438-bc2411fc335d', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'test', 'test', NULL, '2025-04-01', NULL, 0, NULL, '2025-04-19 19:56:41', '2025-04-19 19:56:41');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_size` int(11) NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Friends`
--

CREATE TABLE `Friends` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `friendId` varchar(36) NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `friendship`
--

CREATE TABLE `friendship` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `friend_id` varchar(36) NOT NULL,
  `status` enum('PENDING','ACCEPTED','REJECTED') DEFAULT 'PENDING',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `friendship`
--

INSERT INTO `friendship` (`id`, `user_id`, `friend_id`, `status`, `created_at`, `updated_at`) VALUES
('1ee4bd0e-f4ab-4ef5-8f14-4936221280e0', '04045461-f1ce-4eb3-b792-f3dec5509882', 'dbf982f7-a8c3-4c1c-85b6-2bab4f6ade16', 'ACCEPTED', '2025-04-24 07:12:06', '2025-04-24 07:12:06');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `friendships`
--

CREATE TABLE `friendships` (
  `id` int(11) NOT NULL,
  `user1_id` varchar(36) NOT NULL,
  `user2_id` varchar(36) NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `friendships`
--

INSERT INTO `friendships` (`id`, `user1_id`, `user2_id`, `status`, `created_at`, `updated_at`) VALUES
(7, 'dbf982f7-a8c3-4c1c-85b6-2bab4f6ade16', '04045461-f1ce-4eb3-b792-f3dec5509882', 'pending', '2025-04-24 07:14:23', '2025-04-24 10:40:24');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `GamificationAction`
--

CREATE TABLE `GamificationAction` (
  `id` int(11) NOT NULL,
  `action_key` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `default_points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `GroupChat`
--

CREATE TABLE `GroupChat` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdBy` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isProject` tinyint(1) DEFAULT 0,
  `projectId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `GroupChat`
--

INSERT INTO `GroupChat` (`id`, `name`, `description`, `createdBy`, `createdAt`, `updatedAt`, `isProject`, `projectId`) VALUES
('6f7a1bd6-7321-45af-88ff-8d9e7fb02b63', 'General Discussion', 'Chat about anything related to SFManagers', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 21:07:36', '2025-04-22 21:07:36', 0, NULL),
('87b13b4b-43a8-49e2-8690-1493b5db908b', 'Support', 'Get help with the platform', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 21:07:36', '2025-04-22 21:07:36', 0, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `GroupChatMember`
--

CREATE TABLE `GroupChatMember` (
  `id` varchar(36) NOT NULL,
  `groupId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `joinedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `GroupChatMember`
--

INSERT INTO `GroupChatMember` (`id`, `groupId`, `userId`, `joinedAt`, `isAdmin`) VALUES
('cbe4c770-26c1-4516-80d7-eab4b1e9c140', '6f7a1bd6-7321-45af-88ff-8d9e7fb02b63', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 21:07:36', 1),
('d2199607-46a8-41d9-a91a-c1d78c891202', '87b13b4b-43a8-49e2-8690-1493b5db908b', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 21:07:36', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `GroupMessage`
--

CREATE TABLE `GroupMessage` (
  `id` varchar(36) NOT NULL,
  `groupId` varchar(36) NOT NULL,
  `senderId` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `GroupMessage`
--

INSERT INTO `GroupMessage` (`id`, `groupId`, `senderId`, `content`, `createdAt`) VALUES
('0f38ab9f-ec4e-4bd2-98ca-b2ce535826f2', '87b13b4b-43a8-49e2-8690-1493b5db908b', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'ddd', '2025-04-22 22:58:29'),
('14b69b1b-46c9-41b2-b0a7-00648c378189', '6f7a1bd6-7321-45af-88ff-8d9e7fb02b63', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'Welcome to the General Discussion group chat!', '2025-04-22 21:07:36'),
('dcd969a2-c4f0-40bd-bfaf-464f54cd1235', '6f7a1bd6-7321-45af-88ff-8d9e7fb02b63', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'ddd', '2025-04-22 22:58:32');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `GroupMessageRead`
--

CREATE TABLE `GroupMessageRead` (
  `id` varchar(36) NOT NULL,
  `messageId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `readAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `GroupMessageRead`
--

INSERT INTO `GroupMessageRead` (`id`, `messageId`, `userId`, `readAt`) VALUES
('4b3396a1-cdb4-4eda-9ce2-6bc185ef982b', 'dcd969a2-c4f0-40bd-bfaf-464f54cd1235', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 22:58:32'),
('6a603758-e3aa-46f5-944f-5cfb1ff7bfa8', '0f38ab9f-ec4e-4bd2-98ca-b2ce535826f2', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 22:58:29'),
('8e5a1b57-90d3-473c-a1d0-fc7689589344', '14b69b1b-46c9-41b2-b0a7-00648c378189', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 21:07:37');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `group_members`
--

CREATE TABLE `group_members` (
  `group_id` varchar(191) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `joined_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `HourlyRateConfig`
--

CREATE TABLE `HourlyRateConfig` (
  `id` varchar(191) NOT NULL,
  `skillType` varchar(191) NOT NULL,
  `hourlyRate` decimal(8,2) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Idea`
--

CREATE TABLE `Idea` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `createdBy` varchar(36) NOT NULL,
  `startupId` varchar(36) NOT NULL,
  `isApproved` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `Idea`
--

INSERT INTO `Idea` (`id`, `title`, `description`, `tags`, `createdBy`, `startupId`, `isApproved`, `createdAt`, `updatedAt`) VALUES
('8fdfb811-7611-4f2c-ae97-13800c6dce93', 'ssdasd', 'dsdsds', '[\"dssd\"]', 'system-user', '2073b043-d55d-4735-88c7-2714cb16d05a', 0, '2025-04-18 00:44:01', '2025-04-18 00:44:01'),
('df6806b6-c6a3-49b4-a298-3aedbbde91e4', 'sss', 'ssss', '[\"sss\"]', 'system-user', '2073b043-d55d-4735-88c7-2714cb16d05a', 0, '2025-04-18 01:50:57', '2025-04-18 01:50:57'),
('e3a36c05-0616-4542-9cdf-00cc32d83768', 'xxx', 'xxx', '[\"xxx\"]', 'system-user', 'undefined', 0, '2025-04-18 01:16:36', '2025-04-18 01:16:36');

-- --------------------------------------------------------


-- Struktura tabeli dla tabeli `IdeaComment`
--

CREATE TABLE `IdeaComment` (
  `id` varchar(36) NOT NULL,
  `ideaId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `IdeaComment`
--

INSERT INTO `IdeaComment` (`id`, `ideaId`, `userId`, `content`, `parentId`, `createdAt`, `updatedAt`) VALUES
('3802d17a-0dfc-4127-b18b-acf92d07bb37', 'df6806b6-c6a3-49b4-a298-3aedbbde91e4', 'system-user', 'dcxcx', NULL, '2025-04-18 02:17:51', '2025-04-18 02:17:51'),
('59519aaf-f818-4936-be09-00c9b5786f80', 'test-ideathon-id', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'good idea', NULL, '2025-04-20 13:49:51', '2025-04-20 13:49:51'),
('5a385a62-587c-4261-bb77-7636d1d608f1', 'test-ideathon-id', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'good idea', NULL, '2025-04-20 13:49:51', '2025-04-20 13:49:51'),
('72198b88-0890-46c5-9df6-b525eba826ac', 'df6806b6-c6a3-49b4-a298-3aedbbde91e4', 'system-user', 'jhjgt', NULL, '2025-04-18 01:54:22', '2025-04-18 01:54:22');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ideathon`
--

CREATE TABLE `ideathon` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` enum('Idea','Document','Code') NOT NULL,
  `description` text NOT NULL,
  `document_url` varchar(255) DEFAULT NULL,
  `user_id` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `ideathon`
--

INSERT INTO `ideathon` (`id`, `title`, `type`, `description`, `document_url`, `user_id`, `created_at`, `updated_at`) VALUES
('d4d9bbdb-e991-482c-902e-13a6a9a86f9e', 'cfxgx', '', 'hfxc', NULL, 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-20 16:08:34', '0000-00-00 00:00:00'),
('test-ideathon-id', 'Test Ideathon', 'Idea', 'A test ideathon for development', NULL, 'test-user-id', '2025-04-20 03:50:14', '2025-04-20 03:50:14');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `IdeaVote`
--

CREATE TABLE `IdeaVote` (
  `id` varchar(36) NOT NULL,
  `ideaId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `value` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `IdeaVote`
--

INSERT INTO `IdeaVote` (`id`, `ideaId`, `userId`, `value`, `createdAt`, `updatedAt`) VALUES
('0bd65ea8-e748-49cb-9984-1f180eae41ca', 'd4d9bbdb-e991-482c-902e-13a6a9a86f9e', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 1, '2025-04-21 17:28:28', '2025-04-21 17:28:28'),
('6db95a35-79f9-4fc2-8b04-9a7b78ffceb8', 'df6806b6-c6a3-49b4-a298-3aedbbde91e4', 'system-user', 1, '2025-04-18 04:42:47', '2025-04-18 04:42:47'),
('84c69109-899a-4923-8a18-fc6ef6dd9ff4', 'test-ideathon-id', '0953f29d-d9e0-4d20-a71b-c97d34462947', 1, '2025-04-22 21:07:08', '2025-04-22 21:07:08'),
('a2d45695-7cbc-4c04-8726-8cec882f52f2', 'test-ideathon-id', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 1, '2025-04-20 13:49:37', '2025-04-20 13:49:37'),
('ca90a43e-e23a-42e3-a145-99404909f21f', '8fdfb811-7611-4f2c-ae97-13800c6dce93', 'system-user', -1, '2025-04-18 04:42:45', '2025-04-18 04:42:50');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `JoinRequest`
--

CREATE TABLE `JoinRequest` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `startupId` varchar(191) NOT NULL,
  `roleId` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL,
  `message` varchar(191) DEFAULT NULL,
  `receiverId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `JoinRequest`
--

INSERT INTO `JoinRequest` (`id`, `userId`, `startupId`, `roleId`, `status`, `message`, `receiverId`, `createdAt`, `updatedAt`) VALUES
('0913cbe2-ca0b-4236-8f7d-0d4350c55597', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2073b043-d55d-4735-88c7-2714cb16d05a', 'b9e2e03d-6ec5-4b8e-af41-61f7df2b6e65', 'ACCEPTED', 'hi', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-17 20:00:14.232', '2025-04-17 20:00:32.520'),
('0d027630-aa87-4e81-ad67-a88bdc3922d1', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2073b043-d55d-4735-88c7-2714cb16d05a', '4f113176-113f-436c-89a9-552958ed595a', 'ACCEPTED', NULL, '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-18 04:48:24.042', '2025-04-18 04:48:41.172'),
('12aa1cf1-4ffc-47d4-8258-6d6280d539a6', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '43fdb253-9ae7-4fbb-b576-dc61462586d3', '93bff41b-ba75-432f-b844-5af79c4be28c', 'PENDING', 'hi', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-19 14:19:54.000', '0000-00-00 00:00:00.000'),
('24c87eed-1081-4766-b678-05e808cfed25', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'e13ff3bf-5573-428f-b1b2-00bb085b4156', 'ed9f79ad-b9b3-42f2-812e-9c77374c1778', 'ACCEPTED', 'Test', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-18 19:30:04.000', '2025-04-18 19:58:36.983'),
('3ba36e52-1a70-4419-8e8b-f39fa914a044', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2073b043-d55d-4735-88c7-2714cb16d05a', '454a6cd7-6c70-4cef-bd44-342a99a025e3', 'ACCEPTED', 'HALLO', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-19 23:07:26.300', '2025-04-19 23:07:40.690'),
('6eaf8814-9b02-4987-b4ac-386bc9567b22', '3fe0d45e-a341-42df-94b0-5c928f3d986f', 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '2c983261-e69b-4978-a2a2-08e51110f6a5', 'ACCEPTED', NULL, '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 02:05:44.713', '2025-04-24 02:06:32.932'),
('76fa3162-4656-42c6-8774-a07cfba536b1', 'fd783af9-b72c-4304-890f-51a864a73fbf', '2073b043-d55d-4735-88c7-2714cb16d05a', 'dcae3a2f-338e-4fbc-81af-42aca4f78543', 'ACCEPTED', NULL, '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-18 19:38:07.593', '2025-04-18 23:57:00.614'),
('7da51e71-6fb1-441a-a3b1-9a031324e96d', '6e0a2dc2-bd92-4218-900e-ea56a77b0b7b', '2073b043-d55d-4735-88c7-2714cb16d05a', '454a6cd7-6c70-4cef-bd44-342a99a025e3', 'ACCEPTED', 'fg', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-19 00:29:49.000', '2025-04-20 04:35:22.962'),
('b3d04abd-51f6-4aee-ad9d-96b9da4f1c6f', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '8c4d47a0-fc89-4acb-ac41-15a5ce13e459', '8b2a6e0d-9491-4b3d-b88e-0c7ab937a3fe', 'ACCEPTED', 'Intrested', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-18 09:23:28.425', '2025-04-18 09:24:12.457'),
('b51489a8-1209-4edc-bcbb-0f7eb9c13f99', '0953f29d-d9e0-4d20-a71b-c97d34462947', '8c4d47a0-fc89-4acb-ac41-15a5ce13e459', 'd2c776d0-c71a-4377-8ba1-689b4c344143', 'ACCEPTED', NULL, 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-17 19:39:18.027', '2025-04-17 19:41:34.439'),
('ea28d32a-3022-43cb-ad45-a24c62e37dca', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', 'd0cf9af7-16da-42a0-84b7-c8d3160fd08f', 'ACCEPTED', 'test', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-22 16:52:02.000', '2025-04-22 16:52:25.440'),
('eec8d761-5403-4797-af8a-7c4267689651', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2073b043-d55d-4735-88c7-2714cb16d05a', 'b9e2e03d-6ec5-4b8e-af41-61f7df2b6e65', 'REJECTED', 'test\n', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-17 19:38:55.063', '2025-04-17 19:59:57.091'),
('f6a5add4-cc43-485f-9ae3-7c49b43c020c', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2073b043-d55d-4735-88c7-2714cb16d05a', '454a6cd7-6c70-4cef-bd44-342a99a025e3', 'ACCEPTED', 'dsa', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-19 01:07:57.000', '2025-04-20 04:35:21.892'),
('f9698547-f0c1-4f6d-939d-43cbe9017253', '58bb769e-92ac-4524-a530-977b3cb874f1', '2073b043-d55d-4735-88c7-2714cb16d05a', 'baf1d0e9-39f0-435d-8a98-48607d06e790', 'PENDING', 'dggfg', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 09:25:11.000', '0000-00-00 00:00:00.000');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `knowledge_categories`
--

CREATE TABLE `knowledge_categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `knowledge_categories`
--

INSERT INTO `knowledge_categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
('26452f3c-3ac3-4294-bec7-ece762c3f2f0', 'website templates', 'website-templates', NULL, '2025-04-24 06:54:16', '2025-04-24 06:54:16'),
('57c526b3-fb80-4188-bfcb-979184bddf1e', 'code snippets', 'code-snippets', NULL, '2025-04-24 06:59:24', '2025-04-24 06:59:24'),
('fb3d2f08-71e2-482e-8342-21f7df2b64b3', 'design resources', 'design-resources', NULL, '2025-04-24 07:25:24', '2025-04-24 07:25:24');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `knowledge_resources`
--

CREATE TABLE `knowledge_resources` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` varchar(36) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_type` varchar(100) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `created_by` varchar(36) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `downloads` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `knowledge_resources`
--

INSERT INTO `knowledge_resources` (`id`, `title`, `description`, `category_id`, `file_path`, `file_name`, `file_type`, `views`, `created_by`, `created_at`, `updated_at`, `downloads`) VALUES
('34a516e7-16b6-4987-8cc3-dab3eb0e7b53', 'Test', 'test', '57c526b3-fb80-4188-bfcb-979184bddf1e', '/home/hdadmin/domains/sfcollab.com/sfcollab/uploads/knowledge-resources/1745477964003-891422589.jpeg', 'WhatsApp Image 2025-04-24 at 12.18.29 AM.jpeg', 'image/jpeg', 0, '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 06:59:24', '2025-04-24 06:59:24', 0),
('64b8da60-7816-4bcf-bb7a-5e0cfef0c151', 'Test', 'We are looking for a detail-oriented individual to join our team as outbound travel specialist. The responsibilities of the travel specialist include optimising our travel operations, making travel arrangements over the phone or the internet, providing guidance on travel arrangements, and preparing budget reports.\r\nTo be a successful travel executive, you should have a strong working knowledge of travel management processes and excellent attention to detail. Ultimately, a top-notch travel manager is skilled at maintaining positive relationships with airlines and hotels and at providing a smooth travel experience.\r\n\r\n\r\n\r\n\r\nRoles & Responsibilities;\r\n\r\n\r\nKnowledge of National destinations \r\n\r\nExperience in team handling and collaborate with different Inter & Intra departments \r\n\r\nNegotiating preferred rates with vendors of direct travel.\r\nMaintaining positive relationships with vendors of direct travel, such as car rentals, hotels, and airlines.\r\nPlanning travel accommodations, booking flights, hotels, car rentals, and coordinating activities.\r\nManaging and processing all travel-related documentation, including payments, itineraries, visas, medical, and legal forms.\r\nAssisting with any travel-related issues that may arise.\r\nResearching travel deals and evaluating prices and services.\r\nArranging travel accommodations for business visitors.\r\nCreating, optimising, and monitoring corporate travel policies.\r\nPreparing travel budget reports.\r\nAnalysing and preparing reports on travel spend.\r\n', 'fb3d2f08-71e2-482e-8342-21f7df2b64b3', '/home/hdadmin/domains/sfcollab.com/sfcollab/uploads/knowledge-resources/1745479523978-452497032.jpeg', '1685878329445.jpeg', 'image/jpeg', 0, '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 07:25:24', '2025-04-24 08:35:23', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `knowledge_resource_comments`
--

CREATE TABLE `knowledge_resource_comments` (
  `id` varchar(36) NOT NULL,
  `resource_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `knowledge_resource_tags`
--

CREATE TABLE `knowledge_resource_tags` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `knowledge_resource_tag_relations`
--

CREATE TABLE `knowledge_resource_tag_relations` (
  `resource_id` varchar(36) NOT NULL,
  `tag_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `knowledge_resource_votes`
--

CREATE TABLE `knowledge_resource_votes` (
  `id` varchar(36) NOT NULL,
  `resource_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `knowledge_resource_votes`
--

INSERT INTO `knowledge_resource_votes` (`id`, `resource_id`, `user_id`, `created_at`) VALUES
('5806a20b-077f-498d-80d2-c20d3dcfa948', '34a516e7-16b6-4987-8cc3-dab3eb0e7b53', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 07:14:41'),
('7edf6195-488b-46ec-a4b5-4735728ea8b0', '64b8da60-7816-4bcf-bb7a-5e0cfef0c151', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 07:31:12');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `leads`
--

CREATE TABLE `leads` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `source` varchar(100) NOT NULL,
  `notes` text DEFAULT NULL,
  `sales_amount` decimal(10,2) NOT NULL,
  `next_action_date` timestamp NULL DEFAULT NULL,
  `assigned_to_id` varchar(36) DEFAULT NULL,
  `startup_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Message`
--

CREATE TABLE `Message` (
  `id` varchar(36) NOT NULL,
  `senderId` varchar(36) NOT NULL,
  `receiverId` varchar(36) NOT NULL,
  `groupId` varchar(36) DEFAULT NULL,
  `content` text NOT NULL,
  `isRead` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `startupId` varchar(36) DEFAULT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'direct'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `Message`
--

INSERT INTO `Message` (`id`, `senderId`, `receiverId`, `groupId`, `content`, `isRead`, `createdAt`, `updatedAt`, `startupId`, `type`) VALUES
('0088dfb4-a5fb-4ac0-ac5d-1c29a696144e', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'mjh', 0, '2025-04-18 09:07:44', '2025-04-18 09:07:44', NULL, 'direct'),
('093148bc-4f2e-45f6-985a-637d6b3d90f6', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'fdsfsd', 0, '2025-04-18 08:31:49', '2025-04-18 08:31:49', NULL, 'direct'),
('11c154eb-4e52-4fc8-b9e3-d84796e633fd', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', NULL, 'hi', 0, '2025-04-18 09:24:49', '2025-04-18 09:24:49', NULL, 'direct'),
('19bd951d-0f8b-41a5-b8b5-69a5166060c7', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'xx', 0, '2025-04-18 06:36:00', '2025-04-18 06:36:00', NULL, 'direct'),
('20e82d00-4e3a-497a-9f68-03779ca5e723', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'jhjgj', 0, '2025-04-18 08:40:14', '2025-04-18 08:40:14', NULL, 'direct'),
('23179553-2ea9-4adc-9d5e-bfea13e1155c', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'Hi', 0, '2025-04-17 21:26:17', '2025-04-17 21:26:17', '8c4d47a0-fc89-4acb-ac41-15a5ce13e459', 'direct'),
('2750f906-c482-4a48-9388-c2a06f3edf87', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', NULL, 'hi', 0, '2025-04-18 09:47:59', '2025-04-18 09:47:59', NULL, 'direct'),
('28ed4b4c-2cd0-4db7-8a34-384cd709e16f', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'gfgfd', 0, '2025-04-18 09:00:37', '2025-04-18 09:00:37', NULL, 'direct'),
('33defc29-4bdb-4a02-909a-e8917cbd33b5', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', NULL, 'good', 0, '2025-04-18 09:27:03', '2025-04-18 09:27:03', NULL, 'direct'),
('388cc976-bdb7-4a75-8572-f34c011c6306', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'hi', 0, '2025-04-18 07:37:01', '2025-04-18 07:37:01', NULL, 'direct'),
('44985a47-7a96-4d6d-96d0-f0d56c78aa94', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'xxx', 0, '2025-04-18 15:42:10', '2025-04-18 15:42:10', NULL, 'direct'),
('4517ba8e-ec15-4d47-a55d-2cccd1e1e34e', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', NULL, 'sup bro', 0, '2025-04-18 07:20:09', '2025-04-18 07:20:09', NULL, 'direct'),
('46a4e7cf-02c2-43d8-8b14-a7bd85698297', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'ewwew', 0, '2025-04-18 07:52:59', '2025-04-18 07:52:59', NULL, 'direct'),
('6034d90e-859e-40a8-8eb3-de8f38cd0457', '0953f29d-d9e0-4d20-a71b-c97d34462947', '', '05542fc3-369f-42a4-8f4a-de236505cdbf', 'hii', 0, '2025-04-24 02:06:05', '2025-04-24 02:06:05', NULL, 'channel'),
('67c69b9b-5d38-4ee4-9749-33ba5968b671', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'fdg', 0, '2025-04-18 07:53:34', '2025-04-18 07:53:34', NULL, 'direct'),
('67da53db-ffb4-4cdc-8a39-030852ad3146', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '', 'cf93219d-38a7-4609-a410-c487815131ac', 'hello', 0, '2025-04-24 02:05:55', '2025-04-24 02:05:55', NULL, 'channel'),
('6d0b4975-77ff-4c4a-ad08-72980f0d5df6', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', NULL, 'hi', 0, '2025-04-23 18:59:50', '2025-04-23 18:59:50', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', 'direct'),
('6f440172-edbb-4baf-ba30-eafca35b496e', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'hiii', 0, '2025-04-18 06:11:34', '2025-04-18 06:11:34', '2073b043-d55d-4735-88c7-2714cb16d05a', 'direct'),
('70222cce-c94b-4700-8eb4-c92b850a505e', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '', '05542fc3-369f-42a4-8f4a-de236505cdbf', 'hi', 0, '2025-04-24 06:42:57', '2025-04-24 06:42:57', NULL, 'channel'),
('7aa2edee-ceba-41d4-a032-0f3b256340a6', '0953f29d-d9e0-4d20-a71b-c97d34462947', '', 'cf93219d-38a7-4609-a410-c487815131ac', 'hi', 0, '2025-04-24 02:04:32', '2025-04-24 02:04:32', NULL, 'channel'),
('7e6e5fb0-dc2d-457f-99e5-6833a8bcfba7', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'xdsda', 0, '2025-04-18 06:36:01', '2025-04-18 06:36:01', NULL, 'direct'),
('7fb7c10d-bb56-47a5-b7cd-5b7630ef30bd', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'dsadsa', 0, '2025-04-18 08:26:56', '2025-04-18 08:26:56', NULL, 'direct'),
('8585cac8-315e-43b2-8f65-a9d89c88cb94', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'dsdsd', 0, '2025-04-19 01:40:45', '2025-04-19 01:40:45', '2073b043-d55d-4735-88c7-2714cb16d05a', 'direct'),
('8a2be616-bb1c-4e3b-bb5f-1b8687d5e2e7', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'hello', 0, '2025-04-18 06:30:25', '2025-04-18 06:30:25', NULL, 'direct'),
('8d8e98ee-b2d5-432c-bc54-131c713f5aa2', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'gfgf', 0, '2025-04-18 07:30:07', '2025-04-18 07:30:07', NULL, 'direct'),
('8fe4d138-fcf5-4fb0-b146-4dbfbbf8993d', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'f', 0, '2025-04-18 07:44:22', '2025-04-18 07:44:22', NULL, 'direct'),
('92361129-6cc4-4b33-9d44-4008e0d93238', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'weweq', 0, '2025-04-18 08:38:20', '2025-04-18 08:38:20', NULL, 'direct'),
('93373739-8881-46be-bd10-c0bf7b3b8248', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'ddsdsds', 0, '2025-04-18 16:22:43', '2025-04-18 16:22:43', NULL, 'direct'),
('9e82068e-71fd-4f38-81e2-42481c11ade8', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'd', 0, '2025-04-18 07:52:57', '2025-04-18 07:52:57', NULL, 'direct'),
('a13271bd-0af6-4c88-a717-8e96a0f1bcbc', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'xxx', 0, '2025-04-18 06:48:50', '2025-04-18 06:48:50', NULL, 'direct'),
('aabf26b6-aa62-4301-a45b-2cd808c5d17e', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', NULL, 'asdasd', 0, '2025-04-19 23:05:44', '2025-04-19 23:05:44', 'e13ff3bf-5573-428f-b1b2-00bb085b4156', 'direct'),
('b132a21e-bf86-45fe-ae29-66fd186d3682', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'sds', 0, '2025-04-18 16:22:47', '2025-04-18 16:22:47', NULL, 'direct'),
('bbac9162-9329-417e-bdff-cfcbcb390585', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'fggfddgf', 0, '2025-04-18 07:54:02', '2025-04-18 07:54:02', NULL, 'direct'),
('c768a4c6-f5af-4c80-908d-3d181455c4e8', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'dsadasds', 0, '2025-04-18 07:10:18', '2025-04-18 07:10:18', NULL, 'direct'),
('d4a06d6c-4a19-41d6-85de-4b57ec5f8953', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', NULL, 'hallo', 0, '2025-04-19 23:06:25', '2025-04-19 23:06:25', 'e13ff3bf-5573-428f-b1b2-00bb085b4156', 'direct'),
('d94d5be9-881d-44b0-9d6f-bdb8294f1264', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'gfdgfdgdf', 0, '2025-04-18 07:53:52', '2025-04-18 07:53:52', NULL, 'direct'),
('dd9a171b-ff2d-4c26-9304-a4766b17c19f', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'hnmv', 0, '2025-04-18 09:07:47', '2025-04-18 09:07:47', NULL, 'direct'),
('e5d1bc31-b79d-466d-8746-3d99149e8d0c', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'dcvsxfdg', 0, '2025-04-18 07:36:28', '2025-04-18 07:36:28', NULL, 'direct'),
('f48139a3-1d76-446f-93da-52a66a645c38', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', NULL, 'jhg', 0, '2025-04-18 08:36:46', '2025-04-18 08:36:46', NULL, 'direct'),
('f52cd4c8-205e-4aab-bdd8-cd267fa841e1', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', NULL, 'hi', 0, '2025-04-18 09:24:58', '2025-04-18 09:24:58', NULL, 'direct'),
('f9233cc9-e850-486a-9438-cd935b0cc4d5', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', NULL, 'sss', 0, '2025-04-18 16:22:11', '2025-04-18 16:22:11', NULL, 'direct');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `MessageRead`
--

CREATE TABLE `MessageRead` (
  `id` varchar(36) NOT NULL,
  `messageId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `MessageRead`
--

INSERT INTO `MessageRead` (`id`, `messageId`, `userId`, `createdAt`) VALUES
('0ab96e20-049a-4493-b7e7-fbc2ad818b7e', '70222cce-c94b-4700-8eb4-c92b850a505e', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 06:45:55'),
('1d16f63d-d3fb-43d0-b4ba-b37e58619e15', '67da53db-ffb4-4cdc-8a39-030852ad3146', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 02:10:09'),
('1f9eb2b2-9fa6-4d29-a1cd-a962a7d0bae4', '6034d90e-859e-40a8-8eb3-de8f38cd0457', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2025-04-24 02:06:49'),
('4e947833-725e-4026-a13d-e639d52c321f', '70222cce-c94b-4700-8eb4-c92b850a505e', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2025-04-24 06:46:10'),
('7e52cfc8-cb65-437a-b939-ab0bdd8cdd0f', '7aa2edee-ceba-41d4-a032-0f3b256340a6', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2025-04-24 02:05:50'),
('97dab1f6-d4b8-44f5-a5de-400ef8885108', '6034d90e-859e-40a8-8eb3-de8f38cd0457', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-24 06:42:53'),
('9919a1cf-f0da-4d2d-af6a-5055a3379cd0', '6034d90e-859e-40a8-8eb3-de8f38cd0457', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-24 06:21:17'),
('a790ab08-e48f-4687-9458-d13a514881e2', '70222cce-c94b-4700-8eb4-c92b850a505e', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-24 06:42:57'),
('aaba0da1-b285-4d53-b93a-d3035af88447', '6034d90e-859e-40a8-8eb3-de8f38cd0457', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 02:06:05'),
('b657c3fa-fe46-457c-bf88-17215c416ab6', '7aa2edee-ceba-41d4-a032-0f3b256340a6', 'fd783af9-b72c-4304-890f-51a864a73fbf', '2025-04-24 10:05:34'),
('e1c706c4-f42a-4f25-a85b-ba5746e82116', '6034d90e-859e-40a8-8eb3-de8f38cd0457', 'fd783af9-b72c-4304-890f-51a864a73fbf', '2025-04-24 10:05:32'),
('e3cbb674-834f-45e3-9156-8d4dc7dabaf8', '7aa2edee-ceba-41d4-a032-0f3b256340a6', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-24 02:04:32'),
('eb70d2a4-8a6b-458b-8b50-7b713f461143', '70222cce-c94b-4700-8eb4-c92b850a505e', 'fd783af9-b72c-4304-890f-51a864a73fbf', '2025-04-24 10:05:32'),
('f7745738-a9b0-4cb5-96be-92251189aef0', '67da53db-ffb4-4cdc-8a39-030852ad3146', 'fd783af9-b72c-4304-890f-51a864a73fbf', '2025-04-24 10:05:34'),
('ff0dcd94-be24-4996-95ed-e30f2ba97b86', '67da53db-ffb4-4cdc-8a39-030852ad3146', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2025-04-24 02:05:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Notification`
--

CREATE TABLE `Notification` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `isRead` tinyint(1) DEFAULT 0,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `Notification`
--

INSERT INTO `Notification` (`id`, `userId`, `title`, `message`, `type`, `isRead`, `data`, `createdAt`, `updatedAt`) VALUES
('046ce77a-3097-4ea6-981a-8f0002d33ac8', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'Join Request Accepted', 'Your request to join SFORGER as Marketing has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"b9e2e03d-6ec5-4b8e-af41-61f7df2b6e65\",\"requestId\":\"0913cbe2-ca0b-4236-8f7d-0d4350c55597\"}', '2025-04-17 20:00:32', '2025-04-23 19:00:49'),
('0f5bf392-6958-430b-be0a-ac927dc74ce9', 'fd783af9-b72c-4304-890f-51a864a73fbf', 'Join Request Accepted', 'Your request to join SFORGER as Test  has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"dcae3a2f-338e-4fbc-81af-42aca4f78543\",\"requestId\":\"76fa3162-4656-42c6-8774-a07cfba536b1\"}', '2025-04-18 23:57:00', '2025-04-24 10:07:36'),
('0fd0bc07-21cd-4cfb-86a7-dee38f1a9532', '3fe0d45e-a341-42df-94b0-5c928f3d986f', 'Join Request Accepted', 'Your request to join SFORGER sfm as sss has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"de03b03d-9bec-4a62-a80f-bf8430feeb94\",\"roleId\":\"2c983261-e69b-4978-a2a2-08e51110f6a5\",\"requestId\":\"6eaf8814-9b02-4987-b4ac-386bc9567b22\"}', '2025-04-24 02:06:32', '2025-04-24 02:06:39'),
('1a9ebb67-5c1a-4590-af23-f9118c820103', '3fe0d45e-a341-42df-94b0-5c928f3d986f', 'Join Request Accepted', 'Your request to join SFORGER as Marketing 2 has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"4f113176-113f-436c-89a9-552958ed595a\",\"requestId\":\"0d027630-aa87-4e81-ad67-a88bdc3922d1\"}', '2025-04-18 04:48:41', '2025-04-24 02:06:39'),
('2180859f-a2d1-491c-b581-4a7608f989e3', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'Join Request Accepted', 'Your request to join test community as test 1 has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"8c4d47a0-fc89-4acb-ac41-15a5ce13e459\",\"roleId\":\"d2c776d0-c71a-4377-8ba1-689b4c344143\",\"requestId\":\"b51489a8-1209-4edc-bcbb-0f7eb9c13f99\"}', '2025-04-17 19:41:34', '2025-04-24 08:19:55'),
('2201435a-e487-4739-a611-08a657c4937f', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'New Join Request', 'Sakif wants to join your startup as test 2', 'INFO', 1, '{\"startupId\":\"8c4d47a0-fc89-4acb-ac41-15a5ce13e459\",\"roleId\":\"8b2a6e0d-9491-4b3d-b88e-0c7ab937a3fe\",\"requestId\":\"b3d04abd-51f6-4aee-ad9d-96b9da4f1c6f\",\"userId\":\"91f9d88a-2f08-46e0-8c65-dc401a1a2de6\"}', '2025-04-18 09:23:28', '2025-04-23 19:00:49'),
('29fae808-c5d0-4a2b-ad1f-b552354228f6', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'Join Request Accepted', 'Your request to join SFORGER as test 2 has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"454a6cd7-6c70-4cef-bd44-342a99a025e3\",\"requestId\":\"f6a5add4-cc43-485f-9ae3-7c49b43c020c\"}', '2025-04-20 04:35:21', '2025-04-24 08:19:55'),
('5f473aa2-bb67-4eb9-9914-44d000c9a3ef', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'Join Request Accepted', 'Your request to join Affiliate DATA Test as Affiliate DATA Test has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"f5f508d2-64dd-4ea8-8f26-3a933943023e\",\"roleId\":\"d0cf9af7-16da-42a0-84b7-c8d3160fd08f\",\"requestId\":\"ea28d32a-3022-43cb-ad45-a24c62e37dca\"}', '2025-04-22 16:52:25', '2025-04-23 19:00:49'),
('65c23080-6217-4ee1-9f7b-6a1bc723760d', '6e0a2dc2-bd92-4218-900e-ea56a77b0b7b', 'Join Request Accepted', 'Your request to join SFORGER as test 2 has been accepted!', 'SUCCESS', 0, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"454a6cd7-6c70-4cef-bd44-342a99a025e3\",\"requestId\":\"7da51e71-6fb1-441a-a3b1-9a031324e96d\"}', '2025-04-20 04:35:22', '2025-04-20 04:35:22'),
('65ceb923-9589-4242-b046-d6399756083e', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'Join Request Rejected', 'Your request to join SFORGER as Marketing has been rejected.', 'INFO', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"b9e2e03d-6ec5-4b8e-af41-61f7df2b6e65\",\"requestId\":\"eec8d761-5403-4797-af8a-7c4267689651\"}', '2025-04-17 19:59:57', '2025-04-23 19:00:49'),
('83527918-a258-4cae-a044-1a31644a45ce', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'Join Request Accepted', 'Your request to join Demo as Demo1 has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"e13ff3bf-5573-428f-b1b2-00bb085b4156\",\"roleId\":\"ed9f79ad-b9b3-42f2-812e-9c77374c1778\",\"requestId\":\"24c87eed-1081-4766-b678-05e808cfed25\"}', '2025-04-18 19:58:36', '2025-04-23 19:00:49'),
('943ccae3-6568-4417-8d1b-9c6432049041', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'New Join Request', 'Ayush Gupta wants to join your startup as Marketing', 'INFO', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"b9e2e03d-6ec5-4b8e-af41-61f7df2b6e65\",\"requestId\":\"eec8d761-5403-4797-af8a-7c4267689651\",\"userId\":\"e4651879-7e2a-48ec-9ccf-519af9ac6a8c\"}', '2025-04-17 19:38:55', '2025-04-24 08:19:55'),
('9aa48833-0ac9-4653-a329-ec8ee08936f5', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'New Join Request', 'Sakif wants to join your startup as test 2', 'INFO', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"454a6cd7-6c70-4cef-bd44-342a99a025e3\",\"requestId\":\"3ba36e52-1a70-4419-8e8b-f39fa914a044\",\"userId\":\"91f9d88a-2f08-46e0-8c65-dc401a1a2de6\"}', '2025-04-19 23:07:26', '2025-04-24 08:19:55'),
('ad05fbfd-079c-4fe8-9caa-22e6a48d6bec', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'New Join Request', 'Oskar test2 wants to join your startup as Test ', 'INFO', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"dcae3a2f-338e-4fbc-81af-42aca4f78543\",\"requestId\":\"76fa3162-4656-42c6-8774-a07cfba536b1\",\"userId\":\"fd783af9-b72c-4304-890f-51a864a73fbf\"}', '2025-04-18 19:38:07', '2025-04-24 08:19:55'),
('ba5032aa-c7ee-4bde-b4ac-61d6741560c8', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'Join Request Accepted', 'Your request to join test community as test 2 has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"8c4d47a0-fc89-4acb-ac41-15a5ce13e459\",\"roleId\":\"8b2a6e0d-9491-4b3d-b88e-0c7ab937a3fe\",\"requestId\":\"b3d04abd-51f6-4aee-ad9d-96b9da4f1c6f\"}', '2025-04-18 09:24:12', '2025-04-18 09:29:03'),
('bb5f55c4-fe24-4668-ae3a-39721a4385f3', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'New Join Request', 'Oskar Konstanciak wants to join your startup as test 1', 'INFO', 1, '{\"startupId\":\"8c4d47a0-fc89-4acb-ac41-15a5ce13e459\",\"roleId\":\"d2c776d0-c71a-4377-8ba1-689b4c344143\",\"requestId\":\"b51489a8-1209-4edc-bcbb-0f7eb9c13f99\",\"userId\":\"0953f29d-d9e0-4d20-a71b-c97d34462947\"}', '2025-04-17 19:39:18', '2025-04-23 19:00:49'),
('dd50da5f-9350-4c37-8b3e-3885c78466c0', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'Join Request Accepted', 'Your request to join SFORGER as test 2 has been accepted!', 'SUCCESS', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"454a6cd7-6c70-4cef-bd44-342a99a025e3\",\"requestId\":\"3ba36e52-1a70-4419-8e8b-f39fa914a044\"}', '2025-04-19 23:07:40', '2025-04-19 23:10:18'),
('deca85ce-6663-4ac7-b3ce-63234e47d971', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'New Join Request', 'Oskar Employee 1 wants to join your startup as Marketing 2', 'INFO', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"4f113176-113f-436c-89a9-552958ed595a\",\"requestId\":\"0d027630-aa87-4e81-ad67-a88bdc3922d1\",\"userId\":\"3fe0d45e-a341-42df-94b0-5c928f3d986f\"}', '2025-04-18 04:48:24', '2025-04-24 08:19:55'),
('fa4606bb-eb18-40c4-bca0-a9b26c494aa6', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'New Join Request', 'Ayush Gupta wants to join your startup as Marketing', 'INFO', 1, '{\"startupId\":\"2073b043-d55d-4735-88c7-2714cb16d05a\",\"roleId\":\"b9e2e03d-6ec5-4b8e-af41-61f7df2b6e65\",\"requestId\":\"0913cbe2-ca0b-4236-8f7d-0d4350c55597\",\"userId\":\"e4651879-7e2a-48ec-9ccf-519af9ac6a8c\"}', '2025-04-17 20:00:14', '2025-04-24 08:19:55'),
('fb3900c4-9660-4bfa-a456-5fb54a1e6c85', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'New Join Request', 'Oskar Employee 1 wants to join your startup as sss', 'INFO', 1, '{\"startupId\":\"de03b03d-9bec-4a62-a80f-bf8430feeb94\",\"roleId\":\"2c983261-e69b-4978-a2a2-08e51110f6a5\",\"requestId\":\"6eaf8814-9b02-4987-b4ac-386bc9567b22\",\"userId\":\"3fe0d45e-a341-42df-94b0-5c928f3d986f\"}', '2025-04-24 02:05:44', '2025-04-24 08:19:55');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `PointsTransaction`
--

CREATE TABLE `PointsTransaction` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `points` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `points_transactions`
--

CREATE TABLE `points_transactions` (
  `id` varchar(36) NOT NULL,
  `points` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `private_chats`
--

CREATE TABLE `private_chats` (
  `id` varchar(36) NOT NULL,
  `user1_id` varchar(36) NOT NULL,
  `user2_id` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ProfileComment`
--

CREATE TABLE `ProfileComment` (
  `id` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `authorId` varchar(36) NOT NULL,
  `profileId` varchar(36) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `ProfileComment`
--

INSERT INTO `ProfileComment` (`id`, `content`, `authorId`, `profileId`, `createdAt`, `updatedAt`) VALUES
('44e4060a-da9d-4d35-9a62-377e19ed5a7c', 'hhgh', '0953f29d-d9e0-4d20-a71b-c97d34462947', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-20 01:54:10', '2025-04-20 01:54:10');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Role`
--

CREATE TABLE `Role` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `roleType` varchar(191) NOT NULL,
  `isOpen` tinyint(1) NOT NULL DEFAULT 1,
  `isPaid` tinyint(1) NOT NULL DEFAULT 0,
  `startupId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `Role`
--

INSERT INTO `Role` (`id`, `title`, `roleType`, `isOpen`, `isPaid`, `startupId`, `createdAt`, `updatedAt`) VALUES
('2c983261-e69b-4978-a2a2-08e51110f6a5', 'sss', 'Employee - Operations, Sales, and Marketing', 0, 0, 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '2025-04-22 23:12:08.405', '2025-04-24 02:06:32.933'),
('b58b41f2-b9e0-4ef4-b506-782c0c0849c6', 'dddd', 'Employee - Tech and Design', 1, 0, 'ede3a25f-5951-4a7f-b6ca-85341ad03c96', '2025-04-22 23:13:43.984', '2025-04-22 23:13:43.984'),
('d0cf9af7-16da-42a0-84b7-c8d3160fd08f', 'Affiliate DATA Test', 'Manager', 0, 0, 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '2025-04-22 14:35:20.966', '2025-04-22 16:52:25.442');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

CREATE TABLE `roles` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `role_type` varchar(50) NOT NULL,
  `is_open` tinyint(1) DEFAULT 1,
  `is_paid` tinyint(1) DEFAULT 0,
  `startup_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `SFCollabUsers`
--

CREATE TABLE `SFCollabUsers` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sfmanagersId` varchar(36) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Skill`
--

CREATE TABLE `Skill` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `level` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `Skill`
--

INSERT INTO `Skill` (`id`, `userId`, `name`, `level`, `createdAt`, `updatedAt`) VALUES
('1bcbea3d-8a80-4a7b-98b3-38412ee855bc', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'dddddddd', '1', '2025-04-18 23:29:49', '2025-04-18 23:29:49'),
('27bb0cba-b775-40c1-b763-ad1fa419becc', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'test', '1', '2025-04-19 09:26:17', '2025-04-19 09:26:17'),
('5a81e1c9-157f-416d-b698-6eb8e97ddeac', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'JavaScript', '1', '2025-04-22 14:54:04', '2025-04-22 14:54:04'),
('65e0b2db-132f-45bd-8d59-a277d0c8c264', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'Test', '1', '2025-04-19 09:26:17', '2025-04-19 09:26:17');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Startup`
--

CREATE TABLE `Startup` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `details` varchar(191) NOT NULL,
  `stage` varchar(191) NOT NULL DEFAULT 'Idea',
  `logo` varchar(191) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `banner` varchar(191) DEFAULT NULL,
  `banner_url` varchar(255) DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `industry` varchar(191) DEFAULT NULL,
  `ownerId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `website` varchar(191) DEFAULT NULL,
  `views` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `Startup`
--

INSERT INTO `Startup` (`id`, `name`, `details`, `stage`, `logo`, `logo_url`, `banner`, `banner_url`, `location`, `industry`, `ownerId`, `createdAt`, `updatedAt`, `website`, `views`) VALUES
('65108bb2-a42f-4147-8b7d-960cfd9f1b83', 'Test', 'Test', 'Idea', NULL, NULL, NULL, NULL, 'Test', 'Technology', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-22 13:39:49.557', '2025-04-22 13:39:49.557', NULL, 0),
('ada3613b-b62c-4819-93c5-d370f5e58476', 'text', 'text', 'Idea', NULL, NULL, NULL, NULL, 'text', 'Healthcare', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-22 13:56:24.544', '2025-04-22 13:56:24.544', NULL, 0),
('c17166ba-bfe6-45c2-aa4b-e86ab75c20a8', 'test community', 'test', 'Idea', NULL, NULL, NULL, NULL, 'test', 'Healthcare', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-22 14:08:18.197', '2025-04-22 14:08:18.197', NULL, 0),
('c2dd37c1-89b6-49b4-89aa-d41aacd88c06', 'Test', 'Test test test', 'Idea', NULL, NULL, NULL, NULL, 'Poland', 'Healthcare', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-22 13:27:46.181', '2025-04-22 13:27:46.181', NULL, 0),
('de03b03d-9bec-4a62-a80f-bf8430feeb94', 'SFORGER sfm', 'sss', 'Idea', '/uploads/logo-1745356327570-87032723.jpg', NULL, '/uploads/banner-1745356327570-333287244.jpg', NULL, 'Polska', 'Technology', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 23:12:08.403', '2025-04-22 23:12:08.403', NULL, 1),
('ede3a25f-5951-4a7f-b6ca-85341ad03c96', 'SFORGER sfc', 'tetrstwddsss', 'Idea', NULL, NULL, NULL, NULL, 'Poland', 'Technology', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-22 23:13:43.982', '2025-04-22 23:13:43.982', NULL, 1),
('f5f508d2-64dd-4ea8-8f26-3a933943023e', 'Affiliate DATA Test', 'Affiliate DATA Test', 'Idea', NULL, NULL, NULL, NULL, 'Affiliate DATA Test', 'Healthcare', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-22 14:35:20.962', '2025-04-22 14:35:20.962', NULL, 3);

--
-- Wyzwalacze `Startup`
--
DELIMITER $$
CREATE TRIGGER `after_startup_insert` AFTER INSERT ON `Startup` FOR EACH ROW BEGIN
        DECLARE groupId VARCHAR(36);
        
        -- Generate UUID for new group
        SET groupId = UUID();
        
        -- Create group chat for the new startup
        INSERT INTO chat_groups (
          id, 
          name, 
          description, 
          startup_id, 
          created_by, 
          created_at
        ) VALUES (
          groupId,
          CONCAT(NEW.name, ' Group Chat'),
          CONCAT('Group chat for ', NEW.name),
          NEW.id,
          NEW.ownerId,
          NOW()
        );
        
        -- Add owner to the group chat
        INSERT INTO group_members (
          id,
          group_id,
          user_id,
          is_admin,
          joined_at
        ) VALUES (
          UUID(),
          groupId,
          NEW.ownerId,
          TRUE,
          NOW()
        );
      END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `startups`
--

CREATE TABLE `startups` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `owner_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `views` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `startup_members`
--

CREATE TABLE `startup_members` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `startupId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `startup_members`
--

INSERT INTO `startup_members` (`id`, `userId`, `startupId`, `createdAt`, `updatedAt`) VALUES
('1876938f-a3cf-4205-a448-95df02709caf', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2073b043-d55d-4735-88c7-2714cb16d05a', '2025-04-17 19:38:19.229', '2025-04-17 19:38:19.229'),
('634551f9-61e3-48c3-8549-44bd8e391189', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '8c4d47a0-fc89-4acb-ac41-15a5ce13e459', '2025-04-17 19:38:36.038', '2025-04-17 19:38:36.038'),
('72212aac-db6f-45a7-b8ad-b7fd91c6669a', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '473fb10e-3665-4ee2-ab25-601eaccc9776', '2025-04-22 10:35:47.309', '2025-04-22 10:35:47.309'),
('74fffb1c-c6ff-46d4-bf7c-e0811dd24d23', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '9e3164bc-6652-4b7d-9896-1464643722c7', '2025-04-18 20:25:39.969', '2025-04-18 20:25:39.969'),
('8a831cb9-9a21-4bcf-ac25-39cd76803013', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'e13ff3bf-5573-428f-b1b2-00bb085b4156', '2025-04-18 19:17:50.452', '2025-04-18 19:17:50.452'),
('8d9623af-1c9d-11f0-9438-bc2411fc335d', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2073b043-d55d-4735-88c7-2714cb16d05a', '2025-04-18 23:39:05.000', '2025-04-18 23:39:05.000'),
('9c49e878-74b6-4f66-aaa2-66bec07bfcc4', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '43fdb253-9ae7-4fbb-b576-dc61462586d3', '2025-04-18 20:24:58.993', '2025-04-18 20:24:58.993'),
('a1cafbae-1c9d-11f0-9438-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', '9606fb16-1c9d-11f0-9438-bc2411fc335d', '2025-04-18 23:39:39.000', '2025-04-18 23:39:39.000'),
('a1cafdae-1c9d-11f0-9438-bc2411fc335d', 'fd783af9-b72c-4304-890f-51a864a73fbf', '9606fb16-1c9d-11f0-9438-bc2411fc335d', '2025-04-18 23:39:39.000', '2025-04-18 23:39:39.000'),
('a1cafddf-1c9d-11f0-9438-bc2411fc335d', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '9606fb16-1c9d-11f0-9438-bc2411fc335d', '2025-04-18 23:39:39.000', '2025-04-18 23:39:39.000'),
('c25dd96b-b5a1-4160-904f-b0b520ae248e', '58bb769e-92ac-4524-a530-977b3cb874f1', '36879c6e-1c61-455b-84b2-54527a177775', '2025-04-22 09:37:02.633', '2025-04-22 09:37:02.633'),
('e4be380f-1c9c-11f0-9438-bc2411fc335d', 'fd783af9-b72c-4304-890f-51a864a73fbf', '2073b043-d55d-4735-88c7-2714cb16d05a', '2025-04-18 23:34:22.000', '2025-04-18 23:34:22.000'),
('e8b7cc35-d617-4f13-a305-dda2e420ffb8', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '0c8fdc1d-62d0-4755-a3cb-85684ecb7c0e', '2025-04-18 09:05:06.666', '2025-04-18 09:05:06.666'),
('f4325028-ffca-42a4-8643-0d8136afa8d3', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '2025-04-22 23:12:08.405', '2025-04-22 23:12:08.405');

--
-- Wyzwalacze `startup_members`
--
DELIMITER $$
CREATE TRIGGER `after_startup_member_insert` AFTER INSERT ON `startup_members` FOR EACH ROW BEGIN
        DECLARE groupId VARCHAR(36);
        DECLARE startupName VARCHAR(255);
        
        -- Check if startup group exists
        SELECT id INTO groupId FROM chat_groups 
        WHERE startup_id = NEW.startupId 
        LIMIT 1;
        
        -- If startup group doesn't exist, create one
        IF groupId IS NULL THEN
          -- Get startup name
          SELECT name INTO startupName FROM Startup 
          WHERE id = NEW.startupId;
          
          -- Generate UUID for new group
          SET groupId = UUID();
          
          -- Create group
          INSERT INTO chat_groups (
            id, 
            name, 
            description, 
            startup_id, 
            created_by, 
            created_at
          ) VALUES (
            groupId,
            CONCAT(startupName, ' Group Chat'),
            CONCAT('Group chat for ', startupName),
            NEW.startupId,
            NEW.userId,
            NOW()
          );
        END IF;
        
        -- Add user to group if not already a member
        IF NOT EXISTS (
          SELECT 1 FROM group_members 
          WHERE group_id = groupId AND user_id = NEW.userId
        ) THEN
          INSERT INTO group_members (
            id,
            group_id,
            user_id,
            is_admin,
            joined_at
          ) VALUES (
            UUID(),
            groupId,
            NEW.userId,
            FALSE,
            NOW()
          );
        END IF;
      END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `SystemRoles`
--

CREATE TABLE `SystemRoles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Task`
--

CREATE TABLE `Task` (
  `id` varchar(191) NOT NULL,
  `isMeeting` tinyint(1) NOT NULL DEFAULT 0,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `meetingLink` varchar(255) DEFAULT NULL,
  `statusId` varchar(191) NOT NULL,
  `priority` varchar(191) NOT NULL,
  `dueDate` datetime(3) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `startupId` varchar(191) NOT NULL,
  `createdBy` varchar(191) NOT NULL,
  `isTimerRunning` tinyint(1) NOT NULL DEFAULT 0,
  `timerStartedAt` datetime(3) DEFAULT NULL,
  `totalTimeSpent` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `isFreelance` tinyint(1) NOT NULL DEFAULT 0,
  `estimatedHours` decimal(8,2) NOT NULL DEFAULT 0.00,
  `hourlyRate` decimal(8,2) NOT NULL DEFAULT 0.00,
  `urgencyLevel` enum('CRITICAL','HIGH','MEDIUM','LOW') NOT NULL DEFAULT 'MEDIUM',
  `basePoints` int(11) NOT NULL DEFAULT 0,
  `pointsMultiplier` decimal(3,2) NOT NULL DEFAULT 1.00,
  `totalPoints` int(11) NOT NULL DEFAULT 0,
  `freelancerId` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `Task`
--

INSERT INTO `Task` (`id`, `isMeeting`, `title`, `description`, `meetingLink`, `statusId`, `priority`, `dueDate`, `startTime`, `endTime`, `startupId`, `createdBy`, `isTimerRunning`, `timerStartedAt`, `totalTimeSpent`, `createdAt`, `updatedAt`, `isFreelance`, `estimatedHours`, `hourlyRate`, `urgencyLevel`, `basePoints`, `pointsMultiplier`, `totalPoints`, `freelancerId`) VALUES
('409538ec-115c-4164-87b9-fbba2411f507', 0, 'xxxxxx', 'xxxxxxxxxxxxxxx', NULL, 'bc835f07-4a58-4794-bd08-b648faf48b22', 'high', '2025-04-26 02:00:00.000', NULL, NULL, 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '0953f29d-d9e0-4d20-a71b-c97d34462947', 0, NULL, 0, '2025-04-23 01:05:26.291', '2025-04-23 01:05:28.221', 1, 3.00, 1.00, 'HIGH', 3, 1.67, 5, NULL),
('5a379bd0-c2f2-43a9-b22f-7a5b3c265950', 0, 'Trail', 'trial', NULL, '15bbc5e7-6cb4-4239-bb81-45ba7a61a32a', 'low', '2025-04-25 02:00:00.000', NULL, NULL, 'f5f508d2-64dd-4ea8-8f26-3a933943023e', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 0, NULL, 0, '2025-04-22 20:06:54.721', '2025-04-22 20:06:54.721', 0, 0.00, 0.00, 'MEDIUM', 0, 1.00, 0, NULL),
('78db3b08-6c57-4eb8-b0ef-7c656a192a12', 0, 'Meeting: xxxxxxxxxxxxxxx', 'xxxxxxxxx\nMeeting Link: https://sfmanagers.com/', NULL, '0d12729e-a2d9-45f8-95af-9d28aee14aae', 'medium', '2025-05-08 08:27:00.000', NULL, NULL, 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '0953f29d-d9e0-4d20-a71b-c97d34462947', 0, NULL, 0, '2025-04-23 09:27:53.427', '2025-04-23 09:27:53.427', 0, 0.00, 0.00, 'MEDIUM', 0, 1.00, 0, NULL),
('d6e6e7e3-d5db-41a5-a487-fe3663ef5cfa', 0, 'xxxxxxxxx', 'xxxxxxxxxxxxx', NULL, '0d12729e-a2d9-45f8-95af-9d28aee14aae', 'low', '2025-05-07 02:00:00.000', NULL, NULL, 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '0953f29d-d9e0-4d20-a71b-c97d34462947', 0, NULL, 0, '2025-04-23 09:25:22.893', '2025-04-23 09:25:22.893', 1, 50.00, 10.00, 'CRITICAL', 500, 2.00, 1000, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `TaskAssignee`
--

CREATE TABLE `TaskAssignee` (
  `id` varchar(191) NOT NULL,
  `taskId` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `TaskAssignee`
--

INSERT INTO `TaskAssignee` (`id`, `taskId`, `userId`, `createdAt`, `updatedAt`) VALUES
('12d9f62f-2eb0-46c4-991b-23d93eb84bbb', '2bdc1abc-8a47-4e7f-9041-528cd77c8d0c', '58bb769e-92ac-4524-a530-977b3cb874f1', '2025-04-22 09:38:20.085', '2025-04-22 09:38:20.085'),
('4f121d0d-6018-4142-ab55-dd79d08d5be0', '78db3b08-6c57-4eb8-b0ef-7c656a192a12', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-23 09:27:53.427', '2025-04-23 09:27:53.427'),
('5057e3cc-206b-4e74-9921-ce1903ce22b3', '2baa573e-59fb-4c63-ae29-46d2e5a72bd8', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-18 21:18:19.516', '2025-04-18 21:18:19.516'),
('7e6be45f-870f-400b-8dff-c8ac4dcdc514', 'ad95f9bf-6c42-419f-96b2-3e55fa597ed4', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', '2025-04-18 21:12:58.717', '2025-04-18 21:12:58.717'),
('caf718bd-20cf-449b-a9a6-d157441c2d43', '5a379bd0-c2f2-43a9-b22f-7a5b3c265950', '91f9d88a-2f08-46e0-8c65-dc401a1a2de6', '2025-04-22 20:06:54.722', '2025-04-22 20:06:54.722');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tasks`
--

CREATE TABLE `tasks` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status_id` varchar(36) NOT NULL,
  `priority` varchar(20) NOT NULL,
  `due_date` timestamp NULL DEFAULT NULL,
  `startup_id` varchar(36) NOT NULL,
  `created_by` varchar(36) NOT NULL,
  `is_timer_running` tinyint(1) DEFAULT 0,
  `timer_started_at` timestamp NULL DEFAULT NULL,
  `total_time_spent` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `TaskStatus`
--

CREATE TABLE `TaskStatus` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `startupId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `TaskStatus`
--

INSERT INTO `TaskStatus` (`id`, `name`, `startupId`, `createdAt`, `updatedAt`) VALUES
('0514e603-27be-42fd-92ed-b517356c360e', 'Done', '8c4d47a0-fc89-4acb-ac41-15a5ce13e459', '2025-04-17 21:19:45.780', '2025-04-17 21:19:45.780'),
('0d12729e-a2d9-45f8-95af-9d28aee14aae', 'To Do', 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '2025-04-22 23:12:24.101', '2025-04-22 23:12:24.101'),
('15bbc5e7-6cb4-4239-bb81-45ba7a61a32a', 'To Do', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '2025-04-22 20:06:30.743', '2025-04-22 20:06:30.743'),
('191930fc-28d5-45bf-9f59-c0c89106e19b', 'In Progress', '2073b043-d55d-4735-88c7-2714cb16d05a', '2025-04-17 20:00:36.529', '2025-04-17 20:00:36.529'),
('22cd96b0-e21c-4f0a-a7c3-17faaf49d5c8', 'To Do', '8c4d47a0-fc89-4acb-ac41-15a5ce13e459', '2025-04-17 21:19:45.779', '2025-04-17 21:19:45.779'),
('35a69fa4-9c29-44f0-9480-3fce1dfb7ab6', 'In Progress', '36879c6e-1c61-455b-84b2-54527a177775', '2025-04-22 09:37:31.458', '2025-04-22 09:37:31.458'),
('379cdbb2-d42a-4cda-bd52-a481bb77ddb9', 'To Do', '36879c6e-1c61-455b-84b2-54527a177775', '2025-04-22 09:37:31.457', '2025-04-22 09:37:31.457'),
('5af42f7a-8e57-445c-853f-cc417c68f8fd', 'To Do', 'e13ff3bf-5573-428f-b1b2-00bb085b4156', '2025-04-19 23:05:15.431', '2025-04-19 23:05:15.431'),
('7d161606-5099-4c1a-b77d-8bc731980f39', 'Done', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '2025-04-22 20:06:30.746', '2025-04-22 20:06:30.746'),
('856d0484-f634-4f5e-a855-b3d2830a86c8', 'In Progress', '0c8fdc1d-62d0-4755-a3cb-85684ecb7c0e', '2025-04-18 09:10:56.023', '2025-04-18 09:10:56.023'),
('9970d094-7319-4505-9425-fb832d0b5b5a', 'Done', '36879c6e-1c61-455b-84b2-54527a177775', '2025-04-22 09:37:31.458', '2025-04-22 09:37:31.458'),
('bae12320-044b-4a99-80a9-b33695b93be6', 'Done', 'e13ff3bf-5573-428f-b1b2-00bb085b4156', '2025-04-19 23:05:15.431', '2025-04-19 23:05:15.431'),
('bc835f07-4a58-4794-bd08-b648faf48b22', 'In Progress', 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '2025-04-22 23:12:24.104', '2025-04-22 23:12:24.104'),
('c8316640-1656-4404-a7d4-6160f965b83c', 'Done', 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '2025-04-22 23:12:24.104', '2025-04-22 23:12:24.104'),
('d29df2f5-ab26-43c3-a4b5-dbaafb3f6ff8', 'In Progress', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '2025-04-22 20:06:30.745', '2025-04-22 20:06:30.745'),
('d86160f9-b4e2-4388-a4ce-4e26f5664fc0', 'In Progress', 'e13ff3bf-5573-428f-b1b2-00bb085b4156', '2025-04-19 23:05:15.431', '2025-04-19 23:05:15.431'),
('df7fe6a3-7ae9-4cf7-b937-fc6ccd2e26d4', 'In Progress', '8c4d47a0-fc89-4acb-ac41-15a5ce13e459', '2025-04-17 21:19:45.780', '2025-04-17 21:19:45.780'),
('e03651fa-8638-4cc3-91b2-b913d7b7e162', 'Done', '0c8fdc1d-62d0-4755-a3cb-85684ecb7c0e', '2025-04-18 09:10:56.024', '2025-04-18 09:10:56.024'),
('ea7b3261-a8a8-43d6-85d4-49f1d727a263', 'To Do', '2073b043-d55d-4735-88c7-2714cb16d05a', '2025-04-17 20:00:36.527', '2025-04-17 20:00:36.527'),
('f6ddaa71-3e81-4114-8037-fe07ce10e090', 'To Do', '0c8fdc1d-62d0-4755-a3cb-85684ecb7c0e', '2025-04-18 09:10:56.022', '2025-04-18 09:10:56.022'),
('fa6623e0-a79f-48cc-9050-801767112338', 'Done', '2073b043-d55d-4735-88c7-2714cb16d05a', '2025-04-17 20:00:36.529', '2025-04-17 20:00:36.529');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `task_statuses`
--

CREATE TABLE `task_statuses` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `startup_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `task_statuses`
--

INSERT INTO `task_statuses` (`id`, `name`, `startup_id`, `created_at`, `updated_at`) VALUES
('3e18e665-cf7b-4f80-b87b-1386490aa256', 'completed', 'ede3a25f-5951-4a7f-b6ca-85341ad03c96', '2025-04-22 21:13:43', '2025-04-22 21:13:43'),
('3fd5ce8b-1017-4f24-bffc-0e5eb17a5d98', 'pending', 'ede3a25f-5951-4a7f-b6ca-85341ad03c96', '2025-04-22 21:13:43', '2025-04-22 21:13:43'),
('45939d41-f4c4-4694-a027-7aa6ead0ea09', 'pending', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '2025-04-22 12:35:20', '2025-04-22 12:35:20'),
('49178f86-1bb9-44d8-8aa0-4ad8540bf432', 'completed', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '2025-04-22 12:35:20', '2025-04-22 12:35:20'),
('6ef484ad-ca74-4d71-9efb-73cc26f1df58', 'in-progress', 'ede3a25f-5951-4a7f-b6ca-85341ad03c96', '2025-04-22 21:13:43', '2025-04-22 21:13:43'),
('d9b058b6-eb1e-4c2e-a799-e70884b5df1c', 'in-progress', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '2025-04-22 12:35:20', '2025-04-22 12:35:20');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `test_friends`
--

CREATE TABLE `test_friends` (
  `id` int(11) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `friend_name` varchar(255) NOT NULL,
  `friend_email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `test_friends`
--

INSERT INTO `test_friends` (`id`, `user_id`, `friend_name`, `friend_email`, `created_at`) VALUES
(1, 'dbf982f7-a8c3-4c1c-85b6-2bab4f6ade16', 'Oskar Test', 'oskarrro777@gmail.com', '2025-04-24 04:41:51'),
(2, '04045461-f1ce-4eb3-b792-f3dec5509882', 'Oskar Konstanciak', 'oskarkonstanciakpl@hotmail.com', '2025-04-24 04:41:51');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `TimeTrackingLog`
--

CREATE TABLE `TimeTrackingLog` (
  `id` varchar(191) NOT NULL,
  `taskId` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `startTime` datetime(3) NOT NULL,
  `endTime` datetime(3) DEFAULT NULL,
  `duration` int(11) NOT NULL DEFAULT 0,
  `note` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `TimeTrackingLog`
--

INSERT INTO `TimeTrackingLog` (`id`, `taskId`, `userId`, `startTime`, `endTime`, `duration`, `note`, `createdAt`, `updatedAt`) VALUES
('453129ac-0536-42c4-acfe-25cdb3fb5a12', 'de3143f5-54db-4bbe-8b0b-80d84c9ed9c8', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-18 00:52:26.745', '2025-04-18 00:52:30.402', 3, 'Timer stopped manually', '2025-04-18 00:52:30.402', '2025-04-18 00:52:30.402');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `User`
--

CREATE TABLE `User` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` int(11) DEFAULT 0,
  `level` int(11) DEFAULT 1,
  `headline` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `linkedinUrl` varchar(255) DEFAULT NULL,
  `githubUrl` varchar(255) DEFAULT NULL,
  `portfolio` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `sfcollabId` varchar(36) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hourlyRate` varchar(50) DEFAULT NULL,
  `availability` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `User`
--

INSERT INTO `User` (`id`, `name`, `email`, `password`, `points`, `level`, `headline`, `bio`, `location`, `profileImage`, `linkedinUrl`, `githubUrl`, `portfolio`, `phone`, `sfcollabId`, `createdAt`, `updatedAt`, `hourlyRate`, `availability`) VALUES
('0953f29d-d9e0-4d20-a71b-c97d34462947', 'Oskar Konstanciak', 'oskarkonstanciakpl@hotmail.com', '$2b$10$khRSe8S.pj4XZPP3oymVl.km1m1cMAJr9fcusexkasoOQ/CVcnUV.', 0, 1, 'Be water, my friend...', 'Success Framework Founder', 'Poland', '/uploads/profiles/profile-1745092144802-901236615.jpg', '', '', 'www.sforger.com', '+48 507351830', NULL, '2025-04-17 19:37:20', '2025-04-20 01:09:51', '$50/hr', 'Part-time (20hrs/week)'),
('1167cc74-8515-4434-9ee5-4c605f5145c8', 'upendra ', 'reddyupendra696@gmail.com', '$2b$10$8RbDZWLjaVvWOkXRlnCtK.gPeGAnUq/yHJ6e88Z9JiHtGi2WwQu6q', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-20 06:04:35', '2025-04-20 06:04:35', NULL, NULL),
('30659612-84db-47b5-be95-fdd49a89950b', 'test 3', 'test3@gmail.com', '$2b$10$Azt9fq4mJ5gvpk83hD8wP.gz29sXOwLiaZM4PN1hp8N9.KXMRUZpW', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-21 20:12:40', '2025-04-21 20:12:40', NULL, NULL),
('3fe0d45e-a341-42df-94b0-5c928f3d986f', 'Oskar Employee 1', 'oskarrro777@gmail.com', '$2b$10$R.6GJ2hy5NtBwL7tmPXkVOIVhWlS5ZrWRu/chsYVxYlld8eFgONKu', 0, 1, '', '', '', '/uploads/profiles/profile-1744986488474-628134621.jpg', '', '', '', '', NULL, '2025-04-18 04:47:01', '2025-04-20 02:53:06', '$75/hr', 'Weekends only'),
('48efb3e0-41d1-4696-88f5-0b85dc3b833f', 'Tanmay', 'tanmayvarma123@gmail.com', '$2b$10$W0AdJ/dDcXgiNVA5d5zFqOlmCGe9y20ZjGF7/CvGHZE3gzdevMUVi', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-22 10:14:28', '2025-04-22 10:14:28', NULL, NULL),
('58bb769e-92ac-4524-a530-977b3cb874f1', 'asad', 'asad@test.com', '$2b$10$nA9LL9xK1yeYb.YxtmRLFe/5mp1x0fm8ygZZezEBdVBUiQHUuuW0G', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-22 09:22:53', '2025-04-22 09:22:53', NULL, NULL),
('6195dc3c-a2bd-448e-bdfc-85489d28233d', 'shafeeq hamza', 'qstrljtpqsfs@gmail.com', '$2b$10$YdLHb7OmCsraN.GwMXc.cOkvxifChA4zOO0N41i6.yvxTpz29iY/6', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-22 11:02:18', '2025-04-22 11:02:18', NULL, NULL),
('6e0a2dc2-bd92-4218-900e-ea56a77b0b7b', 'dsadsaasd', 'fgwsrwsrgrsfgfwrfwe@hotmail.com', '$2b$10$C7yJYossMKLnh6ZOPmf6kuCorFI3zRv.0.Rdb1WyEeij5uqoK2R5y', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-19 00:28:13', '2025-04-19 00:28:13', NULL, NULL),
('79922d54-e26e-4391-8141-143c2e540a1a', 'Juman ', 'jumankalita967@gmail.com', '$2b$10$QXbv2ABWONs3skjklAxtx.AjsxOLyFnAy6LTPL6pglU7UrWC1.gny', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-24 15:17:55', '2025-04-24 15:17:55', NULL, NULL),
('8ef26d1c-ae99-40a8-b07f-c900121ac9d4', 'Tyler', 'tyler.c.hepiparaha@gmail.com', '$2b$10$3UfQ9CibEEWYrX99LB8gLee6xSiNEpjYmfsixCn2atzNhkhPiDzlW', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-20 04:52:32', '2025-04-20 04:52:32', NULL, NULL),
('91f9d88a-2f08-46e0-8c65-dc401a1a2de6', 'Sakif', 'sakifhussain33@gmail.com', '$2b$10$8WSJWESbxBmYJg7S1H3ueuYBUoOStgbjoco3Zpu/abTMI5V183Hnq', 0, 1, 'Member', 'blab;a b;a b;a', 'Bangladesh', NULL, '', '', '', '', NULL, '2025-04-18 09:23:01', '2025-04-22 14:54:20', '5', 'FullTime'),
('9a48592d-ad7b-4b3e-97a1-0f09d79098ee', 'xxxxxxxxxx', 'xxxxxxxsrfdwsf454fvrsedfvds4@gmail.com', '$2b$10$sZh9lG5i/uX7RzUqSr/3s.hYLclVxx.RPomgPswBmDFbS/bIHNjMm', 0, 1, 'Member', '', 'dddddddddddd', NULL, '', '', '', '', NULL, '2025-04-22 00:19:18', '2025-04-22 00:35:53', '', ''),
('cf7a9c53-15d2-4dac-be3c-3a2660196b6e', 'Tanmay', 'tanmayvarma65@gmail.com', '$2b$10$jrzIKEuCn7Bd/BA.YvDyuua43101xZQeTAyjQiAWrdL5eZcBh0UZO', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-22 07:51:55', '2025-04-22 07:51:55', NULL, NULL),
('e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'Ayush Gupta', 'trial@sfm.com', '$2b$10$PKu.IGWp8AUFB9zfVnyLuOqKdOC0W.KqaHRgBNAJQL0OlAeldXRQm', 0, 1, 'Test', 'Test', 'India', NULL, '', '', '', '+917409726481', NULL, '2025-04-17 19:37:13', '2025-04-19 09:26:08', NULL, NULL),
('f3dfaa3f-c7ee-401f-a3cc-968a9ea42714', 'TanmayVrama121212', 'tanmayvarma66@gmail.com', '$2b$10$1nR2KzEtS8CBP5pIAjikTupavX/GqNccQXk3dCA3MzHElEFTZDETm', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-22 08:39:09', '2025-04-22 08:39:09', NULL, NULL),
('f60e934e-6b0b-434e-b289-9d6304f7c256', 'Amey Shiwal', 'ameyshiwal3492@gmail.com', '$2b$10$WPmbDI0A68hIMeuvbzayE.IgFFevQAAtbAFHkvgNpHMTHyZU7YYke', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-17 23:02:01', '2025-04-17 23:02:01', NULL, NULL),
('fd783af9-b72c-4304-890f-51a864a73fbf', 'Oskar test2', 'oskarrro7777@gmail.com', '$2b$10$enbV8O/1S1E2rvgE5W32RuetkWiQaZZDTSL0yk6qOv9OlqonieTNW', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-18 19:36:18', '2025-04-18 19:36:18', NULL, NULL),
('test-user-id', 'Test User', 'test@example.com', 'password123', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-20 03:50:14', '2025-04-20 03:50:14', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserEducation`
--

CREATE TABLE `UserEducation` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `school` varchar(255) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `field` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserExperience`
--

CREATE TABLE `UserExperience` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `company` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserFollower`
--

CREATE TABLE `UserFollower` (
  `id` varchar(36) NOT NULL,
  `followerId` varchar(36) NOT NULL,
  `followingId` varchar(36) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `UserFollower`
--

INSERT INTO `UserFollower` (`id`, `followerId`, `followingId`, `createdAt`) VALUES
('f4872778-1d81-11f0-9438-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2025-04-20 02:54:03'),
('f487352d-1d81-11f0-9438-bc2411fc335d', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', '2025-04-20 02:54:03');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserLanguage`
--

CREATE TABLE `UserLanguage` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `proficiency` enum('basic','conversational','fluent','native') DEFAULT 'fluent',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `UserLanguage`
--

INSERT INTO `UserLanguage` (`id`, `userId`, `name`, `proficiency`, `createdAt`) VALUES
('f4875fec-1d81-11f0-9438-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'English', 'native', '2025-04-20 00:54:03'),
('f487608c-1d81-11f0-9438-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'Spanish', 'fluent', '2025-04-20 00:54:03'),
('f4876e58-1d81-11f0-9438-bc2411fc335d', '3fe0d45e-a341-42df-94b0-5c928f3d986f', 'English', 'native', '2025-04-20 00:54:03'),
('f4876ed9-1d81-11f0-9438-bc2411fc335d', '3fe0d45e-a341-42df-94b0-5c928f3d986f', 'French', 'conversational', '2025-04-20 00:54:03');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserPointsLog`
--

CREATE TABLE `UserPointsLog` (
  `id` int(11) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `action_key` varchar(100) NOT NULL,
  `points_awarded` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserRating`
--

CREATE TABLE `UserRating` (
  `id` varchar(36) NOT NULL,
  `raterId` varchar(36) NOT NULL,
  `ratedUserId` varchar(36) NOT NULL,
  `rating` decimal(3,2) NOT NULL,
  `comment` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `UserRating`
--

INSERT INTO `UserRating` (`id`, `raterId`, `ratedUserId`, `rating`, `comment`, `createdAt`, `updatedAt`) VALUES
('f4874511-1d81-11f0-9438-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', '3fe0d45e-a341-42df-94b0-5c928f3d986f', 4.50, 'Great collaborator!', '2025-04-20 00:54:03', '2025-04-20 00:54:03'),
('f4875234-1d81-11f0-9438-bc2411fc335d', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '0953f29d-d9e0-4d20-a71b-c97d34462947', 5.00, 'Excellent work ethic', '2025-04-20 00:54:03', '2025-04-20 00:54:03');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserRole`
--

CREATE TABLE `UserRole` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `roleId` varchar(191) NOT NULL,
  `startupId` varchar(191) NOT NULL,
  `joinedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `UserRole`
--

INSERT INTO `UserRole` (`id`, `userId`, `roleId`, `startupId`, `joinedAt`, `createdAt`, `updatedAt`) VALUES
('e521c4e4-48fb-4192-bb21-12c9792ad9c3', '3fe0d45e-a341-42df-94b0-5c928f3d986f', '2c983261-e69b-4978-a2a2-08e51110f6a5', 'de03b03d-9bec-4a62-a80f-bf8430feeb94', '2025-04-24 02:06:32.935', '2025-04-24 02:06:32.934', '2025-04-24 02:06:32.934'),
('f16e6f8a-54e3-45eb-8749-dd574f455ce6', 'e4651879-7e2a-48ec-9ccf-519af9ac6a8c', 'd0cf9af7-16da-42a0-84b7-c8d3160fd08f', 'f5f508d2-64dd-4ea8-8f26-3a933943023e', '2025-04-22 16:52:25.443', '2025-04-22 16:52:25.443', '2025-04-22 16:52:25.443');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `role` varchar(50) DEFAULT 'user',
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `role`, `updated_at`) VALUES
('04045461-f1ce-4eb3-b792-f3dec5509882', 'Oskar Test', 'oskarrro777@gmail.com', '$2b$10$84.hpTcrGBvWO0KISdNJQ./Sax8VQZSe2u/./JWqdGmErcMV.ezVW', '2025-04-24 02:42:33', 'user', '0000-00-00 00:00:00'),
('dbf982f7-a8c3-4c1c-85b6-2bab4f6ade16', 'Oskar Konstanciak', 'oskarkonstanciakpl@hotmail.com', '$2b$10$ee0umhlo8p5QXk6.TJ/7iuAgkHxVhSr7ECgZueGE57va3vZWTLxSS', '2025-04-24 02:42:33', 'user', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserService`
--

CREATE TABLE `UserService` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Zrzut danych tabeli `UserService`
--

INSERT INTO `UserService` (`id`, `userId`, `name`, `description`, `createdAt`) VALUES
('f4877b9c-1d81-11f0-9438-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'Web Development', 'Full stack web development with React and Node.js', '2025-04-20 00:54:03'),
('f4877c34-1d81-11f0-9438-bc2411fc335d', '0953f29d-d9e0-4d20-a71b-c97d34462947', 'Mobile App Development', 'React Native app development for iOS and Android', '2025-04-20 00:54:03'),
('f48788cc-1d81-11f0-9438-bc2411fc335d', '3fe0d45e-a341-42df-94b0-5c928f3d986f', 'UI/UX Design', 'User interface and experience design for web and mobile', '2025-04-20 00:54:03');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserSkill`
--

CREATE TABLE `UserSkill` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `level` int(11) DEFAULT NULL CHECK (`level` >= 1 and `level` <= 5),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `UserSystemRoles`
--

CREATE TABLE `UserSystemRoles` (
  `id` int(11) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vote_type` enum('upvote','downvote') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `_UserRoles`
--

CREATE TABLE `_UserRoles` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indeksy dla zrzutów tabel
--

