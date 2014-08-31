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
        $block2.vide("video/ocean", {
            posterType: "gif"
        });

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
        equal(video.playbackRate, 1);
        equal(video.style.left, "60%");
        equal(video.style.top, "100%");
    });

    QUnit.asyncTest("Poster detection", function () {
        var wrapper1 = $block1.data("vide").wrapper,
            wrapper2 = $block2.data("vide").wrapper;

        ok(wrapper2.css("background-image").search("video/ocean.gif") > -1);

        setTimeout(function () {
            ok(wrapper1.css("background-image").search("http://vodkabears.github.io/vide/video/ocean.jpg") > -1);
            QUnit.start();
        }, 5000);
    });

    QUnit.test("Poster position", function () {
        var wrapper = $block1.data("vide").wrapper,
            video = $block1.data("vide").getVideoObject();

        equal(wrapper.css("background-position"), video.style.left + " " + video.style.top);
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
