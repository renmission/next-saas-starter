-- DropForeignKey
ALTER TABLE "trusts" DROP CONSTRAINT "trusts_clientId_fkey";

-- AlterTable
ALTER TABLE "trusts" ALTER COLUMN "clientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "trusts" ADD CONSTRAINT "trusts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
