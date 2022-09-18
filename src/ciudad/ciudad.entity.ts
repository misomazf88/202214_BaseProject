import { SupermercadoEntity } from "../supermercado/supermercado.entity";
import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CiudadEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column()
  numeroHabitantes: number;

  @OneToMany(() => SupermercadoEntity, supermercado => supermercado.ciudad)
  supermercados: SupermercadoEntity[];
}