import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TimesheetDetail } from './timesheet_detail.entity';

@Entity('timesheet_detail_documents')
export class TimesheetDetailDocument {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TimesheetDetail)
    @JoinColumn({ name: 'timesheet_detail_id' })
    timesheet_detail: TimesheetDetail;

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
