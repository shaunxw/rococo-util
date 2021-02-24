# Rococo Util

## Insert key to validators

Insert keys to relay chain validator node, via RPC calls.

Run:

```
node insertKey provider validator_derive secret
```

The base URI would be:

```
${secret}//${validator_derive}
```

Other keys will derive from here, for instance, babe key would be:

```
${secret}//${validator_derive}//babe
```


## Encode call

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

