# Vide

Easy as hell jQuery plugin for video backgrounds.

## Notes

* All modern desktop browsers are supported.
* IE9+
* iOS plays video from a browser only in the native player. So video for iOS is
disabled, only fullscreen poster will be used.
* Some android devices play video, some not — go figure. So video for android is
disabled, only fullscreen poster will be used.

## Install

```sh
meteor add vodkabears:vide
```

## Usage

Prepare your video in several formats like '.webm', '.mp4' for cross browser
compatibility, also add a poster with `.jpg`, `.png` or `.gif` extension:
```
path/
├── to/
│   ├── video.mp4
│   ├── video.ogv
│   ├── video.webm
│   └── video.jpg
```

Because of how meteor renders templates reactively you will need to initialize
manually for the templates you want to use vide in.

```js
Template.templateName.onRendered(function() {
  this.$('#elementName').vide('path/to/video');
});
```

Meteor integration by [zimme](https://github.com/zimme).

## Options

Below is a complete list of options and matching default values:

```js
{
  volume: 1,
  playbackRate: 1,
  muted: true,
  loop: true,
  autoplay: true,
  position: '50% 50%', // Similar to the CSS `background-position` property.
  posterType: 'detect', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
  resizing: true // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
}
```

## Methods

Below is a complete list of methods:

```js
// Get instance of the plugin
var instance = $('#yourElement').data('vide');

// Get video element of the background. Do what you want.
instance.getVideoObject();

// Resize video background.
// It calls automatically, if window resize (or element, if you will use
// something like https://github.com/cowboy/jquery-resize).
instance.resize();

// Destroy plugin instance
instance.destroy();
```

## More Info

See full documentation on
[Github](https://github.com/VodkaBears/Vide).
