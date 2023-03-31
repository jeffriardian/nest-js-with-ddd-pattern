import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RentBooks {
    @PrimaryGeneratedColumn("increment")
    public id!: string;

    @Column({ length: 100 })
    member_code: string;

    @Column({ length: 100 })
    book_code: string;
    
    @Column({ type: 'date' })
    rent_date: string;
    
    @Column({ nullable: true, type: 'date' })
    return_date: string;

    @Column({ length: 100 })
    status: string;
}