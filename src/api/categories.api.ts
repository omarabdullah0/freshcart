export interface CategoryInterface {
name:string,
image:string,
_id:string
}

export async function grtCategories(): Promise<CategoryInterface[]>{
    try {
    const data = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
    if(!data.ok) throw new Error ('seom error')
    const payload = await data.json()
return payload?.data;
    } catch (error) {
        throw new Error ('seom error')
    }

}