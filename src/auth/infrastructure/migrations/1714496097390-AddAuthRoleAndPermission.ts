import {MigrationInterface, QueryRunner} from '@steroidsjs/typeorm';

export class AddAuthRoleAndPermission1714496097390 implements MigrationInterface {
    name = 'AddAuthRole1714496097390';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const superAdminRoleId = (await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('auth_role')
            .values({
                name: 'super_admin',
                title: 'Супер администратор',
                description: 'Администратор с самым высоким приоритетом',
                isActive: true,
            })
            .execute())
            .identifiers[0].id;

        const superAdminPermissionsIds = (await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('auth_permission')
            .values(
                [
                    {
                        name: 'admin_permission',
                    },
                    {
                        name: 'auth_manage_news_view',
                    },
                    {
                        name: 'auth_manage_news_edit',
                    }
                ]
            )
            .execute())
            .identifiers;

        await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('auth_role_auth_permission')
            .values(
                superAdminPermissionsIds.map((permissionId) => ({
                    authRoleId: superAdminRoleId,
                    authPermissionId: permissionId.id,
                }))
            )
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const superAdminRoleId = (await queryRunner.manager.createQueryBuilder()
            .from('auth_role', 'ar')
            .where({
                name: 'super_admin',
            })
            .execute())[0].id;

        const superAdminPermissions = ['admin_permission', 'auth_manage_news_view', 'auth_manage_news_edit']
        const superAdminPermissionsIds = [];

        for (const permission of superAdminPermissions) {
            const permissionId = (await queryRunner.manager.createQueryBuilder().from('auth_permission', 'ap')
                .where({
                    name: permission
                })
                .execute()).identifiers[0].id

            superAdminPermissionsIds.push(permissionId)
        }

        for (const permissionId of superAdminPermissionsIds) {
            await queryRunner.manager.createQueryBuilder()
                .delete()
                .from('auth_role_auth_permission')
                .where({
                    authRoleId: superAdminRoleId,
                    authPermissionId: permissionId,
                })
                .execute();
        }

        await queryRunner.manager.createQueryBuilder()
            .delete()
            .from('auth_role')
            .where({
                id: superAdminRoleId,
            })
            .execute();


        for (const permissionId of superAdminPermissionsIds) {
            await queryRunner.manager.createQueryBuilder()
                .delete()
                .from('auth_permission')
                .where({
                    id: permissionId,
                })
                .execute();
        }
    }
}

