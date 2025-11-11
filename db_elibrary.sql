-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 11, 2025 at 06:00 PM
-- Server version: 8.0.44
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_elibrary`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `description`, `image`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 'Buku Testing 1', 'DASAR-DASAR AKUNTANSI KEUANGAN &amp; LEMBAGA Vol. SMK/MAK Kelas X (K-MERDEKA REVISI)', 'uploads/vldcvzeDoRKg7GBOuUQDK1ZsCLz60NTVUftSiJlM.png', 1, '2025-11-11 01:32:46', '2025-11-11 01:32:46'),
(4, 'Buku Testing 2', 'PJOK 1 SMK/MAK Kelas X (K-MERDEKA REVISI)', 'uploads/uJdAKqR3nnEEhF1Gh8qHQPZoyB2NCFI4lN74c8ST.png', 1, '2025-11-11 01:41:29', '2025-11-11 01:41:29'),
(5, 'Buku Testing 3', 'FARMAKOLOGI SMK/MAK Kelas XI (K-MERDEKA REVISI)', 'uploads/kKh8WIkLxSReHxhCW8kQqy6oPPFKAnAtrhSifqCW.png', 1, '2025-11-11 01:42:01', '2025-11-11 01:42:01'),
(6, 'Buku Testing 4', 'SENI MUSIK 1 SMK/MAK Kelas X (K-MERDEKA REVISI)', 'uploads/2eROIcf4xsY2dY5tArvDHcWPyWnVrHO9COxQ0YVq.png', 1, '2025-11-11 01:42:27', '2025-11-11 01:42:27'),
(7, 'Buku Testing 5', 'AKU CINTA KOTA BALIKPAPAN', 'uploads/XkkU53zRilvStJiTfmomDeZJk0uPLotfcNJfXchN.png', 1, '2025-11-11 01:42:53', '2025-11-11 01:42:53'),
(8, 'Buku Testing 6', 'SEMINGGU BERSAMA AJENG, si SINDEN CILIK (Audio Book)', 'uploads/7a4ryOfwOkjbfu21rhLk8j4WHR9FsdKTXUiEAaOS.png', 1, '2025-11-11 01:43:27', '2025-11-11 01:43:27'),
(9, 'Buku Testing 7', 'SEMINGGU BERSAMA AJENG, si SINDEN CILIK (Audio Book)', 'uploads/7V1f5lbj7OEoIbNNjAVTx63xcObhwyt8AhO7Ihjf.png', 1, '2025-11-11 01:43:52', '2025-11-11 01:43:52'),
(11, 'PJOK 2 Update', 'PJOK 2 SMK/MAK Kelas X (K-MERDEKA REVISI) Update', 'uploads/I9or9Bgc7mjH4MGdYKiIJ6Jjo7JNIxPFHQ5t5ENL.jpg', 1, '2025-11-11 06:37:24', '2025-11-11 08:48:08');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `book_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `book_id`, `created_at`, `updated_at`) VALUES
(5, 2, 3, '2025-11-11 03:39:46', '2025-11-11 03:39:46'),
(6, 2, 4, '2025-11-11 03:39:50', '2025-11-11 03:39:50'),
(7, 2, 5, '2025-11-11 03:44:28', '2025-11-11 03:44:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin@elibrary.com', '$2y$10$K55V..JfpHyOPYJfPfBKh.cpnJyKWgGvKB7dShxVqnd4F300HbBLG', 'admin', '2025-11-10 11:18:08', '2025-11-10 11:18:08'),
(2, 'user@elibrary.com', '$2y$10$Ra1vrB/asdjg/NKneSOOguPdOqfsjZy8JzPRY1xtX13NoMbrjTVNK', 'user', '2025-11-11 00:48:44', '2025-11-11 10:10:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `books_user_id_foreign` (`user_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorites_user_id_book_id_unique` (`user_id`,`book_id`),
  ADD KEY `favorites_book_id_foreign` (`book_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
