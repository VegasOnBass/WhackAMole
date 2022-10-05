import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    highScore: 0,
}

export const highScoreSlice = createSlice({
    name: 'highScore',
    initialState,
    reducers: {
        isAmount: (state, action) => {
            state.highScore = action.payload
        },
    },
})


export const { isAmount } = highScoreSlice.actions

export default highScoreSlice.reducer