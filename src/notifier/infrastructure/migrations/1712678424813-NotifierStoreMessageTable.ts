import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NotifierStoreMessageTable1712678424813 implements MigrationInterface {
    name = 'NotifierStoreMessageTable1712678424813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "notifier_message" (
                "id" SERIAL NOT NULL,
                "refId" integer,
                "templateName" character varying,
                "templateParams" character varying,
                "content" character varying NOT NULL,
                "isRead" boolean NOT NULL DEFAULT false,
                "receiverId" integer NOT NULL,
                "createTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_23617c689db54c587bc3bb94f60" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "notifier_message"
        `);
    }
}
