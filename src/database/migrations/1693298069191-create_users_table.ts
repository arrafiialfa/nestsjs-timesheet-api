import { MigrationInterface, QueryRunner, TableForeignKey, Table } from "typeorm"

export class CreateUsersTable1693298069191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "comment", type: "text" },
                { name: "name", type: "varchar(191)" },
                { name: "email", type: "varchar(191)" },
                { name: "password", type: "varchar(191)" },
                { name: "avatar", type: "varchar(191)", isNullable: true },
                { name: "birth_place", type: "varchar(191)", isNullable: true },
                { name: "birth_date", type: "date", isNullable: true },
                { name: "address", type: "varchar(191)", isNullable: true },
                { name: "nip", type: "varchar(191)", isNullable: true },
                { name: "npwp", type: "varchar(191)", isNullable: true },
                { name: "ktp", type: "varchar(191)", isNullable: true },
                { name: "email_verified_at", type: "timestamp", isNullable: true },
                { name: "otp_verification", type: "varchar(191)", isNullable: true, comment: 'Hash from 6 Number' },
                { name: "otp_timeout", type: "timestamp", isNullable: true, comment: 'Until when OTP is valid.' },
                { name: "user_verified_at", type: "timestamp", isNullable: true },
                { name: "user_verified_by", type: "varchar(191)", isNullable: true },
                { name: "rememberToken", type: "varchar(255)" },
                { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "deleted_at", type: "timestamp", isNullable: true },
                { name: "password_changed_at", type: "timestamp", isNullable: true },
                { name: "role_id", type: "int" },
                { name: "gender", type: "enum", enum: ["M", "F"], isNullable: true },
                { name: "phone", type: "varchar(191)", isNullable: true },
                { name: "digisign_status", type: "varchar(191)", isNullable: true },
                { name: "foto_ktp", type: "varchar(191)", isNullable: true },
            ],
        }), true);

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "role", // Replace with your actual Role table name
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("role_id") !== -1);
        await queryRunner.dropForeignKey("users", foreignKey);
        await queryRunner.dropTable("users");
    }

}
