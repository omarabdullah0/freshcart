import { productInterface } from "@/interface/product.interface";

export async function getProduct(): Promise<productInterface[]> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return []; 
  }
}