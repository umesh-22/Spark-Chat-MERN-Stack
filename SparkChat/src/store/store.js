import { create } from 'zustand'
import { authSlice } from './slices/authSlice'
import { chatSlice } from './slices/chatSlice'




export const useAppStore = create((set,get)=>({
    ...authSlice(set,get),
    ...chatSlice(set,get)

}))