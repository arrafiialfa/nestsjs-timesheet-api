import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePermissionsTable1693298062208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "permissions",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "parent_id", type: "int", isNullable: true },
                { name: "slug", type: "varchar(191)", isUnique: true },
                { name: "name", type: "varchar(191)" },
                { name: "group", type: "varchar(191)", isNullable: true },
                { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "deleted_at", type: "timestamp", isNullable: true },
                { name: "_lft", type: "int", isNullable: true },
                { name: "_rgt", type: "int", isNullable: true },
            ],
        }), true);

        await queryRunner.createForeignKey("permissions", new TableForeignKey({
            columnNames: ["parent_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "permissions", // Assuming your table is named "permissions"
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("permissions");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("parent_id") !== -1);
        await queryRunner.dropForeignKey("permissions", foreignKey);
        await queryRunner.dropTable("permissions");
    }

}
