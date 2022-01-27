import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const state = {
    currentUser: atomWithStorage("currentUser", null),
    posts: atom([]),
};

export default state;
