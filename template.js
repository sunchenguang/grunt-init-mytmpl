/*
 * grunt-init-mytmpl
 * https://gruntjs.com/
 *
 * Copyright (c) 2015 suncg
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic Gruntfile.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'you need to edit the generated Gruntfile.js file before running grunt';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({}, [
        // Prompt for these values.
        {
            name: 'dom',
            message: 'Is the DOM involved in ANY way?',
            default: 'Y/n',
            warning: 'Yes: JSHint "browser" globals. No: Nodeunit unit tests.'
        }, {
            name: 'min_concat',
            message: 'Will files be concatenated or minified?',
            default: 'Y/n',
            warning: 'Yes: min + concat tasks. No: nothing to see here.'
        }, {
            name: 'package_json',
            message: 'Do you want to create a basic package.json file?',
            default: 'Y/n',
            warning: 'This changes how filenames are determined and banners are generated.'
        }
    ], function(err, props) {
        props.dom = /y/i.test(props.dom);
        props.min_concat = /y/i.test(props.min_concat);
        props.package_json = /y/i.test(props.package_json);
        props.file_name = props.package_json ? '<%= pkg.name %>' : 'FILE_NAME';

        // Find the first `preferred` item existing in `arr`.
        function prefer(arr, preferred) {
            for (var i = 0; i < preferred.length; i++) {
                if (arr.indexOf(preferred[i]) !== -1) {
                    return preferred[i];
                }
            }
            return preferred[0];
        }

        // Guess at some directories, if they exist.
        var dirs = grunt.file.expand({
            filter: 'isDirectory'
        }, '*').map(function(d) {
            return d.slice(0, -1);
        });
        props.lib_dir = prefer(dirs, ['lib', 'src']);
        props.test_dir = prefer(dirs, ['test', 'tests', 'unit', 'spec']);

        // Maybe this should be extended to support more libraries. Patches welcome!
        props.jquery = grunt.file.expand({
            filter: 'isFile'
        }, '**/jquery*.js').length > 0;

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);


        // If is package_json true, generate package.json
        if (props.package_json) {
            var devDependencies = {
                'grunt': '~0.4.5',
                'grunt-contrib-jshint': '~0.10.0',
                'grunt-contrib-watch': '~0.6.1',
                'autoprefixer-core': '^5.1.11',
                'grunt-contrib-compass': '^1.0.3',
                'grunt-postcss': '^0.3.0',
                'grunt-browser-sync': '^2.1.3',
                'load-grunt-tasks': '^3.1.0',
                'time-grunt': '^1.1.1'
            };


            if (props.min_concat) {
                devDependencies['grunt-contrib-concat'] = '~0.4.0';
                devDependencies['grunt-contrib-uglify'] = '~0.5.0';
            }

            // Generate package.json file, used by npm and grunt.
            init.writePackageJSON('package.json', {
                name: "",
                version: "1.0.0",
                description: "",
                scripts: {},
                keywords: [],
                author: "suncg",
                license: "MIT",
                node_version: '>= 0.10.0',
                devDependencies: devDependencies
            });
        }

        // All done!
        done();
    });

};
