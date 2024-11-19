import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPinRowToUserTable1732059558988 implements MigrationInterface {
    name = 'AddPinRowToUserTable1732059558988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "pin" character varying
        `);
        
        // Populate the column with valid values (you may run additional SQL or write logic to generate the pins)
        await queryRunner.query(`
            UPDATE "user"
            SET "pin" = '0000'
        `);
        
        // Make the column non-nullable
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "pin" SET NOT NULL
        `);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "pin"
        `);
    }

}
