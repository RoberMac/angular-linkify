angular.module('linkify', [])
  .filter('linkify', function () {
      'use strict';

      function linkify (_str, type) {
        if (!_str) {
          return;
        }

        var _text = _str.replace( /(?:https?\:\/\/)+(?![^\s]*?")([\w.,@?!^=%&amp;:\/~+#-]*[\w@?!^=%&amp;\/~+#-])?/ig, function(url) {
          var wrap = document.createElement('div');
          var anch = document.createElement('a');
          anch.href = url;
          anch.target = "_blank";
          anch.innerHTML = url;
          wrap.appendChild(anch);
          return wrap.innerHTML;
        });

        // bugfix
        if (!_text) {
          return '';
        }

        // Twitter
        if (type === 'twitter') {
          _text = _text.replace(/(|\s)*@([\w]+)/g, '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>');
          _text = _text.replace(/(^|\s)*#([^#\s!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+)/g, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
        }


        // Instagram
        if (type === 'instagram') {
          _text = _text.replace(/(|\s)*@([\w]+)/g, '$1<a href="https://instagram.com/$2" target="_blank">@$2</a>');
          _text = _text.replace(/(^|\s)*#([^#\s!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+)/g, '$1<a href="https://instagram.com/explore/tags/$2" target="_blank">#$2</a>');
        }


        // Instagram
        if (type === 'weibo') {
          _text = _text.replace(/(|\s)*@([\u4e00-\u9fa5\w-]+)/g, '$1<a href="http://weibo.com/n/$2" target="_blank">@$2</a>');
          _text = _text.replace(/(^|\s)*#([^#]+)#/g, '$1<a href="http://huati.weibo.com/k/$2" target="_blank">#$2#</a>');
        }


        return _text;
      }

      return linkify;
  })
  .directive('linkify', ['$filter', '$timeout', function ($filter, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var type = attrs.linkify || 'normal';

        $timeout(function () {
          element.html($filter('linkify')(element.html(), type));
        });

      }
    };
  }]);

