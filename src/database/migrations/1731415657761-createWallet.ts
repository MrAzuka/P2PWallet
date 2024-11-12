import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWallet1731415657761 implements MigrationInterface {
    name = 'CreateWallet1731415657761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "wallet" (
                "wallet_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "currency" character varying NOT NULL DEFAULT 'NGN',
                "balance" numeric(10, 2) NOT NULL DEFAULT '0',
                "user_id" uuid,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "REL_72548a47ac4a996cd254b08252" UNIQUE ("user_id"),
                CONSTRAINT "PK_8de7b77bd9e13f461f65937f67a" PRIMARY KEY ("wallet_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "wallet"
            ADD CONSTRAINT "FK_72548a47ac4a996cd254b082522" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "wallet" DROP CONSTRAINT "FK_72548a47ac4a996cd254b082522"
        `);
        await queryRunner.query(`
            DROP TABLE "wallet"
        `);
    }

}
