import './App.css';
import QRCode from "react-qr-code";
import { BigNumber, ethers } from 'ethers';
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core';
import abi from "./contracts/abi.json";
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setAccount, setNetworkId, addProvider, changeContract, userChangeStatus, didRenderedCurrentBike, setTotalBikes, changeBalance, changeBalanceNull, setCurrentBike, setBikesArr } from './web3Reducers';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const maticBikeContract = "0x850507E5D08e5C73419d8aE62e8Dca9e5aA36f5A";

function AccountPanel() {
  const { activateBrowserWallet, account } = useEthers();
  const _account = useSelector((state) => state.accounter.value);
  const networkId = useSelector((state) => state.accounter.networkId);
  const balance = useSelector((state) => state.accounter.balance);
  const _contract = useSelector((state) => state.accounter.contract);
  const networkProvider = useSelector((state) => state.accounter.provider);
  const titleInput = useRef(null);
  const priceInput = useRef(null);
  const signMyBike = async () => {
    console.log(_contract)
    // signBike (uint256 _price, string memory _title)
    networkProvider.getSigner(_account);
    console.log(titleInput.current.value);
    console.log(priceInput.current.value.toString());
    var res = await _contract.signBike(priceInput.current.value.toString(), titleInput.current.value)
    console.log(res)
    //   var res = await contractor.placeBet(isItHead, {
    //     value:formattedValue,
    //     gasPrice: gasPrice,//ethers.utils.parseUnits('5', 'gwei'), 
    //     gasLimit: 398765,
    // });                
    console.log("tx is ongoing",res)
    var explorerUrl = "https://mumbai.polygonscan.com/tx/" + res.hash
    console.log("explorerUrl", explorerUrl);
    // wait for transaction to over
    var didTransactionOver = await res.wait();
    console.log("didTransactionOver", didTransactionOver);
    window.location.reload(false);
  }
  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
      {account && <p>Balance: {balance}</p>}
      {<p>Network: {networkId}</p>}
      {account && _contract && <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", flexDirection:"row"}}>
          <p>title of your bike</p><input id="title" ref={titleInput}></input>
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>
          <p>price of your bike in ETH, it might be stolen, because it is NY</p>
          <input id="price" ref={priceInput}></input>
        </div>
        <button onClick={()=> signMyBike()}>Sign your bike</button>
      </div>}

    </div>
  )
}

function BikesArrShow() {
  const _contract = useSelector((state) => state.accounter.contract);
  const bikesArr = useSelector((state) => state.accounter.bikesArr);
  const _account = useSelector((state) => state.accounter.value);
  const hoursInput = useRef(null);
  const networkProvider = useSelector((state) => state.accounter.provider);
  const giveBikeBackIn = async (index) => {
    //var res = await _contract.giveBikeIn(index);
    var gasPrice = await networkProvider.getGasPrice();
    var res = await _contract.giveBikeIn(index,{
      //value: formattedValue,
      gasPrice: gasPrice,
      gasLimit: 398765,
    })
    console.log("tx is ongoing",res)
    var explorerUrl = "https://mumbai.polygonscan.com/tx/" + res.hash
    console.log("explorerUrl", explorerUrl);
    var response = await res.wait();
    console.log(response);
    window.location.reload(false);
  }
  const rentThisBike = async (index) => {
    console.log(index)
    var totalHours = hoursInput.current.value.toString()
    // bike's price
    var bikePrice = bikesArr[index].price.toString()
    var hourlyPriceOfBikes = await _contract.hourlyPriceOfBikes()
    var totalPayment = (parseInt(hourlyPriceOfBikes.toString()) * parseInt(totalHours) )
    if (parseInt(bikePrice) < 99) {
      totalPayment = totalPayment + 100
    } else {
      totalPayment = totalPayment + parseInt(bikePrice)
    }
    var formattedValue = ethers.utils.parseUnits(totalPayment.toString(), 'wei');
    //var newFormattedValue = ethers.utils.parseUnits(formattedValue + parseInt(bikePrice), 'wei');
    //debugger;
    console.log("total payment is", totalPayment, formattedValue)
    
    var gasPrice = await networkProvider.getGasPrice();
    var res = await _contract.rentBike(index, hoursInput.current.value.toString(),{
      value: formattedValue,
      gasPrice: gasPrice,
      gasLimit: 398765,
    })
    console.log("tx is ongoing",res)
    var explorerUrl = "https://mumbai.polygonscan.com/tx/" + res.hash
    console.log("explorerUrl", explorerUrl);
    var response = await res.wait();
    console.log(response);
    window.location.reload(false);
  }
  return bikesArr.map((bike, index) => {
    if (bike.status == "0" && parseInt(bike.renter) == parseInt(_account)) {
      return (<div key={index}>
        <p>{bike.title}</p>
        <p>Price in WEI: {bike.price.toString()}</p>
        <QRCode value={`http://localhost:3000?bike=${bike.id}`} />
        <p>give bike back in</p>
        <button onClick={() => giveBikeBackIn(bike.id)}>💥</button>
      </div>);
    } else if (parseInt(bike.owner) == parseInt(_account)){
      return (<div key={index}>
        <p>{bike.title}</p>
        <p>Price in WEI: {bike.price.toString()}</p>
        <QRCode value={`http://localhost:3000?bike=${bike.id}`} />
        <p>you are the owner of this bike, change visibility</p>
        <button onClick={() => console.log("TODO")}>💥</button>
      </div>);
    } else if (bike.status != "-1") {
      return (<div key={index}>
        <p>{bike.title}</p>
        <p>Price in WEI: {bike.price.toString()}</p>
        <QRCode value={`http://localhost:3000?bike=${bike.id}`} />
        <p>rent this bike for <input id={`hours-${bike.id}`} ref={hoursInput}></input> hours</p>
        <button onClick={() => rentThisBike(bike.id)}>💥</button>
      </div>);
    } 
  })
}

