import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('documents')
export class Document {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 191 })
    name: string

    @Column({ length: 191 })
    path: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
