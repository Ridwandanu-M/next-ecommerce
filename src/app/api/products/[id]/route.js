import { PrismaClient } from "@prisma/client";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const prisma = new PrismaClient();

function urlToBucketPath(publicUrl) {
  try {
    const url = new URL(publicUrl);
    const parts = url.pathname.split("/");
    const idx = parts.indexOf("product-images");
    if (idx >= 0) {
      return parts.slice(idx + 1).join("/");
    }
    return null;
  } catch {
    return null;
  }
}

function serializeProduct(product) {
  return { 
    ...product, 
    price: product.price ? product.price.toString() : null 
  };
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    console.log('PATCH request - ID:', id, 'Type:', typeof id);
    
    // Validasi ID untuk string (Prisma ID string)
    if (!id || typeof id !== 'string') {
      console.error('Invalid product ID:', id);
      return new Response(
        JSON.stringify({ error: "Invalid product ID" }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    const body = await req.json();
    console.log('PATCH request body:', body);
    
    const updateData = {};

    // Validasi dan prepare update data
    if (body.name !== undefined) {
      if (!body.name || body.name.trim() === "") {
        return new Response(
          JSON.stringify({ error: "Product name is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      updateData.name = body.name.trim();
    }
    
    if (body.desc !== undefined) updateData.desc = body.desc;
    
    if (body.price !== undefined) {
      const price = Number(body.price);
      if (isNaN(price) || price < 0) {
        return new Response(
          JSON.stringify({ error: "Invalid price" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      updateData.price = BigInt(price);
    }
    
    if (body.categoryId !== undefined) {
      const categoryId = Number(body.categoryId);
      if (isNaN(categoryId)) {
        return new Response(
          JSON.stringify({ error: "Invalid category ID" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // Check if category exists
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!categoryExists) {
        return new Response(
          JSON.stringify({ error: "Category not found" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      updateData.categoryId = categoryId;
    }
    
    if (body.stock !== undefined) {
      if (!["ready", "preorder"].includes(body.stock)) {
        return new Response(
          JSON.stringify({ error: "Invalid stock value" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      updateData.stock = body.stock;
    }
    
    if (Array.isArray(body.images)) updateData.images = body.images;

    console.log('Update data:', updateData);

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!existingProduct) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { 
          status: 404,
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    const updated = await prisma.product.update({
      where: { id: id },
      data: updateData,
      include: { category: true },
    });

    console.log('Updated product:', updated);

    return new Response(
      JSON.stringify(serializeProduct(updated)),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (e) {
    console.error("Update error:", e);
    
    // Handle Prisma errors
    if (e.code === 'P2025') {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { 
          status: 404,
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Failed to update product", details: e.message }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    console.log('DELETE request - ID:', id, 'Type:', typeof id);
    
    // Validasi ID untuk string (Prisma ID string)
    if (!id || typeof id !== 'string') {
      console.error('Invalid product ID:', id);
      return new Response(
        JSON.stringify({ error: "Invalid product ID" }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    
    if (!product) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { 
          status: 404,
          headers: { "Content-Type": "application/json" } 
        }
      );
    }

    // Delete images from storage if they exist
    if (product.images && product.images.length > 0) {
      const paths = product.images.map(urlToBucketPath).filter(Boolean);
      if (paths.length > 0) {
        try {
          const { data, error } = await supabaseAdmin.storage
            .from("product-images")
            .remove(paths);

          if (error) {
            console.error("Supabase delete error:", error);
          } else {
            console.log("Deleted files from storage:", data);
          }
        } catch (storageError) {
          console.error("Storage delete error:", storageError);
          // Continue with product deletion even if image deletion fails
        }
      }
    }

    await prisma.product.delete({ where: { id: id } });
    
    return new Response(null, { status: 204 });
  } catch (e) {
    console.error("Delete error:", e);
    
    // Handle Prisma errors
    if (e.code === 'P2025') {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { 
          status: 404,
          headers: { "Content-Type": "application/json" } 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Failed to delete product", details: e.message }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}