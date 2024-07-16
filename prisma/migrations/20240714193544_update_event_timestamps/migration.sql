-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventName" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventFrom" INTEGER NOT NULL,
    "eventTo" INTEGER NOT NULL
);
