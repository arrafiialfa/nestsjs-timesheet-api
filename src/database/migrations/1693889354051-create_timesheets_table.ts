import { MigrationInterface, QueryRunner, Table, TableForeignKey, } from "typeorm"

export class CreateTimesheetsTable1693889354051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'timesheets',
            columns: [
                { name: 'id', type: 'serial4', isPrimary: true },
                { name: 'user_id', type: 'int', isNullable: true },
                { name: 'site_inspector', type: 'int', isNullable: true },
                { name: 'checker_2', type: 'int', isNullable: true },
                { name: 'status', type: 'varchar', length: '191' },
                { name: 'period', type: 'timestamp', isNullable: true },
                { name: 'created_at', type: 'timestamp', default: 'now()' },
                { name: 'updated_at', type: 'timestamp', default: 'now()' },
                { name: 'deleted_at', type: 'timestamp', isNullable: true },
            ],
        }));

        // Add foreign key constraints
        await queryRunner.createForeignKey('timesheets', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
        }));
        await queryRunner.createForeignKey('timesheets', new TableForeignKey({
            columnNames: ['site_inspector'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
        }));
        await queryRunner.createForeignKey('timesheets', new TableForeignKey({
            columnNames: ['checker_2'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints first
        await queryRunner.dropForeignKey('timesheets', 'FK_timesheets_user_id');
        await queryRunner.dropForeignKey('timesheets', 'FK_timesheets_site_inspector');
        await queryRunner.dropForeignKey('timesheets', 'FK_timesheets_checker_2');

        // Drop the table
        await queryRunner.dropTable('timesheets');
    }

}
