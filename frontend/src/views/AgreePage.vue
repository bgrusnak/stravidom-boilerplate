<template>
    <ion-page>
        <Header>
            <template #header
                ><ion-title>{{ $t("pages.agree.title") }}</ion-title></template
            >
        </Header>
        <ion-content :fullscreen="true" ref="content"
            ><RenderBlocks :content="text" />
            <ion-footer collapse="fade">
                <ion-grid>
                    <ion-row class="ion-align-items-center">
                        <ion-col sie="auto">
                            <ion-button @click="agree">{{
                                $t("pages.agree.agree")
                            }}</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
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
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/vue";
import RenderBlocks  from '@/utils/RenderBlocks';
import Header from "@/components/Header.vue";
import { ref, onMounted } from "vue";
import { useApiStore, useMainStore } from "@/stores";
import { useRouter } from "vue-router";
const api = useApiStore();
const main = useMainStore();
const router = useRouter();
const langs = ["en", "ru"];
const text = ref([]);

const language = langs.includes(main.language) ? main.language : "en";

const agree = async () => {
    await api.onAgree();
    main.isAgreed = true;
    router.push("/home");
};

onMounted(async () => {
    text.value = await api.terms(language); 
});
</script>
