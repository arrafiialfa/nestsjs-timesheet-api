import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity'; // Import the User entity if you have one

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 191 })
    contract_number: string;

    @Column({ length: 191 })
    name: string;

    @Column('double', { precision: 32, scale: 2 })
    value: number;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'unit_owner_id' })
    unit_owner: User | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'upp_id' })
    upp: User | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'contractor_id' })
    contractor: User | null;

    @Column({ type: 'datetime' })
    start_date: Date;

    @Column({ type: 'datetime', nullable: true })
    cut_off_date: Date | null;

    @Column({ type: 'datetime', nullable: true })
    effective_date: Date | null;

    @Column({ type: 'datetime' })
    finish_date: Date;

    @Column({ nullable: true })
    document_id: number | null;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column({ length: 30, nullable: true })
    level: string | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'pic_project_id' })
    pic_project: User | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'related_role_owner_id' })
    related_role_owner: User | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'related_role_upp_id' })
    related_role_upp: User | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'consultant_id' })
    consultant: User | null;
}
