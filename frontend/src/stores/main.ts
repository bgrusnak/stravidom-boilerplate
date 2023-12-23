import { defineStore } from "pinia";
import { ref } from "vue";  
import { useWebApp, useWebAppHapticFeedback } from "vue-tg";

import {
	toastController,
} from "@ionic/vue";

export const useMainStore = defineStore("main", () => {  
	const isAgreed = ref(false);
	const isAuthenticated = ref(false);
	const initQuery = ref(useWebApp().initData);
	const initData = ref(
		useWebApp().initDataUnsafe
	);
	const userId = ref(initData.value.user.id); 
	const language = ref(initData.value.user.language_code);

	const errorToast = ref(async (message:string) => {
		const toast = await toastController.create({
			message,
			duration: 1500,
			position: "top",
			color: "danger",
		});
		useWebAppHapticFeedback().notificationOccurred("error");
	
		await toast.present();
	})

	return { isAgreed, isAuthenticated, language, userId, initData, initQuery, errorToast };
});
