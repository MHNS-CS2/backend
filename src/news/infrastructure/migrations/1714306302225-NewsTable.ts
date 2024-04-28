import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NewsTable1714306302225 implements MigrationInterface {
    name = 'NewsTable1714306302225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_835568c3cf4b88950669847a4c" ON "news_file" ("newsId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_618fc0571d9bb8a67849466c6c" ON "news_file" ("fileId")
        `);
        await queryRunner.query(`
            ALTER TABLE "news_file"
            ADD CONSTRAINT "FK_835568c3cf4b88950669847a4c7" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "news_file"
            ADD CONSTRAINT "FK_618fc0571d9bb8a67849466c6cb" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "news_file" DROP CONSTRAINT "FK_618fc0571d9bb8a67849466c6cb"
        `);
        await queryRunner.query(`
            ALTER TABLE "news_file" DROP CONSTRAINT "FK_835568c3cf4b88950669847a4c7"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_618fc0571d9bb8a67849466c6c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_835568c3cf4b88950669847a4c"
        `);
    }
}
