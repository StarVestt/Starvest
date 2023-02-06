const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../backend/app");
const Blog = require("../backend/model/blogModel")

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
    await mongoose.connection.close()
});

describe('GET /api/blogs', () => {
    it('should return all blogs', async () => {
        const res = await request(app).get("/api/blogs");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("POST /api/blogs", () => {
    it("should post a blog to database", async () => {
        const res = await request(app).post("/api/blogs").send({
            title: "How my test worked?",
            content: "I wrote a Jest test for the first time and it worked!"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("How my test worked?");
    })
})

describe("PUT /api/blogs/:id", () => {
    it("should update blog title", async () => {
        const blog = await Blog.findOne();
        const res = await request(app).put(`/api/blogs/${blog._id}`).send({
            title: "PUT in LINE?",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("PUT in LINE?");
    })
})

describe("DELETE /api/blogs/:id", () => {
    it("should delete a blog", async () => {
        const blog = await Blog.findOne();
        const res = await request(app).delete(`/api/blogs/${blog._id}`);
        expect(res.statusCode).toBe(200);
    })
})

