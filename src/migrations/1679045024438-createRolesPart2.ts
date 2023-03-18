import { MigrationInterface, QueryRunner } from "typeorm";

export class createRolesPart21679045024438 implements MigrationInterface {
    name = 'createRolesPart21679045024438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "roles" text NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "roles"`);
    }

}
