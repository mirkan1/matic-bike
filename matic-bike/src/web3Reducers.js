import { createSlice } from '@reduxjs/toolkit'

export const web3AccountAdder = createSlice({
  name: 'account',
  initialState: {
    value: null,
    balance: "0",
    contract: null,
    recentGames: null,
    provider : null,
    isConnected: false,
    totalBets: 0,
    isItHead: null,
    TotalBetCounter: 0,
    waitingForFlip: false,
    winAnimationStatus: false,
    networkId:1,
    infoText: false,
    totalBikes: null,
    bikesArr: [],
    currentBike: null,
    _userChanged: false,
    currentBikeRendered:false,
  },
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
    remove: (state) => {
      state.value = null
    },
    changeBalance: (state, action) => {
      state.balance = action.payload
    },
    changeBalanceNull: (state) => {
      state.balance = null
    },
    changeContractNull: (state) => {
      state.contract = null
    },
    changeContract: (state, action) => {
      state.contract = action.payload
    },
    addRecentGames: (state, action) => {
      state.recentGames = action.payload
    },
    addProvider: (state, action) => {
      state.provider = action.payload
    },
    setConnection: (state, action) => {
      state.isConnected = action.payload
    },
    setNetworkId: (state, action) => {
      state.networkId = action.payload
    },
    setInfoText: (state, action) => {
      state.infoText = action.payload
    },
    setAccount: (state, action) => {
      state.value = action.payload
    },
    setTotalBikes: (state, action) => {
      state.totalBikes = action.payload
    },
    setBikesArr: (state, action) => {
      state.bikesArr = action.payload
    },
    setCurrentBike: (state, action) => {
      state.currentBike = action.payload
    },
    userChangeStatus: (state, action) => {
      state._userChanged = action.payload
    },
    didRenderedCurrentBike: (state, action) => {
      state.currentBikeRendered = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, changeBalance, changeContract, changeBalanceNull, addProvider,
changeContractNull, renderSpesificBike, setBikesArr, didRenderedCurrentBike, userChangeStatus, setCurrentBike, setHeadOrTail, addRecentGames, setTotalBikes, setConnection, setBetCounter, setTotalBetCounter, setWaitingForFlip, setNetworkId, setWinAnationStatus, setInfoText, setAccount } = web3AccountAdder.actions

export default web3AccountAdder.reducer