import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions{
    isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
        ],
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    '@babel/plugin-transform-runtime',
                    ['@babel/plugin-transform-typescript', { isTsx }],
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    };
}
