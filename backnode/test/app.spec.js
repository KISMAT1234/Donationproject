const { add, sub } = require('./math');
const  expect  = require('chai').expect;
const { suite, test } = require('mocha');


//BDD
// describe('suite 1',()=>{
//     it('add(2,3) should return 5',()=>{
//         expect(add(2,3)).to.be.equal(50);
//     });
// })

//TDD
suite('suite 2',()=>{
    test('add(1,1) should return 2',()=>{
        expect(add(1,1)).to.be.equal(2);
    });
})





