// ==UserScript==
// @name         微博默认按照最新时间排序
// @namespace    npm/vite-plugin-monkey
// @version      0.0.1
// @author       kazoottt
// @description  将网页版的微博自动设置为最新微博（按时间顺序）浏览
// @license      MIT
// @icon         https://weibo.com/favicon.ico
// @match        https://weibo.com/**
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// ==/UserScript==

(function () {
  'use strict';

  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const useOption = (key, title, defaultValue) => {
    if (typeof _GM_getValue === "undefined") {
      return {
        value: defaultValue
      };
    }
    let value = _GM_getValue(key, defaultValue);
    const ref = {
      get value() {
        return value;
      },
      set value(v) {
        value = v;
        _GM_setValue(key, v);
        location.reload();
      }
    };
    _GM_registerMenuCommand(`${title}: ${value ? "✅" : "❌"}`, () => {
      ref.value = !value;
    });
    return ref;
  };
  const timelineDefault = useOption(
    "isDanmakuScrollModeLocked",
    "默认最新微博",
    true
  );
  console.log("%c Line:41 🥥 timelineDefault", "color:#42b983", timelineDefault);
  if (timelineDefault.value) {
    const clickElement = () => {
      const element = document.querySelector('[role="link"][title="最新微博"]');
      if (element) {
        element.click();
      } else {
        setTimeout(clickElement, 1e3);
      }
    };
    clickElement();
  }

})();