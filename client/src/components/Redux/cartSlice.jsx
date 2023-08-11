import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
    cartlist:[],
   
}
const cartSlice=createSlice({
    name:"cart",
    initialState:INITIAL_STATE,        
    reducers:{                        
        addtocart:(state,action)=>{
            const itemExist = state.cartlist.find((item) => item.id === action.payload.id);

            if (itemExist) {
              state.cartlist.forEach((item) => {
                if (item.id === action.payload.id) {
                  item.count += 1;
                }
              });
            } else {
              state.cartlist.push({ ...action.payload, count: 1 });
            }
          
            return state;
          
           
        },
        increment:(state,action)=>{
           const productid=action.payload;   
           const updatedCartlist = [...state.cartlist];
        
           updatedCartlist.forEach((item) => {
             if (item?.id === productid) {
             
               item.count += 1;
             }
           });
         
          //  return {
          //    ...state,
          //    cartlist: updatedCartlist,
          //  };
         },
       
             
        
        decrement:(state,action)=>{
            const productid=action.payload;
            console.log(productid)
            const updatedCartlist = [...state.cartlist];
          updatedCartlist.forEach((item)=>{
             if (item?.id===productid){
             
                item.count-=1;
             
             } 
         });

        },
    }
})
export const {addtocart,increment,decrement}=cartSlice.actions;
export default cartSlice.reducer;       