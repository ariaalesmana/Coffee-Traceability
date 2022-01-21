import axios from "axios";
import authHeader from "./auth-header";
import authHeaderImage from "./auth-header-image";

require("dotenv").config();

const API_URL = process.env.REACT_APP_CATALOG_URL + "api/v1/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  // PO
  getPO() {
    return axios.get(API_URL + "get-all-po", {
      headers: authHeader(),
    });
  }
  addPO(raw) {
    return axios.post(API_URL + "add-po", raw, {
      headers: authHeader(),
    });
  }
  deletePO(id) {
    return axios.get(API_URL + "delete-po/" + id, {
      headers: authHeader(),
    });
  }
  detailPO(id) {
    return axios.get(API_URL + "detail-po/" + id, {
      headers: authHeader(),
    });
  }
  editPO(id, raw) {
    return axios.post(API_URL + "edit-po/" + id, raw, {
      headers: authHeader(),
    });
  }

  // SKU
  getSKU() {
    return axios.get(API_URL + "get-all-sku", {
      headers: authHeader(),
    });
  }
  addSKU(raw) {
    return axios.post(API_URL + "add-sku", JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  deleteSKU(id) {
    return axios.get(API_URL + "delete-sku/" + id, {
      headers: authHeader(),
    });
  }
  detailSKU(id) {
    return axios.get(API_URL + "detail-sku/" + id, {
      headers: authHeader(),
    });
  }
  editSKU(id, raw) {
    return axios.post(API_URL + "edit-sku/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  // new batch green bean
  CheckBatchGB(batch) {
    return axios.get(API_URL + "check-batch/" + batch, {
      headers: authHeader(),
    });
  }
  getBatchGreenBean() {
    return axios.get(API_URL + "get-all-batchgb", {
      headers: authHeader(),
    });
  }
  addBatchGreenBean(raw) {
    return axios.post(API_URL + "add-batchgb", raw, {
      headers: authHeader(),
    });
  }
  deleteBatchGreenBean(id) {
    return axios.get(API_URL + "delete-batchgb/" + id, {
      headers: authHeader(),
    });
  }
  detailBatchGreenBean(id) {
    return axios.get(API_URL + "detail-batchgb/" + id, {
      headers: authHeader(),
    });
  }
  editBatchGreenBean(id, raw) {
    return axios.post(API_URL + "edit-batchgb/" + id, raw, {
      headers: authHeader(),
    });
  }
  pushQRCodeImageBatch(batchId, raw) {
    return axios.post(API_URL + "update-qr-batch/" + batchId, raw, {
      headers: authHeaderImage(),
    });
  }
  getDetailBatchGuestQR(code, id) {
    return axios.get(API_URL + "detail-batchgb/" + code + "/" + id, {
      headers: authHeader(),
    });
  }


  // Biji
  addBiji(raw) {
    return axios.post(API_URL + "add-biji", JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  deleteBiji(id) {
    return axios.get(API_URL + "delete-biji/" + id, {
      headers: authHeader(),
    });
  }
  detailBiji(id) {
    return axios.get(API_URL + "detail-biji/" + id, {
      headers: authHeader(),
    });
  }
  editBiji(id, raw) {
    return axios.post(API_URL + "edit-biji/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  // Varietas
  addJenis(raw) {
    return axios.post(API_URL + "add-jenis", JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  getListJenis() {
    return axios.get(API_URL + "list-jenis", { headers: authHeader() });
  }
  getDetailJenis(id) {
    return axios.get(API_URL + "detail-jenis/" + id, { headers: authHeader() });
  }
  deleteJenis(id) {
    return axios.get(API_URL + "delete-jenis/" + id, { headers: authHeader() });
  }
  editJenis(id, raw) {
    return axios.post(API_URL + "edit-jenis/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  // Proses
  addProses(raw) {
    return axios.post(API_URL + "add-proses", JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  deleteProses(id) {
    return axios.get(API_URL + "delete-proses/" + id, {
      headers: authHeader(),
    });
  }
  detailProses(id) {
    return axios.get(API_URL + "detail-proses/" + id, {
      headers: authHeader(),
    });
  }
  editProses(id, raw) {
    return axios.post(API_URL + "edit-proses/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  // Unit
  addUnit(raw) {
    return axios.post(API_URL + "add-unit", JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  deleteUnit(id) {
    return axios.get(API_URL + "delete-unit/" + id, {
      headers: authHeader(),
    });
  }
  detailUnit(id) {
    return axios.get(API_URL + "detail-unit/" + id, {
      headers: authHeader(),
    });
  }
  editUnit(id, raw) {
    return axios.post(API_URL + "edit-unit/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  getUnitDetail() {
    return axios.get(API_URL + "get-unit-detail", { headers: authHeader() });
  }

  getUnitDetailGuest(code) {
    return axios.get(API_URL + "get-unit-detail/" + code, {
      headers: authHeader(),
    });
  }

  // Supplier
  addSupplier(raw) {
    return axios.post(API_URL + "add-supplier", raw, {
      headers: authHeaderImage(),
    });
  }
  getListSupplier() {
    return axios.get(API_URL + "list-supplier", { headers: authHeader() });
  }
  getDetailSupplier(id) {
    return axios.get(API_URL + "detail-supplier/" + id, {
      headers: authHeader(),
    });
  }
  editSupplier(id, raw) {
    return axios.post(API_URL + "edit-supplier/" + id, raw, {
      headers: authHeaderImage(),
    });
  }
  deleteSupplier(id) {
    return axios.get(API_URL + "delete-supplier/" + id, {
      headers: authHeader(),
    });
  }

  // Batch
  addBatch(raw) {
    // return 1;
    return axios.post(API_URL + "add-batch", raw, {
      headers: authHeaderImage(),
    });
  }
  getAddDetail() {
    return axios.get(API_URL + "add-detail", { headers: authHeader() });
  }
  getAddDetailGuest(code) {
    return axios.get(API_URL + "add-detail/" + code, { headers: authHeader() });
  }
  getListBatch() {
    return axios.get(API_URL + "list-batch", { headers: authHeader() });
  }
  getListBatchAsc() {
    return axios.get(API_URL + "list-batch-asc", { headers: authHeader() });
  }
  getBatchGuest(code) {
    return axios.get(API_URL + "list-batch/" + code, {
      headers: authHeader(),
    });
  }
  getDetailBatch(id) {
    return axios.get(API_URL + "detail-batch/" + id, { headers: authHeader() });
  }
  getDetailBatchGuest(code, id) {
    return axios.get(API_URL + "detail-batch/" + code + "/" + id, {
      headers: authHeader(),
    });
  }
  deleteBatch(id) {
    return axios.get(API_URL + "delete-batch/" + id, { headers: authHeader() });
  }
  editBatch(id, raw) {
    return axios.post(API_URL + "edit-batch/" + id, raw, {
      headers: authHeader(),
    });
  }

  // Product
  addProduct(raw) {
    // return 1;
    return axios.post(API_URL + "add-product", raw, {
      headers: authHeaderImage(),
    });
  }
  getListProduct() {
    return axios.get(API_URL + "list-product", { headers: authHeader() });
  }
  getAddDetailProduct() {
    return axios.get(API_URL + "add-detail-product", { headers: authHeader() });
  }
  getAddDetailProductGuest(code) {
    return axios.get(API_URL + "add-detail-product/" + code, {
      headers: authHeader(),
    });
  }
  getDetailProduct(id) {
    return axios.get(API_URL + "detail-product/" + id, {
      headers: authHeader(),
    });
  }
  getDetailProduk(id) {
    return axios.get(API_URL + "detail-produk/" + id, {
      headers: authHeader(),
    });
  }
  getProdukGuest(code, id) {
    return axios.get(API_URL + "detail-product/" + code + "/" + id, {
      headers: authHeader(),
    });
  }
  deleteProduct(id) {
    return axios.get(API_URL + "delete-product/" + id, {
      headers: authHeader(),
    });
  }
  pushQRCodeImage(id, raw) {
    return axios.post(API_URL + "update-qr-product/" + id, raw, {
      headers: authHeaderImage(),
    });
  }
  getSubCategory(id) {
    return axios.get(API_URL + "get-sub-category/" + id, {
      headers: authHeader(),
    });
  }

  // Blockchain Explorer
  getListTransactionHash() {
    return axios.get(API_URL + "list-transaction-hash", {
      headers: authHeader(),
    });
  }
  addTransactionHash(raw) {
    return axios.post(API_URL + "add-transaction-hash", raw, {
      headers: authHeader(),
    });
  }

  // CNF
  getListCNF() {
    return axios.get(API_URL + "list-cnf", {
      headers: authHeader(),
    });
  }

  addCNF(raw) {
    return axios.post(API_URL + "cnf-add", raw, {
      headers: authHeader(),
    });
  }

  deleteCNF(id) {
    return axios.get(API_URL + "cnf-delete/" + id, {
      headers: authHeader(),
    });
  }
  // end CNF


  // dari aplikasi roaster
  getDataLogApi() {
    return axios.get(API_URL + "get-data-log-api", {
      headers: authHeader(),
    });
  }

  getAddDetailMasterData(code) {
    return axios.get(API_URL + "add-detail-master-data/" + code, {
      headers: authHeader(),
    });
  }

  // Biji
  addBijiRoaster(raw) {
    return axios.post(API_URL + "add-roaster-biji", JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  deleteBijiRoaster(id) {
    return axios.get(API_URL + "delete-roaster-biji/" + id, {
      headers: authHeader(),
    });
  }
  detailBijiRoaster(id) {
    return axios.get(API_URL + "detail-roaster-biji/" + id, {
      headers: authHeader(),
    });
  }
  editBijiRoaster(id, raw) {
    return axios.post(API_URL + "edit-roaster-biji/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  // Varietas
  addJenisRoaster(raw) {
    return axios.post(API_URL + "add-roaster-jenis", JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  getDetailJenisRoaster(id) {
    return axios.get(API_URL + "detail-roaster-jenis/" + id, {
      headers: authHeader(),
    });
  }
  deleteJenisRoaster(id) {
    return axios.get(API_URL + "delete-roaster-jenis/" + id, {
      headers: authHeader(),
    });
  }
  editJenisRoaster(id, raw) {
    return axios.post(API_URL + "edit-roaster-jenis/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  // Proses
  addProsesRoaster(raw) {
    return axios.post(API_URL + "add-roaster-proses", JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  deleteProsesRoasater(id) {
    return axios.get(API_URL + "delete-roaster-proses/" + id, {
      headers: authHeader(),
    });
  }
  detailProsesRoaster(id) {
    return axios.get(API_URL + "detail-roaster-proses/" + id, {
      headers: authHeader(),
    });
  }
  editProsesRoaster(id, raw) {
    return axios.post(API_URL + "edit-roaster-proses/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  // Unit
  addUnitRoaster(raw) {
    return axios.post(API_URL + "add-roaster-unit", JSON.parse(raw), {
      headers: authHeader(),
    });
  }
  deleteUnitRoaster(id) {
    return axios.get(API_URL + "delete-roaster-unit/" + id, {
      headers: authHeader(),
    });
  }
  detailUnitRoaster(id) {
    return axios.get(API_URL + "detail-roaster-unit/" + id, {
      headers: authHeader(),
    });
  }
  editUnitRoaster(id, raw) {
    return axios.post(API_URL + "edit-roaster-unit/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  // Supplier
  addSupplierRoaster(raw) {
    return axios.post(API_URL + "add-roaster-supplier", raw, {
      headers: authHeaderImage(),
    });
  }
  // getListSupplierRoaster() {
  //   return axios.get(API_URL + "list-roaster-supplier", {
  //     headers: authHeader(),
  //   });
  // }
  getDetailSupplierRoaster(id) {
    return axios.get(API_URL + "detail-roaster-supplier/" + id, {
      headers: authHeader(),
    });
  }
  editSupplierRoaster(id, raw) {
    return axios.post(API_URL + "edit-roaster-supplier/" + id, raw, {
      headers: authHeaderImage(),
    });
  }
  deleteSupplierRoaster(id) {
    return axios.get(API_URL + "delete-roaster-supplier/" + id, {
      headers: authHeader(),
    });
  }

  // Batch
  getAddDetailRoaster() {
    return axios.get(API_URL + "roaster-add-detail", { headers: authHeader() });
  }
  getListBatchGuest(code) {
    return axios.get(API_URL + "list-batch/" + code, { headers: authHeader() });
  }
  getDetailBatchByBatchIDGuest(code, id) {
    return axios.get(API_URL + "detail-batch-by-batchID/" + code + "/" + id, {
      headers: authHeader(),
    });
  }

  getDetailBatchByBatchID(id) {
    return axios.get(API_URL + "detail-batch-by-batchID/" + id, {
      headers: authHeader(),
    });
  }

  // Product
  addProductRoaster(raw) {
    // return 1;
    return axios.post(API_URL + "roaster-add-product", raw, {
      headers: authHeaderImage(),
    });
  }
  editProduct(id, raw) {
    return axios.post(API_URL + "roaster-edit-product/" + id, raw, {
      headers: authHeaderImage(),
    });
  }
  getListProductRoaster() {
    return axios.get(API_URL + "roaster-list-product", {
      headers: authHeader(),
    });
  }
  getDetailProductRoaster(id) {
    return axios.get(API_URL + "roaster-detail-product/" + id, {
      headers: authHeader(),
    });
  }
  getDetailGreenBeansGuest(code, id) {
    return axios.get(API_URL + "detail-product/" + code + "/" + id, {
      headers: authHeader(),
    });
  }
  getDetailProductGuest(code, id) {
    return axios.get(API_URL + "roaster-detail-product/" + code + "/" + id, {
      headers: authHeader(),
    });
  }
  deleteProductRoaster(id) {
    return axios.get(API_URL + "roaster-delete-product/" + id, {
      headers: authHeader(),
    });
  }
  //App Roastery

  //Master Data
  getListMasterData() {
    return axios.get(API_URL + "list-master-data", { headers: authHeader() });
  }

  addRoastingProfile(raw) {
    return axios.post(API_URL + "add-roasting-profile", JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  deleteRoastingProfile(id) {
    return axios.get(API_URL + "delete-roasting-profile/" + id, {
      headers: authHeader(),
    });
  }

  getDetailRoastingProfile(id) {
    return axios.get(API_URL + "detail-roasting-profile/" + id, {
      headers: authHeader(),
    });
  }

  editRoastingProfile(id, raw) {
    return axios.post(
      API_URL + "edit-roasting-profile/" + id,
      JSON.parse(raw),
      {
        headers: authHeader(),
      }
    );
  }

  pushQRCodeImageCupping(id, raw) {
    return axios.post(API_URL + "update-qr-cupping/" + id, raw, {
      headers: authHeaderImage(),
    });
  }
  addCupping(raw) {
    return axios.post(API_URL + "add-cupping", raw, {
      headers: authHeaderImage(),
    });
  }

  deleteCupping(id) {
    return axios.get(API_URL + "delete-cupping/" + id, {
      headers: authHeader(),
    });
  }

  getListCupping() {
    return axios.get(API_URL + "list-cupping", { headers: authHeader() });
  }

  getDetailCupping(id) {
    return axios.get(API_URL + "detail-cupping/" + id, {
      headers: authHeader(),
    });
  }

  getDetailCuppingGuest(code, id) {
    return axios.get(API_URL + "detail-cupping/" + code + "/" + id, {
      headers: authHeader(),
    });
  }

  editCupping(id, raw) {
    return axios.post(API_URL + "edit-cupping/" + id, raw, {
      headers: authHeaderImage(),
    });
  }

  addWholeBean(raw) {
    return axios.post(API_URL + "add-whole-bean", JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  deleteWholeBean(id) {
    return axios.get(API_URL + "delete-whole-bean/" + id, {
      headers: authHeader(),
    });
  }

  getDetailWholeBean(id) {
    return axios.get(API_URL + "detail-whole-bean/" + id, {
      headers: authHeader(),
    });
  }

  editWholeBean(id, raw) {
    return axios.post(API_URL + "edit-whole-bean/" + id, JSON.parse(raw), {
      headers: authHeader(),
    });
  }

  //Roasting
  addRoastingProduct(raw) {
    return axios.post(API_URL + "add-roasting", raw, {
      headers: authHeader(),
    });
  }

  deleteRoastingProduct(id) {
    return axios.get(API_URL + "delete-roasting/" + id, {
      headers: authHeader(),
    });
  }

  getListRoastingProducts() {
    return axios.get(API_URL + "list-roasting", { headers: authHeader() });
  }

  getListRoastingProductsAsc() {
    return axios.get(API_URL + "list-roasting-asc", { headers: authHeader() });
  }

  getDetailRoastingProduct(id) {
    return axios.get(API_URL + "detail-roasting/" + id, {
      headers: authHeader(),
    });
  }

  getDetailRoastingProductGuest(code, id) {
    return axios.get(API_URL + "detail-roasting/" + code + "/" + id, {
      headers: authHeader(),
    });
  }

  editRoastingProduct(id, raw) {
    return axios.post(API_URL + "edit-roasting/" + id, raw, {
      headers: authHeader(),
    });
  }

  pushQRCodeImageRoasting(id, raw) {
    return axios.post(API_URL + "update-qr-roasting/" + id, raw, {
      headers: authHeaderImage(),
    });
  }
  // end aplikasi roaster

  apiPostToMarketpalceKK(raw) {
    return axios.post(API_URL + "add-post-api-to-kk", raw, {
      headers: authHeader(),
    });
  }

}

export default new UserService();
