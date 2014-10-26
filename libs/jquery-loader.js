(function () {
    // Get any jquery=___ param from the query string.
    var jqversion = location.search.match(/[?&]jquery=(.*?)(?=&|$)/);

    document.write("<script src='../libs/jquery" + jqversion[1] + "/dist/jquery.js'></script>");
}());
