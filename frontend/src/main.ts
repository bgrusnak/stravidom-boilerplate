import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
/* Theme variables */
import "./theme/variables.css";
import i18n from "./i18n";

import App from "./App.vue";

const app = createApp(App).use(i18n).use(IonicVue).use(router).use(createPinia());

router.isReady().then(() => {
	app.mount("#app");
	if ((window as any).Telegram && (window as any).Telegram.WebApp) {
		(window as any).Telegram.WebApp.expand();
		(window as any).Telegram.WebApp.ready();
		(window as any).Telegram.WebApp.BackButton.hide();
	}
	defineCustomElements(window);
});
