// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SimpleNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => uint256) public listings;

    event Minted(address indexed to, uint256 tokenId);
    event ItemListed(uint256 indexed tokenId, uint256 price);
    event ItemSold(uint256 indexed tokenId, uint256 price, address indexed buyer);

    constructor() ERC721("SimpleNFT", "SNFT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        emit Minted(to, tokenId);
    }

    function listItem(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "You don't own this NFT");
        require(price > 0, "Price must be positive");
        listings[tokenId] = price;
        emit ItemListed(tokenId, price);
    }

    function buyItem(uint256 tokenId) public payable {
        uint256 price = listings[tokenId];
        require(price > 0, "This NFT is not for sale");
        require(msg.value == price, "Incorrect payment");

        address seller = ownerOf(tokenId);
        _transfer(seller, msg.sender, tokenId);
        delete listings[tokenId];
        payable(seller).transfer(msg.value);
        emit ItemSold(tokenId, price, msg.sender);
    }
}