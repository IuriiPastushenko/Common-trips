import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelatonshipsCustomerStatisticFind1679738036130 implements MigrationInterface {
    name = 'addRelatonshipsCustomerStatisticFind1679738036130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "findCustomers" ("id" SERIAL NOT NULL, "finddAt" TIMESTAMP NOT NULL DEFAULT now(), "idFinderId" integer, "idFindObjectId" integer, CONSTRAINT "PK_89813d4623553af6d5e2dde5c21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "findCustomers" ADD CONSTRAINT "FK_84536bcadd988bc26335f34cedd" FOREIGN KEY ("idFinderId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "findCustomers" ADD CONSTRAINT "FK_4e557a4c95d4931ecb918c1bbbc" FOREIGN KEY ("idFindObjectId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "findCustomers" DROP CONSTRAINT "FK_4e557a4c95d4931ecb918c1bbbc"`);
        await queryRunner.query(`ALTER TABLE "findCustomers" DROP CONSTRAINT "FK_84536bcadd988bc26335f34cedd"`);
        await queryRunner.query(`DROP TABLE "findCustomers"`);
    }

}
