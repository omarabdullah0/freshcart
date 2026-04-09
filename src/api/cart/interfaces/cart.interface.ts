import { productInterface } from "@/interface/product.interface"



export interface CartRes {
  status: string,
  numOfCartItems: number,
  cartId: string,
  data: {
    _id: string,
    cartOwner: string,
    products:productType[],
    totalCartPrice: number
  }
}


export interface productType{
    product:productInterface,
    count:number,
    price:number,
    _id:string
}