function App() {
  const _account = useSelector((state) => state.accounter.value);
  const bikesArr = useSelector((state) => state.accounter.bikesArr);
  const networkProvider = useSelector((state) => state.accounter.provider);
  const _contract = useSelector((state) => state.accounter.contract);
  const totalBikes = useSelector((state) => state.accounter.totalBikes);
  const currentBike = useSelector((state) => state.accounter.currentBike);
  const _userChanged = useSelector((state) => state.accounter._userChanged);
  const currentBikeRendered = useSelector((state) => state.accounter.currentBikeRendered);
  const dispatch = useDispatch();

  if (currentBike && bikesArr.length > 0 && currentBikeRendered == false) {
    // ask if they want to rent it
    dispatch(setBikesArr([bikesArr[currentBike]]))
    // dispatch(setCurrentBike(null))
    dispatch(didRenderedCurrentBike(true))
  }
  const getSigner = async (newestProvider) => {
    return await newestProvider.getSigner();
    // dispatch(setNetworkId(newestProvider.network.chainId));
    // dispatch(setAccount(await newestProvider.getSigner()));
  }
  const setWalletProvider = async () => {    
   alert("wallet connet is not implemented yet, use metamask or a browser wallet")
  }

  useEffect(() => {
    if (_userChanged) {
      setBalance()
    }
    if (_contract && !totalBikes && bikesArr.length === 0) {
      setBalance()
      fetchData()
      dispatch(setCurrentBike(window.location.search.split("bike=")[1]))
    }
    async function setBalance() {
      networkProvider.getBalance(_account).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance)
        console.log(`balance of ${_account}: ${balanceInEth} ETH`)
        dispatch(changeBalance(balanceInEth))
       })
      //const _balance = await _contract.balanceOf(_account);
      dispatch(userChangeStatus(false))
    }
    async function fetchData() {
      var counter = await _contract.bikeCounter()
      dispatch(setTotalBikes(counter.toString()))
      var _bikesArr = []
      for (var i = 0; i < counter; i++) {
        var selectedBike = await _contract.bikes(i)
        _bikesArr.push(selectedBike)
      }
      dispatch(setBikesArr(_bikesArr))
    }
    if (window.ethereum) {
    dispatch(setNetworkId(window.ethereum.chainId))
    window.ethereum.on('accountsChanged', function (accounts) {
      dispatch(setAccount(accounts[0]))
      dispatch(userChangeStatus(true))
    });
    window.ethereum.request({method:'eth_requestAccounts'})
      .then(async (account) => {
        if (!_contract) {
          var newestProvider = new ethers.providers.Web3Provider(window.ethereum)
          var signer = await getSigner(newestProvider);
          const mainContract = new ethers.Contract( maticBikeContract, abi, signer );
          dispatch(changeContract(mainContract));
          dispatch(addProvider(newestProvider));
          dispatch(setAccount(account[0]))
          newestProvider.getBalance(account).then((balance) => {
            // convert a currency unit from wei to ether
            const balanceInEth = ethers.utils.formatEther(balance)
            console.log(`balance of ${account}: ${balanceInEth} ETH`)
           })
        }
      })
      console.log("current chain id is", window.ethereum.chainId)
      if (window.ethereum.chainId != 80001) {
        window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: "0x13881"}], // 80001
        });
      }
  } else {
    setWalletProvider();
  }
})
  return (
    <div className="App">
      <header className="App-header">
        <h2>available bikes</h2>
      </header>
      <div style={{display: "flex",flexWrap: "wrap",gap: "50px"}}>
        <BikesArrShow />
        <h3>this will connect into blockchain and scan available bikes from the contract</h3>
        <AccountPanel />
      </div>
    </div>
  );
}

export default App;
