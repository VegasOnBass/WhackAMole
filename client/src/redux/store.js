import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import highScoreReducer from './highScore.js'
import scoreReducer from './score.js'
import showScoresReducer from './showScores.js'
import soundsReducer from './sounds.js'

const persistedHighScore = {
  key: "highScore",
  storage
}

const persistedScore = {
  key: "score",
  storage
}

const persistedLeaders = {
  key: "showScores",
  storage,
}

const persistedSounds = {
  key: "sounds",
  storage,
}

const persistedReducer1 = persistReducer(persistedHighScore, highScoreReducer)
const persistedReducer2 = persistReducer(persistedScore, scoreReducer)
const persistedReducer3 = persistReducer(persistedLeaders, showScoresReducer)
const persistedReducer4 = persistReducer(persistedSounds, soundsReducer)

export const store = configureStore({
  reducer: {
    highScore: persistedReducer1,
    score: persistedReducer2,
    showScores: persistedReducer3,
    sounds: persistedReducer4,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
