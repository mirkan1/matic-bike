const TowerOfGod = artifacts.require("TowerOfGod");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TowerOfGod", function (accounts) {
  before( async () => {
    _contract = await TowerOfGod.deployed();
  })


  it("should accept funds from the owner", async () => {
    await _contract.insertFunds({value:100});
    let funds = await _contract.showFunds()
    //console.log("funds of this contract is", funds.toString());
    return assert.isTrue(funds > 0);
  })

  it("flip function works for (N, HEAD) times in a row fast fast", async (N=3) => {
    // head == true
    // tail == false
    try {
      for (let i=0;i<N;i++) {
        let flippy = await _contract.flip(true); // head
      } 
      return assert.isTrue(true);
    } catch (e) {
      console.error(e)
      return assert.isTrue(false);
    }
    // let _random = await _contract.random({value: web3.utils.toWei("0.01", 'ether')});
    // console.log(_random)
    // console.log(await _contract.random())
  })
  it("should access to bet informations", async () => {
      var totalNums = {
        // "1":0,
        // "2":0,
        // "3":0,
        // "4":0,
        // "5":0,
        // "6":0,
        // "7":0,
        // "8":0,
        // "9":0,
        // "10":0,
      }
      let betsLength = await _contract.betsCounter();
      for (let i=0;i<betsLength;i++) {
        let betId = await _contract.bets(i);
        if (!totalNums[betId.random.toString()]) {
          totalNums[betId.random.toString()] = 1;
        } else {
          totalNums[betId.random.toString()]++
        }
        //console.log(`random[1-10]: ${betId.random}`); 
        console.log(`
          random[1-1000]: ${betId.random}, 
          gambler: ${betId.gambler}, 
          gamblerWins: ${betId.gamblerWins},
          side: ${betId.side == true ? "head(random > 500)" : "tail(random < 600)"}`
          //  and random > 5
          //  and random < 6
          );
      }    
    console.log("test bets outcomes:", totalNums);
    console.log("total bets length:", betsLength.toString());
    return assert.isTrue(true);
  });
  it("should return if the gambler win or lost for the most recent game he/she played", async () => {
    var _result = await _contract.didGamblerWin(accounts[0]);
    // false or true it should return one
    try {
      return assert.isTrue(_result);
    } catch (e) {
      return assert.isFalse(_result);
    }
  });
  //it("should return if the gambler win for the most recent game he/she played", async () => {})
});
