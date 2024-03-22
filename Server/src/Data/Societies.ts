import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({database: "unisphere",name:"societies"})
export class Societies extends BaseEntity 
{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 96 })
    societyName: string

    @Column("varchar", {length: 512})
    description: string

    @Column("varchar", {length: 255})
    imageURL: string
}
