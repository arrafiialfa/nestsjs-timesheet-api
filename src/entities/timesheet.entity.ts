import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity'; // Import the User entity if you have one

@Entity('timesheets')
export class Timesheet {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user_id: User | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'site_inspector' })
    site_inspector: User | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'checker_2' })
    'checker_2': User | null;

    @Column({ length: 191 })
    status: string;

    @Column({ type: 'timestamp', nullable: true })
    period: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
