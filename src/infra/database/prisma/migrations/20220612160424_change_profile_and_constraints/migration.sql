/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UK_PROFILE_NAME" ON "profiles"("name");

-- CreateIndex
CREATE INDEX "IX_PROFILE_NAME" ON "profiles"("name");

-- RenameForeignKey
ALTER TABLE "permissions" RENAME CONSTRAINT "FK_PERMISSIONS_PROFILE_ID" TO "FK_PERMISSION_PROFILE_ID";
