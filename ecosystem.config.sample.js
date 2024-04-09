module.exports = {
    apps: [{
        name: 'backend-nest-backend',
        script: 'dist/main.js',
        cwd: '/var/www/backend',
        error_file: '/var/www/backend/logs/nest-backend-error.log',
        out_file: '/var/www/backend/logs/nest-backend-out.log',
    }],
};
