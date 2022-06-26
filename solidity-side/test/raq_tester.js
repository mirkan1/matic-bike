// const raqERC20 = artifacts.require("raqERC20");

// /*
//  * uncomment accounts to access the test accounts made available by the
//  * Ethereum client
//  * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
//  */
// contract("raqERC20", function (accounts) {
//   before( async () => {
//     _contract = await raqERC20.deployed();
//   })
//   it("gives the owner total of 1M tokens", async () => {
//     let balance = await _contract.balanceOf(accounts[0]);
//     balance = web3.utils.fromWei(balance, 'ether')
//     console.log("first account has", balance, 'ether');
//     assert.equal(balance, 1_000_000, "Balance should be 1M Tokens for contract creator")
//   })

//   // it("raise error when one give less royalty", async () => {
//   //   try {
//   //     await _contract.random({value: web3.utils.toWei("0.01", 'ether')});
//   //     assert.equal(true, false, "true is false")
//   //   } catch (e) {
//   //     // console.error(e)
//   //     // console.error(e.type)
//   //     assert.equal(e.reason, 'not enought royalty', "true is true")
//   //   }
//   // })

//   it("flip function works for (N, HEAD) times in a row fast fast", async (N=500) => {
//     // head == true
//     // tail == false
//     try {
//       for (let i=0;i<N;i++) {
//         let flippy = await _contract.flip(true); // head
//       } 
//       return assert.isTrue(true);
//     } catch (e) {
//       console.error(e)
//       return assert.isTrue(false);
//     }
//     // let _random = await _contract.random({value: web3.utils.toWei("0.01", 'ether')});
//     // console.log(_random)
//     // console.log(await _contract.random())
//   })
//   it("should access to bet informations", async () => {
//       var totalNums = {
//         "1":0,
//         "2":0,
//         "3":0,
//         "4":0,
//         "5":0,
//         "6":0,
//         "7":0,
//         "8":0,
//         "9":0,
//         "10":0,
//       }
//       let betsLength = await _contract.betsLength();
//       for (let i=0;i<betsLength;i++) {
//         let betId = await _contract.bets(i);
//         totalNums[betId.random.toString()]++
//         //console.log(`random[1-10]: ${betId.random}`); 
//         console.log(`
//           random[1-10]: ${betId.random}, 
//           gambler: ${betId.gambler}, 
//           gamblerWins: ${betId.gamblerWins},
//           side: ${betId.side == true ? "head(random > 5)" : "tail(random < 6)"}`
//           //  and random > 5
//           //  and random < 6
//           );
//       }    
//     console.log(totalNums);
//     console.log("total bets length:", betsLength);
//     return assert.isTrue(true);
//   });
// });
