/*
  Warnings:

  - Added the required column `isCreatedBy` to the `trusts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expiresAt" SET DEFAULT (NOW() + INTERVAL '7 days');

-- AlterTable
ALTER TABLE "trusts" ADD COLUMN     "isCreatedBy" BOOLEAN NOT NULL;
