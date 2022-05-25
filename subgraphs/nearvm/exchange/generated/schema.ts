// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class PangolinFactory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PangolinFactory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save PangolinFactory entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("PangolinFactory", id.toString(), this);
    }
  }

  static load(id: string): PangolinFactory | null {
    return changetype<PangolinFactory | null>(store.get("PangolinFactory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("symbol", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Token entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }
}

export class Pair extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("token0", Value.fromString(""));
    this.set("token1", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pair entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Pair entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Pair", id.toString(), this);
    }
  }

  static load(id: string): Pair | null {
    return changetype<Pair | null>(store.get("Pair", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token0(): string {
    let value = this.get("token0");
    return value!.toString();
  }

  set token0(value: string) {
    this.set("token0", Value.fromString(value));
  }

  get token1(): string {
    let value = this.get("token1");
    return value!.toString();
  }

  set token1(value: string) {
    this.set("token1", Value.fromString(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class LiquidityPosition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pair", Value.fromString(""));
    this.set("liquidityTokenBalance", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LiquidityPosition entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save LiquidityPosition entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("LiquidityPosition", id.toString(), this);
    }
  }

  static load(id: string): LiquidityPosition | null {
    return changetype<LiquidityPosition | null>(
      store.get("LiquidityPosition", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pair(): string {
    let value = this.get("pair");
    return value!.toString();
  }

  set pair(value: string) {
    this.set("pair", Value.fromString(value));
  }

  get liquidityTokenBalance(): BigDecimal {
    let value = this.get("liquidityTokenBalance");
    return value!.toBigDecimal();
  }

  set liquidityTokenBalance(value: BigDecimal) {
    this.set("liquidityTokenBalance", Value.fromBigDecimal(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("blockNumber", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transaction entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("transaction", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("pair", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Swap entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get action(): string | null {
    let value = this.get("action");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set action(value: string | null) {
    if (!value) {
      this.unset("action");
    } else {
      this.set("action", Value.fromString(<string>value));
    }
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get pair(): string {
    let value = this.get("pair");
    return value!.toString();
  }

  set pair(value: string) {
    this.set("pair", Value.fromString(value));
  }

  get sender(): string | null {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set sender(value: string | null) {
    if (!value) {
      this.unset("sender");
    } else {
      this.set("sender", Value.fromString(<string>value));
    }
  }

  get from(): string | null {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set from(value: string | null) {
    if (!value) {
      this.unset("from");
    } else {
      this.set("from", Value.fromString(<string>value));
    }
  }

  get amount0In(): BigInt | null {
    let value = this.get("amount0In");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount0In(value: BigInt | null) {
    if (!value) {
      this.unset("amount0In");
    } else {
      this.set("amount0In", Value.fromBigInt(<BigInt>value));
    }
  }

  get amount1In(): BigInt | null {
    let value = this.get("amount1In");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount1In(value: BigInt | null) {
    if (!value) {
      this.unset("amount1In");
    } else {
      this.set("amount1In", Value.fromBigInt(<BigInt>value));
    }
  }

  get amount0Out(): BigInt | null {
    let value = this.get("amount0Out");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount0Out(value: BigInt | null) {
    if (!value) {
      this.unset("amount0Out");
    } else {
      this.set("amount0Out", Value.fromBigInt(<BigInt>value));
    }
  }

  get amount1Out(): BigInt | null {
    let value = this.get("amount1Out");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount1Out(value: BigInt | null) {
    if (!value) {
      this.unset("amount1Out");
    } else {
      this.set("amount1Out", Value.fromBigInt(<BigInt>value));
    }
  }

  get to(): string | null {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set to(value: string | null) {
    if (!value) {
      this.unset("to");
    } else {
      this.set("to", Value.fromString(<string>value));
    }
  }
}

export class AddLiquidity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AddLiquidity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save AddLiquidity entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("AddLiquidity", id.toString(), this);
    }
  }

  static load(id: string): AddLiquidity | null {
    return changetype<AddLiquidity | null>(store.get("AddLiquidity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get output(): string | null {
    let value = this.get("output");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set output(value: string | null) {
    if (!value) {
      this.unset("output");
    } else {
      this.set("output", Value.fromString(<string>value));
    }
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get functionCalled(): string | null {
    let value = this.get("functionCalled");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set functionCalled(value: string | null) {
    if (!value) {
      this.unset("functionCalled");
    } else {
      this.set("functionCalled", Value.fromString(<string>value));
    }
  }

  get functionAction(): string | null {
    let value = this.get("functionAction");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set functionAction(value: string | null) {
    if (!value) {
      this.unset("functionAction");
    } else {
      this.set("functionAction", Value.fromString(<string>value));
    }
  }

  get firstPoolAmount(): BigInt | null {
    let value = this.get("firstPoolAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set firstPoolAmount(value: BigInt | null) {
    if (!value) {
      this.unset("firstPoolAmount");
    } else {
      this.set("firstPoolAmount", Value.fromBigInt(<BigInt>value));
    }
  }

  get firstPool(): string | null {
    let value = this.get("firstPool");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set firstPool(value: string | null) {
    if (!value) {
      this.unset("firstPool");
    } else {
      this.set("firstPool", Value.fromString(<string>value));
    }
  }

  get secondPoolAmount(): BigInt | null {
    let value = this.get("secondPoolAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set secondPoolAmount(value: BigInt | null) {
    if (!value) {
      this.unset("secondPoolAmount");
    } else {
      this.set("secondPoolAmount", Value.fromBigInt(<BigInt>value));
    }
  }

  get secondPool(): string | null {
    let value = this.get("secondPool");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set secondPool(value: string | null) {
    if (!value) {
      this.unset("secondPool");
    } else {
      this.set("secondPool", Value.fromString(<string>value));
    }
  }

  get sharesMinted(): BigInt | null {
    let value = this.get("sharesMinted");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set sharesMinted(value: BigInt | null) {
    if (!value) {
      this.unset("sharesMinted");
    } else {
      this.set("sharesMinted", Value.fromBigInt(<BigInt>value));
    }
  }
}
