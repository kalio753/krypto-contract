const { ethers, network } = require("hardhat")
const fs = require("fs")

const IS_UPDATE_FRONT_END = process.env.IS_UPDATE_FRONT_END || true
const FRONT_END_ADDRESSES_FILE = "../client/constant/contractAddresses.json"
const FRONT_END_ABI_FILE = "../client/constant/abi.json"

module.exports = async () => {
    if (IS_UPDATE_FRONT_END) {
        console.log("Updating Front End...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front End updated successfully")
        console.log("--------------------------------")
    }
}

async function updateAbi() {
    console.log("ahahahah")
    const transaction = await ethers.getContract("Transaction")
    console.log("huhuhuhu")

    fs.writeFileSync(
        FRONT_END_ABI_FILE,
        transaction.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const transaction = await ethers.getContract("Transaction")
    console.log("uduududud")
    const chainId = network.config.chainId.toString()

    const currAddresses = JSON.parse(
        fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
    )

    if (chainId in currAddresses) {
        if (!currAddresses[chainId].includes(transaction.address)) {
            currAddresses[chainId].push(transaction.address)
        }
    } else {
        currAddresses[chainId] = [transaction.address]
    }

    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currAddresses))
}

module.exports.tags = ["all", "frontend"]
