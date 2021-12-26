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

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("isworking", Value.fromBoolean(false));
    this.set("level", Value.fromI32(0));
    this.set("computerlevel", Value.fromI32(0));
    this.set("faucet", Value.fromBoolean(false));
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

  get worklist(): Array<string> | null {
    let value = this.get("worklist");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set worklist(value: Array<string> | null) {
    if (!value) {
      this.unset("worklist");
    } else {
      this.set("worklist", Value.fromStringArray(<Array<string>>value));
    }
  }

  get isworking(): boolean {
    let value = this.get("isworking");
    return value!.toBoolean();
  }

  set isworking(value: boolean) {
    this.set("isworking", Value.fromBoolean(value));
  }

  get level(): i32 {
    let value = this.get("level");
    return value!.toI32();
  }

  set level(value: i32) {
    this.set("level", Value.fromI32(value));
  }

  get computerlevel(): i32 {
    let value = this.get("computerlevel");
    return value!.toI32();
  }

  set computerlevel(value: i32) {
    this.set("computerlevel", Value.fromI32(value));
  }

  get lockedcoffee(): BigInt | null {
    let value = this.get("lockedcoffee");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set lockedcoffee(value: BigInt | null) {
    if (!value) {
      this.unset("lockedcoffee");
    } else {
      this.set("lockedcoffee", Value.fromBigInt(<BigInt>value));
    }
  }

  get lockedchocolate(): BigInt | null {
    let value = this.get("lockedchocolate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set lockedchocolate(value: BigInt | null) {
    if (!value) {
      this.unset("lockedchocolate");
    } else {
      this.set("lockedchocolate", Value.fromBigInt(<BigInt>value));
    }
  }

  get lockedenergy(): BigInt | null {
    let value = this.get("lockedenergy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set lockedenergy(value: BigInt | null) {
    if (!value) {
      this.unset("lockedenergy");
    } else {
      this.set("lockedenergy", Value.fromBigInt(<BigInt>value));
    }
  }

  get currentworkint(): BigInt | null {
    let value = this.get("currentworkint");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set currentworkint(value: BigInt | null) {
    if (!value) {
      this.unset("currentworkint");
    } else {
      this.set("currentworkint", Value.fromBigInt(<BigInt>value));
    }
  }

  get coffee(): BigInt | null {
    let value = this.get("coffee");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set coffee(value: BigInt | null) {
    if (!value) {
      this.unset("coffee");
    } else {
      this.set("coffee", Value.fromBigInt(<BigInt>value));
    }
  }

  get work(): BigInt | null {
    let value = this.get("work");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set work(value: BigInt | null) {
    if (!value) {
      this.unset("work");
    } else {
      this.set("work", Value.fromBigInt(<BigInt>value));
    }
  }

  get chocolate(): BigInt | null {
    let value = this.get("chocolate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set chocolate(value: BigInt | null) {
    if (!value) {
      this.unset("chocolate");
    } else {
      this.set("chocolate", Value.fromBigInt(<BigInt>value));
    }
  }

  get energy(): BigInt | null {
    let value = this.get("energy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set energy(value: BigInt | null) {
    if (!value) {
      this.unset("energy");
    } else {
      this.set("energy", Value.fromBigInt(<BigInt>value));
    }
  }

  get faucet(): boolean {
    let value = this.get("faucet");
    return value!.toBoolean();
  }

  set faucet(value: boolean) {
    this.set("faucet", Value.fromBoolean(value));
  }
}

export class Works extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("started", Value.fromBoolean(false));
    this.set("notcompleted", Value.fromBoolean(false));
    this.set("owner", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Works entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Works entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Works", id.toString(), this);
    }
  }

  static load(id: string): Works | null {
    return changetype<Works | null>(store.get("Works", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get givenblock(): BigInt | null {
    let value = this.get("givenblock");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set givenblock(value: BigInt | null) {
    if (!value) {
      this.unset("givenblock");
    } else {
      this.set("givenblock", Value.fromBigInt(<BigInt>value));
    }
  }

  get startblock(): BigInt | null {
    let value = this.get("startblock");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set startblock(value: BigInt | null) {
    if (!value) {
      this.unset("startblock");
    } else {
      this.set("startblock", Value.fromBigInt(<BigInt>value));
    }
  }

  get endblock(): BigInt | null {
    let value = this.get("endblock");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set endblock(value: BigInt | null) {
    if (!value) {
      this.unset("endblock");
    } else {
      this.set("endblock", Value.fromBigInt(<BigInt>value));
    }
  }

  get reward(): BigInt | null {
    let value = this.get("reward");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set reward(value: BigInt | null) {
    if (!value) {
      this.unset("reward");
    } else {
      this.set("reward", Value.fromBigInt(<BigInt>value));
    }
  }

  get started(): boolean {
    let value = this.get("started");
    return value!.toBoolean();
  }

  set started(value: boolean) {
    this.set("started", Value.fromBoolean(value));
  }

  get totalblock(): BigInt | null {
    let value = this.get("totalblock");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set totalblock(value: BigInt | null) {
    if (!value) {
      this.unset("totalblock");
    } else {
      this.set("totalblock", Value.fromBigInt(<BigInt>value));
    }
  }

  get notcompleted(): boolean {
    let value = this.get("notcompleted");
    return value!.toBoolean();
  }

  set notcompleted(value: boolean) {
    this.set("notcompleted", Value.fromBoolean(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }
}