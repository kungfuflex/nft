// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";


contract NFTPinner is OwnableUpgradeable {
  mapping (uint256 => bytes) public ipnsPublicKeyForNFT;
  address public nft;
  function initialize(address _nft) public initializer {
    __Ownable_init_unchained();
    nft = _nft;
  }
  function setPublicKey(uint256 tokenId, bytes memory publicKey) public {
    require(IERC721(nft).ownerOf(tokenId) == msg.sender, "must be called by NFT owner");
    ipnsPublicKeyForNFT[tokenId] = publicKey;
  }
}
