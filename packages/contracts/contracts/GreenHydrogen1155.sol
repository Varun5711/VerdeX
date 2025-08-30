// contracts/GreenHydrogen1155.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {ERC1155Pausable} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import {ERC1155Burnable} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/// @title Green Hydrogen Credits (ERC-1155)
/// @notice One tokenId per issued batch. Retirements burn supply and emit auditable events.
contract GreenHydrogen1155 is
  ERC1155,
  ERC1155Supply,
  ERC1155Pausable,
  ERC1155Burnable,
  AccessControl
{
  // -------- Roles --------
  bytes32 public constant AUTHORITY_ROLE = keccak256("AUTHORITY_ROLE");
  bytes32 public constant PAUSER_ROLE    = keccak256("PAUSER_ROLE");

  // -------- Errors --------
  error AlreadyIssued(bytes32 batchHash);
  error InvalidAmount();
  error ZeroAddress();

  // -------- Events --------
  event BatchIssued(
    bytes32 indexed batchHash,
    uint256 indexed tokenId,
    address indexed to,
    uint256 amount,
    string  batchId,
    string  docHash
  );

  event Retired(
    address indexed owner,
    uint256 indexed tokenId,
    uint256 amount,
    string  claimRef
  );

  event BaseURIUpdated(string newBaseURI);

  // -------- Batch metadata snapshot --------
  struct BatchMeta {
    bytes32 batchHash;   // keccak256(batchId)
    string  batchId;     // human ID used off-chain
    string  docHash;     // hash of doc bundle/certificate (hex string)
    address issuedTo;    // initial recipient
    uint64  issuedAt;    // block timestamp at issuance
  }

  // tokenId => metadata
  mapping(uint256 => BatchMeta) public batchMeta;

  // batchHash => issued?
  mapping(bytes32 => bool) public issued;

  constructor(string memory baseUri, address authority) ERC1155(baseUri) {
    if (authority == address(0)) revert ZeroAddress();
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(AUTHORITY_ROLE, authority);
    _grantRole(PAUSER_ROLE, msg.sender);
  }

  // -------- Views --------

  /// @notice Deterministic token id for a batch id string.
  function tokenIdFor(string calldata batchId) public pure returns (uint256) {
    return uint256(keccak256(bytes(batchId)));
  }

  /// @notice Convenience: has this batchId been issued already?
  function isIssued(string calldata batchId) external view returns (bool) {
    return issued[keccak256(bytes(batchId))];
  }

  // -------- Admin controls --------

  function pause() external onlyRole(PAUSER_ROLE) {
    _pause();
  }

  function unpause() external onlyRole(PAUSER_ROLE) {
    _unpause();
  }

  /// @notice Update base URI (e.g., ipfs://CID/{id}.json)
  function setBaseURI(string calldata newBaseUri) external onlyRole(DEFAULT_ADMIN_ROLE) {
    _setURI(newBaseUri);
    emit BaseURIUpdated(newBaseUri);
  }

  /// @notice Grant or change the authority address (role that can issue).
  function setAuthority(address account, bool enabled) external onlyRole(DEFAULT_ADMIN_ROLE) {
    if (enabled) _grantRole(AUTHORITY_ROLE, account);
    else _revokeRole(AUTHORITY_ROLE, account);
  }

  // -------- Lifecycle: Issue → Transfer → Retire --------

  /// @notice Issue credits for a batch to `to`. One-time per batchId.
  /// @dev `amount` is raw integer units (use 1e18 scale if you want decimals).
  function issue(
    string calldata batchId,
    address to,
    uint256 amount,
    string calldata docHash
  ) external onlyRole(AUTHORITY_ROLE) whenNotPaused {
    if (to == address(0)) revert ZeroAddress();
    if (amount == 0) revert InvalidAmount();

    bytes32 bh = keccak256(bytes(batchId));
    if (issued[bh]) revert AlreadyIssued(bh);

    issued[bh] = true;

    uint256 tokenId = uint256(bh);
    _mint(to, tokenId, amount, "");

    batchMeta[tokenId] = BatchMeta({
      batchHash: bh,
      batchId: batchId,
      docHash: docHash,
      issuedTo: to,
      issuedAt: uint64(block.timestamp)
    });

    emit BatchIssued(bh, tokenId, to, amount, batchId, docHash);
  }

  /// @notice Retire (burn) credits you currently hold. Emits `Retired`.
  function retire(
    uint256 tokenId,
    uint256 amount,
    string calldata claimRef
  ) external whenNotPaused {
    if (amount == 0) revert InvalidAmount();
    _burn(msg.sender, tokenId, amount);
    emit Retired(msg.sender, tokenId, amount, claimRef);
  }

  // -------- Required overrides (OZ v5 multi-inheritance) --------

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  /// @dev ERC1155Pausable & ERC1155Supply both hook into _update in OZ v5
  function _update(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory values
  ) internal override(ERC1155, ERC1155Supply, ERC1155Pausable) {
    super._update(from, to, ids, values);
  }
}