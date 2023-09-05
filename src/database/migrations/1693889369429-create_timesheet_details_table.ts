import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTimesheetDetailsTable1693889369429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'timesheet_details',
            columns: [
                { name: 'id', type: 'serial4', isPrimary: true },
                { name: 'timesheet_id', type: 'int', isNullable: true },
                { name: 'scope_of_work_id', type: 'int', isNullable: true },
                { name: 'project_id', type: 'int', isNullable: true },
                { name: 'weather', type: 'varchar', enum: ['sunshine', 'cloudy', 'partly cloudy', 'overcast', 'raining', 'snowing', 'foggy', 'thunder and lightning', 'windy'] },
                { name: 'manpower_qty', type: 'int', isNullable: true },
                { name: 'description', type: 'text' },
                { name: 'file_path', type: 'varchar', comment: 'Max. 2 filepath. Implode with |' },
                { name: 'date', type: 'timestamp' },
                { name: 'created_at', type: 'timestamp', default: 'now()' },
                { name: 'updated_at', type: 'timestamp', default: 'now()' },
                { name: 'deleted_at', type: 'timestamp', isNullable: true },
            ],
        }));

        // Add foreign key constraints
        await queryRunner.createForeignKey('timesheet_details', new TableForeignKey({
            columnNames: ['timesheet_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'timesheets',
        }));
        await queryRunner.createForeignKey('timesheet_details', new TableForeignKey({
            columnNames: ['scope_of_work_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'scopes_of_work',
        }));
        await queryRunner.createForeignKey('timesheet_details', new TableForeignKey({
            columnNames: ['project_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints first
        await queryRunner.dropForeignKey('timesheet_details', 'FK_timesheet_details_timesheet_id');
        await queryRunner.dropForeignKey('timesheet_details', 'FK_timesheet_details_scope_of_work_id');
        await queryRunner.dropForeignKey('timesheet_details', 'FK_timesheet_details_project_id');

        // Drop the table
        await queryRunner.dropTable('timesheet_details');
    }

}
