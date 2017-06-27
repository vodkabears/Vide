(function($) {
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

  var $block1;
  var $block2;
  var $block3;
  var $block4;
  var $block5;
  var $block6;
  var $block7;

  QUnit.begin(function() {
    $block1 = $('#block1');
    $block2 = $('#block2');
    $block3 = $('#block3');
    $block4 = $('#block4');
    $block5 = $('#block5');
    $block6 = $('#block6');
    $block7 = $('#block7');
  });

  QUnit.test('Initialization', function() {
    // js initialization
    $block2.vide('video/ocean', {
      posterType: 'gif'
    });

    $block5.vide(
      'mp4: video/ocean, webm: video/ocean.webm, ogv: video/ocean, poster: video/ocean',
      'loop:   false,volume:0.3,   playbackRate:'
    );

    ok($block1.data('vide'));
    ok($block2.data('vide'));
    ok($block3.data('vide'));
    ok($block4.data('vide'));
    ok($block5.data('vide'));
    ok($block6.data('vide'));
    ok($block7.data('vide'));
  });

  QUnit.test('Default settings', function() {
    var inst = $block6.data('vide');

    strictEqual(inst.settings.volume, 1);
    strictEqual(inst.settings.playbackRate, 1);
    strictEqual(inst.settings.muted, true);
    strictEqual(inst.settings.loop, true);
    strictEqual(inst.settings.autoplay, true);
    strictEqual(inst.settings.position, '50% 50%');
    strictEqual(inst.settings.posterType, 'detect');
    strictEqual(inst.settings.resizing, true);
    strictEqual(inst.settings.bgColor, 'transparent');
    strictEqual(inst.settings.className, '');
  });

  QUnit.test('Parsing of the path', function() {
    strictEqual($block1.data('vide').path, $block1.data('vide-bg'));
  });

  QUnit.test('Parsing of the path with multiple names', function() {
    deepEqual($block3.data('vide').path, {
      mp4: 'http://vodkabears.github.io/vide/video/ocean',
      webm: 'video/ocean.webm',
      ogv: 'http://vodkabears.github.io:80/vide/video/ocean',
      poster: 'video/ocean'
    });
  });

  QUnit.test('Parsing of the options', function() {
    var inst = $block1.data('vide');
    var video = inst.getVideoObject();

    strictEqual(inst.settings.loop, false);
    strictEqual(inst.settings.volume, 0.3);
    strictEqual(inst.settings.playbackRate, 1);
    strictEqual(inst.settings.position, '60%    bottom');
    strictEqual(inst.settings.className, 'vide-wrapper');

    strictEqual(video.loop, false);
    strictEqual(video.volume, 0.3);
    strictEqual(video.playbackRate, 1);
    strictEqual(video.style.left, '60%');
    strictEqual(video.style.top, '100%');
    ok(inst.$wrapper.hasClass('vide-wrapper'));
  });

  QUnit.test('Passing JSON with the data attribute', function() {
    var inst = $block4.data('vide');

    deepEqual(inst.path, {
      mp4: 'http://vodkabears.github.io/vide/video/ocean',
      webm: 'video/ocean.webm',
      ogv: 'http://vodkabears.github.io:80/vide/video/ocean.ogv',
      poster: 'video/ocean'
    });

    strictEqual(inst.settings.loop, false);
    strictEqual(inst.settings.volume, 0.3);
  });

  QUnit.test('Passing strings with params directly to the constructor', function() {
    var inst = $block5.data('vide');

    deepEqual(inst.path, {
      mp4: 'video/ocean',
      webm: 'video/ocean.webm',
      ogv: 'video/ocean',
      poster: 'video/ocean'
    });

    strictEqual(inst.settings.loop, false);
    strictEqual(inst.settings.volume, 0.3);
    strictEqual(inst.settings.playbackRate, 1);
  });

  QUnit.asyncTest('Poster detection', function() {
    var inst1 = $block1.data('vide');
    var inst2 = $block2.data('vide');
    var inst3 = $block3.data('vide');
    var $wrapper1 = inst1.$wrapper;
    var $wrapper2 = inst2.$wrapper;
    var $wrapper3 = inst3.$wrapper;

    strictEqual(inst2.settings.posterType, 'gif');
    ok($wrapper2.css('background-image').search('video/ocean.gif') > -1);

    strictEqual(inst3.settings.posterType, 'none');
    strictEqual($wrapper3.css('background-image'), 'none');

    strictEqual(inst1.settings.posterType, 'detect');
    setTimeout(function() {
      ok($wrapper1
        .css('background-image')
          .search('http://vodkabears.github.io/vide/video/ocean.jpg') > -1);
      QUnit.start();
    }, 5000);
  });

  QUnit.test('Poster position', function() {
    var $wrapper = $block1.data('vide').$wrapper;
    var video = $block1.data('vide').getVideoObject();

    strictEqual($wrapper.css('background-position'), video.style.left + ' ' + video.style.top);
  });

  QUnit.test('Path extension detection', function() {
    var inst4 = $block4.data('vide');
    var $wrapper4 = inst4.$wrapper;
    var inst7 = $block7.data('vide');
    var $wrapper7 = inst7.$wrapper;

    // Test without extention
    strictEqual(inst4.path.mp4, 'http://vodkabears.github.io/vide/video/ocean');
    strictEqual($wrapper4.find('source').filter(function() {
      return $(this).attr('type') === 'video/mp4';
    }).attr('src'), inst4.path.mp4 + '.mp4');

    // Test with extention
    strictEqual(inst7.path.mp4, 'video/ocean.mp4?ts=12345678');
    strictEqual($wrapper7.find('source').attr('src'), inst7.path.mp4);
  });

  QUnit.test('Re-initialization', function() {
    $block1.vide('video/ocean');
    $block2.vide('video/ocean');
    $block2.vide('video/ocean');
    $block1.vide('video/ocean');
    $block3.vide('video/ocean');

    var count = $.vide.lookup.filter(function(value) {
      return value !== undefined;
    }).length;

    ok($block1.data('vide'));
    ok($block2.data('vide'));
    ok($block3.data('vide'));
    ok($block4.data('vide'));
    ok($block5.data('vide'));
    ok($block6.data('vide'));
    ok($block7.data('vide'));
    equal(count, 7);
  });

  QUnit.test('getVideoObject() method', function() {
    ok($block1.data('vide').getVideoObject());
    ok($block2.data('vide').getVideoObject());
    ok($block3.data('vide').getVideoObject());
    ok($block4.data('vide').getVideoObject());
    ok($block5.data('vide').getVideoObject());
    ok($block6.data('vide').getVideoObject());
    ok($block7.data('vide').getVideoObject());
  });

  QUnit.test('resize() method', function() {
    var inst = $block1.data('vide');
    var videoHeight = inst.$video[0].videoHeight;
    var videoWidth = inst.$video[0].videoWidth;
    var wrapperHeight = inst.$wrapper.height();
    var wrapperWidth = inst.$wrapper.width();

    inst.$video[0].style.width = '300px';
    inst.$video[0].style.height = '300px';

    inst.resize();

    if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
      strictEqual(inst.$video[0].style.width, wrapperWidth + 2 + 'px');
      strictEqual(inst.$video[0].style.height, 'auto');
    } else {
      strictEqual(inst.$video[0].style.width, 'auto');
      strictEqual(inst.$video[0].style.height, wrapperHeight + 2 + 'px');
    }
  });

  QUnit.test('destroy() method', function() {
    $block1.data('vide').destroy();
    $block2.data('vide').destroy();
    $block3.data('vide').destroy();
    $block4.data('vide').destroy();
    $block5.data('vide').destroy();
    $block6.data('vide').destroy();
    $block7.data('vide').destroy();

    var count = $.vide.lookup.filter(function(value) {
      return value !== undefined;
    }).length;

    strictEqual(count, 0);
    strictEqual($block1.find('video').length, 0);
    strictEqual($block2.find('video').length, 0);
    strictEqual($block3.find('video').length, 0);
    strictEqual($block4.find('video').length, 0);
    strictEqual($block5.find('video').length, 0);
    strictEqual($block6.find('video').length, 0);
    strictEqual($block7.find('video').length, 0);
  });

}(window.jQuery));
