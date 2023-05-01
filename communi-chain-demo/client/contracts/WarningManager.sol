// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./HitchensUnorderedKeySet.sol";

contract WarningManager {
    // Written by: Lam Xin Yi, Jeslyn

    // Ensures healthy time complexity even when its met with a large number of users
    using HitchensUnorderedKeySetLib for HitchensUnorderedKeySetLib.Set;
    HitchensUnorderedKeySetLib.Set cautionedUserSet;

    // Key is emailAddress
    struct CautionedDetails {
        int reportCount;
    }

    // List of people to be wary off, donald and eve
    string[] public CautionedPersons;

    // Note that using bytes proven to be more gas friednly than string mappings
    mapping(bytes32 => CautionedDetails) emailToCautionedDetails;

    event LogRegisterUser(address sender, bytes32 emailAddress);
    event LogAddCount(address sender, bytes32 emailAddress);

    /* bytes32 (fixed-size array) to string (dynamically-sized array) */
    function bytes32ToString(
        bytes32 _bytes32
    ) public pure returns (string memory) {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    function registerUser(bytes32 emailAddress) public {
        cautionedUserSet.insert(emailAddress);
        // Note that this will fail automatically if the username already exists.
        CautionedDetails storage w = emailToCautionedDetails[emailAddress];
        w.reportCount = 0;
        emit LogRegisterUser(msg.sender, emailAddress);
    }

    function addCount(bytes32 emailAddress) public {
        require(
            cautionedUserSet.exists(emailAddress),
            "Can't update a user that doesn't exist."
        );
        // Note that this does conditional checking and prints warning when fails
        CautionedDetails storage w = emailToCautionedDetails[emailAddress];
        w.reportCount += 1;
        emit LogAddCount(msg.sender, emailAddress);
        if (w.reportCount == 3) {
            CautionedPersons.push(bytes32ToString(emailAddress));
        }
    }

    function getCount(
        bytes32 emailAddress
    ) public view returns (int reportCount) {
        require(
            cautionedUserSet.exists(emailAddress),
            "Can't get a user that doesn't exist."
        );
        // Note that this does conditional checking and prints warning when fails
        CautionedDetails storage w = emailToCautionedDetails[emailAddress];
        return w.reportCount;
    }

    function getCautionedPersons() public view returns (string[] memory) {
        return CautionedPersons;
    }
}
