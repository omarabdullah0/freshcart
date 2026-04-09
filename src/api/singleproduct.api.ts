import { productInterface } from "@/interface/product.interface";

export async function getSingleProduct(id: string): Promise<productInterface> {
    try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        const payload = await res.json();
        return payload?.data;

    } catch (error) {
        console.error("FETCH ERROR:", error);
        throw error;
    }
}