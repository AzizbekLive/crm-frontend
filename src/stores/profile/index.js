import { create } from 'zustand';

const initialValues = {
    token: null,
    profile: {},
    isLogout: false,
};

// Create Zustand store
export const useProfileStore = create((set) => ({
    // Initial State
    ...initialValues,

    // Actions
    setToken: (token) => {
        try {
            set({ token: token });
        } catch (error) {}
    },
    setProfile: (profile) => {
        set({ profile: profile, isLogout: false });
    },
    logOutProfile: () => {
        set({ ...initialValues });
    },
}));
