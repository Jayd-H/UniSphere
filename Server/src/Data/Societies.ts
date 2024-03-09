import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({database: "unisphere",name:"societies"})
export class Societies extends BaseEntity 
{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 32 })
    societyName: string

    @Column("varchar", {length: 256})
    description: string

    @Column("mediumblob")
    bannerImg: Blob
}
