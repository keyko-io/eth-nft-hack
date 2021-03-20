import HDWalletProvider from '@truffle/hdwallet-provider'

const configJson = {
    nodeUri: 'http://localhost:8545',
    metadataUri: 'http://host.docker.internal:5000',
    faucetUri: 'http://localhost:3001',
    gatewayUri: 'http://localhost:8030',
    secretStoreUri: 'http://localhost:12001',
    gatewayAddress: '0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0',
    verbose: false
}

if (process.env.NETWORK_NAME === 'rinkeby') {
    Object.assign(configJson, {
        metadataUri: 'https://metadata.rinkeby.nevermined.rocks',
        faucetUri: 'https://faucet.rinkeby.nevermined.rocks',
        gatewayUri: 'https://gateway.rinkeby.nevermined.rocks',
        nodeUri: `https://rinkeby.infura.io/v3/52b6d403f7de4757ab9ed23c3778a35b`,
        gatewayAddress: '0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0',
    })
}

configJson.web3Provider = new HDWalletProvider("taxi music thumb unique chat sand crew more leg another off lamp", configJson.nodeUri, 0, 5)

export const config = configJson

export const nftStoreContractAddress = '0xb44fcb09a1504a69c1ebae4e599c53ed9f4801fe'
export const nftBaseUri = 'https://arweave.net/'
