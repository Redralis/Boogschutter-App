/*
  Warnings:

  - You are about to drop the column `eventEventId` on the `user` table. All the data in the column will be lost.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `type` ENUM('matchAssistant', 'schietavond', 'training') NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `eventEventId`;
