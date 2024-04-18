/*
  Warnings:

  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendorcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `country`;

-- DropTable
DROP TABLE `vendorcategory`;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL,
    `iso` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `iso3` VARCHAR(191) NOT NULL,
    `numcode` INTEGER NOT NULL,
    `phonecode` INTEGER NOT NULL,
    `nicename` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_categories` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
