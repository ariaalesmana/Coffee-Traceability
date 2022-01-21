const AddProduct = artifacts.require("AddProduct.sol");

module.exports = function(deployer) {
 deployer.deploy(AddProduct);
};