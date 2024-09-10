import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/product.validator.factory";

export default abstract class ProductEntity extends Entity {

    abstract get name(): string;
    abstract get price(): number;

    abstract changeName(name: string): void;
    abstract changePrice(price: number): void;


    validate(): boolean {     
      CustomerValidatorFactory.create().validate(this);
      if (this.notification.hasErrors()) {
        throw new NotificationError(this.notification.getErrors());
      }
      return true;
    }
  }