import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router= express.Router();
import { getRecommendedUsers, getMyFriends,sendFriendRequest, getFriendRequests, acceptFriendRequest,getOutgoingFriendReqs } from "../controllers/user.controller.js";
// protect all routes by appling auth middlewares to all routes
router.use(protectRoute);

router.get("/",getRecommendedUsers );
router.get("/friends",getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequests );
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);




export default router;