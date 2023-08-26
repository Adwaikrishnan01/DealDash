import express from 'express'
import {register,login,test, forgotpassword, currentUser, editUserProfile, getallUsers,deleteUser,updateUser} from '../controllers/authController.js'
import { requireSignin ,isAdmin} from '../middlewares/authmiddleware.js';
const router=express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/currentuser").get(requireSignin,currentUser)
router.route("/forgotpassword").post(forgotpassword)
router.route('/test').get(requireSignin,isAdmin,test)
router.route('/edituserProfile').put(requireSignin,editUserProfile)
router.route('/getallusers').get(requireSignin,isAdmin,getallUsers)
router.route('/deleteuser/:id').delete(requireSignin,isAdmin,deleteUser)
router.route('/updateuser/:id').put(requireSignin,isAdmin,updateUser)
router.route('user-auth').get(requireSignin,(req,res)=>{
    res.status(200).send({message:true});
})

export default router;
