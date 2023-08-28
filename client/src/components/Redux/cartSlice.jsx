import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
    cartlist:[],
   
}
const cartSlice=createSlice({
    name:"cart",
    initialState:INITIAL_STATE,        
    reducers:{                        
        addtocart:(state,action)=>{
            const itemExist = state.cartlist.find((item) => item._id === action.payload._id);

            if (itemExist) {
              state.cartlist.forEach((item) => {
                if (item._id === action.payload._id) {
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
             if (item?._id === productid) {
             
               item.count += 1;
             }
           });
         
         },
       
        decrement:(state,action)=>{
            const productid=action.payload;
            console.log(productid)
            const updatedCartlist = [...state.cartlist];
          updatedCartlist.forEach((item)=>{
             if (item?._id===productid){
               if(item.count>0) item.count-=1
               else return
             } 
         });
        },
        removeItem:(state,action)=>{
          const productid=action.payload
         const updatedCartlist=state.cartlist
         const deleted=
          updatedCartlist.filter((item)=>(
            item._id!==productid
          ))
          return {
            ...state,
            cartlist: deleted
          };
        }
    }
})
export const {addtocart,increment,decrement,removeItem}=cartSlice.actions;
export default cartSlice.reducer;       