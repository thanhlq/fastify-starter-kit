// import * as request from "supertest";

// const host = process.env.HOST

// test("Create/List /users", async () => {
//   const TestDB = await (await import('./helper/db.json')).default
//     console.log(JSON.stringify(TestDB))
//     const user = TestDB.users[0]

// 	const data = await User.create(user)

// 	await supertest(global.app)
// 		.get(`${host}\api\v1\users`)
// 		.expect(200)
// 		.then((response) => {
// 			// Check the response type and length
// 			expect(Array.isArray(response.body)).toBeTruthy()
// 			expect(response.body.length).toEqual(1)

// 			// Check the response data
// 			expect(response.body[0]._id).toBe(post.id)
// 			expect(response.body[0].title).toBe(post.title)
// 			expect(response.body[0].content).toBe(post.content)
// 		})
// })