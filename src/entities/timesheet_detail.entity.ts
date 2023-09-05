import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ScopeOfWork } from './scope_of_work.entity';
import { Project } from './project.entity';
import { Timesheet } from './timesheet.entity';

@Entity('timesheet_details')
export class TimesheetDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Timesheet, { nullable: true })
    @JoinColumn({ name: 'timesheet_id' })
    timesheet: Timesheet | null;

    @ManyToOne(() => ScopeOfWork, { nullable: true })
    @JoinColumn({ name: 'scope_of_work_id' })
    scope_of_work: ScopeOfWork | null;

    @ManyToOne(() => Project, { nullable: true })
    @JoinColumn({ name: 'project_id' })
    project: Project | null;

    @Column({ enum: ['sunshine', 'cloudy', 'partly cloudy', 'overcast', 'raining', 'snowing', 'foggy', 'thunder and lightning', 'windy'] })
    weather: string;

    @Column({ nullable: true })
    manpower_qty: number | null

    @Column()
    description: string

    @Column({ comment: 'Max. 2 filepath. Implode with |' })
    file_path: string

    @Column({ type: 'timestamp' })
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
