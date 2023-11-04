// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ABXToken is ERC20 {
    uint public ABX_Price = 1000 gwei;

    struct Community {
        string title;
        string description;
        address creator;
        address nativeToken;
        uint exchangeRate;
        uint stakeAmount;
        uint membershipRequirement;
        uint votingDuration;
    }

    Community[] public communities;
    uint public communityCreationCost = 5;

    event TokensPurchased(address indexed buyer, uint256 etherSent, uint256 tokensReceived);


    constructor() ERC20("ABX Token", "ABX") {
        _mint(address(this), 10000 * 10 ** uint256(decimals()));
    }

    function getCommunities() external view returns(Community[] memory) {
        return communities;
    }

    function buyABX() external payable {
        uint etherSent = msg.value;
        require(etherSent > 0, "Ether amount sent must be greater than 0");

        uint tokensToPurchase = etherSent / ABX_Price;

        require(tokensToPurchase > 0, "Not enough Ether sent to purchase any tokens");
        require(balanceOf(address(this)) >= tokensToPurchase, "Insufficient tokens available for purchase");

        _transfer(address(this), msg.sender, tokensToPurchase);
        emit TokensPurchased(msg.sender, etherSent, tokensToPurchase);
    }

    // Create a new community by spending ABX Tokens
    function createCommunity(string memory _title, string memory _description, uint _exchangeRate, uint _stakeAmount, uint _requirement) external {
        require(balanceOf(msg.sender) >= communityCreationCost, "Insufficient ABX Tokens to create a community");
        _burn(msg.sender, communityCreationCost); // Burn the tokens to create the community

        address newNativeToken = address(new CommunityNativeToken(_title));
        communities.push(Community(_title, _description, msg.sender, newNativeToken, _exchangeRate, _stakeAmount, _requirement,  60));
    }

    // Purchase community native tokens using ABX Tokens
    function purchaseNativeTokens(address _community, uint256 _nativeTokensToReceive) external {
        require(_nativeTokensToReceive > 0, "Must purchase a positive number of native tokens");
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        uint ABX_Amount = _nativeTokensToReceive / community.exchangeRate;
        require(balanceOf(msg.sender) >= ABX_Amount, "Insufficient ABX Tokens in your account");
        _burn(msg.sender, ABX_Amount);
        CommunityNativeToken(community.nativeToken).mint(msg.sender, _nativeTokensToReceive);
    }

    //get balance of community token
    function getBalanceNativeToken(address _community, address _account) public view returns (uint) {
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        CommunityNativeToken cnt =  CommunityNativeToken(community.nativeToken);
        return cnt.getBalance(_account);
    }

    //transfer community token
    function transferNativeToken(address _community, address _from, address _to, uint256 _amount) public {
        Community storage community = findCommunity(_community);
        require(community.nativeToken != address(0), "Community does not exist");
        CommunityNativeToken cnt =  CommunityNativeToken(community.nativeToken);
        cnt.transferFromTo(_from, _to, _amount);
    }

    function findCommunity(address _community) internal view returns (Community storage) {
        for (uint i = 0; i < communities.length; i++) {
            if (communities[i].nativeToken == _community) {
                return communities[i];
            }
        }
        revert("Community not found");
    }
}

contract CommunityNativeToken is ERC20 {
    constructor(string memory _title) ERC20(_title, _title) {
        _mint(address(this), 10 * 10 ** uint256(decimals())); // Total supply of 1,000,000 native tokens
    }

    function mint(address _recipient, uint256 _amount) external {
        _mint(_recipient, _amount);
    }

    function burn(address _account, uint256 _amount) external {
        _burn(_account, _amount);
    }

    function getBalance(address _account) external view returns (uint) {
        return balanceOf(_account);
    }

    function transferFromTo(address _from, address _to, uint256 _amount) external {
        _transfer(_from, _to, _amount);
    }
}