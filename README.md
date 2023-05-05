# Communi-Chain Final Year Project Demo

## To run

- Connected to non school internet, use phone hotspot would be best
- Metamask unable to run with school internet
- Have metamask installed and ready
- Have hardhat network added to network settings and ready
- Have hardhat private key accoount imported onto metamask and ready
- Database make sure there is not too much nonsense
- Use chrome browser
- Basic knowledge of npm and how things work might be needed
- Basic knowledge of web3 and how things work might be needed

1. Open new terminal at singpass-verify-demo
2. If first time then {npm i}
3. Thereafter {npm run start} this is singpass verification site
4. Open new terminal at communi-chain-demo
5. If first time then {npm i}
6. Thereafter {npm run start} this is communi-chain server side
7. Open new terminal at communi-chain-demo/client
8. If first time then {npm i}
9. Double check smart contracts {npx hardhat compile}
10. Start local blockchain {npx hardhat node} this is the local hardhat node
11. Open new terminal at communi-chain-demo/client
12. Deploy smart contracts on local blockchain instance {npx hardhat run scripts/deploy.js --network localhost}
13. Double check addresses in code
14. Open new terminal at communi-chain-demo/client
15. Thereafter {npm run start} this is communi-chain client side

## Project demo

- Set up env before presentation
- Brief on the initial set up

## Different accounts

- Alice alice.wonderland.demo@gmail.com
- Bob bob.builderr.demo@gmail.com
- Charlie charlie.choco.demo@gmail.com
- Donald donald.trumpet.demo@gmail.com
- Eve eve.val.demo@gmail.com

## Demo set up mock situtation

- Alice, Bob, Donald and Eve already created
- Alice, Bob, Eve has reported Donald so he has been marked as a cautioned user
- Log in to Alice and Bob
- Look at chat history symbols
- Message each other
- Call and video each other
- Sign up for Charlie
- Let them know Alice and Bob already reported Eve
- So Eve report count is 2
- Now Charlie can also report Eve
- Now that there are 3 reports, Eve will be seen as a cautioned user as well
