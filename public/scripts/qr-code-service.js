/**
 * Created by Administrator on 2017/8/9.
 */
angular.module('qiniuUploadApp').factory('qrCodeService', ['$window', function($window) {
    'use strict';
    function generate(options){
        var textSettings = {
            minVersion: 5,
            ecLevel: 'H',
            quiet: 2,
            size: 500
        };
        var imageSettings = {
            render: 'image',
            mode: 'image',
            mSize: 20,
            mPosX: 50,
            mPosY: 50
        };
        var settings = Object.assign(textSettings, options);
        if (options.image) Object.assign(settings, imageSettings);
        return $window.kjua(settings);
    }
    return {
        generateImgTag: function(options){
            if (!options.text) return;
            return generate(options);
        },
        downloadPNG: function(options){
            if (!options.text) return;
            var el = generate(options);
            var url = el.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
            var link = $window.document.createElement('a');
            link.download = options.fileName || 'download.png';
            link.href = url;
            link.click();
        }
    };
}]);
