import React, { useState, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";
import { GetallFacture } from "../../action/factureaction";
import { connect } from "react-redux";
import ReactExport from "react-data-export";
import { useTranslation } from 'react-i18next'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
function DonnesComptabilite(props) {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    props.GetallFacture();
  }, []);
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
  };
  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false,
    opens: "left",
  };
//brouillard de caisse
  const Excel_Brouillard_de_caisse = (dateDebut, dateFin) => {
    if (props.facture.length > 0) {
      let caisse = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.methode_payement == "Espèce")
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
        )
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
        );

      return caisse;
    }
  };
  const Exceldata = [
    {
      columns: [
        {
          title: "R/C",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "ID Facture",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "Four/Client",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "FACTURE N°",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "DATE",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "Debit",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "Credit",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
      ],
      data:
        Excel_Brouillard_de_caisse() &&
        Excel_Brouillard_de_caisse(s, e).map((record, index) => {
          return [
            { value: record.type == "fournisseur" ? "C" : "R" },
            { value: record.code_facture },
            { value: record.client },
            { value: record.numero },
            { value: record.date_creation },
            { value: record.type == "fournisseur" ? "--" : record.montant_ttc },
            { value: record.type == "fournisseur" ? record.montant_ttc : "--" },
          ];
        }),
    },
  ];

  return (
    <div>
      <Header />
      <Menu />
      <div className="parametre">
        <p className="connexion">
          <b>{t('DonnesComptabilite.titel')} </b>
        </p>
        <hr className="hr1" />
        <br />
        <div className="row ">
          
          <div className="col col-lg-4">
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
                  type="text"
                  placeholder="Enter text"
                  style={{ cursor: "pointer" }}
                  value={label}
                />
              </div>
            </DateTimeRangeContainer>
          </div>
        </div>
        <div className="col-sm-10">
          <div className="row text-center">   

            <div className="offset-md-2 col-sm-4">
              <ExcelFile
                fileExtension="Rapport"
                element={
                  <button className="btn btn-block btn-lg btn btn-outline-success setting-index-btn">
                    {"  "}
                    <i className="fa fa-download fa-2x"></i>
                     <br />
                    <br />
                    {t('DonnesComptabilite.b.caisse')}
                 
                  </button>
                }
              >
                <ExcelSheet dataSet={Exceldata} name="client"></ExcelSheet>
              </ExcelFile>
            </div>
            <div className="col-sm-4">
              <button
                className="btn btn-block btn-lg btn btn-outline-success setting-index-btn"
               
              >
                <i className="fa fa-file-alt fa-2x"></i>
                <br />
                <br />
                {t('DonnesComptabilite.todo')}
              </button>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
const mapStateToProps = function (store) {
  return {
    facture: store.facture.facture,
  };
};
export default connect(mapStateToProps, { GetallFacture })(DonnesComptabilite);
