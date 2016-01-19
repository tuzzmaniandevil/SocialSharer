(function (t) {

    var defaults = {
        links: [
            {
                class: 'fb-share',
                url: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}'
            },
            {
                class: 'gplus-share',
                url: 'https://plus.google.com/share?url={{URL}}'
            },
            {
                class: 'linkedin-share',
                url: 'https://www.linkedin.com/shareArticle?mini=true&url={{URL}}&title={{TITLE}}&summary={{SUMMARY}}&source={{SOURCE}}'
            },
            {
                class: 'twitter-share',
                url: 'https://twitter.com/intent/tweet?text={{TITLE}}%20{{URL}}'
            },
            {
                class: 'pinterest-share',
                url: 'https://pinterest.com/pin/create/button/?url={{URL}}&media={{MEDIA}}&description={{SUMMARY}}'
            }
        ]
    };

    t.fn.socialSharer = function (options) {

        var s = $.extend(defaults, options);

        var addHttp = function (url) {
            var urlRegExp = new RegExp('^(?:[A-Za-z-\.]+):\/\/');

            if (!urlRegExp.test(url)) {
                url = url.replace('://', '');

                url = 'http://' + window.location.hostname + url;
            }

            return url;
        };

        return this.each(function (i, n) {
            t(n).on('click', function (e) {
                var b = $(this);
                var u = null;

                for (var i = 0; i < s.links.length; i++) {
                    var l = s.links[i];
                    if (b.hasClass(l.class)) {
                        u = l.url;
                        break;
                    }
                }

                if (u === null) {
                    return;
                }

                e.preventDefault();

                var url = encodeURIComponent(b.data('share-url') || window.location.href);
                if (url === '#') {
                    url = window.location.href;
                }
                var title = encodeURIComponent(b.data('share-title') || document.title);
                var sum = encodeURIComponent(b.data('share-summary') || '');
                var source = encodeURIComponent(b.data('share-source') || '');
                var media = encodeURIComponent(b.data('share-media') || '');

                if (media !== '') {
                    media = addHttp(media);
                }

                u = u.replace('{{URL}}', url)
                        .replace('{{TITLE}}', title)
                        .replace('{{SUMMARY}}', sum)
                        .replace('{{SOURCE}}', source)
                        .replace('{{MEDIA}}', media);

                window.open(u, (new Date()).getTime(), 'width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0');
            });
        });
    };
})(jQuery);