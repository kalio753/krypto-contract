const { network, ethers } = require("hardhat")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = []

    await deploy("Transaction", {
        from: deployer,
        args,
        log: true,
        deterministicDeployment: false
    })

    log("Transaction Contract's deployed!")
    log("________________________________________________________________")
}

module.exports.tags = ["all", "transaction"]
