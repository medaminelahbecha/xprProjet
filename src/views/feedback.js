import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Header from "../components/menu/header";
import Menu from "../components/menu/menu";
import { Modal } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import Pagination from "../components/pagination";
import moment from "moment";
import { Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import {
  getallfeedbacks,
  postfeedback,
  deletefeedback,
  UpdateFeedback,
} from "../action/feedbackaction";
function Feedback(props) {
  const { t, i18n } = useTranslation();
  let now = new Date();
  let start = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  );
<<<<<<< HEAD
  const { t, i18n } = useTranslation();
  const [feedbacksData, setFeedbacksData] = useState([ ]);
=======
  const [feedbacksData, setFeedbacksData] = useState([]);
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
  const initialFormState = {
    _id: "",
    libelle: "",
    type: "",
    description: "",
    date: start.format("DD,MMMM,YYYY"),
    etat: "0",
    file: "",
  };

  const [feedbacks, setFeedbacks] = useState(feedbacksData);
  const [currentFeedback, setCurrentFeedback] = useState(initialFormState);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const { addToast } = useToasts();

  const [file, setfile] = useState([]);
  const [state, setState] = useState({
    totalRecords: "",
    totalPages: "",
    pageLimit: "",
    currentPage: "",
    startIndex: "",
    endIndex: "",
  });
  useEffect(() => {
    props.getallfeedbacks();
  }, []);
  useEffect(() => {
    console.log("feed", props.feedback);
    if (props.feedback.length > 0) {
      setFeedbacks(props.feedback);
    }
  }, [props.feedback]);
  const onChangePage = (data) => {
    setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex,
    });
  };

  const addFeedback = () => {
    props.postfeedback({
      
      libelle: currentFeedback.libelle,
      type: currentFeedback.type,
      date: currentFeedback.date,
      etat: currentFeedback.etat,
      description: currentFeedback.description,
     
    });

    setSelectedFile([]);
    setFeedbacks([...feedbacks, currentFeedback]);
    addToast("feedback envoyer", {
      appearance: "info",
      autoDismiss: true,
    });
    setCurrentFeedback(initialFormState);
  };
  // const deleteFeedback = (id) => {
  //   setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
  //   props.deletefeedback(id);
  //   addToast("feedback suprimé", {
  //     appearance: "info",
  //     autoDismiss: true,
  //   });
  // };
  const handelchange = (event) => {
    const { name, value } = event.target;

    setCurrentFeedback({ ...currentFeedback, [name]: value });
  };

  const changeHandler = (event) => {
    setSelectedFile(event);
    setIsSelected(true);
    setfile({ file: window.URL.createObjectURL(event[0]) });
    console.log(event);
  };
  let rowsPerPage = [];
  rowsPerPage = feedbacks.slice(state.startIndex, state.endIndex + 1);

  return (
    <div>
      <Header />
      <Menu />
      <div className="dashbord">
        <br />
        <br />
        <br />
        <table class="table table-hover">
          <thead>
            <tr>
              <th>
                {" "}
<<<<<<< HEAD
                <b> {t("Feedback.title")} </b>
=======
                <b>{t("Feedback.title")}</b>
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
              </th>
              <td></td>

              <td></td>
              <td></td>

              <th>
                <a onClick={() => setFeedbackModal(true)}>
                  <img
                    width="25px"
                    src="/template/img/plus.png"
                    className="rounded-circle"
                    alt="Plus"
                  />
                </a>
              </th>
            </tr>
          </thead>

          <thead>
            <tr>
<<<<<<< HEAD
              <th scope="col"> {t("Feedback.libelle")} </th>
              <th scope="col">{t("Feedback.description")} </th>
              <th scope="col">{t("Feedback.date")}</th>
              <th scope="col">{t("Feedback.type")} </th>
              <th scope="col">{t("Feedback.etat")} </th>
=======
              <th scope="col">{t("Feedback.libelle")}</th>
              <th scope="col">{t("Feedback.description")}</th>
              <th scope="col">{t("Feedback.date")}</th>
              <th scope="col">{t("Feedback.type")}</th>
              <th scope="col">{t("Feedback.etat")}</th>
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {rowsPerPage.map((el) => {
              return (
                <tr>
                  <th scope="row">{el.libelle}</th>
                  <td>{el.description}</td>
                  <td>{el.date}</td>
                  {el.type == "1" ? (
                    <td>
                      <label style={{ backgroundColor: "#A9A9A9" }}>
<<<<<<< HEAD
                      {t("Feedback.bug")}  
=======
                        {t("Feedback.bug")}
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
                      </label>{" "}
                    </td>
                  ) : (
                    <td>
                      <label style={{ backgroundColor: "#00e600" }}>
<<<<<<< HEAD
                      {t("Feedback.feedback")}  
=======
                        {t("Feedback.feedback")}
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
                      </label>{" "}
                    </td>
                  )}

                  <td>{el.etat == 0 ? t("Feedback.etat_enattente") :el.etat == 1 ? t("Feedback.etat_encours") : t("Feedback.etat_terminer")}</td>
                  {/* <td>
                    {feedbacks.length >= 0 ? (
                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => deleteFeedback(el._id)}
                      >
                        <button
                          className="btn btn-danger btn-sm rounded-0"
                          type="button"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </Popconfirm>
                    ) : null}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalRecords={feedbacks.length}
          pageLimit={state.pageLimit || 5}
          initialPage={1}
          pagesToShow={5}
          onChangePage={onChangePage}
        />
      </div>
      <Modal
        show={feedbackModal}
        onHide={() => setFeedbackModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();

            addFeedback();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
<<<<<<< HEAD
              <b> {t("Feedback.modalheader")} </b>
=======
              <b>{t("Feedback.modalheader")}</b>
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="form-group">
<<<<<<< HEAD
                    <label className="organisation-Label">  {t("Feedback.libelle")} </label>
=======
                    <label className="organisation-Label">
                      {t("Feedback.libelle")}
                    </label>
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
                    <input
                      value={currentFeedback.libelle}
                      onChange={handelchange}
                      type="text"
                      className="form-control"
                      required
                      name="libelle"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
<<<<<<< HEAD
                    <label className="organisation-Label">    {t("Feedback.type")} </label>
=======
                    <label className="organisation-Label">
                      {t("Feedback.type")}
                    </label>
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
                    <select
                      value={currentFeedback.type}
                      onChange={handelchange}
                      className="form-control"
                      required
                      style={{ width: "100%" }}
                      name="type"
                    >
                      <option value="DEFAULT" disabled>
                        {t("Feedback.select")}
                      </option>
                      <option value="0">{t("Feedback.feedback")}</option>
                      <option value="1">{t("Feedback.bug")}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
<<<<<<< HEAD
                    <label className="organisation-Label">     {t("Feedback.description")} </label>
=======
                    <label className="organisation-Label">
                      {t("Feedback.description")}
                    </label>
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
                    <textarea
                      value={currentFeedback.description}
                      onChange={handelchange}
                      type="text"
                      className="form-control"
                      required
                      name="description"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col">
                  <Dropzone
                    onDrop={changeHandler}
                    //accept={["image/*" , "*.pdf"]}
                    minSize={1024}
                    maxSize={3072000}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Cliquer ou faire Glisser les fichiers </p>
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div> */}
              <br></br>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <button
                      className="fournisseur-btn"
                      style={{ alignContent: "end" }}
                    >
<<<<<<< HEAD
                      <span style={{ color: "white" }}> {t("Feedback.envoyer")} </span>
=======
                      <span style={{ color: "white" }}>
                        {t("Feedback.envoyer")}
                      </span>
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </div>
  );
}

const mapStateToProps = function (store) {
  return {
    feedback: store.feedback.Feedback,
  };
};
export default connect(mapStateToProps, {
  getallfeedbacks,
  postfeedback,
  deletefeedback,
  UpdateFeedback,
})(Feedback);
