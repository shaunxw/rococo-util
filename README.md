# Rococo Util

## Insert keys to relay chain validator

Insert keys to relay chain validator node, via RPC calls.

Run:

```
node insertValidatorKeys provider validator_derive secret
```

The base URI would be:

```
${secret}//${validator_derive}
```

Other keys will derive from here, for instance, babe key would be:

```
${secret}//${validator_derive}//babe
```

After insertion success, it will print public keys for each key type.

### Examples

```
$ node insertValidatorKeys ws://localhost:9944 alice MYSECRET
Insert key success:  babe 0x9ea30bb568019aba330bf4c584e2e9245c5d46aca0fa2d4ee8de42ea214e5028
Insert key success:  grandpa 0x61cb38d634441633234b870e81689f64c831b2d4c82244208b0ec6a15b2e93cc
Insert key success:  im_online 0x5a8424bd8351df3d90b7ab5af1ce65c75a40aa43d21a9cb13e743f71e52b8315
Insert key success:  para_validator 0x4cca1dbd451e4295f39d97bf29fe4dc5d363f53fd9e3077c45297af8c17ef613
Insert key success:  para_assignment 0xae8f2fe8c9ea749f7f853af83791eb0d3310f44e751f2f4667bc13b05295980f
Insert key success:  authority_discovery 0x9e09dd2e244ba3768904d6b1ab92be70e28cc104b456291dbbbb9a7f93024801
```


## Encode call

[`Xcm::Transact`](https://github.com/paritytech/xcm-format#transact) messages need encoded `call` field as bytes.

Run:

```
node encodeCall provider pallet call call_parameters
```

It will print the encoded call hex.

### Examples:

To encode a `hrmp.hrmpInitOpenChannel` call in rococo, with parameter `(5000, 8, 1024)`:

```
$ node encodeCall wss://rococo-rpc.polkadot.io/ hrmp hrmpInitOpenChannel 5000 8 1024
hrmp.hrmpInitOpenChannel(5000,8,1024) encoded:
0x1600881300000800000000040000
```

To encode a `hrmp.hrmpAcceptOpenChannel` call in rococo, with parameter `(5000)`:

```
$ node encodeCall wss://rococo-rpc.polkadot.io/ hrmp hrmpAcceptOpenChannel 5000
hrmp.hrmpAcceptOpenChannel(5000) encoded:
0x160188130000
```

