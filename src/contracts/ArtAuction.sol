// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "ArtProductContract.sol";
import "ArtNFT.sol";

contract ArtAuction is ArtProductContract {
    address private artNFTAddress;
    
    constructor() ArtProductContract() {
        ArtNFT artNFT = new ArtNFT(address(this));
        artNFTAddress = address(artNFT);
    }

    //now write a function that will update the auction price of all the exclusive art submissions, after each amount of "time" has passed the starting price will be decremented by "decrement" amount
    function updateAuctionPrice() public {
        for (uint i = 0; i < auctions.length; i++) {
            if (auctions[i].isExclusive) {
                if (auctions[i].startTime + auctions[i].time < block.timestamp) {
                    uint rounds = (block.timestamp - auctions[i].startTime) / auctions[i].time;
                    auctions[i].startingPrice = auctions[i].startingPrice - (rounds * auctions[i].decrement);
                    auctions[i].startTime = auctions[i].startTime + (rounds * auctions[i].time);
                }
                if (auctions[i].startingPrice < auctions[i].price) {
                    auctions[i].startingPrice = auctions[i].price;
                }
            }
        }
    }

    //now write a function that will process art submissions of a community
    function processSubmissions(address _community) public {
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        for (uint i = 0; i < artSubmissions.length; i++) {
            if (artSubmissions[i].community == _community) {
                if (!artSubmissions[i].isProcessed && artSubmissions[i].votingDeadline < block.timestamp) {
                    if (artSubmissions[i].votesFor >= artSubmissions[i].votesAgainst) {
                        artSubmissions[i].isApproved = true;
                        // Transfer the staked native token back to the creator
                        transferNativeToken(_community, _community, artSubmissions[i].creator, artSubmissions[i].stakeAmount);
                        ArtNFT(artNFTAddress).safeMint(artSubmissions[i].creator);
                    }
                    artSubmissions[i].isProcessed = true;
                }
            }
        }
    }

    //update function
    function update(address _community) public {
        updateAuctionPrice();
        processSubmissions(_community);
    }

    //buy function, first check for _user's balance, then safe transfer the nft and transfer native token from user to creator
    function buy(address _community, string memory _CID) public {
        address _user = msg.sender;
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        ArtSubmission memory artSubmission;
        uint index;
        for (uint i = 0; i < artSubmissions.length; i++) {
            if (artSubmissions[i].community == _community && keccak256(abi.encodePacked(artSubmissions[i].ipfsCID)) == keccak256(abi.encodePacked(_CID))) {
                artSubmission = artSubmissions[i];
                index = i;
            }
        }
        require(artSubmission.isProcessed && artSubmission.isApproved, "Art submission is not approved");
        require(getBalanceNativeToken(_community, _user) >= auctions[index].startingPrice, "Insufficient native tokens");
        ArtNFT(artNFTAddress).safeTransferFrom(artSubmissions[index].creator, _user, auctions[index].startingPrice);
        transferNativeToken(_community, _user, artSubmission.creator, auctions[index].startingPrice);
        artSubmissions[index].auction.show = false;
    }

    // //resell
    // function resell(address _community, string memory _CID) public {

    // }
    
}