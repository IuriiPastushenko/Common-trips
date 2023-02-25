import { MigrationInterface, QueryRunner } from "typeorm";

export class changePhoneNumberInCustomer1677321339531 implements MigrationInterface {
    name = 'changePhoneNumberInCustomer1677321339531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_3e418bff40d3abac5642cd5d398"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_3e418bff40d3abac5642cd5d398" UNIQUE ("phoneNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_3e418bff40d3abac5642cd5d398"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "phoneNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_3e418bff40d3abac5642cd5d398" UNIQUE ("phoneNumber")`);
    }

}
