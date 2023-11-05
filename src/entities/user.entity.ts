import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Timesheet } from './timesheet.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Timesheet, Timesheet => Timesheet.user)
    timesheets: Timesheet[]

    @Column({ nullable: true })
    comment: string;

    @Column({ length: 191 })
    name: string;

    @Column({ length: 191, unique: true })
    email: string;

    @Column({ length: 191 })
    password: string;

    @Column({ length: 191, nullable: true })
    avatar: string | null;

    @Column({ length: 191, nullable: true })
    birth_place: string | null;

    @Column({ type: 'date', nullable: true })
    birth_date: string | null;

    @Column({ length: 191, nullable: true })
    address: string | null;

    @Column({ length: 191, nullable: true })
    nip: string | null;

    @Column({ length: 191, nullable: true })
    npwp: string | null;

    @Column({ length: 191, nullable: true })
    ktp: string | null;

    @Column({ type: 'timestamp', nullable: true })
    email_verified_at: Date | null;

    @Column({ length: 191, nullable: true, comment: 'Hash from 6 Number' })
    otp_verification: string | null;

    @Column({ type: 'timestamp', nullable: true, comment: 'Until when OTP is valid.' })
    otp_timeout: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    user_verified_at: Date | null;

    @Column({ length: 191, nullable: true })
    user_verified_by: string | null;

    @Column({ nullable: true })
    rememberToken: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Role, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column({ enum: ['M', 'F'], nullable: true })
    gender: string | null;

    @Column({ length: 191, nullable: true })
    phone: string | null;

    @Column({ length: 191, nullable: true })
    digisign_status: string | null;

    @Column({ length: 191, nullable: true })
    foto_ktp: string | null;
}
