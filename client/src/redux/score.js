import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    score: 0,
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.score += action.payload
        },
        decrement: (state, action) => {
            state.score -= action.payload
        },
        resetScore: (state) => {
            state.score = 0
        },
    },
})


export const { increment, decrement, resetScore } = scoreSlice.actions

export default scoreSlice.reducer