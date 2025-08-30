const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id;
  
	  // Log for debugging
	  console.log(`Fetching enrolled courses for user ID: ${userId}`);
  
	  // Fetch user details and populate enrolled courses
	  const userDetails = await User.findById(userId)
		.populate({
		  path: "courses", // Ensure "courses" matches your schema field
		  select: "courseName thumbnail courseDescription totalDuration", 
		})
		.exec();
  
	  // Check if user exists
	  if (!userDetails) {
		console.error(`User not found with ID: ${userId}`);
		return res.status(404).json({
		  success: false,
		  message: `User not found with ID: ${userId}`,
		});
	  }
  
	  // Check if the user has enrolled in any courses
	  if (!userDetails.courses || userDetails.courses.length === 0) {
		console.log(`No courses found for user ID: ${userId}`);
		return res.status(200).json({
		  success: true,
		  message: "No enrolled courses found for this user.",
		  data: [],
		});
	  }
  
	  // Success response with enrolled courses
	  console.log("Enrolled courses fetched successfully:", userDetails.courses);
	  return res.status(200).json({
		success: true,
		message: "Enrolled courses fetched successfully.",
		data: userDetails.courses,
	  });
	} catch (error) {
	  console.error("Error fetching enrolled courses:", error.message);
	  return res.status(500).json({
		success: false,
		message: "An error occurred while fetching enrolled courses.",
	  });
	}
  };