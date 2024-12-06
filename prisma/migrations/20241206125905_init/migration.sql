-- CreateTable
CREATE TABLE "TrustPayment" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrustPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrustPayment_stripeSessionId_key" ON "TrustPayment"("stripeSessionId");

-- CreateIndex
CREATE INDEX "TrustPayment_professionalId_businessId_idx" ON "TrustPayment"("professionalId", "businessId");

-- AddForeignKey
ALTER TABLE "TrustPayment" ADD CONSTRAINT "TrustPayment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrustPayment" ADD CONSTRAINT "TrustPayment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
