const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../backend/app");
const Profile = require("../backend/model/profileModel")
require("dotenv").config();

beforeEach(async () => {
    mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
    mongoose.connection.close()
});

describe('POST /profile', () => {
    it('should create a new profile', async () => {
        const res = await request(app).post("/profile").send({
            fullname: "test",
            bio: "this is bio",
            email: "some@mail.com",
            password: "password",
            newsletter: true
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.fullname).toBe("test");
    });
});

describe('POST /profile/login', () => {
    it('should log in the profile', async () => {
        const res = await request(app).post("/profile/login").send({
            email: "some@mail.com",
            password: "password"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe("some@mail.com");
    });
});

describe('GET /profile/me', () => {
    it('should return the profile', async () => {
        let token = "";
        const loginRes = await request(app).post("/profile/login").send({
            email: "some@mail.com",
            password: "password"
        });
        token = await loginRes.body.token;
        expect(loginRes.statusCode).toBe(200);
        expect(token).toEqual(expect.any(String));

        const res = await request(app).get("/profile/me").set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(200);
    });
});

describe('DELETE /profile/delete', () => {
    it('should delete the selected user', async () => {
        let token = "";
        const loginRes = await request(app).post("/profile/login").send({
            email: "some@mail.com",
            password: "password"
        });
        token = await loginRes.body.token;
        expect(loginRes.statusCode).toBe(200);
        expect(token).toEqual(expect.any(String));

        const res = await request(app).delete("/profile/delete").set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(200);
    });
});

// describe('token', () => {
//     it('should return token', async () => {
//         const User = await Profile.findOne({ email: "some@mail.com" })
//         token = User.body;
//         expect(token).toBe("ssas")
//     });

// });

// describe('PUT /profile/:id', () => {
//     it('should return updated profile', async () => {
//         const profile = await Profile.findOne();
//         const res = await request(app).put(`/profile/${profile._id}`).send({
//             email: "this is new email"
//         });
//         expect(res.statusCode).toBe(200);
//         expect(res.body.email).toBe("this is new email");
//     });
// });
