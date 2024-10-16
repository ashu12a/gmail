import { createSlice } from '@reduxjs/toolkit'

export const NewMailPopup = createSlice({
    name: 'newMailPopup',
    initialState: {
        isOpen: 0,
    },
    reducers: {
        setOpen: (state) => {
            state.isOpen = true
        },
        setClose: (state) => {
            state.isOpen = false
        },
    },
})

export const { setOpen, setClose } = NewMailPopup.actions

export default NewMailPopup.reducer