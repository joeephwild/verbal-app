// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class CloseStream extends ethereum.Event {
  get params(): CloseStream__Params {
    return new CloseStream__Params(this);
  }
}

export class CloseStream__Params {
  _event: CloseStream;

  constructor(event: CloseStream) {
    this._event = event;
  }

  get to(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get balance(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ExecuteTransaction extends ethereum.Event {
  get params(): ExecuteTransaction__Params {
    return new ExecuteTransaction__Params(this);
  }
}

export class ExecuteTransaction__Params {
  _event: ExecuteTransaction;

  constructor(event: ExecuteTransaction) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }

  get nonce(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get hash(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }

  get result(): Bytes {
    return this._event.parameters[6].value.toBytes();
  }
}

export class OpenStream extends ethereum.Event {
  get params(): OpenStream__Params {
    return new OpenStream__Params(this);
  }
}

export class OpenStream__Params {
  _event: OpenStream;

  constructor(event: OpenStream) {
    this._event = event;
  }

  get to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get frequency(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Owner extends ethereum.Event {
  get params(): Owner__Params {
    return new Owner__Params(this);
  }
}

export class Owner__Params {
  _event: Owner;

  constructor(event: Owner) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get added(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get reason(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class Contract__streamsResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getAmount(): BigInt {
    return this.value0;
  }

  getFrequency(): BigInt {
    return this.value1;
  }

  getLast(): BigInt {
    return this.value2;
  }
}

export class Contract extends ethereum.SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  chainId(): BigInt {
    let result = super.call("chainId", "chainId():(uint256)", []);

    return result[0].toBigInt();
  }

  try_chainId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("chainId", "chainId():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  executeTransaction(
    to: Address,
    value: BigInt,
    data: Bytes,
    signatures: Array<Bytes>,
  ): Bytes {
    let result = super.call(
      "executeTransaction",
      "executeTransaction(address,uint256,bytes,bytes[]):(bytes)",
      [
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(value),
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromBytesArray(signatures),
      ],
    );

    return result[0].toBytes();
  }

  try_executeTransaction(
    to: Address,
    value: BigInt,
    data: Bytes,
    signatures: Array<Bytes>,
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "executeTransaction",
      "executeTransaction(address,uint256,bytes,bytes[]):(bytes)",
      [
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(value),
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromBytesArray(signatures),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getTransactionHash(
    _nonce: BigInt,
    to: Address,
    value: BigInt,
    data: Bytes,
  ): Bytes {
    let result = super.call(
      "getTransactionHash",
      "getTransactionHash(uint256,address,uint256,bytes):(bytes32)",
      [
        ethereum.Value.fromUnsignedBigInt(_nonce),
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(value),
        ethereum.Value.fromBytes(data),
      ],
    );

    return result[0].toBytes();
  }

  try_getTransactionHash(
    _nonce: BigInt,
    to: Address,
    value: BigInt,
    data: Bytes,
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getTransactionHash",
      "getTransactionHash(uint256,address,uint256,bytes):(bytes32)",
      [
        ethereum.Value.fromUnsignedBigInt(_nonce),
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(value),
        ethereum.Value.fromBytes(data),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  isOwner(param0: Address): boolean {
    let result = super.call("isOwner", "isOwner(address):(bool)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBoolean();
  }

  try_isOwner(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isOwner", "isOwner(address):(bool)", [
      ethereum.Value.fromAddress(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  nonce(): BigInt {
    let result = super.call("nonce", "nonce():(uint256)", []);

    return result[0].toBigInt();
  }

  try_nonce(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("nonce", "nonce():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  recover(_hash: Bytes, _signature: Bytes): Address {
    let result = super.call("recover", "recover(bytes32,bytes):(address)", [
      ethereum.Value.fromFixedBytes(_hash),
      ethereum.Value.fromBytes(_signature),
    ]);

    return result[0].toAddress();
  }

  try_recover(_hash: Bytes, _signature: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall("recover", "recover(bytes32,bytes):(address)", [
      ethereum.Value.fromFixedBytes(_hash),
      ethereum.Value.fromBytes(_signature),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  signaturesRequired(): BigInt {
    let result = super.call(
      "signaturesRequired",
      "signaturesRequired():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_signaturesRequired(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "signaturesRequired",
      "signaturesRequired():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  streamBalance(to: Address): BigInt {
    let result = super.call(
      "streamBalance",
      "streamBalance(address):(uint256)",
      [ethereum.Value.fromAddress(to)],
    );

    return result[0].toBigInt();
  }

  try_streamBalance(to: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "streamBalance",
      "streamBalance(address):(uint256)",
      [ethereum.Value.fromAddress(to)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  streams(param0: Address): Contract__streamsResult {
    let result = super.call(
      "streams",
      "streams(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)],
    );

    return new Contract__streamsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
    );
  }

  try_streams(param0: Address): ethereum.CallResult<Contract__streamsResult> {
    let result = super.tryCall(
      "streams",
      "streams(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Contract__streamsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
      ),
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _chainId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _owners(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }

  get _signaturesRequired(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddSignerCall extends ethereum.Call {
  get inputs(): AddSignerCall__Inputs {
    return new AddSignerCall__Inputs(this);
  }

  get outputs(): AddSignerCall__Outputs {
    return new AddSignerCall__Outputs(this);
  }
}

export class AddSignerCall__Inputs {
  _call: AddSignerCall;

  constructor(call: AddSignerCall) {
    this._call = call;
  }

  get newSigner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get newSignaturesRequired(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class AddSignerCall__Outputs {
  _call: AddSignerCall;

  constructor(call: AddSignerCall) {
    this._call = call;
  }
}

export class CloseStreamCall extends ethereum.Call {
  get inputs(): CloseStreamCall__Inputs {
    return new CloseStreamCall__Inputs(this);
  }

  get outputs(): CloseStreamCall__Outputs {
    return new CloseStreamCall__Outputs(this);
  }
}

export class CloseStreamCall__Inputs {
  _call: CloseStreamCall;

  constructor(call: CloseStreamCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class CloseStreamCall__Outputs {
  _call: CloseStreamCall;

  constructor(call: CloseStreamCall) {
    this._call = call;
  }
}

export class ExecuteTransactionCall extends ethereum.Call {
  get inputs(): ExecuteTransactionCall__Inputs {
    return new ExecuteTransactionCall__Inputs(this);
  }

  get outputs(): ExecuteTransactionCall__Outputs {
    return new ExecuteTransactionCall__Outputs(this);
  }
}

export class ExecuteTransactionCall__Inputs {
  _call: ExecuteTransactionCall;

  constructor(call: ExecuteTransactionCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get signatures(): Array<Bytes> {
    return this._call.inputValues[3].value.toBytesArray();
  }
}

export class ExecuteTransactionCall__Outputs {
  _call: ExecuteTransactionCall;

  constructor(call: ExecuteTransactionCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class OpenStreamCall extends ethereum.Call {
  get inputs(): OpenStreamCall__Inputs {
    return new OpenStreamCall__Inputs(this);
  }

  get outputs(): OpenStreamCall__Outputs {
    return new OpenStreamCall__Outputs(this);
  }
}

export class OpenStreamCall__Inputs {
  _call: OpenStreamCall;

  constructor(call: OpenStreamCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get frequency(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class OpenStreamCall__Outputs {
  _call: OpenStreamCall;

  constructor(call: OpenStreamCall) {
    this._call = call;
  }
}

export class RemoveSignerCall extends ethereum.Call {
  get inputs(): RemoveSignerCall__Inputs {
    return new RemoveSignerCall__Inputs(this);
  }

  get outputs(): RemoveSignerCall__Outputs {
    return new RemoveSignerCall__Outputs(this);
  }
}

export class RemoveSignerCall__Inputs {
  _call: RemoveSignerCall;

  constructor(call: RemoveSignerCall) {
    this._call = call;
  }

  get oldSigner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get newSignaturesRequired(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RemoveSignerCall__Outputs {
  _call: RemoveSignerCall;

  constructor(call: RemoveSignerCall) {
    this._call = call;
  }
}

export class StreamWithdrawCall extends ethereum.Call {
  get inputs(): StreamWithdrawCall__Inputs {
    return new StreamWithdrawCall__Inputs(this);
  }

  get outputs(): StreamWithdrawCall__Outputs {
    return new StreamWithdrawCall__Outputs(this);
  }
}

export class StreamWithdrawCall__Inputs {
  _call: StreamWithdrawCall;

  constructor(call: StreamWithdrawCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get reason(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class StreamWithdrawCall__Outputs {
  _call: StreamWithdrawCall;

  constructor(call: StreamWithdrawCall) {
    this._call = call;
  }
}

export class UpdateSignaturesRequiredCall extends ethereum.Call {
  get inputs(): UpdateSignaturesRequiredCall__Inputs {
    return new UpdateSignaturesRequiredCall__Inputs(this);
  }

  get outputs(): UpdateSignaturesRequiredCall__Outputs {
    return new UpdateSignaturesRequiredCall__Outputs(this);
  }
}

export class UpdateSignaturesRequiredCall__Inputs {
  _call: UpdateSignaturesRequiredCall;

  constructor(call: UpdateSignaturesRequiredCall) {
    this._call = call;
  }

  get newSignaturesRequired(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdateSignaturesRequiredCall__Outputs {
  _call: UpdateSignaturesRequiredCall;

  constructor(call: UpdateSignaturesRequiredCall) {
    this._call = call;
  }
}
