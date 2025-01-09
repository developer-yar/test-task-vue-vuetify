import { createStore } from "vuex";
import { IProfile } from "@/models/IProfile";
import { IState } from "@/models/IState";
import { profileStatus } from "@/models/profileStatus";

const state: IState = {
  profiles: [],
  filter: {},
};

export default createStore({
  state,
  getters: {
    profiles(state: IState) {
      return state.profiles;
    },
    filteredProfiles(state: IState) {
      return state.profiles.filter((profile) => {
        return Object.keys(state.filter).every((key: string) => {
          const filterValue = state.filter[key as keyof IProfile];
          const profileValue = profile[key as keyof IProfile];

          return profileValue && filterValue
            ? profileValue
                .toString()
                .toLowerCase()
                .includes(filterValue.toString().toLowerCase())
            : true;
        });
      });
    },
  },
  mutations: {
    loadProfiles(state, payload: IProfile[]) {
      state.profiles = payload;
    },
    addProfile(state, payload: IProfile) {
      state.profiles.push({ ...payload });
    },
    editProfile(state, payload: IProfile) {
      state.profiles = state.profiles.map((profile: IProfile) => {
        if (profile.id === payload.id) return { ...payload };
        else return profile;
      });
    },
    removeProfiles(state, identifiers: number[]) {
      const identifiersSet = new Set(identifiers);
      state.profiles = state.profiles.filter(
        (profile: IProfile) => !identifiersSet.has(profile.id)
      );
    },
    setFilter(state, payload: IProfile) {
      state.filter = payload;
    },
  },
  actions: {
    async loadProfiles(context, type: profileStatus = "all") {
      let queryString = "";
      switch (type) {
        case "all":
          queryString = "";
          break;
        case "processed":
          queryString = "?status=true";
          break;
        case "unprocessed":
          queryString = "?status=false";
          break;
      }
      const request = await fetch(
        `${process.env.VUE_APP_API_URL}/data/${queryString}`
      );
      const response: IProfile[] = (await request.json()).filter(
        (profile: IProfile) => profile.id !== undefined
      );
      context.commit("loadProfiles", response);
    },
    addProfile(context, payload: IProfile) {
      context.commit("addProfile", payload);
    },
    editProfile(context, payload: IProfile) {
      context.commit("editProfile", payload);
    },
    removeProfiles(context, payload: number[]) {
      context.commit("removeProfiles", payload);
    },
    setFilter(context, payload: IProfile) {
      context.commit("setFilter", payload);
    },
  },
});
