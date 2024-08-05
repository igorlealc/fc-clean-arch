import { Table, Model, PrimaryKey, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: String;

  @Column({ allowNull: false })
  declare name: String;

  @Column({ allowNull: false })
  declare price: number;
}
