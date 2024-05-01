import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class UserTable1714469273366 implements MigrationInterface {
    name = 'UserTable1714469273366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_8e1f623798118e629b46a9e6299"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "phone"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "login" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "passwordHash" text
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createTime" TIMESTAMP(0) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updateTime" TIMESTAMP(0) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updateTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "passwordHash"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "login"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "phone" character varying(20)
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone")
        `);
    }
}
