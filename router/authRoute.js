import express from 'express'
import {register,login,test, forgotpassword, currentUser, editUserProfile} from '../controllers/authController.js'
import { requireSignin ,isAdmin} from '../middlewares/authmiddleware.js';
const router=express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/currentuser").get(requireSignin,currentUser)
router.route("/forgotpassword").post(forgotpassword)
router.route('/test').get(requireSignin,isAdmin,test)
router.route('/edituserProfile').put(requireSignin,editUserProfile)
router.route('user-auth').get(requireSignin,(req,res)=>{
    res.status(200).send({message:true});
})

export default router;
