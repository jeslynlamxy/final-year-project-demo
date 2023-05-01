const { ethers } = require("hardhat");
const utils = ethers.utils;

async function main() {
  console.log("*** DEPLOYMENT ***");
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  const UserManager = await ethers.getContractFactory("UserManager");
  const usermanager = await UserManager.deploy();
  await usermanager.deployed();
  console.log("UserManager deployed to:", usermanager.address);
  console.log("");

  const WarningManager = await ethers.getContractFactory("WarningManager");
  const warningmanager = await WarningManager.deploy();
  await warningmanager.deployed();
  console.log("WarningManager deployed to:", warningmanager.address);
  console.log("");

  // For testing
  console.log("*** SET UP CAUTIONED USERS DONALD AND EVE ***");
  const addNewReportTxDon = await warningmanager.newReport(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  await addNewReportTxDon.wait();
  const checkCountTxDon = await warningmanager.getCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  console.log("Donald Report Count:", checkCountTxDon);

  const secondReportTxDon = await warningmanager.addCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  await secondReportTxDon.wait();
  const secondCountTxDon = await warningmanager.getCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  console.log("Donald Report Count:", secondCountTxDon);

  const thirdReportTxDon = await warningmanager.addCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  await thirdReportTxDon.wait();
  const thirdCountTxDon = await warningmanager.getCount(utils.formatBytes32String("donald.trumpet.demo@gmail.com"));
  console.log("Donald Report Count:", thirdCountTxDon);

  console.log("");

  const addNewReportTxEve = await warningmanager.newReport(utils.formatBytes32String("eve.val.demo@gmail.com"));
  await addNewReportTxEve.wait();
  const checkCountTxEve = await warningmanager.getCount(utils.formatBytes32String("eve.val.demo@gmail.com"));
  console.log("Eve Report Count:", checkCountTxEve);

  const secondReportTxEve = await warningmanager.addCount(utils.formatBytes32String("eve.val.demo@gmail.com"));
  await secondReportTxEve.wait();
  const secondCountTxEve = await warningmanager.getCount(utils.formatBytes32String("eve.val.demo@gmail.com"));
  console.log("Eve Report Count:", secondCountTxEve);

  console.log("");

  // For testing
  console.log("*** ADMINISTRATIVE ACCOUNT ***");
  // const firstCount = await usermanager.getUserCount();
  // console.log("Current number of users is:", firstCount.toString());
  const addNewUserTx = await usermanager.newUser(utils.formatBytes32String("admin@email.com"), "password");
  await addNewUserTx.wait();
  // const secondCount = await usermanager.getUserCount();
  // console.log("Current number of users is:", secondCount.toString());
  console.log("Credentials:", "admin@email.com", "password");

  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });