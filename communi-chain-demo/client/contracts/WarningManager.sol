// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./HitchensUnorderedKeySet.sol";

contract WarningManager {
    // Written by: Lam Xin Yi, Jeslyn

    // Ensures healthy time complexity even when its met with a large number of users
    using HitchensUnorderedKeySetLib for HitchensUnorderedKeySetLib.Set;
    HitchensUnorderedKeySetLib.Set cautionedUserSet;

    // Key is emailAddress // To be encrypted
    struct CautionedDetails {
        int reportCount;
    }

    // Note that using bytes proven to be more gas friednly than string mappings
    mapping(bytes32 => CautionedDetails) emailToCautionedDetails;

    event LogNewReport(address sender, bytes32 emailAddress);
    event LogAddCount(address sender, bytes32 emailAddress);
    event LogReduceCount(address sender, bytes32 emailAddress);

    function newReport(bytes32 emailAddress) public {
        cautionedUserSet.insert(emailAddress);
        // Note that this will fail automatically if the username already exists.
        CautionedDetails storage w = emailToCautionedDetails[emailAddress];
        w.reportCount = 0;
        emit LogNewReport(msg.sender, emailAddress);
    }

    function addCount(
        bytes32 emailAddress
    ) public {
        require(
            cautionedUserSet.exists(emailAddress),
            "Can't update a user that doesn't exist."
        );
        // Note that this does conditional checking and prints warning when fails
        CautionedDetails storage w = emailToCautionedDetails[emailAddress];
        w.reportCount += 1;
        emit LogAddCount(msg.sender, emailAddress);
    }

    function reduceCount(
        bytes32 emailAddress
    ) public {
        require(
            cautionedUserSet.exists(emailAddress),
            "Can't update a user that doesn't exist."
        );
        // Note that this does conditional checking and prints warning when fails
        CautionedDetails storage w = emailToCautionedDetails[emailAddress];
        w.reportCount -= 1;
        emit LogReduceCount(msg.sender, emailAddress);
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
}
