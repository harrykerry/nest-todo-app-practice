import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1758618418204 implements MigrationInterface {
  name = 'CreateUser1758618418204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "firstName" character varying NOT NULL, "lastName" character varying, "username" character varying NOT NULL, "emailAddress" character varying, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
