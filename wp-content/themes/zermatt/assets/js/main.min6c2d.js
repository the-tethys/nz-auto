!(function (o) {
    "use strict";
    (window.qodef = {}),
        (qodef.body = o("body")),
        (qodef.html = o("html")),
        (qodef.windowWidth = o(window).width()),
        (qodef.windowHeight = o(window).height()),
        (qodef.scroll = 0),
        o(document).ready(function () {
            (qodef.scroll = o(window).scrollTop()), i.init(), x.init(), n.init(), r.init();
        }),
        o(window).on("load", function () {
            e.init();
        }),
        o(window).resize(function () {
            (qodef.windowWidth = o(window).width()), (qodef.windowHeight = o(window).height());
        }),
        o(window).scroll(function () {
            qodef.scroll = o(window).scrollTop();
        }),
        o(document).on("zermatt_trigger_get_new_posts", function () {
            x.init(), n.init(), e.init();
        });
    var i = {
            init: function () {
                i.addBodyClassName();
            },
            isBrowser: function (e) {
                var t = !1;
                switch (e) {
                    case "chrome":
                        t = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                        break;
                    case "safari":
                        t = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        break;
                    case "firefox":
                        t = -1 < navigator.userAgent.toLowerCase().indexOf("firefox");
                        break;
                    case "ie":
                        t = 0 < window.navigator.userAgent.indexOf("MSIE ") || !!navigator.userAgent.match(/Trident.*rv\:11\./);
                        break;
                    case "edge":
                        t = /Edge\/\d./i.test(navigator.userAgent);
                }
                return t;
            },
            addBodyClassName: function () {
                o.each(["chrome", "safari", "firefox", "ie", "edge"], function (e, t) {
                    i.isBrowser(t) && void 0 !== qodef.body && ("ie" === t && (t = "ms-explorer"), qodef.body.addClass("qodef-browser--" + t));
                });
            },
        },
        x = {
            init: function (e) {
                var t = o(".qodef-testimonials-list");
                t.length &&
                    t.each(function () {
                        var e = o(this),
                            t = e.find(".swiper-slide"),
                            i = 0;
                        t.each(function () {
                            var e = o(this).height();
                            i < e && (i = e);
                        }),
                            e.css("height", i),
                            t.css("height", i);
                    }),
                    (this.holder = o(".qodef-swiper-container")),
                    o.extend(this.holder, e),
                    this.holder.length &&
                        this.holder.each(function () {
                            x.createSlider(o(this));
                        });
            },
            createSlider: function (e) {
                var t = x.getOptions(e),
                    i = x.getEvents(e, t);
                new Swiper(e, Object.assign(t, i));
            },
            getOptions: function (e, t) {
                var i = void 0 !== e.data("options") ? e.data("options") : {},
                    n = void 0 !== i.spaceBetween && "" !== i.spaceBetween ? i.spaceBetween : 0,
                    o = void 0 !== i.slidesPerView && "" !== i.slidesPerView ? i.slidesPerView : 1,
                    a = void 0 !== i.centeredSlides && "" !== i.centeredSlides && i.centeredSlides,
                    r = void 0 !== i.direction && "" !== i.direction ? i.direction : "horizontal",
                    s = void 0 !== i.effect && "" !== i.effect ? i.effect : "slide",
                    d = void 0 !== i.sliderScroll && "" !== i.sliderScroll && i.sliderScroll,
                    l = void 0 === i.loop || "" === i.loop || i.loop,
                    c = void 0 === i.autoplay || "" === i.autoplay || i.autoplay,
                    h = void 0 !== i.grab && "" !== i.grab && i.grab,
                    f = void 0 !== i.speed && "" !== i.speed ? parseInt(i.speed, 10) : 2e3,
                    u = void 0 !== i.speedAnimation && "" !== i.speedAnimation ? parseInt(i.speedAnimation, 10) : 800,
                    p = void 0 !== i.slideAnimation && "" !== i.slideAnimation ? i.slideAnimation : "",
                    g = void 0 !== i.customStages && "" !== i.customStages && i.customStages,
                    m = void 0 !== i.outsideNavigation && "yes" === i.outsideNavigation,
                    v = m ? ".swiper-button-next-" + i.unique : e.find(".swiper-button-next"),
                    w = m ? ".swiper-button-prev-" + i.unique : e.find(".swiper-button-prev"),
                    q = e.find(".swiper-pagination");
                !1 !== c && 2e3 !== f && (c = { delay: f }), qodef.windowWidth < 1025 && (r = "horizontal"), 1 < o && (s = "slide");
                var y = void 0 !== i.slidesPerView1440 && "" !== i.slidesPerView1440 ? parseInt(i.slidesPerView1440, 10) : 5,
                    S = void 0 !== i.slidesPerView1366 && "" !== i.slidesPerView1366 ? parseInt(i.slidesPerView1366, 10) : 4,
                    P = void 0 !== i.slidesPerView1024 && "" !== i.slidesPerView1024 ? parseInt(i.slidesPerView1024, 10) : 3,
                    _ = void 0 !== i.slidesPerView768 && "" !== i.slidesPerView768 ? parseInt(i.slidesPerView768, 10) : 2,
                    b = void 0 !== i.slidesPerView680 && "" !== i.slidesPerView680 ? parseInt(i.slidesPerView680, 10) : 1;
                g || (o < 2 ? (_ = P = S = y = o) : o < 3 ? (P = S = y = o) : o < 4 ? (S = y = o) : o < 5 && (y = o));
                var C = {
                    slidesPerView: o,
                    centeredSlides: a,
                    direction: r,
                    effect: s,
                    sliderScroll: d,
                    spaceBetween: n,
                    autoplay: c,
                    grabCursor: h,
                    loop: l,
                    speed: u,
                    navigation: { nextEl: v, prevEl: w },
                    pagination: { el: q, type: "bullets", clickable: !0 },
                    breakpoints: {
                        0: { slidesPerView: void 0 !== i.slidesPerView480 && "" !== i.slidesPerView480 ? parseInt(i.slidesPerView480, 10) : 1 },
                        481: { slidesPerView: b },
                        681: { slidesPerView: _ },
                        769: { slidesPerView: P },
                        1025: { slidesPerView: S },
                        1367: { slidesPerView: y },
                        1441: { slidesPerView: o },
                    },
                };
                if (p.length)
                    switch (p) {
                        case "fade":
                            (C.effect = "fade"), (C.fadeEffect = { crossFade: !0 });
                    }
                return Object.assign(C, x.getSliderDatas(e));
            },
            getSliderDatas: function (e) {
                var t = e.data(),
                    i = {};
                for (var n in t) t.hasOwnProperty(n) && "options" !== n && void 0 !== t[n] && "" !== t[n] && (i[n] = t[n]);
                return i;
            },
            getEvents: function (n, e) {
                return {
                    on: {
                        init: function () {
                            var i;
                            n.addClass("qodef-swiper--initialized"),
                                e.sliderScroll &&
                                    ((i = !1),
                                    n.on("mousewheel", function (e) {
                                        e.preventDefault();
                                        var t = e.originalEvent.deltaY;
                                        i ||
                                            ((i = !0),
                                            0 < t ? n[0].swiper.slideNext() : n[0].swiper.slidePrev(),
                                            setTimeout(function () {
                                                i = !1;
                                            }, 1e3));
                                    }));
                        },
                    },
                };
            },
        };
    qodef.qodefSwiper = x;
    var n = {
        init: function (e) {
            (this.holder = o(".qodef-magnific-popup")),
                o.extend(this.holder, e),
                this.holder.length &&
                    this.holder.each(function () {
                        var e = o(this);
                        e.hasClass("qodef-popup-item") ? n.initSingleImagePopup(e) : e.hasClass("qodef-popup-gallery") && n.initGalleryPopup(e);
                    });
        },
        initSingleImagePopup: function (e) {
            var t = e.data("type");
            e.magnificPopup({ type: t, titleSrc: "title", image: { cursor: null } });
        },
        initGalleryPopup: function (e) {
            var t = e.find(".qodef-popup-item"),
                i = n.generateGalleryItems(t);
            t.each(function (e) {
                o(this).magnificPopup({ items: i, gallery: { enabled: !0 }, index: e, type: "image", image: { cursor: null } });
            });
        },
        generateGalleryItems: function (e) {
            var i = [];
            return (
                e.length &&
                    e.each(function () {
                        var e = o(this),
                            t = { src: e.attr("href"), title: e.attr("title"), type: e.data("type") };
                        i.push(t);
                    }),
                i
            );
        },
    };
    qodef.qodefMagnificPopup = n;
    var r = {
        items: "",
        init: function (e) {
            (this.holder = o(".qodef-anchor")),
                o.extend(this.holder, e),
                this.holder.length &&
                    ((r.items = this.holder),
                    r.clickTrigger(),
                    o(window).on("load", function () {
                        r.checkAnchorOnScroll(), r.checkAnchorOnLoad();
                    }));
        },
        clickTrigger: function () {
            r.items.on("click", function (e) {
                var t = r.getAnchorItem(this),
                    i = t.attr("href"),
                    n = t.prop("hash").split("#")[1],
                    o = window.location.href,
                    a = -1 < o.indexOf("#") ? o.split("#")[1] : 0;
                (i.indexOf("http") < 0 ||
                    i === o ||
                    (0 !== a && i.substring(0, i.length - n.length - 1) === o.substring(0, o.length - a.length - 1)) ||
                    (0 === a && i.substring(0, i.length - n.length - 1) === o)) &&
                    e.preventDefault(),
                    r.animateScroll(t, n);
            });
        },
        checkAnchorOnLoad: function () {
            var t = window.location.hash.split("#")[1];
            void 0 !== t &&
                "" !== t &&
                r.items.length &&
                r.items.each(function () {
                    var e = r.getAnchorItem(this);
                    -1 < e.attr("href").indexOf(t) && r.animateScroll(e, t);
                });
        },
        checkAnchorOnScroll: function () {
            var e;
            1024 < qodef.windowWidth &&
                (e = o("#qodef-page-inner *[id]")).length &&
                e.each(function () {
                    var e = o(this),
                        t = o('[href*="#' + e.attr("id") + '"]');
                    t.length &&
                        (r.isTargetInView(e) && r.setActiveState(t),
                        o(window).scroll(function () {
                            r.isTargetInView(e) ? r.setActiveState(t) : t.removeClass(r.getItemClasses(t));
                        }));
                });
        },
        isTargetInView: function (e) {
            var t = e[0].getBoundingClientRect(),
                i = window.innerHeight || document.documentElement.clientHeight;
            return !(Math.floor(100 - ((0 <= t.top ? 0 : t.top) / -+t.height) * 100) < 20 || Math.floor(100 - ((t.bottom - i) / t.height) * 100) < 20);
        },
        getAnchorItem: function (e) {
            return "A" === e.tagName ? o(e) : o(e).children("a");
        },
        animateScroll: function (e, t) {
            var i = "" !== t ? o('[id="' + t + '"]') : "";
            if (i.length) {
                var n = i.offset().top - r.getHeaderHeight() - qodefGlobal.vars.adminBarHeight;
                return (
                    r.setActiveState(e),
                    qodef.html.stop().animate({ scrollTop: Math.round(n) }, 1e3, function () {
                        history.pushState && history.pushState(null, "", "#" + t);
                    }),
                    !1
                );
            }
        },
        getHeaderHeight: function () {
            var e = 0;
            return (
                1024 < qodef.windowWidth && null !== qodefGlobal.vars.headerHeight && "" !== qodefGlobal.vars.headerHeight && (e = parseInt(qodefGlobal.vars.headerHeight, 10)), e
            );
        },
        setActiveState: function (e) {
            var t = !e.parent().hasClass("qodef-anchor"),
                i = r.getItemClasses(e);
            r.items.removeClass(i), t ? e.addClass(i) : e.parent().addClass(i);
        },
        getItemClasses: function (e) {
            return "qodef-anchor--active" + (e.parents("#qodef-page-header") ? " current-menu-item current_page_item" : "");
        },
    };
    function a(e, t) {
        ((t = t || {}).stageWidth = t.hasOwnProperty("stageWidth") ? t.stageWidth : 400),
            (t.stageHeight = t.hasOwnProperty("stageHeight") ? t.stageHeight : 600),
            (t.pixiSprite = t.hasOwnProperty("imageSrc") ? t.imageSrc : ""),
            (t.pixelSpriteScale = t.hasOwnProperty("spriteScale") ? t.spriteScale : [3, 3]),
            (t.imageScale = t.hasOwnProperty("imageScale") ? t.imageScale : [1.2, 1.2]),
            (t.autoPlay = !!t.hasOwnProperty("autoPlay") && t.autoPlay),
            (t.shakeSpeed = t.hasOwnProperty("shakeSpeed") ? t.shakeSpeed : [10, 3]),
            (t.displaceOnce = !!t.hasOwnProperty("displaceOnce") && t.displaceOnce),
            (t.displacementSprite = t.hasOwnProperty("displacementSprite") ? t.displacementSprite : ""),
            (t.centerDisplacement = !!t.hasOwnProperty("centerDisplacement") && t.centerDisplacement),
            (t.interactive = !!t.hasOwnProperty("interactive") && t.interactive),
            (t.interactionEvent = t.hasOwnProperty("interactionEvent") ? t.interactionEvent : ""),
            (t.hoverEaseInDuration = t.hasOwnProperty("hoverEaseInDuration") ? t.hoverEaseInDuration : 0.3),
            (t.hoverEaseOutDuration = t.hasOwnProperty("hoverEaseOutDuration") ? t.hoverEaseOutDuration : 1),
            (t.displaceSpeed = t.hasOwnProperty("displaceSpeed") ? t.displaceSpeed : [40, 40]);
        var i,
            n,
            o,
            a = new PIXI.autoDetectRenderer(t.stageWidth, t.stageHeight, { transparent: !0 }),
            r = new PIXI.Container(),
            s = new PIXI.Container(),
            d = new PIXI.Sprite.fromImage(t.displacementSprite),
            l = new PIXI.filters.DisplacementFilter(d);
        function c() {
            o = requestAnimationFrame(c);
        }
        !1 === t.displaceOnce
            ? (((i = new PIXI.ticker.Ticker()).autoStart = !0),
              i.add(function (e) {
                  (d.x += t.shakeSpeed[0] * e), (d.y += t.shakeSpeed[1]), a.render(r);
              }))
            : (((n = new PIXI.ticker.Ticker()).autoStart = !0),
              n.add(function (e) {
                  a.render(r);
              })),
            !0 === t.interactive &&
                ((s.interactive = !0),
                (s.buttonMode = !0),
                TweenMax.to(l.scale, t.hoverEaseInDuration, { x: t.displaceSpeed[0], y: t.displaceSpeed[1], yoyo: !0 }),
                c(),
                "hover" === t.interactionEvent &&
                    ((s.pointerover = function (e) {
                        TweenMax.to(l.scale, t.hoverEaseOutDuration, { x: 0, y: 0 }), cancelAnimationFrame(o);
                    }),
                    (s.pointerout = function (e) {
                        TweenMax.to(l.scale, t.hoverEaseInDuration, { x: t.displaceSpeed[0], y: t.displaceSpeed[1], yoyo: !0 }), c();
                    })));
        var h, f, u;
        e.appendChild(a.view),
            r.addChild(s),
            (r.interactive = !0),
            (d.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT),
            (r.filters = [l]),
            !0 === t.displaceOnce && (t.autoPlay = !1),
            !1 === t.autoPlay ? ((l.scale.x = 0), (l.scale.y = 0)) : ((l.scale.x = t.displaceSpeed[0]), (l.scale.y = t.displaceSpeed[1])),
            !0 === t.centerDisplacement && d.anchor.set(0.5),
            (d.scale.x = t.pixelSpriteScale[0]),
            (d.scale.y = t.pixelSpriteScale[1]),
            r.addChild(d),
            (h = t.pixiSprite),
            (f = new PIXI.Texture.fromImage(h)),
            (u = new PIXI.Sprite(f)).anchor.set(0.5),
            (u.x = a.width / 2),
            (u.y = a.height / 2),
            (u.width = a.width * t.imageScale[0]),
            (u.height = a.height * t.imageScale[1]),
            s.addChild(u);
    }
    (qodef.qodefAnchor = r),
        "function" != typeof Object.assign &&
            (Object.assign = function (e) {
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                e = Object(e);
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    if (null !== i) for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
                }
                return e;
            });
    var e = {
        init: function () {
            o(".qodef-portfolio-list, .qodef-interactive-link-showcase").each(function () {
                if (o(this).hasClass("qodef-hover-animation--ripple")) {
                    var e = document.querySelectorAll(".qodef-hover-animation--ripple .qodef-e-media-image a");
                    if (e.length && 1025 < qodef.windowWidth)
                        for (var t = 0; t < e.length; t++) {
                            e[t].classList.add("qodef--has-ripple-effect");
                            var i = e[t].querySelector("img");
                            a(e[t], {
                                imageSrc: i.getAttribute("src"),
                                imageScale: [1.1, 1.1],
                                stageWidth: i.width,
                                stageHeight: i.height,
                                displacementSprite: "/wp-content/plugins/zermatt-core/assets/img/portfolio-hover-pattern.jpg",
                                spriteScale: [4, 4],
                                centerDisplacement: !0,
                                autoPlay: !1,
                                shakeSpeed: [1, 1],
                                displaceSpeed: [25, 25],
                                displaceOnce: !1,
                                interactive: !0,
                                interactionEvent: "hover",
                                hoverEaseInDuration: 1,
                                hoverEaseOutDuration: 1,
                            });
                        }
                }
            });
        },
    };
})(jQuery),
    (function (o) {
        "use strict";
        o(document).ready(function () {
            n.init();
        }),
            o(window).on("resize", function () {
                n.init();
            }),
            o(document).on("zermatt_trigger_get_new_posts", function (e, t) {
                t.hasClass("qodef-blog") && (i.init(t), n.resize(t));
            });
        var i = {
                init: function (e) {
                    var t = e.find(".wp-video-shortcode, .wp-audio-shortcode").not(".mejs-container");
                    t.length &&
                        t.each(function () {
                            var e = o(this);
                            "function" == typeof e.mediaelementplayer && e.mediaelementplayer({ videoWidth: "100%", videoHeight: "56.5%" });
                        });
                },
            },
            n = {
                init: function () {
                    var e = o(".qodef-blog");
                    e.length && n.resize(e);
                },
                resize: function (e) {
                    var t = e.find(".qodef-e-media iframe");
                    t.length &&
                        t.each(function () {
                            var e = o(this),
                                t = e.attr("width"),
                                i = e.attr("height"),
                                n = (e.width() / t) * i;
                            e.css("height", n);
                        });
                },
            };
    })(jQuery),
    (function (u) {
        "use strict";
        u(document).ready(function () {
            p.init(), i.init();
        }),
            u(document).on("zermatt_trigger_get_new_posts", function (e, t) {
                t.hasClass("qodef-filter--on") && p.setVisibility(t, t.find(".qodef-m-filter-item.qodef--active"), !0);
            });
        var p = {
                init: function (e) {
                    (this.holder = u(".qodef-filter--on")),
                        u.extend(this.holder, e),
                        this.holder.length &&
                            this.holder.each(function () {
                                var e = u(this),
                                    t = e.find(".qodef-m-filter-item");
                                p.extendListHTML(e), p.clickEvent(e, t);
                            });
                },
                extendListHTML: function (e) {
                    e.children(".qodef-hidden-filter-items").length || p.isMasonryLayout(e) || e.append('<div class="qodef-hidden-filter-items"></div>');
                },
                clickEvent: function (i, n) {
                    n.on("click", function (e) {
                        e.preventDefault();
                        var t = u(this);
                        t.hasClass("qodef--active") || (i.addClass("qodef--filter-loading"), n.removeClass("qodef--active"), t.addClass("qodef--active"), p.setVisibility(i, t));
                    });
                },
                setVisibility: function (e, t, i) {
                    var n = e.children(".qodef-hidden-filter-items"),
                        o = n.length,
                        a = o ? n.children(".qodef-grid-item") : "",
                        r = e.find(".qodef-grid-inner"),
                        s = r.children(".qodef-grid-item"),
                        d = t.data("taxonomy"),
                        l = t.data("filter"),
                        c = "*" === l,
                        h = c ? l : d + "-" + l,
                        f = s.hasClass(h);
                    o && !f && a.hasClass(h) && (f = !0),
                        (i && c) ||
                            (c || f || !p.hasLoadMore(e)
                                ? (p.isMasonryLayout(e)
                                      ? r.isotope({ filter: c ? "" : "." + h })
                                      : (c ||
                                            s.each(function () {
                                                var e = u(this);
                                                -1 === e.attr("class").indexOf(h) &&
                                                    e.hide(300, "linear", function () {
                                                        e.appendTo(n);
                                                    });
                                            }),
                                        a.length &&
                                            a.each(function () {
                                                var e = u(this),
                                                    t = e.attr("class");
                                                (!c && -1 === t.indexOf(h)) || e.appendTo(r).show(300, "linear");
                                            })),
                                  e.removeClass("qodef--filter-loading"))
                                : qodef.body.trigger("zermatt_trigger_load_more", [e]));
                },
                isMasonryLayout: function (e) {
                    return e.hasClass("qodef-layout--masonry");
                },
                hasLoadMore: function (e) {
                    return e.hasClass("qodef-pagination-type--load-more");
                },
            },
            i = {
                init: function () {
                    (this.holder = u(".qodef-m-filter-columns")),
                        this.holder.length &&
                            this.holder.each(function () {
                                var e = u(this),
                                    t = e.find(".qodef-m-filter-columns-item");
                                i.clickEvent(e, t);
                            });
                },
                clickEvent: function (o, a) {
                    a.on("click", function (e) {
                        e.preventDefault();
                        var t,
                            i,
                            n = u(this);
                        n.hasClass("qodef--active") ||
                            (o.addClass("qodef--filter-loading"),
                            a.removeClass("qodef--active"),
                            n.addClass("qodef--active"),
                            (t = n.data("columns")),
                            (i = n.closest(".qodef-portfolio-list")).removeClass(function (e, t) {
                                return (t.match(/(^|\s)qodef-col-num-\S+/g) || []).join(" ");
                            }),
                            i.addClass("qodef-col-num--" + t),
                            qodef.qodefMasonryLayout.init());
                    });
                },
            };
        (qodef.qodefFilter = p), (qodef.qodefFilterColumns = i);
    })(jQuery),
    (function (s) {
        "use strict";
        s(document).ready(function () {
            t.init();
        }),
            s(document).on("zermatt_trigger_get_new_posts", function () {
                t.init();
            });
        var t = {
            init: function () {
                var e = s(".qodef-layout--justified-gallery");
                e.length &&
                    e.each(function () {
                        t.setJustifyGallery(s(this));
                    });
            },
            setJustifyGallery: function (e) {
                var t = e.data("options"),
                    i = e.children(".qodef-grid-inner"),
                    n = void 0 !== t.justified_gallery_row_height && "" !== t.justified_gallery_row_height ? t.justified_gallery_row_height : 150,
                    o = void 0 !== t.justified_gallery_row_height_max && "" !== t.justified_gallery_row_height_max && t.justified_gallery_row_height_max,
                    a = 2 * t.space_value,
                    r = void 0 !== t.justified_gallery_treshold && "" !== t.justified_gallery_treshold ? t.justified_gallery_treshold : 0.75;
                i.waitForImages(function () {
                    "function" == typeof i.justifiedGallery &&
                        i
                            .justifiedGallery({
                                captions: !1,
                                rowHeight: n,
                                maxRowHeight: o,
                                margins: a,
                                border: 0,
                                lastRow: "nojustify",
                                justifyThreshold: r,
                                selector: ".qodef-grid-item",
                            })
                            .on("jg.complete jg.rowflush", function () {
                                var t = s(this),
                                    i = !1;
                                t.find(".qodef-grid-item")
                                    .addClass("show")
                                    .each(function () {
                                        var e = s(this);
                                        e.height(Math.round(e.height())), i || 0 !== e.width() || (t.height(t.height() - e.height() - a), (i = !0));
                                    });
                            }),
                        e.addClass("qodef--justified-gallery-init");
                });
            },
        };
        qodef.qodefJustifiedGallery = t;
    })(jQuery),
    (function (t) {
        "use strict";
        t(document).ready(function () {
            o.init();
        }),
            t(window).resize(function () {
                o.reInit();
            }),
            t(document).on("zermatt_trigger_get_new_posts", function (e, t) {
                t.hasClass("qodef-layout--masonry") && o.init();
            });
        var o = {
            init: function (e) {
                (this.holder = t(".qodef-layout--masonry")),
                    t.extend(this.holder, e),
                    this.holder.length &&
                        this.holder.each(function () {
                            o.createMasonry(t(this));
                        });
            },
            reInit: function (e) {
                (this.holder = t(".qodef-layout--masonry")),
                    t.extend(this.holder, e),
                    this.holder.length &&
                        this.holder.each(function () {
                            var e = t(this).find(".qodef-grid-inner");
                            "function" == typeof e.isotope && e.isotope("layout");
                        });
            },
            createMasonry: function (t) {
                var i = t.find(".qodef-grid-inner"),
                    n = i.find(".qodef-grid-item");
                i.waitForImages(function () {
                    var e;
                    "function" == typeof i.isotope &&
                        (i.isotope({
                            layoutMode: "packery",
                            itemSelector: ".qodef-grid-item",
                            percentPosition: !0,
                            masonry: { columnWidth: ".qodef-grid-masonry-sizer", gutter: ".qodef-grid-masonry-gutter" },
                        }),
                        t.hasClass("qodef-items--fixed") && ((e = o.getFixedImageSize(i, n)), o.setFixedImageProportionSize(i, n, e)),
                        i.isotope("layout")),
                        i.addClass("qodef--masonry-init");
                });
            },
            getFixedImageSize: function (e, t) {
                var i = e.find(".qodef-item--square");
                if (i.length) {
                    var n = i.find("img"),
                        o = n.width(),
                        a = n.height();
                    return o !== a ? a : o;
                }
                return e.find(".qodef-grid-masonry-sizer").width() - 2 * parseInt(t.css("paddingLeft"), 10);
            },
            setFixedImageProportionSize: function (e, t, i) {
                var n = parseInt(t.css("paddingLeft"), 10),
                    o = (e.find(".qodef-item--square"), e.find(".qodef-item--landscape")),
                    a = e.find(".qodef-item--portrait"),
                    r = e.find(".qodef-item--huge-square"),
                    s = qodef.windowWidth <= 680;
                t.css("height", i),
                    o.length && o.css("height", Math.round(i / 2)),
                    a.length && a.css("height", Math.round(2 * (i + n))),
                    s || (o.length && o.css("height", i), r.length && r.css("height", Math.round(2 * (i + n))));
            },
        };
        qodef.qodefMasonryLayout = o;
    })(jQuery),
    (function (t) {
        "use strict";
        t(document).ready(function () {
            i.init();
        });
        var i = {
            init: function () {
                var e = t("#qodef-page-mobile-header");
                e.length && (i.initMobileHeaderOpener(e), i.initDropDownMobileMenu());
            },
            initMobileHeaderOpener: function (e) {
                var t,
                    i = e.find(".qodef-mobile-header-opener");
                i.length &&
                    ((t = e.find(".qodef-mobile-header-navigation")),
                    i.on("tap click", function (e) {
                        e.preventDefault(),
                            t.is(":visible")
                                ? (t.slideUp(450), i.removeClass("qodef--opened"), qodef.body.removeClass("qodef-mobile--opened"))
                                : (t.slideDown(450), i.addClass("qodef--opened"), qodef.body.addClass("qodef-mobile--opened"));
                    }));
            },
            initDropDownMobileMenu: function () {
                var e = t(".qodef-mobile-header-navigation .menu-item-has-children svg");
                // var e = t(".qodef-mobile-header-navigation .menu-item-has-children>a");
                e.length &&
                    e.each(function () {
                        var o = t(this);
                        o.on("tap click", function (e) {
                            e.preventDefault();
                            var t,
                                i = o.parent(),
                                n = i.siblings(".menu-item-has-children");
                            i.hasClass("menu-item-has-children") &&
                                ((t = i.find("ul.sub-menu").first()).is(":visible")
                                    ? (t.slideUp(450), i.removeClass("qodef--opened"))
                                    : (i.addClass("qodef--opened"),
                                      0 === n.length
                                          ? i.find(".sub-menu").slideUp(400, function () {
                                                t.slideDown(400);
                                            })
                                          : i
                                                .siblings()
                                                .removeClass("qodef--opened")
                                                .find(".sub-menu")
                                                .slideUp(400, function () {
                                                    t.slideDown(400);
                                                })));
                        });
                    });
            },
        };
    })(jQuery),
    (function (s) {
        s(document).ready(function () {
            e.init();
        });
        var e = {
            init: function () {
                var e = s(".qodef-header-navigation.qodef-header-navigation-initial > ul > li.qodef-menu-item--narrow.menu-item-has-children");
                e.length &&
                    e.each(function (e) {
                        var t,
                            i = s(this),
                            n = i.offset().left,
                            o = i.find(" > ul"),
                            a = o.outerWidth(),
                            r = s(window).width() - n;
                        0 < i.find("li.menu-item-has-children").length && (t = r - a),
                            o.removeClass("qodef-drop-down--right"),
                            (r < a || t < a) && o.addClass("qodef-drop-down--right");
                    });
            },
        };
    })(jQuery),
    (function (a) {
        "use strict";
        a(document).ready(function () {
            r.init();
        }),
            a(window).scroll(function () {
                r.scroll();
            }),
            a(document).on("zermatt_trigger_load_more", function (e, t, i) {
                r.triggerLoadMore(t, i);
            });
        var r = {
            init: function (e) {
                (this.holder = a(".qodef-pagination--on")),
                    a.extend(this.holder, e),
                    this.holder.length &&
                        this.holder.each(function () {
                            var e = a(this);
                            r.initPaginationType(e);
                        });
            },
            scroll: function (e) {
                (this.holder = a(".qodef-pagination--on")),
                    a.extend(this.holder, e),
                    this.holder.length &&
                        this.holder.each(function () {
                            var e = a(this);
                            e.hasClass("qodef-pagination-type--infinite-scroll") && r.initInfiniteScroll(e);
                        });
            },
            initPaginationType: function (e) {
                e.hasClass("qodef-pagination-type--standard")
                    ? r.initStandard(e)
                    : e.hasClass("qodef-pagination-type--load-more")
                    ? r.initLoadMore(e)
                    : e.hasClass("qodef-pagination-type--infinite-scroll") && r.initInfiniteScroll(e);
            },
            initStandard: function (n) {
                var e,
                    t = n.find(".qodef-m-pagination-items");
                t.length &&
                    ((e = n.data("options")),
                    t.children().each(function () {
                        var t = a(this),
                            i = t.children("a");
                        r.changeStandardState(n, e.max_pages_num, 1),
                            i.on("click", function (e) {
                                e.preventDefault(), t.hasClass("qodef--active") || r.getNewPosts(n, i.data("paged"));
                            });
                    }));
            },
            changeStandardState: function (e, t, i) {
                var n, o, a, r;
                e.hasClass("qodef-pagination-type--standard") &&
                    ((o = (n = e.find(".qodef-m-pagination-items")).children(".qodef--number")),
                    (a = n.children(".qodef--prev")),
                    (r = n.children(".qodef--next")),
                    o
                        .removeClass("qodef--active")
                        .eq(i - 1)
                        .addClass("qodef--active"),
                    a.children().data("paged", i - 1),
                    1 < i ? a.show() : a.hide(),
                    r.children().data("paged", i + 1),
                    i === t ? r.hide() : r.show());
            },
            triggerStandardScrollAnimation: function (e) {
                e.hasClass("qodef-pagination-type--standard") && a("html, body").animate({ scrollTop: e.offset().top - 100 }, 500);
            },
            initLoadMore: function (t) {
                t.find(".qodef-load-more-button").on("click", function (e) {
                    e.preventDefault(), r.getNewPosts(t);
                });
            },
            triggerLoadMore: function (e, t) {
                r.getNewPosts(e, t);
            },
            hideLoadMoreButton: function (e, t) {
                e.hasClass("qodef-pagination-type--load-more") && t.next_page > t.max_pages_num && e.find(".qodef-load-more-button").hide();
            },
            initInfiniteScroll: function (e) {
                var t = e.outerHeight() + e.offset().top,
                    i = qodef.scroll + qodef.windowHeight,
                    n = e.data("options");
                !e.hasClass("qodef--loading") && t < i && n.max_pages_num >= n.next_page && r.getNewPosts(e);
            },
            getNewPosts: function (t, i) {
                t.addClass("qodef--loading");
                var n = t.children(".qodef-grid-inner"),
                    o = t.data("options");
                r.setNextPageValue(o, i, !1),
                    a.ajax({
                        type: "GET",
                        url: qodefGlobal.vars.restUrl + qodefGlobal.vars.paginationRestRoute,
                        data: { options: o },
                        beforeSend: function (e) {
                            e.setRequestHeader("X-WP-Nonce", qodefGlobal.vars.restNonce);
                        },
                        success: function (e) {
                            "success" === e.status
                                ? (r.setNextPageValue(o, i, !0),
                                  r.changeStandardState(t, o.max_pages_num, i),
                                  n.waitForImages(function () {
                                      r.addPosts(n, e.data.html, i),
                                          r.reInitMasonryPosts(t, n),
                                          setTimeout(function () {
                                              qodef.body.trigger("zermatt_trigger_get_new_posts", [t, e.data, i]);
                                          }, 300);
                                  }),
                                  r.triggerStandardScrollAnimation(t),
                                  r.hideLoadMoreButton(t, o))
                                : console.log(e.message);
                        },
                        complete: function () {
                            t.removeClass("qodef--loading");
                        },
                    });
            },
            setNextPageValue: function (e, t, i) {
                void 0 === t || "" === t || i ? i && (e.next_page = parseInt(e.next_page, 10) + 1) : (e.next_page = t);
            },
            addPosts: function (e, t, i) {
                void 0 !== i && "" !== i ? e.html(t) : e.append(t);
            },
            reInitMasonryPosts: function (e, t) {
                e.hasClass("qodef-layout--masonry") &&
                    (t.isotope("reloadItems").isotope({ sortBy: "original-order" }),
                    setTimeout(function () {
                        t.isotope("layout");
                    }, 200));
            },
        };
        qodef.qodefPagination = r;
    })(jQuery),
    (function (l) {
        "use strict";
        l(document).ready(function () {
            i.init(), e.init(), t.init();
        });
        var i = {
                init: function (e) {
                    (this.holder = []),
                        this.holder.push({ holder: l("#qodef-woo-page .woocommerce-ordering select"), options: { minimumResultsForSearch: 1 / 0 } }),
                        this.holder.push({ holder: l("#qodef-woo-page .variations select"), options: { minimumResultsForSearch: 1 / 0 } }),
                        this.holder.push({ holder: l("#qodef-woo-page #calc_shipping_country"), options: {} }),
                        this.holder.push({ holder: l("#qodef-woo-page .shipping select#calc_shipping_state"), options: {} }),
                        this.holder.push({ holder: l(".widget.widget_archive select"), options: {} }),
                        this.holder.push({ holder: l(".widget.widget_categories select"), options: {} }),
                        this.holder.push({ holder: l(".widget.widget_text select"), options: {} }),
                        l.extend(this.holder, e),
                        "object" == typeof this.holder &&
                            l.each(this.holder, function (e, t) {
                                i.createSelect2(t.holder, t.options);
                            });
                },
                createSelect2: function (e, t) {
                    "function" == typeof e.select2 && e.select2(t);
                },
            },
            e = {
                init: function () {
                    l(document).on("click", ".qodef-quantity-minus, .qodef-quantity-plus", function (e) {
                        e.stopPropagation();
                        var t,
                            i = l(this),
                            n = i.siblings(".qodef-quantity-input"),
                            o = parseFloat(n.data("step")),
                            a = parseFloat(n.data("max")),
                            r = parseFloat(n.data("min")),
                            s = !1,
                            d = "function" == typeof Number.isNaN && Number.isNaN(parseFloat(n.val())) ? r : parseFloat(n.val());
                        i.hasClass("qodef-quantity-minus") && (s = !0),
                            s ? (r <= (t = d - o) ? n.val(t) : n.val(r)) : ((t = d + o), void 0 !== a && a <= t ? n.val(a) : n.val(t)),
                            n.trigger("change");
                    });
                },
            },
            t = {
                init: function () {
                    var e;
                    "object" != typeof qodef.qodefMagnificPopup ||
                        ((e = l(".qodef--single.qodef-magnific-popup.qodef-popup-gallery .woocommerce-product-gallery__image")).length &&
                            (e.each(function () {
                                l(this).children("a").attr("data-type", "image").addClass("qodef-popup-item");
                            }),
                            qodef.qodefMagnificPopup.init()));
                },
            };
        qodef.qodefWooMagnificPopup = t;
    })(jQuery);
