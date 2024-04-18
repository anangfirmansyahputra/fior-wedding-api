/*
  Warnings:

  - You are about to drop the column `phone_code` on the `country` table. All the data in the column will be lost.
  - Added the required column `phonecode` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `country` DROP COLUMN `phone_code`,
    ADD COLUMN `phonecode` VARCHAR(191) NOT NULL;
