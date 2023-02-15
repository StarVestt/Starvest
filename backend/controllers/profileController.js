const asyncHandler = require("express-async-handler");
const Profile = require("../model/profileModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc     create profile
//@route    POST /profile
//@access   public
const createProfile = asyncHandler(async (req, res) => {
    const { profilePhoto = "https://picsum.photos/400/400", fullname, bio = "", email, password, newsletter = "true" } = req.body;
    if (!fullname || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const userExists = await Profile.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptPass = await bcrypt.hash(password, salt)

    const User = await Profile.create({
        profilePhoto,
        fullname,
        bio,
        email,
        password: encryptPass,
        newsletter
    })

    // return console.log(User);

    if (User) res.status(201).json({
        profilePhoto: User.profilePhoto,
        fullname: User.fullname,
        bio: User.bio,
        email: User.email,
        newsletter: User.newsletter,
        token: jwtToken(User._id)
    });
    else {
        res.status(400);
        throw new Error("Invalid Credentials")
    }
})

//@desc     login profile
//@route    POST /profile/login
//@access   public
const loginProfile = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const User = await Profile.findOne({ email })
    if (!User) {
        res.status(400);
        throw new Error("User does not exist");
    }

    if (User && (await bcrypt.compare(password, User.password))) {
        res.status(200);
        res.json({
            profilePhoto: User.profilePhoto,
            fullname: User.fullname,
            bio: User.bio,
            email: User.email,
            newsletter: User.newsletter,
            token: jwtToken(User._id)
        })
    }
    else {
        res.status(400);
        throw new Error("User does not exist");
    }
})

//@desc     get profile
//@route    POST /profile
//@access   private
const getProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400);
        throw new Error("User doesnt exist")
    }

    const User = await Profile.findById(req.user._id)
    const { _id, fullname, email } = User;

    res.status(200);
    res.json({
        id: _id,
        fullname,
        email
    });
})

//@desc     delete profile
//@route    DELETE /profile
//@access   private
const deleteProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400);
        throw new Error("User doesnt exist")
    }

    const deleteUser = await Profile.findById(req.user._id)

    const Users = await Profile.find();
    const deletedUser = Users.filter(user => user._id + "" !== deleteUser._id + "")
    res.status(200);
    res.json(deletedUser);

    deleteUser.remove();
})

//jwt Token
const jwtToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}


module.exports = {
    createProfile,
    loginProfile,
    getProfile,
    deleteProfile,
}