(function (t) {
    t.fn.socialSharer = function (options) {

        var s = $.extend({
            facebookSelector: 'fb-share',
            facebookUrl: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
            googlePlusSelector: 'gplus-share',
            googlePlusUrl: 'https://plus.google.com/share?url={{URL}}',
            linkedinSelector: 'linkedin-share',
            linkedinUrl: 'https://www.linkedin.com/shareArticle?mini=true&url={{URL}}&title={{TITLE}}&summary={{SUMMARY}}&source={{SOURCE}}',
            twitterSelector: 'twitter-share',
            twitterUrl: 'https://twitter.com/intent/tweet?text={{TITLE}}%20{{URL}}',
            pinterestSelector: 'pinterest-share',
            pinterestUrl: 'https://pinterest.com/pin/create/button/?url={{URL}}&media={{MEDIA}}&description={{SUMMARY}}'
        }, options);

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
                e.preventDefault();

                var b = $(this);
                var u;
                if (b.hasClass(s.facebookSelector)) {
                    u = s.facebookUrl;
                } else if (b.hasClass(s.googlePlusSelector)) {
                    u = s.googlePlusUrl;
                } else if (b.hasClass(s.linkedinSelector)) {
                    u = s.linkedinUrl;
                } else if (b.hasClass(s.twitterSelector)) {
                    u = s.twitterUrl;
                } else if (b.hasClass(s.pinterestSelector)) {
                    u = s.pinterestUrl;
                } else {
                    return;
                }

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