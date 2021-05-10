const env = process.env.NODE_ENV;
const entry = ((_env) => {
    switch (env) {
        case 'production':
            return {'dist/twitterLikeImageViewer': './src/ts/twitterLikeImageViewer.ts'};
        case 'development':
            return {'sample/twitterLikeImageViewer': './src/ts/twitterLikeImageViewer.ts'};
        default:
            return {'sample/twitterLikeImageViewer': './src/ts/twitterLikeImageViewer.ts'};
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
            name: 'TwitterLikeImageViewer',
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