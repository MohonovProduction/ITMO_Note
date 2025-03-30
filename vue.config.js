module.exports = {
    publicPath: '/ITMO_Note/',
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
};