import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NotifierSendLogTable1712678424813 implements MigrationInterface {
    name = 'NotifierSendLogTable1712678424813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "notifier_send_log" (
                "id" SERIAL NOT NULL,
                "provider" character varying NOT NULL,
                "status" character varying NOT NULL,
                "createTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_7bea2d05d8966010a87abb70025" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "notifier_send_log"
        `);
    }
}
