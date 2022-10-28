(function () {
    var id = document.currentScript.getAttribute("data-id");
    var utcoffset = document.currentScript.getAttribute("data-utcoffset");
    var server =
        document.currentScript.getAttribute("data-server") ||
        "https://counter.dev";

    if (
        !sessionStorage.getItem("_swa") &&
        !document.referrer.startsWith(location.protocol + "//" + location.host)
    ) {
        setTimeout(function () {
            sessionStorage.setItem("_swa", "1");
            fetch(
                server +
                    "/track?" +
                    new URLSearchParams({
                        referrer: document.referrer,
                        screen: screen.width + "x" + screen.height,
                        id: id,
                        utcoffset: utcoffset,
                    })
            );
        }, 2500);
    }
    navigator.sendBeacon(
        server + "/trackpage",
        new URLSearchParams({
            id: id,
            page: window.location.pathname,
        })
    );
})();
