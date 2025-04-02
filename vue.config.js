const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    publicPath: '/your-repo-name/', // Replace 'your-repo-name' with your actual repository name
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
});