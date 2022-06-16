-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bondNumber" INTEGER,
    "isAdmin" BOOLEAN NOT NULL,
    "isTrainer" BOOLEAN NOT NULL,
    "isMatchLeader" BOOLEAN NOT NULL,
    "phoneNumber" TEXT
);

-- CreateTable
CREATE TABLE "eventParticipants" (
    "userEmail" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "isAssistent" BOOLEAN NOT NULL,

    PRIMARY KEY ("userEmail", "eventId"),
    CONSTRAINT "eventParticipants_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "eventParticipants_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("eventId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "eventId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "maxParticipants" INTEGER,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "forgotPassword" (
    "ForgotPasswordUserEmail" TEXT NOT NULL,
    "token" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "forgotPassword_ForgotPasswordUserEmail_fkey" FOREIGN KEY ("ForgotPasswordUserEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notes" (
    "notesMail" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    CONSTRAINT "notes_notesMail_fkey" FOREIGN KEY ("notesMail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "forgotPassword_token_key" ON "forgotPassword"("token");
