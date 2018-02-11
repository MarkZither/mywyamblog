/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cors-fetch-notification-serviceworker-setclasses !*/
! function(e, n, t) {
    function s(e, n) { return typeof e === n }

    function i() { var e, n, t, i, o, f, c; for (var l in r)
            if (r.hasOwnProperty(l)) { if (e = [], n = r[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
                    for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase()); for (i = s(n.fn, "function") ? n.fn() : n.fn, o = 0; o < e.length; o++) f = e[o], c = f.split("."), 1 === c.length ? Modernizr[c[0]] = i : (!Modernizr[c[0]] || Modernizr[c[0]] instanceof Boolean || (Modernizr[c[0]] = new Boolean(Modernizr[c[0]])), Modernizr[c[0]][c[1]] = i), a.push((i ? "" : "no-") + c.join("-")) } }

    function o(e) { var n = c.className,
            t = Modernizr._config.classPrefix || ""; if (l && (n = n.baseVal), Modernizr._config.enableJSClass) { var s = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(s, "$1" + t + "js$2") }
        Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), l ? c.className.baseVal = n : c.className = n) } var a = [],
        r = [],
        f = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function(e, n) { var t = this;
                setTimeout(function() { n(t[e]) }, 0) }, addTest: function(e, n, t) { r.push({ name: e, fn: n, options: t }) }, addAsyncTest: function(e) { r.push({ name: null, fn: e }) } },
        Modernizr = function() {};
    Modernizr.prototype = f, Modernizr = new Modernizr, Modernizr.addTest("cors", "XMLHttpRequest" in e && "withCredentials" in new XMLHttpRequest), Modernizr.addTest("serviceworker", "serviceWorker" in navigator), Modernizr.addTest("fetch", "fetch" in e); var c = n.documentElement,
        l = "svg" === c.nodeName.toLowerCase();
    Modernizr.addTest("notification", function() { if (!e.Notification || !e.Notification.requestPermission) return !1; if ("granted" === e.Notification.permission) return !0; try { new e.Notification("") } catch (n) { if ("TypeError" === n.name) return !1 } return !0 }), i(), o(a), delete f.addTest, delete f.addAsyncTest; for (var u = 0; u < Modernizr._q.length; u++) Modernizr._q[u]();
    e.Modernizr = Modernizr }(window, document);