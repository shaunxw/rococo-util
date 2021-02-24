// Insert keys to relay chain validator node, via RPC calls.
//
// Run with `node insertKey provider validator_derive secret`. The base URI
// would be `${secret}//${validator_derive}`. Other keys will derive from
// here, for instance, babe key would be `${secret}//${validator_derive}//babe`.

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { u8aToHex } = require('@polkadot/util');

const KEY_TYPES = [
    { type: 'sr25519', keyType: 'babe', derivePath: 'babe' },
    { type: 'ed25519', keyType: 'gran', derivePath: 'grandpa' },
    { type: 'sr25519', keyType: 'imon', derivePath: 'im_online' },
    { type: 'sr25519', keyType: 'para', derivePath: 'para_validator' },
    { type: 'sr25519', keyType: 'asgn', derivePath: 'para_assignment' },
    { type: 'sr25519', keyType: 'audi', derivePath: 'authority_discovery' },
];

async function main() {
    const args = process.argv.slice(2);
    const provider = args[0];
    if (!provider) {
        throw new Error('No `provider` parameter.');
    }
    const validator = args[1];
    if (!validator) {
        throw new Error('No `validator` parameter.');
    }
    const secret = args[2];
    if (!secret) {
        throw new Error('No `secret` parameter.');
    }

    const wsProvider = new WsProvider(provider);
    const api = new ApiPromise({ provider: wsProvider });
    await api.isReady;

    for (const { type, keyType, derivePath } of KEY_TYPES) {
        const keyring = new Keyring({ type });
        const uri = `${secret}//${validator}//${derivePath}`;
        const key = keyring.addFromUri(uri);
        const publicKey = u8aToHex(key.publicKey);

        try {
            await api.rpc.author.insertKey(keyType, uri, publicKey);
            console.log('Insert key success: ', derivePath, publicKey);
        } catch (err) {
            console.log('Insert key failed: ', err);
        }
    }

    process.exit();
}

async function catchAll() {
    try {
        await main();
    } catch (err) {
        console.log(err);
    }
}

catchAll()
