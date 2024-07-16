/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventName" TEXT NOT NULL,
    "eventDescription" TEXT,
    "eventType" TEXT NOT NULL,
    "eventFrom" BIGINT NOT NULL,
    "eventTo" BIGINT NOT NULL
);
INSERT INTO "new_Event" ("eventFrom", "eventName", "eventTo", "eventType", "id") SELECT "eventFrom", "eventName", "eventTo", "eventType", "id" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
