import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gameSong: false,
    gameFX: true
}

export const soundsSlice = createSlice({
    name: 'sounds',
    initialState,
    reducers: {
        toggleSong: (state) => {
            state.gameSong = !state.gameSong
        },
        toggleFx: (state) => {
            state.gameFX = !state.gameFX
        },
    },
})


export const { toggleSong, toggleFx } = soundsSlice.actions

export default soundsSlice.reducer