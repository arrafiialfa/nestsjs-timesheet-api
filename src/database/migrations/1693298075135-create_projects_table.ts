import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateProjectsTable1693298075135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "projects",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "contract_number", type: "varchar(191)" },
                { name: "name", type: "varchar(191)" },
                { name: "value", type: "double precision", precision: 32, scale: 2 },
                { name: "unit_owner_id", type: "int", isNullable: true },
                { name: "upp_id", type: "int", isNullable: true },
                { name: "contractor_id", type: "int", isNullable: true },
                { name: "start_date", type: "datetime" },
                { name: "cut_off_date", type: "datetime", isNullable: true },
                { name: "effective_date", type: "datetime", isNullable: true },
                { name: "finish_date", type: "datetime" },
                { name: "document_id", type: "int", isNullable: true },
                { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "deleted_at", type: "timestamp", isNullable: true },
                { name: "level", type: "varchar(30)", isNullable: true },
                { name: "pic_project_id", type: "int", isNullable: true },
                { name: "related_role_owner_id", type: "int", isNullable: true },
                { name: "related_role_upp_id", type: "int", isNullable: true },
                { name: "consultant_id", type: "int", isNullable: true },
            ],
        }), true);

        await queryRunner.createForeignKey("projects", new TableForeignKey({
            columnNames: ["unit_owner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("projects", new TableForeignKey({
            columnNames: ["upp_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("projects", new TableForeignKey({
            columnNames: ["contractor_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("projects", new TableForeignKey({
            columnNames: ["document_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "documents",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("projects", new TableForeignKey({
            columnNames: ["pic_project_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("projects", new TableForeignKey({
            columnNames: ["related_role_owner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("projects", new TableForeignKey({
            columnNames: ["related_role_upp_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("projects", new TableForeignKey({
            columnNames: ["consultant_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("projects");
        const foreignKeys = table.foreignKeys;

        for (const foreignKey of foreignKeys) {
            await queryRunner.dropForeignKey("projects", foreignKey);
        }

        await queryRunner.dropTable("projects");
    }

}
