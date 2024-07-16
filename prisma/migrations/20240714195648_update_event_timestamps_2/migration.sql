/*
  Warnings:

  - You are about to alter the column `eventFrom` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `eventTo` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventName" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventFrom" BIGINT NOT NULL,
    "eventTo" BIGINT NOT NULL
);
INSERT INTO "new_Event" ("eventFrom", "eventName", "eventTo", "eventType", "id") SELECT "eventFrom", "eventName", "eventTo", "eventType", "id" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
