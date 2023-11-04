// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "ArtBlock.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ArtProductContract is ABXToken, ReentrancyGuard {
    struct ArtSubmission {
        address community;
        address creator;
        string title;
        string description;
        string ipfsCID;
        uint256 votingDeadline;
        uint256 stakeAmount;
        bool isApproved;
        bool isProcessed;
        uint256 votesFor;
        uint256 votesAgainst;
        address[] voters;
        bool isOwner;
        Auction auction;
    }
    
    struct Auction {
        bool isExclusive;
        bool show;
        uint startingPrice;
        uint decrement;
        uint time;
        uint startTime;
        uint price;
    }
    
    ArtSubmission[] public artSubmissions;
    Auction[] public auctions;

    constructor() ABXToken() {
    }

    // Function for creators to submit art for publication
    function submitArtForPublication(
        address _community,
        string memory _title,
        string memory _description,
        string memory _ipfsCID,
        bool _isExclusive,
        uint _startingPrice,
        uint _decrement,
        uint _time,
        uint _price
    ) external nonReentrant {
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        //get the balance of native community tokens and compare it to membership requirement
        require(getBalanceNativeToken(_community, msg.sender) >= community.membershipRequirement, "Insufficient community tokens for membership");
        require(getBalanceNativeToken(_community, msg.sender) >= community.stakeAmount, "Insufficient community tokens for stake");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_ipfsCID).length > 0, "IPFS CID cannot be empty");
        uint votingDuration = community.votingDuration;

        // Create an art submission with the staked amount and voting period
        uint256 votingDeadline = block.timestamp + votingDuration;
        auctions.push(Auction({
            isExclusive: _isExclusive,
            show: true,
            startingPrice: _startingPrice,
            decrement: _decrement,
            time: _time,
            startTime: 0,
            price: _price
        }));
        artSubmissions.push(ArtSubmission({
            community: _community,
            title: _title,
            description: _description,
            ipfsCID: _ipfsCID,
            votingDeadline: votingDeadline,
            stakeAmount: community.stakeAmount,
            isApproved: false,
            isProcessed: false,
            votesFor: 0,
            votesAgainst: 0,
            voters: new address[](0),
            creator: msg.sender,
            isOwner: false,
            auction: auctions[auctions.length - 1]
        }));

        // Transfer the staked native amount to this contract
        transferNativeToken(_community, msg.sender, _community, community.stakeAmount);
    }

    //create a function that will process the art submission once the voting period has ended
    function processArtSubmission(address _community, address _creator) public {
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        ArtSubmission memory artSubmission;
        uint index;
        for (uint i = 0; i < artSubmissions.length; i++) {
            if (artSubmissions[i].community == _community && artSubmissions[i].creator == _creator) {
                artSubmission = artSubmissions[i];
                index = i;
            }
        }
        if (artSubmission.isProcessed) {
            revert("already been processed");
        }
        if (artSubmission.votingDeadline > block.timestamp) {
            revert("Voting period has not ended yet");
        }
        if (artSubmission.votesFor >= artSubmission.votesAgainst) {
            artSubmission.isApproved = true;
            // Transfer the staked native token back to the creator
            transferNativeToken(_community, _community, _creator, artSubmission.stakeAmount);
        }
        artSubmissions[index].isProcessed = true;
        artSubmissions[index].auction.startTime = block.timestamp;
    }

    function processVote(address _community, address _creator, string memory vote) internal {
        address user = msg.sender;
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        ArtSubmission storage artSubmission = artSubmissions[0];
        for (uint i = 0; i < artSubmissions.length; i++) {
            if (artSubmissions[i].community == _community && artSubmissions[i].creator == _creator) {
                artSubmission = artSubmissions[i];
            }
        }
        if (artSubmission.isProcessed) {
            revert("already processed");
        }
        if (artSubmission.votingDeadline < block.timestamp) {
            // processArtSubmission(_community, _creator);
            revert("Voting period has ended");
        }
        if (artSubmission.isApproved) {
            revert("already approved");
        }
        for (uint i = 0; i < artSubmission.voters.length; i++) {
            if (artSubmission.voters[i] == user) {
                revert("user already voted");
            }
        }
        artSubmission.voters.push(user);
        if (keccak256(abi.encodePacked(vote)) == keccak256(abi.encodePacked("up"))) {
            artSubmission.votesFor++;
        } else if (keccak256(abi.encodePacked(vote)) == keccak256(abi.encodePacked("down"))) {
            artSubmission.votesAgainst++;
        } else {
            revert("invalid vote");
        }
    }
    
    // Upvote an art product
    function upvoteArtProduct(address _community, address _creator) external {
        processVote(_community, _creator, "up");
    }

    // Downvote an art product
    function downvoteArtProduct(address _community, address _creator) external {
        processVote(_community, _creator, "down");
    }

    //get art submissions community wise
    function getArtSubmissionsProcessed(address _community) public view returns (ArtSubmission[] memory) {
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        ArtSubmission[] memory processedArtSubmissions = new ArtSubmission[](artSubmissions.length);

        for (uint i = 0; i < artSubmissions.length; i++) {
            if (artSubmissions[i].community == _community && artSubmissions[i].isProcessed && artSubmissions[i].isApproved) {
                processedArtSubmissions[i] = artSubmissions[i];
                if (artSubmissions[i].creator == msg.sender) {
                    processedArtSubmissions[processedArtSubmissions.length - 1].isOwner = true;
                }
            }
        }
        return processedArtSubmissions;
    }

    //get art submissions not processed yet
    function getArtSubmissionsPending(address _community) public view returns (ArtSubmission[] memory) {
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        ArtSubmission[] memory notProcessedArtSubmissions = new ArtSubmission[](artSubmissions.length);

        for (uint i = 0; i < artSubmissions.length; i++) {
            if (artSubmissions[i].community == _community && !artSubmissions[i].isProcessed) {
                notProcessedArtSubmissions[i] = artSubmissions[i];
                if (artSubmissions[i].creator == msg.sender) {
                    notProcessedArtSubmissions[notProcessedArtSubmissions.length - 1].isOwner = true;
                }
            }
        }
        return notProcessedArtSubmissions;
    }

    
}