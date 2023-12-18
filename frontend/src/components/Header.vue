<template>
    <ion-header>
        <ion-toolbar>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col sie="10">
                        <slot name="header"><ion-title>Demo miniapp</ion-title></slot>
                    </ion-col>
                    <ion-col size="2"> 
                        <ion-menu-button></ion-menu-button>
                    </ion-col></ion-row></ion-grid>
        </ion-toolbar>
        <slot></slot>
    </ion-header>
</template>

<script setup lang="ts">
import {
    IonMenuButton, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol
} from '@ionic/vue'; 
</script>