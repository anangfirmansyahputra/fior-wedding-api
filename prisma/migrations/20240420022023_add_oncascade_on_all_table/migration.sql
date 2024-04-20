/*
  Warnings:

  - Added the required column `holmat_name` to the `checklist_holmats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `support_name` to the `checklist_supports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_amount` to the `event_budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_name` to the `event_budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guest_name` to the `event_guest_seats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_category` to the `event_guest_seats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `event_payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `event_payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_location` to the `event_room_lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_name` to the `event_room_lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity_name` to the `event_rundowns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `event_rundowns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `event_rundowns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `event_rundowns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `checklist_holmats` DROP FOREIGN KEY `checklist_holmats_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `checklist_supports` DROP FOREIGN KEY `checklist_supports_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_budgets` DROP FOREIGN KEY `event_budgets_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_guest_seats` DROP FOREIGN KEY `event_guest_seats_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_payments` DROP FOREIGN KEY `event_payments_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_room_lists` DROP FOREIGN KEY `event_room_lists_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_rundowns` DROP FOREIGN KEY `event_rundowns_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_task_timelines` DROP FOREIGN KEY `event_task_timelines_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_vendors` DROP FOREIGN KEY `event_vendors_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_vendors` DROP FOREIGN KEY `event_vendors_vendor_id_fkey`;

-- AlterTable
ALTER TABLE `checklist_holmats` ADD COLUMN `holmat_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `holmat_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `checklist_supports` ADD COLUMN `support_description` TEXT NULL,
    ADD COLUMN `support_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `support_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `event_budgets` ADD COLUMN `item_amount` INTEGER NOT NULL,
    ADD COLUMN `item_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `item_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `event_guest_seats` ADD COLUMN `guest_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `seat_category` ENUM('VIP', 'REGULAR', 'SPECIAL') NOT NULL,
    ADD COLUMN `seat_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `event_payments` ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `payment_method` ENUM('CREDIT_CARD', 'BANK_TRANSFER', 'CASH') NOT NULL,
    ADD COLUMN `payment_status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `event_room_lists` ADD COLUMN `room_capacity` INTEGER NULL,
    ADD COLUMN `room_location` VARCHAR(191) NOT NULL,
    ADD COLUMN `room_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `event_rundowns` ADD COLUMN `activity_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `end_time` DATETIME(3) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_time` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `event_task_timelines` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `event_vendors` ADD CONSTRAINT `event_vendors_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_vendors` ADD CONSTRAINT `event_vendors_vendor_id_fkey` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_payments` ADD CONSTRAINT `event_payments_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_task_timelines` ADD CONSTRAINT `event_task_timelines_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_supports` ADD CONSTRAINT `checklist_supports_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_holmats` ADD CONSTRAINT `checklist_holmats_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_budgets` ADD CONSTRAINT `event_budgets_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_rundowns` ADD CONSTRAINT `event_rundowns_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_guest_seats` ADD CONSTRAINT `event_guest_seats_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_room_lists` ADD CONSTRAINT `event_room_lists_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
