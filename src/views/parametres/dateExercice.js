import React, { useState, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { Modal } from "react-bootstrap";
import { Popconfirm } from "antd";
import { useTranslation } from 'react-i18next'
import {
  Getallexercice,
  postexercice,
  deleteexercice,
  Updateexercice,
} from "../../action/dateexercice";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
function DateExrecice(props) {
  const { t, i18n } = useTranslation()
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const { addToast } = useToasts();
  const exerciceData = [];

  const initialFormState = {
    _id: "",
    nom: "",
    dateDebut: "",
    dateFin: "",
    code: "",
  };

  // Setting state
  const [exercices, setExercices] = useState(exerciceData);
  const [currentExercice, setCurrentExercice] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    props.Getallexercice();
  }, []);
  useEffect(() => {
    if (props.exercice.length > 0) {
      setExercices(props.exercice);
    }
  }, [props.exercice]);
  const addExercice = () => {
    props.postexercice({
      nom: currentExercice.nom,
      dateDebut: currentExercice.dateDebut,
      dateFin: currentExercice.dateFin,
      code: currentExercice.code,
    });
    setExercices([...exercices, currentExercice]);
    addToast("Exercice ajouter", {
      appearance: "info",
      autoDismiss: true,
    });
    setCurrentExercice(initialFormState);
  };

  const deleteExercice = (id) => {
    setEditing(false);

    setExercices(exercices.filter((exercice) => exercice._id !== id));
    props.deleteexercice(id);
    addToast("Exercice suprimé", {
      appearance: "info",
      autoDismiss: true,
    });
  };

  const updateExercice = () => {
    setEditing(false);
    let exercice = exercices.filter(
      (exercice) => exercice._id !== currentExercice._id
    );
    setExercices([...exercice, currentExercice]);
    props.Updateexercice(currentExercice);
    setCurrentExercice(initialFormState);
    addToast("Exercice modifier", {
      appearance: "info",
      autoDismiss: true,
    });
  };

  const editRow = (exercice) => {
    setEditing(true);

    setCurrentExercice({
      _id: exercice._id,
      nom: exercice.nom,
      dateDebut: exercice.dateDebut,
      dateFin: exercice.dateFin,
      code: exercice.code,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCurrentExercice({ ...currentExercice, [name]: value });
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="parametre">
        <p className="connexion">
          <b>    {t('DateExrecice.titel')} </b>
        </p>
        <hr className="hr1" />

        <div className="row text-right">
          <div className="col">
            <button
              type="submit"
              className="accee-btn"
              onClick={() => setSmShow(true)}
            >
              <span style={{ color: "white" }}>
                <b> {t('DateExrecice.addexercice')}  </b>
              </span>
            </button>
          </div>
        </div>
        <br />

        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th style={{ paddingLeft: " 10px" }}>{t('DateExrecice.tab_Nom')}   </th>

              <th style={{ paddingLeft: " 10px" }}>{t('DateExrecice.tab_datedebut')}</th>
              <th style={{ paddingLeft: " 10px" }}>{t('DateExrecice.tab_Datefin')} </th>
              <th style={{ paddingLeft: " 10px" }}>{t('DateExrecice.tab_codeletrage')} </th>
              <th style={{ paddingLeft: " 10px" }}>{t('DateExrecice.tab_Action')} </th>
            </tr>
          </thead>
          {exercices.map((el, index) => {
            return (
              <tbody>
                <tr key={index}>
                  <td>{el.nom}</td>
                  <td>{el.dateDebut}</td>
                  <td>{el.dateFin}</td>
                  <td>{el.code}</td>
                  <td>
                    <button
                      onClick={() => {
                        setLgShow(true);
                        editRow(el);
                      }}
                      className="btn btn-success btn-sm rounded-0"
                      type="button"
                    >
                      <i className="fa fa-edit"></i>
                    </button>

                    {exercices.length >= 1 ? (
                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => deleteExercice(el._id)}
                      >
                        <button
                          className="btn btn-danger btn-sm rounded-0"
                          type="button"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </Popconfirm>
                    ) : null}
                  </td>
                </tr>
              </tbody>
            );
          })}
          ;
        </table>

        <Modal
          show={smShow}
          onHide={() => setSmShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (
                !currentExercice.nom ||
                !currentExercice.dateDebut ||
                !currentExercice.dateFin ||
                !currentExercice.code
              )
                return;

              addExercice();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <b>{t('DateExrecice.modaladd_titel')}  </b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">{t('DateExrecice.modaladd_Nom')}  </label>
                      <input
                        type="text"
                        className="form-control"
                        name="nom"
                        value={currentExercice.nom}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">{t('DateExrecice.modaladd_Datedebut')}  </label>
                      <input
                        value={currentExercice.dateDebut}
                        onChange={handleInputChange}
                        type="date"
                        className="form-control"
                        name="dateDebut"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">{t('DateExrecice.modaladd_Datefin')}  </label>
                      <input
                        value={currentExercice.dateFin}
                        onChange={handleInputChange}
                        type="date"
                        className="form-control "
                        name="dateFin"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">
                      {t('DateExrecice.modaladd_codeletrage')} 
                       
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="code"
                        value={currentExercice.code}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <button
                      onClick={() => {
                        setSmShow(false);
                      }}
                      className="accee-btn"
                      style={{ alignContent: "end" }}
                    >
                      <span style={{ color: "white" }}>{t('DateExrecice.modaladd_add')} </span>
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </form>
        </Modal>
        <Modal
          show={lgShow}
          onHide={() => setLgShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();

              updateExercice();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <b> Modifier l'exercice</b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">{t('DateExrecice.tab_Nom')}</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nom"
                        value={currentExercice.nom}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label"> {t('DateExrecice.tab_datedebut')}</label>
                      <input
                        value={currentExercice.dateDebut}
                        onChange={handleInputChange}
                        type="date"
                        className="form-control"
                        name="dateDebut"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label"> {t('DateExrecice.tab_Datefin')}</label>
                      <input
                        value={currentExercice.dateFin}
                        onChange={handleInputChange}
                        type="date"
                        className="form-control "
                        name="dateFin"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">
                      {t('DateExrecice.tab_codeletrage')}
                      
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="code"
                        value={currentExercice.code}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <button
                      onClick={() => {
                        setLgShow(false);
                      }}
                      className="accee-btn"
                      style={{ alignContent: "end" }}
                    >
                      <span style={{ color: "white" }}> {t('DateExrecice.update')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </form>
        </Modal>
      </div>
    </div>
  );
}
const mapStateToProps = function (store) {
  return {
    exercice: store.exercice.Exercice,
  };
};
export default connect(mapStateToProps, {
  Getallexercice,
  postexercice,
  deleteexercice,
  Updateexercice,
})(DateExrecice);
