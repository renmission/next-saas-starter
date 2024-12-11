/*
  Warnings:

  - You are about to drop the column `isCreatedBy` on the `trusts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expiresAt" SET DEFAULT (NOW() + INTERVAL '7 days');

-- AlterTable
ALTER TABLE "trusts" DROP COLUMN "isCreatedBy",
ADD COLUMN     "isCreatedByClient" BOOLEAN NOT NULL DEFAULT false;
