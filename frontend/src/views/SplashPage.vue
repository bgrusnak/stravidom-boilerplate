<style>
.login-view {
	background-image: url("/splash.jpg");
	-webkit-background-size: cover;
	-moz-background-size: center cover;
	background-size: cover;
	background-repeat: no-repeat;
	background-position-x: center;
	background-position-y: center;
	width: 100vw;
	height: 100vh;
}
</style>
<template>
	<div class="login-view"></div>
</template>
<script setup lang="ts">
import { useApiStore, useMainStore } from "@/stores";
import { IonProgressBar } from "@ionic/vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const main = useMainStore();
const api = useApiStore();
const router = useRouter();

api.auth();

async function checkAuth() {
	if (main.isAuthenticated) {
		return router.push("/home");
	} else {
		setTimeout(checkAuth, 1000);
		api.auth();
	}
}

setTimeout(checkAuth, 1000);
</script>
