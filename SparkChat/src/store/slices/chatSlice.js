export const chatSlice = (set, get) => ({
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessage: [],
  selectedDM: [],
  isUploading:false,
  isDownloading:false,
  fileUploadProgress:0,
  fileDownloadProgress:0,
  setIsUploading:(data)=> set({isUploading:data}),
  setIsDownloading:(data)=> set({isDownloading:data}),
  setFileUploadProgress:(fileUploadProgress)=> set({fileUploadProgress}),
  setFileDownloadProgress:(fileDownloadProgress)=> set({fileDownloadProgress}),
  unreadMessages: {},
  setSelectedDM: (messages) => set({ selectedDM: messages }),
  setSelectedChatType: (type) => set({ selectedChatType: type }),
  setSelectedChatMessage: (messages) => set({ selectedChatMessage: messages }),
  setSelectedChatData: (data) => {
    set({
      unreadMessages: {
        ...get().unreadMessages,
        [data._id]: 0, 
      },
      selectedChatData: data,
    });
  },

  setUnreadMessages: (unreadMessages) => set({ unreadMessages }),

  addMessage: (message) => {
    const {
      selectedChatType,
      selectedChatData,
      selectedChatMessage,
      unreadMessages,
    } = get();

    const isCurrentChat =
      selectedChatType === "contact" &&
      selectedChatData &&
      (selectedChatData._id === message.sender._id ||
        selectedChatData._id === message.recipient._id);

    if (!isCurrentChat) {
      const contactId = message.sender._id;
      set({
        unreadMessages: {
          ...unreadMessages,
          [contactId]: (unreadMessages[contactId] || 0) + 1,
        },
      });
    } else {
      set({
        selectedChatMessage: [
          ...selectedChatMessage,
          {
            ...message,
            recipient: message.recipient._id,
            sender: message.sender._id,
          },
        ],
      });
    }
  },

  closeChat: () =>
    set({
      selectedChatData: null,
      selectedChatType: null,
      selectedChatMessage: [],
    }),
});
