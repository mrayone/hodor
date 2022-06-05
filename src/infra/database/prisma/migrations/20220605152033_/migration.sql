-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_USER_ID" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UK_USER_EMAIL" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UK_USER_UUID" ON "User"("uuid");

-- CreateIndex
CREATE INDEX "IX_USER_COMPOSITE" ON "User"("uuid", "email");
