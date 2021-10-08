import React, { useState, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";
import { connect } from "react-redux";
import { GetallFacture } from "../../action/factureaction";
import { Getallexercice } from "../../action/dateexercice";
import { getPlan } from "../../action/plancomptable";
import { Getallclient, getoneclient } from "../../action/clientaction";
import { useTranslation } from 'react-i18next'
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function EcritureComptable(props) {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    props.GetallFacture();
  }, []);
  useEffect(() => {
    props.Getallexercice();
  }, []);
  useEffect(() => {
    props.getPlan();
  }, []);
  useEffect(() => {
    props.Getallclient();
  }, []);

  //filtre tab par dateRange
  const ecriturecomptables = (dateDebut, dateFin) => {
    let ecriture = [];
    ecriture = props.facture
      .filter((el) => el.validation === true)
      .filter(
        (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
      )
      .filter(
        (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
      );
    return ecriture;
  };
  //calcul auxiliaire
  const Auxiliaire = (idcl) => {
    let client = [];
    client = props.client
      .filter((el) => el._id == idcl)
      .map((el) => {
        return el.code;
      });
    return client;
  };
  //calcul tva Deductible pour fournisseur
  const GeneralTvaD = (idcl) => {
    let client = [];
    client = props.client
      .filter((el) => el._id == idcl)
      .map((el) => {
        return el.comptetva_deductible;
      });
    return client;
  };
  //calcul tva C pour client
  const GeneralTvaC = (idcl) => {
    let client = [];
    client = props.client
      .filter((el) => el._id == idcl)
      .map((el) => {
        return el.collecter;
      });
    return client;
  };

  let now = new Date();

  const [state, setState] = useState({
    start: moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ),
    end: moment(),
  });
  const { start, end } = state;
  const handleCallback = (start, end) => {
    setState({ start, end });
  };
  const label =
    start.format("DD,MMMM , YYYY") + " - " + end.format(" DD,MMMM, YYYY");
  let s = new Date(start);
  let e = new Date(end);

  console.log(s);
  console.log(e);
  let debutexer = [];
  let finexer = [];
  //date d'exercice
  const debutExrecice = () => {
    debutexer = props.exercice.map((el) => {
      return el.dateDebut;
    });
    return debutexer;
  };
  const finExrecice = () => {
    finexer = props.exercice.map((el) => {
      return el.dateFin;
    });
    return finexer;
  };
  console.log(debutExrecice([0]));
  console.log(finExrecice());
  console.log(debutexer[0]);
  console.log(debutexer[1]);
  console.log(finexer[0]);
  console.log(finexer[1]);

  let ranges = {
    "mois en cours": [moment(end), moment(start).subtract(-30, "days")],
    2021: [
      moment("2021-01-01 00:00:00"),
      moment("2021-01-01 00:00:01").subtract(-364, "days"),
    ],
    2020: [
      moment("2020-01-01 00:00:01"),
      moment("2020-01-01 00:00:01").subtract(-365, "days"),
    ],
    exercice1: [moment(new Date(debutexer[0])), moment(new Date(finexer[0]))],
    exercice2: [moment(new Date(debutexer[1])), moment(new Date(finexer[1]))],
  };
  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false,
    opens: "left",
  };
  const initialFormState = {
    formatType: "",
  };
  const [formats, setFotmats] = useState(initialFormState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFotmats({ ...formats, [name]: value });
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="dashbord">
        <div className="connexion">
          <p>  {t('EcritureComptable.titel')}    </p>
        </div>
        <div className="row">
          <div className="col-5">
            <DateTimeRangeContainer
              ranges={ranges}
              start={start}
              end={end}
              local={local}
              applyCallback={handleCallback}
              opens="left"
              smartMode
            >
              <div class="input-group ">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i className="fa fa-calendar-alt"></i>
                  </span>
                </div>
                <input
                  class="form-control"
                  width="8cm"
                  type="text"
                  placeholder="Enter text"
                  style={{ cursor: "pointer" }}
                  value={label}
                />
              </div>
            </DateTimeRangeContainer>
          </div>

          <div class="input-group ">
            <div className="col-5">
              <form>
                <div class="form-group">
                  <select
                    name="formatType"
                    value={formats.formatType}
                    onChange={handleInputChange}
                    class="form-control"
                  >
                    <option value="default"> {t('EcritureComptable.selectforma')}</option>
                    <option value="cegid">Cegid(csv)</option>
                    <option value="sage">Sage</option>
                    <option value="sig">sig</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-2">
            <ReactHTMLTableToExcel
              className="btn btn-export "
              table="excel"
              filename="ReportExcel"
              buttonText={t('EcritureComptable.exporter')}
            />
          </div>
        </div>

        <br />
        <br />

        <div className="row">
          <div class="card">
            <div className="card-header">
              <h5 class="card-header">{t('EcritureComptable.Préparerexport')}</h5>
            </div>
            {formats.formatType == "sage" || formats.formatType == "cegid" ? (
              //**********sage /cegid */
              <table
                id="excel"
                className="table table-bordered table-hover small"
              >
                {formats.formatType == "sage" ? (
                  <thead class="thead-light">
                    <tr>
                      <th width="200">_DATE_</th>
                      <th width="200">JNL</th>
                      <th width="200">FC ___GENERAL___</th>
                      <th width="200">X _____AUX_____</th>
                      <th width="200">______S______</th>
                      <th width="200">______MONTANT_______</th>
                      <th width="200">__________LABEL__________</th>
                      <th width="200">_____FILE____</th>
                      <th width="200">N _IDILE_</th>
                    </tr>
                  </thead>
                ) : (
                  <thead class="thead-light">
                    <tr>
                      <th width="200">{t('EcritureComptable.cegid_DATE')}  </th>
                      <th width="200">{t('EcritureComptable.cegid_JOURNAL')} </th>
                      <th width="200">{t('EcritureComptable.cegid_GENERAL')} </th>
                      <th width="200">{t('EcritureComptable.cegid_AUXILIAIRE')} </th>
                      <th width="200">{t('EcritureComptable.cegid_SENS')} </th>
                      <th width="200">{t('EcritureComptable.cegid_MONTANT')} </th>
                      <th width="200">{t('EcritureComptable.cegid_LIBELLE')}</th>
                      <th width="200">{t('EcritureComptable.cegid_REFINTERNE')} </th>
                      <th width="200">{t('EcritureComptable.cegid_REFINTERNE')} </th>
                    </tr>
                  </thead>
                )}

                {ecriturecomptables.length &&
                  ecriturecomptables(s, e).map((el) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{el.date_creation}</td>
                          {el.type == "fournisseur" ? <td>AC</td> : <td>VN</td>}
                          {el.type == "fournisseur" ? (
                            <td>401000</td>
                          ) : (
                            <td>411000</td>
                          )}
                          {el.type == "fournisseur" ? (
                            <td>401{Auxiliaire(el.idclient)}</td>
                          ) : (
                            <td>411{Auxiliaire(el.idclient)}</td>
                          )}

                          {el.type == "fournisseur" ? <td>C</td> : <td>D</td>}

                          <td>
                            {Number(
                              el.montant_ttc
                                .toString()
                                .replace(/\,/g, ".")
                                .replace(/\s/g, "")
                            )
                              .toFixed(3)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                          </td>

                          <td>{el.client}</td>
                          <td>{el.code_facture}</td>
                          <td>{el.numero}</td>
                        </tr>

                        <tr>
                          <td>{el.date_creation}</td>
                          {el.type == "fournisseur" ? <td>AC</td> : <td>VN</td>}

                          <td>{el.categorie}</td>

                          <td>- -</td>
                          {el.type == "fournisseur" ? <td>D</td> : <td>C</td>}

                          <td>
                            {Number(el.montant_ht.toString().replace(/\s/g, ""))
                              .toFixed(3)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}{" "}
                          </td>

                          <td>{el.client}</td>
                          <td>{el.code_facture}</td>
                          <td>{el.numero}</td>
                        </tr>
                        <tr>
                          <td>{el.date_creation}</td>
                          {el.type == "fournisseur" ? <td>AC</td> : <td>VN</td>}

                          {el.type == "fournisseur" ? (
                            <td>{GeneralTvaD(el.idclient)}</td>
                          ) : (
                            <td>{GeneralTvaC(el.idclient)}</td>
                          )}

                          <td>- -</td>
                          {el.type == "fournisseur" ? <td>D</td> : <td>C</td>}

                          <td>
                            {Number(
                              el.montant_tva
                                .toString()
                                .replace(/\s/g, "")
                                .replace(/\,/g, ".")
                            )
                              .toFixed(3)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                          </td>

                          <td>{el.client}</td>
                          <td>{el.code_facture}</td>
                          <td>{el.numero}</td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            ) : formats.formatType == "sig" ? (
              //****************format sig ******************
              <table
                id="excel"
                className="table table-bordered table-hover small"
              >
                <thead class="thead-light">
                  <tr>
                    <th width="200">{t('EcritureComptable.sig_DATE')}  </th>
                    <th width="200">{t('EcritureComptable.sig_LIBELLE')}</th>
                    <th width="200">{t('EcritureComptable.sig_JOURNAL')} </th>
                    <th width="200">{t('EcritureComptable.sig_ncompte')}</th>
                    <th width="200">{t('EcritureComptable.sig_MONTANT')}</th>
                    <th width="200">{t('EcritureComptable.sig_ncompte')}</th>
                    <th width="200">{t('EcritureComptable.sig_MONTANT')} </th>
                  </tr>
                </thead>

                {ecriturecomptables.length &&
                  ecriturecomptables(s, e).map((el) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{el.date_creation}</td>

                          <td>{el.client}</td>
                          {el.type == "fournisseur" ? <td>AC</td> : <td>VN</td>}
                          {el.type == "fournisseur" ? (
                            <td>{el.categorie}</td>
                          ) : (
                            <td>411000</td>
                          )}

                          {el.type == "fournisseur" ? (
                            <td>
                              {Number(
                                el.montant_ht.toString().replace(/\s/g, "")
                              )
                                .toFixed(3)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}{" "}
                            </td>
                          ) : (
                            <td>
                              {Number(
                                el.montant_ttc.toString().replace(/\s/g, "")
                              )
                                .toFixed(3)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}{" "}
                            </td>
                          )}
                          {el.type == "fournisseur" ? (
                            <td>401000</td>
                          ) : (
                            <td>{el.categorie}</td>
                          )}
                          {el.type == "fournisseur" ? (
                            <td>
                              {Number(
                                el.montant_ttc.toString().replace(/\s/g, "")
                              )
                                .toFixed(3)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                            </td>
                          ) : (
                            <td>
                              {Number(
                                el.montant_ht.toString().replace(/\s/g, "")
                              )
                                .toFixed(3)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                            </td>
                          )}
                        </tr>
                        <tr>
                          <td>{el.date_creation}</td>

                          <td>{el.client}</td>
                          {el.type == "fournisseur" ? <td>AC</td> : <td>VN</td>}
                          {el.type == "fournisseur" ? (
                            <td>{GeneralTvaD(el.idclient)}</td>
                          ) : (
                            <td>411000</td>
                          )}

                          {el.type == "fournisseur" ? (
                            <td>
                              {Number(
                                el.montant_tva.toString().replace(/\s/g, "")
                              )
                                .toFixed(3)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}{" "}
                            </td>
                          ) : (
                            <td>
                              {Number(
                                el.montant_ttc.toString().replace(/\s/g, "")
                              )
                                .toFixed(3)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}{" "}
                            </td>
                          )}
                          {el.type == "fournisseur" ? (
                            <td>401000</td>
                          ) : (
                            <td>{GeneralTvaC(el.idclient)}</td>
                          )}

                          {el.type == "fournisseur" ? (
                            <td>
                              {Number(
                                el.montant_ttc.toString().replace(/\s/g, "")
                              )
                                .toFixed(3)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                            </td>
                          ) : (
                            <td>
                              {Number(
                                el.montant_tva.toString().replace(/\s/g, "")
                              )
                                .toFixed(3)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                            </td>
                          )}
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            ) : (
              <table className="table table-bordered table-hover small">
                <thead class="thead-light text-center">
                  <tr>
                    <th width="1500">
                    {t('EcritureComptable.message')}
                      
                    </th>
                  </tr>
                </thead>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = function (store) {
  console.log(store.facture);

  return {
    facture: store.facture.facture,
    exercice: store.exercice.Exercice,
    Plans: store.plans.Plans,
    client: store.client.Client,
  };
};
export default connect(mapStateToProps, {
  GetallFacture,
  Getallexercice,
  getPlan,
  Getallclient,
  getoneclient,
})(EcritureComptable);
