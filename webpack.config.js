var Encore = require('@symfony/webpack-encore');

Encore
// the project directory where compiled assets will be stored
    .setOutputPath('web/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    // the public path you will use in Symfony's asset() function - e.g. asset('build/some_file.js')
    .setManifestKeyPrefix('build/')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())

    // the following line enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .enableReactPreset()

    // uncomment to define the assets of the project
    .addEntry('js/app', './assets/js/index.js')
    .addStyleEntry('css/app', ['./assets/css/CommentList.css' , './assets/css/ImageUpload.css'])

// uncomment if you use TypeScript
//.enableTypeScriptLoader()

// uncomment if you use Sass/SCSS files
//.enableSassLoader()

// uncomment for legacy applications that require $/jQuery as a global variable
//.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
