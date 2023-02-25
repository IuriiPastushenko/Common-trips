import { MigrationInterface, QueryRunner } from "typeorm";

export class createTripsCustomers1677312995698 implements MigrationInterface {
    name = 'createTripsCustomers1677312995698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "secondName" character varying NOT NULL, "gender" character varying, "yearOfBirth" integer, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', "сarName" character varying, "yearOfManufactureOfTheMachine" integer, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_3e418bff40d3abac5642cd5d398" UNIQUE ("phoneNumber"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trips" ("id" SERIAL NOT NULL, "startpoint" character varying NOT NULL, "startlng" integer NOT NULL, "startlat" integer NOT NULL, "startdate" TIMESTAMP NOT NULL, "finishpoint" character varying NOT NULL, "finishlng" integer NOT NULL, "finishlat" integer NOT NULL, "finishdate" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "driverID" integer NOT NULL, "maxpassengers" integer NOT NULL, "passengersID" text NOT NULL, CONSTRAINT "PK_f71c231dee9c05a9522f9e840f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trips"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
