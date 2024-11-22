/*
  Warnings:

  - The `status` column on the `trusts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TrustStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "trusts" DROP COLUMN "status",
ADD COLUMN     "status" "TrustStatus" NOT NULL DEFAULT 'PENDING';
