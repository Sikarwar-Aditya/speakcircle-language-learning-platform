import User from "../models/User.js"
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

export async function signup (req, res){
    const {fullName , email, password} = req.body;
    try{
        if(!password || !fullName || !email){
            return res.status(400).json({message : "All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message: "password lenghth must be atleast 6"});
        }
        // checking email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        const exsitingUser=  await User.findOne({email});
        if(exsitingUser){
            return res.status(400).json({message: "Email already exists"});
        }

        const idx= Math.floor(Math.random()*100)+1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`; 

        // all constraints are checked now create accoun of user

        const newUser= await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        });

        // also make instance on stream platform 
        try {
            await upsertStreamUser({
               id: newUser._id.toString(),
               name : newUser.fullName,
               image: newUser.profilePic || "",
            });
            
            console.log(`StreamUser created for ${newUser.fullName}`);


        } catch (error) {
            console.log("Error creating in stream user: ",error );
        }
        // now we need to return token to user to tell success signup
        // token creation
        const token= jwt.sign({userId: newUser._id},process.env.JWT_SECRET_KEY,
            {
                expiresIn : "7d",
            }
        );
        // returning token with cookie
        res.cookie("jwt",token,{
           maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks,
            sameSite: "strict", // prevent CSRF attacks
           secure: process.env.NODE_ENV=== "production",
        });

        res.status(201).json({success: true, user: newUser});
    }
    catch(error){
        console.log("error in signup controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async  function login (req, res){
    try {
        const {email, password}= req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid email or password"});
        }
        // lets match password
        
        const isPasswordCorrect= await user.matchPassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({message: "Invalid email or password"});
        }
        const token= jwt.sign({userId : user._id},process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("jwt",token,
            {
                expiresIn: 7*24*60*60*1000,
                httpOnly: true, // to prevent xss attacks
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            }
        );
        return res.status(200).json({success : true ,user});
    } catch (error) {
        console.log("Error in login controller ",error);
        res.status(500).json({message: "Internal server error"});
    }


}

export async function logout (req, res){
    res.clearCookie("jwt");
    res.status(200).json({message:"Logout Successfull"});
}

export async function onboard(req,res){

    try {
        const userId= req.user._id;
        const {fullName,location,nativeLanguage, learningLanguage,bio}= req.body;
    
        if (!fullName || !location || !nativeLanguage || !learningLanguage || !bio) {
            return res.status(400).json(
                { message: "All fields are required",
                    missingFields:                      
                        [
                            !fullName && "fullName",
                            !location && "location",
                            !nativeLanguage && "nativeLanguage",
                            !learningLanguage && "learningLanguage",
                            !bio && "bio"
                        ].filter(Boolean)
                }
            );
        };
    
        const updatedUser = await User.findByIdAndUpdate(userId,
            {   
                ...req.body,
                isOnboarded: true,
            },
            {
                new : true
            }
        );
        
        if(!updatedUser){
            return res.status(404).json({message: "user not found"});
        }
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            })
        } catch (streamError) {
            console.log("Error in onboarding upserting process", streamError);
        }
        return res.status(200).json({message: "Onboarding successfull", user : updatedUser});
    } catch (error) {
        console.log("Error in onboarding process: ", error);
        res.status(500).json({message: "Internal server error"});
    }
 
}