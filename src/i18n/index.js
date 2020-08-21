import Vue from "vue";
import VueI18n from "vue-i18n";
import Cookies from "js-cookie";
import zhLocale from "./zh";

Vue.use(VueI18n);

const messages = {
    zh: {
        ...zhLocale
    }
};

export function getLanguage() {
    // 从cookis 里面取语言
    const chooseLanguage = Cookies.get("language");
    // cookies 还没语言设定
    if (!chooseLanguage) {
        // 设置默认语言为中文
        Cookies.set("language", "zh");
    }
    // cookies 已经有语言设定
    if (chooseLanguage)
        return chooseLanguage;

    const language = (
        navigator.language || navigator.browserLanguage
    ).toLowerCase();

    // 本地化
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale;
        }
    }
    return "en";
}

const i18n = new VueI18n({
    locale: "zh",//getLanguage()
    messages
});

export default i18n;