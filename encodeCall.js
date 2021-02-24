const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
    const args = process.argv.slice(2);
    const [provider, pallet, call, ...params] = args;
    if (!pallet) {
        throw new Error('No `pallet` parameter.');
    }
    if (!call) {
        throw new Error('No `call` parameter.');
    }

    const wsProvider = new WsProvider(provider);
    const api = new ApiPromise({ provider: wsProvider });
    await api.isReady;

    const encoded = api.tx[pallet][call](...params).method.toHex();
    console.log(`${pallet}.${call}(${params.join(',')}) encoded:\n${encoded}`);

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
