-- CreateTable
CREATE TABLE "notes" (
    "notesMail" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "notes_notesMail_fkey" FOREIGN KEY ("notesMail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
