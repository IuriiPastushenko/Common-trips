import { MigrationInterface, QueryRunner } from "typeorm";

export class createFindCustomers1680079081538 implements MigrationInterface {
    name = 'createFindCustomers1680079081538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "сar_name" TO "car_name"`);
        await queryRunner.query(`CREATE TABLE "findcustomers" ("id" SERIAL NOT NULL, "date_find" TIMESTAMP NOT NULL DEFAULT now(), "finderid" integer, "objectid" integer, CONSTRAINT "PK_329ff07ae9eecd4cb4480291d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "findcustomers" ADD CONSTRAINT "FK_daa65557fd694248eb6e7562934" FOREIGN KEY ("finderid") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "findcustomers" ADD CONSTRAINT "FK_fbd8bc532b150b3400415f16e1c" FOREIGN KEY ("objectid") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "findcustomers" DROP CONSTRAINT "FK_fbd8bc532b150b3400415f16e1c"`);
        await queryRunner.query(`ALTER TABLE "findcustomers" DROP CONSTRAINT "FK_daa65557fd694248eb6e7562934"`);
        await queryRunner.query(`DROP TABLE "findcustomers"`);
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "car_name" TO "сar_name"`);
    }

}
