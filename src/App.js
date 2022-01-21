import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/login.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import "./scss/style.scss";
import { Fragment } from "react";

import "./components/Grosir/Grosir.css";
import "./components/Grosir/GrosirMedia.css";

//Header
const Header = lazy(() => import("./components/Header/Header"));

//Detail Produk
const GetId = lazy(() => import("./components/Grosir/HalamanUtama/GetID"));

//Biji
const ListBiji = lazy(() => import("./components/Grosir/MasterData/ListBiji"));
const DaftarBiji = lazy(() =>
  import("./components/Grosir/MasterData/Biji/DaftarBiji")
);
const EditBiji = lazy(() =>
  import("./components/Grosir/MasterData/Biji/EditBiji")
);

//SKU
const DaftarSKU = lazy(() =>
  import("./components/Grosir/MasterData/SKU/DaftarSKU")
);
const EditSKU = lazy(() =>
  import("./components/Grosir/MasterData/SKU/EditSKU")
);

// PO
const DaftarPO = lazy(() =>
  import("./components/Grosir/MasterData/PO/DaftarPO")
);
const EditPO = lazy(() =>
  import("./components/Grosir/MasterData/PO/EditPO")
);

//Varietas
const DaftarVarietas = lazy(() =>
  import("./components/Grosir/MasterData/Varietas/DaftarVarietas")
);
const EditVarietas = lazy(() =>
  import("./components/Grosir/MasterData/Varietas/EditVarietas")
);

//Proses
const DaftarProses = lazy(() =>
  import("./components/Grosir/MasterData/Proses/DaftarProses")
);
const EditProses = lazy(() =>
  import("./components/Grosir/MasterData/Proses/EditProses")
);

//Unit
const DaftarUnit = lazy(() =>
  import("./components/Grosir/MasterData/Unit/DaftarUnit")
);
const EditUnit = lazy(() =>
  import("./components/Grosir/MasterData/Unit/EditUnit")
);

//Supplier
const ListSupplier = lazy(() =>
  import("./components/Grosir/Supplier/ListSupplier")
);
const DaftarSupplier = lazy(() =>
  import("./components/Grosir/Supplier/DaftarSupplier")
);
const EditSupplier = lazy(() =>
  import("./components/Grosir/Supplier/EditSupplier")
);
const ShowSupplier = lazy(() =>
  import("./components/Grosir/Supplier/ShowSupplier")
);

//Batch
const ListBatch = lazy(() => import("./components/Grosir/Batch/ListBatch"));
const DaftarBatch = lazy(() => import("./components/Grosir/Batch/DaftarBatch"));
const EditBatch = lazy(() => import("./components/Grosir/Batch/EditBatch"));
const GetBatchID = lazy(() => import("./components/Grosir/GreenBean/GetBatchID"));

//CNF
const ListCNF = lazy(() => import('./components/Grosir/CNF/ListCNF'));
const AddCNF = lazy(() => import('./components/Grosir/CNF/AddCNF'));

//Produk
const ListProduk = lazy(() => import("./components/Grosir/Produk/ListProduk"));
const DaftarProduk = lazy(() =>
  import("./components/Grosir/Produk/DaftarProduk")
);
const ShowProduk = lazy(() => import("./components/Grosir/Produk/ShowProduk"));
// const EditProduk = lazy(() => import("./components/Grosir/Produk/EditProduk"));

// green bean
const listGreenBean = lazy(() => import("./components/Grosir/GreenBean/ListGreenBean"));
const DaftarGreenBean = lazy(() =>
  import("./components/Grosir/GreenBean/DaftarGreenBean")
);
const ShowGreenBean = lazy(() => import("./components/Grosir/GreenBean/ShowGreenBean"));
const EditGreenBean = lazy(() => import("./components/Grosir/GreenBean/EditGreenBean"));

//Transaction
const ListTransaction = lazy(() =>
  import("./components/Grosir/TransactionExplorer/ListTransaction")
);

