import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    videos : [],
    videosCount:0
}

const videoSlicer = createSlice({
    name : 'video',
    initialState ,
    reducers : {
        addToSaveList: (state,action)=>{
            state.videos.push(action.payload);
            state.videosCount = state.videos.length;
        }
    }

})

export const {addToSaveList} = videoSlicer.actions;
export default videoSlicer.reducer ; 

