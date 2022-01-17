// postcss.config.js
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            // 根据设计稿的宽度来进行决定
            // 如果设计稿的设计宽度为375 则设为37.5
            // 如果设计稿的设计宽度为750 则设为750
            rootValue: 37.5,
            propList: ['*'],
        },
    },
};