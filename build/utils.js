'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

const CHUNK_SEP = '.'
const PATH_SEP = path.sep

//入口文件
const ENTRY_JS = 'entry.js'
//入口模板
const ENTRY_TMPL = 'entry.html'
//默认模板
const DEFAULT_TMPL = 'index.html'


/*遍历目录获取指定文件*/
function _getFilesByName(rootDir, fileName) {
    let fileList = []

    let walk = (_path) => {
        let files = fs.readdirSync(_path)

        files.forEach((file) => {
            let tmpPath = _path + PATH_SEP + file
            let stats = fs.statSync(tmpPath)

            if (stats.isDirectory()) {
                walk(tmpPath)
            } else {
                let ext = path.extname(tmpPath)

                if(file === fileName){
                    fileList.push(tmpPath)
                }
            }
        })
    }

    walk(rootDir)

    return fileList
}

/*获取入口文件相关数据*/
function _getEntryFiles(){
    let pagesPath = path.join(__dirname, '../src/pages')

    let entryFiles = _getFilesByName(pagesPath, ENTRY_JS)

    let ary = []

    entryFiles.forEach((filePath) => {
        /*
            例:
            entryDir = 'product/list'
            chunkName = 'product.list'
         */
        let entryDir = filePath.substring(pagesPath.length + 1, filePath.indexOf(PATH_SEP + ENTRY_JS))
        let chunkName = entryDir.replace(PATH_SEP, CHUNK_SEP)

        let outputFileName = entryDir + '.html'
        let templatePath = filePath.replace(ENTRY_JS, ENTRY_TMPL)
        templatePath = fs.existsSync(templatePath) ? templatePath : DEFAULT_TMPL

        ary.push({
            chunkName: chunkName,
            htmlFileName: outputFileName,
            htmlTemplatePath: templatePath,
            filePath: filePath
        })
    })

    return ary
}


/*
    返回绝对路径
 */
exports.resolve = function(dir) {
    return path.join(__dirname, '..', dir)
}

/*
    静态文件存放路径
 */
exports.assetsPath = function(_path) {
    return path.join(config.assetsRoot, _path).replace(/\\/g, '/')
}

/*
    多入口配置

    目录下有'entry.js'文件的会当作打包入口
 */
exports.entries = function(){
    let map = {}
    let entryFiles = _getEntryFiles()

    entryFiles.forEach((obj) => {
        map[obj.chunkName] = obj.filePath
    })

    return map
}

/*
    多页面输出配置

    目录下有'entry.js'文件的会当作打包入口
    目录下有'entry.html'文件的会当作入口页面模板
 */
exports.htmlWebpackPlugin = function(){
    let arr = []
    let entryFiles = _getEntryFiles()

    entryFiles.forEach((obj) => {
        let conf = {
            template: obj.htmlTemplatePath,
            filename: obj.htmlFileName,
            chunks: ['runtime', 'vendor', 'common', obj.chunkName],
            minify: process.env.NODE_ENV === 'production',
            inject: true
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })

    return arr
}