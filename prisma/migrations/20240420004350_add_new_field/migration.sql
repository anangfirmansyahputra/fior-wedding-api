/*
  Warnings:

  - Added the required column `birthday` to the `customer_biodatas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `customer_biodatas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer_biodatas` ADD COLUMN `birthday` DATETIME(3) NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `location` TEXT NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('SCHEDULED', 'ONGOING', 'COMPLETED') NOT NULL DEFAULT 'SCHEDULED';
