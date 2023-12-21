import express from 'express'

import { createUser, getAllUsers,loginUser, updateUser , getSingleUser} from '../controllers/user.controller.js';
import { checkJWT } from '../utils/validToken.js';
const router = express.Router();

// /api/v1/user/signup
router.post('/signup',createUser)

// /api/v1/user/signin
router.post('/signin',loginUser)

// /api/v1/user/users
router.get('/users',getAllUsers)

// /api/v1/user/users
router.put('/users',checkJWT,updateUser)

// get single user by id
// /api/v1/user/users:id
router.get('/users/:email',getSingleUser)


export default router