export const AddCNF = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "arr",
      "outputs": [
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "cnfid",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "role_pembuat",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "nomor_dokumen",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tanggal_dokumen",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "created",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "init",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAllData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "cnfid",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "role_pembuat",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "nomor_dokumen",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tanggal_dokumen",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddCNF.CNF[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "cnf_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "role_pembuat",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "nomor_dokumen",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tanggal_dokumen",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "created",
          "type": "string"
        }
      ],
      "name": "addCNF",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "cnf_id",
          "type": "uint256"
        }
      ],
      "name": "listCNFByCNFId",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "cnfid",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "role_pembuat",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "nomor_dokumen",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tanggal_dokumen",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddCNF.CNF[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "cnf_id",
          "type": "uint256"
        }
      ],
      "name": "lastCNFByCNFId",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "cnfid",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "role_pembuat",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "nomor_dokumen",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tanggal_dokumen",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddCNF.CNF",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "role_pembuat",
          "type": "string"
        }
      ],
      "name": "listCNFByRolePembuat",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "cnfid",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "role_pembuat",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "nomor_dokumen",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tanggal_dokumen",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "created",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "init",
              "type": "bool"
            }
          ],
          "internalType": "struct AddCNF.CNF[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]