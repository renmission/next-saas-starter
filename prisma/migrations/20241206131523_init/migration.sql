/*
  Warnings:

  - You are about to drop the `TrustPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrustPayment" DROP CONSTRAINT "TrustPayment_businessId_fkey";

-- DropForeignKey
ALTER TABLE "TrustPayment" DROP CONSTRAINT "TrustPayment_professionalId_fkey";

-- DropTable
DROP TABLE "TrustPayment";

-- CreateTable
CREATE TABLE "trust_payments" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "trustId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trust_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trust_payments_trustId_key" ON "trust_payments"("trustId");

-- CreateIndex
CREATE UNIQUE INDEX "trust_payments_stripeSessionId_key" ON "trust_payments"("stripeSessionId");

-- CreateIndex
CREATE INDEX "trust_payments_trustId_idx" ON "trust_payments"("trustId");

-- CreateIndex
CREATE INDEX "trust_payments_professionalId_idx" ON "trust_payments"("professionalId");

-- CreateIndex
CREATE INDEX "trust_payments_businessId_idx" ON "trust_payments"("businessId");

-- AddForeignKey
ALTER TABLE "trust_payments" ADD CONSTRAINT "trust_payments_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trust_payments" ADD CONSTRAINT "trust_payments_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trust_payments" ADD CONSTRAINT "trust_payments_trustId_fkey" FOREIGN KEY ("trustId") REFERENCES "trusts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
