const env = process.env.NODE_ENV;
const entry = ((_env) => {
    switch (env) {
        case 'production':
            return {'dist/twitterLikeImage': './src/ts/twitterLikeImage.ts'};
        case 'development':
            return {'sample/twitterLikeImage': './src/ts/twitterLikeImage.ts'};
        default:
            return {'sample/twitterLikeImage': './src/ts/twitterLikeImage.ts'};
    }
})(env);

module.exports = {
    mode: env,
    entry,
    output: {
        filename: '[name].js',
        path: __dirname,
        globalObject: 'this',
        library: {
            name: 'TwitterLikeImage',
            type: 'umd',
            export: 'default',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};