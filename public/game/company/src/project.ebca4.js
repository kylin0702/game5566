var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

window.wx = {
    getSystemInfo: function() {},
    onShow: function() {},
    onHide: function() {},
    getUserInfo: function() {},
    showShareMenu: function() {},
    updateShareMenu: function() {},
    onShareAppMessage: function() {},
    getLaunchOptionsSync: function() {},
    clearStorageSync: function() {},
    getGameRecorderManager: function() {},
    shareVideo: function() {},
    postMessage: function() {},
    getStorageSync: function() {},
    getSystemInfoSync: function() {},
    createInterstitialAd: function() {},
    getSystemInfoSync: function() { return "web"; },
    onTouchStart: function() {},
    createRewardedVideoAd: function() {}
};
window.VideoAdids = [];
window.bannerids = [];

window.__require = function e(t, i, n) {
    function o(a, r) {
        if (!i[a]) {
            if (!t[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1], !t[c]) {
                    var l = "function" == typeof __require && __require;
                    if (!r && l) return l(c, !0);
                    if (s) return s(c, !0);
                    throw new Error("Cannot find module '" + a + "'");
                }
            }
            var u = i[a] = {
                exports: {}
            };
            t[a][0].call(u.exports, function(e) {
                return o(t[a][1][e] || e);
            }, u, u.exports, e, t, i, n);
        }
        return i[a].exports;
    }
    for (var s = "function" == typeof __require && __require, a = 0; a < n.length; a++) o(n[a]);
    return o;
}({
    AudioMgr: [ function(e, t, i) {
        cc._RF.push(t, "83324lz/kRPZrtaLonw22lA", "AudioMgr");
        var n = cc.Class({
            extends: cc.Component,
            properties: {
                bgmVolume: 1,
                sfxVolume: 1,
                bgmAudioID: -1
            },
            init: function() {
                emitHandler.on("music_close", function() {
                    cc.sys.localStorage.setItem("music_status", !1), this.bgmAudioID = -1, cc.audioEngine.stopAll();
                }.bind(this)), emitHandler.on("music_open", function() {
                    cc.sys.localStorage.setItem("music_status", !0), this.playBGM("main_bg_music");
                }.bind(this));
            },
            getUrl: function(e) {
                return cc.url.raw("resources/sound/" + e + ".mp3");
            },
            playBGM: function(e) {
                var t = this;
                e ? (this.getUrl(e), this.bgmAudioID >= 0 ? this.url != e && (cc.audioEngine.stop(this.bgmAudioID), 
                cc.loader.loadRes("sound/" + e + ".mp3", cc.AudioClip, function(e, i) {
                    t.bgmAudioID = cc.audioEngine.play(i, !0, t.bgmVolume);
                })) : cc.loader.loadRes("sound/" + e + ".mp3", cc.AudioClip, function(e, i) {
                    t.bgmAudioID = cc.audioEngine.play(i, !0, t.bgmVolume);
                }), this.url = e) : (this.bgmAudioID = -1, cc.audioEngine.stopAll());
            },
            playSFX: function(e) {
                var t = this;
                this.sfxVolume > 0 && cc.loader.loadRes("sound/" + e, cc.AudioClip, function(e, i) {
                    cc.audioEngine.play(i, !1, t.sfxVolume);
                });
            },
            setSFXVolume: function(e) {
                this.sfxVolume != e && (cc.sys.localStorage.setItem("sfxVolume", e), this.sfxVolume = e);
            },
            setBGMVolume: function(e, t) {
                this.bgmAudioID >= 0 && (e > 0 ? cc.audioEngine.resume(this.bgmAudioID) : cc.audioEngine.pause(this.bgmAudioID)), 
                (this.bgmVolume != e || t) && (cc.sys.localStorage.setItem("bgmVolume", e), this.bgmVolume = e, 
                cc.audioEngine.setVolume(this.bgmAudioID, e));
            },
            pauseAll: function() {
                cc.audioEngine.pauseAll();
            },
            resumeAll: function() {
                cc.audioEngine.resumeAll();
            }
        });
        t.exports = n, cc._RF.pop();
    }, {} ],
    ButtonEx: [ function(e, t, i) {
        cc._RF.push(t, "a89bdQownlHNbzq8w11K2XU", "ButtonEx"), cc.Button.prototype.setSprite = function(e) {
            this.getComponent(cc.Sprite).spriteFrame.setTexture(cc.url.raw(e));
        }, cc.Button.prototype.isPlayAutoEffcet = !0, cc.Button.prototype.setAutoEffect = function(e) {
            this.isPlayAutoEffcet = e;
        }, cc.Button.prototype.isAutoEffect = function(e) {
            return !!this.isPlayAutoEffcet;
        }, cc.Button.prototype._onTouchBegan = function(e) {
            this.interactable && this.enabledInHierarchy && (this.isPlayAutoEffcet && cc.loader.loadRes("audio/btn_click", cc.AudioClip, function(e, t) {
                cc.audioEngine.playEffect(t, !1);
            }), this._pressed = !0, this._updateState(), e.stopPropagation());
        }, cc._RF.pop();
    }, {} ],
    ChangeColor: [ function(e, t, i) {
        cc._RF.push(t, "7f5cetc39lIHYXRKD6Ve8FT", "ChangeColor"), cc.Class({
            extends: cc.Component,
            properties: {
                color: cc.color("#555450"),
                labels: [ cc.Node ],
                isTouch: !1
            },
            onLoad: function() {
                this.oldColors = [];
            },
            rememberColors: function() {
                if (!this.oldColors.length) for (var e = 0; e < this.labels.length; e++) this.oldColors.push(this.labels[e].color);
            },
            unUse: function() {
                this.rememberColors();
                for (var e = 0; e < this.labels.length; e++) this.labels[e].color = this.cloneColor(this.color);
            },
            use: function() {
                this.rememberColors();
                for (var e = 0; e < this.labels.length; e++) this.labels[e].color = this.oldColors[e];
            },
            cloneColor: function(e) {
                return cc.color(e.r, e.g, e.b, e.a);
            },
            copyColor: function(e, t) {
                e.r = t.r, e.g = t.g, e.b = t.b, e.a = t.a;
            }
        }), cc._RF.pop();
    }, {} ],
    DlgMgr: [ function(e, t, i) {
        cc._RF.push(t, "8f09dMU/9VBZZBUxfP7w6mJ", "DlgMgr");
        var n = [ [ !1, !1, !0 ], [ !1, !0, !0 ], [ !0, !1, !0 ], [ !0, !0, !0 ], [ !0, !0, !1 ], [ !1, !1, !1 ], [ !0, !1, !1 ] ];
        cc.Class({
            extends: cc.Component,
            properties: {
                mainDlg: cc.Node,
                rankDlg: cc.Prefab,
                shopDlg: cc.Prefab,
                inviteDlg: cc.Prefab,
                maskPrefab: cc.Prefab,
                wheelNode: cc.Prefab,
                guidePrefab: cc.Prefab,
                guideTipNode: cc.Node,
                _curDlg: null
            },
            start: function() {
                sd.DlgMgr = this, this._guideIdle = user.info.finishGuideId == gConst.guides.newSecondStand, 
                this._guideTime = 0, this._guideTip = this.guideTipNode.getComponent("guideTipUI"), 
                this.guideTipNode.zIndex = gConst.waitNetZindex, this._guideTipX = this.guideTipNode.x;
            },
            update: function(e) {
                this._guideIdle && (this._guideTime += e);
            },
            showDlg: function(e, t, i) {
                var o = this[e];
                if (!o) return null;
                if (o instanceof cc.Prefab) {
                    var s = popBannerDlg(o, null, null, "wheelNode" == e ? window.bannerids[2] : null);
                    return s._closeFunc = i, s;
                }
                this._curDlg && (this._curDlg.active = !1);
                var a = a || 3, r = n[a];
                if (r[0]) {
                    var c = o.getChildByName(this.maskPrefab.name);
                    c || (c = cc.instantiate(this.maskPrefab), o.addChild(c, -1), c.getComponent(cc.Widget).target = this.node, 
                    c.on(cc.Node.EventType.TOUCH_END, function(e) {
                        o.active = !r[1], sd.pf.doCallBack(i);
                    }, this), r[2] || (c.opacity = 0));
                }
                o.active = !0;
                var l = o.getComponent(e);
                return l && l._updateArgs && l._updateArgs(t), this._curDlg = o, o;
            },
            hideDlg: function(e) {
                if (e) {
                    var t = this[e];
                    t && (t.active = !1);
                } else this._curDlg && (this._curDlg.active = !1, this._curDlg = null);
            },
            sendMsg: function(e, t) {
                var i = this[e];
                if (i) {
                    var n = i.getComponent(e);
                    if (n && n[t]) {
                        var o = Array.prototype.slice.call(arguments, 2);
                        return n[t].apply(n, o);
                    }
                }
            },
            showGuide: function(e, t, i) {
                user.isGuide(e) && (this.curGuideId && this.curGuideId == e && this.guideDlg && this.guideDlg.parent || (sd.pf.doCallBack(i), 
                this.guideDlg && this.guideDlg.destroy(), this.guideDlg = cc.instantiate(this.guidePrefab), 
                this.guideDlg.getComponent("guideUI").show(e, t), this.curGuideId = e, this._guideTip.fadeIn(e)));
            },
            closeGuide: function(e) {
                this.guideDlg && e == this.curGuideId && (this.guideDlg.destroy(), this.guideDlg = null, 
                this.curGuideId = null, user.finishGuide(e), this._guideTip.fadeOut());
            },
            hideGuide: function(e) {
                this.guideDlg && e == this.curGuideId && (this.guideDlg.active = !1);
            },
            isGuideTime: function(e) {
                return this._guideTime >= e;
            }
        }), cc._RF.pop();
    }, {} ],
    Func: [ function(e, t, i) {
        cc._RF.push(t, "c2f25elY6NCqrz203ImqHno", "Func"), sd = sd || {}, sd.pf = {
            _tempPos: cc.v2(0, 0),
            doCallBack: function(e, t) {
                if (e) {
                    var i = Array.prototype.slice.call(arguments, 2);
                    return e.apply(t, i);
                }
                return null;
            },
            performWithDelay: function(e, t, i, n) {
                e.runAction(cc.sequence(cc.delayTime(i), cc.callFunc(t, n)));
            },
            convertToNodeSpaceAR: function(e, t) {
                var i = e.parent.convertToWorldSpaceAR(e.getPosition(this._tempPos));
                return t.convertToNodeSpaceAR(i);
            },
            setNodeGray: function(e, t) {
                if (e.isGray != t) {
                    e.isGray = t;
                    var i = e.getComponent("ChangeColor");
                    i && (t ? i.unUse() : i.use());
                }
            },
            setNodeSpriteFrameGray: function(e, t, i) {
                if (e.isGray != t) {
                    e.isGray = t;
                    var n = e;
                    void 0 == e.spriteFrame && (n = e.getComponent(cc.Sprite)), t ? (n.normalFrame = n.spriteFrame, 
                    n.spriteFrame = resManager.getResource(i)) : n.normalFrame && (n.spriteFrame = n.normalFrame);
                }
            }
        }, cc._RF.pop();
    }, {} ],
    ListView: [ function(e, t, i) {
        cc._RF.push(t, "e6458+hf5VAnIXocmvhggqC", "ListView"), cc.Class({
            extends: cc.Component,
            properties: {
                itemTemplate: cc.Prefab,
                scrollView: {
                    default: null,
                    type: cc.ScrollView
                },
                spawnCount: 0,
                totalCount: 0,
                spacing: 0,
                bufferZone: 0,
                itemHeight: 0,
                itemScriptName: ""
            },
            onLoad: function() {
                this.content = this.scrollView.content, this.items = [], this.updateTimer = 0, this.updateInterval = .2, 
                this.lastContentPosY = 0, this.updateFlowerList(), this.update();
            },
            updateFlowerList: function() {
                this.totalCount = 20, this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing;
                for (var e = Math.min(this.spawnCount, this.totalCount), t = this.items.length; t < e; ++t) {
                    var i = cc.instantiate(this.itemTemplate);
                    this.content.addChild(i), i.setPosition(this.content.width / 2, -i.height * (.5 + t) - this.spacing * (t + 1)), 
                    i.getComponent("flowermapitem").updateItem(t, t), this.items.push(i);
                }
            },
            getPositionInView: function(e) {
                var t = e.parent.convertToWorldSpaceAR(e.position);
                return this.scrollView.node.convertToNodeSpaceAR(t);
            },
            update: function(e) {
                if (this.updateTimer += e, !(this.updateTimer < this.updateInterval)) {
                    this.updateTimer = 0;
                    for (var t = this.items, i = this.bufferZone, n = this.scrollView.content.y < this.lastContentPosY, o = (this.itemHeight + this.spacing) * t.length, s = 0; s < t.length; ++s) {
                        var a = this.getPositionInView(t[s]);
                        if (n) {
                            if (a.y < -i && t[s].y + o < 0) {
                                t[s].y = t[s].y + o;
                                var r = t[s].getComponent("flowermapitem"), c = r.itemID - t.length;
                                r.updateItem(s, c);
                            }
                        } else if (a.y > i && t[s].y - o > -this.content.height) {
                            console.log(t[s].y), t[s].y = t[s].y - o;
                            var l = t[s].getComponent("flowermapitem"), u = l.itemID + t.length;
                            l.updateItem(s, u);
                        }
                    }
                    this.lastContentPosY = this.scrollView.content.y;
                }
            },
            scrollEvent: function(e, t) {},
            addItem: function() {
                this.content.height = (this.totalCount + 1) * (this.itemHeight + this.spacing) + this.spacing, 
                this.totalCount = this.totalCount + 1;
            },
            removeItem: function() {
                this.content.height = (this.totalCount - 1) * (this.itemHeight + this.spacing) + this.spacing, 
                this.totalCount = this.totalCount - 1, this.moveBottomItemToTop();
            },
            moveBottomItemToTop: function() {
                var e = (this.itemHeight + this.spacing) * this.items.length, t = this.items.length, i = this.getItemAtBottom();
                if (i.y + e < 0) {
                    i.y = i.y + e;
                    var n = i.getComponent("flowermapitem"), o = n.itemID - t;
                    n.updateItem(t - 1, o);
                }
            },
            getItemAtBottom: function() {
                for (var e = this.items[0], t = 1; t < this.items.length; ++t) e.y > this.items[t].y && (e = this.items[t]);
                return e;
            },
            scrollToFixedPosition: function() {
                this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
            }
        }), cc._RF.pop();
    }, {} ],
    LoadPrefab: [ function(e, t, i) {
        cc._RF.push(t, "cf2d8p03sdFA5dDzosEtzJw", "LoadPrefab"), cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0
            },
            properties: {
                prefab: cc.Prefab,
                parent: cc.Node,
                autoLoad: !1
            },
            onLoad: function() {
                this.autoLoad && this.loadPrefad();
            },
            loadPrefad: function() {
                var e = cc.instantiate(this.prefab);
                e._objFlags |= cc.Object.Flags.DontSave, e.parent = this.parent || this.node;
            }
        }), cc._RF.pop();
    }, {} ],
    NodeExtend: [ function(e, t, i) {
        function n(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        var o;
        cc._RF.push(t, "76bcbGiJUJNqpPWmCAqXsof", "NodeExtend");
        var s = {
            _touchFuncs: (o = {}, n(o, cc.Node.EventType.TOUCH_START, "beginFunc"), n(o, cc.Node.EventType.TOUCH_MOVE, "moveFunc"), 
            n(o, cc.Node.EventType.TOUCH_CANCEL, "cancelFunc"), n(o, cc.Node.EventType.TOUCH_END, "endFunc"), 
            o),
            _press: function(e, t) {
                t = t || .9, e.originalScaleX = e.scaleX, e.originalScaleY = e.scaleY, e.setScale(e.originalScaleX * t, e.originalScaleY * t);
            },
            _restore: function(e) {
                e.setScale(e.originalScaleX || 1, e.originalScaleY || 1);
            },
            _clearTouchEvents: function(e, t, i) {
                if (i) {
                    var n = this._touchFuncs[i];
                    e[n] && e.off(i, e[n], t);
                } else for (var o in this._touchFuncs) {
                    var s = this._touchFuncs[o];
                    e[s] && e.off(o, e[s], t);
                }
            },
            touchEvent: function(e, t, i, n) {
                this._clearTouchEvents(e, n, t), e[this._touchFuncs[t]] = i, e.on(t, i, n);
            },
            touchEvents: function(e, t, i, n, o, s) {
                this._clearTouchEvents(e, s), e.beginFunc = t, e.moveFunc = i, e.cancelFunc = o, 
                e.endFunc = n, e.on(cc.Node.EventType.TOUCH_START, e.beginFunc, s), e.on(cc.Node.EventType.TOUCH_MOVE, e.moveFunc, s), 
                e.on(cc.Node.EventType.TOUCH_CANCEL, e.cancelFunc, s), e.on(cc.Node.EventType.TOUCH_END, e.endFunc, s);
            },
            touchEventsScale: function(e, t, i, n, o, s, a) {
                var r = this;
                r._clearTouchEvents(e, s), e.beginFunc = function(i) {
                    r._press(e, a), sd.pf.doCallBack(t, s, i);
                }, e.moveFunc = function(e) {
                    sd.pf.doCallBack(i, s, e);
                }, e.cancelFunc = function(t) {
                    r._restore(e), sd.pf.doCallBack(o, s, t);
                }, e.endFunc = function(t) {
                    r._restore(e), sd.pf.doCallBack(n, s, t);
                }, e.on(cc.Node.EventType.TOUCH_START, e.beginFunc, s), e.on(cc.Node.EventType.TOUCH_MOVE, e.moveFunc, s), 
                e.on(cc.Node.EventType.TOUCH_CANCEL, e.cancelFunc, s), e.on(cc.Node.EventType.TOUCH_END, e.endFunc, s);
            },
            touchEndEventScale: function(e, t, i, n) {
                var o = this;
                o._clearTouchEvents(e, i), e.beginFunc = function(t) {
                    o._press(e, n);
                }, e.cancelFunc = function(t) {
                    o._restore(e);
                }, e.endFunc = function(n) {
                    o._restore(e), sd.pf.doCallBack(t, i, n);
                }, e.on(cc.Node.EventType.TOUCH_START, e.beginFunc, i), e.on(cc.Node.EventType.TOUCH_CANCEL, e.cancelFunc, i), 
                e.on(cc.Node.EventType.TOUCH_END, e.endFunc, i);
            }
        };
        t.exports = s, cc._RF.pop();
    }, {} ],
    NodeEx: [ function(e, t, i) {
        cc._RF.push(t, "07cf43Lb4FLxa1YwZcxnMbT", "NodeEx"), cc.Node.prototype.startTimer = function(e, t, i) {
            this.runAction(cc.sequence(cc.delayTime(i), cc.callFunc(e, t)));
        }, cc.Node.prototype.startTimerForever = function(e, t, i) {
            return this.runAction(cc.repeatForever(cc.sequence(cc.delayTime(i), cc.callFunc(e, t))));
        }, cc.Node.prototype.stopTimer = function() {
            this.stopAllActions();
        }, cc.Node.prototype.visibleAll = function(e) {
            for (var t = this.getChildren(), i = 0; i < t.length; ++i) {
                var n = t[i];
                e(n), n.visibleAll(e);
            }
        }, cc.Node.prototype.destroyAll = function(e) {
            for (var t = this.getChildren(), i = 0; i < t.length; ++i) {
                var n = t[i];
                n.closeUI ? n.closeUI() : n.destroy();
            }
        }, cc.Node.prototype.setAshing = function(e) {
            this.visibleAll(function(t) {
                t.getComponent(cc.Sprite) && t.getComponent(cc.Sprite).setState(e ? 1 : 0);
            });
        }, cc._RF.pop();
    }, {} ],
    PopCompont: [ function(e, t, i) {
        cc._RF.push(t, "35317FbvENEIpN4ErP/ZGTv", "PopCompont"), cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0
            },
            properties: {
                prefab: cc.Prefab,
                autoLoad: !1,
                mask: !1,
                banner: !1
            },
            onLoad: function() {
                this.autoLoad && this.loadPrefad();
            },
            loadPrefad: function() {
                popBannerDlg(this.prefab, 0, this.mask, this.banner)._objFlags |= cc.Object.Flags.DontSave;
            }
        }), cc._RF.pop();
    }, {} ],
    Shield: [ function(e, t, i) {
        cc._RF.push(t, "ee203s2UgBMlbCk7WVxl0nQ", "Shield"), cc.Class({
            extends: cc.Component,
            start: function() {
                this.node.on(cc.Node.EventType.TOUCH_END, function() {}, this);
            }
        }), cc._RF.pop();
    }, {} ],
    SpriteExtend: [ function(e, t, i) {
        cc._RF.push(t, "f7ba2XGFsNIMascaZeVmsSC", "SpriteExtend");
        var n = {
            setTexture: function(e, t) {
                var i = e.getComponent(cc.Sprite);
                if (i) {
                    var n = cc.url.raw(t);
                    cc.loader.getRes(n) ? i.spriteFrame = new cc.SpriteFrame(n) : cc.loader.load(n, function(e, t) {
                        i.spriteFrame = new cc.SpriteFrame(t);
                    });
                }
            }
        };
        t.exports = n, cc._RF.pop();
    }, {} ],
    SpriteEx: [ function(e, t, i) {
        cc._RF.push(t, "ac68aeUzitIRpu/tn2N9FHh", "SpriteEx"), cc.Sprite.prototype.setSprite = function(e) {
            this.spriteFrame ? this.spriteFrame.setTexture(cc.url.raw("resources/texture/" + e)) : this.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/texture/" + e));
        }, cc._RF.pop();
    }, {} ],
    bigNumberCal: [ function(e, t, i) {
        cc._RF.push(t, "d15a0b/YvJFmK41FJEEteDE", "bigNumberCal");
        var n = {
            unitCoin: [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q" ],
            unitCoinReal: [ "万", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载", "极", "恒", "阿", "那" ],
            unitCoinToReal: {},
            unionSize: 4,
            unionAddStr: "0000",
            checkHasUnit: function(e) {
                "number" == typeof e && (console.log("----传过来的值是number类型，不是string,请检查---", e), e += "");
                for (var t = e.charAt(e.length - 1), i = 0, n = this.unitCoin.length; i < n; i++) if (this.unitCoin[i] == t) return {
                    index: i + 1,
                    unit: this.unitCoin[i]
                };
                return null;
            },
            compare: function(e, t) {
                var i = this.openSpecial(e), n = this.openSpecial(t);
                if (parseFloat(i) < 1e6 && parseFloat(n) < 1e6) return parseFloat(i) >= parseFloat(n);
                if (i.length > n.length) return !0;
                if (i.length < n.length) return !1;
                for (var o = 0, s = i.length; o < s; o++) {
                    if (parseInt(i[o]) > parseInt(n[o])) return !0;
                    if (parseInt(i[o]) < parseInt(n[o])) return !1;
                }
                return !0;
            },
            openSpecial: function(e, t) {
                void 0 == t && (t = !0), "number" == typeof e && (e += "");
                var i = this.checkHasUnit(e), n = e.indexOf(".");
                if (i) {
                    var o = e.substr(0, e.length - 1);
                    -1 != n ? (e = (1e4 * parseFloat(o)).toFixed(), i.index--) : e = o;
                    for (var s = 0; s < i.index; s++) e += this.unionAddStr;
                } else -1 != n && t && (e = e.substr(0, n));
                return e;
            },
            closeNumToSpecial: function(e, t) {
                if (void 0 == t && (t = !1), "number" == typeof e && (e += ""), this.checkHasUnit(e)) return e;
                var i = e.indexOf("."), n = e;
                -1 != i && (n = e.substr(0, i));
                var o = "", s = n.length;
                if (s <= 4) return parseFloat(e).toFixed();
                var a = Math.floor(s / this.unionSize);
                (a == s / this.unionSize || t) && (a -= 1), o = this.unitCoin[a - 1];
                var r = n.substr(0, s - a * this.unionSize);
                return r + "." + n.substr(r.length, 2) + o;
            },
            closeNumToRealSpecial: function(e) {
                var t = this.closeNumToSpecial(e), i = t[t.length - 1];
                return this.unitCoinToReal[i] ? t.substr(0, t.length - 1) + (this.unitCoinToReal[i] || "Max") : t;
            },
            delFrontZero: function(e) {
                return e.replace(/\b(0+)/gi, "");
            },
            add: function(e, t) {
                var i = 0, n = !1;
                "number" == typeof e ? (e += "", i++) : "-" == e[0] && (n = !0, e = e.substr(1, e.length));
                var o = !1;
                if ("number" == typeof t ? (t += "", i++) : "-" == t[0] && (o = !0, t = t.substr(1, t.length)), 
                2 == i) return parseFloat(e) + parseFloat(t) + "";
                if (!n && o) return this.reduce(e, t);
                if (n && !o) return this.reduce(t, e);
                var s = this.openSpecial(e), a = this.openSpecial(t);
                if (parseFloat(s) < 1e6 && parseFloat(a) < 1e6) return (parseFloat(s) + parseFloat(a)).toFixed();
                var r = "", c = 0, l = "";
                s.length < a.length && (l = s, s = a, a = l);
                for (var u = 0, h = s.length - a.length; u < h; u++) a = "0" + a;
                for (var d = s.length - 1; d >= 0; d--) {
                    var g = parseInt(s[d]) + parseInt(a[d]) + c;
                    c = Math.floor(g / 10), g = String(g);
                    var f = parseInt(g) >= 10 ? g.substr(1, 1) : g;
                    0 == d && (f = g), r = f + r;
                }
                if (-1 == r.indexOf("NaN")) {
                    if (n && o) return "-" + this.delFrontZero(r);
                    var m = this.delFrontZero(r);
                    return "" == m && (m = "0"), m;
                }
                console.error("-----add计算出错啦---coin1=" + e + "  coin2 =" + t);
            },
            reduce: function(e, t) {
                var i = 0;
                if ("number" == typeof e && (e += "", i++), "number" == typeof t && (t += "", i++), 
                2 == i) return parseFloat(e) - parseFloat(t) + "";
                var n = this.openSpecial(e), o = this.openSpecial(t);
                if (parseFloat(n) < 1e6 && parseFloat(o) < 1e6) return (parseFloat(n) - parseFloat(o)).toFixed();
                var s = n.length >= o.length ? "" : "-", a = "", r = 0, c = "";
                n.length < o.length && (c = n, n = o, o = c);
                for (var l = 0, u = n.length - o.length; l < u; l++) o = "0" + o;
                for (var h = n.length - 1; h >= 0; h--) {
                    var d = parseInt(n[h]) - parseInt(o[h]) - r;
                    d < 0 ? (d += 10, r = 1) : r = 0, a = d + a;
                }
                if (-1 != a.indexOf("NaN")) throw console.error("-----reduce计算出错啦---coin1=" + e + "  coin2 =" + t), 
                "-----reduce计算出错啦---coin1=" + e + "  coin2 =" + t;
                "-" == s && console.log("----请注意减法结果为负数---coin1=" + e + "  coin2 =" + t);
                var g = s + this.delFrontZero(a);
                return "" == g && (g = "0"), g;
            },
            mult: function(e, t) {
                var i = 0;
                if ("number" == typeof e && (e += "", i++), "number" == typeof t && (t += "", i++), 
                2 == i) return parseFloat(e) * parseFloat(t) + "";
                var n = this.openSpecial(e), o = this.openSpecial(t, !1);
                if (parseFloat(n) < 1e6 && parseFloat(o) < 1e6) return (parseFloat(n) * parseFloat(o)).toFixed();
                var s = t.indexOf(".");
                if (-1 != s) {
                    var a = t.substr(0, s), r = t.substring(s + 1, t.length), c = this.mult(e, a), l = this.mult(e, r);
                    return l = l.substr(0, l.length - r.length) + "." + l.substring(l.length - r.length, l.length), 
                    this.add(c, l);
                }
                var u = "", h = 0, d = "";
                n.length > o.length && (d = n, n = o, o = d);
                for (var g = n.length - 1; g >= 0; g--) {
                    d = "";
                    for (var f = o.length - 1; f >= 0; f--) {
                        var m = parseInt(n[g]) * parseInt(o[f]) + h;
                        h = Math.floor(m / 10), m += "";
                        var p = parseInt(m) >= 10 ? m.substr(1, 1) : m;
                        0 == f && (p = m), d = p + d;
                    }
                    for (var v = n.length - 1; v > g; v--) d += "0";
                    u = "" == u ? d : this.add(u, d);
                }
                if (-1 == u.indexOf("NaN")) {
                    var y = this.delFrontZero(u);
                    return "" == y && (y = "0"), y;
                }
                console.error("-----mult计算出错啦---coin1=" + e + "  coin2 =" + t);
            },
            divi: function() {}
        };
        n.unitCoin.forEach(function(e, t) {
            n.unitCoinToReal[e] = n.unitCoinReal[t];
        }), window.bigNumber = n, t.exports = n, cc._RF.pop();
    }, {} ],
    boomeffect: [ function(e, t, i) {
        cc._RF.push(t, "f2555YvXuJOm4ZrTRFHd7Wz", "boomeffect"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {},
            show: function(e, t) {
                var i = cc.find("Canvas");
                this.node.x = e.x - i.width / 2, this.node.y = e.y - i.height / 2, t && (this.node.getComponent(cc.ParticleSystem).spriteFrame = resManager.getResource(t)), 
                i.addChild(this.node);
            }
        }), cc._RF.pop();
    }, {} ],
    breedFlowerUI: [ function(e, t, i) {
        cc._RF.push(t, "48b80aHZ4JDSYrnfEGHIOOW", "breedFlowerUI"), cc.Class({
            extends: cc.Component,
            properties: {
                tipNode: cc.Node
            },
            start: function() {
                this._tipTime = 0, this._tipDisplay = this.tipNode.getComponent(cc.Animation);
            },
            updateFlowers: function() {},
            update: function(e) {
                this._tipTime += e, this.tipNode.active ? this._tipTime >= 3 && this.setTipNodeShow(!1) : this._tipTime >= 5 && this.setTipNodeShow(!0);
            },
            setTipNodeShow: function(e) {
                if (this._tipTime = 0, e) {
                    var t = user.getNextUnlockFlowerId();
                    if (!user.getMoveFlowerId()[t]) return;
                }
                this.tipNode.active = e, e && (this._tipDisplay.playAdditive("xinpingzhong"), this._tipDisplay.playAdditive("xinpingzhong1"));
            }
        }), cc._RF.pop();
    }, {} ],
    cangkuDlg: [ function(e, t, i) {
        cc._RF.push(t, "548f5QQdhJCUa6d/XtovZO2", "cangkuDlg"), cc.Class({
            extends: cc.Component,
            properties: {
                titleBg: cc.Node,
                levelBg: cc.Node,
                level: cc.Label,
                upLevel: cc.Label,
                levelUpMoney: cc.Label,
                levelUpDesc: cc.Label,
                oneNextAdd: cc.Label,
                oneCurAdd: cc.Label,
                oneScaleAdd: cc.Node,
                oneIcon: cc.Node,
                oneDesc: cc.Node,
                twoNextAdd: cc.Label,
                twoCurAdd: cc.Label,
                twoScaleAdd: cc.Node,
                twoIcon: cc.Node,
                twoDesc: cc.Node,
                threeNextAdd: cc.Label,
                threeCurAdd: cc.Label,
                threeScaleAdd: cc.Node,
                threeIcon: cc.Node,
                threeDesc: cc.Node,
                button: cc.Node,
                check1: cc.Toggle,
                check2: cc.Toggle,
                check3: cc.Toggle,
                typeName: "",
                otherValue: 0
            },
            onLoad: function() {},
            initUi: function() {
                this.titleBg.getChildByName(this.typeName).active = !0, this.levelBg.getChildByName(this.typeName).active = !0, 
                this.threeIcon.getChildByName(this.typeName).active = !0;
            },
            _getLevelUpMoney: function() {
                var e = user.getWarehouseLevel();
                switch (this.typeName) {
                  case "store":
                    e = user.getStoreLevel();
                    break;

                  case "huatai":
                    e = user.getStandLevel(this.otherValue);
                }
                for (var t = "0", i = 0; i < this.upLevelV; ++i) {
                    var n = config.Level.find(e + i), o = n.warehouseCostMoney;
                    switch (this.typeName) {
                      case "store":
                        o = n.saleCostMoney;
                        break;

                      case "huatai":
                        o = n["costMoney" + (this.otherValue + 1)];
                    }
                    t = bigNumber.add(t, o);
                }
                return t;
            },
            _upLevelVchangeDeal: function() {
                switch (this.typeName) {
                  case "cangku":
                    if (user.warehouseLevelFull(this.upLevelV)) return void (this.levelUpMoney.string = "MAX");
                    break;

                  case "store":
                    if (user.storeLevelFull(this.upLevelV)) return void (this.levelUpMoney.string = "MAX");
                    break;

                  case "huatai":
                    if (user.standLevelFull(this.otherValue, this.upLevelV)) return void (this.levelUpMoney.string = "MAX");
                }
                this.needMoney = this._getLevelUpMoney(), this.levelUpMoney.string = bigNumber.closeNumToRealSpecial(this.needMoney);
            },
            _changeUpLevelV: function(e) {
                this.upLevelV != e && (this.upLevelV = e, this.upLevel.string = this.upLevelV.toString(), 
                this._upLevelVchangeDeal(), this.setNextData());
            },
            setNextData: function() {
                var e;
                switch (this.oneDesc.getChildByName(this.typeName).active = !0, this.twoDesc.getChildByName(this.typeName).active = !0, 
                this.threeDesc.getChildByName(this.typeName).active = !0, this.typeName) {
                  case "cangku":
                    if (e = user.getWarehouseLevel(), config.WareHouse.find(user.getWarehouseLevel()), 
                    !config.WareHouse.find(user.getWarehouseLevel() + this.upLevelV)) return;
                    var t = user.getWarehouseAddBase(user.getWarehouseLevel()), i = user.getWarehouseAddBase(user.getWarehouseLevel() + this.upLevelV);
                    this.oneNextAdd.string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(i, t)) + "/次", 
                    this.oneCurAdd.string = bigNumber.closeNumToRealSpecial(t) + "/次", this.threeCurAdd.string = user.getCangkuWorkerNum() + "位", 
                    this.threeNextAdd.string = "+" + (user.getCangkuWorkerNum(user.getWarehouseLevel() + this.upLevelV) - user.getCangkuWorkerNum()) + "位";
                    var n = user.getWarehouseAdd(user.getWarehouseLevel());
                    this.oneScaleAdd.getChildByName("value").getComponent(cc.Label).string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(n, t)), 
                    this.threeScaleAdd.active = !1;
                    var o = (user.getWarehouseSpeedBase(user.getWarehouseLevel()) / 100).toFixed(2), s = (user.getWarehouseSpeedBase(user.getWarehouseLevel() + this.upLevelV) / 100).toFixed(2), a = (user.getWarehouseSpeed(user.getWarehouseLevel()) / 100).toFixed(2);
                    this.twoCurAdd.string = o + "m/s", this.twoNextAdd.string = (s - o).toFixed(2) + "m/s", 
                    this.twoScaleAdd.getChildByName("value").getComponent(cc.Label).string = "+" + (a - o).toFixed(2) + "m/s";
                    break;

                  case "huatai":
                    e = user.getStandLevel(this.otherValue);
                    var r = user.getStandLevel(this.otherValue) + this.upLevelV;
                    if (config.Parterre.find(e), !config.Parterre.find(r)) return;
                    var c = user.getStandCostBase(this.otherValue, e), l = user.getStandCostBase(this.otherValue, r);
                    this.oneNextAdd.string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(l, c)) + "/次", 
                    this.oneCurAdd.string = bigNumber.closeNumToRealSpecial(c) + "/次";
                    var u = user.getStandProduceBase(this.otherValue, e), h = user.getStandProduceBase(this.otherValue, r);
                    this.twoNextAdd.string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(h, u)) + "/次", 
                    this.twoCurAdd.string = bigNumber.closeNumToRealSpecial(u) + "/次";
                    var d = user.getStandAddMoneyBase(this.otherValue, e), g = user.getStandAddMoneyBase(this.otherValue, r);
                    this.threeCurAdd.string = bigNumber.closeNumToRealSpecial(d) + "/次", this.threeNextAdd.string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(g, d)) + "次", 
                    n = user.getStandAddMoney(this.otherValue, e);
                    var f = user.getStandCost(this.otherValue, e), m = user.getStandProduce(this.otherValue, e);
                    this.threeScaleAdd.getChildByName("value").getComponent(cc.Label).string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(n, d)), 
                    this.oneScaleAdd.getChildByName("value").getComponent(cc.Label).string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(f, c)), 
                    this.twoScaleAdd.getChildByName("value").getComponent(cc.Label).string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(m, u));
                    break;

                  case "store":
                    if (e = user.getStoreLevel(), r = user.getStoreLevel() + this.upLevelV, config.Send.find(e), 
                    !config.Send.find(r)) return;
                    t = user.getStoreAddBase(e);
                    var p = user.getStoreAddBase(r);
                    this.oneNextAdd.string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(p, t)) + "/次", 
                    this.oneCurAdd.string = bigNumber.closeNumToRealSpecial(t) + "/次", this.threeCurAdd.string = user.getStoreWorkerNum() + "位", 
                    this.threeNextAdd.string = "+" + (user.getStoreWorkerNum(r) - user.getStoreWorkerNum()) + "位", 
                    n = user.getStoreAdd(e), this.oneScaleAdd.getChildByName("value").getComponent(cc.Label).string = "+" + bigNumber.closeNumToRealSpecial(bigNumber.reduce(n, t)), 
                    this.threeScaleAdd.active = !1, o = (user.getStoreSpeedBase(e) / 100).toFixed(2), 
                    s = (user.getStoreSpeedBase(r) / 100).toFixed(2), a = (user.getStoreSpeed(e) / 100).toFixed(2), 
                    this.twoCurAdd.string = o + "m/s", this.twoNextAdd.string = (s - o).toFixed(2) + "m/s", 
                    this.twoScaleAdd.getChildByName("value").getComponent(cc.Label).string = "+" + (a - o).toFixed(2) + "m/s";
                }
                this.levelUpDesc.string = 10 * Math.floor(e / 10) + 10 + "级将出现大提升！";
            },
            start: function() {
                var e = this;
                switch (this.needMoney = "0", this._changeUpLevelV(1), this.typeName) {
                  case "cangku":
                    this.level.string = user.getWarehouseLevel().toString();
                    break;

                  case "store":
                    this.level.string = user.getStoreLevel().toString();
                    break;

                  case "huatai":
                    this.level.string = user.getStandLevel(this.otherValue).toString();
                }
                switch (this.setNextData(), pressButtonDeal(this.button, function(t) {
                    var i = !1;
                    switch (e.typeName) {
                      case "cangku":
                        user.warehouseLevelFull(e.upLevelV) ? PopLayer.tip("等级已达上限！") : user.moneyEnough(e.needMoney) ? (user.setWarehouseLevel(user.getWarehouseLevel() + e.upLevelV), 
                        user.reduceMoney(e.needMoney), e.level.string = user.getWarehouseLevel().toString(), 
                        e.setNextData(), e._upLevelVchangeDeal(), i = !0) : PopLayer.tip(gConst.moneyName + "不足！"), 
                        sd.DlgMgr.hideGuide(gConst.guides.cangkuLevel);
                        break;

                      case "huatai":
                        user.standLevelFull(e.otherValue, e.upLevelV) ? PopLayer.tip("等级已达上限！") : user.moneyEnough(e.needMoney) ? (user.addStandLevel(e.otherValue, e.upLevelV), 
                        user.reduceMoney(e.needMoney), e.level.string = user.getStandLevel(e.otherValue).toString(), 
                        e.setNextData(), e._upLevelVchangeDeal(), i = !0) : PopLayer.tip(gConst.moneyName + "不足！"), 
                        sd.DlgMgr.hideGuide(gConst.guides.standBtn);
                        break;

                      case "store":
                        user.storeLevelFull(e.upLevelV) ? PopLayer.tip("等级已达上限！") : user.moneyEnough(e.needMoney) ? (user.addStoreLevel(e.upLevelV), 
                        user.reduceMoney(e.needMoney), e.level.string = user.getStoreLevel().toString(), 
                        e.setNextData(), e._upLevelVchangeDeal(), i = !0) : PopLayer.tip(gConst.moneyName + "不足！"), 
                        sd.DlgMgr.hideGuide(gConst.guides.storeLevel);
                    }
                    cc.loader.loadRes("audio/btn_upgrade", cc.AudioClip, function(e, t) {
                        cc.audioEngine.playEffect(t, !1);
                    }), i && sd.dropMoeny.playEffect(e.button);
                    if(i){
                      /**
                       * 连续点击8次，弹出插屏
                       */
                      var clickButtonTime = e.clickButtonTime
                      e.clickButtonTime = new Date().getTime()
                      if(e.clickButtonTime - clickButtonTime < 2000){
                        e.clickButtonCount = e.clickButtonCount || 0
                        e.clickButtonCount++
                        if(e.clickButtonCount > 7){
                          e.clickButtonCount= 0
                          showInterstitialAd()
                        }
                      }else{
                        e.clickButtonCount = 0
                      }
                    }
                }), this.typeName) {
                  case "cangku":
                    sd.DlgMgr.closeGuide(gConst.guides.cangkuOpen), sd.DlgMgr.showGuide(gConst.guides.cangkuLevel, this.button);
                    break;

                  case "store":
                    sd.DlgMgr.closeGuide(gConst.guides.storeOpen), sd.DlgMgr.showGuide(gConst.guides.storeLevel, this.button);
                    break;

                  case "huatai":
                    sd.DlgMgr.showGuide(gConst.guides.standBtn, this.button);
                }
            },
            onDestroy: function() {
                switch (this.typeName) {
                  case "cangku":
                    sd.DlgMgr.closeGuide(gConst.guides.cangkuLevel), sd.mainDlg.openStoreGuide();
                    break;

                  case "store":
                    sd.DlgMgr.closeGuide(gConst.guides.storeLevel);
                    break;

                  case "huatai":
                    sd.DlgMgr.closeGuide(gConst.guides.standBtn);
                }
            },
            update: function(e) {
                var t = !1;
                switch (this.typeName) {
                  case "cangku":
                    t = user.warehouseLevelFull(this.upLevelV);
                    break;

                  case "store":
                    t = user.storeLevelFull(this.upLevelV);
                    break;

                  case "huatai":
                    t = user.standLevelFull(this.otherValue, this.upLevelV);
                }
                !user.moneyEnough(this.needMoney) || t ? (this.button.getChildByName("all").getChildByName("bg2").active = !1, 
                this.button.getChildByName("all").getChildByName("bg2").active = !0, this.button.getChildByName("all").getChildByName("hui").active = !0, 
                this.button.getChildByName("all").getChildByName("hui2").active = !0) : (this.button.getChildByName("all").getChildByName("bg").active = !0, 
                this.button.getChildByName("all").getChildByName("bg2").active = !1, this.button.getChildByName("all").getChildByName("hui").active = !1, 
                this.button.getChildByName("all").getChildByName("hui2").active = !1);
                var i = this.upLevelV;
                this.check1.isChecked ? i = 1 : this.check2.isChecked ? i = 5 : this.check3.isChecked && (i = 25), 
                this._changeUpLevelV(i);
            }
        }), cc._RF.pop();
    }, {} ],
    channel: [ function(e, t, i) {
        cc._RF.push(t, "28b92Qc4aFGco6sstz7R1mF", "channel");
        var n, o, s = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(e, n.key, n);
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t;
            };
        }(), a = e("./../network/http"), r = e("./libWechat"), c = {}, l = (o = n = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
            }
            return s(e, null, [ {
                key: "isTouTiao",
                value: function() {
                    return !!window.tt;
                }
            }, {
                key: "getVersion",
                value: function() {
                    return this.version;
                }
            }, {
                key: "init",
                value: function() {
                    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                        r.init(), r.onShare(function() {
                            var e = {
                                title: "不管你来或是不来，我都在这里等你",
                                imageUrl: wxDownloader.REMOTE_SERVER_ROOT + "/invite/1004.jpg",
                                query: "",
                                success: function(e) {
                                    console.info("onShare", e + "成功");
                                },
                                fail: function(e) {
                                    console.log("onShare", e + "失败");
                                },
                                complete: function(e) {}
                            };
                            if (!user.gameStarted()) return e;
                            e.query = "uid=" + pomelo.getUid();
                            var t = user.getInviteIcons();
                            if (t) {
                                var i = t[gConst.random.randomInt(0, t.length - 1)];
                                e.title = i.writing, e.imageUrl = wxDownloader.REMOTE_SERVER_ROOT + "/invite/" + i.picture;
                            }
                            return e;
                        });
                        var e = this;
                        wx.getSystemInfo({
                            success: function(t) {
                                e.wxSystemInfo = t, e.isIphoneX() && (e.bannerHeight += 55);
                            }
                        });
                    }
                }
            }, {
                key: "isIphoneX",
                value: function() {
                    return -1 != this.wxSystemInfo.model.indexOf("iPhone X");
                }
            }, {
                key: "isAndroid",
                value: function() {
                    return -1 != this.wxSystemInfo.platform.indexOf("android");
                }
            }, {
                key: "isIos",
                value: function() {
                    return -1 != this.wxSystemInfo.platform.indexOf("ios");
                }
            }, {
                key: "isInBack",
                value: function() {
                    return cc.sys.platform === cc.sys.WECHAT_GAME && r.isBack;
                }
            }, {
                key: "offlineBack",
                value: function() {
                    return cc.sys.platform !== cc.sys.WECHAT_GAME || r.offlineBack;
                }
            }, {
                key: "setOfflineBack",
                value: function() {
                    cc.sys.platform === cc.sys.WECHAT_GAME && (r.offlineBack = !1);
                }
            }, {
                key: "exit",
                value: function() {
                    cc.sys.platform === cc.sys.WECHAT_GAME && wx.exitMiniProgram({});
                }
            }, {
                key: "getInviteData",
                value: function() {
                    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                        var e = r.invite();
                        return cc.log("我需要的数据--------------------------------------------------------------"), 
                        cc.log(e), e;
                    }
                    return {};
                }
            }, {
                key: "getWatchAd",
                value: function(e) {
                    var t = this, i = !1, n = function(n, o) {
                        !i && user.canWatchAd() ? (WaitNetLayer.pop(), t.showRewardVideoAd(function(e) {
                            switch (WaitNetLayer.hide(), e.type) {
                              case 1:
                                n();
                                break;

                              case 2:
                                o();
                                break;

                              case 3:
                              case 4:
                                // i = !0, t.share(n, o);
                                o();
                            }
                        }, e)) : t.share(n, o);
                    };
                    return n.getType = function() {
                        return i ? 0 : 1;
                    }, n;
                }
            }, {
                key: "getShareAndAd",
                value: function(e, t) {
                    var i = this;
                    if (c[e]) return c[e];
                    var n = 0, o = function() {
                        user.canWatchAd() ? (console.log("可以看广告"), n = 1/*gConst.random.randomInt(0, 1)*/, console.log("随机到:" + n)) : (n = 0, 
                        console.log("不可以看广告")), 0 != n || user.needInvite() || (n = 1);
                    };
                    o();
                    var s = this.getWatchAd(t), a = function(e, t) {
                        if (cc.sys.platform !== cc.sys.WECHAT_GAME) return e(), void user.countTaskNum(0, 1);
                        0 != n && user.canWatchAd() ? s(function() {
                            o(), e();
                        }, t) : (n = 0, i.share(function() {
                            o(), e();
                        }, t));
                    };
                    return a.getType = function() {
                        return n;
                    }, c[e] = a, a;
                }
            }, {
                key: "shareAndAd",
                value: function(e, t) {
                    var i = this;
                    0 != gConst.random.randomInt(0, 1) && user.canWatchAd() ? e(1, this.getWatchAd(t)) : user.needInvite() ? e(0, function(e, t) {
                        i.share(e, t);
                    }) : e(1, this.getWatchAd(t));
                }
            }, {
                key: "share",
                value: function(e, t) {
                    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                        if (!user.needInvite()) return void e();
                        WaitNetLayer.pop(), user.getInviteIcons(function(i, n) {
                            if (WaitNetLayer.hide(), !i) {
                                var o = n[gConst.random.randomInt(0, n.length - 1)];
                                r.share(o.writing, wxDownloader.REMOTE_SERVER_ROOT + "/invite/" + o.picture, "uid=" + pomelo.getUid(), function() {
                                    e(), user.countTaskNum(0, 1);
                                }, function() {
                                    t();
                                });
                            }
                        });
                    } else e(), user.countTaskNum(0, 1);
                }
            }, {
                key: "getInviteCount",
                value: function(t, i, n) {
                    if (this.getChannelId() == this.eChannel.WECHAT) {
                        if (void 0 == e.uid) return console.log("数据未完善！", e.uid), void n("数据未完善!");
                        a.get(t, {
                            inviter_id: e.uid,
                            game: i
                        }, function(e, t) {
                            console.log(t), e ? 200 == t.code ? (t = JSON.parse(t), n(null, t.count)) : n("获取数据失败，请重试！") : n("网络错误，请重试！");
                        });
                    }
                }
            }, {
                key: "sumitScore",
                value: function(e) {
                    cc.sys.platform === cc.sys.WECHAT_GAME && window.wx.postMessage({
                        messageType: 5,
                        score: e
                    });
                }
            }, {
                key: "loadAvatar",
                value: function(e, t) {
                    console.log("---avater---", t), "" != t && t ? (cc.sys.platform, cc.sys.WECHAT_GAME, 
                    helper.loadAvatarImg(e, {
                        url: t,
                        type: "png"
                    })) : cc.loader.loadRes("publicHead", cc.SpriteFrame, function(t, i) {
                        e.getComponent(cc.Sprite).spriteFrame = i;
                    });
                }
            }, {
                key: "isOpenAdv",
                value: function() {
                    return !window.gb4399 && cc.sys.platform !== cc.sys.WECHAT_GAME && cc.sys.platform !== cc.sys.QQ_PLAY && cc.sys.os == cc.sys.OS_ANDROID;
                }
            }, {
                key: "showBannerBottom2",
                value: function(e, t, i) {
                    cc.sys.platform === cc.sys.WECHAT_GAME && 1 == ++this.showBannerNum && (this.showBannerBottom(e, t, i), 
                    this.showBannerCb = e, this.showBannerSize = t);
                }
            }, {
                key: "showBannerBottom",
                value: function(e, t, i) {
                    // moreGamesButtonHide(1)
                    var n = this;
                    (cc.sys.platform === cc.sys.WECHAT_GAME && this.checkSdkVersion("2.0.4") > 0 || true)&& (console.log("版本库开始支持 !"), 
                    wx.getSystemInfo({
                        success: function(o) {
                            var s = cc.winSize.height / o.windowHeight;
                            cc.winSize.width, o.windowWidth, t /= s, t = Math.max(1, t);
                            var a = n.bannerAds[i];
                            console.log("adUnitId",i)
                            a ? (/*a.style.top = o.windowHeight - a.style.realHeight - (n.isIphoneX() ? 1 : 0), */
                            a.show()/*, a.style.realHeight && e(a.style.realHeight * s)*/) : (a && a.destroy(), 
                            console.log("创建小广告:" + i), (a = wx.createBannerAd({
                                adUnitId: i,
                                style: {
                                    left: 0,
                                    top: o.windowHeight - t,
                                    width: .9 * o.windowWidth,
                                    height: 0
                                }
                            }))/*.style.top = o.windowHeight - t*/, a.onResize(function(i) {
                                console.log("onResize", i, t), n.bannerAdWidth = i.width, n.bannerAdHeight = i.height, 
                                a.style.left = (o.windowWidth - i.width) / 2, a.style.top = o.windowHeight - i.height - (n.isIphoneX() ? 1 : 0), 
                                e(i.height * s);
                            }), a.onError(function(e) {
                                console.log(e);
                            }), a.onLoad(function() {
                                    a
                                        .show()
                                        .then(() => {
                                        console.log("广告显示成功");
                                        })
                                        .catch(err => {
                                        console.log("广告组件出现问题", err);
                                        });
                            }), n.bannerAds[i] = a);
                        }
                    }));
                }
            }, {
                key: "checkSdkVersion",
                value: function(e) {
                    for (var t = r.sdkVersion.split("."), i = e.split("."), n = Math.max(t.length, i.length); t.length < n; ) t.push("0");
                    for (;i.length < n; ) i.push("0");
                    for (var o = 0; o < n; o++) {
                        var s = parseInt(t[o]), a = parseInt(i[o]);
                        if (s > a) return 1;
                        if (s < a) return -1;
                    }
                    return 0;
                }
            }, {
                key: "hideBannerBottom2",
                value: function(e) {
                    --this.showBannerNum > 0 || this.hideBannerBottom(e);
                }
            }, {
                key: "hideBannerBottom",
                value: function(e) {
                    var t = this.bannerAds[e];
                    t && t.hide();
                    // moreGamesButtonShow(1)
                }
            }, {
                key: "showVideoAd",
                value: function(e, t) {
                    var i = this;
                    WaitNetLayer.pop(), this.showRewardVideoAd(function(n) {
                        switch (WaitNetLayer.hide(), n.type) {
                          case 1:
                            e();
                            break;

                          case 2:
                            t();
                            break;

                          case 3:
                          case 4:
                            // i.share(e, t);
                            t();
                        }
                    });
                }
            }, {
                key: "showRewardVideoAd",
                value: function(e, t) {
                    this.isloadVideo = true;
                    if (this.isloadVideo) e({
                        type: 1,
                        msg: "成功"
                    }); else {
                        this.isloadVideo = !0;
                        var i = this;
                        if (this.checkSdkVersion("2.0.4") > 0 || true) {
                            console.log("adUnitId = ",t)
                            var n = wx.createRewardedVideoAd({
                                adUnitId: t
                            });
                            this.onVideoClose && n.offClose(this.onVideoClose);
                            this.onVideoClose = function(t) {
                                // console.log("onClose",t,n,e,i)
                                n.offClose(i.onVideoClose),i.onVideoClose = null; void 0 === t || t && t.isEnded ? (e({
                                    type: 1,
                                    msg: "成功"
                                })/*, pomelo.request("scene.playerHandler.readAd", {}, function(e) {
                                    user.setAdTimes(e.adTimes);
                                })user.setAdTimes(e.adTimes)*/) : e({
                                    type: 2,
                                    msg: "未完成"
                                }), i.isloadVideo = !1;
                            };
                            n.onError(function() {
                                i.isloadVideo = !1;
                            }), n.load().then(function() {
                                n.show().then(function() {
                                    n.onClose(i.onVideoClose);
                                });
                            }).catch(function(t) {
                                e({
                                    type: 3,
                                    msg: "拉取广告失败"
                                }), i.isloadVideo = !1, console.log(t.errMsg);
                            });
                        } else e({
                            type: 4,
                            msg: "不支持"
                        }), i.isloadVideo = !1;
                    }
                }
            } ]), e;
        }(), n.gameId4399 = "xxxx", n.nickName = "", n.version = 11, n.uid = null, n.avatar = "", 
        n.token = "", n.mCallBackList = {}, n.channelId = null, n.bannerAds = {}, n.eChannel = {
            WINDOW: 10001,
            H5: 20001,
            H5_4399: 20002,
            WECHAT: 30001,
            QQ_PLAY: 40001,
            APP_A_4399: 50001,
            APP_A_HYKB: 60002
        }, n.wxSystemInfo = null, n.showBannerNum = 0, n.bannerHeight = 245, o);
        t.exports = window.channel = l, cc._RF.pop();
    }, {
        "./../network/http": "http",
        "./libWechat": "libWechat"
    } ],
    configFunData: [ function(e, t, i) {
        cc._RF.push(t, "cca66eOz01KqqzD8TWX4CRQ", "configFunData"), t.exports = function() {}, 
        cc._RF.pop();
    }, {} ],
    configTrans: [ function(e, t, i) {
        function n(e, t) {
            var i = e[0], n = e[1], s = [], r = [];
            for (var c in i) {
                var l = i[c], u = l.indexOf(".");
                switch (u >= 0 && (l = l.substring(0, u), s.push(l), i[c] = l), n[c]) {
                  case "number":
                  case "numberArr":
                    r.push(l);
                }
            }
            e.splice(0, 2), e.forEach(function(t, n) {
                for (var s = {}, r = 0, c = t.length - 1; r < c; ++r) {
                    var l = t[r];
                    if (o.isNumber(l)) l = a(l); else if (o.isArray(l)) for (var u = 0, h = l.length; u < h && o.isNumber(l[u]); ++u) l[u] = a(l[u]);
                    s[i[r]] = l;
                }
                e[n] = s, s.safeCheckV = t[t.length - 1];
            });
            var h = {};
            return e.forEach(function(e) {
                for (var i = h, n = 0, o = s.length; n < o; ++n) {
                    var a = e[s[n]];
                    n == s.length - 1 ? (cc.assert(!i[a], "主键值冲突了，请检查表(" + t + ")，值()"), i[a] = e) : i[a] = i[a] || {}, 
                    i = i[a];
                }
            }), [ e, h, r ];
        }
        cc._RF.push(t, "9203cQa5SxDULN1iMQhicr+", "configTrans");
        var o = e("utils"), s = function(e) {
            this.arrData = e[0], this.keyData = e[1], this.safeCheckFieldNames = e[2], this.findDataDeal = null;
        };
        s.prototype.transConfig = function(e) {
            if (e && !e.configHasTrans) {
                for (var t in e) {
                    var i = e[t];
                    if (o.isString(i)) {
                        var n = i.indexOf("E+");
                        if (n >= 0) {
                            var a = parseInt(i.substr(n + 2)) - (n - 2);
                            e[t] = i[0] + i.substr(2, n - 2) + new Array(a + 1).join("0");
                        }
                    }
                }
                e.configHasTrans = !0, this.findDataDeal && (s.safeCheckRow(e, this.safeCheckFieldNames, !0), 
                this.findDataDeal(e), e.safeCheckV = s.getSafeCheckV(e, this.safeCheckFieldNames));
            }
        }, s.prototype.find = function() {
            for (var e = this.keyData, t = 0, i = arguments.length; t < i; ++t) {
                if (!e) return null;
                e = e[arguments[t]];
            }
            return this.transConfig(e), s.safeCheckRow(e, this.safeCheckFieldNames), e;
        }, s.prototype.findById = s.prototype.find, s.prototype.findByType = function() {
            cc.assert(arguments.length >= 2 && arguments.length % 2 == 0, "参数错误！");
            for (var e = "", t = 0; t < arguments.length / 2; ++t) e += arguments[t] + "_";
            var i = this[e += "index"];
            if (!i) for (var n in i = {}, this[e] = i, this.all()) {
                var o = this.all()[n], a = i;
                for (t = 0; t < arguments.length / 2; ++t) {
                    var r = o[arguments[t]];
                    t === arguments.length / 2 - 1 ? (a[r] = a[r] || [], a[r].push(o)) : (a[r] = a[r] || {}, 
                    a = a[r]);
                }
            }
            var c = i;
            for (t = arguments.length / 2; t < arguments.length; ++t) if (!(c = c[arguments[t]])) return [];
            t = 0;
            for (var l = c.length; t < l; ++t) this.transConfig(c[t]);
            return s.safeCheckRow(c, this.safeCheckFieldNames), c;
        }, s.prototype.all = function() {
            return this.arrData;
        }, s.getSafeCheckV = function(e, t) {
            for (var i = 0, n = 0, s = t.length; n < s; ++n) {
                var a = e[t[n]];
                if (o.isArray(a)) for (var r = 0, c = a.length; r < c; ++r) i += a[r]; else i += a;
            }
            return i;
        }, s.safeCheckRow = function(e, t, i) {};
        var a = function(e) {
            return -e / 31;
        };
        t.exports = function(e) {
            var t = {};
            for (var i in e) console.log("-----------", i), function(i) {
                var o;
                t.__defineGetter__(i, function() {
                    if (!o) switch (o = new s(n(e[i], i)), console.log("转变表:" + i), i) {
                      case "Common":
                        o = o.find(1);
                    }
                    return o;
                });
            }.bind(null, i)();
            return t;
        }, cc._RF.pop();
    }, {
        utils: "utils"
    } ],
    connection: [ function(e, t, i) {
        cc._RF.push(t, "e5d03VjMG5PFZ5Qy67RprY4", "connection");
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(e, n.key, n);
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t;
            };
        }(), o = e("pomelo-client"), s = {
            closed: 0,
            connect_gating: 1,
            connect_gated: 2,
            connecting: 3,
            connected: 4
        }, a = new (function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
                var t = this;
                t.reconnectTimes = null, t.errorRequests = [], t.pomelo = o("scene"), t.foreignLoginCb = function() {
                    t.foreignLogined || (PopLayer.create("", "异地登录，请注意账号安全！", function() {
                        channel.exit();
                    }), t.foreignLogined = !0);
                }, t.pomelo.on("onKick", t.foreignLoginCb), t.pomelo.on("request-error", function(e) {
                    e.forEach(function(e) {
                        switch (e.route) {
                          case "connector.entryHandler.auth":
                            return;
                        }
                        t.errorRequests.push(e);
                    });
                }), t.status = s.closed, t.waitingMsg = [], t.newRequestId = Math.max(Date.now() - 1486193798895, 1);
            }
            return n(e, [ {
                key: "errorDeal",
                value: function() {
                    if (this.status != s.closed && (this.status = s.closed, !this.foreignLogined)) {
                        var e = this;
                        setTimeout(function() {
                            (null == e.reconnectTimes || channel.isInBack()) && (e.reconnectTimes = Date.now()), 
                            Date.now() - e.reconnectTimes > 1e4 ? PopLayer.create("", "连接失败，请重试！", function() {
                                e.connect();
                            }) : e.connect();
                        }, 1e3);
                    }
                }
            }, {
                key: "setHost",
                value: function(e, t) {
                    this.host = e, this.port = t;
                }
            }, {
                key: "setAuthHost",
                value: function(e, t) {
                    this.authHost = e, this.authPort = t;
                }
            }, {
                key: "setUid",
                value: function(e) {
                    console.log("uid = " + e), this.uid = e, user.init();
                }
            }, {
                key: "setSuccessCb",
                value: function(e) {
                    this.successCb = e;
                }
            }, {
                key: "setWxCode",
                value: function(e) {
                    this.wxCode = e;
                }
            }, {
                key: "setSessionKey",
                value: function(e) {
                    this.sessionKey = e;
                }
            }, {
                key: "getConnector",
                value: function(e, t) {
                    var i = o("scene"), n = !1, s = this, a = function() {
                        n || (n = !0, t());
                    };
                    i.on("io-error", a), i.on("error", a), i.on("disconnect", a), i.init({
                        host: this.host,
                        port: this.port,
                        log: !0
                    }, function() {
                        i.request("gate.gateHandler.queryEntry", {
                            uid: s.uid
                        }, function(o) {
                            n ? i.disconnect() : (n = !0, i.disconnect(), 200 == o.code ? e(o) : t());
                        });
                    });
                }
            }, {
                key: "auth",
                value: function(e) {
                    var t = this;
                    t.getUid() ? e() : cc.sys.platform === cc.sys.WECHAT_GAME ? /*tt.*/wx.login({
                        force: !1,
                        timeout: 1e4,
                        success: function(i) {
                          console.log('login', i)
                            if (i.code || i.anonymousCode) {
                                // var n = o("scene"), s = !1, a = function() {
                                //     s || (s = !0, e("auth服连接错误！"));
                                // };
                                // n.on("io-error", a), n.on("error", a), n.on("disconnect", a), n.init({
                                //     host: t.authHost,
                                //     port: t.authPort,
                                //     log: !0
                                // }, function() {
                                //     n.request("auth.authHandler.auth", {
                                //         jsCode: i.code,
                                //         anonymous_code: i.anonymousCode
                                //     }, function(i) {  i = {
                                //       code: 200,
                                //       authInfo: {
                                //         openid: 123420
                                //       }
                                //     }
                                //         s ? n.disconnect() : (s = !0, n.disconnect(), 200 != i.code ? e("auth错误！") : (t.setSessionKey(i.shid), 
                                //         t.setUid(i.authInfo.openid), e()));
                                //     });
                                // });
                                i = {
                                    code: 200,
                                    authInfo: {
                                        openid: 123421
                                    }
                                };
                                t.setSessionKey(i.shid),
                                t.setUid(i.authInfo.openid), e()
                            } else e("微信登录失败！");
                        },
                        fail: function(e) {
                            console.log("login调用失败", e);
                        }
                    }) : (t.setSessionKey(""), t.setUid("1000"), e());
                }
            }, {
                key: "setFromUid",
                value: function(e) {
                    this.fromUi = e;
                }
            }, {
                key: "getUid",
                value: function() {
                    return this.uid;
                }
            }, {
                key: "getFromUid",
                value: function() {
                    return channel.getInviteData().uid;
                }
            }, {
                key: "setSecretKey",
                value: function(e) {
                    this.secretKey = e;
                }
            }, {
                key: "getSecretKey",
                value: function() {
                    return this.secretKey;
                }
            }, {
                key: "setInfoTimestamp",
                value: function(e) {
                    this.infoTimestamp = e;
                }
            }, {
                key: "connect",
                value: function() {
                    //连接0
                    var e = this;
                    if (e.status == s.closed) {
                        null == this.reconnectTimes && (this.reconnectTimes = Date.now()), WaitNetLayer.pop2(), 
                        WaitNetLayer.setLabel("连接中，请稍后..");
                        var t = !1;
                        // setTimeout(function() {
                        //     t || (t = !0, e.pomelo.disconnect(), e.errorDeal());
                        // }, 15e3),
                        e.pomelo.disconnect(), e.status = s.connect_gating, 
                        e.auth(function(i) {
                            // var ii = {};
                            // ii.sessionKey = e.sessionKey, ii.uid = e.uid, ii.timestamp = user.getInfoTimestamp(),
                            // ii.secretKey = e.getSecretKey(), ii.fromUid = e.getFromUid();
                            WaitNetLayer.hide2(), WaitNetLayer.setLabel(null), e.reconnectTimes = null, e.status = s.connected; 
                            e.successCb({code:200,user:{_id:123421,lastLoginTime:1585125825426,createTime:"2020-03-25 15:10:02",logoutTime:1585125825,gmLevel:0,loginNum:23,isFrom:false,activity:{dialTimes:0,dialAddTimes:0,adTimes:0,randomTimes:0,signDay:0,isSign:false,shareUids:[],shareSucc:0}},isUpdate:false,time:Date.now(),isShare:true,isShare2:true,isAd:false,isAd2:true,developVersion:"1.0.6"})
                            // // return
                            // if (!t) return i ? (t = !0, e.errorDeal(), void cc.log(i)) : void e.getConnector(function(i) {
                            //     if (!t) {
                            //         cc.log("取得连接服成功", i), e.status = s.connecting;
                            //         var n = function() {
                            //             t = !0, e.errorDeal();
                            //         };
                            //         e.pomelo.once("io-error", n), e.pomelo.once("error", n), e.pomelo.once("disconnect", n), 
                            //         e.pomelo.init({
                            //             host: i.host,
                            //             port: i.port,
                            //             log: !0
                            //         }, function() {
                            //             if (!t) {
                            //                 var i = {};
                            //                 i.sessionKey = e.sessionKey, i.uid = e.uid, i.timestamp = user.getInfoTimestamp(), 
                            //                 i.secretKey = e.getSecretKey(), i.fromUid = e.getFromUid(), e.pomelo.request("connector.entryHandler.auth", i, function(i) {
                            //                     if (!t) {
                            //                         if (t = !0, 200 != i.code) return 402 == i.code && e.foreignLoginCb(), void e.pomelo.disconnect();
                            //                         WaitNetLayer.hide2(), WaitNetLayer.setLabel(null), e.reconnectTimes = null, e.status = s.connected, 
                            //                         e.successCb(i), e.errorRequests.forEach(function(t) {
                            //                             e.pomelo.request(t.route, t.msg, t.cb);
                            //                         });
                            //                     }
                            //                 });
                            //             }
                            //         });
                            //     }
                            // }, function() {
                            //     t || (t = !0, cc.log("获取连接服信息失败！"), e.errorDeal());
                            // });
                        });
                    } else cc.log("连接不处于未连接状态");
                }
            }, {
                key: "request",
                value: function(e, t, i, n) {
                    //连接1
                    return
                    console.log("e, t, i, n = ",e, t, i, n)
                    var o = this;
                    o.msgNotHasBack ? o.waitingMsg.push({
                        route: e,
                        msg: t,
                        cb: i,
                        notHide: n
                    }) : (o.msgNotHasBack = !0, void 0 == t.requestId && (t.requestId = o.newRequestId++), 
                    n || WaitNetLayer.pop(), o.pomelo.request(e, t, function(s) {
                        n || WaitNetLayer.hide(), s.error && PopLayer.tip(s.error);
                        try {
                            i(s);
                        } catch (i) {
                            cc.log("请求处理报错:", e, t, i), o.sendStackMsg(i);
                        }
                        o.msgNotHasBack = !1;
                        var a = o.waitingMsg[0];
                        a && (o.waitingMsg.splice(0, 1), o.request(a.route, a.msg, a.cb, a.notHide));
                    }));
                }
            }, {
                key: "disconnect",
                value: function() {
                    this.pomelo.disconnect();
                }
            }, {
                key: "notify",
                value: function(e, t) {
                    this.pomelo.notify(e, t);
                }
            }, {
                key: "sendStackMsg",
                value: function(e) {
                    pomelo.request("scene.playerHandler.clientLogger", {
                        stack: e.message + "|" + e.stack
                    }, function() {}, !0);
                }
            }, {
                key: "onMessage",
                value: function(e, t) {
                    var i = this;
                    this.pomelo.on(e, function(n) {
                        try {
                            t(n);
                        } catch (t) {
                            cc.log("推送消息处理报错:", e, t), i.sendStackMsg(t);
                        }
                    });
                }
            }, {
                key: "offMessage",
                value: function(e, t) {
                    this.pomelo.off(e, t);
                }
            } ]), e;
        }())();
        window.pomelo = a, cc._RF.pop();
    }, {
        "pomelo-client": "pomelo-client"
    } ],
    dropMoneyEffect: [ function(e, t, i) {
        cc._RF.push(t, "2c243B7Tk5CwKF5II1LSY0P", "dropMoneyEffect");
        var n = e("random"), o = e("utils");
        cc.Class({
            extends: cc.Component,
            properties: {
                prefabs: [ cc.Prefab ],
                minNum: 10,
                maxNum: 15,
                range: cc.rect(0, 50, 160, 150),
                upTime: cc.v2(.3, .6),
                downTime: cc.v2(.5, .8),
                scaleRange: cc.v2(.4, .5),
                horizontalTime: cc.v2(.5, .8)
            },
            start: function() {
                this._pool = new cc.NodePool(), this._random = new n(o.getRandomSeed()), this._actionPool = [], 
                this._prefabNum = this.prefabs.length, this.node.zIndex = gConst.popZindex, sd.dropMoeny = this;
                for (var e = 0; e < 3 * this.maxNum; e++) this.removeNode(this.newNode());
            },
            playEffect: function(e) {
                var t = sd.pf.convertToNodeSpaceAR(e, this.node);
                this.play(t.x, t.y);
            },
            play: function(e, t) {
                for (var i = this._random.randomInt(this.minNum, this.maxNum), n = 0; n < i; n++) {
                    var o = this._pool.get();
                    o || (o = this.newNode()), o.setPosition(e, t), this.node.addChild(o, 1e3), o.startx = e, 
                    o.starty = t, this._actionPool.push(o), o.upDis = this._random.random(this.range.y, this.range.y + this.range.height), 
                    o.downDis = .5 * cc.winSize.height + t + o.upDis, o.upTime = this._random.random(this.upTime.x, this.upTime.y), 
                    o.downTime = this._random.random(this.downTime.x, this.downTime.y), o.actionState = 1;
                    var s = this._random.random(this.scaleRange.x, this.scaleRange.y);
                    o.isMoveLeft = this._random.randomInt(0, 9) < 9, o.moveDis = this._random.random(this.range.x, this.range.x + this.range.width), 
                    o.hMoveTime = this._random.random(this.horizontalTime.x, this.horizontalTime.y), 
                    2 == o.frameIdx ? (s *= .6, o.isRote = !0) : 3 == o.frameIdx ? (s = this._random.random(.4, 1), 
                    s *= .8, o.isRote = !1, o.isMoveLeft = this._random.randomInt(0, 9) < 5, o.moveDis = .2 * o.moveDis, 
                    o.hMoveTime = 5 * o.hMoveTime) : o.isRote = this._random.randomInt(0, 9) < 3, o.setScale(s), 
                    o.angle = this._random.random(-180, 180), o.yelapsed = 0, o.xelapsed = 0, o.moveDis = this._random.random(this.range.x, this.range.x + this.range.width);
                }
            },
            update: function(e) {
                for (var t = this._actionPool.length, i = 0; i < t; ) {
                    var n = this._actionPool[i];
                    if (n.yelapsed += e, n.isRote && (n.angle -= 600 * e, n.angle <= -180 && (n.angle = n.angle / 360 + 360)), 
                    1 == n.actionState ? n.yelapsed >= n.upTime ? (n.actionState = 2, n.yelapsed = 0, 
                    n.starty = n.starty + n.upDis) : n.y = n.starty + n.upDis * cc.easeSineOut(n.yelapsed / n.upTime) : n.yelapsed >= n.downTime ? (this._actionPool.splice(i, 1), 
                    this.removeNode(n), i -= 1, t -= 1) : n.y = n.starty - n.downDis * cc.easeSineIn(n.yelapsed / n.downTime), 
                    i += 1, n.xelapsed += e, n.xelapsed >= n.hMoveTime) n.isMoveLeft ? n.x = n.startx - n.moveDis : n.x = n.startx + n.moveDis; else {
                        var o = 0;
                        o = 3 == n.frameIdx ? n.moveDis * cc.easeSineOut(n.xelapsed / n.hMoveTime) : n.moveDis * n.xelapsed / n.hMoveTime, 
                        n.isMoveLeft ? n.x = n.startx - o : n.x = n.startx + o;
                    }
                }
            },
            newNode: function() {
                var e = this._random.randomInt(0, this._prefabNum - 1), t = cc.instantiate(this.prefabs[e]);
                return t.frameIdx = e, t;
            },
            removeNode: function(e) {
                this._pool.put(e);
            }
        }), cc._RF.pop();
    }, {
        random: "random",
        utils: "utils"
    } ],
    emitter: [ function(e, t, i) {
        function n(e) {
            if (e) return function(e) {
                for (var t in n.prototype) e[t] = n.prototype[t];
                return e;
            }(e);
        }
        cc._RF.push(t, "2cfe0HlvgdMwoYaDd6XGLz3", "emitter"), n.prototype.on = n.prototype.addEventListener = function(e, t) {
            return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), 
            this;
        }, n.prototype.once = function(e, t) {
            function i(o, s, a, r, c, l, u, h) {
                n.off(e, i), t.call(this, o, s, a, r, c, l, u, h);
            }
            var n = this;
            return this._callbacks = this._callbacks || {}, i.fn = t, this.on(e, i), this;
        }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(e, t) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
            this;
            var i, n = this._callbacks[e];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks[e], this;
            for (var o = 0; o < n.length; o++) if ((i = n[o]) === t || i.fn === t) {
                n.splice(o, 1);
                break;
            }
            return this;
        }, n.prototype.emit = function(e, t, i, n, o, s, a, r, c) {
            this._callbacks = this._callbacks || {};
            var l = this._callbacks[e];
            if (l) {
                var u = l.length;
                if (u > 5) {
                    l = l.slice(0);
                    for (var h = 0; h < u; ++h) l[h].call(this, t, i, n, o, s, a, r, c);
                } else if (1 == u) l[0].call(this, t, i, n, o, s, a, r, c); else {
                    var d = l[0], g = l[1], f = l[2], m = l[3], p = l[4];
                    d && (d.call(this, t, i, n, o, s, a, r, c), g && (g.call(this, t, i, n, o, s, a, r, c), 
                    f && (f.call(this, t, i, n, o, s, a, r, c), m && (m.call(this, t, i, n, o, s, a, r, c), 
                    p && p.call(this, t, i, n, o, s, a, r, c)))));
                }
            }
            return this;
        }, n.prototype.listeners = function(e) {
            return this._callbacks = this._callbacks || {}, this._callbacks[e] || [];
        }, n.prototype.hasListeners = function(e) {
            return !!this.listeners(e).length;
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    employ: [ function(e, t, i) {
        cc._RF.push(t, "4dc66ffghVGYJCXZBfCMwb7", "employ"), cc.Class({
            extends: uiBase,
            properties: {
                idx: null,
                guideBtn: cc.Node,
                returnBtn: cc.Node
            },
            onLoad: function() {
                this._super(), this.dis = [ "guyong4", "guyong6", "guyong8", "guyong10", "guyong22" ], 
                this.frames = [ "guyong5", "guyong7", "guyong9", "guyong11", "guyong21" ];
                var e = user.getGardeners();
                e && e.length || (user.randGardeners(), e = user.getGardeners()), user.getGardenerRefreshTime() - user.getServerTime() > 0 ? this.startCountDown() : this.setRefreshButtonVisible(!0), 
                this.initView(e), this.initCurView(), this.schedule(this.refreshMoney, 1), this.refreshMoney(), 
                this.initButton(), this.setTimesText(user.getGardenerRefreshTimes());
            },
            initView: function(e) {
                for (var t = this, i = null, n = null, o = null, s = null, a = null, r = 0, c = 0, l = 0, u = 0; u < 5; u++) if (e[u]) {
                    o = config.Item.find(e[u].expertise), n = (i = this["flower" + (u + 1)]).getChildByName("pinzhong");
                    var h = o.desc;
                    h || (h = o.desc || ""), n.getComponent(cc.Label).string = h, (n = i.getChildByName("yanfa")).getComponent(cc.Label).string = "+" + (100 * e[u].velocity).toFixed(2) + "%", 
                    (n = i.getChildByName("shuliandu")).getComponent(cc.Label).string = parseInt(100 * (e[u].double + 1)), 
                    n = i.getChildByName("icondi"), s = "texture/new_ui/" + this.dis[e[u].quality - 1], 
                    n.getComponent(cc.Sprite).spriteFrame = resManager.getResource(s), n = i.getChildByName("frame"), 
                    s = "texture/new_ui/" + this.frames[e[u].quality - 1], n.getComponent(cc.Sprite).spriteFrame = resManager.getResource(s), 
                    n = i.getChildByName("icon"), s = 5 === e[u].quality ? "texture/new_ui/guyong23" : "texture/new_ui/guyong3", 
                    n.getComponent(cc.Sprite).spriteFrame = resManager.getResource(s), n = i.getChildByName("tagimage"), 
                    e[u].use ? (n.active = !1, s = "texture/new_ui/zhaopin3", (n = i.getChildByName("zhaopin4")).getComponent(cc.Sprite).spriteFrame = resManager.getResource(s)) : (n.active = !0, 
                    s = "texture/new_ui/zhaopin4", (n = i.getChildByName("zhaopin4")).getComponent(cc.Sprite).spriteFrame = resManager.getResource(s), 
                    e[u].quality > r ? (a = n, l = u, r = e[u].quality) : e[u].quality == r && e[u].expertise > c && (a = n, 
                    l = u, c = e[u].expertise));
                }
                a && (user.isGuide(gConst.guides.hireBtn) || user.isGuide(gConst.guides.newHireBtn)) && (sd.DlgMgr.showGuide(gConst.guides.hireBtn, a), 
                sd.DlgMgr.showGuide(gConst.guides.newHireBtn, a), 3 != l && 4 != l || sd.pf.performWithDelay(this.node, function() {
                    var e = t.scrollview.getComponent(cc.ScrollView);
                    e.content.height > t.scrollview.height && e.scrollToBottom();
                }, 0, this));
            },
            initCurView: function() {
                var e = user.getWorker(this.idx || 0, 2);
                if (e && e.quality) {
                    this.curbg.active = !0;
                    var t = config.Item.find(e.expertise), i = this.curbg.getChildByName("pinzhong"), n = t.desc;
                    n || (n = t.desc || ""), i.getComponent(cc.Label).string = n, (i = this.curbg.getChildByName("yanfa")).getComponent(cc.Label).string = "+" + (100 * e.velocity).toFixed(2) + "%", 
                    (i = this.curbg.getChildByName("shuliandu")).getComponent(cc.Label).string = parseInt(100 * (e.double + 1));
                    var o = user.getTianfuAdd(6);
                    o ? (this.add.getComponent(cc.Label).string = "+" + parseInt(100 * o), this.add.active = !0, 
                    this.addbg.active = !0) : (this.add.active = !1, this.addbg.active = !1), i = this.curbg.getChildByName("icondi");
                    var s = "texture/new_ui/" + this.dis[e.quality - 1];
                    i.getComponent(cc.Sprite).spriteFrame = resManager.getResource(s), i = this.curbg.getChildByName("frame"), 
                    s = "texture/new_ui/" + this.frames[e.quality - 1], i.getComponent(cc.Sprite).spriteFrame = resManager.getResource(s), 
                    i = this.curbg.getChildByName("icon"), s = 5 === e.quality ? "texture/new_ui/guyong23" : "texture/new_ui/guyong3", 
                    i.getComponent(cc.Sprite).spriteFrame = resManager.getResource(s);
                } else this.curbg.active = !1;
            },
            initButton: function() {
                if (user.needInvite()) if (1 == channel.getShareAndAd("employ", window.VideoAdids[0]).getType()) (e = this.refresh.getChildByName("tags")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/guyong2"); else {
                    var e = this.refresh.getChildByName("tags");
                    channel.isTouTiao() ? e.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/public/zhujiemian10") : e.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/guyong1");
                } else this.refresh.active = !1;
            },
            setRefreshButtonVisible: function(e) {
                this.refresh1.active = e, this.time.active = !e;
            },
            setTimesText: function(e) {
                var t = "<color=#e2e2e2>累计刷新<color=#ffd052>10</color>次，必然会出现一名<color=#ffd052>顶级</color>员工：<size=28>" + e + "/10</size></color>";
                this.tiptext.getComponent(cc.RichText).string = t, this.timesprocess.getComponent(cc.ProgressBar).progress = e / 10;
            },
            startCountDown: function() {
                this.schedule(this.countDown, .2), this.countDown();
            },
            stopCountDown: function() {
                this.time.getComponent(cc.Label).string = "", this.unschedule(this.countDown);
            },
            countDown: function() {
                var e = user.getGardenerRefreshTime() - user.getServerTime();
                e > 0 ? (this.time.getComponent(cc.Label).string = "下一轮刷新：" + utils.formatTime3(e / 1e3), 
                this.refresh1.active && this.setRefreshButtonVisible(!1)) : (this.setRefreshButtonVisible(!0), 
                this.stopCountDown());
            },
            refreshGardener: function(e) {
                user.randGardeners(e);
                var t = user.getGardeners();
                this.startCountDown(), this.initView(t), this.setTimesText(user.getGardenerRefreshTimes());
            },
            notify: function(e) {
                sd.mainDlg.onHireWorker(this.idx, 2, e);
            },
            employ1: function() {
                var e = user.employGardener(0);
                user.hireWorker(this.idx || 0, 2, e), this.notify(e.quality);
                var t = this.flower1, i = t.getChildByName("tagimage");
                i.active = !1, (i = t.getChildByName("zhaopin4")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/zhaopin3"), 
                this.initCurView(), this.finishHireGuide();
            },
            employ2: function() {
                var e = user.employGardener(1);
                user.hireWorker(this.idx || 0, 2, e), this.notify(e.quality);
                var t = this.flower2, i = t.getChildByName("tagimage");
                i.active = !1, (i = t.getChildByName("zhaopin4")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/zhaopin3"), 
                this.initCurView(), this.finishHireGuide();
            },
            employ3: function() {
                var e = user.employGardener(2);
                user.hireWorker(this.idx || 0, 2, e), this.notify(e.quality);
                var t = this.flower3, i = t.getChildByName("tagimage");
                i.active = !1, (i = t.getChildByName("zhaopin4")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/zhaopin3"), 
                this.initCurView(), this.finishHireGuide();
            },
            employ4: function() {
                var e = user.employGardener(3);
                user.hireWorker(this.idx || 0, 2, e), this.notify(e.quality);
                var t = this.flower4, i = t.getChildByName("tagimage");
                i.active = !1, (i = t.getChildByName("zhaopin4")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/zhaopin3"), 
                this.initCurView(), this.finishHireGuide();
            },
            employ5: function() {
                var e = user.employGardener(4);
                user.hireWorker(this.idx || 0, 2, e), this.notify(e.quality);
                var t = this.flower5, i = t.getChildByName("tagimage");
                i.active = !1, (i = t.getChildByName("zhaopin4")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/zhaopin3"), 
                this.initCurView(), this.finishHireGuide();
            },
            refreshMoney: function() {
                var e = this.note.getChildByName("value"), t = e.getComponent(cc.Label);
                t.string = user.getMoneyText(), (t = (e = this.gold.getChildByName("value")).getComponent(cc.Label)).string = user.getCoinText();
            },
            buttonRefresh: function() {
                var e = this, t = channel.getShareAndAd("employ", window.VideoAdids[0]);
                t(function() {
                    e.refreshGardener(), PopLayer.tip("操作成功,已刷新！"), e.initButton();
                }, function() {
                    0 === t.getType() ? PopLayer.tip("分享失败，请分享到不同的群！") : PopLayer.tip("看完广告才能刷新员工！"), 
                    e.initButton();
                });
            },
            on_click_refresh: function() {
                this.refreshGardener(!0);
            },
            adRerefsh: function() {},
            wechatRefresh: function() {},
            finishHireGuide: function() {
                sd.DlgMgr.closeGuide(gConst.guides.hireBtn), sd.DlgMgr.showGuide(gConst.guides.hireReturn, this.returnBtn), 
                sd.DlgMgr.closeGuide(gConst.guides.newHireBtn), sd.DlgMgr.showGuide(gConst.guides.newHireReturn, this.returnBtn);
            },
            closeEmploy: function() {
                this.closeUI(), sd.DlgMgr.closeGuide(gConst.guides.hireReturn), sd.DlgMgr.closeGuide(gConst.guides.newHireReturn);
            }
        }), cc._RF.pop();
    }, {} ],
    flowerMakeUI: [ function(e, t, i) {
        cc._RF.push(t, "fd7e6EjHaJAtbJBuB70YoXx", "flowerMakeUI"), cc.Class({
            extends: cc.Component,
            properties: {
                sprites: [ cc.Sprite ],
                machineNode: cc.Node,
                beltNode: cc.Node,
                roleNode: cc.Node,
                rolePrefabs: [ cc.Prefab ],
                _timeScale: 1
            },
            start: function() {
                this.actionAni = this.node.getComponent(cc.Animation), this._isStop = !0, this._machineDisplay = this.machineNode.getComponent(dragonBones.ArmatureDisplay), 
                this._beltNodeDisplay = this.beltNode.getComponent(dragonBones.ArmatureDisplay), 
                this._machineArmature = this._machineDisplay.armature(), this._beltArmature = this._beltNodeDisplay.armature(), 
                this._machineDisplay.animationName = "", this._machineArmature.animation.reset(), 
                this._beltNodeDisplay.animationName = "", this._beltArmature.animation.reset(), 
                this._animStates = [], this._speed = .4, this._machineDisplay.timeScale = this._timeScale, 
                this._beltNodeDisplay.timeScale = this._timeScale;
            },
            startMakeFlower: function() {
                this._isStop = !1;
            },
            stopMakeFlower: function() {
                this._isStop = !0;
            },
            setTimeScale: function(e) {
                if (this._timeScale != e) {
                    if (this._timeScale = e, this._machineDisplay) {
                        this._machineDisplay.timeScale = this._timeScale, this._beltNodeDisplay.timeScale = this._timeScale;
                        for (var t = 0, i = this._animStates.length; t < i; t++) this._animStates[t].speed = this._speed * this._timeScale;
                    }
                    this._roleDisplay && (this._roleDisplay.timeScale = this._timeScale);
                }
            },
            setRole: function(e) {
                var t = this, i = this.rolePrefabs[e];
                if (i && this._roleIdx != e) {
                    this._roleIdx = e;
                    var n = cc.instantiate(i);
                    this.roleNode.addChild(n);
                    var o = n.getComponent(dragonBones.ArmatureDisplay);
                    this._roleDisplay ? ("" == this._roleDisplay.animationName ? o.playAnimation("idle") : o.playAnimation(this._roleDisplay.animationName), 
                    this._roleDisplay.node.destroy()) : o.playAnimation("idle"), this.performWithDelay(function() {
                        o.armature() && o.armature().animation && (o.timeScale = t._timeScale);
                    }, .1), this._roleDisplay = o;
                }
            },
            update: function(e) {
                var t = this;
                if (this._delayEvent && (this._delayTime -= e, this._delayTime <= 0 && (sd.pf.doCallBack(this._delayEvent, this), 
                this._delayTime = 0, this._delayEvent = null)), this._roleDisplay) {
                    if (this._isStop) return "idle" == this._machineDisplay.animationName && (this._machineDisplay.animationName = "", 
                    this._machineArmature.animation.gotoAndStopByTime("idle", 0)), void (this.isAnimStateStop(0) && ("attack" == this._roleDisplay.animationName && this._roleDisplay.playAnimation("idle"), 
                    "idle" == this._beltNodeDisplay.animationName && (this._beltNodeDisplay.animationName = "", 
                    this.performWithDelay(function() {
                        t._beltArmature.animation.stop("idle");
                    }, .42 / (this._speed * this._timeScale)))));
                    "" == this._machineDisplay.animationName && this._machineDisplay.playAnimation("idle"), 
                    this.isAnimStateStop(0) && this.onActionComplete(1);
                }
            },
            updateSpriteTexture: function(e, t, i) {
                this.sprites[0].spriteFrame = "jianjiaoji" == t ? resManager.getResource("texture/flowericon/" + t) : resManager.getResource("texture/flowericon/" + i), 
                this.sprites[1].spriteFrame = resManager.getResource("texture/flowericon/" + e);
            },
            onActionComplete: function(e) {
                if (e < 3) {
                    this.sprites[e - 1].node.active = !0;
                    var t = this.actionAni.playAdditive("action" + (e + 1));
                    t.speed = this._speed * this._timeScale, this._animStates[e - 1] = t, 1 == e ? "" == this._beltNodeDisplay.animationName && this._beltNodeDisplay.playAnimation("idle") : 2 != e || this._isStop || "idle" != this._roleDisplay.animationName && "" != this._roleDisplay.animationName || this._roleDisplay.playAnimation("attack");
                }
            },
            performWithDelay: function(e, t) {
                this._delayEvent = e, this._delayTime = t;
            },
            isAnimStateStop: function(e) {
                var t = this._animStates[e];
                return !t || !t.isPlaying;
            }
        }), cc._RF.pop();
    }, {} ],
    flowergrow: [ function(e, t, i) {
        cc._RF.push(t, "2cf87G722REvq30wRYgsbPn", "flowergrow"), cc.Class({
            extends: uiBase,
            properties: {
                content: cc.Node,
                scrollview: cc.ScrollView,
                template: cc.Node,
                space: 0
            },
            onLoad: function() {
                this._super(), this.items = [], this.curItem = null, this.needMoney = 0;
            },
            start: function() {
                this.initItem(), this.schedule(this.checkMoney, 1);
            },
            initItem: function() {
                var e = user.getFlowerMap(), t = null, i = 0, n = null, o = user.getMoveFlowerId(), s = Math.min(e.length + 1, o.length);
                this.content.height = s * (this.template.height + this.space);
                for (var a, r = 0; r < s; r++) (t = this.items[r]) ? (i = e[r] ? e[r].flowerLevel : 1, 
                n = user.getItemConfig(t.flowerId), a = config.FlowerLevel.find(t.flowerId, i), 
                this.updateItem(t, e[r], n, a)) : ((t = cc.instantiate(this.template)).active = !0, 
                t.x = 0, t.y = -t.height / 2 - (t.height + this.space) * r, this.content.addChild(t), 
                t.flowerId = r + 1, i = e[r] ? e[r].flowerLevel : 1, n = user.getItemConfig(t.flowerId), 
                a = config.FlowerLevel.find(t.flowerId, i), this.updateItem(t, e[r], n, a), r == e.length && (this.needMoney = n.activationPrice, 
                this.curItem = t, this.addEvent(t)), this.items.push(t));
            },
            updateItem: function(e, t, i, n) {
                var o = e.getChildByName("icon");
                o.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/flowericon/" + i.iconBouquet), 
                e.getChildByName("di").getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/" + n.quality[0]), 
                e.getChildByName("frame").getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/" + n.quality[1]), 
                e.getChildByName("flowername").getComponent(cc.Label).string = i.desc, t ? ((o = e.getChildByName("button")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/huatai4"), 
                o.getComponent(cc.Button).interactable = !1, o.getChildByName("money").active = !1, 
                o.getChildByName("moneybg").active = !1, o.getChildByName("sprite").active = !1, 
                o.getChildByName("text").active = !1, o.getChildByName("text1").active = !0) : ((o = e.getChildByName("button")).getChildByName("money").getComponent(cc.Label).string = bigNumber.closeNumToRealSpecial(i.activationPrice), 
                o.getChildByName("text1").active = !1);
            },
            addEvent: function(e) {
                var t = this;
                e.getChildByName("button").on("click", function() {
                    t.on_click(e);
                }, this);
            },
            checkMoney: function() {
                this.needMoney && this.curItem && user.moneyEnough(this.needMoney) && (this.curItem.getChildByName("button").getChildByName("money").color = cc.color(255, 255, 255), 
                this.unschedule(this.checkMoney));
            },
            on_click: function() {
                if (!user.moneyEnough(this.needMoney)) return PopLayer.tip(gConst.moneyName + "不足！");
                user.unlockFlower(), this.initItem(), this.scheduleOnce(function() {
                    this.scrollview.scrollToBottom(.1);
                }, 0);
            },
            on_close: function() {
                this.node.myDestroy ? this.node.myDestroy() : this.closeUI();
            }
        }), cc._RF.pop();
    }, {} ],
    flowerlevelup: [ function(e, t, i) {
        cc._RF.push(t, "f4bd08aGJdH4bjMY1ZiKNsh", "flowerlevelup"), cc.Class({
            extends: uiBase,
            properties: {},
            show: function(e, t, i) {
                var n = this, o = this.frame.getChildByName("icon"), s = user.getItemConfig(e + 1);
                console.log("花的id-》》》》》", e), o.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/flower/" + user.getFlowerRes(e + 1));
                var a = s.chosePrice[t];
                (o = this.frame.getChildByName("level1")).getComponent(cc.Label).string = "" + a, 
                a = s.chosePrice[i], (o = this.frame.getChildByName("level2")).getComponent(cc.Label).string = "" + a, 
                this.title.getComponent(cc.Label).string = s.desc, (o = this.frame.getChildByName("quanquan")).runAction(cc.repeatForever(cc.rotateBy(1, 90))), 
                this.scheduleOnce(function() {
                    var e = n.piaodai.getComponent(cc.ParticleSystem);
                    e.resetSystem();
                    for (var t = 0; t < 60; t++) e.update(.016);
                }, .3), cc.loader.loadRes("audio/btn_upgrade", cc.AudioClip, function(e, t) {
                    cc.audioEngine.playEffect(t, !1);
                }), this.node.setScale(.3), this.node.runAction(cc.scaleTo(.3, 1).easing(cc.easeBackOut()));
            },
            onDestroy: function() {
                this._super(), gConst.mainEmitter.emit("closeLevelUp", this.id);
            }
        }), cc._RF.pop();
    }, {} ],
    flowermapitem: [ function(e, t, i) {
        cc._RF.push(t, "920c8a5MahAhbCTSvmQvaB+", "flowermapitem"), cc.Class({
            extends: cc.Component,
            properties: {
                flowername: {
                    default: null,
                    type: cc.Label
                },
                desc: {
                    default: null,
                    type: cc.Label
                },
                addlabel: {
                    default: null,
                    type: cc.Label
                },
                addlabel1: {
                    default: null,
                    type: cc.Label
                },
                loadtext: {
                    default: null,
                    type: cc.Label
                },
                level: {
                    default: null,
                    type: cc.Label
                },
                load: {
                    default: null,
                    type: cc.ProgressBar
                },
                di: {
                    default: null,
                    type: cc.Sprite
                },
                icon: {
                    default: null,
                    type: cc.Sprite
                },
                frame: {
                    default: null,
                    type: cc.Sprite
                },
                jiantou: {
                    default: null,
                    type: cc.Sprite
                },
                itemID: 0
            },
            onLoad: function() {
                this.node.on("touchend", function() {
                    console.log("Item " + this.itemID + " clicked");
                }, this);
            },
            updateItem: function(e, t) {
                this.idx = t;
                var i = user.getItemConfig(t + 1), n = user.getFlowerLevel(t), o = user.getFlowerLevelConfig(n), s = i.desc;
                s || (s = i.desc || ""), this.flowername.string = s, this.desc.string = i.describe, 
                this.level.string = n, this.addlabel1.string = i.chosePrice[n - 1] + "", n >= user.getMaxFlowerLevel() ? (this.loadtext.string = "已满级", 
                this.load.progress = 1, this.jiantou.active = !1, this.addlabel.active = !1) : (this.loadtext.string = user.getFlowerCard(t) + "/" + user.getFlowerCost(n + 1), 
                this.load.progress = user.getFlowerCard(t) / user.getFlowerCost(n + 1), this.addlabel.string = i.chosePrice[n] + ""), 
                this.icon.spriteFrame = resManager.getResource("texture/flowericon/" + user.getFlowerIconRes(t + 1)), 
                this.di.spriteFrame = resManager.getResource("texture/new_ui/" + o.quality[0]), 
                this.frame.spriteFrame = resManager.getResource("texture/new_ui/" + o.quality[1]), 
                this.scheduleOnce(function() {
                    var e = this.addlabel1.node;
                    if (e) {
                        var t = e.x + e.width;
                        t += 24, this.jiantou.node.x = t, t += 40, (e = this.node.getChildByName("micon2")) && (e.x = t), 
                        t += 25, this.addlabel.node.x = t;
                    }
                }, 0);
            }
        }), cc._RF.pop();
    }, {} ],
    flowermap: [ function(e, t, i) {
        cc._RF.push(t, "d5e5dqEBABKTIoPrH7ByH6f", "flowermap"), cc.Class({
            extends: uiBase,
            properties: {
                scrollView: cc.ScrollView,
                content: cc.Node,
                itemTemplate: cc.Prefab,
                spacing: 0,
                itemHeight: 0
            },
            onLoad: function() {
                var e = this;
                this._super(), this.items = [], this.onEvent("openBox", function(t) {
                    e.updateFlowerList(), 101 != t || user.getBox(101).num ? 102 != t || user.getBox(102).num || user.setFriendBoxTime(user.getServerTime() + 1e3 * config.Common.friendCdTime) : user.setAdBoxTime(user.getServerTime() + 1e3 * config.Common.advertCdTime), 
                    e.initBox();
                }), this.onEvent("closeLevelUp", function() {
                    e.checkFolwerLevelup(), e.updateFlowerList();
                }), this.onEvent("closeOpenBox", function() {
                    e.checkFolwerLevelup();
                }), user.needInvite() || this.hideButton(), this.checkFolwerLevelup(), this.updateFlowerList(), 
                this.initBox(), this.schedule(this.refreshMoney, 1), this.refreshMoney(), this.schedule(this.updateTime, 1);
            },
            hideButton: function() {
                this.adlbox.active = !1, this.friendbox.active = !1;
            },
            updateFlowerList: function() {
                var e = user.getFlowerMap().length;
                this.content.height = e * (this.itemHeight + this.spacing) + this.spacing;
                for (var t = 0; t < e; ++t) {
                    var i = this.items[t];
                    i || (i = cc.instantiate(this.itemTemplate), this.content.addChild(i), i.setPosition(this.content.width / 2, -i.height * (.5 + t) - this.spacing * (t + 1)), 
                    this.items.push(i)), i.getComponent("flowermapitem").updateItem(t, t);
                }
            },
            initBox: function() {
                var e = user.getBox(100);
                this.normalbox.getChildByName("red").getChildByName("label").getComponent(cc.Label).string = e.num, 
                this.refreshNormelButton(!!e.num), e = user.getBox(101), this.adlbox.getChildByName("red").getChildByName("label").getComponent(cc.Label).string = e.num, 
                this.refreshAdButton(!!e.num), e = user.getBox(102), this.friendbox.getChildByName("red").getChildByName("label").getComponent(cc.Label).string = e.num, 
                this.refreshFriendButton(!!e.num), this.updateTime();
            },
            refreshMoney: function() {
                var e = this.note.getChildByName("value"), t = e.getComponent(cc.Label);
                t.string = user.getMoneyText(), (t = (e = this.gold.getChildByName("value")).getComponent(cc.Label)).string = user.getCoinText();
            },
            openNormalBox: function() {
                var e = user.getBox(100);
                e.num ? popBannerDlg("prefabs/openbox", 0, !1, !1, 0).getComponent("openbox").id = e.id : PopLayer.tip("宝箱数量不足！");
            },
            openAdBox: function() {
                var e = user.getBox(101);
                if (!e.num) return PopLayer.tip("功能未开放！");
                popBannerDlg("prefabs/openbox", 0).getComponent("openbox").id = e.id;
            },
            openFriendBox: function() {
                var e = this, t = user.getBox(102);
                t.num ? popBannerDlg("prefabs/openbox", 0).getComponent("openbox").id = t.id : cc.sys.platform === cc.sys.WECHAT_GAME ? channel.share(function() {
                    user.addBox(102, 1), e.initBox();
                }, function() {
                    PopLayer.tip("操作失败，未获得宝箱！");
                }) : (user.addBox(102, 1), this.initBox());
            },
            checkFolwer: function(e, t, i) {
                popBannerDlg("prefabs/floweruplevel", 0, !1, !1).getComponent("flowerlevelup").show(e, t, i);
            },
            checkFolwerLevelup: function() {
                for (var e = user.getFlowerMap(), t = 0, i = 0, n = 0; t < e.length; t++) if (n = e[t].flowerLevel, 
                i = user.flowerLevelUp(t)) {
                    this.checkFolwer(t, n, n + i);
                    break;
                }
            },
            updateTime: function() {
                if (!this.adlbox.getComponent(cc.Button).interactable) {
                    var e = user.getServerTime() - user.getAdBoxTime(), t = this.adlbox.getChildByName("time").getComponent(cc.Label);
                    e > 0 ? this.refreshAdButton(!0) : t.string = utils.formatTime(-e / 1e3);
                }
                this.friendbox.getComponent(cc.Button).interactable || (e = user.getServerTime() - user.getFriendBoxTime(), 
                t = this.friendbox.getChildByName("time").getComponent(cc.Label), e > 0 ? this.refreshFriendButton(!0) : t.string = utils.formatTime(-e / 1e3));
            },
            refreshNormelButton: function(e) {
                this.normalbox.getComponent(cc.Button).interactable = e;
                var t = this.normalbox.getChildByName("text");
                t.getComponent(cc.Button).enabled = !e, t.getComponent(cc.Button).interactable = e;
            },
            refreshAdButton: function(e) {
                this.adlbox.getComponent(cc.Button).interactable = e;
                var t = this.adlbox.getChildByName("text");
                t.active = e, (t = this.adlbox.getChildByName("time")).active = !e;
            },
            refreshFriendButton: function(e) {
                this.friendbox.getComponent(cc.Button).interactable = e;
                var t = this.friendbox.getChildByName("text");
                t.active = e, (t = this.friendbox.getChildByName("time")).active = !e;
            }
        }), cc._RF.pop();
    }, {} ],
    gConst: [ function(e, t, i) {
        cc._RF.push(t, "bf945hXzMBAcLGmH5v+nPB0", "gConst");
        var n = e("emitter"), o = e("random");
        window.gConst = {
            popZindex: 1e4,
            waitNetZindex: 9999,
            popBannerZindex: 9998,
            guideZindex: 9997,
            mainEmitter: new n(),
            random: new o(1e9 * Math.random()),
            getZindexFromY: function(e) {
                return Math.floor(1e4 - e);
            },
            guides: {
                newFlowerStand: 1,
                selectItem: 2,
                selectBtn: 3,
                selectReturn: 4,
                hireRole: 5,
                hireBtn: 6,
                hireReturn: 7,
                standLevel: 8,
                standBtn: 9,
                cangkuOpen: 10,
                cangkuLevel: 11,
                storeOpen: 12,
                storeLevel: 13,
                newStand: 14,
                newSelectItem: 15,
                newSelectBtn: 16,
                newSelectReturn: 17,
                newHireRole: 18,
                newHireBtn: 19,
                newHireReturn: 20,
                toyLevel: 21,
                toyBtn: 22,
                toyReturn: 23
            },
            maps: {
                1: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: ""
                },
                2: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: "banqian4"
                },
                3: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: "banqian3"
                },
                4: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: "banqian911"
                },
                5: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: "banqian9"
                },
                6: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: "banqian910"
                },
                7: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: "banqian913"
                },
                8: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: "banqian914"
                },
                9: {
                    roadSign: [ "#878989", "#4f4f4f" ],
                    icon: "banqian912"
                }
            },
            moneyName: "金币券",
            moneyName2: "钻石",
            money2Name: "研究点",
            boxName: "宝箱",
            doubleName: "双倍收益",
            moneyUnit: "张",
            moneyUnit2: "个",
            money2Unit: "个",
            boxUnit: "个",
            doubleUnit: "分钟",
            version: "1.0.5"
        }, t.exports = window.gConst, cc._RF.pop();
    }, {
        emitter: "emitter",
        random: "random"
    } ],
    guideTipUI: [ function(e, t, i) {
        cc._RF.push(t, "b21a0D1YfZISY0hb4ObLPOQ", "guideTipUI"), cc.Class({
            extends: cc.Component,
            properties: {
                contentText: cc.Label
            },
            start: function() {},
            fadeIn: function(e) {
                var t = this, i = config.NoviceGuide.findById(e);
                if (i && i.npc && (!i.npc || "" != i.npc)) {
                    if (!this.node.getActionByTag(1)) {
                        this.node.active = !0, this.node.stopAllActions(), this.node.opacity = 0;
                        var n = cc.fadeIn(.5);
                        n.setTag(1), this.node.runAction(n);
                    }
                    this.contentText.string = i.context, sd.pf.performWithDelay(this.node, function() {
                        t.fadeOut();
                    }, 5, this);
                }
            },
            fadeOut: function() {
                var e = this;
                this.node.active && (this.node.stopAllActions(), this.node.runAction(cc.sequence(cc.fadeOut(.5), cc.callFunc(function() {
                    e.node.active = !1;
                }, this))));
            }
        }), cc._RF.pop();
    }, {} ],
    guideUI: [ function(e, t, i) {
        cc._RF.push(t, "d1a3ddJ3SxJHpLOaYH6kbqm", "guideUI"), cc.Class({
            extends: cc.Component,
            properties: {},
            start: function() {
                this._display = this.getComponent(dragonBones.ArmatureDisplay), this._display.playAnimation("idle");
            },
            show: function(e, t) {
                this.node.x = t.width * (.5 - t.anchorX), this.node.y = t.height * (.5 - t.anchorY), 
                this.node.parent && this.node.removeFromParent(!1), this.node.setScale(1 / t.scaleX), 
                t.addChild(this.node, gConst.guideZindex), e == gConst.guides.toyLevel && (this.node.angle = 135);
            }
        }), cc._RF.pop();
    }, {} ],
    http: [ function(e, t, i) {
        cc._RF.push(t, "78856NzgSdN+o7L7ZR78Nst", "http");
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(e, n.key, n);
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t;
            };
        }(), o = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
            }
            return n(e, null, [ {
                key: "post",
                value: function(e, t, i, n) {
                    var o = 3;
                    return n = void 0 == n ? 1e4 : n, function s() {
                        console.log("第" + (3 - o + 1) + "次尝试，HTTPPOST");
                        var a = cc.loader.getXMLHttpRequest();
                        a.open("POST", e), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
                        a.onerror = function() {
                            console.log("--onerror--", o), o > 0 ? (o--, setTimeout(function() {
                                s();
                            }, 500)) : i(!1);
                        }, a.onreadystatechange = function() {
                            console.log("--onreadystatechange--", a.readyState, a.status), 4 == a.readyState && a.status >= 200 && a.status < 207 ? (console.log("xhr.status", a.status), 
                            i(!0, a.response)) : 0 != a.readyState && 4 != a.readyState || (o > 0 ? (o--, setTimeout(function() {
                                s();
                            }, 500)) : i(!1));
                        }, a.ontimeout = function() {
                            console.log("--ontimeout--", o), o > 0 ? (o--, setTimeout(function() {
                                s();
                            }, 500)) : i(!1);
                        }, n && (a.timeout = n);
                        var r = "";
                        for (var c in t) r += c + "=" + t[c] + "&";
                        a.send(r);
                    }();
                }
            }, {
                key: "get",
                value: function(e, t, i, n) {
                    var o = 3;
                    return function s() {
                        var a = cc.loader.getXMLHttpRequest();
                        a.open("GET", e), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
                        n && a.setRequestHeader("referer", n), a.onerror = function() {
                            console.log("httpget-onerror"), o > 0 ? (o--, setTimeout(function() {
                                s();
                            }, 500)) : t(!1);
                        }, a.onreadystatechange = function() {
                            4 == a.readyState && a.status >= 200 && a.status < 207 ? (console.log("xhr.status", a.status), 
                            t(!0, a.response)) : 0 != a.readyState && 4 != a.readyState || (console.log("httpget-fail"), 
                            o > 0 ? (o--, setTimeout(function() {
                                s();
                            }, 500)) : t(!1));
                        }, a.ontimeout = function() {
                            console.log("httpget-ontimeout"), o > 0 ? (o--, setTimeout(function() {
                                s();
                            }, 500)) : t(!1);
                        }, i && (a.timeout = i), a.send();
                    }();
                }
            } ]), e;
        }();
        t.exports = o, cc._RF.pop();
    }, {} ],
    index: [ function(e, t, i) {
        (function(i) {
            cc._RF.push(t, "1e782GbktVLTLvIyG+une5B", "index");
            var n = "undefined" == typeof window ? i : window;
            n.sd = n.sd || {}, e("./public/Func"), t.exports = n.sd, cc._RF.pop();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./public/Func": "Func"
    } ],
    inviteDlg: [ function(e, t, i) {
        cc._RF.push(t, "826e35RCOdN9JhMqPmKyw4z", "inviteDlg"), cc.Class({
            extends: cc.Component,
            properties: {
                list0: cc.Node,
                listContent: cc.Node,
                button: cc.Node,
                friendContent: cc.Node
            },
            refreshUi: function() {
                for (var t = this, i = (user.getInviteFriendNum(), config.Common.inviteFriendsNumber), n = config.Common.inviteFriendsReward, o = 0, s = i.length; o < s; ++o) {
                    var a, r;
                    !function(e, o) {
                        var s = i[e], c = n[e];
                        (r = t[a = "list" + e]) || (r = cc.instantiate(t.list0), t.listContent.addChild(r), 
                        r.y = t.list0.y - 115 * e, t[a] = r), r.getChildByName("desc").getComponent(cc.Label).string = "邀请" + s + "位好友", 
                        r.getChildByName("add").getComponent(cc.Label).string = gConst.moneyName2 + "+" + c;
                        var l = r.getChildByName("lingqu");
                        user.hasInviteFriendReward(e) ? (l.getChildByName("bg2").active = !0, l.getChildByName("bg4").active = !0, 
                        l.getChildByName("bg1").active = !1, l.getChildByName("bg3").active = !1) : (l.getChildByName("bg2").active = !1, 
                        l.getChildByName("bg4").active = !1, l.getChildByName("bg1").active = !0, l.getChildByName("bg3").active = !0, 
                        user.getInviteFriendNum() < s && (l.getChildByName("bg2").active = !0, l.getChildByName("bg1").active = !1, 
                        l.getChildByName("bg3").active = !0, l.getChildByName("bg3").getComponent(cc.Sprite).setState(1))), 
                        pressButtonDeal(l, function() {
                            user.hasInviteFriendReward(e) ? PopLayer.tip("已领取！") : user.getInviteFriendNum() < s ? PopLayer.tip("邀请" + s + "位好友方可领取奖励！") : (user.addInviteFriendReward(e), 
                            user.addCoin(c), l.getChildByName("bg2").active = !0, l.getChildByName("bg4").active = !0, 
                            l.getChildByName("bg1").active = !1, l.getChildByName("bg3").active = !1, popBannerDlg("prefabs/public/tanchu", 0, 1, window.bannerids[0]).getComponent("tanchu").show(resManager.getResource("prefabs/wheel/wheelgold1"), c + gConst.moneyUnit2 + gConst.moneyName2, "获得" + gConst.moneyName2));
                        });
                    }(o);
                }
                if (this.listContent.setContentSize(650, 120 * i.length), !channel.isTouTiao()) {
                    var c = new e("wxRank"), l = this.friendContent;
                    this.r = new c(l, user.getInviteFriendList());
                }
            },
            inviteFriend: function() {
                channel.share(function() {
                    PopLayer.tip("分享成功，好友成功登陆游戏后即可获得加成！");
                }, function() {
                    PopLayer.tip("分享成功，好友成功登陆游戏后即可获得加成！");
                });
            },
            start: function() {
                var e = this;
                this.refreshUi(), pressButtonDeal(this.button, function(t) {
                    e.inviteFriend();
                }), pressButtonDeal(this.friendContent, function(t) {
                    e.inviteFriend();
                });
            },
            update: function(e) {
                this.r && this.r.update(e);
            }
        }), cc._RF.pop();
    }, {} ],
    itemDropEffect: [ function(e, t, i) {
        cc._RF.push(t, "80f62m+01pD3rPTf2EVx7q5", "itemDropEffect"), e("utils"), cc.Class({
            extends: cc.Component,
            properties: {
                prefabs: [ cc.Prefab ],
                templates: [ cc.Node ],
                target: cc.Node,
                minNum: 10,
                maxNum: 15,
                range: cc.rect(0, 0, 0, 0),
                upTime: cc.v2(.5, .8),
                downTime: cc.v2(.5, .8),
                horizontalTime: cc.v2(.5, .8),
                isUsePrefab: !0
            },
            start: function() {
                this._pool = new cc.NodePool(), this._actionPool = [], this.isUsePrefab ? this._prefabs = this.prefabs : this._prefabs = this.templates, 
                this._prefabNum = this._prefabs.length;
            },
            play: function(e, t) {
                for (var i = this._random.randomInt(this.minNum, this.maxNum), n = 0; n < i; n++) {
                    var o = this._pool.get();
                    o || (o = cc.instantiate(this._prefabs[this._random.randomInt(0, this._prefabNum - 1)])), 
                    o.setPosition(e, t), this.node.addChild(o, 1e3), o.startx = e, o.starty = t, this._actionPool.push(o), 
                    o.idx = this._actionPool.length - 1, o.upDis = this._random.random(this.range.y, this.range.y + this.range.height), 
                    o.downDis = .5 * cc.winSize.height + t, console.log(o.downDis, t), o.upTime = this._random.random(this.upTime.x, this.upTime.y), 
                    o.downTime = this._random.random(this.downTime.x, this.downTime.y), o.actionState = 1, 
                    o.yelapsed = 0, o.xelapsed = 0, o.isMoveLeft = this._random.randomInt(0, 9) < 5, 
                    o.moveDis = this._random.random(this.range.x, this.range.x + this.range.width), 
                    o.hMoveTime = this._random.random(this.horizontalTime.x + this.horizontalTime.y);
                }
            },
            update: function(e) {
                for (var t = this._actionPool.length, i = 0; i < t; ) {
                    var n = this._actionPool[i];
                    if (i += 1, n.yelapsed += e, 1 == n.actionState ? n.yelapsed >= n.upTime ? (n.actionState = 2, 
                    n.yelapsed = 0, n.y = n.starty + n.upDis, n.starty = n.y) : n.y = n.starty + n.upDis * cc.easeExponentialIn().easing(n.yelapsed / n.upTime) : n.yelapsed >= n.downTime ? (this.removeNode(n), 
                    i -= 1, t -= 1) : n.y = n.starty - n.upDis * cc.easeExponentialOut().easing(n.yelapsed / n.downTime), 
                    n.xelapsed += e, n.xelapsed >= n.hMoveTime) n.isMoveLeft ? n.x = n.startx - n.moveDis : n.x = n.startx + n.moveDis; else {
                        var o = n.moveDis * cc.easeIn(3).easing(n.xelapsed / n.hMoveTime);
                        n.isMoveLeft ? n.x = n.startx - o : n.x = n.startx + o;
                    }
                }
            },
            removeNode: function(e) {
                this._actionPool.splice(e.idx, 1), this._pool.put(e);
            }
        }), cc._RF.pop();
    }, {
        utils: "utils"
    } ],
    levelUpTagUI: [ function(e, t, i) {
        cc._RF.push(t, "97f81tltvRKDpWjI29dRpN0", "levelUpTagUI"), cc.Class({
            extends: cc.Component,
            properties: {
                arrows: [ cc.Node ]
            },
            start: function() {
                this._upLevelType = 0, this.setUpLevel(this._upLevelType);
            },
            getUpLevel: function(e) {
                return 1;
            },
            setUpLevel: function(e) {
                this._upLevelType = e;
                for (var t = 0, i = this.arrows.length; t < i; t++) {
                    var n = this.arrows[t];
                    t <= this._upLevelType ? n.active = !0 : n.active = !1;
                }
            }
        }), cc._RF.pop();
    }, {} ],
    libWechat: [ function(e, t, i) {
        cc._RF.push(t, "e2e08UvLNhNobECej4VcE+c", "libWechat");
        var n, o, s = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(e, n.key, n);
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t;
            };
        }();
        e("./../network/http");
        var a = (o = n = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
            }
            return s(e, null, [ {
                key: "init",
                value: function() {
                    var e = this;
                    wx.getSystemInfo({
                        success: function(t) {
                            e.sdkVersion = t.SDKVersion;
                        }
                    }), wx.onShow(function(t) {
                        switch (e.showType) {
                          case e.ShowType.wxInvite:
                            Date.now() - e.shareTime > 3e3 ? e.shareSuccessCb() : e.shareFailCb(), e.shareSuccessCb = null, 
                            e.shareFailCb = null;
                        }
                        e.showType = null, pomelo.reconnectTimes && (pomelo.reconnectTimes = Date.now()), 
                        e.isBack = !1, e.offlineBack = !0;
                    }), wx.onHide(function() {
                        e.isBack = !0;
                    }), wx.showShareMenu({
                        withShareTicket: !0
                    });
                }
            }, {
                key: "loginWechat",
                value: function(e, t) {
                    var i = null, n = function() {
                        wx.getUserInfo({
                            success: function(t) {
                                console.log("===code===:", i), console.log("===微信返回的数据===:", t), e && e({
                                    uid: i,
                                    param: {
                                        encryptedData: t.encryptedData,
                                        iv: t.iv
                                    }
                                });
                            },
                            fail: function(e) {
                                console.log("获取用户信息失败！"), console.log(e), t && t({
                                    errCode: 500,
                                    msg: "获取用户信息失败"
                                });
                            },
                            withCredentials: !0,
                            lang: "zh_CN"
                        });
                    };
                    wx.login({
                        success: function(e) {
                            i = e.code, wx.getSetting({
                                success: function(e) {
                                    e.authSetting["scope.userInfo"] ? n() : wx.authorize({
                                        scope: "scope.userInfo",
                                        success: function() {
                                            n();
                                        },
                                        fail: function() {
                                            t({
                                                errCode: 501,
                                                code: i,
                                                msg: "获取微信授权失败"
                                            });
                                        }
                                    });
                                },
                                fail: function() {
                                    t("获取授权失败!");
                                }
                            });
                        },
                        fail: function(e) {
                            t && t("微信登陆失败");
                        }
                    });
                }
            }, {
                key: "onShare",
                value: function(e) {
                    wx.onShareAppMessage(function() {
                        return e();
                    });
                }
            }, {
                key: "share",
                value: function(e, t, i, n, o) {
                    var s = this;
                    wx.updateShareMenu({
                        withShareTicket: !0
                    });
                    var a = function() {
                        o && o();
                    };
                    -1 != t.indexOf("http") && function(t) {
                        s.shareTime = new Date().getTime(), s.shareSuccessCb = n, s.shareFailCb = a, s.showType = s.ShowType.wxInvite;
                        var o = s;
                        wx.shareAppMessage({
                            title: e,
                            imageUrl: t.url,
                            query: i,
                            success: function(e) {
                                o.showType == o.ShowType.wxInvite && (o.showType = null, n && n(e)), console.log("转发成功111111111111!!!");
                            },
                            fail: function(e) {
                                o.showType == o.ShowType.wxInvite && (o.showType = null, a()), console.log("转发失败111111111111111111!!!");
                            }
                        });
                    }({
                        url: t
                    });
                }
            }, {
                key: "invite",
                value: function() {
                    var e = wx.getLaunchOptionsSync().query;
                    return console.log("邀请我的人:", e), e;
                }
            }, {
                key: "getSdkVersion",
                value: function() {
                    return this.sdkVersion;
                }
            } ]), e;
        }(), n.wxHttpsUrl = "http://jiangtaoye.gotoip11.com/zmh5_php/", n.shareTime = 111, 
        n.shareSuccessCb = null, n.shareFailCb = null, n.showType = null, n.isBack = !1, 
        n.offlineBack = !1, n.ShowType = {
            wxInvite: 1
        }, n.sdkVersion = "0", o);
        window.libWechat = a, t.exports = a, cc._RF.pop();
    }, {
        "./../network/http": "http"
    } ],
    lixianDlg: [ function(e, t, i) {
        cc._RF.push(t, "3fe95WbHV9E3ZTh3FeBz8Dy", "lixianDlg"), cc.Class({
            extends: cc.Component,
            properties: {
                lixianDesc: cc.Label,
                lixianTime: cc.Label,
                normalMoney: cc.Label,
                moreMoney: cc.Label,
                normalAdd: cc.Node,
                moreAdd: cc.Node,
                inviteBg: cc.Node
            },
            onLoad: function() {
                user.needInvite() || (this.moreAdd.active = !1, this.inviteBg.active = !1);
            },
            start: function() {
                var e = this, t = Math.floor(user.getOfflineTime() / 1e3), i = t, n = config.Common.retentionTime;
                this.lixianDesc.string = "(最多保留" + n / 3600 + "小时离线收益)", t > n && (t = n);
                var o = Math.min(Math.floor(i / 3600), 99) + "", s = Math.floor(i % 3600 / 60) + "", a = i % 60 + "";
                1 == o.length && (o = "0" + o), 1 == s.length && (s = "0" + s), 1 == a.length && (a = "0" + a), 
                this.lixianTime.string = o + ":" + s + ":" + a;
                var r = user.getOfflineMoney(), c = bigNumber.mult(r, 4);
                this.normalMoney.string = bigNumber.closeNumToRealSpecial(r), this.moreMoney.string = bigNumber.closeNumToRealSpecial(c), 
                user.setLastGiveTime(user.getLoginServerTime()), pressButtonDeal(this.normalAdd, function() {
                    user.addMoney(r, !0), e.node.myDestroy(), sd.mainDlg.playPickUpEffect2(e.normalAdd, 0);
                }), pressButtonDeal(this.moreAdd, function() {
                    var t = channel.getWatchAd(window.VideoAdids[0]);
                    t(function() {
                        user.addMoney(c, !0), e.node.myDestroy(), sd.mainDlg.playPickUpEffect2(e.normalAdd, 0), 
                        PopLayer.tip("操作成功，领取到4倍奖励！");
                    }, function() {
                        0 == t.getType() ? PopLayer.tip("分享失败，请分享到不同的群！") : PopLayer.tip("完整的观看广告才可获得翻倍奖励！");
                    });
                });
            }
        }), cc._RF.pop();
    }, {} ],
    loadingScene: [ function(e, t, i) {
        cc._RF.push(t, "2af0c9cIHNBkL5bXoU5f2Wf", "loadingScene"), cc.Class({
            extends: cc.Component,
            properties: {
                scale: cc.Label,
                sprite: cc.Node,
                jinru: cc.Node,
                uidText: cc.Node
            },
            start: function() {
                var t = this;
                if (channel.init(), this.sprite.runAction(cc.repeatForever(cc.rotateBy(.7, -179))), 
                cc.sys.platform !== cc.sys.WECHAT_GAME) {
                    var i = cc.log.bind(cc);
                    cc.log = function() {
                        var e = new Date(), t = e.toLocaleString() + "." + e.getTime() % 1e3 + ":";
                        switch (arguments.length) {
                          case 0:
                            i(t);
                            break;

                          case 1:
                            i(t, arguments[0]);
                            break;

                          case 2:
                            i(t, arguments[0], arguments[1]);
                            break;

                          case 3:
                            i(t, arguments[0], arguments[1], arguments[2]);
                            break;

                          case 4:
                            i(t, arguments[0], arguments[1], arguments[2], arguments[3]);
                        }
                    };
                } else cc.log = console.log;
                var n = this, o = function() {
                    cc.log("开始连接"), 
                    cc.sys.platform === cc.sys.WECHAT_GAME ? !channel.isTouTiao() ? (pomelo.setHost("", 9014), 
                    pomelo.setAuthHost("", 9015)) : (pomelo.setHost("", 9014), 
                    pomelo.setAuthHost("", 9015)) : (pomelo.setHost("", 7024), 
                    pomelo.setAuthHost("", 7021)), cc.sys.isNative && (pomelo.setHost("", 9014), 
                    pomelo.setAuthHost("", 9015)), pomelo.setFromUid("1003386"), 
                    pomelo.errorNotRetry = !0;
                    var e = !1;
                    pomelo.setSuccessCb(function(t) {
                        // console.log("连接3",JSON.stringify(t));
                        // var t = {code:200,user:{_id:123421,lastLoginTime:1585121109864,createTime:"2020-03-25 15:10:02",logoutTime:1585121110,gmLevel:0,loginNum:9,isFrom:false,activity:{dialTimes:0,dialAddTimes:0,adTimes:0,randomTimes:0,signDay:0,isSign:false,shareUids:[],shareSucc:0}},isUpdate:false,time:1585121113687,isShare:true,isShare2:true,isAd:false,isAd2:true,developVersion:"1.0.6"}
                        t.user.client ? user.setInfo(t.user.client) : t.isUpdate && user.setAllToServer(), 
                        user.needInvited = t.isShare2, user.needAd = t.isAd2, user.setDevelopVersion(t.developVersion), 
                        user.setServerInfo(t.user.activity), user.setServerTime(t.time), user.setLogoutTime(1e3 * t.user.logoutTime), 
                        void 0 == user.info.timestamp && (user.info.timestamp = t.time + 1e3), pomelo.errorNotRetry = !1, 
                        e ? channel.offlineBack() && (Math.floor(user.getOfflineTime() / 1e3) > 600 && "0" != user.calcAllFlowerStandOutputSec() && user.needInvite() && popBannerDlg("prefabs/ui/lixian", null, null, window.bannerids[1]), 
                        channel.setOfflineBack()) : (PopLayer.tip("连接成功！"), user.gameStart(), cc.director.loadScene("flower")), 
                        e = !0;
                    }), pomelo.connect();
                    //     t.user.client ? user.setInfo(t.user.client) : t.isUpdate && user.setAllToServer(), 
                    //     user.needInvited = t.isShare2, user.needAd = t.isAd2, user.setDevelopVersion(t.developVersion), 
                    //     user.setServerInfo(t.user.activity), user.setServerTime(1585121113687), user.setLogoutTime(1e3 * t.user.logoutTime) 
                    //     void 0 == user.info.timestamp && (user.info.timestamp = t.time + 1e3), pomelo.errorNotRetry = !1, 
                    //     e ? channel.offlineBack() && (Math.floor(user.getOfflineTime() / 1e3) > 600 && "0" != user.calcAllFlowerStandOutputSec() && user.needInvite() && popBannerDlg("prefabs/ui/lixian", null, null, window.bannerids[1]), 
                    //     channel.setOfflineBack()) : (PopLayer.tip("连接成功！"), user.gameStart(), cc.director.loadScene("flower")), 
                    //     e = !0;
                }, s = [ "animation", "audio", "font", "prefabs", "scene", "texture", "configData" ], a = 0, r = s.length;
                !function i() {
                    s[a] ? cc.loader.loadResDir(s[a], function(e, i) {
                        if (i) {
                            var n = Math.floor(e / i * 100 / r + 100 / r * a);
                            n && (t.scale.string = Math.floor(n) + "%");
                        }
                    }, function(e, t, n) {
                        setTimeout(function() {
                            e ? i() : (n.forEach(function(e, i) {
                                resManager.addResource(e, t[i]);
                            }), a++, i());
                        }, 0);
                    }) : function() {
                        t.sprite.active = !1;
                        var i = resManager.getResource("configData/configData").json, s = e("configTrans")(i);
                        window.config = s, cc.sys.platform === cc.sys.WECHAT_GAME ? o() : (o()/*n.jinru.active = !0, 
                        n.uidText.active = !0, pressButtonDeal(n.jinru, function() {
                            var e = n.uidText.getComponent(cc.EditBox).string;
                            e ? (pomelo.setUid(e), o()) : PopLayer.tip("uid不能为空");
                        })*/);
                    }();
                }();
            },
            update: function(e) {}
        }), cc._RF.pop();
    }, {
        configTrans: "configTrans"
    } ],
    localData: [ function(e, t, i) {
        cc._RF.push(t, "07a3fcf4ptH7LrpMEJv9zLE", "localData");
        var n = {
            init: function(e) {
                this.uid = e, this.isSync = !1;
                var t = cc.sys.localStorage.getItem("zm_game_data_" + e);
                try {
                    this.mData = JSON.parse(t) || {};
                } catch (e) {
                    this.mData = {};
                }
            },
            saveData: function(e, t) {
                this.mData[e] = t, cc.sys.localStorage.setItem("zm_game_data_" + this.uid, JSON.stringify(this.mData));
            },
            startTime: function() {
                var e = this;
                this.stopTime(), this.time = setInterval(function() {
                    e.putData();
                }, 3e5);
            },
            stopTime: function() {
                this.time && (clearInterval(this.time), this.time = null);
            },
            getData: function(e) {
                return this.mData[e];
            },
            saveAllData: function() {
                cc.sys.localStorage.setItem("zm_game_data_" + this.uid, JSON.stringify(this.mData));
            },
            removeData: function(e) {
                cc.sys.localStorage.removeItem(e);
            },
            putData: function(t) {
                var i = this;
                e("./channel").sumitScore(gameManager.getCurBestWeapon()), netUtil.SendServer("scene.entryHandler.setStorage", {
                    data: this.mData
                }, function(e) {
                    console.log("数据上传成功"), dataManager.allData.mtime = e.mtime, i.saveAllData(), t && t();
                }, !0);
            },
            getSeverData: function(e) {
                var t = this;
                netUtil.SendServer("scene.entryHandler.getStorage", {}, function(i) {
                    console.log("同步服务器数据"), t.mData = i.gameData, e && e();
                });
            },
            checkVersion: function(e) {
                var t = channel.version + "", i = cc.sys.localStorage.getItem("zm_game_version");
                i ? i != t && cc.sys.platform === cc.sys.WECHAT_GAME && wx.clearStorageSync() : cc.sys.platform === cc.sys.WECHAT_GAME && wx.clearStorageSync(), 
                e && e(), cc.sys.localStorage.setItem("zm_game_version", t);
            }
        };
        t.exports = n, cc._RF.pop();
    }, {
        "./channel": "channel"
    } ],
    lockWorkItemUI: [ function(e, t, i) {
        cc._RF.push(t, "5d8f1EzHOBB6o8CLDGFZun3", "lockWorkItemUI"), cc.Class({
            extends: cc.Component,
            properties: {
                moneyText: cc.Label,
                coinText: cc.Label,
                moveText: cc.Label,
                moneyBtnAction: cc.Node,
                moveBtnAction: cc.Node
            },
            start: function() {
                this.moneyText.string = "0", this.coinText.string = "0", 0 == user.info.flowerStands.length && sd.DlgMgr.showGuide(gConst.guides.newFlowerStand, this.moneyText.node.parent), 
                this.moneyBtnAction.getComponent(dragonBones.ArmatureDisplay).playAnimation("idle"), 
                this.moveBtnAction.getComponent(dragonBones.ArmatureDisplay).playAnimation("idle"), 
                this._updateTime = 0;
            },
            update: function(e) {
                if ("0" == this.moneyText.string && this.updateCost(), this._updateTime += e, this._updateTime > 1) if (this._updateTime = 0, 
                this.moveText.node.parent.active) this.moveBtnAction.active = user.moneyEnough(this._moveCost); else {
                    var t = user.moneyEnough(this._moneyCost);
                    t && 1 == user.info.flowerStands.length && sd.DlgMgr.showGuide(gConst.guides.newStand, this.moneyText.node.parent), 
                    this.moneyBtnAction.active = t;
                    var i = !user.coinEnough(this._coinCost);
                    sd.pf.setNodeGray(this.moneyText, !t), sd.pf.setNodeGray(this.coinText, i), sd.pf.setNodeSpriteFrameGray(this.moneyText.node.parent, !t, "texture/new_ui/zhujiemian14"), 
                    sd.pf.setNodeSpriteFrameGray(this.coinText.node.parent, i, "texture/new_ui/zhujiemian14");
                }
            },
            updateCost: function() {
                this._moneyCost = user.getFlowerStandCost("costMoney"), this._coinCost = user.getFlowerStandCost("costBullion"), 
                this.moneyText.string = bigNumber.closeNumToRealSpecial(this._moneyCost), this.coinText.string = bigNumber.closeNumToRealSpecial(this._coinCost);
            },
            reset: function() {
                this.node.y = -857, this.moveText.node.parent.active = !1, this.moveBtnAction.active = !1, 
                this.moneyText.node.parent.active = !0, this.coinText.node.parent.active = !0, this.updateCost();
            },
            onShowMoveBtn: function() {
                this._moveCost = user.getMoveCost(), this.moveText.string = bigNumber.closeNumToRealSpecial(this._moveCost), 
                this.moveText.node.parent.active = !0, this.moneyText.node.parent.active = !1, this.coinText.node.parent.active = !1;
            }
        }), cc._RF.pop();
    }, {} ],
    mainDlg: [ function(e, t, i) {
        cc._RF.push(t, "2743coZuKZB6Iv0dsP3ZN55", "mainDlg");
        var n = e("NodeExtend"), o = e("random"), s = e("utils"), a = [ "2", "3", "4" ];
        cc.Class({
            extends: cc.Component,
            properties: {
                floor: cc.Node,
                scrollView: cc.ScrollView,
                scrollTop: cc.Node,
                scrollBottom: cc.Node,
                bottomButtons: [ cc.Node ],
                sendRolePrefab: cc.Prefab,
                collectRolePrefab: cc.Prefab,
                lockWork: cc.Node,
                workItem: cc.Prefab,
                sendPos1: cc.Node,
                sendPos2: cc.Node,
                collectPos1: cc.Node,
                collectPos2: cc.Node,
                moneyText: cc.Label,
                coinText: cc.Label,
                talentText: cc.Label,
                warehouseLevel: cc.Label,
                storeLevel: cc.Label,
                cangkuButton: cc.Node,
                storeButton: cc.Node,
                taskBtn: cc.Node,
                moveRateText: cc.Label,
                eventTagNode: cc.Node,
                lockWorkPrefab: cc.Prefab,
                rankNode: cc.Node,
                lupinNode: cc.Node,
                signNode: cc.Node,
                taskNode: cc.Node,
                roadTip: cc.Node,
                topMoneyNodes: [ cc.Node ],
                workVHeight: 353
            },
            onLoad: function() {
                channel.isTouTiao() && (this.rankNode.active = !1, this.lupinNode.active = !1) || (this.rankNode.active = !1, this.lupinNode.active = !1);
                this.liveReward = new cc.Node().addComponent(cc.Sprite)
                /**
                 * 加入录屏奖励提示 this.rankNode 改为录屏
                 */
                // cc.loader.load("images/live_share_btn.png",function(err,t){
                //     if(!err){
                //         this.rankNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t)
                //     }
                // }.bind(this))
                // cc.loader.load("images/live_reward.png",function(err,t){
                //     if(!err){
                //         this.liveReward.spriteFrame = new cc.SpriteFrame(t)
                //     }
                // }.bind(this))
                // this.rankNode.addChild(this.liveReward.node)
                // this.liveReward.node.x = -75
                // this.liveReward.node.y = 40
                // this.liveReward.node.active = isLiveReward()
                // this.videoReward = cc.instantiate(this.rankNode)
                // this.videoReward.active = !0
                // this.rankNode.parent.addChild(this.videoReward)
                // cc.loader.load("images/video_reward_btn.png",function(err,t){
                //     if(!err){
                //         this.videoReward.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t)
                //     }
                // }.bind(this))
                /**
                 * 加入看视频奖励提示
                 */
                this.videoRewarTips = new cc.Node().addComponent(cc.Sprite)
                cc.loader.load("images/video_reward.png",function(err,t){
                    if(!err){
                        this.videoRewarTips.spriteFrame = new cc.SpriteFrame(t)
                    }
                }.bind(this))
                this.bottomButtons[4].addChild(this.videoRewarTips.node)
                this.videoRewarTips.node.x = 0
                this.videoRewarTips.node.y = 40
                /** 加入按钮点击回调 */
                // this.videoReward.getComponent(cc.Button).clickEvents = []
                // var eventHandler = new cc.Component.EventHandler();
                // eventHandler.target = this;
                // eventHandler.component = "mainDlg";
                // eventHandler.handler = "onClickVideoReward";
                // // eventHandler.customEventData = "my data";
                // this.videoReward.getComponent(cc.Button).clickEvents.push(eventHandler)
                this.videoRewardTime = new cc.Node().addComponent(cc.Label)
                this.bottomButtons[4].addChild(this.videoRewardTime.node)
                this.videoRewardTime.node.x = 0;
                this.videoRewardTime.node.y = 65;
                this.videoRewardTime.fontSize = 25
                if(isVideoReward()){
                  this.videoRewardTime.string = "mm:ss"
                  this.videoRewarTips.node.active = !1
                }else{
                  this.schedule(this.videoRewardSchedule,1)
                  this.videoRewardTime.string = timeFtt("mm:ss",VideoRewardCD - getVideoRewardTime())
                  this.videoRewarTips.node.active = !1
                }
                createInterstitialAd()
            },
            videoRewardSchedule:function(){
              var time = getVideoRewardTime()
              if(time >= VideoRewardCD){
                this.videoRewarTips.node.active = !0
                this.videoRewardTime.string = ""
                this.unschedule(this.videoRewardSchedule)
              }else{
                this.videoRewardTime.string = timeFtt("mm:ss",VideoRewardCD - time)
              }
            },
            onClickVideoReward:function(){
                console.log("onClickVideoReward")
                if(isVideoReward()){
                  var ad = channel.getWatchAd(window.VideoAdids[0]);
                  var _this = this
                  ad(function() {
                    t = popBannerDlg("prefabs/public/tanchu", null, null, window.bannerids[2]).getComponent("tanchu");
                    var n = 100;
                    user.addCoin(n), 
                    t.show(resManager.getResource("prefabs/wheel/wheelgold1"), n + gConst.moneyUnit2 + gConst.moneyName2, "获得" + gConst.moneyName2, null, 1);
                    setVideoRewardTime()
                    _this.schedule(_this.videoRewardSchedule,1)
                    _this.videoRewardTime.string = timeFtt("mm:ss",VideoRewardCD - getVideoRewardTime())
                    _this.videoRewarTips.node.active = !1
                  }, function() {
                      0 == ad.getType() ? PopLayer.tip("分享失败，请分享到不同的群！") : PopLayer.tip("完整的观看广告才可获得奖励！");
                  });
                }else{
                  PopLayer.tip("冷却时间未到，请稍后再来！")
                }
            },
            start: function() {
                var e = this;
                channel.isTouTiao() && (this.lupinNode.getChildByName("kai").scale = 1.2,this.lupinNode.getChildByName("guan").scale = 1.2,this.lupinNode.getChildByName("kai").active = !0, this.lupinNode.getChildByName("guan").active = !1, 
                /*wx.getGameRecorderManager().onStop(function(t) {
                    console.log("录屏结束", t.videoPath,e.isLupingRestart)
                    if(!e.isLupingRestart){
                        e.isLuping = !1, e.lupinNode.getChildByName("kai").active = !0, 
                      e.lupinNode.getChildByName("guan").active = !1;
                      var time = new Date().getTime()
                      if(time - e.recorderStartTime > 3000){
                          e.rankNode.active = !0;
                          e.videoPath = t.videoPath
                          if(isLiveReward()){
                              e.liveReward.node.active = !0
                          }else{
                              e.liveReward.node.active = !1
                          }
                      }else{
                          e.rankNode.active = !1;
                          e.videoPath = null
                          PopLayer.tip("录屏失败：录屏时长低于3秒")
                      }
                    }else{
                        e.scheduleOnce(function(){
                            wx.getGameRecorderManager().start({
                                    duration: 120
                                })
                        },0)
                    }
                    e.isLupingRestart = !1
                }),wx.getGameRecorderManager().onStart(function(t) {
                    e.recorderStartTime = new Date().getTime()
                }), pressButtonDeal(this.lupinNode, function() {
                    e.clickRecorder()
                }),*/(e.lupinNode.active = !1)) ||(e.lupinNode.active = !1); sd.mainDlg = this, this._isUpdateValue = !0, this._roadCount = 1, this._roadTips = [], 
                this._floorOffset = 458, this._showTime = 0, this._lockWorkY = this.lockWork.y, 
                this._random = new o(s.getRandomSeed()), this._cangkuLevelTagUI = this.cangkuButton.getChildByName("levelTag").getComponent("levelUpTagUI"), 
                this._storeLevelTagUI = this.storeButton.getChildByName("levelTag").getComponent("levelUpTagUI"), 
                this._swichMainUI = this.getComponent("switchMainUI"), this._moneyEffect = this.getComponent("moneyEffect"), 
                this._moneyEffect.setFinishCallback(this.onMoneyEffectFinish, this), this._pickUpEffect = this.getComponent("pickUpEffect"), 
                this._pickUpEffect.setFinishCallback(this.onPickUpEffectFinish, this), this.scrollView.node.getComponent(cc.Widget).updateAlignment(), 
                this._viewHeight = this.scrollView.node.height, this.viewContent = this.scrollView.content, 
                n.touchEventsScale(this.scrollBottom, function() {
                    e.scrollToLockWorker();
                }, null, null, null, this), n.touchEndEventScale(this.scrollTop, function() {
                    e.scrollView.scrollToTop(.2);
                }, null, null, null, this), this._scrollViewHandle = this.scrollView.node.getComponent("scrollViewHandle"), 
                pressButtonDeal(this.cangkuButton, function() {
                    popBannerDlg(function() {
                        var e = resManager.instantiate("prefabs/ui/cangkushengji");
                        return e.getComponent("cangkuDlg").typeName = "cangku", e.getComponent("cangkuDlg").initUi(), 
                        e;
                    }, null, null, window.bannerids[2]);
                }), pressButtonDeal(this.storeButton, function() {
                    popBannerDlg(function() {
                        var e = resManager.instantiate("prefabs/ui/cangkushengji");
                        return e.getComponent("cangkuDlg").typeName = "store", e.getComponent("cangkuDlg").initUi(), 
                        e;
                    }, null, null, window.bannerids[0]);
                }), this._selectBtnIcon = null;
                for (var t = [ "flowermap", "shopDlg", "wheelNode", "tianfu", "inviteDlg" ], i = 0, a = this.bottomButtons.length; i < a; i++) {
                    var r = this.bottomButtons[i];
                    r.idx = i, 4 == i && (user.needInvite() ? r.active = !0 : r.active = !1), n.touchEvent(r, cc.Node.EventType.TOUCH_END, function(i) {
                        // console.log("i =====",i)
                        if (e._selectBtnIcon && e._selectBtnIcon.setScale(1), 0 != i.target.idx) if (3 == i.target.idx) {
                            var n = cc.instantiate(resManager.getResource("prefabs/ui/tianfu"));
                            cc.director.getScene().getChildByName("Canvas").addChild(n, gConst.popBannerZindex);
                        } else if ("shopDlg" == t[i.target.idx]) {
                            var o = cc.instantiate(resManager.getResource("prefabs/ui/shangcheng"));
                            cc.director.getScene().getChildByName("Canvas").addChild(o, gConst.popBannerZindex);
                        } else if (4 == i.target.idx) {
                            // var s = popBannerDlg("prefabs/ui/inviteFriend", 0, null, window.bannerids[0], null, 50);
                            // e._selectBtnIcon = i.target.getChildByName("icon"), e._selectBtnIcon.setScale(1.3);
                            // var a = e;
                            // s._closeFunc = function() {
                            //     a._selectBtnIcon.setScale(1);
                            // };
                            // if(channel.isIos()){
                            //     /*tt.*/wx.shareAppMessage({
                            //     templateId: "79m435j336gc16ph9l", // 替换成通过审核的分享ID
                            //     query: "",
                            //     success() {
                            //         console.log("分享成功");
                            //     },
                            //     fail(e) {
                            //         console.log("分享失败");
                            //     }
                            //     });
                            // }
                            e.onClickVideoReward()
                        } else {
                            e._selectBtnIcon = i.target.getChildByName("icon"), e._selectBtnIcon.setScale(1.3);
                            var r = e;
                            sd.DlgMgr.showDlg(t[i.target.idx], null, function() {
                                r._selectBtnIcon.setScale(1);
                            });
                        }
                        /**
                         * 点击5次弹出插屏
                         */
                        e.clickDownButtonCount = e.clickDownButtonCount || 0
                        e.clickDownButtonCount++
                        if(e.clickDownButtonCount%5 == 0){
                          showInterstitialAd()
                        }
                    }, this);
                }
                this.initUI(), Math.floor(user.getOfflineTime() / 1e3) > 600 && "0" != user.calcAllFlowerStandOutputSec() && user.needInvite() && popBannerDlg("prefabs/ui/lixian", null, null, window.bannerids[1]), 
                function t() {
                    if (!user.randomEventTimesLimit()) {
                        var i = gConst.random.randomInt(config.Common.randomEventTime[0], config.Common.randomEventTime[1]);
                        setTimeout(function() {
                            var i = cc.instantiate(resManager.getResource("prefabs/randomEvent"));
                            e.viewContent.addChild(i), e.randomEventUi = i, i.liveCb = function(sCb,fCb) {
                                e.liveShare(sCb,fCb)
                            },i.isLuping = function(){
                                //1显示打小丑 2 显示精彩视频 3不显示分享
                                return e.isLuping ? 1 : e.videoPath ? 2 : 0
                            }, i.destroyCb = function() {
                                e.randomEventUi = null, t();//,e.stopRecorder();
                            }, i.y = e.lockWork.y + e.workVHeight / 2, i.zIndex = gConst.getZindexFromY(i.y), 
                            e.eventTagNode.active = e.randomEventUi.y + e.viewContent.y <= -e.viewContent.parent.height || e.randomEventUi.y + e.viewContent.y > 0;
                            //检查是否在录屏，让录屏重新开始
                            console.log("检查是否在录屏",e.isLuping)
                            // if(e.isLuping){
                            //   var gameRecorderManager = wx.getGameRecorderManager();
                            //   e.isLupingRestart = !0;
                            //   gameRecorderManager.stop();
                            // }else{
                            //   e.startRecorder()
                            // }
                        }, 1e3 * i);
                    }
                }(), this.schedule(function() {
                    e.showTaskEffect();
                }, 1), this.showTaskEffect();
                // if(channel.isAndroid()){
                //     createMoreGamesButton();
                // }
                // this.startRecorder()
                // this.node.parent.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchStart, this)
                /*tt.*/wx.onTouchStart(this.onTouchStart.bind(this))
                this.scheduleOnce(this.showInterstitialAd,60)
            },
            onTouchStart(){
              console.log("onTouchStart")
              this.unschedule(this.showInterstitialAd)
              this.scheduleOnce(this.showInterstitialAd,60)
            },
            showInterstitialAd(){
              /**
               * 一分钟无操作弹出插屏
               */
              showInterstitialAd()
              var _this = this
              this.scheduleOnce(function(){
                 _this.scheduleOnce(_this.showInterstitialAd,80)
              },0)
            },
            clickRecorder: function() {
                var t = wx.getGameRecorderManager();
                this.isLuping ? (this.stopRecorder()) : (this.startRecorder(), PopLayer.tip("开始录屏"));
                // this.scheduleOnceFun && (this.unschedule(this.scheduleOnceFun),this.scheduleOnceFun = null)
            },
            startRecorder: function() {
                var t = wx.getGameRecorderManager();
                !this.isLuping && (t.start({
                    duration: 120
                }), this.lupinNode.getChildByName("kai").active = !1, this.lupinNode.getChildByName("guan").active = !0, 
                console.log("录屏开始"), this.isLuping = !0,this.rankNode.active = !1/*,
                this.scheduleOnceFun && (this.unschedule(this.scheduleOnceFun),this.scheduleOnceFun = null),
                this.scheduleOnceFun = this.startRecorder.bind(this),
                this.scheduleOnce(this.scheduleOnceFun,120)*/);
            },
            stopRecorder: function() {
                var t = wx.getGameRecorderManager();
                this.isLuping && (t.stop(), this.isLuping = !1, this.lupinNode.getChildByName("kai").active = !0, 
                this.lupinNode.getChildByName("guan").active = !1,console.log("录屏结束"))
            },
            liveShare:function(sCb,fCb){
                if(this.videoPath){
                    var _this = this
                    console.log("分享");
                    wx.shareVideo({
                        videoPath: this.videoPath,
                        title: "视频分享",
                        success: function() {
                            console.log("分享成功！");
                            if(isLiveReward()){
                                _this.addReward()
                                setLiveRewardTime()
                            }
                            _this.startRecorder()
                            sCb && sCb()
                        },
                        fail: function(e) {
                            console.log("分享失败！",e);
                            fCb && fCb()
                        }
                    });
                }else{
                    PopLayer.tip("没有可分享视频！")
                    // this.startRecorder()
                    this.rankNode.active = !1;
                    fCb && fCb()
                }
            },
            showTaskEffect: function() {
                this.taskBtn.getChildByName("effect").active = user.hasTaskCompelate();
            },
            adjustButton: function() {
                var e = Math.min(115, this.viewContent.y);
                this.cangkuButton.y = -347 + e, this.storeButton.y = -347 + e,  
                this.signNode.y = this.cangkuButton.y - 119, 
                this.taskNode.y = this.signNode.y - 85;
                //,this.videoReward.y = this.taskNode.y - 85;
                // this.lupinNode.y = this.cangkuButton.y - 119,
                // this.rankNode.y = this.videoReward.y - 100;
            },
            onScrollEvent: function(e, t) {
                switch (t) {
                  case 0:
                    this.scrollTop.active = !1;
                    break;

                  case 4:
                    this.scrollTop.active = !0, this.scrollBottom.active = !0, this.randomEventUi ? this.eventTagNode.active = this.randomEventUi.y + this.viewContent.y <= -this.viewContent.parent.height || this.randomEventUi.y + this.viewContent.y > 0 : this.eventTagNode.active = !1, 
                    this._scrollViewHandle.checkNodes();
                    break;

                  case 9:
                    this.viewContent.y < 1 && (this.scrollTop.active = !1);
                }
                this.adjustButton();
            },
            initUI: function() {
                var e = this;
                this.flowerStandSending = [], this.flowerStandCollecting = [], this.lockStands = [], 
                this._lockStandIdx = 0, this._sendRoles = [], this._collectRoles = [], this._workItems = [], 
                this._initSends = !1, this._initCollects = !1, this.viewContent.height = Math.max(this._viewHeight, 3 * this.workVHeight), 
                this.floor.height = this.viewContent.height - this._floorOffset, this.lockWork.y = this._lockWorkY, 
                this._sendNum = user.getCangkuWorkerNum();
                for (var t = 0; t < this._sendNum; t++) !function(t) {
                    setTimeout(function() {
                        e._sendRoles.length >= e._sendNum ? e._initSends = !0 : (e.addSendRole(), t == e._sendNum - 1 && (e._initSends = !0));
                    }, 3e3 * t);
                }(t);
                this._collectNum = user.getStoreWorkerNum();
                for (t = 0; t < this._collectNum; t++) !function(t) {
                    setTimeout(function() {
                        e._collectRoles.length >= e._collectNum ? e._initCollects = !0 : (e.addCollectRole(), 
                        t == e._collectNum - 1 && (e._initCollects = !0));
                    }, 3e3 * t);
                }(t);
                sd.pf.performWithDelay(this.node, function() {
                    var t = user.getFlowerStandMax();
                    e.viewContent.height = Math.max(e._viewHeight, (t + 2) * e.workVHeight), e.floor.height = e.viewContent.height - e._floorOffset;
                    for (var i = user.info.flowerStands, n = i.length, o = 0; o < n; o++) e._addWorkItem(!0);
                    sd.pf.performWithDelay(e.node, function() {
                        for (var t = 0; t < n; t++) {
                            var o = i[t];
                            o.worker2 && o.worker2.quality && e.onHireWorker(t, 2, o.worker2.quality);
                        }
                    }, .1, e);
                    for (var s = t - n - 1, a = e.lockStands.length, r = 0; r < s; r++) {
                        var c = void 0;
                        r < a ? ((c = e.lockStands[r]).active = !0, c.unUse = !1) : (c = cc.instantiate(e.lockWorkPrefab), 
                        e.lockStands.push(c), e.viewContent.addChild(c)), c.y = e.lockWork.y - e.workVHeight * (r + 1);
                    }
                    for (var l = Math.max(s, 0); l < a; l++) {
                        var u = e.lockStands[l];
                        u.active = !1, u.unUse = !0;
                    }
                    var h = user.getMoveMapId(), d = gConst.maps[h];
                    if (d) {
                        for (var g = cc.color(d.roadSign[0]), f = cc.color(d.roadSign[1]), m = 0, p = e._roadTips.length; m < p; m++) {
                            var v = e._roadTips[m];
                            v.color = g, v.getChildByName("text").color = f;
                        }
                        e.roadTip.color = g, e.roadTip.getChildByName("text").color = f;
                    }
                    for (var y = e._roadCount; y < t; y++) {
                        var C = cc.instantiate(e.roadTip);
                        C.getChildByName("text").getComponent(cc.Label).string = "" + (y + 1), C.y = e.roadTip.y - y * e.workVHeight, 
                        e.viewContent.addChild(C), e._roadTips.push(C);
                    }
                    e._roadCount = t, e._swichMainUI.switchUI(h);
                    console.log("switchUI",h)
                }, 0, this), this.onChangeNowLevelUp(), this.adjustButton();
            },
            update: function(e) {
                if (this._showTime += e, this._showTime > 1) {
                    this._showTime = 0, this.updateSendRoles(), this.updateCollectRoles(), this._isUpdateValue && (this.moneyText.string = user.getMoneyText(), 
                    this.talentText.string = user.getMoney2Text(), this.coinText.string = user.getCoinText()), 
                    this._warehouseLevel != user.getWarehouseLevel() && (this._warehouseLevel = user.getWarehouseLevel(), 
                    this.warehouseLevel.string = "LV." + this._warehouseLevel, this._cangkuCost = user.getWarehouseLevelUpMoney(1)), 
                    this._storeLevel != user.getStoreLevel() && (this._storeLevel = user.getStoreLevel(), 
                    this.storeLevel.string = "LV." + this._storeLevel, this._storeCost = user.getStoreLevelUpMoney(1));
                    var t = user.moneyEnough(this._cangkuCost);
                    this._cangkuLevelTagUI.node.active = t, this._storeLevelTagUI.node.active = user.moneyEnough(this._storeCost), 
                    this.randomEventUi && (this.randomEventUi.y = this.lockWork.y + this.workVHeight / 2, 
                    this.randomEventUi.zIndex = gConst.getZindexFromY(this.randomEventUi.y)), this.moveRateText.string = "x" + user.getMoveAndMallRatio(), 
                    t && sd.DlgMgr.showGuide(gConst.guides.cangkuOpen, this.warehouseLevel.node.parent), 
                    user.isGuide(gConst.guides.toyLevel) && user.money2Enough(user.getFlowerCost(1, 2)) && sd.DlgMgr.showGuide(gConst.guides.toyLevel, this.bottomButtons[0]);
                }
                if (this._isPlayMove) {
                    this._curDur -= e, this._curDur <= 0 && (this._isUpdateValue = !0, this._isPlayMove = !1, 
                    this._curDur = 0);
                    var i = this._curDur / this._moveDur;
                    this.moneyText.string = bigNumber.closeNumToRealSpecial(bigNumber.mult(this._money, i)), 
                    this.talentText.string = bigNumber.closeNumToRealSpecial(bigNumber.mult(this._money2, i));
                }
            },
            onRankClick: function(e) {
                // var t = popBannerDlg("prefabs/ui/rank", null, !0, !0), i = cc.winSize.height / 2 - t.getContentSize().height / 2;
                // i < 90 && (t.y -= 90 - i);
                this.liveShare()
            },
            addReward: function() {
                this.randomIndex = 0;
                var e = config.RandomEvent.find(1), t = popBannerDlg("prefabs/public/tanchu", null, null, window.bannerids[2]).getComponent("tanchu"), i = gConst.random.randomInt(1, e.random[this.randomIndex]);
                switch (e.style[this.randomIndex]) {
                  case 1:
                    var n = 200;
                    n = bigNumber.mult(n, i),n = 200, user.addCoin(n), t.show(resManager.getResource("prefabs/wheel/wheelgold1"), n + gConst.moneyUnit2 + gConst.moneyName2, "获得" + gConst.moneyName2, function() {
                        user.addCoin(n), t.refresh(2 * n + gConst.moneyUnit2 + gConst.moneyName2, "获得" + gConst.moneyName2);
                    }, 1);
                    break;

                  case 2:
                    var o = bigNumber.mult(user.getAllStandAddMoney(), e.reward[this.randomIndex]);
                    "0" == o && (o = bigNumber.mult(config.Parterre.find(1).produceSpeed1, config.Item.find(1).chosePrice[0])), 
                    o = bigNumber.mult(o, i), user.addMoney(o), t.show(resManager.getResource("prefabs/wheel/wheelmoney1"), bigNumber.closeNumToRealSpecial(o) + gConst.moneyUnit + gConst.moneyName, "获得" + gConst.moneyName, function() {
                        user.addMoney(o), t.refresh(bigNumber.closeNumToRealSpecial(bigNumber.mult(o, 2)) + gConst.moneyUnit + gConst.moneyName, "获得" + gConst.moneyName);
                    }, 0);
                    break;

                  case 3:
                    n = e.reward[this.randomIndex], n = Math.floor(n * i), user.addBox(100, n), t.show(resManager.getResource("prefabs/wheel/wheelbox1"), n + "个宝箱", "获得宝箱", function() {
                        user.addBox(100, n), t.refresh(2 * n + "个宝箱", "获得宝箱");
                    });
                    break;

                  case 4:
                    var s = 6e4 * (n = e.reward[this.randomIndex]) * i;
                    user.addRandomEventTime(s), t.show(resManager.getResource("prefabs/wheel/wheelDouble"), n + "分钟仓库运输总量双倍", "运输总量双倍", function() {
                        user.addRandomEventTime(s), t.refresh(2 * n + "分钟仓库运输总量双倍", "运输总量双倍");
                    });
                    break;

                  case 5:
                    n = e.reward[this.randomIndex], n = bigNumber.mult(n, i), user.addMoney2(n), t.show(resManager.getResource("prefabs/wheel/wheelbox1"), bigNumber.closeNumToRealSpecial(n) + gConst.money2Unit + gConst.money2Name, "获得" + gConst.money2Name, function() {
                        user.addMoney2(n), t.refresh(bigNumber.closeNumToRealSpecial(bigNumber.mult(n, 2)) + gConst.money2Unit + gConst.money2Name, "获得" + gConst.money2Name);
                    }, 2);
                }
            },
            onCreteWorker: function(e, t) {
                if (0 == t) {
                    if (!user.moneyEnough(user.getFlowerStandCost("costMoney"))) return void PopLayer.tip(gConst.moneyName + "不足");
                } else if (!user.coinEnough(user.getFlowerStandCost("costBullion"))) return void PopLayer.tip(gConst.moneyName2 + "不足");
                user.unlockFlowerStand(1 == t), this._addWorkItem(), sd.DlgMgr.closeGuide(gConst.guides.newStand);
            },
            onHireWorker: function(e, t, i) {
                var n = this._workItems[e];
                n && n.hireRole(t, i);
            },
            addSendRole: function() {
                var e = cc.instantiate(this.sendRolePrefab), t = e.getComponent("roleUI");
                t._roleIdx = this._sendRoles.length, t.initPos(this.sendPos1.x, this.sendPos1.y, this.sendPos2.x, this.sendPos2.y), 
                this._sendRoles.push(t), this.viewContent.addChild(e);
            },
            addCollectRole: function() {
                var e = cc.instantiate(this.collectRolePrefab), t = e.getComponent("roleUI");
                t._roleIdx = this._collectRoles.length, t.initPos(this.collectPos1.x, this.collectPos1.y, this.collectPos2.x, this.collectPos2.y), 
                this._collectRoles.push(t), this.viewContent.addChild(e);
            },
            _addWorkItem: function(e) {
                sd.DlgMgr.closeGuide(gConst.guides.newFlowerStand);
                var t = cc.instantiate(this.workItem);
                t.setPosition(this.lockWork.x, this.lockWork.y), this.viewContent.addChild(t, gConst.getZindexFromY(this.lockWork.y));
                var i = t.getComponent("workItemUI");
                this._workItems.push(i);
                var n = this._workItems.length - 1;
                i._workIdx = n, this.lockWork.y -= this.workVHeight;
                var o = this.lockWork.getComponent("lockWorkItemUI");
                if (n + 1 >= user.getFlowerStandMax() ? (o.onShowMoveBtn(), user.info.moveCount >= config.Common.moveMax ? (this.lockWork.active = !1, 
                this.viewContent.height = Math.max(this._viewHeight, (n + 3.2) * this.workVHeight), 
                this.floor.height = this.viewContent.height - this._floorOffset) : (this.viewContent.height = Math.max(this._viewHeight, (n + 4) * this.workVHeight), 
                this.floor.height = this.viewContent.height - this._floorOffset)) : o.updateCost(), 
                !e) {
                    var s = this.lockStands[this._lockStandIdx];
                    s && (s.active = !1, s.unUse = !0, this._lockStandIdx += 1), this.scrollToLockWorker();
                }
            },
            _getSelectWorker: function(e) {
                for (var t = e ? this.flowerStandSending : this.flowerStandCollecting, i = null, n = -1, o = 0, s = user.getFlowerStands().length; o < s; ++o) {
                    var a = o, r = user.getFlowerStand(a);
                    if (e) {
                        if (r.worker2 && r.flowerId > 0) {
                            var c = r.stock;
                            "-" == c[0] && (c = "0");
                            var l = bigNumber.add(c, t[a] || "0") || "0";
                            (null == i || bigNumber.compare(i, l)) && (i = l, n = a);
                        }
                    } else {
                        var u = user.getFlowerStandCollectMoney(o);
                        bigNumber.compare(t[a] || "0", u) || (l = bigNumber.reduce(u, t[a] || "0") || "0", 
                        (null == i || bigNumber.compare(l, i)) && (i = l, n = a));
                    }
                }
                return n;
            },
            updateSendRoles: function() {
                for (var e = this._sendRoles.length, t = 0; t < e; t++) {
                    var i = this._sendRoles[t];
                    if (i.isFree()) {
                        var n = this._getSelectWorker(!0), o = this._workItems[n];
                        o && o.node && i.startAction(o.node.y - 1, n) && (i.dealingValue = user.getWarehouseAdd(), 
                        this.flowerStandSending[n] = bigNumber.add(this.flowerStandSending[n] || "0", i.dealingValue));
                    }
                }
                if (this._initSends) for (var s = user.getCangkuWorkerNum(), a = e; a < s; a++) this.addSendRole();
            },
            updateCollectRoles: function() {
                for (var e = this._collectRoles.length, t = 0; t < e; t++) {
                    var i = this._collectRoles[t];
                    if (i.isFree()) {
                        var n = this._getSelectWorker(!1), o = this._workItems[n];
                        o && o.node && i.startAction(o.node.y - 1, n) && (i.dealingValue = user.getStoreAdd(), 
                        this.flowerStandCollecting[n] = bigNumber.add(this.flowerStandCollecting[n] || "0", i.dealingValue));
                    }
                }
                if (this._initCollects) for (var s = user.getStoreWorkerNum(), a = e; a < s; a++) this.addCollectRole();
            },
            onCompleteRoleAction: function(e, t, i) {
                var n = (i ? this._sendRoles : this._collectRoles)[e];
                if (n) {
                    var o = i ? this.flowerStandSending : this.flowerStandCollecting;
                    o[t] = bigNumber.reduce(o[t], n.dealingValue || "0"), "-" == o[t][0] && (o[t] = "0");
                }
            },
            onOpenOrCloseDoor: function(e) {},
            onPlayMoneyEffect: function(e) {
                this._moneyEffect.play(e);
            },
            onMoneyEffectFinish: function(e) {
                user.finishTake(e.idx, e.num);
            },
            playPickUpEffect: function(e, t) {
                this._pickUpStandIdx = t.idx, this._pickUpEffect.play(e, t);
                for (var i = 0, n = this._workItems.length; i < n; i++) {
                    var o = this._workItems[i];
                    o.talentTip.node.active && (o.setTalentTipShow(!1), this._pickUpEffect.play(o.talentTip.node, {
                        idx: -1
                    }));
                }
            },
            onPickUpEffectFinish: function(e) {
                e.idx == this._pickUpStandIdx && user.pickUpAllDropMoney2();
            },
            onMoveCallback: function() {
                popBannerDlg("prefabs/move/moveDlg");
            },
            onMoveMap: function() {
                if (this._money = user.getMoney(), this._money2 = user.getMoney2(), user.moveMap()) {
                    this.lockWork.getComponent("lockWorkItemUI").reset();
                    for (var e = 0, t = this._sendRoles.length; e < t; e++) this._sendRoles[e].node.destroy();
                    for (var i = 0, n = this._collectRoles.length; i < n; i++) this._collectRoles[i].node.destroy();
                    for (var o = 0, s = this._workItems.length; o < s; o++) this._workItems[o].node.destroy();
                    return this.scrollView.scrollToTop(), this.initUI(), this._isUpdateValue = !1, !0;
                }
                return !1;
            },
            playMoveMoneyEffect: function() {
                this._isPlayMove = !0, this._moveDur = 2, this._curDur = this._moveDur;
            },
            onChangeNowLevelUp: function() {
                this._cangkuCost = user.getWarehouseLevelUpMoney(1), this._storeCost = user.getStoreLevelUpMoney(1);
            },
            openStoreGuide: function() {
                sd.DlgMgr.showGuide(gConst.guides.storeOpen, this.storeLevel.node.parent);
            },
            openHireGuide: function() {
                var e = this._workItems[0];
                e && (e.hireRoleNode.active ? sd.DlgMgr.showGuide(gConst.guides.hireRole, e.hireRoleNode) : sd.DlgMgr.showGuide(gConst.guides.hireRole, e.roleNode)), 
                (e = this._workItems[1]) && (e.hireRoleNode.active ? sd.DlgMgr.showGuide(gConst.guides.newHireRole, e.hireRoleNode) : sd.DlgMgr.showGuide(gConst.guides.newHireRole, e.roleNode));
            },
            getWorkItems: function() {
                return this._workItems;
            },
            onSelectCultureFlower: function(e) {
                popBannerDlg("prefabs/flowergrow", 0, !0, !0, null);
            },
            onSignCallback: function() {
                popBannerDlg("prefabs/ui/qiandao", null, null, window.bannerids[1]);
            },
            onTaskCallback: function() {
                popBannerDlg("prefabs/task", 0, !0, !0, null);
            },
            scrollToLockWorker: function() {
                var e = (-this.lockWork.y - this._viewHeight + .9 * this.workVHeight) / (this.viewContent.height - this._viewHeight);
                this.scrollView.scrollToPercentVertical(1 - e, .2);
            },
            stopUpdateValue: function() {
                this._isUpdateValue = !1;
            },
            startUpdateValue: function() {
                this._isPlayMove || (this._isUpdateValue = !0);
            },
            playPickUpEffect2: function(e, t) {
                sd.pickUpEffect._callback || sd.pickUpEffect.setFinishCallback(this.startUpdateValue, this), 
                sd.pickUpEffect.play(e, this.topMoneyNodes[t], resManager.getResource("texture/ui/" + a[t]), 2 == t ? .5 : 1);
            }
        }), cc._RF.pop();
    }, {
        NodeExtend: "NodeExtend",
        random: "random",
        utils: "utils"
    } ],
    materialUI: [ function(e, t, i) {
        cc._RF.push(t, "0f2a8+VjvhN1oIFzaYQGJRi", "materialUI"), cc.Class({
            extends: cc.Component,
            properties: {
                showRect: cc.rect(0, 0, 100, 100),
                minNum: 0,
                maxNum: 0,
                scaleRange: cc.v2(.5, 1),
                material: cc.Prefab
            },
            onLoad: function() {
                this._materials = [], this._sprite = this.node.getComponent(cc.Sprite);
            },
            updateMaterials: function(e) {
                for (var t = e.length, i = sd.mainDlg._random, n = i.randomInt(this.minNum, this.maxNum), o = this._materials.length, s = 0; s < n; s++) {
                    var a = void 0;
                    s < o ? (a = this._materials[s]).active = !0 : (a = cc.instantiate(this.material), 
                    this.node.addChild(a), this._materials.push(a));
                    var r = e[i.randomInt(0, t - 1)];
                    a.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/flowericon/" + r);
                    var c = .5 * this.showRect.width, l = .5 * this.showRect.height, u = i.random(this.showRect.x - c, this.showRect.x + c), h = i.random(this.showRect.y - l, this.showRect.y + l);
                    a.setPosition(u, h), a.angle = i.random(-180, 180), a.setScale(i.random(this.scaleRange.x, this.scaleRange.y));
                }
                this._sprite.spriteFrame = resManager.getResource("texture/flowericon/" + e[i.randomInt(0, t - 1)]);
                for (var d = n; d < o; d++) this._materials[d].active = !1;
            }
        }), cc._RF.pop();
    }, {} ],
    moneyEffect: [ function(e, t, i) {
        cc._RF.push(t, "c5045bazp5P+JBNYEgxgbzR", "moneyEffect");
        var n = e("random"), o = e("utils");
        cc.Class({
            extends: cc.Component,
            properties: {
                targetPos: cc.Node,
                startPos: cc.Node,
                moneyPrefabs: [ cc.Prefab ],
                moneyMax: 20,
                moneyMin: 10,
                randRect: cc.rect(100, 100, 40, 40),
                _endPos: cc.v2(0, 0),
                _callback: null,
                _target: null
            },
            start: function() {
                this._pool = new cc.NodePool(), this._random = new n(o.getRandomSeed()), this._randWidth = this.randRect.width / 3, 
                this._randHeight = this.randRect.height / 3, this._randPos = cc.v2(0, 0), this._prefabNum = this.moneyPrefabs.length;
            },
            setFinishCallback: function(e, t) {
                this._callback = e, this._target = t;
            },
            play: function(e) {
                var t = this, i = sd.pf.convertToNodeSpaceAR(this.startPos, this.node);
                if (0 == this._endPos.y && (this._endPos = sd.pf.convertToNodeSpaceAR(this.targetPos, this.node)), 
                i.y >= .4 * cc.winSize.height) this._finish(e); else for (var n = this._random.randomInt(this.moneyMin, this.moneyMax), o = Math.floor(n / 9), s = 0; s < n; s++) {
                    var a = this._getRandomPos(Math.ceil(s / o), this._randPos), r = cc.fadeIn(.05), c = cc.scaleTo(.35, 1), l = cc.moveTo(1, this._endPos.x, this._endPos.y).easing(cc.easeOut(3)), u = cc.scaleTo(1, .6), h = cc.fadeOut(.5), d = cc.spawn(r, c), g = cc.spawn(cc.sequence(cc.delayTime(.5), h), l, u), f = this._pool.get();
                    f || (f = cc.instantiate(this.moneyPrefabs[this._random.randomInt(0, this._prefabNum - 1)])), 
                    f.opacity = 0, f.setPosition(i.x + a.x, i.y + a.y), f.idx = s, f.setScale(.2), f.runAction(cc.sequence(cc.delayTime(this._random.random(.3, .6)), d, g, cc.callFunc(function(i) {
                        t.removeNode(i), i.idx == n - 1 && t._finish(e);
                    }, this))), this.node.addChild(f, 100);
                }
            },
            _getRandomPos: function(e, t) {
                t = t || {};
                var i = this._random.random(0, this._randWidth), n = this._random.random(0, this._randHeight);
                switch (e) {
                  case 0:
                    n += 2 * this._randHeight;
                    break;

                  case 1:
                    i += 2 * this._randWidth, n += 2 * this._randHeight;
                    break;

                  case 2:
                    break;

                  case 3:
                    i += 2 * this._randWidth;
                    break;

                  case 4:
                    n += this._randHeight;
                    break;

                  case 5:
                    i += this._randWidth, n += 2 * this._randHeight;
                    break;

                  case 6:
                    i += 2 * this._randWidth, n += this._randHeight;
                    break;

                  case 7:
                    i += this._randWidth;
                    break;

                  default:
                    i += this._randWidth, n += this._randHeight;
                }
                return t.x = i + this.randRect.x, cc.sys.platform === cc.sys.WECHAT_GAME ? t.x -= this.randRect.width : t.x -= .5 * this.randRect.width, 
                t.y = n + this.randRect.y - .5 * this.randRect.height, t;
            },
            _finish: function(e) {
                sd.pf.doCallBack(this._callback, this._target, e);
            },
            removeNode: function(e) {
                this._pool.put(e);
            }
        }), cc._RF.pop();
    }, {
        random: "random",
        utils: "utils"
    } ],
    moveDlg: [ function(e, t, i) {
        cc._RF.push(t, "55094CDTWNBBaw4lCXUZ0CI", "moveDlg"), cc.Class({
            extends: cc.Component,
            properties: {
                costSprite: cc.Sprite,
                costText: cc.Label,
                rateText1: cc.Label,
                rateText2: cc.Label,
                mapSprite: cc.Sprite
            },
            start: function() {
                this._moveCost = user.getMoveCost(), this.costText.string = bigNumber.closeNumToRealSpecial(this._moveCost), 
                this._isEnough = user.moneyEnough(this._moveCost), this.costSprite.spriteFrame = resManager.getResource("texture/new_ui/banqian" + (this._isEnough ? 5 : 6));
                var e = config.Move.findById(user.info.moveCount);
                if (e) {
                    this.rateText1.string = "X" + (e.moveDouble4 + 1);
                    var t = config.Move.findById(user.info.moveCount + 1);
                    if (t) {
                        var i = this, n = "map/icon/" + gConst.maps[t.moveScene].icon;
                        // var i = this, n = "map/icon/" + gConst.maps[8].icon;
                        console.log("map/icon/",n,gConst.maps);
                        resManager.loadDir(n, function() {
                            i.mapSprite.spriteFrame = resManager.getResource(n);
                        }), this.rateText2.string = "X" + (t.moveDouble4 + 1);
                    } else this.rateText2.string = "X" + (e.moveDouble4 + 1);
                }
            },
            update: function(e) {
                user.moneyEnough(this._moveCost) != this._isEnough && (this.costSprite.spriteFrame = resManager.getResource("texture/new_ui/banqian" + (this._isEnough ? 5 : 6)));
            },
            onMoveCallback: function() {
                user.isMoveCountMax() ? PopLayer.tip("已达到解锁店铺上限") : sd.mainDlg.onMoveMap() ? (this.node.parent.destroy(), 
                popBannerDlg("prefabs/move/moveFlowersDlg")) : PopLayer.tip(gConst.moneyName + "不足");
            },
            onEnable: function(e) {
                moreGamesButtonHide(1)
            },
            onDisable: function(e) {
                moreGamesButtonShow(1)
            }
        }), cc._RF.pop();
    }, {} ],
    moveFlowersDlg: [ function(e, t, i) {
        cc._RF.push(t, "40fe5n21eJJp72yBEz4NigQ", "moveFlowersDlg"), cc.Class({
            extends: cc.Component,
            properties: {
                icon1: cc.Sprite,
                icon2: cc.Sprite,
                name1: cc.Label,
                name2: cc.Label
            },
            start: function() {
                for (var e = config.Move.findById(user.info.moveCount - 1), t = config.Move.findById(user.info.moveCount), i = e.flowerId.length; i < t.flowerId.length; i++) {
                    var n = i - e.flowerId.length + 1, o = t.flowerId[i], s = config.Item.findById(o);
                    this["icon" + n].spriteFrame = resManager.getResource("texture/flowericon/" + s.iconBouquet), 
                    this["name" + n].string = s.desc;
                }
            },
            onDestroy: function() {
                sd.mainDlg.playMoveMoneyEffect();
            },
            onEnable: function(e) {
                moreGamesButtonHide(1)
            },
            onDisable: function(e) {
                moreGamesButtonShow(1)
            }
        }), cc._RF.pop();
    }, {} ],
    musicManager: [ function(e, t, i) {
        cc._RF.push(t, "35c1fqHFY5G7pAF+KQoABQV", "musicManager"), cc.Class({
            extends: cc.Component,
            properties: {
                audioSource: {
                    type: cc.AudioSource,
                    default: null
                }
            },
            onLoad: function() {
                var e = this;
                this.clip = null, cc.game.addPersistRootNode(this.node), cc.loader.loadRes("audio/bgm", cc.AudioClip, function(e, t) {
                    this.clip = t, this.play();
                }.bind(this)), cc.game.on(cc.game.EVENT_SHOW, function() {
                    cc.log("---------------------------"), e.play();
                }), cc.game.on(cc.game.EVENT_HIDE, function() {});
            },
            onEnable: function() {},
            start: function() {},
            play: function() {
                this.clip && cc.audioEngine.playMusic(this.clip, !0);
            },
            pause: function() {
                cc.audioEngine.pauseMusic();
            },
            stop: function() {
                cc.audioEngine.stopMusic();
            }
        }), cc._RF.pop();
    }, {} ],
    openboxitem: [ function(e, t, i) {
        cc._RF.push(t, "337bezP6I9JR4urZJ7bYXP0", "openboxitem"), cc.Class({
            extends: uiBase,
            properties: {},
            updateItem: function(e) {
                var t = this.icon;
                if ("card" == e.type) {
                    var i = config.Item.find(e.id);
                    t.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/flower/" + user.getFlowerRes(e.id)), 
                    (t = this.label).getComponent(cc.Label).string = i.desc + " x " + e.num;
                } else if ("coin" == e.type) {
                    t.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/lixian5"), 
                    t = this.label;
                    var n = user.calcAllFlowerStandOutputSec(!0);
                    e.num = bigNumber.closeNumToRealSpecial(bigNumber.mult(n, e.num)), t.getComponent(cc.Label).string = e.num + gConst.moneyName;
                }
            },
            runFly: function(e, t, i) {
                this.node.scaleX = 0, this.node.scaleY = .3, this.node.runAction(cc.sequence(cc.delayTime(e), cc.spawn(cc.scaleTo(.2, 1), cc.moveTo(.2, t, i).easing(cc.easeOut(3)))));
            }
        }), cc._RF.pop();
    }, {} ],
    openbox: [ function(e, t, i) {
        cc._RF.push(t, "f3394szivBP0Kb84V7jzkWb", "openbox"), cc.Class({
            extends: uiBase,
            properties: {
                _armature: null,
                _armatureDisplay: null,
                id: 0
            },
            onLoad: function() {
                var e = this;
                this._super(), this._armatureDisplay = this.armature.getComponent(dragonBones.ArmatureDisplay), 
                this._armature = this._armatureDisplay.armature(), this.items = [], setTimeout(function() {
                    e.isValid && (e.openBox(), setTimeout(function() {
                        if (e.isValid) {
                            e.showItem();
                            var t = e.piaodai.getComponent(cc.ParticleSystem);
                            t.resetSystem();
                            for (var i = 0; i < 60; i++) t.update(.016);
                            cc.loader.loadRes("audio/kaibaoxiang", cc.AudioClip, function(e, t) {
                                cc.audioEngine.playEffect(t, !1);
                            });
                        }
                    }, 750), e._armatureDisplay.playAnimation("play", 1), e._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, e._animationEventHandler, e));
                }, 100);
            },
            _animationEventHandler: function(e) {
                "play" === e.armature.animation.lastAnimationName && this._armatureDisplay.playAnimation("idle");
            },
            addItem: function(e) {
                for (var t = resManager.getResource("prefabs/openboxitem"), i = 0, n = null; i < e[0].length; i++) n = cc.instantiate(t), 
                this.node.addChild(n), n.getComponent("openboxitem").updateItem(e[0][i]), n.x = this.armature.x, 
                n.y = this.armature.y + 50, n.active = !1, this.items.push(n);
            },
            showItem: function() {
                for (var e = (this.node.width - 206 * this.items.length) / 2, t = null, i = 0; i < this.items.length; i++) (t = this.items[i]).active = !0, 
                t.getComponent("openboxitem").runFly(.2 * i, e + 103 + 206 * i - this.node.width / 2, t.y + 500);
            },
            openBox: function() {
                if (user.getBox(this.id).num) {
                    var e = user.openBox(this.id, 1);
                    gConst.mainEmitter.emit("openBox", this.id), this.addItem(e);
                } else PopLayer.tip("宝箱数量不足！");
            },
            onDestroy: function() {
                this._super(), gConst.mainEmitter.emit("closeOpenBox", this.id);
            }
        }), cc._RF.pop();
    }, {} ],
    pickUpEffect2: [ function(e, t, i) {
        cc._RF.push(t, "457efhVdV1HDJNtjGoMbyPs", "pickUpEffect2");
        var n = e("random"), o = e("utils");
        cc.Class({
            extends: cc.Component,
            properties: {
                prefab: cc.Prefab,
                moneyMax: 20,
                moneyMin: 10,
                randRect: cc.rect(100, 500, 40, 40)
            },
            start: function() {
                this._pool = new cc.NodePool(), this._random = new n(o.getRandomSeed()), this._randWidth = this.randRect.width / 3, 
                this._randHeight = this.randRect.height / 3, this._randPos = cc.v2(0, 0);
                for (var e = 0; e < this.moneyMax; e++) this.removeNode(cc.instantiate(this.prefab));
                sd.pickUpEffect = this;
            },
            setFinishCallback: function(e, t) {
                this._callback = e, this._target = t;
            },
            play: function(e, t, i, n) {
                for (var o = this, s = sd.pf.convertToNodeSpaceAR(t, this.node), a = this._random.randomInt(this.moneyMin, this.moneyMax), r = Math.floor(a / 9), c = 0; c < a; c++) {
                    var l = this._getRandomPos(Math.ceil(c / r), this._randPos), u = cc.fadeIn(.05), h = cc.moveTo(.7, l.x, l.y).easing(cc.easeExponentialOut()), d = cc.scaleTo(.1 * n, n), g = cc.moveTo(1, s.x, s.y).easing(cc.easeIn(5)), f = cc.scaleTo(n, .6 * n), m = cc.spawn(g, f), p = this._pool.get();
                    p || (p = cc.instantiate(this.prefab));
                    var v = cc.spawn(u, d, h).easing(cc.easeIn(3));
                    p.getComponent(cc.Sprite).spriteFrame = i, p.opacity = 0, p.setPosition(l.x, l.y - this.randRect.height), 
                    p.setScale(.2 * n), p.idx = c, p.runAction(cc.sequence(cc.delayTime(this._random.random(.01, .3)), v, m, cc.callFunc(function(e) {
                        o.removeNode(e), e.idx == a - 1 && o._finish();
                    }, this))), this.node.addChild(p, 100);
                }
            },
            _getRandomPos: function(e, t) {
                t = t || {};
                var i = this._random.random(0, this._randWidth), n = this._random.random(0, this._randHeight);
                switch (e) {
                  case 0:
                    n += 2 * this._randHeight;
                    break;

                  case 1:
                    i += 2 * this._randWidth, n += 2 * this._randHeight;
                    break;

                  case 2:
                    break;

                  case 3:
                    i += 2 * this._randWidth;
                    break;

                  case 4:
                    n += this._randHeight;
                    break;

                  case 5:
                    i += this._randWidth, n += 2 * this._randHeight;
                    break;

                  case 6:
                    i += 2 * this._randWidth, n += this._randHeight;
                    break;

                  case 7:
                    i += this._randWidth;
                    break;

                  default:
                    i += this._randWidth, n += this._randHeight;
                }
                return t.x = i + this.randRect.x - .75 * this.randRect.width, t.y = n + this.randRect.y - this.randRect.height, 
                t;
            },
            _finish: function(e) {
                sd.pf.doCallBack(this._callback, this._target, e);
            },
            removeNode: function(e) {
                this._pool.put(e);
            }
        }), cc._RF.pop();
    }, {
        random: "random",
        utils: "utils"
    } ],
    pickUpEffect: [ function(e, t, i) {
        cc._RF.push(t, "0502ficDYBCYphYbuXIJYWO", "pickUpEffect");
        var n = e("random"), o = e("utils");
        cc.Class({
            extends: cc.Component,
            properties: {
                moneyPrefabs: [ cc.Prefab ],
                moneyMax: 20,
                moneyMin: 10,
                randRect: cc.rect(100, 100, 40, 40),
                targetPos: cc.Node,
                showRect: cc.Node,
                _endPos: cc.v2(0, 0),
                _callback: null,
                _target: null
            },
            start: function() {
                this._pool = new cc.NodePool(), this._random = new n(o.getRandomSeed()), this._randWidth = this.randRect.width / 3, 
                this._randHeight = this.randRect.height / 3, this._randPos = cc.v2(0, 0), this._prefabNum = this.moneyPrefabs.length;
            },
            setFinishCallback: function(e, t) {
                this._callback = e, this._target = t;
            },
            play: function(e, t) {
                var i = this, n = sd.pf.convertToNodeSpaceAR(e, this.node);
                if (0 == this._endPos.y && (this._endPos = sd.pf.convertToNodeSpaceAR(this.targetPos, this.node)), 
                this.isShowRect(n.y)) for (var o = this._random.randomInt(this.moneyMin, this.moneyMax), s = Math.floor(o / 9), a = 0; a < o; a++) {
                    var r = this._getRandomPos(Math.ceil(a / s), this._randPos), c = cc.fadeIn(.05), l = cc.moveTo(.7, n.x + r.x, n.y + r.y).easing(cc.easeExponentialIn()), u = cc.scaleTo(.35, 1), h = cc.moveTo(1, this._endPos.x, this._endPos.y).easing(cc.easeOut(3)), d = cc.scaleTo(1, .6), g = cc.fadeOut(.5), f = cc.spawn(c, u, l), m = cc.spawn(cc.sequence(cc.delayTime(.5), g), h, d), p = this._pool.get();
                    p || (p = cc.instantiate(this.moneyPrefabs[this._random.randomInt(0, this._prefabNum - 1)])), 
                    p.opacity = 0, p.setPosition(n.x, n.y), p.idx = a, p.setScale(.2), p.runAction(cc.sequence(cc.delayTime(this._random.random(.3, .6)), f, m, cc.callFunc(function(e) {
                        i.removeNode(e), e.idx == o - 1 && i._finish(t);
                    }, this))), this.node.addChild(p, 100);
                } else this._finish(t);
            },
            _getRandomPos: function(e, t) {
                t = t || {};
                var i = this._random.random(0, this._randWidth), n = this._random.random(0, this._randHeight);
                switch (e) {
                  case 0:
                    n += 2 * this._randHeight;
                    break;

                  case 1:
                    i += 2 * this._randWidth, n += 2 * this._randHeight;
                    break;

                  case 2:
                    break;

                  case 3:
                    i += 2 * this._randWidth;
                    break;

                  case 4:
                    n += this._randHeight;
                    break;

                  case 5:
                    i += this._randWidth, n += 2 * this._randHeight;
                    break;

                  case 6:
                    i += 2 * this._randWidth, n += this._randHeight;
                    break;

                  case 7:
                    i += this._randWidth;
                    break;

                  default:
                    i += this._randWidth, n += this._randHeight;
                }
                return t.x = i + this.randRect.x, t.x -= .5 * this.randRect.width, t.y = n + this.randRect.y - .5 * this.randRect.height, 
                t;
            },
            _finish: function(e) {
                sd.pf.doCallBack(this._callback, this._target, e);
            },
            removeNode: function(e) {
                this._pool.put(e);
            },
            isShowRect: function(e) {
                var t = this.showRect.y - this.showRect.height * this.showRect.anchorY, i = this.showRect.y + this.showRect.height * this.showRect.anchorY;
                return e >= t && e <= i;
            }
        }), cc._RF.pop();
    }, {
        random: "random",
        utils: "utils"
    } ],
    "pomelo-client": [ function(e, t, i) {
        cc._RF.push(t, "cc8cfqj5oNNYZoCz8GT1BKq", "pomelo-client");
        var n = e("./protocol"), o = n.Package, s = n.Message, a = e("emitter"), r = cc.sys.localStorage;
        "function" != typeof Object.create && (Object.create = function(e) {
            function t() {}
            return t.prototype = e, new t();
        }), t.exports = function(e) {
            var t = "dicts" + (e = e || "all"), i = Object.create(a.prototype), c = null, l = 0, u = 0, h = {}, d = {}, g = {}, f = {}, m = {}, p = {}, v = 0, y = null, C = 0, b = 0, w = 0, _ = null, T = null, N = null, S = null, k = null, x = {
                sys: {
                    type: "js-websocket",
                    version: "0.0.1",
                    rsa: {}
                },
                user: {}
            }, M = null, B = WebSocket;
            i.init = function(e, t) {
                M = t;
                var i = e.host, n = e.port;
                e.socketIns && (B = e.socketIns), k = e.encode || I, S = e.decode || F;
                var o = "ws://" + i;
                cc.sys.platform === cc.sys.WECHAT_GAME && (o = "wss://" + i), n && (o += ":" + n), 
                x.user = e.user, N = e.handshakeCallback, R(o, t);
            };
            var F = i.decode = function(e) {
                var t = s.decode(e);
                if (!(t.id > 0) || (t.route = g[t.id], delete g[t.id], t.route)) return t.body = W(t), 
                t;
            }, I = i.encode = function(e, t, i) {
                var o = e ? s.TYPE_REQUEST : s.TYPE_NOTIFY;
                i = n.strencode(JSON.stringify(i));
                var a = 0;
                return f && f[t] && (t = f[t], a = 1), s.encode(e, o, a, t, i);
            }, R = function(e, s) {
                var a = ++l;
                console.log("connect to " + e, s);
                var u = r.getItem(t);
                if (u && !y) {
                    var h = JSON.parse(u);
                    for (var d in y = h.version, m = {}, f = h) m[f[d]] = d;
                }
                x.sys.protoVersion = v, x.sys.dictVersion = y, (c = new B(e)).binaryType = "arraybuffer", 
                c.onopen = function(e) {
                    var t = o.encode(o.TYPE_HANDSHAKE, n.strencode(JSON.stringify(x)));
                    A(t);
                }, c.onmessage = function(e) {
                    P(o.decode(e.data), s), b && (w = Date.now() + b);
                }, c.onerror = function(e) {
                    l == a && (i.emit("io-error", e), i.emit("disconnect", e), console.error("socket error: ", e), 
                    D());
                }, c.onclose = function(e) {
                    l == a && (i.emit("close", e), i.emit("disconnect", e), console.error("socket close: ", e), 
                    D());
                };
            }, D = function() {
                var e = [];
                for (var t in h) {
                    var n = h[t];
                    e.push({
                        route: g[t],
                        msg: n.__sendMsg__,
                        cb: n
                    });
                }
                h = {}, g = {}, c = null, T && (clearTimeout(T), T = null), _ && (clearTimeout(_), 
                _ = null), e.length > 0 && i.emit("request-error", e);
            };
            i.disconnect = function() {
                c && (c.disconnect && c.disconnect(), c.close && c.close(), console.log("disconnect", new Error().stack), 
                c = null, i.emit("disconnect")), _ && (clearTimeout(_), _ = null), T && (clearTimeout(T), 
                T = null);
            }, i.isDisconnect = function() {
                return !c;
            }, i.request = function(e, t, n, o) {
                if (2 === arguments.length && "function" == typeof t ? (n = t, t = {}) : t = t || {}, 
                e = e || t.route) if (c && 1 == c.readyState) {
                    cc.log("发送请求:", e, t), L(++u, e, t), h[u] = n;
                    var s = u, a = setTimeout(function() {
                        if (h[s]) {
                            cc.log("请求超时了，进行重新连接:" + s, a, e, t), i.disconnect();
                            var n = [];
                            for (var o in h) {
                                var r = h[o];
                                n.push({
                                    route: g[o],
                                    msg: r.__sendMsg__,
                                    cb: r
                                });
                            }
                            h = {}, n.length > 0 && i.emit("request-error", n);
                        }
                    }, 1e4);
                    n.__sendMsg__ = t, g[u] = e;
                } else o || i.emit("request-error", [ {
                    route: e,
                    msg: t,
                    cb: n
                } ], !0);
            }, i.notify = function(e, t) {
                c && 1 == c.readyState && L(0, e, t = t || {});
            };
            var L = function(e, t, i) {
                k && (i = k(e, t, i));
                var n = o.encode(o.TYPE_DATA, i);
                A(n);
            }, A = function(e) {
                c.send(e.buffer);
            }, E = function e() {
                var t = w - Date.now();
                t > 100 ? T = setTimeout(e, t) : (console.error("server heartbeat timeout"), i.emit("heartbeat timeout"), 
                i.disconnect());
            };
            d[o.TYPE_HANDSHAKE] = function(e) {
                if (501 !== (e = JSON.parse(n.strdecode(e))).code) if (200 === e.code) {
                    H(e);
                    var t = o.encode(o.TYPE_HANDSHAKE_ACK);
                    A(t), M && (M(c), M = null);
                } else i.emit("error", "handshake fail"); else i.emit("error", "client version not fullfill");
            }, d[o.TYPE_HEARTBEAT] = function(e) {
                if (C) {
                    var t = o.encode(o.TYPE_HEARTBEAT);
                    T && (clearTimeout(T), T = null), _ || (_ = setTimeout(function() {
                        _ = null, A(t), w = Date.now() + b, T = setTimeout(E, b);
                    }, C));
                }
            }, d[o.TYPE_DATA] = function(e) {
                var t = e;
                S && (t = S(t)), U(i, t);
            }, d[o.TYPE_KICK] = function(e) {
                e = JSON.parse(n.strdecode(e)), i.emit("onKick", e);
            };
            var P = function(e) {
                if (Array.isArray(e)) for (var t = 0; t < e.length; t++) {
                    var i = e[t];
                    d[i.type](i.body);
                } else d[e.type](e.body);
            }, U = function(e, t) {
                if (!t.id) return cc.log("接收到通知:", t.route, t.body), void e.emit(t.route, t.body);
                var i = h[t.id];  console.log('i', i)
                delete h[t.id], "function" == typeof i && (cc.log("接收到返回包:", t.route, t.body), i(t.body));
            }, W = function(e) {
                var t = e.route;
                if (e.compressRoute) {
                    if (!m[t]) return {};
                    t = e.route = m[t];
                }
                if (p && p[t]) return protobuf.decode(t, e.body);
                if (!i.notGzipRoute || !i.notGzipRoute[t]) {
                    var o = new Zlib.Inflate(e.body).decompress();
                    return o = n.strdecode(o), JSON.parse(o);
                }
                return JSON.parse(n.strdecode(e.body));
            }, H = function(e) {
                e.sys && e.sys.heartbeat ? (C = 1e3 * e.sys.heartbeat, b = 2 * C) : (C = 0, b = 0), 
                O(e), "function" == typeof N && N(e.user);
            }, O = function(e) {
                if (e && e.sys) {
                    var i = e.sys.dict, n = e.sys.protos;
                    if (e.sys.useDict || (f = {}), i) for (var o in f = i, y = e.sys.dictVersion, i.version = y, 
                    r.setItem(t, JSON.stringify(f)), m = {}, f) m[f[o]] = o;
                    e.sys.useProto || (p = {}), n && (v = n.version || 0, p = n.server || {}, n.client, 
                    protobuf && protobuf.init({
                        encoderProtos: n.client,
                        decoderProtos: n.server
                    }), window.localStorage.setItem("protos", JSON.stringify(n)));
                }
            };
            return i;
        }, cc._RF.pop();
    }, {
        "./protocol": "protocol",
        emitter: "emitter"
    } ],
    popBannerDlg: [ function(e, t, i) {
        // console.log("e, t, i",e, t, i);
        cc._RF.push(t, "23e507xQbBGhIkBMfyVrK+/", "popBannerDlg"), window.popBannerDlg = function(e, t, i, n, o, s) {
            // console.log("e, t, i, n, o, s",e, t, i, n, o, s);
            t = t || gConst.popBannerZindex, utils.isString(e) && (e = resManager.getResource(e));
            var a = null, r = new cc.Node(), c = null;
            if (c = utils.isFunction(e) ? e() : cc.instantiate(e)) {
                c.myDestroy = function() {
                    m && channel.hideBannerBottom2(n), c._closeFunc && sd.pf.doCallBack(c._closeFunc), 
                    r.destroy();
                }, c.bannerUi = r;
                var l = cc.director.getScene().getChildByName("Canvas"), u = cc.instantiate(resManager.getResource("prefabs/frameMask"));
                l.addChild(r, t), r.setContentSize(l.getContentSize()), r.addChild(u), pressButtonDeal(u, function() {});
                var h = channel.bannerHeight, d = 32;
                r.addChild(c), i || (a = cc.instantiate(resManager.getResource("prefabs/public/guanbi")), 
                r.addChild(a), a.active = !1,sd.mainDlg.scheduleOnce(function(){a.active = !0},2),d = a.getContentSize().height, a.y = h - cc.winSize.height / 2 + d / 2 + 32), 
                void 0 == s && (s = c.getContentSize().height);
                var g = c.getContentSize().width, f = c.getChildByName("bg");
                f && (s || (s = f.getContentSize().height), g && (g = f.getContentSize().width));
                var m = !1, p = function() {
                    c.myDestroy();
                };
                if (a && pressButtonDeal(a, p), 1 === i && pressButtonDeal(u, p), utils.isString(n) || null == n) {
                    c.y = (h + d + 32) / 2;
                    var v = c.y + s / 2 - cc.winSize.height / 2;
                    v > 0 && (h -= 2 * v, a && (a.y -= 2 * v), c.y -= v), v + 150 > 0 && (c.y = Math.max(-cc.winSize.height / 2 + s / 2 + d + 32 + h, cc.winSize.height / 2 - s / 2 - 150)), 
                    o && o(c, cc.winSize.height - s - d - 32 - h), v < 20 && utils.isString(n) && (m = !0, 
                    channel.showBannerBottom2(function(e) {
                        a && (a.y = Math.max(e - cc.winSize.height / 2 + d / 2 + 32, a.y), channel.isIphoneX() || (a.y = e - cc.winSize.height / 2 + d / 2 + 32));
                    }, Math.min(cc.winSize.height - s - d - 32, channel.bannerHeight), n));
                } else o && o(c, cc.winSize.height - s - d - 32 - 130);
                return c;
            }
        }, cc._RF.pop();
    }, {} ],
    popLayer: [ function(e, t, i) {
        cc._RF.push(t, "9ba0amQJlxKrL616QFDn+mv", "popLayer"), window.PopLayer = {
            create: function(e, t, i, n, o, s) {
                return "function" == typeof n ? this.createTwo(e, t, i, n, o, s) : this.createOne(e, t, i, n);
            },
            createOne: function(e, t, i, n) {
                var o = popBannerDlg("prefabs/public/pop_one", gConst.popZindex, !0, !0);
                o.getChildByName("label").getComponent(cc.Label).string = t;
                var s = o.getChildByName("queding");
                n && (s.getChildByName("Label").getComponent(cc.Label).string = n), s.on(cc.Node.EventType.TOUCH_END, function(e) {
                    o.bannerUi.destroy(), i();
                });
            },
            createTwo: function(e, t, i, n, o, s) {
                var a = popBannerDlg("prefabs/public/pop_two", gConst.popZindex, !0, !0);
                a.getChildByName("label").getComponent(cc.Label).string = t;
                var r = a.getChildByName("queding");
                o && (r.getChildByName("Label").getComponent(cc.Label).string = o), r.on(cc.Node.EventType.TOUCH_END, function(e) {
                    a.bannerUi.destroy(), i();
                });
                var c = a.getChildByName("quxiao");
                s && (c.getChildByName("Label").getComponent(cc.Label).string = s), c.on(cc.Node.EventType.TOUCH_END, function(e) {
                    a.bannerUi.destroy(), n();
                });
            },
            createMoneyAdd: function(e) {
                popBannerDlg("prefabs/public/tanchu").getChildByName("money").getComponent(cc.Label).string = bigNumber.closeNumToRealSpecial(e);
            },
            tips: [],
            curZindex: 0,
            tip: function(e) {
                var t, i = this;
                if (this.tips.length) {
                    if (t = this.tips[0], this.tips.splice(0, 1), t.getParent() != cc.director.getScene().getChildByName("Canvas")) return void this.tip(e);
                    t.active = !0, t.setPosition(0, 0);
                } else t = cc.instantiate(resManager.getResource("prefabs/public/tips")), cc.director.getScene().getChildByName("Canvas").addChild(t);
                t.zIndex = gConst.popZindex + this.curZindex % 1e4, this.curZindex++;
                var n = t.getChildByName("desc");
                n.opacity = 255, t.opacity = 255, n.getComponent(cc.Label).string = e, n.runAction(cc.sequence(cc.fadeIn(.5), cc.delayTime(1.2), cc.fadeOut(.1))), 
                t.runAction(cc.sequence(cc.fadeIn(.5), cc.delayTime(1.2), cc.fadeOut(.1))), t.runAction(cc.sequence(cc.moveBy(.5, cc.v2(0, 100)), cc.delayTime(1.3), cc.callFunc(function() {
                    t.active = !1, i.tips.push(t);
                }, t)));
            }
        }, cc._RF.pop();
    }, {} ],
    pressButtonDeal: [ function(e, t, i) {
        cc._RF.push(t, "577aa/RP4tCGqmbUPjbEeCS", "pressButtonDeal"), window.pressButtonDeal = function(e, t) {
            e.on(cc.Node.EventType.TOUCH_END, function(e) {
                t();
            });
        }, cc._RF.pop();
    }, {} ],
    protocol: [ function(e, t, i) {
        cc._RF.push(t, "8bcd1QIbzhDSre3ZtjyteT5", "protocol");
        var n = {}, o = n.Package = {}, s = n.Message = {}, a = Uint8Array;
        o.TYPE_HANDSHAKE = 1, o.TYPE_HANDSHAKE_ACK = 2, o.TYPE_HEARTBEAT = 3, o.TYPE_DATA = 4, 
        o.TYPE_KICK = 5, s.TYPE_REQUEST = 0, s.TYPE_NOTIFY = 1, s.TYPE_RESPONSE = 2, s.TYPE_PUSH = 3, 
        n.strencode = function(e) {
            for (var t = new a(3 * e.length), i = 0, n = 0; n < e.length; n++) {
                var o = e.charCodeAt(n), s = null;
                s = o <= 127 ? [ o ] : o <= 2047 ? [ 192 | o >> 6, 128 | 63 & o ] : [ 224 | o >> 12, 128 | (4032 & o) >> 6, 128 | 63 & o ];
                for (var c = 0; c < s.length; c++) t[i] = s[c], ++i;
            }
            var l = new a(i);
            return r(l, 0, t, 0, i), l;
        }, n.strdecode = function(e) {
            for (var t, i = "", n = [], o = 0, s = 0, r = (t = e.length ? e : new a(e)).length; o < r; ) t[o] < 128 ? (s = t[o], 
            o += 1) : t[o] < 224 ? (s = ((63 & t[o]) << 6) + (63 & t[o + 1]), o += 2) : (s = ((15 & t[o]) << 12) + ((63 & t[o + 1]) << 6) + (63 & t[o + 2]), 
            o += 3), n.push(s), n.length > 1e4 && (i += String.fromCharCode.apply(null, n), 
            n = []);
            return n.length && (i += String.fromCharCode.apply(null, n)), i;
        }, o.encode = function(e, t) {
            var i = t ? t.length : 0, n = new a(4 + i), o = 0;
            return n[o++] = 255 & e, n[o++] = i >> 16 & 255, n[o++] = i >> 8 & 255, n[o++] = 255 & i, 
            t && r(n, o, t, 0, i), n;
        }, o.decode = function(e) {
            var t, i = 0;
            t = e.length ? e : new a(e);
            for (var n = 0, o = []; i < t.length; ) {
                var s = t[i++], c = (n = (t[i++] << 16 | t[i++] << 8 | t[i++]) >>> 0) ? new a(n) : null;
                r(c, 0, t, i, n), i += n, o.push({
                    type: s,
                    body: c
                });
            }
            return 1 === o.length ? o[0] : o;
        }, s.encode = function(e, t, i, o, s) {
            var r = 1 + (c(t) ? u(e) : 0);
            if (l(t)) if (i) {
                if ("number" != typeof o) throw new Error("error flag for number route!");
                r += 2;
            } else if (r += 1, o) {
                if ((o = n.strencode(o)).length > 255) throw new Error("route maxlength is overflow");
                r += o.length;
            }
            s && (r += s.length);
            var m = new a(r), p = 0;
            return p = h(t, i, m, p), c(t) && (p = d(e, m, p)), l(t) && (p = g(i, o, m, p)), 
            s && (p = f(s, m, p)), m;
        }, s.decode = function(e) {
            var t, i = (t = e.length ? e : new a(e)).length || t.byteLength, o = 0, s = 0, u = null, h = t[o++], d = 1 & h, g = h >> 1 & 7;
            if (c(g)) {
                var f = parseInt(t[o]), m = 0;
                do {
                    s += (127 & (f = parseInt(t[o]))) * Math.pow(2, 7 * m), o++, m++;
                } while (f >= 128);
            }
            if (l(g)) if (d) u = t[o++] << 8 | t[o++]; else {
                var p = t[o++];
                p ? (u = new a(p), r(u, 0, t, o, p), u = n.strdecode(u)) : u = "", o += p;
            }
            var v = i - o, y = new a(v);
            return r(y, 0, t, o, v), {
                id: s,
                type: g,
                compressRoute: d,
                route: u,
                body: y
            };
        };
        var r = function(e, t, i, n, o) {
            if ("function" == typeof i.copy) i.copy(e, t, n, n + o); else for (var s = 0; s < o; s++) e[t++] = i[n++];
        }, c = function(e) {
            return e === s.TYPE_REQUEST || e === s.TYPE_RESPONSE;
        }, l = function(e) {
            return e === s.TYPE_REQUEST || e === s.TYPE_NOTIFY || e === s.TYPE_PUSH;
        }, u = function(e) {
            var t = 0;
            do {
                t += 1, e >>= 7;
            } while (e > 0);
            return t;
        }, h = function(e, t, i, n) {
            if (e !== s.TYPE_REQUEST && e !== s.TYPE_NOTIFY && e !== s.TYPE_RESPONSE && e !== s.TYPE_PUSH) throw new Error("unkonw message type: " + e);
            return i[n] = e << 1 | (t ? 1 : 0), n + 1;
        }, d = function(e, t, i) {
            do {
                var n = e % 128, o = Math.floor(e / 128);
                0 !== o && (n += 128), t[i++] = n, e = o;
            } while (0 !== e);
            return i;
        }, g = function(e, t, i, n) {
            if (e) {
                if (t > 65535) throw new Error("route number is overflow");
                i[n++] = t >> 8 & 255, i[n++] = 255 & t;
            } else t ? (i[n++] = 255 & t.length, r(i, n, t, 0, t.length), n += t.length) : i[n++] = 0;
            return n;
        }, f = function(e, t, i) {
            return r(t, i, e, 0, e.length), i + e.length;
        };
        window.Protocol = n, t.exports = n, cc._RF.pop();
    }, {} ],
    randomEvent: [ function(e, t, i) {
        cc._RF.push(t, "2e0dbRz+oRD1LNgq2KK1rXL", "randomEvent"), cc.Class({
            extends: cc.Component,
            properties: {},
            addReward: function() {
                var e = config.RandomEvent.find(1), t = popBannerDlg("prefabs/public/tanchu", null, null, window.bannerids[2]).getComponent("tanchu"), i = gConst.random.randomInt(1, e.random[this.randomIndex]);
                console.log("addReward+++++++++++++++++++++++",this.randomIndex,e);
                var liveCb = this.node.liveCb,isLuping = true;
                if(this.node.isLuping() == 2){
                    isLuping = false;
                }else if(this.node.isLuping() == 0){
                    liveCb = null,isLuping = false;
                }
                switch (e.style[this.randomIndex]) {
                  case 1:
                    var n = e.reward[this.randomIndex];
                    n = bigNumber.mult(n, i), user.addCoin(n), t.show(resManager.getResource("prefabs/wheel/wheelgold1"), n + gConst.moneyUnit2 + gConst.moneyName2, "获得" + gConst.moneyName2, function() {
                        user.addCoin(n), t.refresh(2 * n + gConst.moneyUnit2 + gConst.moneyName2, "获得" + gConst.moneyName2);
                    }, 1,liveCb,isLuping);
                    break;

                  case 2:
                    var o = bigNumber.mult(user.getAllStandAddMoney(), e.reward[this.randomIndex]);
                    "0" == o && (o = bigNumber.mult(config.Parterre.find(1).produceSpeed1, config.Item.find(1).chosePrice[0])), 
                    o = bigNumber.mult(o, i), user.addMoney(o), t.show(resManager.getResource("prefabs/wheel/wheelmoney1"), bigNumber.closeNumToRealSpecial(o) + gConst.moneyUnit + gConst.moneyName, "获得" + gConst.moneyName, function() {
                        user.addMoney(o), t.refresh(bigNumber.closeNumToRealSpecial(bigNumber.mult(o, 2)) + gConst.moneyUnit + gConst.moneyName, "获得" + gConst.moneyName);
                    }, 0,liveCb,isLuping);
                    break;

                  case 3:
                    n = e.reward[this.randomIndex], n = Math.floor(n * i), user.addBox(100, n), t.show(resManager.getResource("prefabs/wheel/wheelbox1"), n + "个宝箱", "获得宝箱", function() {
                        user.addBox(100, n), t.refresh(2 * n + "个宝箱", "获得宝箱");
                    },null,liveCb,isLuping);
                    break;

                  case 4:
                    var s = 6e4 * (n = e.reward[this.randomIndex]) * i;
                    user.addRandomEventTime(s), t.show(resManager.getResource("prefabs/wheel/wheelDouble"), n + "分钟仓库运输总量双倍", "运输总量双倍", function() {
                        user.addRandomEventTime(s), t.refresh(2 * n + "分钟仓库运输总量双倍", "运输总量双倍");
                    },null,liveCb,isLuping);
                    break;

                  case 5:
                    n = e.reward[this.randomIndex], n = bigNumber.mult(n, i), user.addMoney2(n), t.show(resManager.getResource("prefabs/wheel/wheelbox1"), bigNumber.closeNumToRealSpecial(n) + gConst.money2Unit + gConst.money2Name, "获得" + gConst.money2Name, function() {
                        user.addMoney2(n), t.refresh(bigNumber.closeNumToRealSpecial(bigNumber.mult(n, 2)) + gConst.money2Unit + gConst.money2Name, "获得" + gConst.money2Name);
                    }, 2,liveCb,isLuping);
                }
                user.addRandomEventTimes(1), user.countTaskNum(9, 1), this.node.destroyCb(), this.node.destroy();
            },
            start: function() {
                console.log("randomEvent start")
                var e = this, t = config.RandomEvent.find(1);
                this.randomIndex = gConst.random.getArrayRand(t.weight), this.aniNum = 5, this.hasAniNum = 0;
                var i = this.node.getChildByName("hua");
                i.zIndex = gConst.getZindexFromY(-1e4);
                for (var n = 1; n <= this.aniNum; ++n) {
                    var o, s;
                    !function(t) {
                        o = gConst.random.randomInt(1, 4) + "", s = e.node.getChildByName(o).getChildByName("animation"), 
                        e["ani" + t] = cc.instantiate(s);
                        var i = e["ani" + t], n = e.node.getChildByName(t + "");
                        n.addChild(i), n.zIndex = gConst.getZindexFromY(n.y);
                        var a = cc.instantiate(e.node.getChildByName("tx"));
                        n.addChild(a);
                        var r = i.getComponent(dragonBones.ArmatureDisplay);
                        r.playAnimation("run", 0), n.on(cc.Node.EventType.TOUCH_START, function() {
                            if (!n.hasDie) {
                                cc.loader.loadRes("audio/dachongzi", cc.AudioClip, function(e, t) {
                                    cc.audioEngine.playEffect(t, !1);
                                }), a.active = !0;
                                var t = a.getComponent(dragonBones.ArmatureDisplay);
                                t.playAnimation("hurt", 1), t.scheduleOnce(function() {
                                    a.destroy();
                                }, .27), n.stopAllActions(), n.hasDie = !0, r.playAnimation("hur", 1), r.scheduleOnce(function() {
                                    n.destroy();
                                }, .6), e.hasAniNum--, 0 == e.hasAniNum && e.addReward();
                            }
                        }), n.setScale(1.7, 1.7), n.runAction(cc.repeatForever(cc.sequence(cc.moveBy(8, 2e3, 0), cc.callFunc(function() {
                            n.setScale(-1.7, 1.7), a.setScale(-1, 1);
                        }, n), cc.moveBy(8, -2e3, 0), cc.callFunc(function() {
                            n.setScale(1.7, 1.7), a.setScale(1, 1);
                        }, n)))), e.hasAniNum++;
                    }(n);
                }
                for (i.runAction(cc.repeatForever(cc.sequence(cc.moveBy(8, 2e3, 0), cc.moveBy(8, -2e3, 0)))), 
                n = 1; n <= this.aniNum; ++n) this.node.getChildByName(n + "").getChildByName("animation").destroy();
            }
        }), cc._RF.pop();
    }, {} ],
    random: [ function(e, t, i) {
        cc._RF.push(t, "700d8v3j6JD1oMNTj2rplNE", "random");
        var n = function(e, t, i, n) {
            this.seed = e, this.initSeed = e, this.a = t || 214013, this.c = i || 2531011, this.m = n || 4294967296, 
            this.randomNum = 0;
        };
        n.prototype.getRandom = function() {
            return this.random2 || (this.random2 = this.random.bind(this)), this.random2;
        }, n.prototype.random = function(e, t) {
            if (e = void 0 == e ? 0 : e, t = void 0 == t ? 1 : t, ++this.randomNum, e === t) return e;
            if (e > t) {
                var i = e;
                e = t, t = i;
            }
            return this.seed = (this.seed * this.a + this.c) % this.m, this.seed / this.m * (t - e) + e;
        }, n.prototype.randomInt = function(e, t) {
            if (e === t) return e;
            if (e > t) {
                var i = e;
                e = t, t = i;
            }
            return Math.floor(this.random() * (t - e + 1)) % (t - e + 1) + e;
        }, n.prototype.randomOcced = function(e) {
            return !!e && this.random() <= e;
        }, n.prototype.getArrayRand = function(e) {
            for (var t = 0, i = 0, n = e.length; i < n; ++i) t += e[i];
            var o = this.random() * t, s = 0;
            for (n = e.length; s < n; ++s) {
                if (o <= e[s]) return Number(s);
                o -= e[s];
            }
            return 0;
        }, n.prototype.noRepeatRandom = function(e, t, i) {
            if (i = i || [], e + 1 > 5 * t) if (1 == t) i.push(this.randomInt(0, e)); else for (var n = {}, o = 0; o < t; ++o) {
                var s;
                do {
                    s = this.randomInt(0, e);
                } while (n[s]);
                n[s] = !0, i.push(s);
            }
            return i;
        }, n.prototype.arrayNoRepeatRandom = function(e, t, i) {
            if (i = i || [], e.length > 5 * t) {
                for (var n = {}, o = 0; o < t; ++o) {
                    do {
                        r = this.randomInt(0, e.length - 1);
                    } while (n[r]);
                    n[r] = !0, i.push(e[r]);
                }
                return i;
            }
            if (e.length == t) return e;
            for (var s = [], a = (o = 0, e.length); o < a; ++o) s.push(e[o]);
            for (o = 0; o < t && 0 != s.length; ++o) {
                var r = this.randomInt(0, s.length - 1);
                i.push(s[r]), s.splice(r, 1);
            }
            return i;
        }, n.prototype.getCheckRandomMd5 = function() {
            return this.randomInt(1, 1e8), Math.floor(this.randomInt(1, 1e8) / 5.7659922261);
        }, t.exports = n, cc._RF.pop();
    }, {} ],
    rankDlg: [ function(e, t, i) {
        cc._RF.push(t, "32f4bJ/F5NEJpHC9LhpgGet", "rankDlg"), cc.Class({
            extends: cc.Component,
            properties: {
                listview: cc.Node,
                editview: cc.EditBox
            },
            start: function() {
                var t = this, i = new e("wxRank"), n = this.listview;
                this.r = new i(n), pressButtonDeal(this.node.getChildByName("guanbi"), function() {
                    t.node.myDestroy();
                }), pressButtonDeal(this.node.getChildByName("baocun"), function() {
                    var e = t.editview.string;
                    e ? pomelo.request("scene.playerHandler.getWords", {
                        str: e
                    }, function(i) {
                        200 == i.code && (i.isPingbi ? PopLayer.tip("不能含有非法字符！") : (t.r.postDescMessage(e), 
                        PopLayer.tip("发表成功！"), t.editview.string = ""));
                    }) : PopLayer.tip("请输入你想说的话！");
                });
                var o = this.node.getChildByName("fen");
                user.needInvite() || (o.active = !1), pressButtonDeal(o, function() {
                    channel.share(function() {}, function() {});
                });
            },
            update: function(e) {
                this.r.update(e), this.r.setSpriteWidth(this.listview.width), this.r.setSpriteHeight(this.listview.height);
            },
            onEnable: function(e) {
                moreGamesButtonHide(1)
            },
            onDisable: function(e) {
                moreGamesButtonShow(1)
            }
        }), cc._RF.pop();
    }, {} ],
    resourceManager: [ function(e, t, i) {
        cc._RF.push(t, "2ca80F+eFRDZ6aoK5+UFD1f", "resourceManager");
        var n = {}, o = {}, s = {
            addResource: function(e, t) {
                // console.log("addResource",e)
                n[e], n[e] = t;
            },
            getResource: function(e, t) {
                return n[e];
            },
            createAnimation: function(e) {
                var t = n["animation/" + e + "/" + e + "_ske.json"], i = n["animation/" + e + "/" + e + "_tex.json"];
                if (!t || !i) throw "动画:" + e + "不存在";
                var o = new cc.Node(), s = o.addComponent(dragonBones.ArmatureDisplay);
                return s.dragonAsset = t, s.dragonAtlasAsset = i, s.armatureName = e, o;
            },
            instantiate: function(e) {
                return cc.instantiate(n[e]);
            },
            loadDir: function(e, t) {
                if (o[e]) t(); else {
                    WaitNetLayer.pop();
                    !function i() {
                        cc.loader.loadResDir(e, function(e, t) {}, function(n, s, a) {
                            n ? setTimeout(function() {
                                i();
                            }, 300) : (a.forEach(function(e, t) {
                                resManager.addResource(e, s[t]);
                            }), o[e] = !0, WaitNetLayer.hide(), t());
                        });
                    }();
                }
            }
        };
        window.resManager = s, t.exports = s, cc._RF.pop();
    }, {} ],
    roleUI: [ function(e, t, i) {
        cc._RF.push(t, "ac738W9N0BM5qqWvd0jxZHP", "roleUI");
        var n = e("utils");
        cc.Class({
            extends: cc.Component,
            properties: {
                displayNode1: cc.Node,
                displayNode2: cc.Node,
                isSendType: !0,
                progress: cc.ProgressBar,
                actionAni: cc.Animation,
                textLabel: cc.RichText,
                _pos1: cc.v2(0, 0),
                _pos2: cc.v2(0, 0),
                _pNormalize: cc.v2(0, 0),
                _destY: 0,
                _state: 0,
                _idleTime: 1,
                _workerIdx: -1,
                _roleIdx: 0
            },
            onLoad: function() {
                this._display1 = this.displayNode1.getComponent(dragonBones.ArmatureDisplay), this._display2 = this.displayNode2.getComponent(dragonBones.ArmatureDisplay), 
                this._actionSprite = this.actionAni.node.getComponent(cc.Sprite), this.isSendType && (this._materialUi = this.actionAni.getComponent("materialUI")), 
                this._state = 0;
            },
            start: function() {
                this.playAnimation("idle", 1), this._timeScale = 1, this._initSpeed = 160, this._curSpeed = this._initSpeed;
            },
            initPos: function(e, t, i, o) {
                this.node.setPosition(e, t), this._pos1.x = e, this._pos1.y = t, this._pos2.x = i, 
                this._pos2.y = o;
                var s = n.getDistance(this._pos1, this._pos2);
                this._pNormalize.x = (i - e) / s, this._pNormalize.y = (o - t) / s;
            },
            isFree: function() {
                return 0 == this._state;
            },
            startAction: function(e, t) {
                var i = this;
                return 0 == this._state && (this._workerIdx = t, this._destY = e, this.setIdleState(function() {
                    i.isSendType ? (i._sendAdd = "0", i.playAnimation("songhua1", 1), i.setIdleState(function() {
                        i.playAnimation("run", 1), i._state = 1, i.actionAni.node.active = !1, i._sendAdd = user.getWarehouseAdd(), 
                        i.setTextVale(i._sendAdd);
                    }, 1.6, !0), i.actionAni.node.active = !0, i._animaState = i.actionAni.play("songhua1"), 
                    i._animaState.speed = i._timeScale, i._animaState.repeatCount = 2) : (i._collectMoney = "0", 
                    i.playAnimation("run", 1), i._state = 1);
                }, sd.mainDlg._random.random(.1, .2)), this.updateFlower(), !0);
            },
            updateFlower: function() {
                var e = user.getFlowerStand(this._workerIdx);
                if (e) {
                    var t = config.Item.findById(e.flowerId);
                    if (t) if (this.isSendType) this._materialUi.updateMaterials(t.toyMaterial); else {
                        if (t.iconFlower == this._iconName) return;
                        this._iconName = t.iconFlower, this._actionSprite.spriteFrame = resManager.getResource("texture/flowericon/" + this._iconName);
                    }
                }
            },
            setIdleState: function(e, t, i) {
                this._state = 5, this._idleTime = t, this._idleFunc = e, this._isShowProgress = i, 
                i && (this.textLabel.node.active = !1, this.progress.node.active = !0, this.progress.progress = 0, 
                this.progress.totalTime = t);
            },
            performWithDelay: function(e, t) {
                this._delayEvent = e, this._delayTime = t;
            },
            setTextVale: function(e) {
                if ("0" != e) {
                    var t = bigNumber.closeNumToRealSpecial(e);
                    if (!this.isSendType) {
                        var i = user.getMoveAndMallRatio();
                        i > 1 && (t += "<color=#FFCE39> <size=24>x" + i + "</size></color>");
                    }
                    this.textLabel.string = t, this.textLabel.node.active = !0;
                } else this.textLabel.node.active = !1;
            },
            onCompleteAction: function() {
                this.displayNode1.active = !0, this.displayNode2.active = !1, this.playAnimation("idle", 1) && (this._display1.timeScale = this._timeScale), 
                this._state = 0, sd.mainDlg.onCompleteRoleAction(this._roleIdx, this._workerIdx, this.isSendType);
            },
            updateData: function(e) {
                var t = this;
                if (this._delayEvent && (this._delayTime -= e * this._timeScale, this._delayTime <= 0 && (this._delayTime = 0, 
                sd.pf.doCallBack(this._delayEvent, this), this._delayEvent = null)), 0 != this._state) {
                    var i = user.getRoleSpeed(this.isSendType);
                    this._curSpeed != i && (this._curSpeed = i, this._timeScale = this._curSpeed / this._initSpeed, 
                    this.displayNode1.active && this._display1.armature() && (this._display1.timeScale = this._timeScale), 
                    this.displayNode2.active && this._display2.armature() && (this._display2.timeScale = this._timeScale), 
                    this._animaState && (this._animaState.speed = this._timeScale));
                    var n = this._curSpeed * e;
                    switch (this._state) {
                      case 1:
                        this.node.x += n * this._pNormalize.x, this.node.y += n * this._pNormalize.y, this.node.y <= this._pos2.y && (this.node.x = this._pos2.x, 
                        this.node.y = this._pos2.y, this._state = 2);
                        break;

                      case 2:
                        this.node.y -= n, this.node.y <= this._destY && (this.updateFlower(), this.node.y = this._destY, 
                        this.playAnimation(this.isSendType ? "songhua" : "shouhua", 1), this.setIdleState(function() {
                            t._state = 3, t.displayNode1.active = !1, t.displayNode2.active = !0, t.playAnimation("run", 2) && (t._display2.timeScale = t._timeScale), 
                            t.isSendType ? user.addFlowerStandStock(t._workerIdx, t._sendAdd, !0) : (t._collectMoney = user.getStoreAdd(), 
                            t._collectMoney = user.takeFlowerStandCollect(t._workerIdx, t._collectMoney), t.setTextVale(t._collectMoney)), 
                            t.actionAni.node.active = !1;
                        }, this.isSendType ? 1.9 : 2.13, !0), this.actionAni.node.active = !0, this._animaState = this.actionAni.play(this.isSendType ? "songhua2" : "shouhua"), 
                        this._animaState.speed = this._timeScale, this._animaState.repeatCount = 3);
                        break;

                      case 3:
                        this.node.y += n, this.node.y >= this._pos2.y && (this.node.y = this._pos2.y, this._state = 4);
                        break;

                      case 4:
                        this.node.x -= n * this._pNormalize.x, this.node.y -= n * this._pNormalize.y, this.node.y >= this._pos1.y && (this.node.x = this._pos1.x, 
                        this.node.y = this._pos1.y, this.isSendType ? this.onCompleteAction() : "0" == this._collectMoney ? this.onCompleteAction() : (this.playAnimation("shouhua", 2), 
                        this.setIdleState(function() {
                            t.onCompleteAction();
                        }, .83, !0), this.performWithDelay(function() {
                            sd.mainDlg.onPlayMoneyEffect({
                                num: t._collectMoney,
                                idx: t._workerIdx
                            });
                        }, .3)));
                        break;

                      case 5:
                        if (!this._idleTime) return this._idleTime = 0, this.progress.node.active = !1, 
                        void sd.pf.doCallBack(this._idleFunc, this);
                        this._idleTime -= e * this._timeScale, this._idleTime <= 0 && (this._idleTime = 0, 
                        this.progress.node.active = !1, sd.pf.doCallBack(this._idleFunc, this)), this._isShowProgress && (this.progress.progress = 1 - this._idleTime / this.progress.totalTime);
                    }
                    this.node.zIndex = gConst.getZindexFromY(this.node.y);
                }
            },
            resetAnimation: function() {
                if (this._playTag) {
                    var e = this.getPlayDisplay();
                    e.animationName != this._playName && e.playAnimation(this._playName);
                }
            },
            playAnimation: function(e, t) {
                return this._playTag = t, this._playName = e, this.getPlayDisplay().playAnimation(e);
            },
            getPlayDisplay: function() {
                return 1 == this._playTag ? this._display1 : this._display2;
            }
        }), cc._RF.pop();
    }, {
        utils: "utils"
    } ],
    scrollViewHandle: [ function(e, t, i) {
        cc._RF.push(t, "05a83+G+pJGYZ+FFkRBFRUE", "scrollViewHandle"), cc.Class({
            extends: cc.Component,
            properties: {
                nodes: [ cc.Node ],
                lockWork: cc.Node
            },
            start: function() {
                this._viewContent = this.getComponent(cc.ScrollView).content;
            },
            update: function(e) {
                for (var t = this, i = sd.mainDlg.getWorkItems(), n = 0, o = i.length; n < o; n++) !function(n, o) {
                    var s = i[n];
                    s.updateProgress(e), t.handleNode(s.node, 240, 150, function() {
                        s._isUpdate = !0;
                    });
                }(n);
                var s = sd.mainDlg._sendRoles;
                for (n = 0, o = s.length; n < o; n++) !function(i, n) {
                    var o = s[i];
                    o.updateData(e), t.handleNode(o.node, 170, 30, function() {
                        o.resetAnimation();
                    });
                }(n);
                var a = sd.mainDlg._collectRoles;
                for (n = 0, o = a.length; n < o; n++) !function(i, n) {
                    var o = a[i];
                    o.updateData(e), t.handleNode(o.node, 160, 100, function() {
                        o.resetAnimation();
                    });
                }(n);
            },
            checkNodes: function() {
                for (var e = 0, t = this.nodes.length; e < t; e++) this.handleNode(this.nodes[e]);
                for (var i = sd.mainDlg.lockStands, n = 0, o = i.length; n < o; n++) {
                    var s = i[n];
                    s.unUse || this.handleNode(s);
                }
                for (var a = sd.mainDlg._roadTips, r = 0, c = a.length; r < c; r++) this.handleNode(a[r]);
                this.lockWork.active && user.info.moveCount >= config.Common.moveMax && user.isFlowerStandMax() && (this.lockWork.active = !1);
            },
            handleNode: function(e, t, i, n) {
                t = t || e.height * e.anchorY, i = i || e.height * e.anchorY, e.y + this._viewContent.y + t < -this.node.height || e.y + this._viewContent.y - i > 0 ? e.active && (e.active = !1) : e.active || (e.active = !0, 
                sd.pf.doCallBack(n, this, e));
            }
        }), cc._RF.pop();
    }, {} ],
    selectflower: [ function(e, t, i) {
        cc._RF.push(t, "2a8a4V45qJE4alv9D+3mELW", "selectflower"), cc.Class({
            extends: uiBase,
            properties: {
                content: cc.Node,
                scrollview: cc.ScrollView,
                template: cc.Node,
                returnBtn: cc.Node,
                space: 0
            },
            onLoad: function() {
                this._super(), this.curFlowerId = -1, this.callBack = null, this.items = [], this.schedule(this.refreshMoney, 1), 
                this.refreshMoney();
            },
            start: function() {},
            initItem: function() {
                var e = user.getFlowerMap(), t = null, i = 0, n = null, o = user.getMoveFlowerId(), s = Math.min(e.length + 1, o.length);
                this.content.height = s * (this.template.height + this.space);
                for (var a, r = 0; r < s; r++) (t = this.items[r]) ? (t.flowerId = r + 1, t.flowerData = e[r], 
                i = e[r] ? e[r].flowerLevel : 1, n = user.getItemConfig(t.flowerId), a = config.FlowerLevel.find(t.flowerId + 1, i), 
                this.updateItem(t, e[r], n, a)) : ((t = cc.instantiate(this.template)).active = !0, 
                t.x = 5, t.y = -(t.height + this.space) * r, this.content.addChild(t), t.flowerId = r + 1, 
                t.flowerData = e[r], i = e[r] ? e[r].flowerLevel : 1, n = user.getItemConfig(t.flowerId), 
                a = config.FlowerLevel.find(t.flowerId + 1, i), this.updateItem(t, e[r], n, a), 
                r == e.length && (this.needMoney = n.activationPrice, this.curItem = t), this.addEvent(t), 
                this.items.push(t));
                if (user.isGuide(gConst.guides.selectBtn)) {
                    var c = this.items[0];
                    sd.DlgMgr.showGuide(gConst.guides.selectBtn, c.getChildByName("button")), user.getFlowerStand(0).flowerId > 0 && (sd.DlgMgr.closeGuide(gConst.guides.selectBtn), 
                    sd.DlgMgr.showGuide(gConst.guides.selectReturn, this.returnBtn));
                } else if (user.isGuide(gConst.guides.newSelectBtn)) {
                    var l = this.items[0];
                    sd.DlgMgr.showGuide(gConst.guides.newSelectBtn, l.getChildByName("button")), user.getFlowerStand(1).flowerId > 0 && (sd.DlgMgr.closeGuide(gConst.guides.newSelectBtn), 
                    sd.DlgMgr.showGuide(gConst.guides.newSelectReturn, this.returnBtn));
                }
            },
            updateItem: function(e, t, i, n) {
                var o = e.getChildByName("icon1");
                o.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/flowericon/" + i.iconBouquet);
                var s = e.getChildByName("di1");
                s.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/" + n.quality[0]);
                var a = e.getChildByName("frame1");
                a.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/" + n.quality[1]), 
                (o = e.getChildByName("icon2")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/flowericon/" + i.iconFlower), 
                (s = e.getChildByName("di2")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/" + n.quality[0]), 
                (a = e.getChildByName("frame2")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/" + n.quality[1]);
                var r = e.getChildByName("levelbg1").getChildByName("label");
                r.getComponent(cc.Label).string = n.id, (r = e.getChildByName("levelbg2").getChildByName("label")).getComponent(cc.Label).string = n.id;
                var c = e.getChildByName("money");
                c.getComponent(cc.Label).string = i.chosePrice[n.id - 1], e.getChildByName("flowername").getComponent(cc.Label).string = i.desc;
                var l = e.getChildByName("moneyicon");
                t ? (c.active = !0, l.active = !0, e.flowerId == this.curFlowerId ? ((o = e.getChildByName("button")).y = -146, 
                o.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/huatai4"), 
                o.getComponent(cc.Button).interactable = !1, (c = o.getChildByName("text")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/huatai3")) : ((o = e.getChildByName("button")).y = -146, 
                o.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/zhaopin6"), 
                o.getComponent(cc.Button).interactable = !0, (c = o.getChildByName("text")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/huatai1")), 
                c.active = !0, (c = o.getChildByName("text1")).active = !1, (c = o.getChildByName("money")).active = !1, 
                (c = o.getChildByName("moneybg")).active = !1, (c = o.getChildByName("sprite")).active = !1, 
                (c = e.getChildByName("danjia")).active = !0) : (c.active = !1, l.active = !1, (o = e.getChildByName("button")).y = -121, 
                o.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/zhaopin6"), 
                o.getComponent(cc.Button).interactable = !0, (c = o.getChildByName("text")).active = !1, 
                (c = o.getChildByName("text1")).active = !0, (c = o.getChildByName("money")).getComponent(cc.Label).string = bigNumber.closeNumToRealSpecial(i.activationPrice), 
                c.active = !0, (c = o.getChildByName("moneybg")).active = !0, (c = o.getChildByName("sprite")).active = !0, 
                (c = e.getChildByName("danjia")).active = !1);
            },
            refreshMoney: function() {
                var e = this.note.getChildByName("value"), t = e.getComponent(cc.Label);
                t.string = user.getMoneyText(), (t = (e = this.gold.getChildByName("value")).getComponent(cc.Label)).string = user.getCoinText();
            },
            addEvent: function(e) {
                var t = this;
                e.getChildByName("button").on("click", function() {
                    t.on_click(e);
                }, this);
            },
            on_click: function(e) {
                if (e.flowerData) this.curFlowerId = e.flowerId, this.initItem(), sd.DlgMgr.closeGuide(gConst.guides.selectBtn), 
                sd.DlgMgr.showGuide(gConst.guides.selectReturn, this.returnBtn), sd.DlgMgr.closeGuide(gConst.guides.newSelectBtn), 
                sd.DlgMgr.showGuide(gConst.guides.newSelectReturn, this.returnBtn); else {
                    if (!user.moneyEnough(this.needMoney)) return PopLayer.tip(gConst.moneyName + "不足！");
                    user.unlockFlower(), this.initItem(), this.scheduleOnce(function() {
                        this.scrollview.scrollToBottom(.1);
                    }, 0);
                }
            },
            open: function(e, t) {
                var i = user.getFlowerStand(e);
                i && (this.curFlowerId = i.flowerId), this.callBack = function(i) {
                    var n = user.getFlowerStand(e);
                    n && (n.flowerId = i), t && t();
                }, this.initItem();
            },
            closeUI: function() {
                this._super(), this.callBack(this.curFlowerId), sd.DlgMgr.closeGuide(gConst.guides.selectReturn), 
                sd.DlgMgr.closeGuide(gConst.guides.newSelectReturn), sd.mainDlg.openHireGuide();
            }
        }), cc._RF.pop();
    }, {} ],
    shopDlg: [ function(e, t, i) {
        cc._RF.push(t, "6841dQDEgtOH7UjrysrQLTz", "shopDlg"), cc.Class({
            extends: cc.Component,
            properties: {
                item0: cc.Node,
                content: cc.Node,
                money: cc.Label,
                coin: cc.Label
            },
            onLoad: function() {
                var e = this;
                this.refreshUi(), pressButtonDeal(this.node.getChildByName("fanhui"), function() {
                    e.node.destroy();
                });
            },
            refreshUi: function() {
                var e = this, t = config.Mall.all(), i = [];
                t.forEach(function(e) {
                    user.mallHasBuy(e.list) || i.push(e);
                }), t.forEach(function(e) {
                    user.mallHasBuy(e.list) && i.push(e);
                }), i.forEach(function(t, i) {
                    i = parseInt(i);
                    var n = e["item" + i];
                    n || (n = cc.instantiate(e.item0), e["item" + i] = n, e.content.addChild(n), n.x = e.item0.x + i % 2 * 330, 
                    n.y = e.item0.y - 350 * Math.floor(i / 2));
                    var o = n.getChildByName("desc"), s = n.getChildByName("coinBg").getChildByName("value");
                    1 == t.style ? (o.getComponent(cc.Label).string = "收益永久+" + t.val + "倍", n.getChildByName("icon2").active = !1, 
                    n.getChildByName("icon1").active = !0) : (o.getComponent(cc.Label).string = "快进" + t.val + "小时", 
                    n.getChildByName("icon1").active = !1, n.getChildByName("icon2").active = !0), s.getComponent(cc.Label).string = "" + t.price, 
                    user.mallHasBuy(t.list) ? n.getChildByName("bg2").active = !0 : n.getChildByName("bg2").active = !1, 
                    n.on(cc.Node.EventType.TOUCH_END, function(e) {
                        if (user.coinEnough(t.price)) {
                            if (user.mallHasBuy(t.list)) return void PopLayer.tip("该商品已购买！");
                            var i = "确定花费" + gConst.moneyName2 + t.price + "购买" + o.getComponent(cc.Label).string, s = "0";
                            1 != t.style && (s = user.getTimeMoneyAdd(3600 * t.val, 1), i += "，可获得" + gConst.moneyName + bigNumber.closeNumToRealSpecial(s)), 
                            PopLayer.create("", i, function() {
                                user.reduceCoin(t.price), 1 == t.style ? (user.mallBuy(t.list), n.getChildByName("bg2").active = !0) : (user.addMoney(s), 
                                popBannerDlg("prefabs/public/tanchu", 0, 1,window.bannerids[0]).getComponent("tanchu").show(resManager.getResource("prefabs/wheel/wheelmoney1"), bigNumber.closeNumToRealSpecial(s), "获得" + gConst.moneyName));
                            }, function() {});
                        } else PopLayer.tip(gConst.moneyName2 + "不足！");
                    }, !0);
                }), this.content.setContentSize(630, t.length / 2 * 350);
            },
            start: function() {
                this.interval = 0;
            },
            onDestroy: function() {},
            update: function(e) {
                this.interval += e, this.interval >= .1 && (this.interval = 0, this.money.string = user.getMoneyText(), 
                this.coin.string = user.getCoinText());
            },
            onEnable: function(e) {
                moreGamesButtonHide(1)
            },
            onDisable: function(e) {
                moreGamesButtonShow(1)
            }
        }), cc._RF.pop();
    }, {} ],
    signDlg: [ function(e, t, i) {
        cc._RF.push(t, "a87baxt1RFGOKw4o8ZjwrYa", "signDlg"), cc.Class({
            extends: cc.Component,
            properties: {
                button: cc.Node
            },
            refreshUi: function() {
                for (var e = user.getSignDay() % 7, t = 0; t < 7; ++t) {
                    var i = t + 1, n = config.Sign.find(i), o = this.node.getChildByName("day" + i);
                    1 == n.rewardName ? (o.getChildByName("addDesc2").active = !1, o.getChildByName("addDesc1").active = !0, 
                    o.getChildByName("addDesc4").active = !1) : 2 == n.rewardName ? (o.getChildByName("addDesc2").active = !0, 
                    o.getChildByName("addDesc1").active = !1, o.getChildByName("addDesc4").active = !1) : (o.getChildByName("addDesc2").active = !1, 
                    o.getChildByName("addDesc1").active = !1, o.getChildByName("addDesc4").active = !0), 
                    e > t || 0 == e && user.hasSign() ? o.getChildByName("addDesc3").active = !0 : o.getChildByName("addDesc3").active = !1, 
                    o.getChildByName("addBg").getChildByName("addNum").getComponent(cc.Label).string = n.reward;
                }
                user.hasSign() ? (this.button.getChildByName("desc2").active = !0, this.button.getChildByName("desc").active = !1, 
                this.button.getChildByName("bg").active = !1, this.button.getChildByName("bg2").active = !0) : (this.button.getChildByName("desc2").active = !1, 
                this.button.getChildByName("desc").active = !0, this.button.getChildByName("bg").active = !0, 
                this.button.getChildByName("bg2").active = !1);
            },
            start: function() {
                var e = this;
                this.refreshUi(), this.button.on(cc.Node.EventType.TOUCH_END, function(t) {
                    if (user.hasSign()) PopLayer.tip("已领取"); else {
                        user.setSign(!0), user.setSignDay(user.getSignDay() + 1), e.refreshUi();
                        var i = (user.getSignDay() - 1) % 7 + 1, n = config.Sign.find(i);
                        1 == n.rewardName ? (user.addCoin(n.reward), popBannerDlg("prefabs/public/tanchu", 0, 1, window.bannerids[1]).getComponent("tanchu").show(resManager.getResource("prefabs/wheel/wheelgold1"), n.reward + gConst.moneyUnit2 + gConst.moneyName2, "获得" + gConst.moneyName2)) : 2 == n.rewardName ? (user.addBox(100, n.reward), 
                        popBannerDlg("prefabs/public/tanchu", 0, 1, window.bannerids[1]).getComponent("tanchu").show(resManager.getResource("prefabs/wheel/wheelbox1"), n.reward + gConst.boxUnit, "获得箱子")) : (user.addMoney2(n.reward), 
                        popBannerDlg("prefabs/public/tanchu", 0, 1, window.bannerids[1]).getComponent("tanchu").show(resManager.getResource("prefabs/wheel/wheelbox1"), n.reward + gConst.money2Unit, "获得" + gConst.money2Name));
                    }
                });
            }
        }), cc._RF.pop();
    }, {} ],
    sureaddtime: [ function(e, t, i) {
        cc._RF.push(t, "b0c75SDlypA46h7+GT9Y/t7", "sureaddtime"), cc.Class({
            extends: uiBase,
            properties: {},
            start: function() {
                this.label.getComponent(cc.Label).string = "x" + config.Common.freeTurntableTimes, 
                1 == channel.getShareAndAd("uiWheelNode", window.VideoAdids[0]).getType() ? this.guyong2.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/guyong2") : channel.isTouTiao() ? this.guyong2.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/public/zhujiemian10") : this.guyong2.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/guyong1");
            },
            setCallBack: function(e) {
                this.cb = e || function() {};
            },
            on_click: function() {
                this.cb();
            }
        }), cc._RF.pop();
    }, {} ],
    switchMainUI: [ function(e, t, i) {
        cc._RF.push(t, "ea841cn5JJIZKtCF3gvK9Ns", "switchMainUI");
        var n = [ "2", "3", "1" ];
        cc.Class({
            extends: cc.Component,
            properties: {
                sprites: [ cc.Sprite ]
            },
            start: function() {},
            switchUI: function(e) {
                console.log("switchUI")
                if (1 != e) {
                    var t = this;
                    t.loadMapRes(e, function() {
                        for (var i = 0, o = n.length; i < o; i++) t.sprites[i].spriteFrame = resManager.getResource("map/" + e + "/" + n[i]);
                    });
                }
            },
            loadMapRes: function(e, t) {
                var i = "map/" + e;
                resManager.loadDir(i, function() {
                    t && t();
                });
            }
        }), cc._RF.pop();
    }, {} ],
    tanchu: [ function(e, t, i) {
        cc._RF.push(t, "150a1o8FuBMP6gKtJgWVXIz", "tanchu"), cc.Class({
            extends: uiBase,
            properties: {
                buttonNode: cc.Node
            },
            onLoad: function() {
                var e = this;
                this._super(), this.scheduleOnce(function() {
                    var t = e.piaodai.getComponent(cc.ParticleSystem);
                    t.resetSystem(); //console.log('==t==', t);
                    //for (var i = 0; i < 60; i++) t.update(.016);
                }, .3), cc.loader.loadRes("audio/reward", cc.AudioClip, function(e, t) {
                    cc.audioEngine.playEffect(t, !1);
                });
                console.log("tanchu")
               
            },
            show: function(e, t, i, n, o,lupinCb,isLupin) {
                this.cb = n, this._effectId = o, this.quanquan.runAction(cc.repeatForever(cc.rotateBy(1, 90))), 
                this.moneySprite.active = !1;
                var s = cc.instantiate(e);
                this.node.addChild(s), s.x = this.moneySprite.x, s.y = this.moneySprite.y, s.scale = 1.3, 
                this.money.getComponent(cc.Label).string = t, this.desc.getComponent(cc.Label).string = i, 
                this.node.setScale(.3), this.node.runAction(cc.scaleTo(.3, 1).easing(cc.easeBackOut())), 
                this.lupinCb = lupinCb,
                this.isLupin = isLupin,
                this.initButton();
            },
            refresh: function(e, t) {
                this.money.getComponent(cc.Label).string = e, this.desc.getComponent(cc.Label).string = t;
            },
            initButton: function() {
                if (user.needInvite() && this.cb) if (1 == channel.getShareAndAd("tanchu", window.VideoAdids[0]).getType()) (e = this.button.getChildByName("tags")).getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/guyong2"); else {
                    var e = this.button.getChildByName("tags");
                    channel.isTouTiao() ? e.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/public/zhujiemian10") : e.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/guyong1");
                } else this.button.active = !1;
                if(this.lupinCb && false){
                  //加入录屏奖励按钮
                  this.liveReward = cc.instantiate(this.button),
                  this.liveReward.removeAllChildren(),
                  this.node.addChild(this.liveReward),
                  this.liveReward.y = this.liveReward.y - 120;
                //   this.liveReward.x = this.liveReward.x - 45,
                    var images = "images/live_share_btn_1.png"
                    if(!this.isLupin){
                        var images = "images/live_share_btn_2.png"
                    }
                  cc.loader.load(images,function(err,t){
                    if(!err){
                        this.liveReward.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t)
                    }
                  }.bind(this))
                  //加入奖励提示
                  if(isLiveReward()){
                    this.liveRewardTips = new cc.Node().addComponent(cc.Sprite)
                    cc.loader.load("images/live_reward.png",function(err,t){
                        if(!err){
                            this.liveRewardTips.spriteFrame = new cc.SpriteFrame(t)
                        }
                    }.bind(this))
                    this.liveReward.addChild(this.liveRewardTips.node)
                    this.liveRewardTips.node.x = -200
                    this.liveRewardTips.node.y = 0
                  }
                  /** 加入按钮点击回调 */
                  this.liveReward.getComponent(cc.Button).clickEvents = [];
                  var eventHandler = new cc.Component.EventHandler();
                  eventHandler.target = this;
                  eventHandler.component = "tanchu";
                  eventHandler.handler = "on_live_click";
                  // eventHandler.customEventData = "my data";
                  this.liveReward.getComponent(cc.Button).clickEvents.push(eventHandler);
                  var anim = cc.repeatForever(cc.sequence(cc.scaleTo(0.6,1.1),cc.scaleTo(0.6,1)));
                  this.liveReward.runAction(anim);
                }
            },
            on_live_click: function() {
              var _this = this
              this.lupinCb && this.lupinCb(function(){
                _this.liveReward.active = !1
              },function(){

              })
              
            },
            on_friend_click: function() {
                var e = this, t = channel.getShareAndAd("tanchu", window.VideoAdids[0]);
                t(function() {
                    e && e.button && (e.button.active = !1), e.cb && e.cb(), PopLayer.tip("操作成功,获得双倍奖励！");
                }, function() {
                    0 === t.getType() ? PopLayer.tip("分享失败，请分享到不同的群！") : PopLayer.tip("看完广告才能获得奖励！");
                });
            },
            onDestroy: function() {
                this._super(), void 0 != this._effectId && sd.mainDlg.playPickUpEffect2(this.buttonNode, this._effectId);
            }
        }), cc._RF.pop();
    }, {} ],
    taskitem: [ function(e, t, i) {
        cc._RF.push(t, "c617c1ZOGVPS4YuMXhWKcgC", "taskitem"), cc.Class({
            extends: uiBase,
            properties: {},
            updateItem: function(e) {
                cc.log(e), this.data = e;
                var t = e.config, i = Math.min(e.rIndex, t.targetNum.length - 1), n = t.targetNum[i], o = bigNumber.closeNumToRealSpecial(bigNumber.compare(e.cnum, n) ? n : e.cnum), s = o.indexOf("."), a = o[o.length - 1];
                -1 !== s && (o = o.substring(0, s), "number" != typeof a && (o += a));
                var r = bigNumber.closeNumToRealSpecial(n);
                switch (s = r.indexOf("."), a = r[r.length - 1], -1 !== s && (r = r.substring(0, s), 
                "number" != typeof a && (r += a)), this.desc.getComponent(cc.Label).string = e.config.describe.replace("*", r), 
                this.target.getComponent(cc.Label).string = "(" + o + "/" + r + ")", this.rewordtext.getComponent(cc.Label).string = bigNumber.closeNumToRealSpecial(t.reward[i]), 
                t.style[i]) {
                  case 1:
                    this.moneyicon.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/ui/2"), 
                    this.moneyicon.scale = .45;
                    break;

                  case 2:
                    this.moneyicon.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/ui/3"), 
                    this.moneyicon.scale = .4;
                    break;

                  case 3:
                    this.moneyicon.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/ui/4"), 
                    this.moneyicon.scale = .2;
                }
                switch (e.state) {
                  case 0:
                    this.button.getComponent(cc.Sprite).enabled = !1, this.text.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/dingdan1");
                    break;

                  case 1:
                    this.button.getComponent(cc.Sprite).enabled = !0, this.text.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/dingdan6");
                    break;

                  case 2:
                    this.button.getComponent(cc.Sprite).enabled = !1, this.text.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/dingdan7");
                }
                this.bg.active = 1 === e.state;
            },
            on_click: function() {
                if (1 === this.data.state) {
                    var e = this.data.config, t = Math.min(this.data.rIndex, e.targetNum.length - 1), i = popBannerDlg("prefabs/public/tanchu", null, null, window.bannerids[0]).getComponent("tanchu");
                    switch (e.style[t]) {
                      case 1:
                        var n = e.reward[t];
                        user.addMoney(n), i.show(resManager.getResource("prefabs/wheel/wheelmoney1"), bigNumber.closeNumToRealSpecial(n) + gConst.moneyUnit + gConst.moneyName, "获得" + gConst.moneyName, null, 0);
                        break;

                      case 2:
                        var o = e.reward[t];
                        user.addCoin(o), i.show(resManager.getResource("prefabs/wheel/wheelgold1"), o + gConst.moneyUnit2 + gConst.moneyName2, "获得" + gConst.moneyName2, null, 1);
                        break;

                      case 3:
                        o = e.reward[t], user.addMoney2(o), i.show(resManager.getResource("prefabs/wheel/wheelbox1"), bigNumber.closeNumToRealSpecial(o) + gConst.money2Unit + gConst.money2Name, "获得" + gConst.money2Name, null, 2);
                    }
                    user.setTaskReword(this.data.id, t + 1), user.changeTaskState(), gConst.mainEmitter.emit("refreshTask");
                }
            }
        }), cc._RF.pop();
    }, {} ],
    task: [ function(e, t, i) {
        cc._RF.push(t, "71980agGmJFkLYpAIYfR8Hf", "task"), cc.Class({
            extends: uiBase,
            properties: {
                scrollview: cc.ScrollView,
                view: cc.Node,
                content: cc.Node,
                template: cc.Prefab,
                space: 0,
                maxNum: 0
            },
            onLoad: function() {
                var e = this;
                this._super(), this.data = [], this.curtoggle = null, this.items = [], this.isInit = !1, 
                this.scheduleOnce(function() {
                    e.switchToggle("toggle1");
                }, 0), this.onEvent("refreshTask", function() {
                    e.switchToggle(e.curtoggle, !0);
                }), this.schedule(this.showRedPoint, 1), this.showRedPoint();
            },
            initItems: function(e) {
                if (e = e || [], this.content.height = e.length * this.space, this.content.y = 0, 
                this.isInit) return this.resetItemsIndex(), void this.updateItems();
                for (var t = Math.ceil(this.view.height / this.space) + 2, i = Math.min(e.length, t), n = 0, o = null; n < i; n++) (o = this.createItem()).y = -(n + .5) * this.space, 
                o.index = n, this.items.push(o), this.content.addChild(o), o.getComponent("taskitem").updateItem(this.getItemData(n));
                this.isInit = !0;
            },
            on_toggle_event: function(e) {
                this.switchToggle(e.node.name);
            },
            switchToggle: function(e, t) {
                if (t || this.curtoggle !== e) {
                    switch (e) {
                      case "toggle1":
                        this.data = user.getTaskListByType(1);
                        break;

                      case "toggle2":
                        this.data = user.getTaskListByType(0);
                    }
                    this.curtoggle = e, this.initItems(this.data);
                }
            },
            createItem: function() {
                return cc.instantiate(this.template);
            },
            getItemData: function(e) {
                return this.data[e];
            },
            resetItemsIndex: function() {
                for (var e = 0, t = this.items.length; e < t; e++) this.items[e].index = null, this.items[e].y = 999;
            },
            getInViewItemIndex: function(e) {
                for (var t = 0, i = this.items.length; t < i; t++) if (this.items[t].index === e) return t;
                var n = this.space / 2;
                for (t = 0, i = this.items.length; t < i; t++) if (this.items[t].y - n > -this.content.y || this.items[t].y + n < -this.content.y - this.view.height) return t;
                var o = this.createItem();
                return o.y = -(t + .5) * this.space, this.items.push(o), this.content.addChild(o), 
                this.items.length - 1;
            },
            updateItems: function() {
                for (var e, t = Math.max(Math.floor(this.content.y / this.space), 0), i = Math.ceil(this.view.height / this.space), n = Math.min(t + i, this.data.length - 1), o = Math.max(t, 0), s = null; o <= n && (e = this.getInViewItemIndex(o), 
                s = this.items[e]); o++) s.index !== o && (s.index = o, s.getComponent("taskitem").updateItem(this.getItemData(o))), 
                s.y = -(o + .5) * this.space;
                o = 0;
                for (var a = this.items.length; o < a; o++) (this.items[o].index < t || this.items[o].index > n) && (this.items[o].y = 999);
            },
            scrollEvent: function(e, t) {
                this.updateItems();
            },
            on_close: function() {
                this.node.myDestroy ? this.node.myDestroy() : this.closeUI();
            },
            showRedPoint: function() {
                this.red1.active = user.hasTaskCompelate(1), this.red2.active = user.hasTaskCompelate(0);
            },
            onEnable: function(e) {
                moreGamesButtonHide(1)
            },
            onDisable: function(e) {
                moreGamesButtonShow(1)
            }
        }), cc._RF.pop();
    }, {} ],
    tianfu: [ function(e, t, i) {
        cc._RF.push(t, "522b3eK91lN4adebdrcdMYK", "tianfu"), cc.Class({
            extends: cc.Component,
            properties: {
                tianfu: cc.Node,
                moneyV: cc.Label,
                money2V: cc.Label,
                shengji: cc.Node,
                needMoney2: cc.Label
            },
            selectDian: function(e) {
                this.oldDian && this.cancelSelectDian(this.oldDian);
                var t = e.getChildByName("bg2");
                t.active = !0, t.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(.3), cc.fadeIn(.3)))), 
                this.oldDian = e;
                var i = user.getTianfuLevelUpMoney2(this.oldDian.tianfuId);
                this.needMoney2.string = bigNumber.closeNumToRealSpecial(i);
            },
            cancelSelectDian: function(e) {
                e.getChildByName("bg2").stopAllActions(), e.getChildByName("bg2").active = !1;
            },
            reSelectDian: function() {
                config.Talent.all().forEach(function(e) {});
            },
            refreshXian: function() {
                var e = this;
                config.Talent.all().forEach(function(t) {
                    t.father.forEach(function(i) {
                        user.getTianfuLevel(i) >= e.maxLevel ? e.tianfu.getChildByName("bg" + i + "_" + t.style).active = !0 : e.tianfu.getChildByName("bg" + i + "_" + t.style).active = !1;
                    });
                });
            },
            canLevelUp: function(e) {
                var t = this, i = !0;
                return config.Talent.find(e).father.forEach(function(e) {
                    user.getTianfuLevel(e) < t.maxLevel && (i = !1);
                }), i;
            },
            start: function() {
                var e = this;
                pressButtonDeal(this.node.getChildByName("fanhui"), function() {
                    e.node.destroy();
                }), config.Talent.all().forEach(function(t) {
                    e.maxLevel = t.addition.length;
                    var i = user.getTianfuAdd(t.style), n = e.tianfu.getChildByName("dian" + t.style), o = user.getTianfuLevel(t.style);
                    t.floor, n.tianfuId = t.style, n.getChildByName("bg3").getChildByName("desc").getComponent(cc.Label).string = t.name + (100 * i).toFixed(0) + "%", 
                    n.getChildByName("jindu").getComponent(cc.Label).string = o + "/" + e.maxLevel, 
                    n.getChildByName("bg2").active = !1, o >= e.maxLevel && (n.getChildByName("bg4").active = !1), 
                    e.canLevelUp(t.style) && (e.oldDian || e.selectDian(n)), pressButtonDeal(n, function() {
                        e.canLevelUp(n.tianfuId) ? e.selectDian(n) : PopLayer.tip("请先将前一层都升满级！");
                    });
                }), this.refreshXian(), this.oldDian || this.selectDian(this.tianfu.getChildByName("dian1")), 
                this.tianfu.setScale(Math.min((cc.winSize.height - 343) / 891, 1)), pressButtonDeal(this.shengji, function() {
                    var t = e.oldDian, i = user.getTianfuLevel(t.tianfuId);
                    if (i >= e.maxLevel) PopLayer.tip("已升到顶级！"); else {
                        var n = user.getTianfuLevelUpMoney2(t.tianfuId);
                        if (!user.money2Enough(n)) return void PopLayer.tip(gConst.money2Name + "不足！");
                        var o = config.Talent.find(t.tianfuId);
                        user.reduceMoney2(n), i++, user.modifyTianfuLevel(t.tianfuId, i), t.getChildByName("jindu").getComponent(cc.Label).string = i + "/" + e.maxLevel, 
                        t.getChildByName("bg3").getChildByName("desc").getComponent(cc.Label).string = o.name + (100 * user.getTianfuAdd(t.tianfuId)).toFixed(0) + "%", 
                        n = user.getTianfuLevelUpMoney2(e.oldDian.tianfuId), e.needMoney2.string = bigNumber.closeNumToRealSpecial(n), 
                        i >= e.maxLevel ? t.getChildByName("bg4").active = !1 : t.getChildByName("bg4").active = !0, 
                        t.getChildByName("bg2").active = !0, e.refreshXian();
                    }
                });
            },
            update: function(e) {
                this.moneyV.string = user.getMoneyText(), this.money2V.string = user.getMoney2Text();
            },
            onEnable: function(e) {
                moreGamesButtonHide(1)
            },
            onDisable: function(e) {
                moreGamesButtonShow(1)
            }
        }), cc._RF.pop();
    }, {} ],
    "toylevel ": [ function(e, t, i) {
        cc._RF.push(t, "43bbfEXAxdCs76pzNET50fk", "toylevel "), cc.Class({
            extends: uiBase,
            properties: {
                content: cc.Node,
                scrollview: cc.ScrollView,
                template: cc.Prefab,
                space: 0,
                itemHeight: 0,
                returnBtn: cc.Node
            },
            onLoad: function() {
                this._super(), sd.DlgMgr.closeGuide(gConst.guides.toyLevel), this.items = [], user.needInvite() || this.hideButton(), 
                this.updateFlowerList(), this.schedule(this.refreshMoney, 1), this.refreshMoney(), 
                this.schedule(this.updateTime, 1), this.onEvent("refreshMoney", function() {
                    this.refreshMoney();
                }.bind(this));
            },
            hideButton: function() {},
            updateFlowerList: function() {
                var e = user.getFlowerMap().length;
                this.content.height = e * (this.itemHeight + this.space) + this.space;
                for (var t = 0; t < e; ++t) {
                    var i = this.items[t];
                    i || (i = cc.instantiate(this.template), this.content.addChild(i), i.setPosition(this.content.width / 2, -(i.height + this.space) * (t + .5)), 
                    this.items.push(i)), i.getComponent("toylevelitem").updateItem(t, t);
                }
            },
            refreshMoney: function() {
                var e = this.note.getChildByName("value"), t = e.getComponent(cc.Label);
                t.string = user.getMoneyText(), (t = (e = this.gold.getChildByName("value")).getComponent(cc.Label)).string = user.getMoney2Text(), 
                sd.DlgMgr.showGuide(gConst.guides.toyReturn, this.returnBtn);
            },
            updateTime: function() {},
            onDestroy: function() {
                this._super(), sd.DlgMgr.closeGuide(gConst.guides.toyBtn), sd.DlgMgr.closeGuide(gConst.guides.toyReturn);
            },
            onEnable: function(e) {
                moreGamesButtonHide(1)
            },
            onDisable: function(e) {
                moreGamesButtonShow(1)
            }
        }), cc._RF.pop();
    }, {} ],
    toylevelitem: [ function(e, t, i) {
        cc._RF.push(t, "3ee17IoLQRJ9bLRK2Zi6gqi", "toylevelitem"), cc.Class({
            extends: cc.Component,
            properties: {
                flowername: {
                    default: null,
                    type: cc.Label
                },
                desc: {
                    default: null,
                    type: cc.Label
                },
                addlabel: {
                    default: null,
                    type: cc.Label
                },
                addlabel1: {
                    default: null,
                    type: cc.Label
                },
                money: {
                    default: null,
                    type: cc.Label
                },
                level: {
                    default: null,
                    type: cc.Label
                },
                button: {
                    default: null,
                    type: cc.Button
                },
                di: {
                    default: null,
                    type: cc.Sprite
                },
                icon: {
                    default: null,
                    type: cc.Sprite
                },
                frame: {
                    default: null,
                    type: cc.Sprite
                },
                jiantou: {
                    default: null,
                    type: cc.Sprite
                },
                money2icon: {
                    default: null,
                    type: cc.Sprite
                },
                micon2: {
                    default: null,
                    type: cc.Sprite
                },
                maxsp: {
                    default: null,
                    type: cc.Sprite
                }
            },
            onLoad: function() {
                this.cost = 0, this.isFull = !1, this.isenouth = !1;
            },
            updateItem: function(e, t) {
                this.idx = t;
                var i = user.getItemConfig(t + 1), n = user.getFlowerLevel(t), o = user.getFlowerLevelConfig(this.idx + 1, n), s = i.desc;
                s || (s = i.desc || ""), this.flowername.string = s, this.desc.string = i.describe, 
                this.level.string = n, this.addlabel1.string = i.chosePrice[n - 1] + "", n >= Math.min(i.chosePrice.length, user.getMaxFlowerLevel(this.idx + 1)) ? (this.jiantou.node.active = !1, 
                this.addlabel.node.active = !1, this.money2icon.node.active = !1, this.money.node.active = !1, 
                this.button.node.active = !1, this.micon2.node.active = !1, this.maxsp.node.active = !0, 
                this.isFull = !0) : (this.addlabel.string = i.chosePrice[n] + "", this.cost = user.getFlowerCost(t + 1, n + 1), 
                this.money.string = bigNumber.closeNumToRealSpecial(this.cost), this.maxsp.node.active = !1), 
                this.icon.spriteFrame = resManager.getResource("texture/flowericon/" + user.getFlowerIconRes(t + 1, i)), 
                this.di.spriteFrame = resManager.getResource("texture/new_ui/" + o.quality[0]), 
                this.frame.spriteFrame = resManager.getResource("texture/new_ui/" + o.quality[1]), 
                user.money2Enough(this.cost) ? (this.isenouth = !0, 0 == t && sd.DlgMgr.showGuide(gConst.guides.toyBtn, this.button.node)) : this.setButtonVisible(!1), 
                this.isFull ? this.unschedule(this.checkEnough) : (this.schedule(this.checkEnough, 1), 
                this.checkEnough()), this.scheduleOnce(function() {
                    var e = this.addlabel1.node;
                    if (e) {
                        var t = e.x + e.width;
                        t += 24, this.jiantou.node.x = t, t += 40, (e = this.node.getChildByName("micon2")) && (e.x = t), 
                        t += 25, this.addlabel.node.x = t;
                    }
                    (e = this.money.node) && (this.money2icon.node.x = e.x - e.width / 2 - this.money2icon.node.width / 4 - 5);
                }, 0);
            },
            setButtonVisible: function(e) {
                e ? (this.button.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/28"), 
                this.button.node.getChildByName("text").getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/30")) : (this.button.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/qiandao7"), 
                this.button.node.getChildByName("text").getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/cangkushengji1"));
            },
            checkEnough: function() {
                user.money2Enough(this.cost) ? this.isenouth || (this.setButtonVisible(!0), this.isenouth = !0) : this.isenouth && (this.setButtonVisible(!1), 
                this.isenouth = !1);
            },
            on_uplevel: function(e) {
                if (!user.money2Enough(this.cost)) return PopLayer.tip("研究点不足！");
                user.toyLevelUp(this.idx), user.reduceMoney2(this.cost), this.updateItem(0, this.idx), 
                cc.loader.loadRes("audio/btn_upgrade", cc.AudioClip, function(e, t) {
                    cc.audioEngine.playEffect(t, !1);
                });
                var t = cc.instantiate(resManager.getResource("prefabs/boomeffect")), i = e.touch.getLocation();
                t.getComponent("boomeffect").show(i), gConst.mainEmitter.emit("refreshMoney"), sd.DlgMgr.closeGuide(gConst.guides.toyBtn);
            }
        }), cc._RF.pop();
    }, {} ],
    uiBase: [ function(e, t, i) {
        cc._RF.push(t, "3a81bbGIllFsJQHC0qfmWcu", "uiBase");
        var n = cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.m_tEventList = [], this.node.visibleAll(this.dealChild.bind(this));
            },
            dealChild: function(e) {
                var t = this, i = e.getName();
                i && (this[i] = e, this["click_" + i] ? e.on("click", function() {
                    t["click_" + i]();
                }, this) : this["touchend_" + i] ? e.on("touchend", this["touchend_" + i], this) : "closeBtn" == i && e.on("click", function() {
                    t.closeUI();
                }, this));
            },
            onEvent: function(e, t) {
                gConst.mainEmitter.on(e, t), this.m_tEventList.push([ e, t ]);
            },
            closeUI: function() {
                channel.hideBannerBottom(), this.node && this.node.destroy();
            },
            onDestroy: function() {
                for (var e = 0; e < this.m_tEventList.length; ++e) gConst.mainEmitter.off(this.m_tEventList[e][0], this.m_tEventList[e][1]);
                this.m_tEventList.length = 0;
            },
            closeAllDialog: function() {
                var e = g_uiDialogNode.getChildren(), t = !0, i = !1, n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
                        var a = o.value;
                        a.closeUI ? a.closeUI() : a.destroy();
                    }
                } catch (e) {
                    i = !0, n = e;
                } finally {
                    try {
                        !t && s.return && s.return();
                    } finally {
                        if (i) throw n;
                    }
                }
                g_uiDialogNode.removeAllChildren();
            },
            closeAllPanel: function() {
                var e = g_uiPanelNode.getChildren(), t = !0, i = !1, n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(t = (o = s.next()).done); t = !0) {
                        var a = o.value;
                        a.closeUI ? a.closeUI() : a.destroy();
                    }
                } catch (e) {
                    i = !0, n = e;
                } finally {
                    try {
                        !t && s.return && s.return();
                    } finally {
                        if (i) throw n;
                    }
                }
                g_uiPanelNode.removeAllChildren();
            },
            closeAllUI: function() {
                this.closeAllDialog(), this.closeAllPanel();
            },
            onEnable: function(e) {
                moreGamesButtonHide(1)
            },
            onDisable: function(e) {
                moreGamesButtonShow(1)
            }
        });
        window.uiBase = n, t.exports = n, cc._RF.pop();
    }, {} ],
    uiWheelNode: [ function(e, t, i) {
        cc._RF.push(t, "9b55eIMvfVL2Lu2YC08a4hl", "uiWheelNode");
        var n = e("uiBase");
        e("random"), cc.Class({
            extends: n,
            properties: {
                inviteNode: cc.Prefab
            },
            onLoad: function() {
                this._super(), this.wheelState = 0, this.gearNum = 8, this.defaultAngle = 0, this.gearAngle = 360 / this.gearNum, 
                this.awardFlag = !1, user.refreshWheelTime(), this.setTimesTxt(), this.schedule(this.countDown, 1), 
                this.countDown(), this.dians = [ "fendian", "hongdian", "huangdian", "landian", "lvdian", "zidian" ], 
                this.isSharing = !0, this.runBling(), this.initEff(), this.init(), this.initDouble();
            },
            initInvite: function() {},
            initEff: function() {
                this.quanEff.active = !1, this.zzEff.active = !1;
                var e = cc.scaleTo(1.5, 1.4).easing(cc.easeOut(2)), t = cc.scaleTo(0, .83), i = cc.fadeOut(1.5).easing(cc.easeOut(1)), n = cc.fadeIn(0);
                this.zzspeffect.runAction(cc.repeatForever(cc.sequence(cc.spawn(e, i), cc.spawn(t, n))));
            },
            init: function() {
                for (var e = config.Turntable.all(), t = 0; t < e.length; t++) this["nameTxt_" + t].getComponent(cc.Label).string = e[t].desc;
            },
            initDouble: function() {
                this.duobleBtn.getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/wheel/" + (1 == user.getWheelDouble() ? "zhuanpan9" : "83"));
            },
            getData: function(e) {
                return config.Turntable.find(e);
            },
            click_startBtn: function() {
                if (0 === this.wheelState) {
                    var e = user.getWheelTimes();
                    if (e < user.getWheelDouble()) {
                        if (user.getWheelSharedTimes() > 0) return user.needInvite() ? (this.click_addBtn(), 
                        void console.log("次数不足自动弹分享")) : PopLayer.tip("次数不足！");
                        if (e < 1) return PopLayer.tip("次数不足！");
                        this.click_double(), this.click_addBtn();
                    }
                    if (this.wheelState = 1, this.audioID && cc.audioEngine.stopEffect(this.audioID), 
                    cc.loader.loadRes("audio/zhuanpan1", cc.AudioClip, function(e, t) {
                        this.audioID = cc.audioEngine.playEffect(t, !0);
                    }.bind(this)), cc.isValid(this.node)) {
                        this.quanEff.active = !0, this.zzEff.active = !0, this.zzspeffect.active = !1, user.addDailyTimes(user.getWheelDouble());
                        var t = config.Turntable.all();
                        this.targetID = user.randByWeight(t) + 1, user.refreshWheelTime(), this.setTimesTxt(), 
                        this.runWheelAction();
                    }
                } else console.log("还在旋转");
            },
            click_double: function() {
                if (0 === this.wheelState) {
                    if (1 === user.getWheelDouble() && user.getWheelTimes() < 2) return PopLayer.tip("次数不足,不能选择双倍消耗！");
                    user.setWheelDouble(), this.initDouble();
                }
            },
            runWheelAction: function() {
                void 0 == this.curAngle && (this.curAngle = 0);
                var e = -(this.targetID - 1) * this.gearAngle, t = cc.sequence(cc.rotateBy(2, e - (1080 + this.curAngle)).easing(cc.easeInOut(2)), cc.callFunc(this.showRes, this)), i = cc.repeat(cc.sequence(cc.rotateTo(.2, 5), cc.rotateTo(.2, 0)), 4);
                this.zzSp.runAction(i), this.wheelSp.runAction(t), this.curAngle = e;
            },
            runBling1: function() {
                for (var e = 1; e <= 16; e++) if (this[e + ""].opacity = 0, e % 2 == 1) {
                    var t = cc.sequence(cc.fadeIn(0), cc.delayTime(.5), cc.fadeOut(0), cc.delayTime(.5)).repeatForever();
                    this[e + ""].runAction(t);
                } else t = cc.sequence(cc.fadeOut(0), cc.delayTime(.5), cc.fadeIn(0), cc.delayTime(.5)).repeatForever(), 
                this[e + ""].runAction(t);
            },
            runBling2: function() {
                for (var e = 1; e <= 16; e++) {
                    this[e + ""].opacity = 0;
                    var t = cc.sequence(cc.delayTime(.1 * (e - 1)), cc.callFunc(function() {
                        this.runAction(cc.sequence(cc.fadeIn(0), cc.delayTime(.4), cc.fadeOut(0), cc.delayTime(1.6 - .4)).repeatForever());
                    }, this[e + ""]));
                    this[e + ""].runAction(t);
                }
            },
            runBling: function() {
                var e = this;
                this.schedule(function() {
                    for (var t = e.dians.length - 1, i = 1; i <= 16; i++) e[i + ""].getComponent(cc.Sprite).spriteFrame = resManager.getResource("texture/new_ui/wheel/" + e.dians[gConst.random.randomInt(0, t)]), 
                    e[i + ""].opacity = 255;
                    e.isSharing = !e.isSharing;
                }, .5);
            },
            showRes: function() {
                this.quanEff.active = !1, this.zzEff.active = !1, this.zzspeffect.active = !0, this.setTimesTxt();
                var e = null, t = this.getData(this.targetID), i = 0, n = [ gConst.moneyName2, gConst.moneyName, "宝箱", "双倍收益", gConst.money2Name ];
                if (cc.log(t), 1 == t.style) i = t.reward[0] * user.getWheelDouble(), user.addCoin(i), 
                e = cc.find("Canvas/主界面/顶部/goldimage"); else if (2 == t.style) {
                    i = t.reward[0] * user.getWheelDouble();
                    var o = user.getAllStandAddMoney();
                    "0" == o && (o = bigNumber.mult(config.Parterre.find(1).produceSpeed1, config.Item.find(1).chosePrice[0]));
                    var s = bigNumber.mult(o, i);
                    i = bigNumber.closeNumToRealSpecial(s), user.addMoney(s), e = cc.find("Canvas/主界面/顶部/moneyimage");
                } else 3 == t.style ? (i = t.reward[1] * user.getWheelDouble(), user.addBox(t.reward[0], i), 
                e = cc.find("Canvas/主界面/底部/图鉴")) : 4 == t.style ? (i = 60 * t.reward[0] * 1e3 * user.getWheelDouble(), 
                user.addDoubleTime(i), e = cc.find("Canvas/主界面/顶部/moneyimage")) : 5 == t.style && (i = bigNumber.mult(t.reward[0] + "", user.getWheelDouble() + ""), 
                user.addMoney2(i), e = cc.find("Canvas/主界面/顶部/goldimage"));
                if (e) {
                    var a = null, r = "";
                    1 == t.list ? (a = resManager.getResource("prefabs/wheel/wheelDouble"), r = i + gConst.moneyUnit2) : 2 == t.list ? (a = resManager.getResource("prefabs/wheel/wheelbox1"), 
                    r = i + gConst.money2Unit) : 3 == t.list ? (a = resManager.getResource("prefabs/wheel/wheelmoney1"), 
                    r = i + gConst.moneyUnit) : 4 == t.list ? (a = resManager.getResource("prefabs/wheel/wheelgold1"), 
                    r = i + gConst.moneyUnit2) : 5 == t.list ? (a = resManager.getResource("prefabs/wheel/wheelmoney1"), 
                    r = i + gConst.moneyUnit) : 6 == t.list ? (a = resManager.getResource("prefabs/wheel/wheelgold2"), 
                    r = i + gConst.moneyUnit2) : 7 == t.list ? (r = i + gConst.moneyUnit, a = resManager.getResource("prefabs/wheel/wheelmoney2")) : 8 == t.list && (a = resManager.getResource("prefabs/wheel/wheelbox2"), 
                    r = i + gConst.money2Unit), this.showRewardView(a, r + n[t.style - 1], "获得" + n[t.style - 1] + (2 == user.getWheelDouble() ? "*2" : ""));
                }
                cc.audioEngine.stopEffect(this.audioID), this.wheelState = 0, this.targetID = 0;
            },
            click_addBtn: function() {
                var e = this;
                if (user.getWheelSharedTimes() <= 0) return PopLayer.tip("免费增加次数已达上限！");
                var t = popBannerDlg("prefabs/sureaddtime", 0, 1), i = channel.getShareAndAd("uiWheelNode", window.VideoAdids[0]);
                t.getComponent("sureaddtime").setCallBack(function() {
                    i(function() {
                        e.postShareTime(function() {
                            PopLayer.tip("操作成功,转盘次数增加" + config.Common.freeTurntableTimes + "次"), t.myDestroy();
                        });
                    }, function() {
                        0 === i.getType() ? PopLayer.tip("分享失败，请分享到不同的群！") : PopLayer.tip("看完广告才能获得次数！"), 
                        t.myDestroy();
                    });
                });
            },
            postShareTime: function(e) {
                user.info.dialAddTimes++, user.saveOther(), user.refreshWheelTime(), this.setTimesTxt(), 
                e && e();
            },
            showRewardView: function(e, t, i) {
                popBannerDlg("prefabs/public/tanchu", 0, 1).getComponent("tanchu").show(e, t, i);
            },
            setTimesTxt: function() {
                1 === user.getWheelTimes() && user.getWheelDouble() > 1 && this.click_double(), 
                cc.isValid(this.timesTxt) && (this.timesTxt.getComponent(cc.Label).string = "剩余次数:" + Math.max(user.getWheelTimes(), 0));
            },
            countDown: function() {
                if (user.getResumeTime()) {
                    var e = 1e3 * config.Common.recoveryTime - (user.getServerTime() - user.getResumeTime());
                    this.time.active = !0, this.addtext.active = !0, this.icon1.active = !0, e <= 0 ? (user.refreshWheelTime(), 
                    this.setTimesTxt(), e = 1e3 * config.Common.recoveryTime - (user.getServerTime() - user.getResumeTime()), 
                    this.time.getComponent(cc.Label).string = utils.formatTime3(e / 1e3)) : this.time.getComponent(cc.Label).string = utils.formatTime3(e / 1e3);
                } else this.time.active = !1, this.addtext.active = !1, this.icon1.active = !1;
            },
            onDestroy: function() {
                if (this._super(), this.targetID) {
                    var e = this.getData(this.targetID), t = 0;
                    if (cc.log(e), 1 == e.style) t = e.reward[0] * user.getWheelDouble(), user.addCoin(t); else if (2 == e.style) {
                        t = e.reward[0] * user.getWheelDouble();
                        var i = user.calcAllFlowerStandOutputSec(!0), n = bigNumber.mult(i, t);
                        t = bigNumber.closeNumToRealSpecial(n), user.addMoney(n);
                    } else 3 == e.style ? (t = e.reward[1] * user.getWheelDouble(), user.addBox(e.reward[0], t)) : 4 == e.style ? (t = 60 * e.reward[0] * 1e3 * user.getWheelDouble(), 
                    user.addDoubleTime(t)) : 5 == e.type && (t = bigNumber.mult(e.reward[0], user.getWheelDouble()), 
                    user.addMoney2(t));
                }
                cc.audioEngine.stopEffect(this.audioID);
            }
        }), cc._RF.pop();
    }, {
        random: "random",
        uiBase: "uiBase"
    } ],
    userInfo: [ function(e, t, i) {
        cc._RF.push(t, "1a829/9hNxIw7yDa1a1ZYtz", "userInfo");
        var n = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(e, n.key, n);
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t;
            };
        }(), o = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
            }
            return n(e, [ {
                key: "gameStart",
                value: function() {
                    this.started = !0, this.sendMoneyToWx();
                }
            }, {
                key: "gameStarted",
                value: function() {
                    return this.started;
                }
            }, {
                key: "setInfo",
                value: function(e) {
                    console.log("setInfo = ",e)
                    this.info = e, this.info.timestamp < 3e5 && (cc.sys.localStorage.setItem("userInfoOld" + pomelo.getUid(), JSON.stringify(this.info)), 
                    this.info = {}), this.initInfo(), this.saveInfoToLocal();
                }
            }, {
                key: "getServerTime",
                value: function() {
                    var e = Date.now();
                    return e = Math.max(this.loginLocalTime, e), this.loginServerTime + e - this.loginLocalTime;
                }
            }, {
                key: "getLoginServerTime",
                value: function() {
                    return this.loginServerTime;
                }
            }, {
                key: "getLastOffLineTime",
                value: function() {}
            }, {
                key: "setServerTime",
                value: function(e) {
                    this.resetDeal(e), this.loginServerTime = e, this.loginLocalTime = Date.now();
                }
            }, {
                key: "setLogoutTime",
                value: function(e) {
                    this.logoutTime = e;
                }
            }, {
                key: "getLogoutTime",
                value: function() {
                    return this.logoutTime;
                }
            }, {
                key: "setServerInfo",
                value: function(e) {
                    this.serverInfo = e, this.serverInfo.shareSucc && this.countTaskNum(10, this.serverInfo.shareSucc);
                }
            }, {
                key: "hasSign",
                value: function() {
                    return this.info.isSign;
                }
            }, {
                key: "getSignDay",
                value: function() {
                    return this.info.signDay;
                }
            }, {
                key: "setSign",
                value: function(e) {
                    this.info.isSign = e;
                }
            }, {
                key: "setSignDay",
                value: function(e) {
                    this.info.signDay = e;
                }
            }, {
                key: "sendMoneyToWx",
                value: function() {
                    cc.sys.platform == cc.sys.WECHAT_GAME && wx.getOpenDataContext && wx.getOpenDataContext().postMessage({
                        messageType: 5,
                        score: this.getTotalMoney(),
                        key: "rank_money"
                    });
                }
            }, {
                key: "getOfflineTime",
                value: function() {
                    return this.getLoginServerTime() - this.getLastGiveTime();
                }
            }, {
                key: "setLastGiveTime",
                value: function(e) {
                    this.info.lastGiveTime = e, this.saveOther();
                }
            }, {
                key: "getLastGiveTime",
                value: function() {
                    return this.info.lastGiveTime ? this.info.lastGiveTime : this.getLogoutTime();
                }
            }, {
                key: "setMoneyToServer",
                value: function() {
                    var e = this;
                    this.sendMoneyToWx(), this.setMoneyNotBack ? this.setMoneyBackNeedSend = !0 : (this.setMoneyBackNeedSend = !1, 
                    this.setMoneyNotBack = !0, pomelo.request("scene.playerHandler.setMoney", {
                        money: this.info.money,
                        totalMoney: this.info.totalMoney
                    }, function(t) {
                        e.setMoneyNotBack = !1, 200 == t.code && (e.info.timestamp = t.timestamp, e.resetDeal(t.timestamp), 
                        e.saveInfoToLocal(), e.setLastGiveTime(t.timestamp)), e.setMoneyBackNeedSend && e.setMoneyToServer();
                    }, !0));
                }
            }, {
                key: "setAllToServer",
                value: function() {
                    var e = this;
                    this.sendMoneyToWx(), this.setAllNotBack ? this.setAllBackNeedSend = !0 : (this.setAllBackNeedSend = !1, 
                    this.setAllNotBack = !0, pomelo.request("scene.playerHandler.setClient", {
                        client: this.info
                    }, function(t) {
                        e.setAllNotBack = !1, 200 == t.code && (e.info.timestamp = t.timestamp, e.resetDeal(t.timestamp), 
                        e.saveInfoToLocal(), e.setLastGiveTime(t.timestamp)), e.setAllBackNeedSend && e.setAllToServer();
                    }, !0));
                }
            }, {
                key: "getInfoTimestamp",
                value: function() {
                    return this.info.timestamp || 0;
                }
            }, {
                key: "initInfo",
                value: function() {
                    var e = this;
                    this.info.money = this.info.money || "0", this.info.totalMoney = this.info.totalMoney || "0", 
                    this.info.money2 = this.info.money2 || "0", this.info.coin = this.info.coin || "0", console.log(this.info.money,this.info.totalMoney,this.info.money2)
                    this.info.totalCoin = this.info.totalCoin || "0", this.info.moveCount = this.info.moveCount || 0, 
                    this.info.warehouseLevel = this.info.warehouseLevel || 1, this.info.storeLevel = this.info.storeLevel || 1, 
                    this.info.flowerStands = this.info.flowerStands || [], this.info.flowerMap = this.info.flowerMap || [], 
                    this.info.boxs = this.info.boxs || [], this.info._randGardeners = this.info._randGardeners || [], 
                    this.info._randGardenerTime = this.info._randGardenerTime || 0, this.info._randGardTimes = this.info._randGardTimes || 0, 
                    this.info.hasBuyMall = this.info.hasBuyMall || {}, this.info.doubleTime = this.info.doubleTime || 0, 
                    this.info.wheelDouble = this.info.wheelDouble || 1, this.info.resumeTimes = this.info.resumeTimes || 0, 
                    this.info.resumeTime = this.info.resumeTime || 0, this.info.randomTime = this.info.randomTime || 0, 
                    this.info.randomTimes = this.info.randomTimes || 0, this.info.mapid = this.info.mapid || 1, 
                    this.info.finishGuideId = this.info.finishGuideId || 0, this.info.openFriendTime = this.info.openFriendTime || 0, 
                    this.info.openAdTime = this.info.openAdTime || 0, this.info.signDay = this.info.signDay || 0, 
                    this.info.dailyTaskMap = this.info.dailyTaskMap || {}, this.info.taskMap = this.info.taskMap || {}, 
                    this.flowerStandOutputCache = [], this.flowerStandTakeCache = [], this.info.tianfu = this.info.tianfu || {}, 
                    this.info.inviteFriendReward = this.info.inviteFriendReward || {}, this.info.flowerMap.length || this.unlockFlower();
                    for (var t = 0, i = this.info.flowerStands.length; t < i; t++) {
                        var n = this.info.flowerStands[t];
                        n.stock = n.stock || "0", n.collectMoney = n.collectMoney || "0", this.flowerStandTakeCache[t] = "0", 
                        n.money2 && this.addMoney2(n.money2), n.money2 = "0";
                    }
                    this.needCheckTaskId = this.needCheckTaskId || [], this.needSubRandGardenerTime = !0, 
                    this.initTask(), pomelo.onMessage("onAddShare", function(t) {
                        e.serverInfo.shareSucc = t.shareSucc, e.serverInfo.shareUids = t.shareUids, e.countTaskNum(10, e.serverInfo.shareSucc);
                    });
                }
            }, {
                key: "getTianfuLevel",
                value: function(e) {
                    var t = this.info.tianfu[e];
                    return null == t ? 0 : t;
                }
            }, {
                key: "modifyTianfuLevel",
                value: function(e, t) {
                    this.info.tianfu[e] = t, this.saveOther(), this.countTaskNum(6, 1);
                }
            }, {
                key: "getTianfuAdd",
                value: function(e) {
                    var t = this.getTianfuLevel(e), i = config.Talent.find(e);
                    return t ? i.addition[t - 1] : 0;
                }
            }, {
                key: "getTianfuLevelUpMoney2",
                value: function(e) {
                    var t = this.getTianfuLevel(e), i = config.Talent.find(e), n = i.cost[t];
                    return null != n ? n : i.cost[i.cost.length - 1];
                }
            }, {
                key: "addRandomEventTime",
                value: function(e) {
                    this.info.randomTime = Math.max(this.info.randomTime, 0), this.info.randomTime += e, 
                    this.saveOther();
                }
            }, {
                key: "addRandomEventTimes",
                value: function(e) {
                    this.info.randomTimes += e, this.saveOther();
                }
            }, {
                key: "randomEventTimesLimit",
                value: function() {
                    return this.info.randomTimes >= config.Common.randomEvent;
                }
            }, {
                key: "getMallAddMoneyRatio",
                value: function() {
                    var e = 0;
                    for (var t in this.info.hasBuyMall) e += config.Mall.find(t).val;
                    return e;
                }
            }, {
                key: "mallBuy",
                value: function(e) {
                    this.info.hasBuyMall[e] = 1, this.saveOther();
                }
            }, {
                key: "mallHasBuy",
                value: function(e) {
                    return !!this.info.hasBuyMall[e];
                }
            }, {
                key: "getInviteFriendNum",
                value: function() {
                    return this.serverInfo.shareSucc;
                }
            }, {
                key: "getInviteFriendList",
                value: function() {
                    for (var e = this.getInviteFriendNum(), t = this.serverInfo.shareUids || [], i = 0; i < e; ++i) t[i] || (t[i] = "");
                    return t;
                }
            }, {
                key: "addInviteFriendReward",
                value: function(e) {
                    this.info.inviteFriendReward[e] = !0, this.saveOther();
                }
            }, {
                key: "hasInviteFriendReward",
                value: function(e) {
                    return this.info.inviteFriendReward[e];
                }
            }, {
                key: "getInviteFriendRatio",
                value: function() {
                    var e = config.Common.inviteFriendsNumber, t = config.Common.inviteFriendsDouble;
                    for (var i in e) {
                        var n = e[i];
                        if (this.serverInfo.shareSucc < n) return t[i - 1] || 0;
                    }
                    return t[t.length - 1];
                }
            }, {
                key: "getTaskConfig",
                value: function(e) {
                    return void 0 !== e ? config.Task.find(Number(e)) : config.Item.all();
                }
            }, {
                key: "getTaskListByType",
                value: function(e) {
                    var t = {}, i = [], n = null;
                    for (var o in 0 === e ? t = this.info.taskMap : 1 === e && (t = this.info.dailyTaskMap), 
                    t) (n = utils.clone(t[o])).config = user.getTaskConfig(n.id), i.push(n);
                    var s = 0;
                    return i.sort(function(e, t) {
                        return e.config && t.config ? 0 != (s = t.state - e.state) ? 2 === e.state ? 1 : 2 === t.state ? -1 : s : e.config.sort - t.config.sort : 1;
                    }), i;
                }
            }, {
                key: "addTaskNum",
                value: function(e, t) {
                    var i = this.getTaskData(e);
                    i && 2 !== i.state && ("number" == typeof t && (t += ""), i.cnum = bigNumber.add(i.cnum + "", t + ""), 
                    this.needCheckTaskId = this.needCheckTaskId || [], this.needCheckTaskId.push(e));
                }
            }, {
                key: "setTaskNum",
                value: function(e, t) {
                    var i = this.getTaskData(e);
                    i && 2 !== i.state && "number" == typeof t && (t += "", i.cnum = bigNumber.compare(i.cnum, t) ? i.cnum : t, 
                    this.needCheckTaskId = this.needCheckTaskId || [], this.needCheckTaskId.push(e));
                }
            }, {
                key: "setTaskState",
                value: function(e, t) {
                    var i = this.getTaskData(e);
                    i && "number" == typeof t && (i.state = t, this.needCheckTaskId = this.needCheckTaskId || [], 
                    this.needCheckTaskId.push(e));
                }
            }, {
                key: "setTaskReword",
                value: function(e, t) {
                    var i = this.getTaskData(e);
                    "number" == typeof t && (i.rIndex = t, this.needCheckTaskId = this.needCheckTaskId || [], 
                    this.needCheckTaskId.push(e));
                }
            }, {
                key: "countTaskNum",
                value: function(e, t, i) {
                    for (var n = config.Task.findByType("taskType", e), o = 0, s = n.length; o < s; o++) i && i != n[o].item || (0 === n[o].metering ? this.setTaskNum(n[o].id, t) : this.addTaskNum(n[o].id, t));
                }
            }, {
                key: "changeTaskState",
                value: function() {
                    this.needCheckTaskId.length && (this.changeTaskStateByType(0), this.changeTaskStateByType(1), 
                    this.needCheckTaskId = [], this.saveOther());
                }
            }, {
                key: "createTaskInfo",
                value: function(e) {
                    return {
                        id: Number(e),
                        cnum: "0",
                        rIndex: 0,
                        state: 0
                    };
                }
            }, {
                key: "initTask",
                value: function() {
                    for (var e = config.Task.all(), t = 0, i = e.length; t < i; t++) 0 !== e[t].displayTask && (this.needCheckTaskId.push(e[t].id), 
                    0 == e[t].taskClass ? this.info.taskMap[e[t].id] || (e[t].moveNum <= 0 || e[t].moveNum == this.info.moveCount) && (this.info.taskMap[e[t].id] = this.createTaskInfo(e[t].id)) : 1 == e[t].taskClass && (this.info.dailyTaskMap[e[t].id] || (e[t].moveNum <= 0 || e[t].moveNum == this.info.moveCount) && (this.info.dailyTaskMap[e[t].id] = this.createTaskInfo(e[t].id))));
                    this.saveOther();
                }
            }, {
                key: "getTaskData",
                value: function(e) {
                    return this.info.dailyTaskMap[e] ? this.info.dailyTaskMap[e] : this.info.taskMap[e] ? this.info.taskMap[e] : null;
                }
            }, {
                key: "resetDailyTask",
                value: function() {
                    for (var e in this.info.dailyTaskMap) delete this.info.dailyTaskMap[e], this.info.dailyTaskMap[e] = this.createTaskInfo(e);
                    this.saveOther();
                }
            }, {
                key: "changeTaskStateByType",
                value: function(e) {
                    var t = null, i = null, n = 0;
                    this.needCheckTaskId = this.needCheckTaskId || [];
                    for (var o = 1 === e ? this.info.dailyTaskMap : this.info.taskMap, s = 0, a = this.needCheckTaskId.length; s < a; s++) o[n = this.needCheckTaskId[s]] && (i = o[n], 
                    (t = this.getTaskConfig(n)) && (cc.log("检查任务id-----" + n), i.rIndex < t.targetNum.length ? bigNumber.compare(i.cnum, t.targetNum[Number(i.rIndex)]) ? i.state = 1 : i.state = 0 : (i.state = 2, 
                    cc.log("任务id-----" + n + "已完成！"))));
                }
            }, {
                key: "hasTaskCompelate",
                value: function(e) {
                    if (void 0 === e || 0 === e) for (var t in this.info.taskMap) if (1 === this.info.taskMap[t].state && this.getTaskConfig(t)) return !0;
                    if (void 0 === e || 1 === e) for (var t in this.info.dailyTaskMap) if (1 === this.info.dailyTaskMap[t].state && this.getTaskConfig(t)) return !0;
                    return !1;
                }
            }, {
                key: "addBox",
                value: function(e, t) {
                    e = Number(e), t = Number(t) || 0;
                    for (var i = 0, n = this.info.boxs.length; i < n; i++) if (this.info.boxs[i].id == e) {
                        this.info.boxs[i].num += Number(t);
                        break;
                    }
                    i == n && this.info.boxs.push({
                        id: e,
                        num: t
                    }), this.saveOther();
                }
            }, {
                key: "getBox",
                value: function(e) {
                    for (var t = 0, i = this.info.boxs.length; t < i; t++) if (this.info.boxs[t].id == e) return this.info.boxs[t];
                    return {
                        id: e,
                        num: 0
                    };
                }
            }, {
                key: "removeBox",
                value: function(e, t) {
                    for (var i = 0, n = this.info.boxs.length; i < n; i++) if (this.info.boxs[i].id == e) return this.info.boxs[i].num -= t, 
                    void (this.info.boxs[i].num = Math.max(this.info.boxs[i].num, 0));
                }
            }, {
                key: "openBox",
                value: function(e, t, i) {
                    var n = this.getBox(e);
                    if (!n.num) return null;
                    var o = config.Box.find(e), s = [], a = null, r = 0;
                    t = Math.min(t, n.num), this.removeBox(e, t);
                    for (var c = 0, l = null; c < t; c++) {
                        a = [];
                        for (var u = 0; u < o.randomNum; u++) r = gConst.random.randomInt(0, this.info.flowerMap.length - 1), 
                        l = o.reward[r], a.push({
                            type: "card",
                            id: l,
                            num: o.rewardNum2
                        });
                        s.push(a);
                    }
                    if (!i) for (c = 0; c < s.length; c++) for (var h = 0; h < s[c].length; h++) "card" == s[c][h].type ? this.addFlowerCard(s[c][h].id - 1, s[c][h].num) : "coin" == s[c][h].type && this.addMoney(s[c][h].num);
                    return s;
                }
            }, {
                key: "getWarehouseLevel",
                value: function() {
                    return this.info.warehouseLevel;
                }
            }, {
                key: "setWarehouseLevel",
                value: function(e) {
                    var t = e - this.info.warehouseLevel;
                    this.info.warehouseLevel = e, this.saveOther(), this.countTaskNum(2, t), this.countTaskNum(14, this.info.warehouseLevel);
                }
            }, {
                key: "getWarehouseLevelUpMoney",
                value: function(e) {
                    e = e || 1;
                    for (var t = this.getWarehouseLevel(), i = "0", n = 0; n < e; ++n) {
                        var o = config.Level.find(t + n);
                        if (!o) break;
                        i = bigNumber.add(i, o.warehouseCostMoney);
                    }
                    return i;
                }
            }, {
                key: "warehouseLevelFull",
                value: function(e) {
                    return e = e || 1, this.levelFull(this.info.warehouseLevel + e);
                }
            }, {
                key: "getStoreLevel",
                value: function() {
                    return this.info.storeLevel;
                }
            }, {
                key: "addStoreLevel",
                value: function(e) {
                    this.info.storeLevel += e, this.saveOther(), this.countTaskNum(4, e), this.countTaskNum(16, this.info.storeLevel);
                }
            }, {
                key: "getStoreLevelUpMoney",
                value: function(e) {
                    e = e || 1;
                    for (var t = this.getStoreLevel(), i = "0", n = 0; n < e; ++n) {
                        var o = config.Level.find(t + n);
                        if (!o) break;
                        i = bigNumber.add(i, o.saleCostMoney);
                    }
                    return i;
                }
            }, {
                key: "storeLevelFull",
                value: function(e) {
                    return e = e || 1, this.levelFull(this.info.storeLevel + e);
                }
            }, {
                key: "levelFull",
                value: function(e) {
                    return !config.Level.find(e);
                }
            }, {
                key: "standLevelFull",
                value: function(e, t) {
                    return t = t || 1, this.levelFull(this.getFlowerStand(e).level + t);
                }
            }, {
                key: "getStandLevel",
                value: function(e) {
                    return this.getFlowerStand(e).level;
                }
            }, {
                key: "addStandLevel",
                value: function(e, t) {
                    var i = this.getFlowerStand(e);
                    i.level += t, this.saveOther(), this.countTaskNum(3, t), this.countTaskNum(15, i.level);
                }
            }, {
                key: "getStandCost",
                value: function(e, t) {
                    var i = this.getStandCostBase(e, t), n = (this.getFlowerStand(e), this.info.doubleTime > 0 ? 1 : 0);
                    return bigNumber.mult(i, 1 + this.getMoveRatio("moveDouble2") + 0 + n);
                }
            }, {
                key: "getStandCostBase",
                value: function(e, t) {
                    var i = this.getFlowerStand(e);
                    return t = t || i.level, config.Parterre.find(t)["materialConsume" + (e + 1)];
                }
            }, {
                key: "getStandProduce",
                value: function(e, t) {
                    var i = this.getStandProduceBase(e, t), n = (this.getFlowerStand(e), this.info.doubleTime > 0 ? 1 : 0);
                    return bigNumber.mult(i, 1 + this.getMoveRatio("moveDouble2") + n + parseFloat(0));
                }
            }, {
                key: "getStandResearchSpeed",
                value: function(e) {
                    var t = this.getFlowerStand(e);
                    if (t) {
                        var i = this.getFlowerUnlockConfig(e + 1);
                        if (i) return i.researchRate * (1 - t.worker2.velocity - this.getTianfuAdd(1));
                    }
                    return 300;
                }
            }, {
                key: "getStandProduceSpeed",
                value: function(e) {
                    return this.getFlowerStand(e), 1.5 * (1 - user.getTianfuAdd(3));
                }
            }, {
                key: "getStandProduceBase",
                value: function(e, t) {
                    var i = this.getFlowerStand(e);
                    return t = t || i.level, config.Parterre.find(t)["produceSpeed" + (e + 1)];
                }
            }, {
                key: "getStandAddMoney",
                value: function(e, t) {
                    var i = this.getStandAddMoneyBase(e, t), n = this.getFlowerStand(e), o = this.info.doubleTime > 0 ? 1 : 0, s = n.worker2 && n.worker2.expertise == n.flowerId ? n.worker2.double : 0;
                    return bigNumber.mult(i, 1 + o + parseFloat(s) + user.getTianfuAdd(6));
                }
            }, {
                key: "getAllStandAddMoney",
                value: function() {
                    for (var e = "0", t = 0, i = this.getFlowerStands().length; t < i; ++t) e = bigNumber.add(e, bigNumber.mult(this.getStandAddMoney(t), this.getMoveRatio("moveDouble4") + this.getMallAddMoneyRatio() + 1));
                    return e;
                }
            }, {
                key: "getStandAddMoneyBase",
                value: function(e, t) {
                    var i = this.getStandProduceBase(e, t), n = this.getFlowerStand(e), o = config.Item.find(n.flowerId);
                    if (!o) return "0";
                    var s = this.info.flowerMap[n.flowerId - 1], a = o.chosePrice[s.flowerLevel - 1];
                    return bigNumber.mult(i, a);
                }
            }, {
                key: "init",
                value: function() {
                    console.log("userInfo init");
                    var e = cc.sys.localStorage.getItem("userInfo" + pomelo.getUid());
                    e ? (e = JSON.parse(e)).timestamp < 3e5 && (cc.sys.localStorage.setItem("userInfoOld" + pomelo.getUid(), JSON.stringify(e)), 
                    e = {}) : e = {}, cc.log("取得的userInfo", e), this.info = e, this.initInfo();
                    var t = this;
                    setInterval(function() {
                        if (t.info.doubleTime > 0 && (t.info.doubleTime -= 1e3, t.needSave = !0), t.info.randomTime > 0 && (t.info.randomTime -= 1e3, 
                        t.needSave = !0), t.serverInfo) for (var e = 0, i = t.info.flowerStands.length; e < i; ++e) t.flowerStandOutputCache[e] = t.realCalcFlowerStandOutputSec(e);
                        t.changeTaskState(), t.needSave && (cc.sys.localStorage.setItem("userInfo" + pomelo.getUid(), JSON.stringify(t.info)), 
                        t.needSave = !1);
                    }, 1e3), setInterval(function() {
                        t.needSendOther ? t.setAllToServer() : t.needSendMoney && t.setMoneyToServer(), 
                        t.needSendOther = !1, t.needSendMoney = !1;
                    }, 18e4);
                }
            }, {
                key: "saveMoney",
                value: function() {
                    this.saveInfoToLocal(), this.needSendMoney = !0;
                }
            }, {
                key: "saveOther",
                value: function() {
                    this.saveInfoToLocal(), this.needSendOther = !0;
                }
            }, {
                key: "saveInfoToLocal",
                value: function() {
                    this.needSave = !0;
                }
            }, {
                key: "addMoney",
                value: function(e, t) {
                    this.info.money = bigNumber.add(this.info.money, e), this.info.totalMoney = bigNumber.add(this.info.totalMoney, e), 
                    this.saveMoney(), !t && this.countTaskNum(1, e);
                }
            }, {
                key: "reduceMoney",
                value: function(e) {
                    this.info.money = bigNumber.reduce(this.info.money, e), this.saveMoney();
                }
            }, {
                key: "moneyEnough",
                value: function(e) {
                    return bigNumber.compare(this.info.money, e);
                }
            }, {
                key: "getMoneyText",
                value: function() {
                    return bigNumber.closeNumToRealSpecial(this.info.money);
                }
            }, {
                key: "getMoney",
                value: function() {
                    return this.info.money;
                }
            }, {
                key: "getTotalMoney",
                value: function() {
                    return "0" == this.info.totalMoney ? "1000" : this.info.totalMoney;
                }
            }, {
                key: "addCoin",
                value: function(e) {
                    this.info.coin = bigNumber.add(this.info.coin, e), this.saveOther();
                }
            }, {
                key: "reduceCoin",
                value: function(e) {
                    this.info.coin = bigNumber.reduce(this.info.coin, e), this.saveOther();
                }
            }, {
                key: "coinEnough",
                value: function(e) {
                    return bigNumber.compare(this.info.coin, e);
                }
            }, {
                key: "getCoinText",
                value: function() {
                    return bigNumber.closeNumToRealSpecial(this.info.coin);
                }
            }, {
                key: "addMoney2",
                value: function(e) {
                    this.info.money2 = bigNumber.add(this.info.money2, e), this.saveOther(), this.countTaskNum(11, e);
                }
            }, {
                key: "reduceMoney2",
                value: function(e) {
                    this.info.money2 = bigNumber.reduce(this.info.money2, e), this.saveOther();
                }
            }, {
                key: "money2Enough",
                value: function(e) {
                    return bigNumber.compare(this.info.money2, e);
                }
            }, {
                key: "getMoney2Text",
                value: function() {
                    return bigNumber.closeNumToRealSpecial(this.info.money2);
                }
            }, {
                key: "getMoney2",
                value: function() {
                    return this.info.money2;
                }
            }, {
                key: "addDailyTimes",
                value: function(e) {
                    this.info.dialTimes += e, this.saveOther(), this.countTaskNum(12, e);
                }
            }, {
                key: "addDoubleTime",
                value: function(e) {
                    this.info.doubleTime += Number(e) || 0, this.saveOther();
                }
            }, {
                key: "setResumeTime",
                value: function(e) {
                    this.info.resumeTime = e, this.saveOther();
                }
            }, {
                key: "getResumeTime",
                value: function(e) {
                    return this.info.resumeTime;
                }
            }, {
                key: "setResumeTimes",
                value: function(e) {
                    this.info.resumeTimes = e, this.saveOther();
                }
            }, {
                key: "setWheelDouble",
                value: function() {
                    this.info.wheelDouble = 1 == this.info.wheelDouble ? 2 : 1, this.saveOther();
                }
            }, {
                key: "getWheelDouble",
                value: function() {
                    return this.info.wheelDouble;
                }
            }, {
                key: "setFriendBoxTime",
                value: function(e) {
                    this.info.openFriendTime = e, this.saveOther();
                }
            }, {
                key: "getFriendBoxTime",
                value: function() {
                    return this.info.openFriendTime;
                }
            }, {
                key: "setAdBoxTime",
                value: function(e) {
                    this.info.openAdTime = e, this.saveOther();
                }
            }, {
                key: "getAdBoxTime",
                value: function() {
                    return this.info.openAdTime;
                }
            }, {
                key: "getFlowerStandMax",
                value: function() {
                    var e = config.Move.findById(this.info.moveCount);
                    return e ? e.flowerStand : 0;
                }
            }, {
                key: "isFlowerStandMax",
                value: function() {
                    return this.info.flowerStands.length >= this.getFlowerStandMax();
                }
            }, {
                key: "unlockFlowerStand",
                value: function(e) {
                    e ? this.reduceCoin(this.getFlowerStandCost("costBullion")) : this.reduceMoney(this.getFlowerStandCost("costMoney")), 
                    this.flowerStandTakeCache[this.info.flowerStands.length] = "0";
                    var t = {
                        flowerId: 1,
                        level: 1,
                        worker2: null,
                        stock: "0",
                        collectMoney: "0",
                        money2: "0"
                    };
                    this.info.flowerStands.push(t), 0 == this.info.moveCount && (1 != this.info.flowerStands.length && 2 != this.info.flowerStands.length || (t.flowerId = -1)), 
                    this.saveOther();
                }
            }, {
                key: "unlockFlower",
                value: function() {
                    var e = this.getNextUnlockFlowerId();
                    if (!this.info.flowerMap[e]) {
                        this.info.flowerMap.push({
                            id: e,
                            flowerLevel: 1,
                            flowerCard: 0
                        });
                        var t = this.getItemConfig(e + 1);
                        this.reduceMoney(t.activationPrice), this.countTaskNum(5, 1, e + 1), this.saveOther();
                    }
                }
            }, {
                key: "getNextUnlockFlowerId",
                value: function() {
                    return this.info.flowerMap.length;
                }
            }, {
                key: "getFlowerStandLevelUpCost",
                value: function(e, t) {
                    var i = t || 0, n = this.info.flowerStands[e], o = config.Level.findById(n.level + i);
                    if (o) {
                        var s = "costMoney";
                        return o[s += e + 1];
                    }
                    return "0";
                }
            }, {
                key: "selectFlower",
                value: function(e, t) {
                    this.info.flowerStands[e] && (this.info.flowerStands[e].flowerId = t);
                }
            }, {
                key: "getFlowerStandLevelUpSumCost",
                value: function(e, t) {
                    t = t || 1;
                    for (var i = "0", n = 0; n < t; n++) {
                        var o = this.getFlowerStandLevelUpCost(e, n);
                        i = bigNumber.add(i, o);
                    }
                    return i;
                }
            }, {
                key: "flowerStandLevelUp",
                value: function(e, t) {
                    null === t && void 0 === t && (t = 1);
                    var i = this.info.flowerStands[e];
                    i.level + t > this.getLevelMax() && (t = this.getLevelMax() - i.level);
                    for (var n = 0; n < t; n++) this.reduceMoney(this.getFlowerStandLevelUpCost(e, n));
                    i.level += t, this.saveOther();
                }
            }, {
                key: "getFlowerStand",
                value: function(e) {
                    return this.info.flowerStands[e];
                }
            }, {
                key: "getFlowerStands",
                value: function() {
                    return this.info.flowerStands || [];
                }
            }, {
                key: "getFlowerMap",
                value: function() {
                    return this.info.flowerMap || [];
                }
            }, {
                key: "getFlowerStandCost",
                value: function(e) {
                    var t = config.FlowerUnlocking.findById(this.info.flowerStands.length + 1);
                    return t ? t[e] : 0;
                }
            }, {
                key: "getLevelMax",
                value: function() {
                    var e = config.Level.all();
                    return e[e.length - 1].id;
                }
            }, {
                key: "findFlower",
                value: function(e) {
                    return this.info.flowerMap[e];
                }
            }, {
                key: "getMoveFlowerId",
                value: function() {
                    return config.Move.findById(this.info.moveCount).flowerId;
                }
            }, {
                key: "getFlowerCard",
                value: function(e) {
                    var t = this.findFlower(e);
                    return t ? t.flowerCard : 0;
                }
            }, {
                key: "getFlowerLevel",
                value: function(e) {
                    var t = this.findFlower(e);
                    return t ? t.flowerLevel : 0;
                }
            }, {
                key: "getFlowerCost",
                value: function(e, t, i) {
                    return (i || config.FlowerLevel.find(e, t)).number;
                }
            }, {
                key: "flowerLevelUp",
                value: function(e) {
                    var t = this.findFlower(e);
                    if (t) {
                        for (var i = t.flowerCard, n = t.flowerLevel, o = 0, s = 1, a = 0, r = this.getMaxFlowerLevel(), c = 0; c < 999 && !(n + s > r); c++) {
                            if (i < (o += a = this.getFlowerCost(n + s))) {
                                o -= a, s--;
                                break;
                            }
                            s++;
                        }
                        return s && (this.removeFlowerCard(e, o), this.addFlowerLevel(e, s)), s;
                    }
                }
            }, {
                key: "toyLevelUp",
                value: function(e) {
                    var t = this.findFlower(e);
                    t && (t.flowerLevel += 1, this.countTaskNum(8, 1), this.countTaskNum(5, t.flowerLevel, e + 1));
                }
            }, {
                key: "addFlowerCard",
                value: function(e, t) {
                    var i = this.findFlower(e);
                    i && (i.flowerCard += Number(t) || 0, this.saveOther());
                }
            }, {
                key: "removeFlowerCard",
                value: function(e, t) {
                    var i = this.findFlower(e);
                    i && (i.flowerCard -= Number(t) || 0, this.saveOther());
                }
            }, {
                key: "addFlowerLevel",
                value: function(e, t) {
                    var i = this.findFlower(e);
                    i && (i.flowerLevel += Number(t) || 0, this.saveOther());
                }
            }, {
                key: "getMaxFlowerLevel",
                value: function(e) {
                    var t = config.FlowerLevel.findByType("style", e);
                    return t[t.length - 1].id;
                }
            }, {
                key: "getFlowerUnlockConfig",
                value: function(e) {
                    return config.FlowerUnlocking.find(e);
                }
            }, {
                key: "getFlowerLevelConfig",
                value: function(e, t) {
                    return config.FlowerLevel.find(e, t);
                }
            }, {
                key: "getItemConfig",
                value: function(e) {
                    return config.Item.find(e);
                }
            }, {
                key: "getFlowerIconRes",
                value: function(e, t) {
                    return (t || this.getItemConfig(e)).iconBouquet;
                }
            }, {
                key: "getFlowerRes",
                value: function(e, t) {
                    return (t || this.getItemConfig(e)).iconFlower;
                }
            }, {
                key: "hireWorker",
                value: function(e, t, i) {
                    var n = this.info.flowerStands[e];
                    n && (n["worker" + t] = i), 5 === i.quality && user.countTaskNum(13, 1), this.saveOther();
                }
            }, {
                key: "getWorker",
                value: function(e, t) {
                    var i = this.info.flowerStands[e];
                    return i ? i["worker" + t] : null;
                }
            }, {
                key: "calcFlowerStandOutputSec",
                value: function(e) {
                    return void 0 == this.flowerStandOutputCache[e] && (this.flowerStandOutputCache[e] = this.realCalcFlowerStandOutputSec(e)), 
                    this.flowerStandOutputCache[e];
                }
            }, {
                key: "realCalcFlowerStandOutputSec",
                value: function(e, t) {
                    return "0";
                }
            }, {
                key: "calcAllFlowerStandOutputSec",
                value: function() {
                    return this.getAllStandAddMoney();
                }
            }, {
                key: "getFlowerStandCollectMoney",
                value: function(e) {
                    var t = this.info.flowerStands[e];
                    return t ? bigNumber.reduce(t.collectMoney || "0", this.flowerStandTakeCache[e]) : "0";
                }
            }, {
                key: "getFlowerStandIcon",
                value: function(e) {
                    var t = this.info.flowerStands[e];
                    if (t) {
                        var i = config.Item.findById(t.flowerId);
                        if (i) return i.iconFlower;
                    }
                    return "";
                }
            }, {
                key: "addFlowerStandCollect",
                value: function(e, t, i) {
                    var n = this.info.flowerStands[e];
                    n && (n.collectMoney = i ? bigNumber.add(n.collectMoney, t) : bigNumber.reduce(n.collectMoney, t));
                }
            }, {
                key: "flowerStandDropMoeny2",
                value: function(e) {
                    var t = this.info.flowerStands[e];
                    t && (t.money2 = bigNumber.add(t.money2, "" + config.Common.researchPoint));
                }
            }, {
                key: "pickUpAllDropMoney2",
                value: function() {
                    for (var e = 0, t = this.info.flowerStands.length; e < t; e++) {
                        var i = this.info.flowerStands[e];
                        i.money2 && this.addMoney2(i.money2), i.money2 = "0";
                    }
                }
            }, {
                key: "takeFlowerStandCollect",
                value: function(e, t) {
                    var i = this.getFlowerStandCollectMoney(e);
                    return bigNumber.compare(i, t) || (t = i), this.flowerStandTakeCache[e] = bigNumber.add(this.flowerStandTakeCache[e], t), 
                    t;
                }
            }, {
                key: "getMoveAndMallRatio",
                value: function() {
                    var e = 0, t = config.Move.findById(this.info.moveCount), i = this.getMallAddMoneyRatio();
                    return t.moveDouble4 > 0 && (e += t.moveDouble4), i > 0 && (e += i), 1 + e + this.getTianfuAdd(8);
                }
            }, {
                key: "finishTake",
                value: function(e, t) {
                    this.addFlowerStandCollect(e, t, !1), this.flowerStandTakeCache[e] = bigNumber.reduce(this.flowerStandTakeCache[e], t), 
                    this.addMoney(bigNumber.mult(t, this.getMoveAndMallRatio())), this.saveOther();
                }
            }, {
                key: "addFlowerStandStock",
                value: function(e, t, i) {
                    var n = this.info.flowerStands[e];
                    return n && (n.stock = i ? bigNumber.add(n.stock, t) : bigNumber.reduce(n.stock, t), 
                    this.saveOther()), t;
                }
            }, {
                key: "getFlowerStandStock",
                value: function(e) {
                    var t = this.info.flowerStands[e];
                    return t ? t.stock : "0";
                }
            }, {
                key: "flowerStandProduce",
                value: function(e) {
                    var t = this.getStandCost(e), i = this.info.flowerStands[e];
                    i && (bigNumber.compare(t, i.stock) ? i.stock = "0" : i.stock = bigNumber.reduce(i.stock, t)), 
                    this.addFlowerStandCollect(e, this.getStandAddMoney(e), !0);
                }
            }, {
                key: "refreshWheelTime",
                value: function() {
                    0 == this.info.dialTimes && (this.info.resumeTimes = 0, this.info.resumeTime = 0);
                    var e = this.getWheelTimes() - config.Common.maximumSize;
                    if (e < 0) if (this.info.resumeTime) {
                        var t = Math.max(this.getResumeTimes(), e);
                        this.info.resumeTimes = Math.min(this.info.resumeTimes + t, 24), (e = this.getWheelTimes() - config.Common.maximumSize) < 0 ? this.setResumeTime(this.info.resumeTime + t * config.Common.recoveryTime * 1e3) : this.setResumeTime(0);
                    } else this.setResumeTime(this.getServerTime()); else this.setResumeTime(0);
                    this.saveOther();
                }
            }, {
                key: "getWheelTimes",
                value: function() {
                    return config.Common.initialNumber + this.info.resumeTimes + config.Common.freeTurntableTimes * this.info.dialAddTimes - this.info.dialTimes;
                }
            }, {
                key: "getResumeTimes",
                value: function() {
                    return Math.floor((this.getServerTime() - this.info.resumeTime) / (1e3 * config.Common.recoveryTime));
                }
            }, {
                key: "getWheelSharedTimes",
                value: function() {
                    return config.Common.freeTimes - this.info.dialAddTimes;
                }
            }, {
                key: "getCangkuWorkerNum",
                value: function(e) {
                    return void 0 == e && (e = this.getWarehouseLevel()), config.WareHouse.find(e).staffNum;
                }
            }, {
                key: "getWarehouseAdd",
                value: function(e) {
                    e = e || this.getWarehouseLevel();
                    var t = this.getWarehouseAddBase(e);
                    return bigNumber.mult(t, user.getMoveRatio("moveDouble1") + user.getTianfuAdd(5) + 1);
                }
            }, {
                key: "getWarehouseAddBase",
                value: function(e) {
                    return e = e || this.getWarehouseLevel(), config.WareHouse.find(e).transportSum;
                }
            }, {
                key: "getWarehouseSpeedBase",
                value: function(e) {
                    return e = e || this.getWarehouseLevel(), config.WareHouse.find(e).transportSpeed;
                }
            }, {
                key: "getWarehouseSpeed",
                value: function(e) {
                    return e = e || this.getWarehouseLevel(), this.getWarehouseSpeedBase(e) * (1 + user.getTianfuAdd(2));
                }
            }, {
                key: "getStoreAdd",
                value: function(e) {
                    e = e || this.getStoreLevel();
                    var t = this.getStoreAddBase(e);
                    return bigNumber.mult(t, 1 + user.getMoveRatio("moveDouble3") + user.getTianfuAdd(7));
                }
            }, {
                key: "getStoreAddBase",
                value: function(e) {
                    return e = e || this.getStoreLevel(), config.Send.find(e).sendSum;
                }
            }, {
                key: "getStoreSpeedBase",
                value: function(e) {
                    return e = e || this.getStoreLevel(), config.Send.find(e).sendSpeed;
                }
            }, {
                key: "getStoreSpeed",
                value: function(e) {
                    return this.getStoreSpeedBase(e) * (1 + user.getTianfuAdd(4));
                }
            }, {
                key: "getStoreWorkerNum",
                value: function(e) {
                    return void 0 == e && (e = this.getStoreLevel()), config.Send.findById(e).staffNum;
                }
            }, {
                key: "getGardeners",
                value: function() {
                    return this.info._randGardeners;
                }
            }, {
                key: "getGardenerRefreshTime",
                value: function() {
                    return this.info._randGardenerTime;
                }
            }, {
                key: "getGardenerRefreshTimes",
                value: function() {
                    return this.info._randGardTimes;
                }
            }, {
                key: "randGardeners",
                value: function(e) {
                    for (var t = config.Worker.all(), i = [], n = 0; n < t.length; n++) i.push(t[n].weight);
                    var o = 0, s = null, a = !1, r = gConst.random.randomInt(0, 4);
                    for (0 == this.info.moveCount && this.info.flowerStands[0] && !this.info.flowerStands[0].worker2 && (a = !0), 
                    this.info._randGardeners = [], n = 0; n < 5; n++) o = gConst.random.getArrayRand(i), 
                    s = a && 0 == n ? t[3] : 9 == this.info._randGardTimes && n === r ? t[t.length - 1] : t[o], 
                    this.info._randGardeners.push({
                        quality: s.quality,
                        double: parseFloat(gConst.random.random(s.doubleScope[0], s.doubleScope[1]).toFixed(2)),
                        expertise: gConst.random.randomInt(1, Math.max(this.info.flowerMap.length, 1)),
                        velocity: parseFloat(gConst.random.random(s.talentScope[0], s.talentScope[1]).toFixed(4))
                    });
                    this.info._randGardTimes = ++this.info._randGardTimes % 10, e && this.info._randGardenerTime <= this.getServerTime() && (this.info._randGardenerTime = this.getServerTime() + 1e3 * config.Common.refreshWorkerTime), 
                    this.saveOther();
                }
            }, {
                key: "randByWeight",
                value: function(e) {
                    for (var t = [], i = 0; i < e.length; i++) void 0 !== e[i].weight ? t.push(e[i].weight) : t.push(e[i]);
                    return gConst.random.getArrayRand(t);
                }
            }, {
                key: "employGardener",
                value: function(e) {
                    if (this.info._randGardeners[e]) return this.info._randGardeners[e].use = !0, this.saveOther(), 
                    this.info._randGardeners[e];
                }
            }, {
                key: "moveMap",
                value: function() {
                    if (this.isMoveCountMax()) return !1;
                    var e = this.getMoveCost();
                    return !!this.moneyEnough(e) && (this.pickUpAllDropMoney2(), this.info.moveCount += 1, 
                    this.info.money = "0", this.info.money2 = "0", this.info.warehouseLevel = 1, this.info.storeLevel = 1, 
                    this.info.flowerStands = [], this.flowerStandOutputCache = [], this.info._randGardenerTime = 0, 
                    this.info.flowerMap = [], this.flowerStandTakeCache = [], this.unlockFlower(), this.countTaskNum(7, 1), 
                    this.saveOther(), this.initTask(), !0);
                }
            }, {
                key: "getMoveRatio",
                value: function(e) {
                    return config.Move.find(this.info.moveCount)[e];
                }
            }, {
                key: "isMoveCountMax",
                value: function() {
                    return !config.Move.findById(this.info.moveCount + 1);
                }
            }, {
                key: "getMoveMapId",
                value: function() {
                    var e = config.Move.findById(this.info.moveCount);
                    return e ? e.moveScene || "1" : "0";
                }
            }, {
                key: "getMoveCost",
                value: function() {
                    var e = config.Move.findById(this.info.moveCount + 1);
                    return e ? e.moveCost : "0";
                }
            }, {
                key: "getTimeMoneyAdd",
                value: function(e, t) {
                    for (var i = e, n = t, o = null, s = this.getFlowerStands().length - 1; s >= 0; --s) if ("0" != this.getStandAddMoney(s)) {
                        o = s;
                        break;
                    }
                    if (null == o) return "0";
                    var a = bigNumber.mult(user.getStandAddMoney(o), i / this.getStandProduceSpeed() * n);
                    a = bigNumber.mult(a, this.getMoveRatio("moveDouble4") + this.getMallAddMoneyRatio() + 1);
                    var r = this.getStoreSpeed(), c = this.getStoreWorkerNum(), l = 353 * (1 + o) * 2 / r, u = Math.floor(i / l * c * n), h = bigNumber.mult(u, this.getStoreAdd());
                    return bigNumber.compare(h, a) ? a : h;
                }
            }, {
                key: "getOfflineMoney",
                value: function() {
                    var e = Math.min(config.Common.retentionTime, Math.floor(this.getOfflineTime() / 1e3)), t = config.Common.retentionTimeRate[Math.floor(e / config.Common.retentionTime * config.Common.retentionTimeRate.length)];
                    return void 0 == t && (t = config.Common.retentionTimeRate[config.Common.retentionTimeRate.length - 1]), 
                    this.getTimeMoneyAdd(e, t);
                }
            }, {
                key: "getRoleSpeed",
                value: function(e) {
                    return e ? this.getWarehouseSpeed(this.getWarehouseLevel()) : this.getStoreSpeed(this.getStoreLevel());
                }
            }, {
                key: "finishGuide",
                value: function(e) {
                    this.info.finishGuideId = e, this.saveOther();
                }
            }, {
                key: "isGuide",
                value: function(e) {
                    return !(this.info.moveCount > 0) && this.info.finishGuideId == e - 1;
                }
            }, {
                key: "getInviteIcons",
                value: function(e) {
                    var t = this;
                    if (!e) return this.getInviteIcons(function() {}), this.inviteIcons;
                    this.inviteIcons ? e(null, this.inviteIcons) : pomelo.request("scene.playerHandler.getRequest", {}, function(i) {
                        200 == i.code ? (t.inviteIcons = i.configs, e(null, t.inviteIcons)) : e("错误");
                    });
                }
            }, {
                key: "clearData",
                value: function() {
                    cc.sys.localStorage.setItem("userInfo" + pomelo.getUid(), JSON.stringify({
                        timestamp: 222222222222
                    })), channel.exit();
                }
            }, {
                key: "needInvite",
                value: function() {
                    return this.developVersion != gConst.version || this.needInvited;
                }
            }, {
                key: "canWatchAd",
                value: function() {
                    return this.needAd && 10 - this.info.adTimes > 0;
                }
            }, {
                key: "setAdTimes",
                value: function(e) {
                    e = e || 1, this.info.adTimes = e;
                }
            }, {
                key: "resetDeal",
                value: function(e) {
                    console.log("this.info = ",this.info)
                    var t = this.info.resetTime, i = 0;
                    t && (i = Math.floor((t / 1e3 + 28800) / 86400)), i != Math.floor((e / 1e3 + 28800) / 86400) && (this.info.adTimes = 0, 
                    this.info.dialAddTimes = 0, this.info.dialTimes = 0, this.info.randomTimes = 0, 
                    this.info.isSign = !1, this.info.resetTime = e, this.resetDailyTask(), this.saveOther());
                }
            }, {
                key: "setDevelopVersion",
                value: function(e) {
                    this.developVersion = e;
                }
            }, {
                key: "isDevelopVersion",
                value: function() {
                    return this.developVersion == gConst.version;
                }
            } ]), e;
        }();
        window.user = new o(), cc._RF.pop();
    }, {} ],
    utils: [ function(t, i, n) {
        cc._RF.push(i, "ff0f2GgVwxK46E9PSQdugmd", "utils");
        var o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        }, s = {
            generateInts: function() {
                var e = 0;
                return function() {
                    return ++e >= 2e9 && (e = 1), "a" + e;
                };
            },
            logInfo: function(e) {
                cc.log("----------------------------------------"), cc.log(e), cc.log("-----------------------------------------");
            },
            log: cc.log,
            inherits: function(e, t) {
                if ("function" != typeof e) throw new TypeError("#extend- child should be Function");
                if ("function" != typeof t) throw new TypeError("#extend- parent should be Function");
                if (e !== t) {
                    var i = function() {};
                    i.prototype = t.prototype, e.prototype = new i(), e.prototype.constructor = e;
                }
            },
            inRectangle: function(e, t, i) {
                return Math.abs(t.x - e.x) <= i.front && t.y - e.y <= -i.left && t.y - e.y >= -i.right;
            },
            inRectangle2: function(e, t, i, n, o, s) {
                var a = i.w, r = e + i.x - a / 2, c = s.width, l = n - c / 2, u = i.h, h = t + i.y - u / 2, d = s.height, g = o - d / 2;
                return r + a >= l && r <= l + c && h + u >= g && h <= g + d;
            },
            pointInRectangle: function(e, t, i, n, o, s) {
                return e >= i - o / 2 && e <= i + o / 2 && t >= n - s / 2 && t <= n + s / 2;
            },
            squareOverlap: function(e, t) {
                return e.x + e.width >= t.x && e.x <= t.x + t.width && e.y + e.height >= t.y && e.y <= t.y + t.height;
            },
            squareOverlap2: function(e, t, i, n, o, s, a, r) {
                return e + i / 2 >= o - a / 2 && o + a / 2 >= e - i / 2 && t + n / 2 >= s - r / 2 && s + r / 2 >= t - n / 2;
            },
            distance: function(e, t, i, n) {
                return Math.sqrt(s.distance2(e, t, i, n));
            },
            distance2: function(e, t, i, n) {
                var o = i - e, s = n - t;
                return o * o + s * s;
            },
            clone: function(e) {
                var t;
                if ("object" == (void 0 === e ? "undefined" : o(e))) if (null === e) t = null; else if (e instanceof Array) {
                    t = [];
                    for (var i = 0, n = e.length; i < n; i++) t.push(s.clone(e[i]));
                } else for (var a in t = {}, e) t[a] = s.clone(e[a]); else t = e;
                return t;
            },
            clone2: function(e) {
                return s.clone(e);
            },
            objectEmpty: function(e) {
                if (s.isArray(e)) {
                    for (var t = 0, i = e.length; t < i; ++t) if (e[t]) return !1;
                    return !0;
                }
                for (var t in e) if (void 0 != e[t] && null != e[t]) return !1;
                return !0;
            },
            getObjectNum: function(e) {
                var t = 0;
                for (var i in e) ++t;
                return t;
            },
            isString: function(e) {
                return "string" == typeof e || "[object String]" == Object.prototype.toString.call(e);
            },
            append: function(e, t) {
                for (var i in t) e.push(t[i]);
                return e;
            },
            insert: function(e, t) {
                for (var i in t) e[i] = t[i];
                return e;
            },
            removeArr: function(e, t) {
                for (var i in e) if (e[i] === t || "function" == typeof t && t(i, e[i])) return e.splice(i, 1), 
                i;
                return null;
            },
            valueInArred: function(e, t) {
                for (var i in e) if (e[i] === t || "function" == typeof t && t(i, e[i])) return !0;
                return !1;
            },
            formatTime: function(e) {
                if ((e = Math.floor(e)) <= 0) return "00:00:00";
                var t = function(e) {
                    return (e < 10 ? "0" : "") + e;
                }, i = Math.floor(e / 3600), n = Math.floor((e - 3600 * i) / 60), o = e - 3600 * i - 60 * n;
                return t(i) + ":" + t(n) + ":" + t(o);
            },
            formatMoney: function(e) {
                return e >= 1e7 ? Math.floor(e / 1e7) + "千万" : e >= 1e6 ? Math.floor(e / 1e6) + "百万" : e >= 1e4 ? Math.floor(e / 1e4) + "万" : e;
            },
            isArray: function(e) {
                return e instanceof Array;
            },
            hasValue: function(e, t) {
                for (var i in e) if (t(e[i])) return !0;
                return !1;
            },
            formatTime2: function(e) {
                e = Math.floor(e);
                var t = new Date();
                if ((e = Math.floor(getDataManager().getServerTime() / 1e3 - e)) <= 0) return "1秒前";
                var i = new Date(t.getFullYear(), t.getMonth(), 0).getDate(), n = Math.floor(e / (86400 * i)), o = Math.floor(e / 86400), s = Math.floor(e / 3600), a = Math.floor(e / 60);
                return n > 1 ? n + "个月前" : o >= 1 ? o + "天前" : s >= 1 ? s + "小时前" : a >= 1 ? a + "分钟前" : e + "秒前";
            },
            formatTime3: function(e) {
                if ((e = Math.floor(e)) <= 0) return "00:00";
                var t = function(e) {
                    return (e < 10 ? "0" : "") + e;
                }, i = Math.floor(e / 60), n = e - 60 * i;
                return t(i) + ":" + t(n);
            },
            arrToObject: function(e) {
                var t = {};
                return e.forEach(function(e) {
                    t[e] = !0;
                }), t;
            },
            isObject: function(e) {
                var t = void 0 === e ? "undefined" : o(e);
                return "function" == t || e && "object" == t;
            },
            isNumber: function(e) {
                return "number" == typeof e;
            },
            isFunction: function(e) {
                return "function" == typeof e;
            },
            toFix: function(e, t) {
                return parseFloat(e.toFixed(t));
            },
            removeAllRes: function() {},
            getRandomSeed: function() {
                return Math.floor(2e9 * Math.random());
            },
            arrayNoRepeatRandom: function(e, t, i) {
                var n = {};
                if (e.length > 5 * t) {
                    for (var o = [], s = 0; s < t; ++s) {
                        do {
                            r = i(0, e.length - 1);
                        } while (n[r]);
                        n[r] = !0, o.push(e[r]);
                    }
                    return o;
                }
                o = [];
                var a = [];
                for (var s in e) a.push(e[s]);
                for (s = 0; s < t && 0 != a.length; ++s) {
                    var r = i(0, a.length - 1);
                    o.push(a[r]), a.splice(r, 1);
                }
                return o;
            },
            cancelOtherEffect: function(e) {
                this.sysSetup.cancelOtherEffect = e, window.localStorage.setItem("sysSetup", JSON.stringify(this.sysSetup));
            },
            cancelOtherEffected: function() {
                return this.sysSetup.cancelOtherEffect;
            },
            init: function() {},
            boxBigger: function(e, t) {
                if (!s.doubleCompare(t, 1)) return e;
                if (s.isArray(e)) {
                    for (var i = [], n = 0; n < e.length; ++n) i.push(e[n] * t);
                    return i;
                }
                return {
                    front: e.front * t,
                    behind: e.behind * t,
                    right: e.right * t,
                    left: e.left * t
                };
            },
            doubleIsZero: function(e) {
                return e > -s.zeroDouble && e < s.zeroDouble;
            },
            doubleBiggerZero: function(e) {
                return e >= s.zeroDouble;
            },
            doubleSmallerZero: function(e) {
                return e <= -s.zeroDouble;
            },
            doubleCompare: function(e, t) {
                var i = e - t;
                return s.doubleBiggerZero(i) ? 1 : s.doubleSmallerZero(i) ? -1 : 0;
            },
            zeroDouble: 1e-9,
            sign: function(e) {
                return e >= 0 ? 1 : -1;
            },
            getDropRandom: function(e) {
                var t = [];
                for (var i in e.seeds) t.push({
                    monsterId: i,
                    seed: e.seeds[i]
                });
                return t.push({
                    monsterId: 0,
                    seed: e.seed2
                }), t;
            },
            setInterval: function(e, t, i, n) {},
            clearInterval: function(e) {},
            isEmptyObject: function(e) {
                for (var t in e) return !0;
                return !1;
            },
            getDistance: function(e, t) {
                return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
            },
            getWinSize: function() {
                return cc.sys.isNative ? s.__winSize__ ? s.__winSize__ : (s.__winSize__ = cc.director.getWinSize(), 
                s.__winSize__) : cc.director.getWinSize();
            },
            deleteObject: function(e) {
                for (var t in e) delete e[t];
            },
            removeSameInArr: function(e, t) {
                var i = {};
                for (var n in e.forEach(function(e) {
                    i[e] = !0;
                }), e.length = 0, i) e.push(t ? parseFloat(n) : n);
                return e;
            },
            getArr: function() {
                var e = s.arrPoolQueue.pop();
                return this.getPoolArrNum++, e || (cc.sys.isNative, []);
            },
            arrCompare: function(e, t) {
                if (e.length != t.length) return !1;
                for (var i = 0, n = e.length; i < n; ++i) if (e[i] != t[i]) return !1;
                return !0;
            },
            checkFloat: function(e) {
                return s.isNumber(e) && !isNaN(e);
            },
            getCheckValuep1: Math.floor(1e4 * Math.random()) + 4576585,
            getCheckValuep2: Math.floor(1e4 * Math.random()) + 899034523,
            getCheckValuep3: Math.floor(1e4 * Math.random()) + 89872,
            getCheckValue: function(e) {
                return (e * s.getCheckValuep1 + s.getCheckValuep2) % s.getCheckValuep3;
            },
            checkValueByModify: function(e, t) {
                return void 0 == e || e === s.getCheckValue(t);
            },
            getCheckValue2: function(e, t, i, n) {
                return e * (t + i + n);
            },
            checkValueByModify2: function(e, t, i, n, o) {
                return void 0 == e || void 0 == t || e === s.getCheckValue2(t, i, n, o);
            },
            getResName: function(e) {
                var t = e.split("/");
                return t[t.length - 1];
            },
            getPointRotation: function(e, t) {
                return Math.atan2(t.y - e.y, t.x - e.x);
            },
            getPointRotationDegree: function(e, t) {
                return s.getPointRotation(e, t) / Math.PI * 180;
            },
            hasSysVolume: function() {
                return s.sysSoundVolume > 0;
            },
            atan2: function(e, t) {
                var i = Math.atan2(e, t);
                return i < 0 && (i += 2 * Math.PI), i;
            },
            atan22: function(e, t, i, n) {
                var o = s.atan2(n - t, i - e);
                return o < 0 && (o += 2 * Math.PI), o;
            },
            angDiff: function(e, t) {
                var i = Math.abs(e - t);
                return i > Math.PI ? 2 * Math.PI - i : i;
            },
            rangeAngTrans: function(e, t) {
                var i = e.front + e.behind, n = e.right + e.left, o = e.front - e.behind, s = e.right - e.left, a = i / 2, r = n / 2, c = Math.abs(a), l = Math.atan2(r, a) + t;
                return {
                    x: Math.cos(l) * c,
                    y: Math.sin(l) * c,
                    w: o,
                    h: s
                };
            },
            outOTmp: {},
            pointRotation: function(e, t, i, n, o) {
                var s = i - e, a = n - t, r = Math.atan2(a, s) + o, c = Math.sqrt(s * s + a * a), l = this.outOTmp;
                return l.x = e + Math.cos(r) * c, l.y = t + Math.sin(r) * c, l;
            },
            eachAllChild: function(e, t) {
                for (var i = 0; i < e.childrenCount; ++i) t(e.children[i]), this.eachAllChild(e.children[i], t);
            }
        };
        window.utils = s, i.exports = s, cc._RF.pop();
    }, {} ],
    waitNetLayer: [ function(e, t, i) {
        cc._RF.push(t, "debbbi28ZNIUbGa/6uqe72X", "waitNetLayer");
        var n = {
            __instance: null,
            curPopNum: 0
        }, o = function() {
            n.__instance.getChildByName("image").active = !0;
            var e = n.__instance.getChildByName("label");
            n.labelStr ? (e.active = !0, e.getComponent(cc.Label).string = n.labelStr) : e.active = !1;
        }, s = null;
        n.popOri = function() {
            n.curPopNum++, n.curPopNum > 1 || (n.__instance || (n.__instance = cc.instantiate(resManager.getResource("prefabs/public/waitNet")), 
            cc.director.getScene().getChildByName("Canvas").addChild(n.__instance, gConst.waitNetZindex), 
            n.__instance.getChildByName("image").runAction(cc.repeatForever(cc.rotateBy(1, -220)))), 
            n.__instance.active = !0, n.__instance.getChildByName("image").active = !1, n.__instance.getChildByName("label").active = !1, 
            s = setTimeout(o, 2e3));
        }, n.hideOri = function() {
            n.curPopNum <= 0 || (--n.curPopNum, 0 === n.curPopNum && (s && (clearTimeout(s), 
            s = null), n.__instance && n.__instance.destroy(), n.__instance = null));
        }, n.curPopNum1 = 0, n.pop = function() {
            1 == ++this.curPopNum1 && this.popOri();
        }, n.hide = function() {
            this.curPopNum1 <= 0 || 0 == --this.curPopNum1 && this.hideOri();
        }, n.curPopNum2 = 0, n.pop2 = function() {
            this.curPopNum2 || (++this.curPopNum2, this.popOri());
        }, n.hide2 = function() {
            this.curPopNum2 && (this.curPopNum2 = 0, this.hideOri());
        }, n.setLabel = function(e) {
            if (n.labelStr = e, n.__instance) {
                var t = n.__instance.getChildByName("label");
                n.labelStr ? t.active = !0 : t.active = !1, t.getComponent(cc.Label).string = n.labelStr;
            }
        }, window.WaitNetLayer = n, cc._RF.pop();
    }, {} ],
    workItemUI: [ function(e, t, i) {
        cc._RF.push(t, "75c43Qmy1lD/7mvco0ZpowW", "workItemUI");
        var n = [ {
            icon: "zhujiemian5",
            color: "#a6f981"
        }, {
            icon: "zhujiemian6",
            color: "#81d3f9"
        }, {
            icon: "zhujiemian7",
            color: "#ef81f9"
        }, {
            icon: "zhujiemian8",
            color: "#f9db81"
        }, {
            icon: "zhujiemian9",
            color: "#ff6868"
        } ];
        cc.Class({
            extends: cc.Component,
            properties: {
                levelText: cc.Label,
                progressBar: cc.ProgressBar,
                levelTag: cc.Node,
                addMoney: cc.RichText,
                allAddMoney: cc.Label,
                actionNode: cc.Node,
                hireRoleNode: cc.Node,
                rateText: cc.Label,
                flowerNameText: cc.Label,
                maxLevelTag: cc.Node,
                tipNode: cc.Node,
                roleNode: cc.Node,
                produceSprite: cc.Sprite,
                talentTip: cc.Animation,
                _workIdx: 0,
                _isWork: !1,
                _level: 0,
                _isLevel: !1,
                _curProgressTime: 0,
                _progressTime: 1
            },
            start: function() {
                this._flowerMakeUI = this.actionNode.getComponent("flowerMakeUI"), this.updateFlower(), 
                this._progressTime = user.getStandProduceSpeed(this._workIdx), this._flowerMakeUI.setTimeScale(1.5 / this._progressTime), 
                this._curResearchTime = 0, this._tipTime = 0, this._updateTime = 0, this._isUpdate = !0, 
                this._talentTime = 0, this._flowerId = null, this._isHireComplete = !1, 0 == this._workIdx && sd.DlgMgr.showGuide(gConst.guides.selectItem, this.produceSprite.node.parent);
              
            },
            updateFlower: function() {
                var e = user.getFlowerStand(this._workIdx);
                if (e) {
                    if (e.flowerId == this._flowerId) return;
                    this._flowerId = e.flowerId;
                    var t = user.getItemConfig(this._flowerId);
                    t && (this.flowerNameText.string = t.desc, this._flowerMakeUI.updateSpriteTexture(t.iconFlower, t.iconPot, t.iconBouquet), 
                    this.produceSprite.spriteFrame = resManager.getResource("texture/flowericon/" + t.iconFlower));
                }
            },
            onWork: function() {
                this._curProgressTime = 0, this._isWork = !0, this.progressBar.node.active = !0, 
                this._flowerMakeUI.startMakeFlower();
            },
            stopWork: function() {
                this._isWork = !1, this.progressBar.node.active = !1, this._flowerMakeUI.stopMakeFlower();
            },
            hireRole: function(e, t) {
                if (this.roleNode.active || (this.roleNode.active = !0), 5 == t ? this._flowerMakeUI.setRole(2) : this._flowerMakeUI.setRole(0), 
                2 == e) {
                    this.hireRoleNode.active = !1;
                    var i = n[t - 1];
                    i && (this.progressBar.barSprite.spriteFrame = resManager.getResource("texture/new_ui/main/" + i.icon), 
                    this.rateText.node.color = cc.color(i.color)), this._isHireComplete = !0, this._researchTime = user.getStandResearchSpeed(this._workIdx);
                }
            },
            update: function(e) {
                if (this._updateTime += e, this._updateTime > 1 && (this._updateTime = 0, this._isUpdate = !0), 
                user.levelFull(this._level + 1)) this.levelText.node.parent.active && (this.levelTag.active = !1, 
                this.levelText.node.parent.active = !1, this.maxLevelTag.active = !0); else if (this._isUpdate) {
                    this.updateLevelInfo();
                    var t = user.moneyEnough(this._upCost);
                    sd.pf.setNodeGray(this.levelText.node, !t), sd.pf.setNodeSpriteFrameGray(this.levelText.node.parent, !t, "texture/new_ui/zhujiemian13"), 
                    t != this.levelTag.active && (this.levelTag.active = t), t && 0 == this._workIdx && sd.DlgMgr.showGuide(gConst.guides.standLevel, this.levelText.node.parent), 
                    1 == this._workIdx && (user.isGuide(gConst.guides.newStand) && user.finishGuide(gConst.guides.newStand), 
                    sd.DlgMgr.showGuide(gConst.guides.newSelectItem, this.produceSprite.node.parent));
                }
                if (this._isUpdate) {
                    var i = user.getFlowerStand(this._workIdx);
                    this.addMoney.string = bigNumber.closeNumToRealSpecial(i.stock), this.allAddMoney.string = bigNumber.closeNumToRealSpecial(user.getFlowerStandCollectMoney(this._workIdx)), 
                    this.updateFlower();
                    var n = i.worker2;
                    if (n && n.quality && i.flowerId > 0) {
                        var o = parseFloat(n.expertise == i.flowerId ? n.double + 1 : 1) + user.getTianfuAdd(6);
                        this.rateText.string = "x" + o.toFixed(2);
                    }
                }
                this._isUpdate = !1, this.updateProgress(e);
            },
            updateProgress: function(e) {
                if (this._isHireComplete) {
                    var t = user.getFlowerStand(this._workIdx), i = t.worker2, n = i && i.quality && t.flowerId > 0;
                    if (n && (i.expertise != t.flowerId ? (this._tipTime += e, this.tipNode.active ? this._tipTime >= 3 && this.setTipNodeShow(!1) : this._tipTime >= 5 && this.setTipNodeShow(!0)) : this.setTipNodeShow(!1)), 
                    this._isWork) {
                        this._curProgressTime += e, this._curProgressTime > this._progressTime && (this._curProgressTime -= this._progressTime, 
                        user.flowerStandProduce(this._workIdx), "0" == user.getFlowerStandStock(this._workIdx) && this.stopWork(), 
                        this._progressTime = user.getStandProduceSpeed(this._workIdx), this._flowerMakeUI.setTimeScale(1.5 / this._progressTime));
                        var o = this._curProgressTime / this._progressTime;
                        o < .054 && (o = 0), this.progressBar.progress = o, this._curResearchTime += e, 
                        this._curResearchTime >= this._researchTime && (this._curResearchTime = 0, this._researchTime = user.getStandResearchSpeed(this._workIdx), 
                        this.isDropMoney2() && (user.flowerStandDropMoeny2(this._workIdx), this.setTalentTipShow(!0)));
                    } else n && "0" != user.getFlowerStandStock(this._workIdx) && this.onWork();
                }
            },
            updateLevelInfo: function() {
                var e = user.getFlowerStand(this._workIdx);
                if (e) {
                    var t = e.level;
                    t != this._level && (this._level = t, this.levelText.string = "Lv." + t, this._upCost = user.getFlowerStandLevelUpSumCost(this._workIdx, 1));
                }
            },
            onLevelUp: function(e) {
                var t = this;
                popBannerDlg(function() {
                    var e = resManager.instantiate("prefabs/ui/cangkushengji");
                    return e.getComponent("cangkuDlg").typeName = "huatai", e.getComponent("cangkuDlg").otherValue = t._workIdx, 
                    e.getComponent("cangkuDlg").initUi(), e;
                }, null, null, window.bannerids[1]), sd.DlgMgr.closeGuide(gConst.guides.standLevel);
            },
            onHireRoleCallback: function() {
                sd.DlgMgr.closeGuide(gConst.guides.hireRole), sd.DlgMgr.closeGuide(gConst.guides.newHireRole);
                var e = resManager.getResource("prefabs/employ"), t = cc.instantiate(e);
                t.getComponent("employ").idx = this._workIdx, cc.director.getScene().getChildByName("Canvas").addChild(t, gConst.popBannerZindex);
            },
            setTipNodeShow: function(e) {
                this._tipTime = 0, this.tipNode.active = e;
            },
            onSelectFlowerCallback: function() {
                0 == this._workIdx ? sd.DlgMgr.closeGuide(gConst.guides.selectItem) : 1 == this._workIdx && sd.DlgMgr.closeGuide(gConst.guides.newSelectItem);
                var e = resManager.getResource("prefabs/selectflower"), t = cc.instantiate(e);
                cc.director.getScene().getChildByName("Canvas").addChild(t, gConst.popBannerZindex), 
                t.getComponent("selectflower").open(this._workIdx);
            },
            onPickUpTalentPoint: function() {
                this.setTalentTipShow(!1), sd.mainDlg.playPickUpEffect(this.talentTip.node, {
                    idx: this._workIdx
                });
            },
            setTalentTipShow: function(e) {
                var t = this.talentTip.node.active;
                this.talentTip.node.active = e, e && !t && (this.talentTip.playAdditive("xinpingzhong"), 
                this.talentTip.playAdditive("xinpingzhong1")), e != t && (this._talentTime = 0);
            },
            isDropMoney2: function() {
                var e = user.getFlowerUnlockConfig(this._workIdx + 1);
                return !!e && sd.mainDlg._random.randomInt(0, 99) < 100 * e.probability;
            }
        }), cc._RF.pop();
    }, {} ],
    wxRank: [ function(e, t, i) {
        cc._RF.push(t, "ad503KgoutCnbBsLfmoBIy4", "wxRank");
        var n = cc.Class({
            ctor: function(e, t) {
                var i = this;
                if (this.mBaseSprite = e.getComponent(cc.Sprite), this.baseSprite = e, this.curTime = 0, 
                this.inviteList = t, cc.sys.platform === cc.sys.WECHAT_GAME) {
                    this.mTexture = new cc.Texture2D(), this.setSpriteWidth(e.width), this.setSpriteHeight(e.height);
                    var n = 0;
                    this.bDrop = !0, e.on("touchstart", function(e) {
                        var t = e.touch.getLocation();
                        n = t.y;
                    }, this), e.on("touchmove", function(e) {
                        if (i.bDrop = !i.bDrop, !i.bDrop) {
                            var t = e.touch.getLocation();
                            wx.postMessage({
                                messageType: 2,
                                info: {
                                    y: t.y - n
                                },
                                key: "rank_money"
                            }), n = t.y, i.mCurRender = 0;
                        }
                    }, this), e.on("touchend", function(e) {
                        var t = e.touch.getLocation();
                        n = t.y;
                    }, this), e.on("touchcancel", function(e) {
                        var t = e.touch.getLocation();
                        n = t.y;
                    }, this), this.postMsg(1);
                } else console.log("[wechat_rank] 初始化");
                this.mCurRender = 0;
            },
            postMsg: function(e) {
                cc.sys.platform === cc.sys.WECHAT_GAME ? wx.postMessage({
                    messageType: e,
                    key: "rank_money",
                    openid: pomelo.getUid(),
                    inviteList: this.inviteList
                }) : console.log("[wechat_rank] 获取好友排行榜 " + e);
            },
            postStateMsg: function(e, t) {},
            postDescMessage: function(e) {
                cc.sys.platform === cc.sys.WECHAT_GAME && wx.postMessage({
                    messageType: 6,
                    desc: e
                });
            },
            _updateSubDomainCanvas: function() {
                void 0 != window.sharedCanvas && (this.mTexture.initWithElement(window.sharedCanvas), 
                this.mBaseSprite.spriteFrame = new cc.SpriteFrame(this.mTexture), this.baseSprite.active = !0);
            },
            update: function(e) {
                this.curTime += e, this.curTime > .1 && (this.curTime = 0, this._updateSubDomainCanvas());
            },
            setSpriteWidth: function(e) {
                this.spriteWidth != e && (this.spriteWidth = e, window.sharedCanvas && (window.sharedCanvas.width = e));
            },
            setSpriteHeight: function(e) {
                this.spriteHeight != e && (this.spriteHeight = e, window.sharedCanvas && (window.sharedCanvas.height = e));
            }
        });
        t.exports = n, cc._RF.pop();
    }, {} ]
}, {}, [ "configFunData", "configTrans", "gConst", "AudioMgr", "ButtonEx", "NodeEx", "NodeExtend", "SpriteEx", "SpriteExtend", "index", "channel", "libWechat", "localData", "DlgMgr", "musicManager", "connection", "http", "pomelo-client", "protocol", "Func", "bigNumberCal", "emitter", "popBannerDlg", "popLayer", "pressButtonDeal", "random", "waitNetLayer", "resourceManager", "boomeffect", "cangkuDlg", "ChangeColor", "ListView", "LoadPrefab", "PopCompont", "Shield", "uiBase", "employ", "flowergrow", "flowerlevelup", "flowermap", "flowermapitem", "guideTipUI", "guideUI", "inviteDlg", "itemDropEffect", "lixianDlg", "loadingScene", "breedFlowerUI", "dropMoneyEffect", "flowerMakeUI", "levelUpTagUI", "lockWorkItemUI", "mainDlg", "materialUI", "moneyEffect", "pickUpEffect", "pickUpEffect2", "randomEvent", "roleUI", "scrollViewHandle", "switchMainUI", "workItemUI", "moveDlg", "moveFlowersDlg", "openbox", "openboxitem", "rankDlg", "selectflower", "shopDlg", "signDlg", "sureaddtime", "tanchu", "task", "taskitem", "tianfu", "toylevel ", "toylevelitem", "uiWheelNode", "userInfo", "utils", "wxRank" ]);
var moreGamesButton = null
/**
 * 创建更多游戏按钮
 */
var createMoreGamesButton = function(){
    wx.getSystemInfo({
        success: function(o) {
            var h = cc.winSize.height / o.windowHeight;
            var s = o.windowWidth/cc.winSize.width;
            cc.winSize.width, o.windowWidth;
            moreGamesButton = wx.createMoreGamesButton({
                type: "text",
                //image: "images/more_games_btn.png",
                style: {
                    left: o.windowWidth - s * 150,
                    top: o.windowHeight - s * 120,
                    width: s * 150,
                    height: s * 120,
                    lineHeight: 50,
                    backgroundColor: "#00000000",
                    textColor: "#00000000",
                    textAlign: "center",
                    fontSize: 0,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#00000000"
                },
                appLaunchOptions: [
                    {
                    appId: "ttff4989f46063cd3f",
                    query: "foo=bar&baz=qux",
                    extraData: {}
                    },
                    {
                    appId: "tt88defe6317f471df",
                    query: "foo=bar&baz=qux",
                    extraData: {}
                    },
                    {
                    appId: "tt854cf3f11a6610f8",
                    query: "foo=bar&baz=qux",
                    extraData: {}
                    },
                    {
                    appId: "tt3b054db8a42f46c9",
                    query: "foo=bar&baz=qux",
                    extraData: {}
                    },
                    {
                    appId: "ttc21eb4a35d342053",
                    query: "foo=bar&baz=qux",
                    extraData: {}
                    }
                    // {...}
                ],
                onNavigateToMiniGame(res) {
                    console.log("跳转其他小游戏", res);
                }
            });

            moreGamesButton.onTap(() => {
            console.log("点击更多游戏");
            });
        }
    })
}
var moreGamesButtonHideCount = 0
var moreGamesButtonHide = function(add){
  add = add || 0
  moreGamesButtonHideCount += add
  console.log("moreGamesButtonHideCount",moreGamesButtonHideCount)
  moreGamesButton && moreGamesButton.hide()
}
var moreGamesButtonShow = function(add){
  if(add){
    moreGamesButtonHideCount -= add
    console.log("moreGamesButtonHideCount",moreGamesButtonHideCount)
    if(moreGamesButtonHideCount <= 0){
      moreGamesButton && moreGamesButton.show()
    }
  }else{
    moreGamesButton && moreGamesButton.show()
  }
}
var liveRewardTime = -1
/**
 * 当前是否可以领取分享录屏奖励
 */
var isLiveReward = function(){
    if(liveRewardTime == -1){
        try {
            liveRewardTime = /*tt.*/wx.getStorageSync("liveRewardTime");
            if (!liveRewardTime || liveRewardTime == "") {
                liveRewardTime = 0
            }
        } catch (error) {
            // console.log(`getStorageSync调用失败`);
        }
    }
    var curTime = new Date().getTime()
    return (curTime - liveRewardTime) > (6 * 60 * 60 *1000)
}
/**
 * 设置分享录屏奖励时间
 */
var setLiveRewardTime = function(){
    try {
        liveRewardTime = new Date().getTime()
        /*tt.*/wx.setStorageSync("liveRewardTime", liveRewardTime);
    } catch (error) {
        // console.log(`setStorageSync调用失败`);
    }
}
var videoRewardTime = -1
/**
 * 获取上次领取视频奖励时间
 */
var getVideoRewardTime = function(){
    if(videoRewardTime == -1){
        try {
            videoRewardTime = /*tt.*/wx.getStorageSync("videoRewardTime");
            if (!videoRewardTime || videoRewardTime == "") {
                videoRewardTime = 0
            }
        } catch (error) {
            // console.log(`getStorageSync调用失败`);
        }
    }
    var curTime = new Date().getTime()
    return curTime - videoRewardTime
}
/**
 * 当前是否可以领取视频奖励
 */
var isVideoReward = function(){
  return getVideoRewardTime() >= VideoRewardCD
}
/**
 * 记录看视频奖励时间
 */
var setVideoRewardTime = function(){
    try {
        videoRewardTime = new Date().getTime()
        /*tt.*/wx.setStorageSync("videoRewardTime", videoRewardTime);
    } catch (error) {
        // console.log(`setStorageSync调用失败`);
    }
}
var VideoRewardCD = 90 * 1000
/**
 * 格式化时间 Date
 * @param fmt "yyyy-MM-dd hh:mm:ss"
 * @param date Data
 */
var dateFtt = function(fmt,date)   
{ 
    var o = {   
        "M+" : date.getMonth()+1,                 //月份   
        "d+" : date.getDate(),                    //日   
        "h+" : date.getHours(),                   //小时   
        "m+" : date.getMinutes(),                 //分   
        "s+" : date.getSeconds(),                 //秒   
        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
        "S"  : date.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
}
/**
 * 格式化时间 time
 * @param fmt "yyyy-MM-dd hh:mm:ss"
 * @param time 毫秒
 */
var  timeFtt = function(fmt,time){
    return dateFtt(fmt,new Date(time)) 
}
const isToutiaio = /*tt.*/wx.getSystemInfoSync().appName === "Toutiao";
var interstitialAd = null
/**
 * 预加载插屏
 */
var createInterstitialAd = function(isShow){
  // 插屏广告仅今日头条安卓客户端支持
    // console.log("createInterstitialAd = ",interstitialAd)
  if (isToutiaio) {
    if(interstitialAd){
      interstitialAd.destroy()
    }
    interstitialAd = /*tt.*/wx.createInterstitialAd({
      adUnitId: window.InterstitialAdids[0]
    });
    interstitialAd
      .load()
      .then(() => {
        // console.log("isShow = ",interstitialAd)
        if(isShow || interstitialAd.isShow){
          interstitialAd.show();
        }
        interstitialAd.isLoad = true
      })
      .catch(err => {
        interstitialAd.destroy()
        interstitialAd = null
        console.log(err);
      });
      interstitialAd.onClose(function(){
        createInterstitialAd()
      })
  }
}
/**
 * 显示插屏
 */
var showInterstitialAd = function(){
  // console.log("showInterstitialAd = ",interstitialAd)
  if(interstitialAd){
    if(!interstitialAd.isShow){
      interstitialAd.isShow = true
      if(interstitialAd.isLoad){
        interstitialAd.show();
      }
    }
  }else{
    createInterstitialAd(true)
  }
}