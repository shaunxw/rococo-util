# rococo-util

## Insert key to validators

Insert keys to relay chain validator node, via RPC calls.

Run with `node insertKey provider validator_derive secret`. The base URI would be `${secret}//${validator_derive}`. Other keys will derive from here, for instance, babe key would be `${secret}//${validator_derive}//babe`.

## Encode call

Run with `node encodeCall provider pallet call call_parameters`.

### Examples:

To encode a `hrmp.hrmpInitOpenChannel` call in rococo, with parameter `(5000, 8, 1024)`:

```
$ node encodeCall wss://rococo-rpc.polkadot.io/ hrmp hrmpInitOpenChannel 5000 8 1024
Encoded hrmp.hrmpInitOpenChannel call: 0x1600881300000800000000040000
```

To encode a `hrmp.hrmpAcceptOpenChannel` call in rococo, with parameter `(5000)`:

```
$ node encodeCall wss://rococo-rpc.polkadot.io/ hrmp hrmpAcceptOpenChannel 5000
Encoded hrmp.hrmpAcceptOpenChannel call: 0x160188130000
```

