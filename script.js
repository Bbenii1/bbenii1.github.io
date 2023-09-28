window.addEventListener("load", function() {
    document.getElementById("noselect").onselectstart = function() {
        return false;
    };
});