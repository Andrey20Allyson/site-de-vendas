import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import z from "zod";

export const productSchema = z.object({
  id: z.string(),
  rate: z.number(),
  name: z.string(),
  desc: z.string(),
  sold: z.number(),
  price: z.number(),
  sellerId: z.string(),
  discount: z.number(),
});

export type ProductDTO = z.infer<typeof productSchema>; 

export class ProductRepository {
  static productsCollectionRef = collection(db, 'products');

  static createProduct(product: ProductDTO) {
    setDoc(doc(this.productsCollectionRef, 'index'), product);
  }
}