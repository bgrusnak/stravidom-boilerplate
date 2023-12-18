<template>
	<ion-page>
		<Header>
			<template #header
				><ion-title>{{ $t("agree.title") }}</ion-title></template
			>
		</Header>
		<ion-content :fullscreen="true" ref="content"
			><div>
				<iframe
					:src="'/terms/' + language + '.html'"
					ref="iframe"
					sandbox="allow-scripts"
					style="width: 100%; height: 75vh"
				/>
			</div>
			<ion-footer collapse="fade">
				<ion-button @click="agree">{{ $t("agree.agree") }}</ion-button>
			</ion-footer>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonTitle,
	IonContent,
	IonFooter,
	IonButton,
} from "@ionic/vue";
import Header from "@/components/Header.vue";
import {  ref } from "vue";
import { useApiStore, useMainStore  } from "@/stores";
import { useRouter } from "vue-router";
const api = useApiStore();
const main = useMainStore();
const iframe = ref();
const router = useRouter();
const langs = ['en', 'ru']

const language = ref(langs.includes(main.language) ? main.language : 'en')

const agree = async () => {
	await api.agree();
	main.isAgreed = true;
	router.push("/home");
};
</script>
