import React, { Component } from "react";
import Header from "../components/menu/header";
import Menu from "../components/menu/menu";
import { Modal, Card, Accordion, Button } from "react-bootstrap";
import { Getallcat, updatesouscategory , postCat , addsouscategory } from "../action/plancomptable";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { withTranslation } from 'react-i18next';
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class Categorie extends Component {
  constructor() {
    super();
    this.state = {
      showcategory: false,
      showsouscategory: false,
      updatestate: false,
      name_categorie: "",
      code_categorie: "",
      color_categorie: "#B2E0FA",
      color_sous_categorie: "#B2E0FA",
      sous_categorie: "",
      code_sous_categorie: "",
      Id_code_sous_categorie: "",
      Id_cat: "",
      catg: [
        {
          id: "1",
          code_categorie: "60",
          name_categorie: "Achats (SAUF 603)",
          color: "#83caf0",
          sous_categorie: [],
        },
        {
          id: "2",
          code_categorie: "61",
          name_categorie: "Services éxterieurs ",
          color: "#EEC980",
          sous_categorie: [],
        },
        {
          id: "3",
          code_categorie: "62",
          name_categorie: "Autres services extérieurs",
          color: "#DF9FFF",
          sous_categorie: [],
        },
      ],
    };
  }
  componentDidMount() {
    this.props.Getallcat();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cat.length > 0) this.setState({ catg: nextProps.cat });
  }

  handleModal() {
    this.setState({ showcategory: !this.state.showcategory });
  }
  handleModalsouscategorie() {
    this.setState({ showsouscategory: !this.state.showsouscategory });
  }

  submitsouscategorie = (event) => {
    event.preventDefault();
    let categorie = this.state.catg.filter(
      (el) => el.code_categorie == this.state.code_categorie
    );
    this.setState({
      catg: this.state.catg.filter((el) => el._id !== categorie.id),
    });
    let obj = {
      _id: categorie[0]._id,
      sous_categorie: this.state.sous_categorie,
      color: this.state.color_sous_categorie,
      code_sous_categorie: this.state.code_sous_categorie,
    };
    this.props.addsouscategory(obj)
    categorie[0].sous_categorie.push(obj);
    this.setState({ catg: [...this.state.catg, categorie[0]] });
    toast.info("sous catégorie enregistrer !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  submitupdatesouscategorie = (event) => {
    event.preventDefault();
    this.props.updatesouscategory({
      _id: this.state.Id_cat,
      _idsoucat: this.state.Id_code_sous_categorie,
      sous_categorie: this.state.sous_categorie,
      color: this.state.color_sous_categorie,
      code_sous_categorie: this.state.code_sous_categorie,
    });
    this.setState({ code_sous_categorie: "", sous_categorie: "" });
    this.setState({ updatestate: false });
    this.setState({ showsouscategory: !this.state.showsouscategory });
    toast.info("sous catégorie modifier !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  submitcategorie = (event) => {
    event.preventDefault();
    let obj = {
      name_categorie: this.state.name_categorie,
      code_categorie: this.state.code_categorie,
      sous_categorie: [],
      color: this.state.color_categorie,
    };
    this.setState({ catg: [...this.state.catg, obj] });
    toast.info("catégorie enregistrer !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.postCat(obj)
  };
  handelchange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };
  updatesoucategory = (el, id) => {
    this.setState({ sous_categorie: el.sous_categorie });
    this.setState({ Id_code_sous_categorie: el._id });
    this.setState({ Id_cat: id });
    this.setState({ code_sous_categorie: el.code_sous_categorie });
    this.setState({ code_sous_categorie: el.code_sous_categorie });
    this.setState({ showsouscategory: true });
    this.setState({ updatestate: true });
  };
  render() {
    return (
      <div>
        <Header />
        <Menu />
        <div className="parametre">
          <p className="connexion">
            <b> {this.props.t('Categorie.titel')}</b>
          </p>
          <hr className="hr1" />
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div className="btn-group" role="group" aria-label="Third group">
              <button
                className="categorie-btn"
                onClick={() => {
                  this.handleModal();
                }}
              >
                <span style={{ color: "white" }}>
                  <b> {this.props.t('Categorie.addnewcategorie')}</b>
                </span>
              </button>
            </div>
            <div className="btn-group" role="group" aria-label="Third group">
              <button
                onClick={() => {
                  this.handleModalsouscategorie();
                }}
                className="categorie-btn"
              >
                <span style={{ color: "white" }}>
                  <b>{this.props.t('Categorie.addnewsouscat')}</b>
                </span>
              </button>
            </div>
          </div>
          <br />
          {this.state.catg.map((cat, index) => {
            return (
              <Accordion defaultActiveKey="0" key={index}>
                <Card>
                  <Accordion.Toggle
                    className="text-left"
                    as={Button}
                    variant="link"
                    eventKey={cat._id}
                    style={{
                      backgroundColor: cat.color,
                      color: "white",
                    }}
                    sortType="asc"
                  >
                    {cat.code_categorie} {" - "} {cat.name_categorie}
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey={cat._id}>
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th style={{ paddingLeft: " 10px" }}> {this.props.t('Categorie.nomsouscat')}</th>

                          <th style={{ paddingLeft: " 10px" }}>
                          {this.props.t('Categorie.codecompatblesouscat')}  
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.sous_categorie.map((el, index) => {
                          return (
                            <tr
                              key={index}
                              onDoubleClick={() =>
                                this.updatesoucategory(el, cat._id)
                              }
                              style={{ background: el.color }}
                            >
                              <td
                                className="text-left"
                                style={{ paddingLeft: " 40px" }}
                              >
                                <i className="fa fa-stop"></i>{" "}
                                {el.sous_categorie}
                              </td>

                              <td>
                                <span>{el.code_sous_categorie}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            );
          })}
          {/* modal  categorie */}
          <Modal
            show={this.state.showcategory}
            onHide={() => this.handleModal()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <b> {this.props.t('Categorie.addnewcategorie')}   </b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.submitcategorie} className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label">{this.props.t('Categorie.nomsouscat')} </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name_categorie"
                      value={this.state.name_categorie}
                      onChange={this.handelchange}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label">{this.props.t('Categorie.codecompatblesouscat')} </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.code_categorie}
                      name="code_categorie"
                      required
                      onChange={this.handelchange}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label">{this.props.t('Categorie.modal_bodycolor')} </label>

                    <div className="form-group ">
                      <input
                        type="color"
                        value={this.state.color_categorie}
                        className=" form-control"
                        name="color_categorie"
                        onChange={this.handelchange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <input
                      type="submit"
                      className="accee-btn"
                      style={{ alignContent: "end" }}
                      value={this.props.t('Categorie.addnew')}
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          {/* modal sous categorie */}
          <Modal
            show={this.state.showsouscategory}
            onHide={() => this.handleModalsouscategorie()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.updatestate ? (
                  <b> {this.props.t('Categorie.modal_titelupdatesouscat')} </b>
                ) : (
                  <b> {this.props.t('Categorie.modal_titeladdsouscat')} </b>
                )}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={
                  this.state.updatestate
                    ? this.submitupdatesouscategorie
                    : this.submitsouscategorie
                }
                className="row"
              >
                <div className="col">
                  {this.state.updatestate ? null : (
                    <div className="form-group">
                      <label className="organisation-Label">
                        {" "}
                        {this.props.t('Categorie.modal_bodycode_category')}
                        code Categorie
                      </label>
                      <input
                        list="code_cat"
                        type="text"
                        className="form-control"
                        value={this.state.code_categorie}
                        name="code_categorie"
                        onChange={this.handelchange}
                        required
                      />
                      <datalist id="code_cat">
                        {this.state.catg.map((el, index) => {
                          return (
                            <option key={index} value={el.code_categorie} />
                          );
                        })}
                      </datalist>
                    </div>
                  )}
                  <div className="form-group">
                    <label className="organisation-Label">{this.props.t('Categorie.modal_bodyNom')}</label>
                    <input
                      type="text"
                      value={this.state.sous_categorie}
                      className="form-control"
                      name="sous_categorie"
                      onChange={this.handelchange}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label"> {this.props.t('Categorie.codecompatblesouscat')} Code comptable</label>
                    <input
                      type="text"
                      value={this.state.code_sous_categorie}
                      className="form-control"
                      name="code_sous_categorie"
                      onChange={this.handelchange}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label">{this.props.t('Categorie.modal_bodycolor')} Color</label>

                    <div className="form-group ">
                      <input
                        type="color"
                        value={this.state.color_sous_categorie}
                        name="color_sous_categorie"
                        onChange={this.handelchange}
                        className=" form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <button
                      type="submit"
                      className="accee-btn"
                      style={{ alignContent: "end" }}
                    >
                      <span style={{ color: "white" }}>
                        {this.state.updatestate ? this.props.t('Categorie.addnew')  : this.props.t('Categorie.update')}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = function (store) {
  return {
    cat: store.plans.cat,
  };
};
export default connect(mapStateToProps, { updatesouscategory,postCat,addsouscategory, Getallcat })(
  withTranslation('')(Categorie)
);
