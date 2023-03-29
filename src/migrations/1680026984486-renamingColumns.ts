import { MigrationInterface, QueryRunner } from "typeorm";

export class renamingColumns1680026984486 implements MigrationInterface {
    name = 'renamingColumns1680026984486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "findcustomers" ("id" SERIAL NOT NULL, "date_find" TIMESTAMP NOT NULL DEFAULT now(), "finder_id" integer, "object_id" integer, "finderId" integer, "objectId" integer, CONSTRAINT "PK_329ff07ae9eecd4cb4480291d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "findcustomers" ADD CONSTRAINT "FK_daa65557fd694248eb6e7562934" FOREIGN KEY ("finderId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "findcustomers" ADD CONSTRAINT "FK_fbd8bc532b150b3400415f16e1c" FOREIGN KEY ("objectId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "findcustomers" DROP CONSTRAINT "FK_fbd8bc532b150b3400415f16e1c"`);
        await queryRunner.query(`ALTER TABLE "findcustomers" DROP CONSTRAINT "FK_daa65557fd694248eb6e7562934"`);
        await queryRunner.query(`DROP TABLE "findcustomers"`);
    }

}
