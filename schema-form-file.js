'use strict';

angular
    .module('schemaForm')
    .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
            var singleImage = function (name, schema, options) {
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'tsFile';
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            };
            schemaFormProvider.defaults.array.unshift(singleImage);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'tsFile',
                'file.html'
            );
        }]);

angular.module('schemaFormFileOperations', [
    'ngFileUpload'
]).directive('readFileData', ['imageUpload', '$sce', function (imageUpload, $sce) {
    return {
        restrict: 'A',
        scope: {
            filePattern: "="
        },
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            scope.$watch('filePattern', function (newVal, oldVal) {
                if (newVal.mimeType) {
                    elem.attr('accept', newVal.mimeType);
                    elem.removeAttr('filePattern');
                }
            });
            elem.bind("change", function (changeEvent) {
                if (changeEvent.srcElement || changeEvent.target) {
                    if (scope.filePattern.formate === 'blob') {
                        imageUpload.dataUrl((changeEvent.srcElement || changeEvent.target).files[0], true).then(function (url) {
                            ngModel.$setViewValue(url);
                            ngModel.$commitViewValue();
                            if (scope.filePattern.show === 'img') {
                                var img=new Image();
                                img.style.height=scope.filePattern.height;
                                img.style.width=scope.filePattern.width;
                                img.src=$sce.trustAsResourceUrl(url);
                                angular.element(document).find('#fileDecorator').append(img);
                            }
                        });
                    } else if (scope.filePattern.formate === 'text') {
                        var r = new FileReader();
                        r.onload = function (e) {
                            ngModel.$setViewValue(e.target.result);
                            ngModel.$commitViewValue();

                        }
                        r.readAsText((changeEvent.srcElement || changeEvent.target).files[0]);
                    } else if (scope.filePattern.formate === 'upload') {
                    }

                }
            });

        }
    };
}]);
