
import ProductEntity from "../../../domain/product/entity/product.entity";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto, Product } from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputListProductDto
  ): Promise<OutputListProductDto> {
    const products1 = await this.productRepository.findAll();
    return {
      products: products1.map( (e) => OutputMapper.toOutput(e))
    };
  }
}

class OutputMapper {
    static toOutput(product: ProductEntity): Product {
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }      
    }
  }