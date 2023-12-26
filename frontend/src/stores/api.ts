import { api } from "@/api/http";

import { defineStore } from "pinia";
import { ref } from "vue";
import { useMainStore } from "./main";

export const useApiStore = defineStore("api", () => {
    const token = ref("");
    const main = useMainStore();

    async function auth() {
        const { data } = await api.post("/api/tgauth", [main.initQuery], {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (data.authenticated) {
            main.isAuthenticated = true;
            if(data.user.agreed_rules) {
                main.isAgreed = true;
            }
            token.value = data.token;
            api.interceptors.request.use(
                (config) => {
                    if (token.value) {
                        config.headers = Object.assign(
                            {
                                Authorization: `Bearer ${token.value}`,
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

    const onAgree = ref(() => {
        return api.post("/api/tgauth/agree");
    });

    return {
        auth,
        onAgree,
        terms,
    };
});
