import { PRODUCTS } from "../../../utils/base-data/data-products";
import { CustomResponse } from "../../../utils/response/custom.response";
import { ProductsRepository } from "../../repositories/products.repository";

export interface CreateProductsByDefaultUseCase {
    execute(user_id: string): Promise<string | CustomResponse>;
}


export class CreateProductsByDefault implements CreateProductsByDefaultUseCase {

    constructor(
        private repository: ProductsRepository
    ) { }
    async execute(user_id: string): Promise<string | CustomResponse> {
        for (const product of PRODUCTS) {
            const data = await this.repository.create(product, user_id)  // Create products in the database using the repository method.  // This is just a mock implementation for demonstration purposes.  In a real-world application, you would use the repository's create method to save the product to the database.  // Note: This method assumes that the ProductEntity and PRODUCTS are defined elsewhere.  // For example, they could be defined in a separate file (e.g., product.entity.ts) and imported here.  // Also, this method does not handle any error cases.  In a real-world application, you would handle errors appropriately.  // For example, you could use a try/catch block to handle any errors that occur during the database operations.  // For example:
            if (data instanceof CustomResponse) {
                return data
            }
        }
        return "Products created successfully"
    }

}