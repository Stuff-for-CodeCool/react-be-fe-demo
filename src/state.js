import { atomWithStorage } from "jotai/utils";

const state = {
    currentUser: atomWithStorage("currentUser", null),
};

export default state;
