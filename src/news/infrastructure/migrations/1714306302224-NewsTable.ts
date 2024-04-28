import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NewsTable1714306302224 implements MigrationInterface {
    name = 'NewsTable1714306302224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "news" (
                "id" SERIAL NOT NULL,
                "title" text NOT NULL,
                "description" text NOT NULL,
                CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "news_file" (
                "newsId" integer NOT NULL,
                "fileId" integer NOT NULL,
                CONSTRAINT "PK_8ca4c40d66dbbe3ff6c320425b4" PRIMARY KEY ("newsId", "fileId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "news_file"
        `);
        await queryRunner.query(`
            DROP TABLE "news"
        `);
    }
}
