Vide
====

Easy as hell video background.

Minified version size: ~3kb

## Notes
* All modern browsers are supported.
* IE9+

## Instructions

First of all, download it from [GitHub](https://github.com/VodkaBears/Vide/archive/master.zip) or via bower:
`bower install vide`

Add jQuery and Vide plugin before `</body>` tag or in the head section:
```js
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="js/jquery.vide.min.js"></script>
```

Prepare your video in several formats like '.webm' and 'mp4' for cross browser compability. Also you can add a poster:
```
path/
├── to/
│   ├── video.mp4
│   ├── video.webm
│   └── video.png
```

Finally, add `data-vide-bg` attribute with path to the video and poster without extension, video and poster must have the same name. Add `data-vide-options` to pass vide options, if you need it. By default video is muted, looped and starts automaticly.
```html
<div style="width: 1000px; height: 500px; margin: 0;"
    data-vide-bg="path/to/video">
</div>
```
```html
<body style="width: 100%; height: 100%; margin: 0;"
    data-vide-bg="path/to/video" data-vide-options="muted: false, volume: 0.5">
</body>
```
```html
<div style="width: 1000px; height: 500px; margin: 0;"
    data-vide-bg="path/to/video" data-vide-options="position: 0% 50%">
</div>
```

Or you can initialize it with JS, in some situations it can be helpful, because vide doesn't have mutation observers, they are on you own:
```js
$("#myBlock1").vide("path/to/video");
$("#myBlock2").vide("path/to/video", {
...options...
});
```

Easy as hell.
