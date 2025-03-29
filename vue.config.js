module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/ITMO_Note/'
        : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://185.72.145.216:5000',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end();
    },
};