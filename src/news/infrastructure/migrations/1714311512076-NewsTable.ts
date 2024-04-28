import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NewsTable1714311512076 implements MigrationInterface {
    name = 'NewsTable1714311512076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "news"
            ADD "createTime" TIMESTAMP(0) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "news"
            ADD "updateTime" TIMESTAMP(0) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "news" DROP COLUMN "updateTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "news" DROP COLUMN "createTime"
        `);
    }
}
