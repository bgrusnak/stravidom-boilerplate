import { createI18n } from "vue-i18n";

import enTranslation from "../translations/en.json";
import ruTranslation from "../translations/ru.json";


const i18n = createI18n({
	locale: "en",
	fallbackLocale: "en",
	legacy: false,
	globalInjection: true,
	messages: {
		en: enTranslation,
		ru: ruTranslation,
	},
	// pluralizationRules: require("./generated/choices.js"),
});

export default i18n;