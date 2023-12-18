<template>
	<ion-page>
		<Header>
			<template #header><ion-title>{{$t('profile.title')}}</ion-title></template>
		</Header>
		<ion-content :fullscreen="true"
			><ion-list>
				<ion-item>
					<ion-input
						:label="$t('profile.username')"
						:value="main.username.value"
						@ionInput="updateUsername($event)"
					></ion-input>
				</ion-item>
				<ion-item>
					<ion-input
						:label="$t('profile.firstName')"
						:value="main.firstName.value"
						@ionInput="updateFirstName($event)"
					></ion-input>
				</ion-item>
				<ion-item>
					<ion-input
						:label="$t('profile.lastName')"
						:value="main.lastName.value"
						@ionInput="updateLastName($event)"
					></ion-input>
				</ion-item>
				<ion-item>
					<ion-select
						mode="ios"
						label="Language"
						interface="action-sheet"
						justify="space-between"
						:value="main.language.value"
						label-placement="fixed"
						@ionChange="main.language.value = $event.detail.value"
					>
						<ion-select-option value="en">English</ion-select-option>
						<ion-select-option value="ru">Russian</ion-select-option>
					</ion-select>
				</ion-item></ion-list
			>
			<ion-grid>
				<ion-row>
					<ion-col size="6">
						<ion-button shape="round" @click="update">Update</ion-button>
					</ion-col>
					<ion-col size="6">
						<ion-button shape="round" @click="revert" color="danger">Revert</ion-button>
					</ion-col>
				</ion-row>
			</ion-grid>
 
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonTitle,
	IonContent,
	IonText,
	IonItem,
	IonInput,
	IonLabel,
	IonList,
	IonModal,
	IonCol,
	IonRow,
	IonGrid,
	IonSelect,
	IonSelectOption,
	IonButton,
} from "@ionic/vue";
import Header from "@/components/Header.vue";
import { ref } from "vue"; 
import { useApiStore, useMainState } from "@/stores";
import { useRouter } from "vue-router"; 
 
const main = useMainState();
const oldLanguage = ref(main.language);
const api = useApiStore();
/* const getTimezoneText = (str: string) => {
	const tz = timezones.find(({ value }) => value == str);
	return tz ? tz.text : 'GMT';
};

const updateUsername = (ev:any) => {
	main.usernamevalue = ev.target.value;
};

const updateFirstName = (ev:any) => {
	main.firstName.value = ev.target.value;
};

const updateLastName = (ev:any) => {
	main.lastName = ev.target.value;
};

// const timezone = ref("GMT");
const timezoneText = ref(getTimezoneText(main.timezone.value));

function tzSelectionChanged(selected: string[]) {
	main.timezone.value = selected[0];
	timezoneText.value = getTimezoneText(selected[0]);
	tzModal.value.$el.dismiss();
}

const revert = async () => {
	await api.getUserInfo();
	timezoneText.value = getTimezoneText(main.timezone.value);
};

const router = useRouter();

const update = () => {
	api.updateUser({
		language: main.language.value,
		timezone: main.timezone.value,
		username: main.username.value,
		first_name: main.firstName.value,
		last_name: main.lastName.value,
	});
	if (oldLanguage.value != main.language.value) {
		router.go(0);
	}
}; */

</script>
