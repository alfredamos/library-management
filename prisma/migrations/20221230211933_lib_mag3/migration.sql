-- AlterTable
ALTER TABLE `users` ADD COLUMN `userType` ENUM('Student', 'Staff', 'Admin') NOT NULL DEFAULT 'Student';
