
import { CiudadEntity } from "../ciudad/ciudad.entity";
import { Entity, OneToMany, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SupermercadoEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  longitud: number;

  @Column()
  latitud: number;

  @Column()
  paginaWeb: string;

  @OneToMany(() => CiudadEntity, sede => sede.nombre)
  sedes: CiudadEntity[];

  @ManyToOne(() => CiudadEntity, ciudad => ciudad.supermercados)
  ciudad: CiudadEntity;
}