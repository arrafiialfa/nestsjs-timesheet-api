import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity'; // Import the User entity if you have one
import { TimesheetDetail } from './timesheet_detail.entity';

@Entity('timesheets')
export class Timesheet {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => TimesheetDetail, timesheetDetail => timesheetDetail.timesheet)
    timesheet_details: TimesheetDetail[]

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'site_inspector_id' })
    site_inspector: User | null;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'checker_2_id' })
    'checker_2': User | null;

    @Column({ length: 191, enum: ['accepted', 'rejected', 'waiting', 'revision'] })
    status: string;

    @Column({ type: 'timestamp', unique: true, comment: 'period is year+month YYYY-MM' })
    period: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
