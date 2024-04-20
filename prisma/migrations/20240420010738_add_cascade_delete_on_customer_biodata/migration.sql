-- DropForeignKey
ALTER TABLE `customer_biodatas` DROP FOREIGN KEY `customer_biodatas_customer_id_fkey`;

-- AddForeignKey
ALTER TABLE `customer_biodatas` ADD CONSTRAINT `customer_biodatas_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
