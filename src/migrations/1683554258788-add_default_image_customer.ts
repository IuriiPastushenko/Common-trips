import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultImageCustomer1683554258788 implements MigrationInterface {
    name = 'AddDefaultImageCustomer1683554258788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "image" SET DEFAULT 'src/upload/Default-68107.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "image" SET DEFAULT ''`);
    }

}
