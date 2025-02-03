import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1738586801301 implements MigrationInterface {
    name = 'InitialMigration1738586801301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tfg_schema"."usertype" ("ID" integer NOT NULL, "name" character varying(7) NOT NULL, CONSTRAINT "PK_47113a89a98503c3818ef2bbb7b" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "tfg_schema"."userdata" ("ID" integer NOT NULL, "username" character varying(15) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(72) NOT NULL, "type" integer NOT NULL, "date_creation" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_1f6923c97e23ce08d12eda7513" UNIQUE ("type"), CONSTRAINT "PK_dc8f1288a71af7b13a5452ad709" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "tfg_schema"."postdata" ("ID" integer NOT NULL, "text_content" json, "md_content" json, "date_creation" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b26737b7a7124bee7e53ea01ae0" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "tfg_schema"."authtoken" ("ID" integer NOT NULL, "token" character varying(500) NOT NULL, CONSTRAINT "PK_cea342c55cd51dc88d98ef056dd" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "tfg_schema"."usertype" ADD CONSTRAINT "FK_47113a89a98503c3818ef2bbb7b" FOREIGN KEY ("ID") REFERENCES "tfg_schema"."userdata"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tfg_schema"."userdata" ADD CONSTRAINT "FK_1f6923c97e23ce08d12eda7513b" FOREIGN KEY ("type") REFERENCES "tfg_schema"."usertype"("ID") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tfg_schema"."postdata" ADD CONSTRAINT "FK_b26737b7a7124bee7e53ea01ae0" FOREIGN KEY ("ID") REFERENCES "tfg_schema"."userdata"("ID") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tfg_schema"."authtoken" ADD CONSTRAINT "FK_cea342c55cd51dc88d98ef056dd" FOREIGN KEY ("ID") REFERENCES "tfg_schema"."userdata"("ID") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tfg_schema"."authtoken" DROP CONSTRAINT "FK_cea342c55cd51dc88d98ef056dd"`);
        await queryRunner.query(`ALTER TABLE "tfg_schema"."postdata" DROP CONSTRAINT "FK_b26737b7a7124bee7e53ea01ae0"`);
        await queryRunner.query(`ALTER TABLE "tfg_schema"."userdata" DROP CONSTRAINT "FK_1f6923c97e23ce08d12eda7513b"`);
        await queryRunner.query(`ALTER TABLE "tfg_schema"."usertype" DROP CONSTRAINT "FK_47113a89a98503c3818ef2bbb7b"`);
        await queryRunner.query(`DROP TABLE "tfg_schema"."authtoken"`);
        await queryRunner.query(`DROP TABLE "tfg_schema"."postdata"`);
        await queryRunner.query(`DROP TABLE "tfg_schema"."userdata"`);
        await queryRunner.query(`DROP TABLE "tfg_schema"."usertype"`);
    }

}
