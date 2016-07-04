module.exports = function (grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/**/*', '!dist/index.html', '!dist/web.config'],
            js: ["dist/**/*.js", "!dist/**/*.min.js"],
            css: ["dist/**/*.css", "!dist/**/*.min.css"],
            html2js: ["tmp/"]
        },
        html2js: {
            dist: {
                options: {
                    module: '<%= pkg.name %>',
                    singleModule: true,
                    existingModule: true,
                    process: function (src, filepath) {

                        var urlPatt = /url\(['|"]*(\.\.\/)+(.*?)['|"]*\)/g,
                            urlImages = /url\(['|"]*(images\/)(.*?)['|"]*\)/g,
                            urlfonts = /url\(['|"]*(fonts\/)(.*?)['|"]*\)/g,
                            cssPatt = /url\(['|"]*(\.\.\/)+(.*?[png|gif|jpg|svg])['|"]*\)/g,
                            asset_path = /(\/assets\/)/g;
                        //urlPatternQuotes = /url\('(\.\.\/)+(.*)'\)/g;
                        return src.replace(urlfonts, function (match, p1, p2) {
                            return 'url(\'../' + p2 + '\')';
                        }).replace(urlPatt, function (match, p1, p2) {
                            return 'url(\'/' + p2 + '\')';
                        }).replace(urlImages, function (match, p1, p2) {
                            return 'url(\'/img/' + p1 + p2 + '\')';
                        }).replace(cssPatt, function (match, p1, p2) {
                            return 'url(\'/' + p2 + '\')';
                        }).replace(asset_path, function (match, p1, p2) {
                            return '/';
                        });

                        return src;
                    }
                },
                src: ['src/app/**/*html'],
                dest: 'tmp/templates.js'
            },
            ic_widget: {
                options: {
                    module: '<%= pkg.name %>',
                    singleModule: true,
                    existingModule: true,
                    process: function (src, filepath) {

                        var urlPatt = /url\(['|"]*(\.\.\/)+(.*?)['|"]*\)/g,
                            urlImages = /url\(['|"]*(images\/)(.*?)['|"]*\)/g,
                            urlfonts = /url\(['|"]*(fonts\/)(.*?)['|"]*\)/g,
                            cssPatt = /url\(['|"]*(\.\.\/)+(.*?[png|gif|jpg|svg])['|"]*\)/g,
                            asset_path = /(\/assets\/)/g;
                        //urlPatternQuotes = /url\('(\.\.\/)+(.*)'\)/g;
                        return src.replace(urlfonts, function (match, p1, p2) {
                            return 'url(\'../' + p2 + '\')';
                        }).replace(urlPatt, function (match, p1, p2) {
                            return 'url(\'/' + p2 + '\')';
                        }).replace(urlImages, function (match, p1, p2) {
                            return 'url(\'/img/' + p1 + p2 + '\')';
                        }).replace(cssPatt, function (match, p1, p2) {
                            return 'url(\'/' + p2 + '\')';
                        }).replace(asset_path, function (match, p1, p2) {
                            return '/';
                        });

                        return src;
                    }
                },
                src: ['src/app/components/widgets/investor-committee/templates/*html'],
                dest: 'tmp/widgets/templates.js'
            }
        },
        concat: {
            css_dist: {
                options: {
                    separator: '\n',
                    process: function (src, filepath) {
                        var cssPatt = new RegExp('(\/.*\/).*\.css$');
                        var file = cssPatt.exec(filepath);
                        //grunt.log.writeln([file]);

                        if (file) {
                            // rewrite the url in css file.
                            // url(../../img/bluebg.jpg) -> url(../img/bluebg.jpg)
                            // url(../../../img/bluebg2.jpg) -> url(../img/bluebg.2jpg)

                            var urlPatt = /url\(['|"]*(\.\.\/)+(.*?)['|"]*\)/g,
                                urlImages = /url\(['|"]*(images\/)(.*?)['|"]*\)/g,
                                urlfonts = /url\(['|"]*(fonts\/)(.*?)['|"]*\)/g,
                                cssPatt = /url\(['|"]*(\.\.\/)+(.*?[png|gif|jpg|svg])['|"]*\)/g;
                            //urlPatternQuotes = /url\('(\.\.\/)+(.*)'\)/g;
                            return src.replace(urlfonts, function (match, p1, p2) {
                                return 'url(\'../' + p2 + '\')';
                            }).replace(urlPatt, function (match, p1, p2) {
                                return 'url(\'/' + p2 + '\')';
                            }).replace(urlImages, function (match, p1, p2) {
                                return 'url(\'/img/' + p1 + p2 + '\')';
                            }).replace(cssPatt, function (match, p1, p2) {
                                return 'url(\'/' + p2 + '\')';
                            });
                        }

                        return src;
                    }
                },
                files: [{
                    dest: 'dist/css/style.css',
                    src: [
                        'src/assets/css/style.css',
                        'src/assets/css/loading.css',
                        'src/assets/css/custom.css',
                        'src/assets/css/scroller.dataTables.css'
                    ]
                },
                    {
                        dest: 'dist/css/select2.min.css',
                        src: [
                            'src/assets/libs/select2/dist/css/select2.min.css'
                        ]
                    },
                    {
                        dest: 'dist/css/libs.css',
                        src: [
                            'src/assets/css/jquery-ui.css',
                            'src/assets/libs/jquery-ui-month-picker/demo/MonthPicker.min.css',
                            'src/assets/libs/font-awesome/css/font-awesome.css',
                            'src/assets/libs/datatables/media/css/jquery.dataTables.css',
                            'src/assets/css/colReorder.dataTables.css',
                            'src/assets/libs/slick-carousel/slick/slick.css',
                            'src/assets/libs/slick-carousel/slick/slick-theme.css'
                            //'src/assets/libs/datatables-colreorder/css/colReorder.dataTables.css'
                            //'src/assets/css/kendo.common.min.css',
                            //'src/assets/css/kendo.default.min.css'
                        ]
                    }]
            },
            js_ic_widget: {
                options: {
                    separator: ';\n',
                    process: function (src, filepath) {
                        var jsPatt = new RegExp('(\/.*\/).*\.js$');
                        var file = jsPatt.exec(filepath);
                        //grunt.log.writeln([file]);

                        if (file) {
                            // rewrite the url in css file.
                            // url(../../img/bluebg.jpg) -> url(../img/bluebg.jpg)
                            // url(../../../img/bluebg2.jpg) -> url(../img/bluebg.2jpg)

                            var urlPatt = /url\(['|"]*(\.\.\/)+(.*?)['|"]*\)/g,
                                urlImages = /url\(['|"]*(images\/)(.*?)['|"]*\)/g,
                                urlfonts = /url\(['|"]*(fonts\/)(.*?)['|"]*\)/g,
                                cssPatt = /url\(['|"]*(\.\.\/)+(.*?[png|gif|jpg|svg])['|"]*\)/g,
                                asset_path = /(\/assets\/)/g;
                            //urlPatternQuotes = /url\('(\.\.\/)+(.*)'\)/g;
                            return src.replace(urlfonts, function (match, p1, p2) {
                                return 'url(\'../' + p2 + '\')';
                            }).replace(urlPatt, function (match, p1, p2) {
                                return 'url(\'/' + p2 + '\')';
                            }).replace(urlImages, function (match, p1, p2) {
                                return 'url(\'/img/' + p1 + p2 + '\')';
                            }).replace(cssPatt, function (match, p1, p2) {
                                return 'url(\'/' + p2 + '\')';
                            }).replace(asset_path, function (match, p1, p2) {
                                return '/';
                            });
                        }

                        return src;
                    }
                },
                files: [{
                    dest: 'dist/widgets/investor-committee-core.js',
                    src: [
                        'src/app/core/**/**.js'
                    ]
                }, {
                    dest: 'dist/widgets/investor-committee-widget.js',
                    src: [
                        'src/app/components/widgets/investor-committee/**.js',
                        'src/app/core/**/**.js',
                        'tmp/widgets/templates.js'
                    ]
                }, {
                    dest: 'dist/widgets/helpers.js',
                    src: [
                        'src/assets/js/array-prototypes.js',
                        'src/assets/js/cs-js-library.js'
                    ]
                }]
            },
            js_dist: {
                options: {
                    separator: ';\n',
                    process: function (src, filepath) {
                        var jsPatt = new RegExp('(\/.*\/).*\.js$');
                        var file = jsPatt.exec(filepath);
                        //grunt.log.writeln([file]);

                        if (file) {
                            // rewrite the url in css file.
                            // url(../../img/bluebg.jpg) -> url(../img/bluebg.jpg)
                            // url(../../../img/bluebg2.jpg) -> url(../img/bluebg.2jpg)

                            var urlPatt = /url\(['|"]*(\.\.\/)+(.*?)['|"]*\)/g,
                                urlImages = /url\(['|"]*(images\/)(.*?)['|"]*\)/g,
                                urlfonts = /url\(['|"]*(fonts\/)(.*?)['|"]*\)/g,
                                cssPatt = /url\(['|"]*(\.\.\/)+(.*?[png|gif|jpg|svg])['|"]*\)/g,
                                asset_path = /(\/assets\/)/g;
                            //urlPatternQuotes = /url\('(\.\.\/)+(.*)'\)/g;
                            return src.replace(urlfonts, function (match, p1, p2) {
                                return 'url(\'../' + p2 + '\')';
                            }).replace(urlPatt, function (match, p1, p2) {
                                return 'url(\'/' + p2 + '\')';
                            }).replace(urlImages, function (match, p1, p2) {
                                return 'url(\'/img/' + p1 + p2 + '\')';
                            }).replace(cssPatt, function (match, p1, p2) {
                                return 'url(\'/' + p2 + '\')';
                            }).replace(asset_path, function (match, p1, p2) {
                                return '/';
                            });
                        }

                        return src;
                    }
                },
                files: [{
                    dest: 'dist/app/app.js',
                    src: [
                        'src/app/**/**.module.js',
                        'src/app/**/**.routes.js',
                        'src/app/**/**.config.js',
                        'src/app/app.run.js',
                        'src/app/**/**animations.js',
                        'src/app/**/**wrapper.js',
                        'src/app/**/**model.js',
                        'src/app/**/**provider.js',
                        'src/app/**/**mapper.js',
                        'src/app/**/**factory.js',
                        'src/app/**/**service.js',
                        'src/app/**/**container.js',
                        'src/app/**/**instance.js',
                        'src/app/**/**controller.js',
                        'src/app/**/**directives.js',
                        'src/app/**/**filters.js',
                        'src/app/**/**widget.js',
                        'tmp/templates.js'
                    ]
                }, {
                    dest: 'dist/js/libs/libs.min.js',
                    src: [
                        'src/assets/libs/jquery/dist/jquery.js',
                        'src/assets/libs/jquery-ui/jquery-ui.js',
                        'src/assets/libs/jquery-ui-month-picker/demo/MonthPicker.min.js',
                        'src/assets/libs/oidc-token-manager/dist/oidc-token-manager.js',
                        'src/assets/libs/datatables/media/js/jquery.dataTables.js',
                        'src/assets/libs/datatables-colreorder/js/dataTables.colReorder.js',
                        'src/assets/libs/datatables-scroller/js/dataTables.scroller.js',
                        'src/assets/js/datatables.extensions.js',
                        'src/assets/libs/select2/dist/js/select2.js',
                        'src/assets/js/vendor/kendo/kendo.core.min.js',
                        'src/assets/js/vendor/kendo/kendo.color.min.js',
                        'src/assets/js/vendor/kendo/kendo.drawing.min.js',
                        'src/assets/js/vendor/kendo/kendo.dataviz.core.min.js',
                        'src/assets/js/vendor/kendo/kendo.data.min.js',
                        'src/assets/js/vendor/kendo/kendo.dom.min.js',
                        'src/assets/js/vendor/kendo/kendo.editable.min.js',
                        'src/assets/js/vendor/kendo/kendo.filtermenu.min.js',
                        'src/assets/js/vendor/kendo/kendo.resizable.min.js',
                        'src/assets/js/vendor/kendo/kendo.selectable.min.js',
                        'src/assets/js/vendor/kendo/kendo.dataviz.chart.min.js',
                        'src/assets/js/vendor/kendo/kendo.dataviz.themes.min.js',
                        'src/assets/js/vendor/kendo/kendo.dataviz.gauge.min.js',
                        'src/assets/libs/moment/min/moment.min.js',
                        'src/assets/libs/slick-carousel/slick/slick.min.js'
                    ]
                }, {
                    dest: 'dist/js/libs/angular.js',
                    src: [
                        'src/assets/libs/angular/angular.js',
                        'src/assets/libs/angular-ui-router/release/angular-ui-router.js',
                        'src/assets/libs/angular-breadcrumb/release/angular-breadcrumb.js',
                        'src/assets/libs/angular-sanitize/angular-sanitize.js',
                        'src/assets/libs/angular-animate/angular-animate.js',
                        'src/assets/libs/angular-cookies/angular-cookies.js',
                        'src/assets/libs/angular-datatables/dist/angular-datatables.js',
                        'src/assets/libs/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.js',
                        'src/assets/libs/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.js',
                        'src/assets/libs/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',
                        'src/assets/js/vendor/kendo/kendo.angular.min.js'
                    ]
                }, {
                    dest: 'dist/js/default.js',
                    src: [
                        'src/assets/js/default.js',
                        'src/assets/js/array-prototypes.js',
                        'src/assets/js/cs-js-library.js'
                    ]
                }]
            }
        },
        jshint: {
            options: {
                globals: {
                    jQuery: true
                }
            },
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                mangle: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    dest: 'dist/',
                    extDot: 'last',
                    ext: '.min.js',
                    src: ['js/**/*.js', 'app/**/*.js', '!js/**/*.min.js']
                    //'dist/js/**/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }]
            },
            ic_widget: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    dest: 'dist/',
                    extDot: 'last',
                    ext: '.min.js',
                    src: ['widgets/**/*.js', '!js/**/*.min.js']
                    //'dist/js/**/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                    noAdvanced: false
                },
                files: [{
                    dest: 'dist/css/style.min.css',
                    src: ['dist/css/style.css']
                }
                    , {
                        dest: 'dist/css/libs.min.css',
                        src: ['dist/css/libs.css']
                    }]
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/assets/css/',
                        src: ['**/*.{png,jpg,svg,gif}'],
                        dest: 'dist/img/'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/img/',
                        src: ['**/*.{png,jpg,svg}'],
                        dest: 'dist/img/'
                    }
                ]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/css',
                    src: 'kendo.common.min.css',
                    dest: 'dist/css'
                }, {
                    expand: true,
                    cwd: 'src/assets/css',
                    src: 'src/assets/css/kendo.default.min.css',
                    dest: 'dist/css'
                }]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/assets/libs/',
                        src: ['font-awesome/fonts/*.{otf,eot,ttf,woff,woff2,svg}'],
                        dest: 'dist/fonts/'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/fonts',
                        src: ['**'],
                        dest: 'dist/fonts/'
                    }
                ]
            }
        }
    });
    //loading grunt plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint', 'qunit']);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify:dist']);

    grunt.registerTask('ic_widget', ['clean:dist', 'html2js:ic_widget', 'concat:js_ic_widget', 'uglify:ic_widget', 'clean:js', 'clean:html2js']);

    grunt.registerTask('dist', ['clean:dist', 'html2js:dist', 'concat:css_dist', 'concat:js_dist', 'uglify:dist', 'cssmin', 'copy:images', 'copy:fonts', 'copy:css', 'clean:js', 'clean:css', 'clean:html2js']);
}