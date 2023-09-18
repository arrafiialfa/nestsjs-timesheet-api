import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ScopeOfWork } from './scope_of_work.entity';
import { Project } from './project.entity';
import { Timesheet } from './timesheet.entity';
import { TimesheetLeaves, Weather } from 'src/enums';
import { DEFAULT_CLOCK_IN, DEFAULT_CLOCK_OUT } from 'src/constants';
import { TimesheetDetailDocument } from './document.entity';

@Entity('timesheet_details')
export class TimesheetDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Timesheet)
    @JoinColumn({ name: 'timesheet_id' })
    timesheet: Timesheet;

    @OneToMany(() => TimesheetDetailDocument, timesheetDetailDocument => timesheetDetailDocument.timesheet_detail)
    documents: TimesheetDetailDocument[]

    @ManyToOne(() => ScopeOfWork)
    @JoinColumn({ name: 'scope_of_work_id' })
    scope_of_work: ScopeOfWork;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column({ type: 'enum', enum: Weather })
    weather: Weather;

    @Column()
    manpower_qty: number;

    @Column({ length: 191, nullable: true })
    description: string | null

    @Column({ comment: 'Max. 2 filepath. Implode with |', nullable: true })
    file_path: string | null

    @Column()
    value: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: "enum", enum: TimesheetLeaves, nullable: true })
    leave_type: TimesheetLeaves | null

    @Column({ type: 'time without time zone', default: DEFAULT_CLOCK_IN })
    clock_in: Date;

    @Column({ type: 'time without time zone', default: DEFAULT_CLOCK_OUT })
    clock_out: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
