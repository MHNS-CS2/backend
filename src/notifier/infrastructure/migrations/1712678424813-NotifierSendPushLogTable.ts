import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NotifierSendPushLogTable1712678424813 implements MigrationInterface {
    name = 'NotifierSendPushLogTable1712678424813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "notifier_send_push_log" (
                "id" SERIAL NOT NULL,
                "sendLogId" integer,
                "messageId" character varying,
                "errorCode" character varying,
                "errorMessage" character varying,
                CONSTRAINT "REL_7382ca4632d6201461b57075c7" UNIQUE ("sendLogId"),
                CONSTRAINT "PK_05705a631d097f898e0d22f431a" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "notifier_send_push_log"
        `);
    }
}
