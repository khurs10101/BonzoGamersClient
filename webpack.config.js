const path= require('path');

module.exports={
    mode: 'development',
    entry: './src/test/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    

    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname,'public'),
        historyApiFallback: true
    }
}