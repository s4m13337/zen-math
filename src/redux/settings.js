import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        m: 3,
        n: 4,
        angle: 43,
        scalingFactor: 300,
        background: '#eee',
        fill: '#333',
        animation: true,
        rotation: true
    },
    reducers: {
        changeM: (state, action) => {
            state.m = action.payload;
        },

        changeN: (state, action) => {
            state.n = action.payload;
        },

        changeAngle: (state, action) => {
            state.angle = action.payload;
        },

        changeScalingFactor: (state, action) => {
            state.scalingFactor = action.payload;
        },

        changeBackground: (state, action) => {
            state.background = action.payload;
        },

        changeFill: (state, action) => {
            state.fill = action.payload;
        },

        toggleAnimation: (state, action) => {
            state.animation = action.payload
        },

        toggleRotation: (state, action) => {
            state.rotation = action.payload
        }
    }
});

export const { changeM, changeN, changeAngle, changeScalingFactor, changeBackground, changeFill, toggleAnimation, toggleRotation } = settingsSlice.actions;
export default settingsSlice.reducer;