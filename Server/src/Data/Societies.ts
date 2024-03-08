import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({database: "unisphere",name:"societies"})
export class Societies extends BaseEntity 
{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 32 })
        societiesName: string

    @Column("varchar", {length: 256})
        Description: string
    @Column("mediumblob")
        BannerImg: Blob
}
