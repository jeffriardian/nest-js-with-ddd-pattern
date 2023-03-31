import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { RentBooks } from 'src/rentbooks/domain/rentbook.entity'; 

@Entity()
export class Members {
    @PrimaryColumn()
    code: string;

    @Column({ length: 100 })
    name: string;
}