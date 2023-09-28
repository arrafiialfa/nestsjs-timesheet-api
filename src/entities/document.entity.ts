import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { TimesheetDetail } from './timesheet_detail.entity';

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

    @ManyToMany(() => TimesheetDetail)
    @JoinTable({
        name: 'timesheet_detail_document',
        joinColumn: {
            name: 'document_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'timesheet_detail_id',
            referencedColumnName: 'id',
        },
    })
    timesheetDetails: TimesheetDetail[];

}
