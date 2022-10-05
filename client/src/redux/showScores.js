import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showScores: false,
}

export const showScoresSlice = createSlice({
    name: 'showScores',
    initialState,
    reducers: {
        toggleScores: (state, action) => {
            state.showScores = action.payload
        },
    },
})


export const { toggleScores } = showScoresSlice.actions

export default showScoresSlice.reducer