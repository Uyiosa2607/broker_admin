-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT,
    "profile_image" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
