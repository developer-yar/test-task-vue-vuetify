import { IProfile } from "@/models/IProfile";

export interface IState {
  profiles: IProfile[];
  filter: Partial<IProfile>;
}
