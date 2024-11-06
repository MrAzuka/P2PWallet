import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1730936081037 implements MigrationInterface {
    name = 'CreateUser1730936081037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "phone_number" character varying NOT NULL,
                "address" character varying NOT NULL,
                "date_of_birth" date NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
