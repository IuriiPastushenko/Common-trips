import { MigrationInterface, QueryRunner } from "typeorm";

export class createTripsDriversPassengers1677239473250 implements MigrationInterface {
    name = 'createTripsDriversPassengers1677239473250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "drivers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "secondName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', "сarName" character varying NOT NULL, "yearOfManufactureOfTheMachine" integer NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_d4cfc1aafe3a14622aee390edb2" UNIQUE ("email"), CONSTRAINT "UQ_a83b197c2a07072bb8b52b7f02d" UNIQUE ("phoneNumber"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passengers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "secondName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "UQ_d8cb0a34a1c6e3defee95d435a6" UNIQUE ("email"), CONSTRAINT "UQ_3ffef05316c5e1cfac5856ffb34" UNIQUE ("phoneNumber"), CONSTRAINT "PK_9863c72acd866e4529f65c6c98c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trips" ("id" SERIAL NOT NULL, "startpoint" character varying NOT NULL, "startlng" integer NOT NULL, "startlat" integer NOT NULL, "startdate" TIMESTAMP NOT NULL, "finishpoint" character varying NOT NULL, "finishlng" integer NOT NULL, "finishlat" integer NOT NULL, "finishdate" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "driverID" integer NOT NULL, "maxpassengers" integer NOT NULL, "passengersID" text NOT NULL, CONSTRAINT "PK_f71c231dee9c05a9522f9e840f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trips"`);
        await queryRunner.query(`DROP TABLE "passengers"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
    }

}
