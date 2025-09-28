/*
  Warnings:

  - You are about to drop the column `locationId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "public"."ProductStock" ADD VALUE 'outofstock';

-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_locationId_fkey";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "locationId";

-- DropTable
DROP TABLE "public"."Location";
