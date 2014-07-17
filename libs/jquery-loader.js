(function () {
    // Default to the local version.
    var path = '../libs/jquery/jquery-1.11.1.js';
    // Get any jquery=___ param from the query string.
    var jqversion = location.search.match(/[?&]jquery=(.*?)(?=&|$)/);
    // If a version was specified, use that version from code.jquery.com.
    if (jqversion) {
        path = '../libs/jquery/jquery-' + jqversion[1] + '.js';
    }

    document.write('<script src="' + path + '"></script>');
}());
