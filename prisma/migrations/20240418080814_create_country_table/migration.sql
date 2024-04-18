-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL,
    `iso` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `iso3` VARCHAR(191) NOT NULL,
    `numcode` INTEGER NOT NULL,
    `phone_code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
