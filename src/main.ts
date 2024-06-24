import {
  GM_getValue,
  GM_registerMenuCommand,
  GM_setValue,
} from "$";

const useOption = (key: string, title: string, defaultValue: boolean) => {
  if (typeof GM_getValue === "undefined") {
    return {
      value: defaultValue,
    };
  }

  let value = GM_getValue(key, defaultValue);
  const ref = {
    get value() {
      return value;
    },
    set value(v) {
      value = v;
      GM_setValue(key, v);
      location.reload();
    },
  };

  GM_registerMenuCommand(`${title}: ${value ? "✅" : "❌"}`, () => {
    ref.value = !value;
  });

  return ref;
};

const timelineDefault = useOption(
  "isDanmakuScrollModeLocked",
  "默认最新微博",
  true
)

console.log("%c Line:41 🥥 timelineDefault", "color:#42b983", timelineDefault);

if (timelineDefault.value) {
  // 定义一个函数，用于定时获取元素并执行点击操作
  const clickElement = () => {
    // 通过title='最新微博'这个自定义的属性来会找到最新微博这个tab的元素
    const element: HTMLDivElement | null = document.querySelector('[role="link"][title="最新微博"]');
    // 如果找到了元素，则执行点击操作
    if (element) {
      element.click();
    } else {
      // 如果未找到元素，则延迟一段时间后再次尝试获取
      setTimeout(clickElement, 1000); // 1秒后再次尝试获取
    }
  };

  // 调用clickElement函数，开始定时获取元素并执行点击操作
  clickElement();

}