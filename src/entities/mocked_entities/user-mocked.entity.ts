import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'users' })
export class UserMocked {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 191 })
    name: string;

    @Column({ length: 191, unique: true })
    email: string;

    @Column({ length: 191 })
    password: string;

}
