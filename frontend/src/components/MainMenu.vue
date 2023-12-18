<template>
	<ion-menu ref="menu" side="end" content-id="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ $t("menu.head") }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-list lines="none">
				<ion-item :button="true" @click="select('/home')">
					<ion-label>{{ $t("menu.home") }}</ion-label>
				</ion-item>
				<ion-item-divider> </ion-item-divider>
				<ion-item :button="true" @click="select('/profile')">
					<ion-label>{{ $t("menu.profile") }}</ion-label>
				</ion-item>
                <ion-item-divider> </ion-item-divider>
				<ion-item href="https://t.me/botapps" >
					<ion-label>{{ $t("menu.author") }}</ion-label>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>
<script setup lang="ts">
import {
	IonContent,
	IonHeader,
	IonMenu,
	IonItemDivider,
	IonTitle,
	IonToolbar,
	IonItem,
	IonLabel,
	IonList,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const menu = ref();
const router = useRouter();
function select(path: string) {
	menu.value.$el.close();
	router.push(path);
}
</script>
