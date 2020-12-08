const appRootDir = require('app-root-dir')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StatsWebpackPlugin = require('stats-webpack-plugin')
// const autoprefixer = require('autoprefixer')
const jsonStableStringify = require('json-stable-stringify')
const xxHash = require('xxhashjs')
const notifier = require('node-notifier')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin').WorkboxPlugin
// const threadLoader = require('thread-loader')
const Dotenv = require('dotenv-webpack')
// const CircularDependencyPlugin = require("circular-dependency-plugin");
// const ManifestPlugin = require("webpack-manifest-plugin");

var clusterWorkerSize = require('os').cpus().length

const DIST_NAME = 'dist'

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const IS_PRODUCTION = NODE_ENV === 'production'
const IS_LOCAL = !!process.env.LOCAL
const PUBLIC_PATH = !IS_PRODUCTION || IS_LOCAL ? '/' : process.env.ASSETS_URL

const hash = str => xxHash.h32(jsonStableStringify(str), 0).toString(16)

const devEntries = !IS_PRODUCTION ? ['webpack-hot-middleware/client'] : []
const devPlugin = !IS_PRODUCTION
  ? [new webpack.HotModuleReplacementPlugin()]
  : [
      new InjectManifest({
        swSrc: path.resolve(appRootDir.get(), 'src', 'sw.js'),
        swDest: path.resolve(appRootDir.get(), DIST_NAME, 'public/sw.js'),
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }),
    ]

