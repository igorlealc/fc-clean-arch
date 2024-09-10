import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductEntity from "../entity/product.entity";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductEntity> {}
