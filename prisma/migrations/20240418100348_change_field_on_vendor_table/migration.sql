/*
  Warnings:

  - Added the required column `category` to the `vendors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `vendors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `vendors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vendors` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
