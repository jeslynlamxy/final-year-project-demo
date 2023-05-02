const { ethers } = require("hardhat");
const utils = ethers.utils;

async function main() {
  console.log("");

  console.log("*** DEPLOYMENT ***");
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  const UserManager = await ethers.getContractFactory("UserManager");
  const usermanager = await UserManager.deploy();
  await usermanager.deployed();
  console.log("UserManager deployed to:", usermanager.address);

  const WarningManager = await ethers.getContractFactory("WarningManager");
  const warningmanager = await WarningManager.deploy();
  await warningmanager.deployed();
  console.log("WarningManager deployed to:", warningmanager.address);

  console.log("");

  console.log("*** SET UP ALL DEMO USERS ***");
  const addNewUserTx1 = await usermanager.newUser(utils.formatBytes32String("alice.wonderland.demo@gmail.com"), "password");
  await addNewUserTx1.wait();
  const addNewUserTx2 = await usermanager.newUser(utils.formatBytes32String("bob.builderr.demo@gmail.com"), "password");
  await addNewUserTx2.wait();

  // const addNewUserTx3 = await usermanager.newUser(utils.formatBytes32String("charlie.choco.demo@gmail.com"), "password");
  // await addNewUserTx3.wait();

  const addNewUserTx4 = await usermanager.newUser(utils.formatBytes32String("donald.trumpet.demo@gmail.com"), "password");
  await addNewUserTx4.wait();
  const addNewUserTx5 = await usermanager.newUser(utils.formatBytes32String("eve.val.demo@gmail.com"), "password");
  await addNewUserTx5.wait();
  const addNewUserTx6 = await usermanager.newUser(utils.formatBytes32String("jeslynlxy@hotmail.com"), "password");
  await addNewUserTx6.wait();

  const addNewReportTx1 = await warningmanager.registerUser(utils.formatBytes32String("alice.wonderland.demo@gmail.com"));
  await addNewReportTx1.wait();
  const addNewReportTx2 = await warningmanager.registerUser(utils.formatBytes32String("bob.builderr.demo@gmail.com"));
  await addNewReportTx2.wait();

  // const addNewReportTx3 = await warningmanager.registerUser(utils.formatBytes32String("charlie.choco.demo@gmail.com"));
  // await addNewReportTx3.wait();
  
  const addNewReportTx4 = await warningmanager.registerUser(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  await addNewReportTx4.wait();
  const addNewReportTx5 = await warningmanager.registerUser(utils.formatBytes32String("eve.val.demo@gmail.com"));
  await addNewReportTx5.wait();
  const addNewReportTx6 = await warningmanager.registerUser(utils.formatBytes32String("jeslynlxy@hotmail.com"));
  await addNewReportTx6.wait();

  const userCount = await usermanager.getUserCount();
  console.log("User Count:", userCount.toNumber());

  console.log("");

  // For testing
  console.log("*** REPORTING DEFAULTS FOR CAUTIONED USERS DONALD AND EVE ***");
  
  const checkCountTxDon = await warningmanager.getCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  console.log("Donald Report Count:", checkCountTxDon.toNumber());

  const firstReportTxDon = await warningmanager.addCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  await firstReportTxDon.wait();

  const firstCountTxDon = await warningmanager.getCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  console.log("Donald Report Count:", firstCountTxDon.toNumber());

  const secondReportTxDon = await warningmanager.addCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  await secondReportTxDon.wait();

  const secondCountTxDon = await warningmanager.getCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  console.log("Donald Report Count:", secondCountTxDon.toNumber());

  const thirdReportTxDon = await warningmanager.addCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  await thirdReportTxDon.wait();

  const thirdCountTxDon = await warningmanager.getCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  console.log("Donald Report Count:", thirdCountTxDon.toNumber());

  console.log("");

  const checkListTx = await warningmanager.getCautionedPersons();
  console.log("Get Cautioned Persons:", checkListTx);

  console.log("");

  const checkCountTxEve = await warningmanager.getCount(utils.formatBytes32String("eve.val.demo@gmail.com"));
  console.log("Eve Report Count:", checkCountTxEve.toNumber());

  const firstReportTxEve = await warningmanager.addCount(utils.formatBytes32String("eve.val.demo@gmail.com"));
  await firstReportTxEve.wait();

  const firstCountTxEve = await warningmanager.getCount(utils.formatBytes32String("eve.val.demo@gmail.com"));
  console.log("Eve Report Count:", firstCountTxEve.toNumber());

  const secondReportTxEve = await warningmanager.addCount(utils.formatBytes32String("eve.val.demo@gmail.com"));
  await secondReportTxEve.wait();
  
  const secondCountTxEve = await warningmanager.getCount(utils.formatBytes32String("eve.val.demo@gmail.com"));
  console.log("Eve Report Count:", secondCountTxEve.toNumber());

  console.log("");

  console.log("*** FINAL CAUTIONED LIST WITH DONALD ***");
  const checkListTxAgain = await warningmanager.getCautionedPersons();
  console.log("Get Cautioned Persons:", checkListTxAgain);

  console.log("");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 