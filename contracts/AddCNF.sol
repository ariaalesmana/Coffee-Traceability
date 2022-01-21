pragma solidity ^0.6.4;
pragma experimental ABIEncoderV2;

contract AddCNF {

    struct CNF {
        address walletAddress;
        uint cnfid;
        string role_pembuat;
        string nomor_dokumen;
        string tanggal_dokumen;
        string created;
        bool init;
    }
    
    CNF[] public arr;
    mapping (uint => CNF) private CNFMapping;
    mapping (uint => CNF[]) private CNFMappingById;
    mapping (string => CNF[]) private CNFMappingByRolePembuat;
    
    function getAllData() public view returns (CNF[] memory) {
        return arr;
    }
    function addCNF(uint cnf_id, string memory role_pembuat, string memory nomor_dokumen, string memory tanggal_dokumen, string memory created) public {
        CNF memory _CNF = CNF(msg.sender, cnf_id, role_pembuat, nomor_dokumen, tanggal_dokumen, created, true);
        CNFMapping[_CNF.cnfid] = _CNF;
        CNFMappingById[cnf_id].push(_CNF);
        CNFMappingByRolePembuat[role_pembuat].push(_CNF);
        arr.push(_CNF);
    }
    function listCNFByCNFId(uint cnf_id) public view returns (CNF[] memory) {
        return CNFMappingById[cnf_id];
    }
    function lastCNFByCNFId(uint cnf_id) public view returns (CNF memory)  {
        return (CNFMapping[cnf_id]);
    }
    function listCNFByRolePembuat(string memory role_pembuat) public view returns (CNF[] memory) {
        return CNFMappingByRolePembuat[role_pembuat];
    }
}