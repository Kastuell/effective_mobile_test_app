-- CreateTable
CREATE TABLE "ActionHistory" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "action" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "ActionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActionHistory" ADD CONSTRAINT "ActionHistory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
