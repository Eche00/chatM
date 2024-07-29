import { create } from "zustand";
import { useUserStore } from "./userStore";

// == Zustand store for managing chat-related state
export const useChatStore = create((set) => ({
  // ID of the current chat
  chatId: null,
  // Details of the user involved in the chat
  user: null,
  // Flag indicating if the current user is blocked
  isCurrentUserBlocked: false,
  // Flag indicating if the chat receiver is blocked
  isReceiverBlocked: false,


  // == Function to change chat info
  changeChat: (chatId, user) => {
    // * Get the current user from the user store
    const currentUser = useUserStore.getState().currentUser;

    // * Check if the current user is blocked by the receiver
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        // Set user to null if blocked
        user: null, 
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // * Check if the current receiver is blocked by the current user
    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        // Set user to null if blocked
        user: null, 
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      // If neither user is blocked, update the chat info
      set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },

  // == Function to toggle the block status of the receiver
  changeBlock: () => {
    set((state) => ({
      ...state,
      // Toggle the block status
      isReceiverBlocked: !state.isReceiverBlocked, 
    }));
  },
}));
