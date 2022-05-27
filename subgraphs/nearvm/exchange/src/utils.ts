import { near, log, BigInt, json, JSONValueKind } from "@graphprotocol/graph-ts";
import { User, Swap, AddLiquidity, Transaction, Pair, Token, LiquidityPosition, PangolinFactory } from "../generated/schema";
import { FACTORY_ADDRESS } from "./helpers";

export function fill_factory(
    action: near.ActionValue,
    receipt: near.ActionReceipt,
    blockHeader: near.BlockHeader,
    outcome: near.ExecutionOutcome
) : PangolinFactory {

  let factory = PangolinFactory.load(FACTORY_ADDRESS)
  if (factory === null) {
    factory = new PangolinFactory(FACTORY_ADDRESS)
    factory.pairCount = 0
    // factory.totalVolumeETH = ZERO_BD
    // factory.totalLiquidityETH = ZERO_BD
    // factory.totalVolumeUSD = ZERO_BD
    // factory.untrackedVolumeUSD = ZERO_BD
    // factory.totalLiquidityUSD = ZERO_BD
    // factory.txCount = ZERO_BI

    // create new bundle
    // let bundle = new Bundle('1')
    // bundle.ethPrice = ZERO_BD
    // bundle.save()
  }
  factory.save()
  return (factory)
}

export function fill_pair(
    action: near.ActionValue,
    receipt: near.ActionReceipt,
    blockHeader: near.BlockHeader,
    outcome: near.ExecutionOutcome
  ): Pair {
    const receiptId = receipt.id.toHexString();
    let pair = new Pair(`${receiptId}`); // Initializing Pair entity
    let rawString = outcome.logs[0]
    let splitString = rawString.split(' ')
  
    pair.id = "1" // ATTENTION
    let token0 = fill_token(action, receipt, blockHeader, outcome, splitString[2].toString());
    let token1 = fill_token(action, receipt, blockHeader, outcome, splitString[5].toString());;
    pair.token0 = token0.id
    pair.token1 = token1.id
    pair.save()
    return (pair)
  }
  
  export function fill_token(
    action: near.ActionValue,
    receipt: near.ActionReceipt,
    blockHeader: near.BlockHeader,
    outcome: near.ExecutionOutcome,
    id: string
  ): Token {
    const receiptId = receipt.id.toHexString();
    let rawString = outcome.logs[0]
    let splitString = rawString.split(' ')
    let token = new Token(`${receiptId}`);
    token.id = id
    const functionCall = action.toFunctionCall();
    if (functionCall.methodName == "ft_total_supply()") {
      token.totalSupply = outcome.logs[0]
    }
    
    token.save()
  
    return (token)
  }
  
  export function fill_transaction(
    action: near.ActionValue,
    receipt: near.ActionReceipt,
    blockHeader: near.BlockHeader,
    outcome: near.ExecutionOutcome
  ): Transaction {
    const receiptId = receipt.id.toHexString();
    let transaction = new Transaction(`${receiptId}`);
  
    transaction.id = receipt.signerId;
    transaction.blockNumber = BigInt.fromU64(blockHeader.height)
    transaction.timestamp = BigInt.fromU64(blockHeader.timestampNanosec/1000000000)
    transaction.save()
  
    return (transaction)
  }