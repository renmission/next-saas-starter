-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "expiresAt" SET DEFAULT (NOW() + INTERVAL '7 days');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;
