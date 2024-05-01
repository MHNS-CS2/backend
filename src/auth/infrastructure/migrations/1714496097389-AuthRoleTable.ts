import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class AuthRoleTable1714496097389 implements MigrationInterface {
    name = 'AuthRoleTable1714496097389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_role_user" DROP CONSTRAINT "FK_fe08e1de61a95f0c1c1b6d3a7bc"
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_user"
            ADD CONSTRAINT "FK_fe08e1de61a95f0c1c1b6d3a7bc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_role_user" DROP CONSTRAINT "FK_fe08e1de61a95f0c1c1b6d3a7bc"
        `);
        await queryRunner.query(`
            ALTER TABLE "auth_role_user"
            ADD CONSTRAINT "FK_fe08e1de61a95f0c1c1b6d3a7bc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }
}
