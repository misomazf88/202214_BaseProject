
import { CityEntity } from "../city/city.entity";
import { Entity, OneToMany, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SupermarketEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  webPage: string;

  @OneToMany(() => CityEntity, headquarter => headquarter.name)
  headquarters: CityEntity[];

  @ManyToOne(() => CityEntity, city => city.supermmarkets)
  city: CityEntity;
}