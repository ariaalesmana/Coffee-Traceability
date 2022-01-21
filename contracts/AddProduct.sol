pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

contract AddProduct {

    struct Product {
        address kopiAddress;
        string dataHash;
        string created_at;
    }

    Product[] public productArr;

    mapping (string => Product) private productsMapping;
    mapping (address => Product[]) private productsMappingByAddress;
    mapping (string => Product[]) private productsMappingByDate;
    mapping(address => mapping(string => bool)) private wallet;

    function tambahProduct(string memory dataHash, string memory created_at) public {
        Product memory prod = Product(msg.sender, dataHash, created_at);
        productArr.push(prod);
        productsMapping[prod.dataHash] = prod;
        productsMappingByAddress[msg.sender].push(prod);
        productsMappingByDate[created_at].push(prod);
        wallet[msg.sender][dataHash] = true;
    }

    function listProduct() public view returns (Product[] memory) {
        return productArr;
    }

    function detailproductByHash(string memory datahash) public view returns (Product memory)  {
        return (productsMapping[datahash]);
    }

    function lisProductByAddress() public view returns (Product[] memory) {
        return productsMappingByAddress[msg.sender];
    }

    function lisProductByDate(string memory created_at) public view returns (Product[] memory) {
        return productsMappingByDate[created_at];
    }
    
    function verify(string memory dataHash) public view returns (string memory) {
        if(wallet[msg.sender][dataHash]) {
            return "Verified";
        }
        return "Not Verified";
    }
}
// // SPDX-License-Identifier: MIT
// pragma solidity >=0.5.8 <=0.8.4;

// contract AddProduct {

//     uint public blocknumber;
//     mapping (uint => Products) products;
//     mapping (uint => Products) batchs;
//     struct Products {
//         uint product_id;
//         uint batch_id;
//         uint biji_id;
//         uint jenis_id;
//         uint proses_id;
//         string asal;
//         string volume;
//         string tgl_panen;
//         string tgl_proses;
//         uint blocknumber;
//     }
//     function addProducts(uint product_id, uint batch_id, uint biji_id, uint jenis_id, uint proses_id, string memory asal, string memory volume, string memory tgl_panen, string memory tgl_proses) public {   
//         blocknumber = block.number;
//         products[product_id] = Products(product_id, batch_id, biji_id, jenis_id, proses_id, asal, volume, tgl_panen, tgl_proses, blocknumber);
//         batchs[batch_id] = Products(product_id, batch_id, biji_id, jenis_id, proses_id, asal, volume, tgl_panen, tgl_proses, blocknumber);
//     }
//     function getProductsByProductId(uint product_id) view public returns (uint, uint, uint, uint, uint, string memory, string memory, string memory, string memory, uint) {
//         require(products[product_id].init);
//         Products memory productStruct;
//         productStruct = products[product_id];
//         return(productStruct.product_id, productStruct.batch_id, productStruct.biji_id, productStruct.jenis_id, productStruct.proses_id, productStruct.asal, productStruct.volume, productStruct.tgl_panen, productStruct.tgl_proses, productStruct.blocknumber);
//     }
//     function getProductsByBatchId(uint batch_id) view public returns (uint, uint, uint, uint, uint, string memory, string memory, string memory, string memory, uint) {
//         require(batchs[batch_id].init);
//         Products memory batchStruct;
//         batchStruct = batchs[batch_id];
//         return(batchStruct.product_id, batchStruct.batch_id, batchStruct.biji_id, batchStruct.jenis_id, batchStruct.proses_id, batchStruct.asal, batchStruct.volume, batchStruct.tgl_panen, batchStruct.tgl_proses, batchStruct.blocknumber);
//     }
// }