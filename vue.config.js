const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    publicPath: '/ITMO_Note/', // Replace 'your-repo-name' with your actual repository name
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
});