import { QueryConstraint } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import z from "zod";
import { db } from "../firebase";
import { Reducer, callReducer } from "../utils/data-reducer";
import { BaseRepository, RepositoryConfig } from "./base-repository";

export const productCreationFields = {
  name: z.string(),
  desc: z.string(),
  price: z.number(),
  category: z.string(),
  sellerId: z.string(),
  discount: z.number(),
}

export const productCreationSchema = z.object({
  ...productCreationFields,
});

export const productSchema = z.object({
  ...productCreationFields,
  stars: z.number().array(),
  sold: z.number(),
  id: z.string(),
});

export interface ProductCreationDTO extends z.infer<typeof productCreationSchema> { }
export interface ProductDTO extends z.infer<typeof productSchema> { }

export interface GetProductsOptions {
  keyNames?: string[],
  seller?: string[],
  category?: string,
  limit?: number,
}

export class ProductRepository extends BaseRepository<ProductDTO> {
  constructor(config?: RepositoryConfig) {
    super({
      collectionName: 'products',
      database: db,
      ...config,
    });
  }

  async getProducts(options: GetProductsOptions) {
    const constants: QueryConstraint[] = [];

    return this.getDocs(...constants);
  }

  async createProduct(product: ProductCreationDTO) {
    const productID = uuid()

    await this.setDoc(`${productID}`, {
      ...product,
      id: productID,
      sold: 0,
      stars: [0, 0, 0, 0, 0],
    });

    return productID;
  }

  async changeProduct(id: string, reducer: Reducer<ProductDTO>) {
    const product = await this.getDoc(id);
    const productDTO: ProductDTO = productSchema.parse(product.data());

    const newProduct = callReducer(reducer, productDTO);

    if (newProduct.id !== product.id) throw new Error('Can\'t change the id of a product!');

    return this.setDoc(product.id, newProduct);
  }
}

export const productRepository = new ProductRepository();