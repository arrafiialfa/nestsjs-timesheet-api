import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateRolesTable1693298014263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "parent_id", type: "int", isNullable: true },
                { name: "name", type: "varchar(191)" },
                { name: "is_position", type: "boolean", default: false },
                { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "deleted_at", type: "timestamp", isNullable: true },
                { name: "_lft", type: "int", isNullable: true },
                { name: "_rgt", type: "int", isNullable: true },
            ],
        }), true);

        await queryRunner.createForeignKey("roles", new TableForeignKey({
            columnNames: ["parent_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles", // Assuming your table is named "roles"
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("roles");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("parent_id") !== -1);
        await queryRunner.dropForeignKey("roles", foreignKey);
        await queryRunner.dropTable("roles");
    }

}
