/*
  Warnings:

  - You are about to alter the column `date` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "eventId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventName" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "maxParticipants" INTEGER,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Event" ("date", "description", "eventId", "eventName", "maxParticipants", "type") SELECT "date", "description", "eventId", "eventName", "maxParticipants", "type" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
