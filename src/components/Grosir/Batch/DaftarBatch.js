import { Fragment, Component } from "react";
import DaftarBatchForm from "./DaftarBatchForm";
import UserService from "../../../services/user.service";
import showResults from "../../showResults/showResults";

export default class DaftarBatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageFile: "",
      certificateFile: "",
      content: [],
    };
  }

  componentDidMount() {
    UserService.getListBatchAsc().then((response) => {
      this.setState({
        content: response.data.batch,
      });
    });
  }

  onFileChange = (file) => {
    this.setState({
      imageFile: file,
    });
  };

  onCertificateChange = (file) => {
    this.setState({
      certificateFile: file,
    });
  };

  wait = (ms) => {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  handleSubmit = (values) => {
    const formData = new FormData();
    const batchID = this.handleIDBatch();

    if(values.batch_id) {
      formData.append("batch_id", values.batch_id);
      console.log('masuk value batch id');
    } else {
      formData.append("batch_id", batchID);
      console.log('masuk increment batch id');
    }

    if (
      values.biji_id != undefined &&
      values.jenis_id != undefined &&
      // values.biji_id != undefined &&
      // values.jenis_id != undefined &&
      values.proses_id != undefined &&
      values.supplier_id != undefined &&
      values.tgl_panen != undefined &&
      values.volume != undefined &&

      //Form Baru
      values.moisture != undefined &&
      values.videoCulture != undefined &&
      values.storytelling != undefined &&
      
      this.state.imageFile != "" &&
      this.state.certificateFile != ""
    ) {
      
      formData.append("biji_id", values.biji_id);
      formData.append("jenis_id", values.jenis_id);
      formData.append("proses_id", values.proses_id);
      formData.append("supplier_id", values.supplier_id);
      formData.append("tgl_panen", values.tgl_panen);
      formData.append("volume", values.volume);

      //Form Baru
      formData.append("moisture", values.moisture);
      formData.append("video_culture", values.videoCulture);
      formData.append("storytelling", values.storytelling);

      formData.append("files[]", this.state.imageFile);
      // for (let i = 0; i < this.state.imageFile.length; i++) {
      //   formData.append("files[]", this.state.imageFile[i]);
      // }

      formData.append("certificate[]", this.state.certificateFile);
      // for (let i = 0; i < this.state.certificateFile.length; i++) {
      //   formData.append("certificate[]", this.state.certificateFile[i]);
      // }

      UserService.addBatch(formData).then(
        showResults("Data has been added")
      );

      this.wait(5000);
      window.location.reload();
    } else {
      showResults("Please fill all the fields");
    }
  };

  handleIDBatch = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear().toString().substr(-2);

    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let increment = 1;
    let incrementalResultIDBatch = "0" + increment;
    let resultIDBatch = "" + year + month + incrementalResultIDBatch;

    for (let i = 0; i < this.state.content.length; i++) {
      if (this.state.content[i].batch_id == resultIDBatch) {
        increment += 1;
        if (increment < 10) {
          incrementalResultIDBatch = "0" + increment;
        }
        else {
          incrementalResultIDBatch = increment;
        }
        resultIDBatch = "" + year + month + incrementalResultIDBatch;
      }
    }

    return resultIDBatch;
  };

  render() {
    this.handleIDBatch();
    return (
      <Fragment>
        <DaftarBatchForm
          onSubmit={this.handleSubmit}
          onSelectImage={this.onFileChange}
          onSelectCertificate={this.onCertificateChange}
        />
      </Fragment>
    );
  }
}
