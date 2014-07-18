;(function ($, window, document) {
    "use strict";

    /**
     * Vide settings
     */
    var pluginName = "vide",
        defaults = {
            volume: 1,
            playbackRate: 1,
            muted: true,
            loop: true,
            autoplay: true,
            position: "50% 50%"
        };

    /**
     * Special plugin object for instances.
     * @type {Object}
     */
    $[pluginName] = {
        lookup: []
    };


    /**
     * Parse string with options
     * @param str
     * @returns {Object}
     */
    var parseOptions = function (str) {
        var obj = {}, clearedStr, arr;

        // remove spaces before and after delimiters
        clearedStr = str.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",");

        // parse string
        arr = clearedStr.split(",");
        var i, len, val;
        for (i = 0, len = arr.length; i < len; i++) {
            arr[i] = arr[i].split(":");
            val = arr[i][1];

            // convert string value if it is like a boolean
            if (typeof val === "string" || val instanceof String) {
                val = val === "true" || (val === "false" ? false : val);
            }

            // convert string value if it is like a number
            if (typeof val === "string" || val instanceof String) {
                val = !isNaN(val) ? +val : val;
            }

            obj[arr[i][0]] = val;
        }

        return obj;
    };

    /**
     * Parse position option
     * @param str
     * @returns {{x: *, y: *}}
     */
    var parsePosition = function (str) {
        var args = str.split(" ");

        switch (args[0]) {
            case "left":
                args[0] = "0%";
                break;
            case "center":
                args[0] = "50%";
                break;
            case "right":
                args[0] = "100%";
                break;
            default:
                break;
        }

        switch (args[1]) {
            case "top":
                args[1] = "0";
                break;
            case "middle":
                args[1] = "50%";
                break;
            case "bottom":
                args[1] = "100%";
                break;
            default:
                break;
        }

        return { x: args[0], y: args[1] };
    };

    /**
     * Vide constructor
     * @param element
     * @param path
     * @param options
     * @constructor
     */
    function Vide(element, path, options) {
        this.element = $(element);
        this._defaults = defaults;
        this._name = pluginName;

        // remove extension
        var index = path.lastIndexOf(".");
        path = path.slice(0, index < 0 ? path.length : index);

        this.settings = $.extend({}, defaults, options);
        this.path = path;

        this.init();
    }

    /**
     * Initialization
     */
    Vide.prototype.init = function () {
        var that = this;

        this.wrapper = $("<div>");
        this.video = $("<video>" +
            "<source src='" + this.path + ".mp4' type='video/mp4'>" +
            "<source src='" + this.path + ".webm' type='video/webm'>" +
            "<source src='" + this.path + ".ogg' type='video/ogg'>" +
            "</video>");
        this.wrapper.append(this.video);
        this.element.prepend(this.wrapper);

        // Set video properties
        this.video.prop({
            autoplay: this.settings.autoplay,
            loop: this.settings.loop,
            volume: this.settings.volume,
            muted: this.settings.muted,
            playbackRate: this.settings.playbackRate
        });

        // Set video poster
        $.get(this.path + ".png")
            .done(function () {
                that.video[0].poster = that.path + ".png";
            });
        $.get(this.path + ".jpg")
            .done(function () {
                that.video[0].poster = that.path + ".jpg";
            });
        $.get(this.path + ".gif")
            .done(function () {
                that.video[0].poster = that.path + ".gif";
            });

        // Set video wrapper styles
        this.wrapper.css({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "bottom": 0,
            "right": 0,
            "overflow": "hidden"
        });

        // if parent element has a static position, make it relative
        if (this.element.css("position") === "static") {
            this.element.css("position", "relative");
        }

        // Video alignment
        var position = parsePosition(this.settings.position);
        this.video.css({
            "margin": "auto",
            "position": "absolute",
            "top": position.y,
            "left": position.x,
            "-webkit-transform": "translate(-" + position.x + ", -" + position.y + ")",
            "-ms-transform": "translate(-" + position.x + ", -" + position.y + ")",
            "transform": "translate(-" + position.x + ", -" + position.y + ")"
        });

        // resize video, when it's loaded
        this.resize();
        this.video.bind("loadedmetadata." + pluginName, function () {
            that.resize();
        });

        // resize event is available only for 'window',
        // use another code solutions to detect DOM elements resizing
        $(this.element).bind("resize." + pluginName, function () {
            that.resize();
        });
    };

    /**
     * Get video element of the background
     * @returns {HTMLVideoElement}
     */
    Vide.prototype.getVideoObject = function () {
        return this.video[0];
    };

    /**
     * Resize video background
     */
    Vide.prototype.resize = function () {
        // get native video size
        var videoHeight = this.video[0].videoHeight,
            videoWidth = this.video[0].videoWidth;

        // get wrapper size
        var wrapperHeight = this.wrapper.height(),
            wrapperWidth = this.wrapper.width();

        if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
            this.video.css({
                "width": wrapperWidth + 2, // +2 pixels to prevent empty space after transformation
                "height": "auto"
            });
        } else {
            this.video.css({
                "width": "auto",
                "height": wrapperHeight + 2 // +2 pixels to prevent empty space after transformation
            });
        }
    };

    /**
     * Destroy video background
     */
    Vide.prototype.destroy = function () {
        this.element.unbind(pluginName);
        this.video.unbind(pluginName);
        delete $[pluginName].lookup[this.index];
        this.element.removeData(pluginName);
        this.wrapper.remove();
    };

    /**
     * Plugin constructor
     * @param path
     * @param options
     * @returns {*}
     */
    $.fn[pluginName] = function (path, options) {
        var instance;
        this.each(function () {
            instance = $.data(this, pluginName);
            if (instance) {
                // destroy plugin instance if exists
                instance.destroy();
            }
            // create plugin instance
            instance = new Vide(this, path, options);
            instance.index = $[pluginName].lookup.push(instance) - 1;
            $.data(this, pluginName, instance);
        });

        return this;
    };

    $(document).ready(function () {
        // window resize event listener
        $(window).bind("resize." + pluginName, function () {
            for (var len = $[pluginName].lookup.length, instance, i = 0; i < len; i++) {
                instance = $[pluginName].lookup[i];
                if (instance) {
                    instance.resize();
                }
            }
        });

        // Auto initialization.
        // Add 'data-vide-bg' attribute with a path to the video without extension.
        // Also you can pass options throw the 'data-vide-options' attribute.
        // 'data-vide-options' must be like "muted: false, volume: 0.5".
        $(document).find("[data-" + pluginName + "-bg]").each(function (i, element) {
            var $element = $(element),
                options = $element.data(pluginName + "-options"),
                path = $element.data(pluginName + "-bg");

            if (!options) {
                options = {};
            } else {
                options = parseOptions(options);
            }

            $element[pluginName](path, options);
        });
    });
})(jQuery || Zepto, window, document);
