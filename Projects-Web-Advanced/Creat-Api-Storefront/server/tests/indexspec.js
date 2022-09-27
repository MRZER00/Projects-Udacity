"use strict";
// import { OrderStore } from '../models/orders';
// import { AnimalsStore } from '../models/Product';
// import { UserStore } from '../models/user';
// const product_store = new AnimalsStore()
// const store = new UserStore()
// const test_order = new OrderStore()
// const create_newOrder =
// {
//     "user_id": 1,
//     "status": "active",
//     "products": [
//         {
//             "product_id": 1,
//             "quantity": 28
//         }
//     ]
// }
// const create_newUser = {
//     firstname: 'admin',
//     lastname: 'user',
//     password_digest: "test"
// };
// describe("Test all endpoints of a storefront app... Model", () => {
//     // Create these first ... before all
//     beforeAll(async () => {
//         // test .. create new product
//         const result = await product_store.create({
//             name: "Lion",
//             price: 755
//         })
//         expect(result).toEqual({
//             id: 1,
//             name: "Lion",
//             price: 755
//         });
//         // create new user 
//         const result_create_newUser = await store.create(create_newUser);
//         expect(result_create_newUser).toEqual(result_create_newUser);
//         // create new order
//         const result_order = await test_order.create(create_newOrder);
//         expect(result_order).toEqual({
//             id: 1,
//             user_id: '1',
//             status: 'active',
//             products: [{ product_id: 1, quantity: 28 }]
//         })
//     })
//     // test products model ..........
//     it('should have an index method', () => {
//         expect(product_store.index).toBeDefined();
//     });
//     it('should have a show method', () => {
//         expect(product_store.show).toBeDefined();
//     });
//     it('should have a create method', () => {
//         expect(product_store.create).toBeDefined();
//     });
//     it('should have a delete method', () => {
//         expect(product_store.delete).toBeDefined();
//     });
//     it('index method should return a list of Animals', async () => {
//         const result = await product_store.index();
//         expect(result).toEqual([{
//             id: 1,
//             name: 'Lion',
//             price: 755
//         }]);
//     });
//     it('show method should return the correct Animals', async () => {
//         const result = await product_store.show(1);
//         expect(result).toEqual({
//             id: 1,
//             name: 'Lion',
//             price: 755
//         });
//     });
//     // test users model ..........
//     it('should have an index method', () => {
//         expect(store.index).toBeDefined();
//     });
//     it('should have a show method', () => {
//         expect(store.show).toBeDefined();
//     });
//     it('should have a create method', () => {
//         expect(store.create).toBeDefined();
//     });
//     it('should have a delete method', () => {
//         expect(store.delete).toBeDefined();
//     });
//     it('show method should return the correct users', async () => {
//         const result = await store.show(1);
//         expect(result).toEqual({
//             id: 1,
//             firstname: "admin",
//             lastname: "user",
//             password_digest: result.password_digest
//         });
//     });
//     // test orders model ..........
//     it('should have an index method', () => {
//         expect(test_order.index).toBeDefined();
//     });
//     it('should have a show method', () => {
//         expect(test_order.show).toBeDefined();
//     });
//     it('should have a create method', () => {
//         expect(test_order.create).toBeDefined();
//     });
//     it('index method should return a list of Order', async () => {
//         const result = await test_order.index();
//         expect(result).toEqual([{
//             id: 1,
//             user_id: '1',
//             status: 'active',
//             products: [{ product_id: 1, quantity: 28 }]
//         }])
//     });
//     it('show method should return the correct Order', async () => {
//         const result = await test_order.show(1);
//         expect(result).toEqual(result)
//     });
//     // afterAll(async () => {   
//     //     // delete these after all
//     //     await store.delete("1");
//     //     const result_user = await store.index()
//     //     expect(result_user).toEqual([]);
//     //     await product_store.delete("1");
//     //     const result = await product_store.index()
//     //     expect(result).toEqual([]);
//     // })
// });
