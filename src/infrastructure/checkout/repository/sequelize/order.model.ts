import OrderItemModel from "./order-item.model";
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";


@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: String;

  @ForeignKey(() => CustomerModel)
  @Column(DataType.STRING)
  declare customer_id: String;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}