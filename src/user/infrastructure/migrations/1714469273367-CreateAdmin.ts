import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class CreateAdmin1714469273367 implements MigrationInterface {
    name = 'CreateAdmin1714469273367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const adminId = (await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('user', [
                'login',
                'passwordHash',
                'updateTime',
                'createTime',
            ])
            .values({
                login: 'RaayNoff',
                passwordHash: '$2a$12$4kDIEKREfC3PiMBFWYyMnOGkzfrKfsXoSteIs8Xb/M.qQ1WokbhYi',
                updateTime: new Date(),
                createTime: new Date(),
            })
            .execute()).identifiers[0].id;


        await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('auth_role_user')
            .values({
                authRoleId: 3,
                userId: adminId,
            })

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const adminId = (await queryRunner.manager.createQueryBuilder()
            .delete()
            .from('user')
            .where({
                login: 'RaayNoff',
            })
            .execute())[0].id;

        await queryRunner.manager.createQueryBuilder()
            .delete()
            .from('auth_role_user')
            .where({
                authRoleId: 3,
                userId: adminId,
            })
    }
}
