import { SupermarketEntity } from "../supermarket/supermarket.entity";
import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CityEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  numberInhabitants: number;

  @OneToMany(() => SupermarketEntity, supermmarket => supermmarket.city)
  supermmarkets: SupermarketEntity[];
}