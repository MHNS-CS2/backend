import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class AuthPermissionTable1712678424813 implements MigrationInterface {
    name = 'AuthPermissionTable1712678424813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "auth_permission" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_a7f146f631691c4a595af1dbf89" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "auth_permission"
        `);
    }
}
