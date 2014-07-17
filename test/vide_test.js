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

    QUnit.test("Initialization", function () {
        $block1 = $("#block1");
        $block2 = $("#block2");

        // js initialization
        $block2.vide("video/ocean");

        ok($.vide.lookup[$block1.data("vide")]);
        ok($.vide.lookup[$block2.data("vide")]);
    });

    QUnit.test("Re-initialization", function () {
        $block1.vide("video/ocean");
        $block2.vide("video/ocean");
        $block2.vide("video/ocean");
        $block1.vide("video/ocean");

        var count = $.vide.lookup.filter(function(value) {
            return value !== undefined;
        }).length;

        ok($block1.data("vide"));
        ok($block2.data("vide"));
        equal(count, 2);
    });

    QUnit.test("Destroy", function () {
        $.vide.lookup[$block1.data("vide")].destroy();
        $.vide.lookup[$block2.data("vide")].destroy();

        var count = $.vide.lookup.filter(function(value) {
            return value !== undefined;
        }).length;

        equal(count, 0);
        equal($block1.find("video").length, 0);
        equal($block2.find("video").length, 0);
    });


}(jQuery));
