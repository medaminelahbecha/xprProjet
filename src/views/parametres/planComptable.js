import React, { Component } from "react";
import { Table, Button, Popconfirm, Upload } from "antd";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { EditableFormRow, EditableCell } from "./editable";
import { connect } from "react-redux";
import { Updatecat, updateplan, getPlan } from "../../action/plancomptable";
import {
  DeleteOutlined,
  FileAddOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ExcelRenderer } from "react-excel-renderer";
import "antd/dist/antd.css";
import { toast } from "react-toastify";
import { withTranslation } from 'react-i18next';
import "react-toastify/dist/ReactToastify.css";
toast.configure();
class PlanComptable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      cols: [],
      rows: [],
      codeclient: "",
      codefournisseur: "",
      codesalarier: "",
      codeachat: "",
      codevente: "",
      errorMessage: null,
      columns: [
        {
          title: "INDEX",
          dataIndex: "index",
          editable: false,
        },
        {
          title: "CATEGORIE",
          dataIndex: "sous_categorie",
          editable: true,
        },

        {
          title: "CODE",
          dataIndex: "code_sous_categorie",
          editable: true,
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) =>
            this.state.rows.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <DeleteOutlined style={{ Color: "red", fontSize: "20px" }} />
              </Popconfirm>
            ) : null,
        },
      ],
    };
  }
  componentDidMount() {
    this.props.getPlan();
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    if (nextProps.Plans.length > 0) {
      let data = nextProps.Plans[0];
      this.setState({
        codeclient: data.codeclient,
        codefournisseur: data.codefournisseur,
        codesalarier: data.codesalarier,
        codeachat: data.codeachat,
        codevente: data.codevente,
      });
    }
  }
  handleSave = (row) => {
    const newData = [...this.state.rows];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    if (!file || !file[0]) {
      return;
    }
  }

  fileHandler = (fileList) => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!",
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!",
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index1) => {
          if (row && row !== "undefined") {
            newRows.push({
              key: index1,
              index: index1,
              sous_categorie: row[0],
              code_sous_categorie: row[1],
            });
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!",
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null,
          });
        }
      }
    });
    return false;
  };
  handelchange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submitting: ", this.state.rows);
    // this.props.Updatecat(this.state.rows);

    let obj = {
      codeclient: this.state.codeclient,
      codefournisseur: this.state.codefournisseur,
      codesalarier: this.state.codesalarier,
      codeachat: this.state.codeachat,
      codevente: this.state.codevente,
    };
    this.props.updateplan(obj);
    toast.info("plan comptable enregistrer !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    //submit to API
    //if successful, banigate and clear the data
    //this.setState({ rows: [] })
  };

  handleDelete = (key) => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter((item) => item.key !== key) });
  };
  handleAdd = () => {
    const { rows } = this.state;
    const newData = {
      key: this.state.rows.length,
      index: this.state.rows.length,
      categorie: "carburant",
      code: "22",
      editable: true,
    };
    this.setState({
      rows: [newData, ...rows],
    });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.state.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,

          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Header />
        <Menu />

        <p className="connexion">
          <b>   {this.props.t('PlanComptable.titel') }</b>
        </p>
        <hr className="hr1" />
        <div style={{ display: "none" }} className="container-plan-comptable">
          <div className="row">
            <div className="col-sm-6 text-center">
              <br />
              <br />
              <p className="plan-comptable-text">
                Remplacez les catégories créées par défaut par votre propre plan
                comptable ! Vous pouvez également télécharger et completer le
                modèle suivant:
              </p>
              <br />
              <br />
            </div>
            <div className="col-sm-6">
              {this.state.rows.length > 0 && (
                <>
                  <Button
                    onClick={this.handleAdd}
                    type="info"
                    style={{ marginBottom: 16 }}
                  >
                    <PlusOutlined />
                    Ajouter Ligne
                  </Button>{" "}
                  <Button
                    onClick={this.handleSubmit}
                    type="primary"
                    style={{ marginBottom: 16, marginLeft: 10 }}
                  >
                    Enregistrer le fichier
                  </Button>
                </>
              )}
              <div>
                <Upload
                  name="file"
                  beforeUpload={this.fileHandler}
                  onRemove={() => this.setState({ rows: [] })}
                  multiple={false}
                >
                  <Button>
                    <FileAddOutlined /> Upload Excel File
                  </Button>
                </Upload>
              </div>
              <div style={{ marginTop: "2px" }}>
                <Table
                  pagination={{ pageSize: 3 }}
                  scroll={{ y: 240 }}
                  components={components}
                  rowClassName={() => "editable-row"}
                  dataSource={this.state.rows}
                  columns={columns}
                />
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="parametre">
          <div className="planC">
            <br />
            <br />
            <br />
            <div className="row ">
              <div className="col">
                <div className="form-group">
                  <label className="planCLabel">
                  {this.props.t('PlanComptable.prefixfournissuer') }
           
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="401"
                    onChange={this.handelchange}
                    value={this.state.codefournisseur}
                    required
                    name="codefournisseur"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="planCLabel">
                  {this.props.t('PlanComptable.Journalvente') }
                  </label>
                  <input
                    type="text"
                    name="codevente"
                    value={this.state.codevente}
                    className="form-control"
                    onChange={this.handelchange}
                    placeholder="VEN"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col ">
                <div className="form-group">
                  <label className="planCLabel">
                  {this.props.t('PlanComptable.prefixclient') }
                   
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.codeclient}
                    name="codeclient"
                    onChange={this.handelchange}
                    required
                  />
                </div>
              </div>
              <div className="col ">
                <div className="form-group">
                  <label className="planCLabel">
                  {this.props.t('PlanComptable.Journalachat') }
                  </label>
                  <input
                    type="text"
                    name="codeachat"
                    className="form-control"
                    placeholder="AC"
                    value={this.state.codeachat}
                    onChange={this.handelchange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row ">
              <div className="col ">
                <div className="form-group">
                  <label className="planCLabel"> {this.props.t('PlanComptable.comptesalarie') } </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="421"
                    required
                    onChange={this.handelchange}
                    value={this.state.codesalarier}
                    name="codesalarier"
                  />
                </div>
              </div>
              <div className="col ">
                <input
                  type="submit"
                  className="planC-btn"
                  style={{ alignSelf: "center", color: "white" }}
                  value= {this.props.t('PlanComptable.Enregistrer') } 
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = function (store) {
  console.log(store.plans.Plans);
  return {
    Plans: store.plans.Plans,
  };
};
export default connect(mapStateToProps, { Updatecat, updateplan, getPlan })(
  withTranslation('')(PlanComptable) );
