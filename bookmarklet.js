var PUBLITWEET_INTERFACE_LOADED = false;

function publitweet_blackbird_close() {
    id = "publitweet_bookmarklet";
    PUBLITWEET_INTERFACE_LOADED = false;
    jQuery('#' + id).remove();
}

function showItem(id) {
    try {
        var item = document.getElementById(id);
        if (item) {
            item.style.display = "";
        }
    } catch (e) {}
}

(function() {
    u = document.location.href
    matches = u.match(/^https?:\/\/twitter\.com\/(#\!\/)?([a-z0-9_]{1,15})\/status(es)?\/([1-9][0-9]+)/i);

    if (!matches) {
        m2 = u.match(/^https?:\/\/twitter\.com\/(.*)?/i);
        if (!m2) {
            alert('You have to be on a twitter.com page to execute this bookmarklet');
        } else {
            console.info('Starting publitweet');
            if (jQuery('.publitweet_blackbird_getEmbed').size() == 0) {
                var inArray = function(str, array) {
                    for (var i = 0, len = array.length; i < len; i++) {
                        if (array[i] == str) return true;
                    };
                    return false;
                }

                var permalink_memory = [];
                jQuery('.stream-tweet, .permalink-tweet').live('hover', function() {
                    var node = jQuery(this).find('.tweet-actions');
                    if (node) {
                        var permalink = node.siblings('.tweet-timestamp').attr('href').replace('^/#!', 'http://twitter.com');
                        var tweetClass = ($(this).hasClass('permalink-tweet')) ? 'permalink' : 'stream';
                        if (inArray(tweetClass + ':' + permalink, permalink_memory)) return;

                        var m3 = permalink.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,15})\/status(es)?\/([1-9][0-9]+)/i);
                        var id = m3[3];
                        permalink_memory.push(tweetClass + ':' + permalink);
                        console.info('publitweet_blackbird_ id: ' + id);
                        var anchor = jQuery('&nbsp; <a class="publitweet_blackbird_getEmbed" href="javascript:void();" style="display:inline-table;height:16px;padding-left:18px;">[embed tweet]</a>');
                        node.append(anchor);
                        anchor.click(function() {
                            publitweet_blackbird_getCode(id);
                        });
                    }
                });
            }
        }
    } else {
        publitweet_blackbird_getCode(matches[4]);
    }
})();

function publitweet_writeInterface() {
    if (PUBLITWEET_INTERFACE_LOADED) {
        return;
    }

    PUBLITWEET_INTERFACE_LOADED = true;
    var publitweet_iframe_width = 500;
    var publitweet_iframe_height = 400;

    var div = document.createElement("div");
    div.id = "publitweet_bookmarklet";

    t = Math.round((jQuery(window).height() - publitweet_iframe_height) / 2);
    l = Math.round((jQuery(window).width() / 2) - (publitweet_iframe_width / 2));

    var str = "";
    str += "<div id='publitweet_bookmarklet_table' style=\"background:#E9EAEE;";
    str += "-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;-moz-box-shadow:1px 2px 6px rgba(0, 0, 0, 0.5);box-shadow: 1px 2px 6px rgba(0,0,0, 0.5);-webkit-box-shadow: 1px 2px 6px rgba(0,0,0, 0.5);";
    str += "padding:9px 10px;border:border:2px solid #FFFFFF; position:fixed; _position:absolute;top:" + t + "px;left:" + l + "px;";
    str += "width:" + publitweet_iframe_width + "px;height: " + publitweet_iframe_height + "px;z-index:10000000;margin:0;padding:0;background:'#E9EAEE';\">";
    str += "<div style='padding:10px;width:430px;margin:0 auto;'>";
    str += "<h2 style='text-align:left;margin-top:10px;color:#393939 !important;'>Publitweet blackbird</h3>";
    str += "<h3 style='text-align:left;margin-top:10px;color:#393939 !important;'>HTML code:</h3>";
    str += "<textarea id='EmbedCode' style='margin:10px 0px;";
    str += "background:none repeat scroll 0 0 #FAFAFC;border:1px solid #A3A3A3;color:#2F2F2F;font:10px/15px Monaco,monospace;height:240px;outline:medium none;overflow:hidden;padding:9px 0px;width:430px;";
    str += "'>Loading..</textarea>";
    str += "<center><a href='javascript:publitweet_blackbird_close();' style='width:100%; text-align: middle; color: #393939; font-family: Arial;'><b>[close (^esc)]</b></a></center>";
    str += "</div></div>";

    div.innerHTML = str;
    jQuery(document).keyup(function(e) {
        if (e.keyCode == 27) {
            publitweet_blackbird_close();
        } // esc (does not work)
    });

    jQuery('#EmbedCode').focus(function() {
        jQuery(this).select();
    });

    document.body.insertBefore(div, document.body.firstChild);
}

