<template>
    <ion-page>
        <Header>
            <template #header>
                <ion-title>{{ $t("pages.home.title") }}</ion-title>
            </template>
        </Header>
        <ion-content :fullscreen="true">
            <EmptyContainer :name=" $t("pages.home.empty")" />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonTitle } from "@ionic/vue";
import Header from "@/components/Header.vue";
import EmptyContainer from "@/components/EmptyContainer.vue";
</script>
