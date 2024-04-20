-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_customer_id_fkey`;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
