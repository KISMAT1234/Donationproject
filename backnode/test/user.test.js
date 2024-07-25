// import {request} from 'supertest'
// // import User from '../src/model/Userprofile.js';
// import Database from './src/connection/databaseconn.js'
// import { app } from '../app.js';
// import mongoose from'mongoose';


// beforeAll(async () => {
//   await Database() 
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });



// describe('User API', () => {
//     it('should fetch all products', async() => {
//         // const products = await Product.insertMany([
//         //   { name: 'Product 1', price: 100 },
//         //   { name: 'Product 2', price: 200 },
//         // ]);
    
//         const res = await request(app).get('/user');
    
//         expect(res.statusCode).toEqual(200);
//         expect(res.body.length).toEqual(2);
//         res.body.forEach(user => {
//           expect(user).toHaveProperty('_id');
//           expect(user).toHaveProperty('name');
//           expect(user).toHaveProperty('email');
//           expect(user).not.toHaveProperty('password');
//         });
//       });
// })
// const  {add} = require("../index.js")
import {add} from "../index.js"

test('toBe',()=>{
  expect(add(1,2)).toBe(3)
})