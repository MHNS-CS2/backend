import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NewsTable1713096725655 implements MigrationInterface {
    name = 'NewsTable1713096725655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "news" (
                "id" SERIAL NOT NULL,
                "title" text NOT NULL,
                "description" text NOT NULL,
                "imageId" integer,
                "imageFileId" integer,
                CONSTRAINT "REL_b547f30311ac623e7005a17711" UNIQUE ("imageFileId"),
                CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "news"
        `);
    }
}
