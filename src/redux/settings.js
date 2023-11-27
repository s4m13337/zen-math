import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        m: 3,
        n: 4,
        angle: 43,
        scalingFactor: 300,
        iterations: 360,
        background: '#eee',
        stroke: '#333',
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

        changeIterations: (state, action) => {
            state.iterations = action.payload;
        },

        changeBackground: (state, action) => {
            state.background = action.payload;
        },

        changeStroke: (state, action) => {
            state.stroke = action.payload;
        },

        toggleAnimation: (state, action) => {
            state.animation = action.payload
        },

        toggleRotation: (state, action) => {
            state.rotation = action.payload
        }
    }
});

export const { changeM, changeN, changeAngle, changeScalingFactor, changeIterations, changeBackground, changeStroke, toggleAnimation, toggleRotation } = settingsSlice.actions;
export default settingsSlice.reducer;