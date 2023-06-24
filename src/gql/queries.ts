export const getNFTs = `
query GetNFTsByWalletAndContracts($owner: Identity!) {
  TokenBalances(
    input: {
      filter: {
        owner: {_eq: $owner},
        tokenAddress: {_in: ["0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6", "0x3Fe1a4c1481c8351E91B64D5c398b159dE07cbc5", "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", "0x57a204aa1042f6e66dd7730813f4024114d74f37"]},
        tokenType: {_in: [ERC1155, ERC721]}
      },
      blockchain: ethereum,
    }
  ) {
    TokenBalance {
      tokenNfts {
        address
        tokenId
        metaData {
          name
        }
        contentValue {
          image {
            small
          }
        }
      }
    }
  }
}
`;
