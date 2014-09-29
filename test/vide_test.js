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

    var $block1, $block2, $block3, $block4, $block5;

    QUnit.begin(function () {
        $block1 = $("#block1");
        $block2 = $("#block2");
        $block3 = $("#block3");
        $block4 = $("#block4");
        $block5 = $("#block5");
    });

    QUnit.test("Initialization", function () {
        // js initialization
        $block2.vide("video/ocean", {
            posterType: "gif"
        });

        $block5.vide(
            "mp4: video/ocean, webm: video/ocean.webm, ogv: video/ocean, poster: video/ocean",
            "loop:   false,volume:0.3,   playbackRate:"
        );

        ok($block1.data("vide"));
        ok($block2.data("vide"));
        ok($block3.data("vide"));
        ok($block4.data("vide"));
        ok($block5.data("vide"));
    });

    QUnit.test("Parse path", function () {
        equal($block1.data("vide").path, $block1.data("vide-bg"));
    });

    QUnit.test("Parsing of a path with multiple names", function () {
        deepEqual($block3.data("vide").path, {
            mp4: "http://vodkabears.github.io/vide/video/ocean",
            webm: "video/ocean",
            ogv: "video/ocean",
            poster: "video/ocean"
        });
    });

    QUnit.test("Parse options", function () {
        var inst = $block1.data("vide"),
            video = $block1.data("vide").getVideoObject();

        equal(inst.settings.loop, false);
        equal(inst.settings.volume, 0.3);
        equal(inst.settings.playbackRate, 1);
        equal(inst.settings.position, "60%    bottom");

        equal(video.loop, false);
        equal(video.volume, 0.3);
        equal(video.playbackRate, 1);
        equal(video.style.left, "60%");
        equal(video.style.top, "100%");
    });

    QUnit.test("Passing JSON with a data attribute", function () {
        var inst = $block4.data("vide");

        deepEqual(inst.path, {
            mp4: "http://vodkabears.github.io/vide/video/ocean",
            webm: "video/ocean",
            ogv: "video/ocean",
            poster: "video/ocean"
        });

        equal(inst.settings.loop, false);
        equal(inst.settings.volume, 0.3);
    });

    QUnit.test("Passing strings with params directly to the constructor", function () {
        var inst = $block5.data("vide");

        deepEqual(inst.path, {
            mp4: "video/ocean",
            webm: "video/ocean",
            ogv: "video/ocean",
            poster: "video/ocean"
        });

        equal(inst.settings.loop, false);
        equal(inst.settings.volume, 0.3);
        equal(inst.settings.playbackRate, 1);
    });

    QUnit.asyncTest("Poster detection", function () {
        var inst1 = $block1.data("vide"),
            inst2 = $block2.data("vide"),
            wrapper1 = inst1.wrapper,
            wrapper2 = inst2.wrapper;

        equal(inst2.settings.posterType, "gif");
        ok(wrapper2.css("background-image").search("video/ocean.gif") > -1);

        equal(inst1.settings.posterType, "detect");
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
        $block3.vide("video/ocean");

        var count = $.vide.lookup.filter(function (value) {
            return value !== undefined;
        }).length;

        ok($block1.data("vide"));
        ok($block2.data("vide"));
        ok($block3.data("vide"));
        ok($block4.data("vide"));
        ok($block5.data("vide"));
        equal(count, 5);
    });

    QUnit.test("Destroy", function () {
        $block1.data("vide").destroy();
        $block2.data("vide").destroy();
        $block3.data("vide").destroy();
        $block4.data("vide").destroy();
        $block5.data("vide").destroy();

        var count = $.vide.lookup.filter(function (value) {
            return value !== undefined;
        }).length;

        equal(count, 0);
        equal($block1.find("video").length, 0);
        equal($block2.find("video").length, 0);
        equal($block3.find("video").length, 0);
        equal($block4.find("video").length, 0);
        equal($block5.find("video").length, 0);
    });

}(jQuery));
