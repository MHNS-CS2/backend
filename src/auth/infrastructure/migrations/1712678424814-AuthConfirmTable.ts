import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class AuthConfirmTable1712678424814 implements MigrationInterface {
    name = 'AuthConfirmTable1712678424814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_confirm"
            ADD CONSTRAINT "FK_a6f41f35d75e82871292e830547" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "auth_confirm" DROP CONSTRAINT "FK_a6f41f35d75e82871292e830547"
        `);
    }
}
