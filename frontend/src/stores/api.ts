import i18n from "@/i18n";
const { locale } = i18n.global;

import { api } from "@/api/http"; 

import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useMainStore } from "./main";
 
export const useApiStore = defineStore("api", () => {
	const token = ref("");
	const main = useMainStore();
	const getUserInfo = ref(async () => {
		const { data } = await api.get("/users");
		main.language = data.language;
		main.isAgreed = data.agreed;
	});

	async function auth() {
		const { data } = await api.get("/auth/tg", {
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
							config.headers,
						);
					}
					return config;
				},
				(error) => {
					return Promise.reject(error);
				},
			);
			await getUserInfo.value();
		}
	}
   
	const getBots =  ref(() => api.get("/bots"));

	const addMethod = ref((props: Object) =>
		api.put("/methods", {
			...props,
		}),
	);

	const addBot = ref((props: Object) =>
		api.put("/bots", {
			...props,
		}),
	);

	const sendMessage = ref((props: Object) =>
		api.put("/dialogues", {
			...props,
		}),
	);
	const sendImage = ref((props: Object) =>
		api.post("/dialogues/upload", props, {
			headers: { "Content-Type": "multipart/form-data" },
		}),
	);

	const confirmDeal = ref((id: string) =>
		api.put("/deals/confirm", {
			id,
		}),
	);

	const cashOut = ref((id: string, address: string) =>
		api.post("/deals/cashout", {
			id,
			address,
		}),
	);

	const agree = ref(() => api.post("/users/agree"));

	const cancelDeal = ref((id: string) => api.delete(`/deals/${id}`));

	const addOffer = ref((props: Object) =>
		api.put("/offers", {
			...props,
		}),
	);

	const deleteBot = ref((id: String) => api.delete("/bots/" + id));

	const delOffer = ref((id: String, returnAdress?: String) =>
		api.delete("/offers/" + id, {
			params: { address: returnAdress },
		}),
	);

	const updateBot = ref((params: any) => {
		const { id, ...data } = params;
		return api.post("/bots/" + id, { ...data });
	});

	const updateOffer = ref((params: any) => {
		const { id, ...data } = params;
		return api.post("/offers/" + id, { ...data });
	});

	const userOffers = ref((params: any) => {
		return api.get("/offers" + main.initData.user.id);
	});

	const updateUser = ref((params: any) => {
		return api.post("/users/", { ...params });
	});

	const newAddress = useAxios(
		"",
		{
			method: "GET",
		},
		api,
		{ immediate: false },
	);
	const getRate = useAxios(
		"",
		{
			method: "GET",
		},
		api,
		{ immediate: false },
	);
	const getDeal = useAxios(
		"",
		{
			method: "GET",
		},
		api,
		{ immediate: false },
	);

	const getComission = useAxios(
		"",
		{
			method: "GET",
		},
		api,
		{ immediate: false },
	);
	const getPersonalOffers = useAxios(
		"/users/offers",
		{
			method: "GET",
		},
		api,
		{ immediate: false },
	);
	const getMessages = useAxios(
		"",
		{
			method: "GET",
		},
		api,
		{ immediate: false },
	);
 

	return {
		auth, 
		addMethod,
		deleteBot,
		updateBot,
		addOffer,
		delOffer,
		updateOffer,
		userOffers,
		newAddress,
		getRate,
		getComission,
		getPersonalOffers,
		updateUser,
		getUserInfo,
		addBot,
		getDeal,
		sendMessage,
		sendImage,
		getMessages,
		getBots,
		confirmDeal,
		cancelDeal,
		cashOut,
		agree,
	};
});
