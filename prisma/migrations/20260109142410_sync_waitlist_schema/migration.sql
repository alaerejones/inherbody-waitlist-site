-- CreateTable
CREATE TABLE "WaitlistSubscriber" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "source" TEXT,
    "consentGiven" BOOLEAN NOT NULL,

    CONSTRAINT "WaitlistSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistSubscriber_email_key" ON "WaitlistSubscriber"("email");

-- CreateIndex
CREATE INDEX "WaitlistSubscriber_createdAt_idx" ON "WaitlistSubscriber"("createdAt");
