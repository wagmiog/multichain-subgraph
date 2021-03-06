/* eslint-disable prefer-const */
import { Pair, Token, Bundle } from '../types/schema'
import { BigDecimal, Address, BigInt } from '@graphprotocol/graph-ts/index'
import { ZERO_BD, factoryContract, ADDRESS_ZERO, ONE_BD } from './helpers'

const WAVAX_ADDRESS = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
const AEB_USDT_WAVAX_PAIR = '0x9ee0a4e21bd333a6bb2ab298194320b8daa26516' // created block 60,337
const AEB_DAI_WAVAX_PAIR = '0x17a2e8275792b4616befb02eb9ae699aa0dcb94b' // created block 60,355
const AB_DAI_WAVAX_PAIR = '0xba09679ab223c6bdaf44d45ba2d7279959289ab0' // created block 2,781,964
const AB_USDT_WAVAX_PAIR = '0xe28984e1ee8d431346d32bec9ec800efb643eef4' // created block 2,781,997

let AVERAGE_AVAX_PRICE_PRE_STABLES = BigDecimal.fromString('30')
let AEB_USDT_WAVAX_PAIR_BLOCK = BigInt.fromI32(60337);
let AEB_DAI_WAVAX_PAIR_BLOCK = BigInt.fromI32(60355);
let AB_MIGRATION_CUTOVER_BLOCK = BigInt.fromI32(3117207) // August 20 2021 9:00am EST

export function getAVAXPriceInUSD(blockNumber: BigInt): BigDecimal {

  if (blockNumber.gt(AB_MIGRATION_CUTOVER_BLOCK)) { // WAVAX-DAI.e & WAVAX-USDT.e exist

    let abDaiPair = Pair.load(AB_DAI_WAVAX_PAIR) // DAI.e is token1
    let abUsdtPair = Pair.load(AB_USDT_WAVAX_PAIR) // USDT.e is token1

    let totalLiquidityWAVAX = abDaiPair.reserve0.plus(abUsdtPair.reserve0)
    let abDaiWeight = abDaiPair.reserve0.div(totalLiquidityWAVAX)
    let abUsdtWeight = abUsdtPair.reserve0.div(totalLiquidityWAVAX)

    return abDaiPair.token1Price.times(abDaiWeight).plus(abUsdtPair.token1Price.times(abUsdtWeight))

  } else if (blockNumber.gt(AEB_DAI_WAVAX_PAIR_BLOCK)) { // WAVAX-USDT & WAVAX-DAI exist

    let aebUsdtPair = Pair.load(AEB_USDT_WAVAX_PAIR) // USDT is token1
    let aebDaiPair = Pair.load(AEB_DAI_WAVAX_PAIR) // DAI is token1

    let totalLiquidityWAVAX = aebUsdtPair.reserve0.plus(aebDaiPair.reserve0)
    let aebUsdtWeight = aebUsdtPair.reserve0.div(totalLiquidityWAVAX)
    let aebDaiWeight = aebDaiPair.reserve0.div(totalLiquidityWAVAX)

    return aebUsdtPair.token1Price.times(aebUsdtWeight).plus(aebDaiPair.token1Price.times(aebDaiWeight))

  } else if (blockNumber.gt(AEB_USDT_WAVAX_PAIR_BLOCK)) { // WAVAX-USDT exists

    let aebUsdtPair = Pair.load(AEB_USDT_WAVAX_PAIR) // USDT is token1

    return aebUsdtPair.token1Price

  } else { /* No stable pairs exist */

    return AVERAGE_AVAX_PRICE_PRE_STABLES

  }

}

// token where amounts should contribute to tracked volume and liquidity
let WHITELIST: string[] = [
  WAVAX_ADDRESS, // WAVAX
  '0x60781c2586d68229fde47564546784ab3faca982', // PNG
  '0xde3a24028580884448a5397872046a019649b084', // USDT
  '0xc7198437980c041c805a1edcba50c1ce5db95118', // USDT.e
  '0xba7deebbfc5fa1100fb055a87773e1e99cd3507a', // DAI
  '0xd586e7f844cea2f87f50152665bcbc2c279d8d70', // DAI.e
  '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', // USDC.e
  '0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15', // ETH
  '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab', // WETH.e
  '0x408d4cd0adb7cebd1f1a1c33a0ba2098e1295bab', // WBTC
  '0x50b7545627a5162f82a992c33b87adc75187b218', // WBTC.e
  '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', // USDC (native)
  '0x260bbf5698121eb85e7a74f2e45e16ce762ebe11', // UST (axelar)
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
let MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString('1000')

// minimum liquidity for price to get tracked
let MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString('1')

/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (add stablecoin estimates)
 **/
export function findEthPerToken(token: Token): BigDecimal {
  if (token.id == WAVAX_ADDRESS) {
    return ONE_BD
  }
  // loop through whitelist and check if paired with any
  for (let i = 0; i < WHITELIST.length; ++i) {
    let pairAddress = factoryContract.getPair(Address.fromString(token.id), Address.fromString(WHITELIST[i]))
    if (pairAddress.toHexString() != ADDRESS_ZERO) {
      let pair = Pair.load(pairAddress.toHexString())
      if (pair.token0 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
        let token1 = Token.load(pair.token1)
        return pair.token1Price.times(token1.derivedETH as BigDecimal) // return token1 per our token * Eth per token 1
      }
      if (pair.token1 == token.id && pair.reserveETH.gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
        let token0 = Token.load(pair.token0)
        return pair.token0Price.times(token0.derivedETH as BigDecimal) // return token0 per our token * ETH per token 0
      }
    }
  }
  return ZERO_BD // nothing was found return 0
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD.
 * If both are, return average of two amounts
 * If neither is, return 0
 */
export function getTrackedVolumeUSD(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token,
  pair: Pair
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedETH.times(bundle.ethPrice)
  let price1 = token1.derivedETH.times(bundle.ethPrice)

  // if less than 5 LPs, require high minimum reserve amount amount or return 0
  if (pair.liquidityProviderCount.lt(BigInt.fromI32(5))) {
    let reserve0USD = pair.reserve0.times(price0)
    let reserve1USD = pair.reserve1.times(price1)
    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve0USD.plus(reserve1USD).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      if (reserve0USD.times(BigDecimal.fromString('2')).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve1USD.times(BigDecimal.fromString('2')).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD
      }
    }
  }

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0
      .times(price0)
      .plus(tokenAmount1.times(price1))
      .div(BigDecimal.fromString('2'))
  }

  // take full value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0)
  }

  // take full value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1)
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD * 2.
 * If both are, return sum of two amounts
 * If neither is, return 0
 */
export function getTrackedLiquidityUSD(
  tokenAmount0: BigDecimal,
  token0: Token,
  tokenAmount1: BigDecimal,
  token1: Token
): BigDecimal {
  let bundle = Bundle.load('1')
  let price0 = token0.derivedETH.times(bundle.ethPrice)
  let price1 = token1.derivedETH.times(bundle.ethPrice)

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0).plus(tokenAmount1.times(price1))
  }

  // take double value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0).times(BigDecimal.fromString('2'))
  }

  // take double value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1).times(BigDecimal.fromString('2'))
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD
}