// roaster
  //Header
  const HeaderRoaster = lazy(() => import("./components/Roaster/Header/Header"));

  //Detail Roaster
  const GetIdRoaster = lazy(() => import("./components/Roaster/Roaster/MainPage/GetID"));

  const MasterDataLists = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/MasterDataLists")
  );

  const AddRoastingProfile = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/RoastingProfile/AddRoastingProfile")
  );
  const EditRoastingProfile = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/RoastingProfile/EditRoastingProfile")
  );

  const GetCupping = lazy(() => import("./components/Roaster/Roaster/MasterData/Cupping/CuppingScan"));

  const ListCupping = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Cupping/ListCupping")
  );
  const AddCupping = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Cupping/AddCupping")
  );

  const EditCupping = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Cupping/EditCupping")
  );

  const AddUnit = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Unit/AddUnit")
  );
  const EditUnitRoaster = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Unit/EditUnit")
  );

  const AddGroundWhole = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/WholeBeanGround/AddWholeBeanGround")
  );
  const EditWholeBeanGround = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/WholeBeanGround/EditWholeBeanGround")
  );

  const AddBeans = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Beans/AddBeans")
  );
  const EditBeans = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Beans/EditBeans")
  );

  const DaftarVarietasRoaster = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Varietas/DaftarVarietas")
  );
  const EditVarietasRoaster = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Varietas/EditVarietas")
  );

  const DaftarProsesRoaster = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Proses/DaftarProses")
  );
  const EditProsesRoaster = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Proses/EditProses")
  );

  const DaftarSupplierRoaster = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Supplier/DaftarSupplier")
  );
  const EditSupplierRoaster = lazy(() =>
    import("./components/Roaster/Roaster/MasterData/Supplier/EditSupplier")
  );

  const ProductLists = lazy(() =>
    import("./components/Roaster/Roaster/Products/ProductLists")
  );
  const AddProducts = lazy(() =>
    import("./components/Roaster/Roaster/Products/AddProducts")
  );
  const EditProduct = lazy(() =>
    import("./components/Roaster/Roaster/Products/EditProducts")
  );

  const RoastingLists = lazy(() =>
    import("./components/Roaster/Roaster/Roasting/RoastingLists")
  );
  const AddRoasting = lazy(() =>
    import("./components/Roaster/Roaster/Roasting/AddRoasting")
  );
  const EditRoasting = lazy(() =>
    import("./components/Roaster/Roaster/Roasting/EditRoasting")
  );

  //LOG API
  const ListLogAPI = lazy(() => import('./components/Roaster/Roaster/MainPage/ListLogAPI'));
