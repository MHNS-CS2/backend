import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class NotifierSendPushLogTable1712678424814 implements MigrationInterface {
    name = 'NotifierSendPushLogTable1712678424814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notifier_send_push_log"
            ADD CONSTRAINT "FK_7382ca4632d6201461b57075c7e" FOREIGN KEY ("sendLogId") REFERENCES "notifier_send_log"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "notifier_send_push_log" DROP CONSTRAINT "FK_7382ca4632d6201461b57075c7e"
        `);
    }
}
