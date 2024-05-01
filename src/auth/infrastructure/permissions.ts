export const PERMISSION_AUTH_MANAGE_NEWS_VIEW = 'auth_manage_news_view';
export const PERMISSION_AUTH_MANAGE_NEWS_EDIT = 'auth_manage_news_edit';

export default [
    {
        id: PERMISSION_AUTH_MANAGE_NEWS_VIEW,
        label: 'Просмотр новостей',
        items: [
            {
                id: PERMISSION_AUTH_MANAGE_NEWS_EDIT,
                label: 'Редактирование новостей',
            },
        ],
    }
]