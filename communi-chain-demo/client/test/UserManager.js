const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserManager", function () {

    it("Starts as empty dataset", async function () {
        const UserManager = await ethers.getContractFactory("UserManager");
        const usermanager = await UserManager.deploy();
        await usermanager.deployed();
        expect(await usermanager.getUserCount()).to.equal(0);
    });

    it("Able to add new user", async function () {
        const UserManager = await ethers.getContractFactory("UserManager");
        const usermanager = await UserManager.deploy();
        await usermanager.deployed();
        const addNewUserTx = await usermanager.newUser(ethers.utils.formatBytes32String("user@email.com"), "password");
        await addNewUserTx.wait();
        expect(await usermanager.getUserCount()).to.equal(1);
    });

    it("Able to update user details without actually adding new user", async function () {
        const UserManager = await ethers.getContractFactory("UserManager");
        const usermanager = await UserManager.deploy();
        await usermanager.deployed();
        const addNewUserTx = await usermanager.newUser(ethers.utils.formatBytes32String("user@email.com"), "password");
        await addNewUserTx.wait();
        const updateUserTx = await usermanager.updateUser(ethers.utils.formatBytes32String("user@email.com"), "P@$$W0RD");
        await updateUserTx.wait();
        expect(await usermanager.getUserCount()).to.equal(1);
    });

    it("Able to view user password", async function () {
        const UserManager = await ethers.getContractFactory("UserManager");
        const usermanager = await UserManager.deploy();
        await usermanager.deployed();
        const addNewUserTx = await usermanager.newUser(ethers.utils.formatBytes32String("user@email.com"), "password");
        await addNewUserTx.wait();
        expect(await usermanager.getUserPassword(ethers.utils.formatBytes32String("user@email.com"))).to.equal("password");
    });

    it("Able to correctly update user password and the change is verified", async function () {
        const UserManager = await ethers.getContractFactory("UserManager");
        const usermanager = await UserManager.deploy();
        await usermanager.deployed();
        const addNewUserTx = await usermanager.newUser(ethers.utils.formatBytes32String("user@email.com"), "password");
        await addNewUserTx.wait();
        const updateUserTx = await usermanager.updateUser(ethers.utils.formatBytes32String("user@email.com"), "P@SSW0RD");
        await updateUserTx.wait();
        expect(await usermanager.getUserPassword(ethers.utils.formatBytes32String("user@email.com"))).to.equal("P@SSW0RD");
    });

    it("Able to remove user with key", async function () {
        const UserManager = await ethers.getContractFactory("UserManager");
        const usermanager = await UserManager.deploy();
        await usermanager.deployed();
        expect(await usermanager.getUserCount()).to.equal(0);
        const addNewUserTx = await usermanager.newUser(ethers.utils.formatBytes32String("user@email.com"), "password");
        await addNewUserTx.wait();
        expect(await usermanager.getUserCount()).to.equal(1);
        const updateUserTx = await usermanager.remUser(ethers.utils.formatBytes32String("user@email.com"));
        await updateUserTx.wait();
        expect(await usermanager.getUserCount()).to.equal(0);
    });

});