// end roaster


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    console.log('propsnya nih', props);

    this.state = {
      currentUser: undefined,
      role: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        role: user.role,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser } = this.state;
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      // history.push("/login");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user !== null) {
        const exampleJWT = user.token;
        function getPayload(jwt) {
          return atob(jwt.split(".")[1]);
        }
        const payload = getPayload(exampleJWT);
        if (payload.exp < Date.now() / 1000) {
          localStorage.removeItem("user");
          history.push("/");
        }
      }
    }

    return (
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" exact component={Login} />
          {currentUser && (
            <div>
              {/* <Header logoutClick={this.logOut} /> */}
              {(() => {
                if (currentUser.role === "roaster") { // jika login roaster
                  return (
                    <HeaderRoaster logoutClick={this.logOut} />
                  )
                } else {
                  return (
                    <Header logoutClick={this.logOut} />
                  )
                }
              })()}
            </div>
          )}
          <Route path="/detailProduk/:code/:id" exact component={GetId} />

          {currentUser && (
            <Fragment>
              {/* halaman CNF */}
              <Route path="/listCNF" exact component={ListCNF} />
              <Route path="/AddCNF" exact component={AddCNF} />
              
              {/* Halaman PO */}
              <Route path="/listBiji/daftarPO" exact component={DaftarPO} />
              <Route
                path="/listBiji/editPO/:id"
                exact
                component={EditPO}
              />

              {/* Halaman SKU */}
              <Route path="/listBiji/daftarSKU" exact component={DaftarSKU} />
              <Route
                path="/listBiji/editSKU/:id"
                exact
                component={EditSKU}
              />

              {/* Halaman Biji */}
              <Route path="/listBiji" exact component={ListBiji} />
              <Route path="/listBiji/daftarBiji" exact component={DaftarBiji} />
              <Route path="/listBiji/editBiji/:id" exact component={EditBiji} />
              <Route
                path="/listBiji/daftarVarietas"
                exact
                component={DaftarVarietas}
              />
              <Route
                path="/listBiji/editVarietas/:id"
                exact
                component={EditVarietas}
              />
              <Route
                path="/listBiji/daftarProses"
                exact
                component={DaftarProses}
              />
              <Route
                path="/listBiji/editProses/:id"
                exact
                component={EditProses}
              />
              <Route path="/listBiji/daftarUnit" exact component={DaftarUnit} />
              <Route path="/listBiji/editUnit/:id" exact component={EditUnit} />

              {/* Halaman Supplier */}
              <Route path="/listSupplier" exact component={ListSupplier} />
              <Route
                path="/listSupplier/daftar"
                exact
                component={DaftarSupplier}
              />
              <Route
                path="/listSupplier/editSupplier/:id"
                exact
                component={EditSupplier}
              />
              <Route
                path="/listSupplier/showSupplier/:id"
                exact
                component={ShowSupplier}
              />

              {/* Halaman Batch */}
              <Route path="/listBatch" exact component={ListBatch} />
              <Route path="/listBatch/daftar" exact component={DaftarBatch} />
              <Route
                path="/listBatch/editBatch/:id"
                exact
                component={EditBatch}
              />

              {/* Halaman Produk */}
              <Route path="/listProduk" exact component={ListProduk} />
              {currentUser && (
                <Route exact path="/listProduk/daftar">
                  <DaftarProduk code={currentUser.user_detail.group.code} />
                </Route>
              )}
              <Route
                path="/listProduk/detailProduk/:id"
                exact
                component={ShowProduk}
              />
              {/* <Route
                path="/produk/edit/:id"
                exact
                component={EditProduk}
              /> */}

              {/* halaman green bean */}
              <Route path="/listGreenBean" exact component={listGreenBean} />
              {currentUser && (
                <Route exact path="/listGreenBean/daftar">
                  <DaftarGreenBean code={currentUser.user_detail.group.code} />
                </Route>
              )}
              <Route
                path="/listGreenBean/detailProduk/:id"
                exact
                component={ShowGreenBean}
              />
              <Route
                path="/greenBean/edit/:id"
                exact
                component={EditGreenBean}
              />
              
              {/* Halaman Produk */}
              <Route
                path="/transactionExplorer"
                exact
                component={ListTransaction}
              />
            </Fragment>
          )}

          {/* roaster */}
          <Route path="/detailRoasting/:code/:id" exact component={GetIdRoaster} />

          {/* Cupping */}
          <Route path="/Cupping/:code/:id" exact component={GetCupping} />

          {/* Batch */}
          <Route path="/detailBatch/:code/:id" exact component={GetBatchID} />

          <Route path="/List-Log-API" exact component={ListLogAPI} />

          {currentUser && (
            <Fragment>
              <Route path="/masterData" exact component={MasterDataLists} />

              <Route
                path="/masterData/addRoastingProfile"
                exact
                component={AddRoastingProfile}
              />
              <Route
                path="/masterData/editRoastingProfile/:id"
                exact
                component={EditRoastingProfile}
              />

              <Route
                path="/ListCupping"
                exact
                component={ListCupping}
              />
              {currentUser && (
                <Route exact path="/masterData/addCupping">
                  <AddCupping code={currentUser.user_detail.group.code} />
                </Route>
              )}

              {/* <Route
                path="/masterData/addCupping"
                exact
                component={AddCupping}
              /> */}

              <Route
                path="/masterData/editCupping/:id"
                exact
                component={EditCupping}
              />

              <Route
                path="/masterData/addWholeBean-Ground"
                exact
                component={AddGroundWhole}
              />
              <Route
                path="/masterData/editWholeBean-Ground/:id"
                exact
                component={EditWholeBeanGround}
              />

              <Route path="/masterData/addUnit" exact component={AddUnit} />
              <Route
                path="/masterData/editUnit/:id"
                exact
                component={EditUnit}
              />

              <Route path="/masterData/addBeans" exact component={AddBeans} />
              <Route
                path="/masterData/editBeans/:id"
                exact
                component={EditBeans}
              />

              <Route
                path="/masterData/addVariety"
                exact
                component={DaftarVarietas}
              />
              <Route
                path="/masterData/editVariety/:id"
                exact
                component={EditVarietas}
              />
              <Route
                path="/masterData/addVariety/Roaster"
                exact
                component={DaftarVarietasRoaster}
              />
              <Route
                path="/masterData/editVariety/Roaster/:id"
                exact
                component={EditVarietasRoaster}
              />

              <Route
                path="/masterData/addProcess/Roaster"
                exact
                component={DaftarProsesRoaster}
              />
              <Route
                path="/masterData/editProcess/Roaster/:id"
                exact
                component={EditProsesRoaster}
              />

              <Route
                path="/masterData/addProcess"
                exact
                component={DaftarProses}
              />
              <Route
                path="/masterData/editProcess/:id"
                exact
                component={EditProses}
              />

              <Route
                path="/masterData/addOrigin"
                exact
                component={DaftarSupplier}
              />
              <Route
                path="/masterData/editOrigin/:id"
                exact
                component={EditSupplier}
              />
              <Route
                path="/masterData/addOrigin/Roaster"
                exact
                component={DaftarSupplierRoaster}
              />
              <Route
                path="/masterData/editOrigin/Roaster/:id"
                exact
                component={EditSupplierRoaster}
              />

              <Route path="/greenBeans" exact component={ProductLists} />
              <Route
                path="/greenBeans/addGreenBeans"
                exact
                component={AddProducts}
              />
              <Route
                path="/greenBeans/editGreenBeans/:id"
                exact
                component={EditProduct}
              />

              <Route path="/roasting" exact component={RoastingLists} />
              {currentUser && (
                <Route exact path="/roasting/addRoasting">
                  <AddRoasting code={currentUser.user_detail.group.code} />
                </Route>
              )}
              <Route
                path="/roasting/editRoasting/:id"
                exact
                component={EditRoasting}
              />
            </Fragment>
          )}
        </Suspense>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { isLoggedIn } = state.auth;
  return {
    user,
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(App);
