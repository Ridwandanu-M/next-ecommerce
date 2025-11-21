import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import ProductSection from "@/components/ProductSection";

const prisma = new PrismaClient();

export default async function CategoryPage({ params }) {
  const { slug } = params;
  
  console.log("🔍 [DEBUG] Slug from params:", slug);
  
  if (!slug) {
    console.log("❌ No slug provided");
    notFound();
  }

  try {
    const decodedSlug = decodeURIComponent(slug);
    console.log("🔍 [DEBUG] Searching for category:", decodedSlug);
    
    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: decodedSlug,
          mode: 'insensitive'
        }
      },
      include: {
        Product: {
          include: {
            category: true
          },
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    });

    console.log("✅ [DEBUG] Category found:", category?.name);
    console.log("🛍️ [DEBUG] Products count:", category?.Product?.length);

    if (!category) {
      console.log("❌ Category not found");
      notFound();
    }

    // Transform products
    const transformedProducts = category.Product.map(product => ({
      ...product,
      category: {
        name: category.name
      },
      price: product.price ? product.price.toString() : "0"
    }));

    return (
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category.name}
          </h1>
          <p className="text-gray-600">
            {category.Product.length} products available
          </p>
        </div>

        {category.Product.length > 0 ? (
          <ProductSection products={transformedProducts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in "{category.name}" category yet.
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("❌ [ERROR]", error);
    notFound();
  }
}