/**
 * Utility functions for serializing BigInt values to JSON-compatible format
 */

/**
 * Recursively converts BigInt values to strings in an object or array
 * @param {any} obj - The object/array to serialize
 * @returns {any} - Serialized object with BigInt values converted to strings
 */
export function serializeBigInt(obj) {
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }

  if (obj && typeof obj === "object") {
    const serialized = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "bigint") {
        serialized[key] = value.toString();
      } else if (value && typeof value === "object") {
        serialized[key] = serializeBigInt(value);
      } else {
        serialized[key] = value;
      }
    }
    return serialized;
  }

  return obj;
}

/**
 * JSON.stringify replacer function for BigInt serialization
 * Usage: JSON.stringify(obj, bigIntReplacer)
 * @param {string} key - The key being stringified
 * @param {any} value - The value being stringified
 * @returns {any} - Converted value
 */
export function bigIntReplacer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

/**
 * Creates a safe JSON response with BigInt serialization
 * @param {any} data - Data to serialize
 * @param {number} status - HTTP status code
 * @returns {Response} - Next.js Response object
 */
export function createJSONResponse(data, status = 200) {
  return new Response(JSON.stringify(data, bigIntReplacer), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Specifically handles Prisma model serialization for common ecommerce entities
 * @param {Object} prismaData - Prisma query result
 * @returns {Object} - Serialized data
 */
export function serializePrismaData(prismaData) {
  if (!prismaData) return prismaData;

  // Handle arrays (multiple records)
  if (Array.isArray(prismaData)) {
    return prismaData.map(serializePrismaData);
  }

  // Handle single object
  const serialized = { ...prismaData };

  // Convert common BigInt fields
  if (serialized.price && typeof serialized.price === "bigint") {
    serialized.price = serialized.price.toString();
  }

  if (serialized.total && typeof serialized.total === "bigint") {
    serialized.total = serialized.total.toString();
  }

  // Handle nested relationships
  if (serialized.product) {
    serialized.product = serializePrismaData(serialized.product);
  }

  if (serialized.order) {
    serialized.order = serializePrismaData(serialized.order);
  }

  if (serialized.OrderProduct && Array.isArray(serialized.OrderProduct)) {
    serialized.OrderProduct = serialized.OrderProduct.map(serializePrismaData);
  }

  if (serialized.cartItems && Array.isArray(serialized.cartItems)) {
    serialized.cartItems = serialized.cartItems.map(serializePrismaData);
  }

  return serialized;
}

/**
 * Format price for display (Indonesian Rupiah)
 * @param {bigint|string|number} price - Price value
 * @returns {string} - Formatted price string
 */
export function formatPrice(price) {
  const numericPrice = typeof price === "bigint" ? Number(price) : Number(price);

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numericPrice);
}

/**
 * Parse string price back to BigInt for database operations
 * @param {string} priceString - String representation of price
 * @returns {bigint} - BigInt value
 */
export function parsePriceToBigInt(priceString) {
  return BigInt(priceString);
}
