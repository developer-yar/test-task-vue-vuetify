import { IProfile } from "@/models/IProfile";

export const useClearProfile = () => {
  const clearProfile = (profile: Partial<IProfile>): void => {
    Object.assign(profile, {
      ...profile,
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      lastName: "",
      firstName: "",
      interests: "",
    });
  };
  return { clearProfile };
};
