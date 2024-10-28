
export const authSlice = (set) => ({
    userInfo: null,
    setUserInfo: (info) => set(() => ({ userInfo: info })),
    clearUserInfo: () => set(() => ({ userInfo: null })),
  });