function publitweet_blackbird_getCode(tweet_id) {
    publitweet_writeInterface();
    e = document.getElementById('EmbedCode');
    e.value = 'Loading...';
    api_call = 'http://api.twitter.com/1/statuses/show/' + tweet_id + '.json?callback=publitweet_blackbird';

    _my_script = document.createElement('SCRIPT');
    _my_script.type = 'text/javascript';
    _my_script.src = api_call;
    document.getElementsByTagName('head')[0].appendChild(_my_script);
}

function publitweet_blackbird(tweet) {
    tweet_id = tweet.id_str;
    screen_name = tweet.user.screen_name;
    name = tweet.user.name;
    background_url = tweet.user.profile_background_image_url;
    avatar = tweet.user.profile_image_url;
    source = tweet.source;
    background_color = '#' + tweet.user.profile_background_color;
    text_color = '#' + tweet.user.profile_text_color;
    link_color = '#' + tweet.user.profile_link_color;

    timestamp = relative_time(tweet.created_at);

    // for the Placemark description of Google Maps
    link_style = ' style="color:' + link_color + '"';

    to_link = function() {
        var a = arguments;
        var pre_text = '';
        if (a[1]) {
            url = a[1];
            text = a[1];
        } else if (a[2]) {
            url = 'http://search.twitter.com/search?q=%23' + a[2];
            text = '#' + a[2];
        } else if (a[3]) {
            url = 'http://twitter.com/' + a[3];
            pre_text = '@'
            text = a[3];
        }

        return pre_text + '<a href="' + url + '"' + link_style + '>' + text + '</a>';
    }

    content = tweet.text.replace(/(http:\/\/\S+)|#([a-zA-Z0-9_]+)|@([a-zA-Z0-9_]{1,15})/g, to_link);

    if (source === 'web') {
        source = '<a href="http://twitter.com/"' + link_style + ' rel="nofollow">Twitter</a>';
    } else {
        source = source.replace(/^<a href="([^"]+)" rel="nofollow">/, '<a href="$1"' + link_style + ' rel="nofollow">');
    }

    EmbedCode = '<div style="margin:0 .5em .3em .5em;min-height:60px;color:' + text_color + ';font-size:16px"><div>' + content + '</div><div style="margin-bottom:.5em"><span style="font-size:12px;display:block;color:#999"><a href="http://twitter.com/' + screen_name + '/status/' + tweet_id + '"' + link_style + '>' + timestamp + '</a> ' + source + 'から </span></div><div style="padding:.5em 0 .5em 0;width:100%;border-top:1px solid #e6e6e6"><a href="http://twitter.com/' + screen_name + '"' + link_style + '><img src="' + avatar + '" alt="' + name + '" width="38" height="38" style="float:left;margin-right:7px;width:38px;padding:0;border:none"></a><strong><a href="http://twitter.com/' + screen_name + '"' + link_style + '>@' + screen_name + '</a></strong><span style="color:#999;font-size:14px"><br>' + name + ' </span></div></div>'

    e = jQuery('#EmbedCode');
    e.val(EmbedCode);
    e.focus();
    e.select();
}

function relative_time(time_value) {
    time_values = time_value.split(" ");
    time_value = time_values[1] + " " + time_values[2] + ", " + time_values[5] + " " + time_values[3];
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parsed_date / 1000 - relative_to.getTimezoneOffset() * 60;
    var dd = new Date();
    dd.setTime(delta * 1000);
    return dd.getFullYear() + '年' + (dd.getMonth() + 1) + '月' + dd.getDate() + '日 ' + dd.getHours() + ':' + ("0" + dd.getMinutes()).slice(-2);
}
