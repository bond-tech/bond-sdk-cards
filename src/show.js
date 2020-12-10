/*!
 * Very Good Security
 * Show.js version 1.2
 * 1598544356716
 */
!(function (e) {
  var t = {};

  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = {
      i: n,
      l: !1,
      exports: {},
    });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) ||
        Object.defineProperty(e, t, {
          enumerable: !0,
          get: n,
        });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(e, "__esModule", {
          value: !0,
        });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", {
          enumerable: !0,
          value: e,
        }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 21));
})({
  0: function (e, t) {
    e.exports = function (e, t, r) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    };
  },
  1: function (e, t) {
    e.exports = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    };
  },
  2: function (e, t) {
    function r(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    e.exports = function (e, t, n) {
      return t && r(e.prototype, t), n && r(e, n), e;
    };
  },
  21: function (e, t, r) {
    "use strict";
    r.r(t);
    var n = r(5);
    Object(n.a)({
      tntc4x4iymh: "https://tntc4x4iymh.sandbox.verygoodproxy.com",
      tntmfo8fafa: "https://tntmfo8fafa.live.verygoodproxy.com",
    });
  },
  3: function (e, t) {
    function r() {
      return (
        (e.exports = r =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }),
        r.apply(this, arguments)
      );
    }
    e.exports = r;
  },
  4: function (e, t) {
    function r(t) {
      return (
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? (e.exports = r = function (e) {
              return typeof e;
            })
          : (e.exports = r = function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
        r(t)
      );
    }
    e.exports = r;
  },
  5: function (e, t, r) {
    "use strict";
    var n = r(3),
      o = r.n(n),
      a = r(0),
      i = r.n(a),
      s = r(4),
      c = r.n(s),
      u = r(1),
      f = r.n(u),
      l = r(2),
      p = r.n(l);

    function d() {
      var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : "randomId",
        t = new Date().getDate(),
        r = "".concat(Math.random()).replace(/[^\w\d]/, "");
      return [e, t, r].join("");
    }
    var m = function (e) {
        try {
          return btoa(e);
        } catch (e) {
          throw "Unable to convert value to base64";
        }
      },
      y = function (e) {
        var t,
          r,
          n =
            -1 == (t = e.replace(/^https?:\/\//, "")).indexOf("verygoodproxy.");
        try {
          r = n ? "cname" : t.split(".")[1];
        } catch (e) {
          r = "unknown";
        }
        return r;
      };

    function h(e) {
      return ""
        .concat("https://js.verygoodvault.com/vgs-show/1.2/lib", "/index.html?")
        .concat(
          (function (e) {
            var t = "";

            function r(e, r) {
              t.length > 0 && (t += "&"),
                (t += encodeURIComponent(e) + "=" + encodeURIComponent(r));
            }
            return (
              Object.keys(e)
                .sort()
                .forEach(function (t) {
                  var n = e[t];
                  Array.isArray(n)
                    ? n.forEach(function (e) {
                        return r(t, e);
                      })
                    : r(t, n);
                }),
              t
            );
          })(e)
        );
    }
    var b = [
      "formId",
      "iframeId",
      "name",
      "env",
      "vaultId",
      "method",
      "path",
      "payload",
      "headers",
      "jsonPathSelector",
      "responseDataType",
      "htmlWrapper",
      "decodeFromBase64",
      "displayBase64Image",
      "decodeDataFrom",
      "xhrResponseType",
      "text",
      "serializers",
    ];

    function v(e, t) {
      var r,
        n = (function (e) {
          var t = document.createElement("iframe");
          return (
            t.setAttribute("title", "Secure Show.js frame"),
            t.setAttribute("src", h(e)),
            t.setAttribute("frameborder", "0"),
            t.setAttribute("scrolling", "0"),
            t.setAttribute("allowtransparency", "true"),
            t.setAttribute("id", e.iframeId),
            t.setAttribute("name", e.name),
            t
          );
        })(t);
      return (
        ("string" == typeof (r = e) || r instanceof String
          ? document.querySelector(e)
          : e
        ).appendChild(n),
        n
      );
    }

    function O(e, t) {
      function r(r) {
        r.data.messageName === e && t(r.data.payload);
      }
      return window.addEventListener("message", r), r;
    }

    function g(e, t) {
      return O(e, function (e) {
        t(e);
      });
    }

    function w(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }

    function j(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? w(Object(r), !0).forEach(function (t) {
              i()(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : w(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    r.d(t, "a", function () {
      return E;
    });
    var I = function (e) {
        throw "Please specify ".concat(e, ". This param is required.");
      },
      x = {
        htmlWrapper: ["image", "text"],
        xhrResponseType: ["arraybuffer", "json"],
        decodeDataFrom: ["base64"],
      },
      S = function (e) {
        for (var t in e)
          if (
            Object.prototype.hasOwnProperty.call(x, t) &&
            -1 === x[t].indexOf(e[t])
          )
            throw "Available values for ".concat(t, ": ").concat(x[t]);
        return (
          (r = e),
          (n = b),
          Object.keys(r)
            .filter(function (e) {
              return n.indexOf(e) >= 0;
            })
            .reduce(function (e, t) {
              return (e[t] = r[t]), e;
            }, {})
        );
        var r, n;
      },
      P = (function () {
        function e(t) {
          var r = this;
          f()(this, e),
            (this.iframe = null),
            (this.frames = []),
            (this.iframeId = d()),
            (this.params = t),
            O("frameReady", function (e) {
              e.iframeId === r.iframeId &&
                r._postMessage({
                  messageName: "setProperties",
                  params: r.params,
                });
            });
        }
        return (
          p()(e, [
            {
              key: "render",
              value: function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  r = this.params,
                  n = r.formId,
                  o = r.name,
                  a = r.vaultId,
                  i = r.vaultUrl,
                  s = r.type,
                  u = this.params.serializers;
                if (t && "object" !== c()(t))
                  throw "styles argument should be type of Object!";
                if (u)
                  try {
                    u = window.btoa(JSON.stringify(u));
                  } catch (e) {
                    throw new Error("Unable to parse serializers");
                  }
                var f = {
                  formId: n,
                  name: o,
                  serializers: u,
                  type: s,
                  iframeId: this.iframeId,
                  vaultId: m(a),
                  env: m(y(i)),
                };
                return (
                  Object.keys(f).forEach(function (e) {
                    return void 0 === f[e] && delete f[e];
                  }),
                  (this.params = j({}, this.params, {
                    styles: t,
                  })),
                  (this.iframe = v(e, f)),
                  this.frames.push(this.iframe),
                  this
                );
              },
            },
            {
              key: "_postMessage",
              value: function (e) {
                this.iframe.contentWindow.postMessage(e, "*");
              },
            },
          ]),
          e
        );
      })(),
      k = (function () {
        function e(t, r, n) {
          var a = this;
          f()(this, e),
            (this.vaultUrl = r),
            (this.vaultId = t),
            (this.formId = d()),
            (this.state = {}),
            (this.frames = []),
            (this.SERIALIZERS = {
              replace: function (e, t, r) {
                return {
                  name: "replace",
                  options: {
                    old: e,
                    new: t,
                    count: r,
                  },
                };
              },
            }),
            (function (e) {
              O("update", e);
            })(function (e) {
              var t, r;
              e.formId === a.formId &&
                ((t = e),
                (r = "formId"),
                (e = Object.keys(t)
                  .filter(function (e) {
                    return -1 === r.indexOf(e);
                  })
                  .reduce(function (e, r) {
                    return (e[r] = t[r]), e;
                  }, {})),
                (a.state = o()({}, a.state, i()({}, e.name, e))),
                n && n(a.state));
            });
        }
        return (
          p()(e, [
            {
              key: "request",
              value: function (e) {
                var t = e,
                  r = t.method,
                  n = void 0 === r ? I("method") : r,
                  o = t.path,
                  a = void 0 === o ? I("path") : o,
                  i = t.name,
                  s = void 0 === i ? I("name") : i;
                if (
                  (e.responseDataType && (e.htmlWrapper = e.responseDataType),
                  e.decodeFromBase64 &&
                    (e.displayBase64Image = e.decodeFromBase64),
                  (e.htmlWrapper = e.htmlWrapper || "text"),
                  (e = S(e)),
                  n && a && s)
                )
                  return new P(
                    j({}, e, {
                      vaultUrl: this.vaultUrl,
                      vaultId: this.vaultId,
                      formId: this.formId,
                    })
                  );
              },
            },
            {
              key: "copyFrom",
              value: function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {
                          text: "Copy",
                          serializers: !1,
                        },
                  r = arguments.length > 2 ? arguments[2] : void 0,
                  n = "";
                if (!e)
                  throw new Error(
                    "Please specify target field for the copy button."
                  );
                if ("text" !== e.params.htmlWrapper)
                  throw new Error(
                    "Copy option available only for the text content."
                  );
                if (
                  (r && g((n = d("copyCallback")), r),
                  (t = S(t)),
                  e.params.formId === this.formId)
                )
                  return new P(
                    j({}, t, {
                      name: "show-js-copy-button",
                      type: "copy-button",
                      htmlWrapper: "button",
                      callbackId: n,
                      targetId: e.iframeId,
                      vaultUrl: this.vaultUrl,
                      vaultId: this.vaultId,
                      formId: this.formId,
                    })
                  );
              },
            },
          ]),
          e
        );
      })();

    function E(e) {
      window.VGSShow = {
        create: function (t, r) {
          if (-1 === Object.keys(e).indexOf(t))
            throw "Environment '"
              .concat(t, "' does not exist. Valid choices are: ")
              .concat(Object.keys(e).join(","));
          return new k(t, e[t], r);
        },
      };
    }
  },
});
