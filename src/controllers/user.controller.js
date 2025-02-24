import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res, next) => {
  try {
    const { username, fullName, email, password } = req.body;
    if (!username || !fullName || !email || !password) {
      next(new ApiError(400, "All fields are required"));
    }
    const avatarFileLocalPath = req.files?.avatar[0].path;
    const coverImageFileLocalPath = req.files?.coverImage[0].path;
    const avatarImage = await uploadOnCloudinary(avatarFileLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageFileLocalPath);

    const user = await User.findOne({ email });

    if (user) {
      next(new ApiError(400, "User already exists"));
    }

    const newUser = await User.create({
      username,
      fullName,
      email,
      password,
      avatar: avatarImage.url,
      coverImage: coverImage.url,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, newUser, "User register successfully"));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
