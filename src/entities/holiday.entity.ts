import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, } from 'typeorm';

@Entity('holidays')
export class Holiday {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: number

    @Column({ length: 191 })
    day: string

    @Column({ length: 191 })
    month: string

    @Column()
    year: number

    @Column({ length: 191 })
    holiday: string

    @Column({ length: 191, nullable: true })
    datetime_ms: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}