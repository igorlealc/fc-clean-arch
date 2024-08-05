import {
    Table,
    Model,
    Column,
    PrimaryKey,
    DataType
  } from "sequelize-typescript";

  @Table({
    tableName: "customers",
    timestamps: false,
  })
  export default class CustomerModel extends Model {
   
    @PrimaryKey
    @Column(DataType.STRING)  
    declare id: String;
  
    @Column({ allowNull: false })
    declare name: String;
  
    @Column({ allowNull: false })
    declare street: String;
  
    @Column({ allowNull: false })
    declare number: number;
  
    @Column({ allowNull: false })
    declare zipcode: String;
  
    @Column({ allowNull: false })
    declare city: String;
  
    @Column({ allowNull: false })
    declare active: boolean;
  
    @Column({ allowNull: false })
    declare rewardPoints: number;
  }