const config = {
  mode: !IS_PRODUCTION ? 'development' : 'production',
  name: 'client',
  context: path.join(appRootDir.get()),
  entry: {
    // client: [...devEntries, '@babel/polyfill/noConflict', './kit/client/index.js'],
    client: [...devEntries, './kit/client/index.js'],
  },
  output: {
    path: path.join(appRootDir.get(), DIST_NAME, 'client'),
    filename: !IS_PRODUCTION ? '[name].js' : '[name].js',
    sourceMapFilename: !IS_PRODUCTION ? '[name].map.js' : '[name].map.js',
    chunkFilename: !IS_PRODUCTION ? 'chunks/[name].js' : 'chunks/[name].[chunkhash].chunk.js',
    publicPath: PUBLIC_PATH,
    pathinfo: !IS_PRODUCTION,
  },
  module: {
    rules: [
      // {
      // 	enforce: 'pre',
      // 	test: /\.(js|jsx)$/,
      // 	exclude: /node_modules/,
      // 	loader: 'eslint-loader',
      // 	options: {
      // 		reporter: 'consola',
      // 		formatter: 'codeframe',
      // 		// formatter: 'stylish',
      // 		// formatter: 'compact',
      // 		// formatter: 'table',
      // 		cache: true
      // 	}
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: {
              workers: clusterWorkerSize,
              poolTimeout: !IS_PRODUCTION ? Infinity : 2000,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ].filter(Boolean),
      },
      // {
      // 	test: /\.(js|mjs)$/,
      // 	include: '/node_modules/',
      // 	exclude: /@babel(?:\/|\\{1,2})runtime/,
      // 	loader: 'babel-loader',
      // 	options: {
      // 		babelrc: false,
      // 		configFile: false,
      // 		compact: false,
      // 		presets: [[require.resolve('babel-preset-react-app/dependencies'), { helpers: true }]],
      // 		cacheDirectory: true,
      // 		cacheCompression: false,
      // 		sourceMaps: !IS_PRODUCTION,
      // 		inputSourceMap: !IS_PRODUCTION
      // 	}
      // },
      {
        test: /\.(scss|css)$/,
        include: [path.join(appRootDir.get(), 'src'), path.join(appRootDir.get(), 'css')],
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hmr: !IS_PRODUCTION,
              // reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: !IS_PRODUCTION
                  ? '[name]_[local]_[hash:base64:3]'
                  : '[local]_[hash:base64:3]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: !IS_PRODUCTION
              ? {
                  sourceMap: true,
                }
              : undefined,
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !IS_PRODUCTION,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: !IS_PRODUCTION
                  ? '[name]_[local]_[hash:base64:3]'
                  : '[local]_[hash:base64:3]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: !IS_PRODUCTION
              ? {
                  sourceMap: true,
                }
              : undefined,
          },
        ],
      },
      {
        test: /.*\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif|ico|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              // name: 'images/[hash].[ext]',
              limit: 10000,
            },
          },
          // ({ resource }) => ({
          //   loader: 'image-webpack-loader',
          //   options: {
          //     bypassOnDebug: true,
          //     mozjpeg: {
          //       quality: [0.85, 0.95],
          //     },
          //     pngquant: {
          //       quality: [0.85, 0.95],
          //       speed: 1,
          //     },
          //     svgo: {
          //       plugins: [
          //         {
          //           cleanupIDs: {
          //             prefix: hash(path.relative(appRootDir.get(), resource)),
          //             minify: true,
          //             remove: true,
          //           },
          //         },
          //       ],
          //     },
          //   },
          // }),
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        options: {
          name: 'videos/[name].[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(aac|m4a|mp3|oga|ogg|wav)$/,
        loader: 'url-loader',
        options: {
          name: 'sounds/[name].[hash].[ext]',
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.join(appRootDir.get(), 'src')],
    extensions: ['.css', '.scss', '.mjs', '.js', '.jsx', '.json', '.gql'],
    alias: {
      'react-dom': !IS_PRODUCTION
        ? path.resolve(appRootDir.get(), 'node_modules', '@hot-loader', 'react-dom')
        : path.resolve(appRootDir.get(), 'node_modules', 'react-dom'),
      react: path.resolve(appRootDir.get(), 'node_modules', 'react'),
      '@material-ui/core': path.resolve(appRootDir.get(), 'node_modules', '@material-ui/core'),
      kit: path.resolve(appRootDir.get(), 'kit'),
      src: path.resolve(appRootDir.get(), 'src'),
      public: path.resolve(appRootDir.get(), 'public'),
      components: !IS_PRODUCTION
        ? '@joseirrazabal/nxbook/lib'
        : // ? '@joseirrazabal/nxbook/components'
          '@joseirrazabal/nxbook/components',
      '@emmaterial': path.resolve(appRootDir.get(), 'src', 'emmaterial'),
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: IS_PRODUCTION,
    }),
    ...devPlugin,
    new LoadablePlugin(),
    new CompressionPlugin({
      compressionOptions: { level: 1 },
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.argv.slice(-1)[0] === '-stats' ? 'static' : 'disable',
      // analyzerMode: 'static',
    }),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      process: {},
      'process.env': {
        VERSION: JSON.stringify(process.env.npm_package_version),
        BROWSER: true,
      },
      'process.browser': true,
    }),
    new StatsWebpackPlugin(`../client-stats.json`, {
      chunkModules: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new ManifestPlugin({
    //   fileName: "client-manifest.json",
    //   publicPath: PUBLIC_PATH,
    //   filter: ({ path: filePath }) => !filePath.endsWith(".map.js")
    // }),
    // new CircularDependencyPlugin({
    //   exclude: /node_modules/,
    //   failOnError: true
    // }),
    new MiniCssExtractPlugin({
      filename: !IS_PRODUCTION ? '[name].css' : '[name].[fullhash].css',
      chunkFilename: !IS_PRODUCTION ? '[id].css' : '[id].[fullhash].css',
    }),
    // para obtener el css que se usa al inicio (se crea archivo dist/client/index.html) copiar a server/html
    // new HtmlWebpackPlugin(),
    // new HtmlCriticalWebpackPlugin({
    // 	base: path.resolve(appRootDir.get(), 'dist', 'client'),
    // 	src: 'index.html',
    // 	dest: 'index.html',
    // 	inline: true,
    // 	minify: true,
    // 	extract: true,
    // 	width: 375,
    // 	height: 565,
    // 	penthouse: {
    // 		blockJSRequests: false
    // 	}
    // }),
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return
        }
        const error = errors[0]
        notifier.notify({
          title: 'Webpack error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          // icon: ICON
        })
      },
      compilationSuccessInfo: {
        messages: [`<< 🚀 >> ${process.env.APP_HOST}:${process.env.APP_PORT}`],
      },
      // clearConsole: false
    }),
  ],
  devtool: IS_PRODUCTION ? false : 'eval-cheap-module-source-map',
  target: 'web',
  externals: {},
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  bail: IS_PRODUCTION,
  performance: {
    maxEntrypointSize: 5500000, // warning de archivo grande
    maxAssetSize: 900000,
  },
  optimization: {
    minimize: IS_PRODUCTION,
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
        // cache: true,
        parallel: true,
      }),
    ],
    emitOnErrors: !IS_PRODUCTION,
    moduleIds: 'named',
    concatenateModules: IS_PRODUCTION,
    splitChunks: {
      maxSize: 800000,
      // minSize: 500000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        default: false,
        // vendors: false,
        react: {
          test: /node_modules\/(react|react-dom)\//,
          name: 'react',
          reuseExistingChunk: true,
          chunks: 'all',
        },
        commons: {
          name: 'common',
          test: /node_modules/,
          chunks: 'all',
          reuseExistingChunk: true,
          minChunks: 2,
        },
        defaultVendors: {
          name: 'initial',
          chunks: 'all',
          reuseExistingChunk: true,
          minChunks: 3,
        },
      },
    },
  },
}

module.exports = config
