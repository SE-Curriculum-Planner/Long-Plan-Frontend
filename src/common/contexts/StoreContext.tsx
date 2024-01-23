import { Nullable } from "tsdef";
import { User } from "types";
import { create } from "zustand";

type GlobalStore = {
	userData: Nullable<User>;
	setUserData: (data: User) => void;
};

const useGlobalStore = create<GlobalStore>()((set) => ({
	userData: null,
	setUserData: (data: User) => set(() => ({ userData: data })),
}));

export default useGlobalStore;
