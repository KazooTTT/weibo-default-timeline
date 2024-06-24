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

if (timelineDefault.value) {
  // 通过title='最新微博'这个自定义的属性来会找到最新微博这个tab的元素
  const element: HTMLDivElement | null = document.querySelector('[role="link"][title="最新微博"]');
  // 通过click()方法来模拟点击
  if (element) {
    element.click();
  }
}


