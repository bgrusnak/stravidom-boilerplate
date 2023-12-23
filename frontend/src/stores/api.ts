import { api } from "@/api/http";

import { defineStore } from "pinia";
import { ref } from "vue";
import { useMainStore } from "./main";

export const useApiStore = defineStore("api", () => {
    const token = ref("");
    const main = useMainStore();

    async function auth() {
        const { data } = await api.get("/tgauth", {
            params: { query: main.initQuery },
        });
        if (data.authenticated) {
            main.isAuthenticated = true;
            token.value = data.token;
            api.interceptors.request.use(
                (config) => {
                    let accessToken = token.value;
                    if (accessToken) {
                        config.headers = Object.assign(
                            {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            config.headers
                        );
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        }
    }

    const terms = ref(async (locale: string) => {
        const ret = await api.get(`/api/terms?locale=${locale}`);
        return ret.data.data.attributes.content;
    });

    const onAgree = ref(() => api.post("/tgauth/agree"));

    return {
        auth,
        onAgree,
        terms,
    };
});
