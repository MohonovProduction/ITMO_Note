const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? '/ITMO_Note/' : '/',   
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
});