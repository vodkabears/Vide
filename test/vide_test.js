(function ($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */

    var $block1, $block2;

    QUnit.begin(function () {
        $block1 = $("#block1");
        $block2 = $("#block2");
    });

    QUnit.test("Initialization", function () {
        // js initialization
        $block2.vide("video/ocean");

        ok($block1.data("vide"));
        ok($block2.data("vide"));
    });

    QUnit.test("Parse path", function () {
        equal($block1.data("vide").path, $block1.data("vide-bg"));
    });

    QUnit.test("Parse options", function () {
        var video = $block1.data("vide").getVideoObject();

        equal(video.loop, false);
        equal(video.volume, 0.3);
        equal(video.playbackRate, 1.25);
        equal(video.style.left, "50%");
        equal(video.style.top, "100%");
    });

    QUnit.asyncTest("Poster detection", function () {
        var video = $block1.data("vide").getVideoObject();

        setTimeout(function () {
            ok(video.poster);
            QUnit.start();
        }, 500);
    });

    QUnit.test("Re-initialization", function () {
        $block1.vide("video/ocean");
        $block2.vide("video/ocean");
        $block2.vide("video/ocean");
        $block1.vide("video/ocean");

        var count = $.vide.lookup.filter(function (value) {
            return value !== undefined;
        }).length;

        ok($block1.data("vide"));
        ok($block2.data("vide"));
        equal(count, 2);
    });

    QUnit.test("Destroy", function () {
        $block1.data("vide").destroy();
        $block2.data("vide").destroy();

        var count = $.vide.lookup.filter(function (value) {
            return value !== undefined;
        }).length;

        equal(count, 0);
        equal($block1.find("video").length, 0);
        equal($block2.find("video").length, 0);
    });

}(jQuery));
