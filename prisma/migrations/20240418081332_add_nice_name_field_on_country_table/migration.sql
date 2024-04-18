/*
  Warnings:

  - Added the required column `nicename` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `country` ADD COLUMN `nicename` VARCHAR(191) NOT NULL;
