import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ScopeOfWork } from './scope_of_work.entity';
import { Project } from './project.entity';
import { Timesheet } from './timesheet.entity';

@Entity('timesheet_details')
export class TimesheetDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Timesheet)
    @JoinColumn({ name: 'timesheet_id' })
    timesheet: Timesheet;

    @ManyToOne(() => ScopeOfWork)
    @JoinColumn({ name: 'scope_of_work_id' })
    scope_of_work: ScopeOfWork;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column({ enum: ['sunshine', 'cloudy', 'partly cloudy', 'overcast', 'raining', 'snowing', 'foggy', 'thunder and lightning', 'windy'] })
    weather: string;

    @Column()
    manpower_qty: number

    @Column({ length: 191, nullable: true })
    description: string | null

    @Column({ comment: 'Max. 2 filepath. Implode with |', nullable: true })
    file_path: string | null

    @Column({ type: 'timestamp' })
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
