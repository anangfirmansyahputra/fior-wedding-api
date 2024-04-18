/*
  Warnings:

  - You are about to alter the column `phonecode` on the `country` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `country` MODIFY `phonecode` INTEGER NOT NULL;
