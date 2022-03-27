/** 
@author : darkegn 
@desc : PancakeSwap Very Simple Sell Bot.
 **/

const ethers = require('ethers')
const ROUTER_ABI = require('./routerabi.json') // Pancake Router ABI
const TOKEN_ABI = require('./tokenabi.json') // Set Token ABI

const CONFIG = {
    privateKey:'0x...', // Set Acconut Private Key
    router:"0x10ED43C718714eb63d5aA57B78B54704E256024E", // PANCAKESWAP ROUTER V2
    wbnb:"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", //WBNB
    token:"0x...",  // The Token Address Where The Sale Will Be Made
    gasPrice:ethers.utils.parseUnits("5", "gwei"), // Gas Wei
    gasLimit:350000 // Gas Limti
}


const provider = new ethers.providers.JsonRpcProvider("https://dataseed1.binance.org/");


/** Sell  */
 async function sell(b){
        const wallet = new ethers.Wallet(CONFIG.privateKey, provider);
        const account = wallet.connect(provider)
        const token = new ethers.Contract(
          CONFIG.token,
          TOKEN_ABI,
          account
        );
        
        const router = new ethers.Contract(
          CONFIG.router,
          ROUTER_ABI,
          account
        )
    
     const balance = b; // Set Uint256 Sell Amount
    
     sellAmount = BigNumber.from(balance.toString());
     await token.approve(CONFIG.router, sellAmount);   
     await sleep(8000)
     const amounts = await router.getAmountsOut(sellAmount, [
         CONFIG.token,
         CONFIG.wbnb
     ]); 
    
     const amountOutMin = amounts[1].sub(amounts[1].div(12));
    
        const tx = await router.swapExactTokensForETH(testSellAmount, amountOutMin, [CONFIG.token, CONFIG.wbnb], wallet.address, Date.now() + 1000 * 60 * 5, 
        {
            gasLimit: CONFIG.gasLimit,
            gasPrice: CONFIG.gasPrice,
        });
    
    console.log("Waiting Transaction...");
    const receipt = await tx.wait();
    console.log(`Transaction Successfully.  tx:${receipt.transactionHash}`);
    
    
     }

    
/** Sleep  */
async function sleep(delay){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true),delay)
    })
  
      }

/** The seller must be located in the account where you configure the token. **/

/** Sell() **/ 
const amount = 5 * 10 ** 18; // 5 sell Amount , 10**18 18Decimals;

async() => await sell(amount))();
