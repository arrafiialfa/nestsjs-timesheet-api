import { ManyToMany, JoinTable, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Tree, TreeParent, TreeChildren } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
@Tree('nested-set')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @TreeParent()
    parent: Permission;

    @TreeChildren()
    children: Permission[];

    @Column({ length: 191, unique: true })
    slug: string;

    @Column({ length: 191 })
    name: string;

    @Column({ length: 191, nullable: true })
    group: string | null;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'role_permission',
        joinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];
}
