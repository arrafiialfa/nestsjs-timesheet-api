import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, } from 'typeorm';

@Entity('scopes_of_work')
export class ScopeOfWork {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 191 })
    name: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}