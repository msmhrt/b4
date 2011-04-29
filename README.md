#THIS PROJECT IS DEPRECATED AND IS NO LONGER BEING MAINTAINED.
Please see [teritori][teritori]

【警告】このプロジェクトは廃止予定で今後はメンテナンスされません。
詳細については[teritori][teritori]をご覧ください。

b4
=============

Better BlackBird Bookmarklet

これは何？
-------

b4は、Xavier Damman氏（ [@xdamman][xdamman-twitter] ）の[publitweet Blackbird bookmarklet][xdamman-blogentry] を、Ippei Suzuki氏（ [@nobodyplace][nobodyplace-twitter] ）が日本時間に対応させたバージョンを、私（ Masami HIRATA [@msmhrt][msmhrt-twitter] ）がカスタマイズしたバージョンです。その過程で見つけたいくつかの問題については修正を試みました。

publitweet Blackbird bookmarklet について
-------

[publitweet Blackbird bookmarklet][xdamman-blogentry]（以下、オリジナル版）は、Xavier Damman氏（ [@xdamman][xdamman-twitter] ）が作成したブックマークレットです。このブックマークレットは、Twitterのつぶやきを、任意のWebサイトに埋め込むためのHTMLに変換して表示してくれます。
（時々誤解があるようなのですが、このツールはTwitter社の公式ツールではありません。）

日本時間対応版について
-------

オリジナル版が生成したHTMLは、投稿日時を英語で表記（例：Wed Mar 09 04:33:59）する英語圏では当然の仕様になっています。タイムゾーンについては、Twitterのユーザーが世界各国にいる事を考慮しているのか、UTCになっています。

この点を不便に感じた Ippei Suzuki氏（ [@nobodyplace][nobodyplace-twitter] ）が、投稿時刻の表記を日本語（例：2011年3月9日 13:33）、タイムゾーンはユーザーのローカル時刻になるように改変したバージョン（以下、日本時間対応版）を作成し、それをご自身のblog、[NOBODY:PLACE][nobodyplace-blog]で公開してくれました。詳細については氏のblogのエントリ、「[Tweetを貼り付けるための公式ツール「Blackbird Pie」をさらに便利に使うBookmarkletを日本時間に対応させてみた][nobodyplace-blogentry]」をご覧ください。

そしてb4へ
-------

東日本大震災（ Tohoku Region Pacific Coast Earthquake ）の発生後に実施された炊き出し等についての情報を、Googleマップを使って位置情報つきで公開する「[炊き出しまっぷ][takidashimap]」（現：[避難地支援ぽーたるまっぷ][kyuen-map]）というマップがあります。

私は、このマップの共同編集者の一人であり、Twitterの生のつぶやきを、リンク等も含めた形でそのまま張り付ける作業を省力化するために、上記の日本時間対応版を使っていました。

しかし、Googleマップのマーカーの説明部分に使えるHTMLには様々な制限があるので、ブックマークレットのカスタマイズが必要になりました。慣れないJavaScriptに手こずりながら何とかカスタマイズしたバージョンをGoogleマップ対応バージョン（ [b4kml][b4kml-gist] ）として公開すると共に、追加した機能や修正の中で、通常のHTMLの生成にも流用可能な部分をマージしたのが、[b4][b4-gist]です。

差分の内容については、[コミット履歴][b4-history]をご覧ください。

使い方
-------

1. b4をブックマークツールバーに登録します。
    [b4][b4]のページから[b4の最新版][b4-archives]をダウンロードしたら、同梱の index.htmlをWebブラウザで開き、「b4」のリンクをブックマークバーにドラッグアンドドロップしてください。
    同じページ内の「b4kml」は、Googleマップのマーカーの説明文用にカスタマイズされたバージョンです。こちらをご利用の場合は、以下の手順のb4をb4kmlと読み替えてください。

2. つぶやきを探します。
    Webブラウザで自分のサイトに埋め込みたいつぶやきを探して、そのつぶやきのページを開いてください。

3. b4を実行します。
    ブックマークツールバー上のブックマークレットをクリックするだけです。
    中央にウィンドウが表示され、b4がつぶやきをHTMLに変換して表示します。
    ウィンドウが表示されない場合は、タイムライン上のつぶやきにマウスカーソルをあててみてください。
    もし、\[embed tweet\]というリンクがあれば、それがb4にウィンドウを表示させるためのリンクです。

4. 表示されたHTMLをコピーアンドペーストして、つぶやきを表示したいサイトに埋め込みます。
    これで完了です。

Gist
-------

ブックマークレットは Gistの [b4] [b4-gist]と [b4kml][b4kml-gist]でも公開しています。内容は同じ物です。

動作環境
-------

当方で動作を確認している環境は、Mac OS X版の Google Chromeの最新版です。
他の環境については、現在確認中です。

ライセンス
-------

オリジナル版である publitweet BlackBird bookmarklet にソフトウェアライセンスが付与されれば、それに準拠します。
しかし、現時点では、ライセンスが明記されていませんので、"as is"（あるがまま）で公開します。

謝辞
-------

素晴らしいブックマークレットを公開してくださった Xavier Damman氏に感謝を。
そして、日本語日時表示版を作成してくださった Ippei Suzuki氏にもお礼を。
私のJavaScriptスキルはとても低いので、お二人の成果なしにブックマークレットを公開する事はできませんでした。

連絡先
-------

 - Email: msmhrt AT gmail.com
 - Twitter: [@msmhrt][msmhrt-twitter]
 - Facebook: [Masami HIRATA][msmhrt-facebook]

[xdamman-twitter]: http://twitter.com/xdamman
[xdamman-blogentry]: http://publitweet.com/blog/2010/05/05/blackbird-bookmarklet-publish-a-tweet-in-html/
[nobodyplace-twitter]: http://twitter.com/nobodyplace
[nobodyplace-blog]: http://nplll.com/
[nobodyplace-blogentry]: http://nplll.com/archives/2011/03/tweetblackbird_piebookmarklet.php
[msmhrt-twitter]: http://twitter.com/msmhrt
[msmhrt-facebook]: http://www.facebook.com/msmhrt
[b4]: https://github.com/msmhrt/b4
[b4-archives]: https://github.com/msmhrt/b4/archives/master
[b4-history]: https://github.com/msmhrt/b4/commits
[b4-gist]: https://gist.github.com/899834
[b4kml-gist]: https://gist.github.com/905139
[takidashimap]: http://goo.gl/hrzU2
[kyuen-map]: http://kml-layers.appspot.com/kyuen-map/
[teritori]: https://github.com/msmhrt/teritori