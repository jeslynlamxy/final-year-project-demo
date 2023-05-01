// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./HitchensUnorderedKeySet.sol";

contract UserManager {
    // Written by: Lam Xin Yi, Jeslyn

    // Ensures healthy time complexity even when its met with a large number of users
    using HitchensUnorderedKeySetLib for HitchensUnorderedKeySetLib.Set;
    HitchensUnorderedKeySetLib.Set userAuthenticationSet;

    // Key is emailAddress // To be encrypted
    struct UserDetails {
        string encryptedPassword;
    }

    // Note that using bytes proven to be more gas friednly than string mappings
    mapping(bytes32 => UserDetails) emailToUserDetails;

    event LogNewUser(
        address sender,
        bytes32 emailAddress,
        string encryptedPassword
    );
    event LogUpdateUser(
        address sender,
        bytes32 emailAddress,
        string encryptedPassword
    );
    event LogRemUser(address sender, bytes32 emailAddress);

    function newUser(
        bytes32 emailAddress,
        string memory encryptedPassword
    ) public {
        userAuthenticationSet.insert(emailAddress);
        // Note that this will fail automatically if the username already exists.
        UserDetails storage w = emailToUserDetails[emailAddress];
        w.encryptedPassword = encryptedPassword;
        emit LogNewUser(msg.sender, emailAddress, encryptedPassword);
    }

    function updateUser(
        bytes32 emailAddress,
        string memory encryptedPassword
    ) public {
        require(
            userAuthenticationSet.exists(emailAddress),
            "Can't update a user that doesn't exist."
        );
        // Note that this does conditional checking and prints warning when fails
        UserDetails storage w = emailToUserDetails[emailAddress];
        w.encryptedPassword = encryptedPassword;
        emit LogUpdateUser(msg.sender, emailAddress, encryptedPassword);
    }

    function remUser(bytes32 emailAddress) public {
        userAuthenticationSet.remove(emailAddress);
        // Note that this will fail automatically if the username doesn't exist
        delete emailToUserDetails[emailAddress];
        emit LogRemUser(msg.sender, emailAddress);
    }

    function getUserPassword(
        bytes32 emailAddress
    ) public view returns (string memory encryptedPassword) {
        require(
            userAuthenticationSet.exists(emailAddress),
            "Can't get a user that doesn't exist."
        );
        // Note that this does conditional checking and prints warning when fails
        UserDetails storage w = emailToUserDetails[emailAddress];
        return w.encryptedPassword;
    }

    function getUserCount() public view returns (uint256 count) {
        return userAuthenticationSet.count();
    }
}
