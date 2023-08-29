import { ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Tree, TreeParent, TreeChildren } from 'typeorm';
import { Permission } from './permission.entity';

@Entity('roles')
@Tree('nested-set')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @TreeParent()
    parent: Role;

    @TreeChildren()
    children: Role[];

    @Column({ length: 191 })
    name: string;

    @Column({ default: false })
    is_position: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column({ nullable: true })
    _lft: number;

    @Column({ nullable: true })
    _rgt: number;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'role_permission',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
    })
    permissions: Permission[];

}
