angular.module('linkify', [])
  .filter('linkify', function () {
      'use strict';

      function linkify (_str, type) {
        if (!_str) {
          return;
        }

        var _text = _str.replace(/(?:https?\:\/\/)+(?![^\s]*?")([\w.,@?!^=%&amp;:\/~+#-]*[\w@?!^=%&amp;\/~+#-])?/ig, function(url) {
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
          _text = _text.replace(/(^|\s)*[#＃]([^#＃\s!@$%^&*()+\-=\[\]{};':"\\|,.<>\/?\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u300c\u300d\u300e\u300f\u2018\u2019\u201c\u201D\uff08\uff09\u3014\u3015\u3010\u3011\u2014\u2026\u2013\uff0e\u300a\u300B\u3008\u3009]+)/g, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
        }


        // Instagram
        if (type === 'instagram') {
          _text = _text.replace(/(|\s)*@([\w\.]+)/g, '$1<a href="https://instagram.com/$2" target="_blank">@$2</a>');
          _text = _text.replace(/(^|\s)*[#＃]([^#＃\s!@$%^&*()+\-=\[\]{};':"\\|,.<>\/?\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u300c\u300d\u300e\u300f\u2018\u2019\u201c\u201D\uff08\uff09\u3014\u3015\u3010\u3011\u2014\u2026\u2013\uff0e\u300a\u300B\u3008\u3009]+)/g, '$1<a href="https://instagram.com/explore/tags/$2" target="_blank">#$2</a>');
        }

        // Weibo
        if (type === 'weibo') {
          _text = _text.replace(/(|\s)*@([\u4e00-\u9fa5\w-]+)/g, '$1<a href="http://weibo.com/n/$2" target="_blank">@$2</a>');
          _text = _text.replace(/(^|\s)*#([^#]+)#/g, '$1<a href="http://huati.weibo.com/k/$2" target="_blank">#$2#</a>').replace(/\[[\u4e00-\u9fa5]*\]/g, '');
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

