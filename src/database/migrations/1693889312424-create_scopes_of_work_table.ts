import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateScopesOfWorkTable1693889312424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'scopes_of_work',
            columns: [
                { name: 'id', type: 'serial4', isPrimary: true },
                { name: 'name', type: 'varchar', length: '191' },
                { name: 'description', type: 'text' },
                { name: 'created_at', type: 'timestamp', default: 'now()' },
                { name: 'updated_at', type: 'timestamp', default: 'now()' },
                { name: 'deleted_at', type: 'timestamp', isNullable: true },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('scopes_of_work');
    }

}
