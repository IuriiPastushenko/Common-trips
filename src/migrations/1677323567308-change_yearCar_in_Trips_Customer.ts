import { MigrationInterface, QueryRunner } from "typeorm";

export class changeYearCarInTripsCustomer1677323567308 implements MigrationInterface {
    name = 'changeYearCarInTripsCustomer1677323567308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "yearOfManufactureOfTheMachine" TO "yearOfManufactureOfTheCar"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "yearOfManufactureOfTheCar" TO "yearOfManufactureOfTheMachine"`);
    }

}
