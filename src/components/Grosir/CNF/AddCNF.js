import { Fragment, Component, useEffect } from "react";
import AddCNFForm from "./AddCNFForm";
import UserService from "../../../services/user.service";
import showResults from "../../showResults/showResults";
import Loader from "react-spinners/DotLoader";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import Web3 from "web3";
import { AddCNF as CNF } from "../../../abi/cnf";
import { css } from "@emotion/react";

require("dotenv").config();

var HDWalletProvider = require("@truffle/hdwallet-provider");

var m = new Date();
var dateString =
    m.getUTCFullYear() + "-" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + m.getUTCDate()).slice(-2);

var override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
      `
    ;
var provider = new HDWalletProvider(
  process.env.REACT_APP_MNEMONIC,
  "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_PROJECT_ID
);
var web3 = new Web3(provider);

var user = JSON.parse(localStorage.getItem("user"));

console.log("usernya mal:", user);

provider.engine.stop();
export default class AddCNFVi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageFile: "",
      certificateFile: "",
      content: [],
      date: "",
      loading: false,
      color: "#3c4b64",
      akun: "",
    };
  }

  handleDate = (tgl) => {
    this.setState({
      date: tgl,
    });
  };

  handleSubmit = async (values) => {
    this.setState({
      loading: true,
    });

    const formData = new FormData();

    if (
      values.nomor_dokumen != undefined &&
      (this.state.date != undefined || this.state.date === 'Invalid date')
    ) {
      formData.append("pembuat", user.status_role);
      formData.append("nomor_dokumen", values.nomor_dokumen);
      formData.append("tanggal_dokumen", this.state.date);

      // try{
      // // get wallet
      // const web3Modal = new Web3Modal();
      // const connection = await web3Modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      // var signer = provider.getSigner();

      // // const accounts = await window.ethereum.enable();
      // // const signer = accounts[0];
      // // end get wallet
      // } catch(err) {
      //   this.setState({
      //     loading: false,
      //   });
      //   showResults("Failed, No wallet selected");
      // }

      UserService.addCNF(formData).then(
        async (response) => {
          console.log('response', response);

          const provider = new HDWalletProvider(
            process.env.REACT_APP_MNEMONIC,
            "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_PROJECT_ID
          );
          const web3 = new Web3(provider);
          provider.engine.stop();

          let account = await web3.eth.getAccounts(function (err, accounts) {
            if (err != null) {
              return "0";
            } else if (accounts.length === 0) {
              return "0";
            } else {
              return accounts[0];
            }
          });

          console.log('akun yang digunakan', account[0]);

          if(response.data.data){ // cek apakah data sudah ada atau belum
            // input cnf to blockchain
            // let contract = new ethers.Contract(process.env.REACT_APP_ADDRESS_CNF, CNF, signer)

            if(!account[0]) {
              this.setState({
                loading: false,
              });

              showResults("Failed, wallet not found");
            }

            const storageContract = new web3.eth.Contract(
              CNF,
              process.env.REACT_APP_ADDRESS_CNF
            );

            try{
              // let transaction = await contract.addCNF(response.data.data.id, response.data.data.pembuat, response.data.data.nomor_dokumen, response.data.data.tanggal_dokumen, dateString)
              // this.setState({
              //   loading: false,
              // });
              // showResults("Data has been added")
              
              const gas = await storageContract.methods.addCNF(response.data.data.id, response.data.data.pembuat, response.data.data.nomor_dokumen, response.data.data.tanggal_dokumen, dateString).estimateGas();

              var post = await storageContract.methods
                .addCNF(response.data.data.id, response.data.data.pembuat, response.data.data.nomor_dokumen, response.data.data.tanggal_dokumen, dateString)
                .send(
                  {
                    from: account[0],
                    // gas,
                  },
                  (error, transactionHash) => {
                    // get transaction hash blockchain
                    console.log(transactionHash);
                  }
                );
              console.log(post);

              this.setState({
                loading: false,
              });
              showResults("Data has been added")

            } catch(e) {
              UserService.deleteCNF(response.data.data.id);
              this.setState({
                loading: false,
              });
              showResults(`Failed, Transaction rejected : ${e.message}`);
            }
          } else {
            this.setState({
              loading: false,
            });
            showResults(`Failed, Document Number already exist`);
          }

          // await transaction.wait()
          // end input cnf to blockchain
        },
        (error) => {
        }
      );
    } else {
      this.setState({
        loading: false,
      });
      showResults("Please fill all the fields");
    }
  };

  render() {

    return (
      <Fragment>
        {(() => {
          if(this.state.loading === true) {
            return(
              <div style={{textAlign : 'center', verticalAlign : 'middle', paddingTop : "150px"}}>
                <div className="sweet-loading">
                  <h5>The transaction will be written to the Blockchain</h5><br></br>
                  <br></br>
                    <Loader color={this.state.color} loading={this.state.loading} css={override} size={150} />
                  <br></br>
                  <br></br>
                  <h5>Please Wait...</h5>
                </div>
            </div>
            )
          } else {
            return(
              <AddCNFForm
                onSubmit={this.handleSubmit}
                onSelectImage={this.onFileChange}
                onSelectCertificate={this.onCertificateChange}
                onSelectDate={this.handleDate}
              />
            )
          }
        })()}
      </Fragment>
    );
  }
}
