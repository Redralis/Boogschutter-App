/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `type` ENUM('matchAssistant', 'schietavond', 'training') NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY;
