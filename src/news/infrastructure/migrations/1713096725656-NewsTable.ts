import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NewsTable1713096725656 implements MigrationInterface {
    name = 'NewsTable1713096725656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "news"
            ADD CONSTRAINT "FK_b547f30311ac623e7005a17711d" FOREIGN KEY ("imageFileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "news" DROP CONSTRAINT "FK_b547f30311ac623e7005a17711d"
        `);
    }
}
