import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

  async update(entity: Order): Promise<void> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id: entity.id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }
    let t;
    try {
      t = await orderModel.sequelize.transaction();

      for(const i of orderModel.items){
        await i.destroy({ transaction: t });
      }    

      for(const i of entity.items){
        await OrderItemModel.create({
          id: i.id,
          name: i.name,
          price: i.price,
          product_id: i.productId,
          quantity: i.quantity,
          order_id: entity.id,
        },{
          transaction : t
        })
      }

      await orderModel.update({
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },{transaction : t});

      t.commit();
    } catch (error) {
      if(t != null){
        t.rollback();
      } 
      throw new Error("Error in update operation!");
    }


  }

  async find(id: String): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    return this.mapOrderFrom(orderModel);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({include: ["items"],});
    return orderModels.map(this.mapOrderFrom.bind(this));
  }

  mapOrderFrom(model: OrderModel): Order {  
    let order = new Order(model.id, model.customer_id, model.items.map(this.mapOrderItemFrom.bind(this)));
    return order;
  }

  mapOrderItemFrom(model: OrderItemModel): OrderItem {
    let orderItem = new OrderItem(model.id, model.name, model.price, model.product_id, model.quantity,);
    return orderItem;
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
