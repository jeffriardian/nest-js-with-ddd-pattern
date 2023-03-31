import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { RentBooks } from 'src/rentbooks/domain/rentbook.entity'; 

@Entity()
export class Books {
    @PrimaryColumn()
    code: string;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 100 })
    author: string;

    @Column()
    stock: number;
}