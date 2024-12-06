-- DropForeignKey
ALTER TABLE "trust_payments" DROP CONSTRAINT "trust_payments_trustId_fkey";

-- DropIndex
DROP INDEX "trust_payments_trustId_idx";

-- AlterTable
ALTER TABLE "trust_payments" ALTER COLUMN "trustId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "trust_payments" ADD CONSTRAINT "trust_payments_trustId_fkey" FOREIGN KEY ("trustId") REFERENCES "trusts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
