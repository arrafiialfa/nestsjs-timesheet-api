import { ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Tree, TreeParent, TreeChildren, JoinColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity('roles')
@Tree('nested-set')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @TreeParent()
    @JoinColumn({ name: 'parent_id' })
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

    @Column({ nullable: true, name: '_lft' })
    left: number;

    @Column({ nullable: true, name: '_rgt' })
    right: number;

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
