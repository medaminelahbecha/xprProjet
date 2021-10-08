import React, { useState, useEffect } from "react";
import Header from "../components/menu/header";
import Menu from "../components/menu/menu";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { FormControl } from "react-bootstrap";
import moment from "moment";
import { connect } from "react-redux";
import { GetallFacture } from "../action/factureaction";
import { Getallexercice } from "../action/dateexercice";
import { useTranslation } from 'react-i18next'
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

let dateTab = [
  { date: "01", label: "01" },
  { date: "02", label: "02" },
  { date: "03", label: "03" },
  { date: "04", label: "04" },
  { date: "05", label: "05" },
  { date: "06", label: "06" },
  { date: "07", label: "07" },
  { date: "08", label: "08" },
  { date: "09", label: "09" },
  { date: "10", label: "10" },
  { date: "11", label: "11" },
  { date: "12", label: "12" },
];
function Declaration(props) {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    props.GetallFacture();
  }, []);
  useEffect(() => {
    props.Getallexercice();
  }, []);
  //total tva Collecte
  const calcul_tvacollecter = (dateDebut, dateFin) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "client").length > 0
    ) {
      let tvacollecter = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
        )
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
        );

      if (tvacollecter.length > 0) {
        console.log(
          "test",
          tvacollecter.map((el) => el.montant_tva)
        );
        let tabdebit = tvacollecter

          .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });
        if (tabdebit.length > 0) {
          tvacollecter = tabdebit.map((item) =>
            item.replace(/\,/g, ".").replace(/\s/g, "")
          );

          let final = tvacollecter.reduce((a, b) => Number(a) + Number(b));

          return Number(final.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //total tvaDeductible
  const calcul_tvadudectible = (dateDebut, dateFin) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "fournisseur").length > 0
    ) {
      let tvaDeductible = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "fournisseur")
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
        )
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
        );

      if (tvaDeductible.length > 0) {
        console.log(
          "test",
          tvaDeductible.map((el) => el.montant_ht)
        );
        let tabdebit = tvaDeductible

          .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });
        if (tabdebit.length > 0) {
          tvaDeductible = tabdebit.map((item) =>
            item.replace(/\,/g, ".").replace(/\s/g, "")
          );

          let final = tvaDeductible.reduce((a, b) => Number(a) + Number(b));

          return Number(final.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //total credit
  const calcul_credit = (dateDebut, dateFin) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "client").length > 0
    ) {
      let calCredit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
        )
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
        );
      if (calCredit.length > 0) {
        console.log(
          "test",
          calCredit.map((el) => el.montant_ht)
        );
        let tabdebit = calCredit

          .map((el) => el.montant_ht.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });
        if (tabdebit.length > 0) {
          calCredit = tabdebit.map((item) =>
            item.replace(/\,/g, ".").replace(/\s/g, "")
          );

          let final = calCredit.reduce((a, b) => Number(a) + Number(b));

          return Number(final.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //total debit
  const calcul_debit = (dateDebut, dateFin) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "fournisseur").length > 0
    ) {
      let calDebit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "fournisseur")
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
        )
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
        );
      if (calDebit.length > 0) {
        console.log(
          "test",
          calDebit.map((el) => el.montant_ht)
        );
        let tabdebit = calDebit

          .map((el) => el.montant_ht.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });
        if (tabdebit.length > 0) {
          calDebit = tabdebit.map((item) =>
            item.replace(/\,/g, ".").replace(/\s/g, "")
          );

          let final = calDebit.reduce((a, b) => Number(a) + Number(b));

          return Number(final.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //calcul montant ht par mois pour client
  const calcul_montantHt_client = (date) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "client").length > 0
    ) {
      let calDebit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")
        .filter(
          (el) =>
            Number(el.date_creation.substr(6, 4)) ==
            Number(new Date(start).getFullYear())
        )
        .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));

      if (calDebit.length > 0) {
        let calDebits = calDebit
          .map((el) => el.montant_ht.replace(/\,/g, "."))
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));
        //.replace(/\,/g,'.').replace(/\s/g, '')
        console.log("dev", calDebits);
        return Number(calDebits.toString().replace(/\s/g, ""))
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      } else return "0.000";
    }
  };
  //calcul montant ht par mois pour fournisseur
  const calcul_montantTTC_fournisseur = (date) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "fournisseur").length > 0
    ) {
      let calDebit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "fournisseur")
        .filter(
          (el) =>
            Number(el.date_creation.substr(6, 4)) ==
            Number(new Date(start).getFullYear())
        )
        .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));
      if (calDebit.length > 0) {
        let Debit = calDebit
          .map((el) => el.montant_ht.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });

        if (Debit.length > 0) {
          let resdebit = Debit.reduce(
            (a, b) =>
              Number(a) + Number(b.replace(/\,/g, ".").replace(/\s/g, ""))
          );

          return Number(resdebit.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //calcul TVA deductible par mois pour fournisseur
  const calcul_TvaD_fournisseur = (date) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "fournisseur").length > 0
    ) {
      let calTvaD = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "fournisseur")
        .filter(
          (el) =>
            Number(el.date_creation.substr(6, 4)) ==
            Number(new Date(start).getFullYear())
        )
        .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));
      if (calTvaD.length > 0) {
        calTvaD = calTvaD.map((el) =>
          el.montant_tva.replace(/\,/g, ".").replace(/\s/g, "")
        );
        let resulttvaD = calTvaD
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));

        return Number(resulttvaD)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      } else return "0.000";
    }
  };
  //calcul TVA collecte par mois pour client
  const calcul_TvaC_client = (date) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "client").length > 0
    ) {
      let calTvaC = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")
        .filter(
          (el) =>
            Number(el.date_creation.substr(6, 4)) ==
            Number(new Date(start).getFullYear())
        )
        .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));
      if (calTvaC.length > 0) {
        calTvaC = calTvaC
          .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));
        return Number(calTvaC.toString().replace(/\s/g, ""))
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      } else return "0.000";
    }
  };
  //calcul la diffrence de tva par mois

  const calcul_Diff_tva = (date) => {
    let calTvaC = props.facture
      .filter((el) => el.validation === true)
      .filter((el) => el.type == "client")
      .filter(
        (el) =>
          Number(el.date_creation.substr(6, 4)) ==
          Number(new Date(start).getFullYear())
      )
      .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));
    if (calTvaC.length > 0) {
      calTvaC = calTvaC
        .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
        .filter(function (x) {
          return x !== undefined;
        })
        .reduce((a, b) => Number(a) + Number(b));
    }
    let calTvaD = props.facture
      .filter((el) => el.validation === true)
      .filter((el) => el.type == "fournisseur")
      .filter(
        (el) =>
          Number(el.date_creation.substr(6, 4)) ==
          Number(new Date(start).getFullYear())
      )
      .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));
    if (calTvaD.length > 0) {
      calTvaD = calTvaD
        .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
        .filter(function (x) {
          return x !== undefined;
        })

        .reduce((a, b) => Number(a) + Number(b));
    }

    return Number(calTvaC - calTvaD)
      .toFixed(3)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  };
  //calcul recap tva reporter
  let recaptva = [];

  const calcul_tva_reporte = (date) => {
    let tvaReporte = "";
    if (date == 1) {
      if (calcul_Diff_tva(1).replace(/\,/g, ".").replace(/\s/g, "") > 0) {
        tvaReporte = 0;
        recaptva[date] = tvaReporte;
      } else {
        tvaReporte = Number(calcul_Diff_tva(1));
        recaptva[date] = tvaReporte;
      }
    } else if (
      calcul_Diff_tva(date).replace(/\,/g, ".").replace(/\s/g, "") == 0 &&
      date != 1
    ) {
      tvaReporte = Number(recaptva[date - 1]);
      recaptva[date] = tvaReporte;
      //Number(recaptva[date - 1]) + Number(calcul_Diff_tva(date));
    } else if (
      calcul_Diff_tva(date).replace(/\,/g, ".").replace(/\s/g, "") > 0 &&
      date != 1
    ) {
      if (
        Number(calcul_Diff_tva(date)) + Number(recaptva[date - 1]) < 0 &&
        date != 1
      ) {
        tvaReporte = Number(calcul_Diff_tva(date)) + Number(recaptva[date - 1]);
        recaptva[date] = tvaReporte;
      } else {
        tvaReporte = 0;
        recaptva[date] = 0;
      }
    } else if (
      calcul_Diff_tva(date).replace(/\,/g, ".").replace(/\s/g, "") < 0 &&
      date != 1
    ) {
      tvaReporte = Number(calcul_Diff_tva(date)) + Number(recaptva[date - 1]);
      recaptva[date] = tvaReporte;
    }
    console.log(recaptva);
    console.log(tvaReporte);
    return Number(tvaReporte)
      .toFixed(3)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  };

  const Excel_data_fournisseur = () => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "fournisseur").length > 0
    ) {
      let datafournisseur = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "fournisseur");
      return datafournisseur;
    }
  };

  const Excel_data_client = () => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "client").length > 0
    ) {
      let dataClient = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client");
      return dataClient;
    }
  };
  //calcul timbre par mois
  const calcul_droit_timbre = (date) => {
    if (props.facture.length > 0) {
      let calDebit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")

        .filter(
          (el) =>
            Number(el.date_creation.substr(6, 4)) ==
            Number(new Date(start).getFullYear())
        )
        .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));
      if (calDebit.length > 0) {
        let Debit = calDebit
          .map((el) => el.timbre.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });

        if (Debit.length > 0) {
          let resdebit = Debit.reduce(
            (a, b) =>
              Number(a) + Number(b.replace(/\,/g, ".").replace(/\s/g, ""))
          );

          return Number(resdebit.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //calcul total timbre
  const calcul_total_timbre = (dateDebut, dateFin) => {
    if (props.facture.length > 0) {
      let calTimbre = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
        )
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
        );
      if (calTimbre.length > 0) {
        console.log(
          "test",
          calTimbre.map((el) => el.timbre)
        );
        let tabdebit = calTimbre

          .map((el) => el.timbre.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });
        if (tabdebit.length > 0) {
          calTimbre = tabdebit.map((item) =>
            item.replace(/\,/g, ".").replace(/\s/g, "")
          );

          let final = calTimbre.reduce((a, b) => Number(a) + Number(b));

          return Number(final.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //calcul CA_TCC par mois
  const calcul_CA_tcc = (date) => {
    if (props.facture.length > 0) {
      let calDebit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")

        .filter(
          (el) =>
            Number(el.date_creation.substr(6, 4)) ==
            Number(new Date(start).getFullYear())
        )
        .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));
      if (calDebit.length > 0) {
        let Debit = calDebit
          .map((el) => el.montant_ttc.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });

        if (Debit.length > 0) {
          let resdebit = Debit.reduce(
            (a, b) =>
              Number(a) + Number(b.replace(/\,/g, ".").replace(/\s/g, ""))
          );

          return Number(resdebit.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //calcul total chiffre d'affaire
  const calcul_total_CA = (dateDebut, dateFin) => {
    if (props.facture.length > 0) {
      let calDebit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
        )
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
        );
      if (calDebit.length > 0) {
        console.log(
          "test",
          calDebit.map((el) => el.montant_ttc)
        );
        let tabdebit = calDebit

          .map((el) => el.montant_ttc.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          });
        if (tabdebit.length > 0) {
          calDebit = tabdebit.map((item) =>
            item.replace(/\,/g, ".").replace(/\s/g, "")
          );

          let final = calDebit.reduce((a, b) => Number(a) + Number(b));

          return Number(final.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //calcul TCL par mois
  const calcul_Tcl = (date) => {
    if (props.facture.length > 0) {
      let calDebit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")

        .filter(
          (el) =>
            Number(el.date_creation.substr(6, 4)) ==
            Number(new Date(start).getFullYear())
        )
        .filter((el) => Number(el.date_creation.substr(3, 2)) == Number(date));
      if (calDebit.length > 0) {
        let Debit = calDebit
          .map(
            (el) =>
              el.montant_ttc.replace(/\,/g, ".").replace(/\s/g, "") *
              Number(0.002)
          )
          .filter(function (x) {
            return x !== undefined;
          });

        if (Debit.length > 0) {
          let resdebit = Debit.reduce((a, b) => Number(a) + Number(b));

          return Number(resdebit.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  //calcul total tcl
  const calcul_total_Tcl = (dateDebut, dateFin) => {
    if (props.facture.length > 0) {
      let calDebit = props.facture
        .filter((el) => el.validation === true)
        .filter((el) => el.type == "client")
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) > dateDebut
        )
        .filter(
          (el) => new Date(moment(el.date_creation, "DD/MM/YYYY")) < dateFin
        );
      if (calDebit.length > 0) {
        console.log(
          "test",
          calDebit.map((el) => el.montant_ttc)
        );
        let tabdebit = calDebit

          .map(
            (el) =>
              el.montant_ttc.replace(/\,/g, ".").replace(/\s/g, "") *
              Number(0.002)
          )
          .filter(function (x) {
            return x !== undefined;
          });
        if (tabdebit.length > 0) {
          calDebit = tabdebit.map((item) => item);

          let final = calDebit.reduce((a, b) => Number(a) + Number(b));

          return Number(final.toString().replace(/\s/g, ""))
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else return "0.000";
    }
  };
  const Exceldata = [
    {
      columns: [
        {
          title: "REVENUS",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "CATEGORIE",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "CLIENT",
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
          title: "HT",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "TX TVA",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "TVA",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "TIMBRE",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
        {
          title: "TTC",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "5AF23B" } },
          },
        },
      ],
      data:
        Excel_data_client() &&
        Excel_data_client().map((record, index) => {
          return [
            { value: "" },
            { value: record.categorie },
            { value: record.client },
            { value: record.numero },
            { value: record.date_creation },
            { value: record.montant_ht },
            { value: record.Tva },
            { value: record.montant_tva },
            { value: record.timbre },
            { value: record.montant_ttc },
          ];
        }),
    },
    {
      ySteps: 5, //will put space of 5 rows
      columns: [
        {
          title: "CHARGE",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "CATEGORIE",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "FOURNISSEUR",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "FACTURE N°",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "DATE",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "HT",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "TX TVA",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "TVA",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "TIMBRE",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
        {
          title: "TTC",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FD4141" } },
          },
        },
      ],
      data:
        Excel_data_fournisseur() &&
        Excel_data_fournisseur().map((record, index) => {
          return [
            { value: "" },
            { value: record.categorie },
            { value: record.client },
            { value: record.numero },
            { value: record.date_creation },
            { value: record.montant_ht },
            { value: record.Tva },
            { value: record.montant_tva },
            { value: record.timbre },
            { value: record.montant_ttc },
          ];
        }),
    },
  ];

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

  let startMounth = new Date(start).getMonth() + 1;
  let endMounth = new Date(end).getMonth() + 1;
  let l = new Date(start).getTime();
  let le = new Date(end).getTime();
  console.log(l);
  console.log(le);
  console.log(le - l);
  console.log(new Date().getFullYear());

  let monthNames = [
    "",
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // 1 mois = 2592000000 mellisecondes
  const mois = (le - l) / 2592000000;
  console.log(mois);
  //liste des mois filtrer
  let dateFilter = [];

  const dateMarge = () => {
    for (let i = startMounth; i <= endMounth; i++) {
      dateFilter.push(i);
    }
    return dateFilter;
  };

  console.log(dateMarge());
  console.log(dateFilter);
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
  let s = new Date(start);
  let e = new Date(end);
  let ranges = {
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
  console.log(moment(new Date(finexer[0])).format("YYYY-MM-DD HH:mm:ss"));
  console.log(moment("2020-01-01 00:00:01"));
  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false,
    opens: "left",
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="dashbord">
        <div className="connexion">
          <p>    {t('Declaration.titel')}</p>
        </div>
        <div className="row">
          <div className="col-4">
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

          <div className="offset-md-2 col-4">
            <ExcelFile
              fileExtension="Rapport"
              element={
                <button className="btn btn-export-exel">
                  {" "}
                  <i className="fa fa-download"></i> {t('Declaration.export')}  
                </button>
              }
            >
              <ExcelSheet dataSet={Exceldata} name="client"></ExcelSheet>
            </ExcelFile>
          </div>
        </div>

        <div className="row">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h2>
                <i className="fa fa-calculator col-blue"></i> {t('Declaration.rapporttva')}
              </h2>
            </div>
            <div className="panel-body">
              {mois < 0.1 ? (
                //Rapport de TVA
                <table className="table table-bordered table-hover small">
                  <thead>
                    <tr style={{ backgroundColor: "rgba(111,179,87,1)" }}>
                      <th width="200">{t('Declaration.Vente')} </th>
                      {dateTab.length > 0 &&
                        dateTab.map((el) => {
                          return (
                            <th width="90">
                              {el.label}/{new Date().getFullYear()}
                            </th>
                          );
                        })}

                      <th width="90">{t('Declaration.total')} </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{t('Declaration.totalHT')}</th>
                      {dateTab.map((el) => {
                        return (
                          <td>
                            {calcul_montantHt_client.length &&
                              calcul_montantHt_client(el.date)}
                          </td>
                        );
                      })}

                      <td>{calcul_credit(s, e)}</td>
                    </tr>
                    <tr style={{ backgroundColor: "rgba(0,50,255,0.1)" }}>
                      <th>{t('Declaration.TVAcollectee')}</th>
                      {dateTab.map((el) => {
                        return (
                          <td>
                            {calcul_TvaC_client.length &&
                              calcul_TvaC_client(el.date)}
                          </td>
                        );
                      })}
                      <td>{calcul_tvacollecter(s, e)}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr style={{ backgroundColor: "rgba(241,95,89,1)" }}>
                      <th width="200">{t('Declaration.Achat')} </th>

                      {dateTab.map((el) => {
                        return (
                          <th width="90">
                            {el.label}/{new Date().getFullYear()}
                          </th>
                        );
                      })}

                      <th width="90">{t('Declaration.totalAchat')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th> {t('Declaration.totalHTAchat')} </th>
                      {dateTab.map((el) => {
                        return (
                          <td>
                            {calcul_montantTTC_fournisseur.length &&
                              calcul_montantTTC_fournisseur(el.date)}
                          </td>
                        );
                      })}
                      <td>{calcul_debit(s, e)}</td>
                    </tr>
                    <tr style={{ backgroundColor: "rgba(0,50,255,0.1)" }}>
                      <th> {t('Declaration.TVAdeductible')}</th>
                      {dateTab.map((el) => {
                        return (
                          <td>
                            {calcul_TvaD_fournisseur.length &&
                              calcul_TvaD_fournisseur(el.date)}
                          </td>
                        );
                      })}
                      <td>{calcul_tvadudectible(s, e)}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table table-bordered table-hover small">
                  <thead>
                    <tr style={{ backgroundColor: "rgba(111,179,87,1)" }}>
                      <th width="200">{t('Declaration.Vente')} </th>
                      {dateFilter.map((el) => {
                        return (
                          <th width="90">
                            {monthNames[el]}/{new Date(start).getFullYear()}
                          </th>
                        );
                      })}

                      <th width="90">{t('Declaration.total')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{t('Declaration.totalHT')}</th>
                      {dateFilter.map((el) => {
                        return (
                          <td>
                            {calcul_montantHt_client.length &&
                              calcul_montantHt_client(el)}
                          </td>
                        );
                      })}

                      <td>{calcul_credit(s, e)}</td>
                    </tr>
                    <tr style={{ backgroundColor: "rgba(0,50,255,0.1)" }}>
                      <th>{t('Declaration.TVAcollectee')} </th>
                      {dateFilter.map((el) => {
                        return (
                          <td>
                            {calcul_TvaC_client.length &&
                              calcul_TvaC_client(el)}
                          </td>
                        );
                      })}
                      <td>{calcul_tvacollecter(s, e)}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr style={{ backgroundColor: "rgba(241,95,89,1)" }}>
                      <th width="200">{t('Declaration.Achat')} </th>

                      {dateFilter.map((el) => {
                        return (
                          <th width="90">
                            {monthNames[el]}/{new Date(start).getFullYear()}
                          </th>
                        );
                      })}

                      <th width="90">{t('Declaration.totalAchat')} </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{t('Declaration.totalHTAchat')} </th>
                      {dateFilter.map((el) => {
                        return (
                          <td>
                            {calcul_montantTTC_fournisseur.length &&
                              calcul_montantTTC_fournisseur(el)}
                          </td>
                        );
                      })}
                      <td>{calcul_debit(s, e)}</td>;
                    </tr>
                    <tr style={{ backgroundColor: "rgba(0,50,255,0.1)" }}>
                      <th>{t('Declaration.TVAdeductible')} </th>
                      {dateFilter.map((el) => {
                        return (
                          <td>
                            {calcul_TvaD_fournisseur.length &&
                              calcul_TvaD_fournisseur(el)}
                          </td>
                        );
                      })}
                      <td>{calcul_tvadudectible(s, e)}</td>;
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h2>
                <i className="fa fa-calculator col-blue"></i> {t('Declaration.RecapTVA')} 
              </h2>
            </div>
            <div className="panel-body">
              {mois < 0.1 ? (
                //Recap TVA
                <table className="table table-bordered table-hover small">
                  <thead>
                    <tr style={{ backgroundColor: "#D794F9" }}>
                      <th width="200"> {t('Declaration.DATE')}  </th>
                      {dateTab.length > 0 &&
                        dateTab.map((el) => {
                          return (
                            <th width="90">
                              {el.label}/{new Date().getFullYear()}
                            </th>
                          );
                        })}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th> {t('Declaration.TVA')} </th>
                      {dateTab.map((el) => {
                        return <td>{calcul_Diff_tva(el.date)}</td>;
                      })}
                    </tr>
                    <tr>
                      <th> {t('Declaration.TVA_a_Payer')} </th>
                      {dateTab.map((el) => {
                        return Number(calcul_Diff_tva(el.date)) +
                          Number(calcul_tva_reporte(el.date - 1)) >=
                          0 && calcul_Diff_tva(el.date) > 0 ? (
                          <td>
                            {Number(calcul_Diff_tva(el.date)) +
                              Number(recaptva[Number(el.date - 1)])}
                          </td>
                        ) : el.date == 1 && calcul_Diff_tva(el.date) > 0 ? (
                          <td>{calcul_Diff_tva(el.date)}</td>
                        ) : (
                          <td>0.000</td>
                        );
                      })}
                    </tr>
                    <tr>
                      <th>{t('Declaration.TVAReporter')} </th>
                      {dateTab.map((el) => {
                        return Number(calcul_Diff_tva(el.date)) +
                          Number(calcul_tva_reporte(el.date - 1)) <=
                          0 ? (
                          <td>
                            {Number(
                              Number(calcul_Diff_tva(el.date)) +
                                Number(recaptva[Number(el.date - 1)])
                            )
                              .toFixed(3)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                          </td>
                        ) : (
                          <td>
                            {Number(calcul_tva_reporte(el.date))
                              .toFixed(3)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table table-bordered table-hover small">
                  <thead>
                    <tr style={{ backgroundColor: "#D794F9" }}>
                      <th width="200"> {t('Declaration.DATE')}  </th>
                      {dateFilter.map((el) => {
                        return (
                          <th width="90">
                            {monthNames[el]}/{new Date(start).getFullYear()}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th> {t('Declaration.TVA')} </th>
                      {dateFilter.map((el) => {
                        return <td>{calcul_Diff_tva(el)}</td>;
                      })}
                    </tr>
                    <tr>
                      <th> {t('Declaration.TVA_a_Payer')}</th>
                      {dateFilter.map((el) => {
                        return Number(calcul_Diff_tva(el)) +
                          Number(calcul_tva_reporte(el - 1)) >
                          0 && calcul_Diff_tva(el) > 0 ? (
                          <td>
                            {Number(calcul_Diff_tva(el)) +
                              Number(recaptva[Number(el - 1)])}
                          </td>
                        ) : (
                          <td>0.000</td>
                        );
                      })}
                    </tr>
                    <tr>
                      <th  >{t('Declaration.TVAReporter')}</th>
                      {dateFilter.map((el) => {
                        return Number(calcul_Diff_tva(el)) +
                          Number(calcul_tva_reporte(el - 1)) <
                          0 ? (
                          <td>
                            {Number(
                              Number(calcul_Diff_tva(el)) +
                                Number(recaptva[Number(el - 1)])
                            )
                              .toFixed(3)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                          </td>
                        ) : (
                          <td>
                            {Number(calcul_Diff_tva(el))
                              .toFixed(3)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h2>
                <i className="fa fa-calculator col-blue"></i> {t('Declaration.recap')} 
                
              </h2>
            </div>
            <div className="panel-body">
              {mois < 0.1 ? (
                //Recap droit de timbre
                <table className="table table-bordered table-hover small">
                  <thead>
                    <tr style={{ backgroundColor: "#BAB8B7" }}>
                      <th width="200"> {t('Declaration.recapTimbre')} </th>
                      {dateTab.length > 0 &&
                        dateTab.map((el) => {
                          return (
                            <th width="90">
                              {el.label}/{new Date().getFullYear()}
                            </th>
                          );
                        })}

                      <th width="90">{t('Declaration.recapTotal')} </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th>{t('Declaration.recapTotal')}  </th>
                      {dateTab.map((el) => {
                        return (
                          <td>
                            {calcul_droit_timbre.length &&
                              calcul_droit_timbre(el.date)}
                          </td>
                        );
                      })}
                      <td>{calcul_total_timbre(s, e)}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table table-bordered table-hover small">
                  <thead>
                    <tr style={{ backgroundColor: "#BAB8B7" }}>
                      <th width="200">{t('Declaration.recapTimbre')} </th>
                      {dateFilter.map((el) => {
                        return (
                          <th width="90">
                            {monthNames[el]}/{new Date(start).getFullYear()}
                          </th>
                        );
                      })}

                      <th width="90">{t('Declaration.recapTotal')} </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{t('Declaration.totalHT')}</th>
                      {dateFilter.map((el) => {
                        return (
                          <td>
                            {calcul_droit_timbre.length &&
                              calcul_droit_timbre(el)}
                          </td>
                        );
                      })}

                      <td>{calcul_total_timbre(s, e)}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h2>
                <i className="fa fa-calculator col-blue"></i>{t('Declaration.RecapTCL')} 
              </h2>
            </div>
            <div className="panel-body">
              {mois < 0.1 ? (
                //Recap TCL
                <table className="table table-bordered table-hover small">
                  <thead>
                    <tr style={{ backgroundColor: "#5DA6FB" }}>
                      <th width="200">{t('Declaration.DATE')}  </th>
                      {dateTab.length > 0 &&
                        dateTab.map((el) => {
                          return (
                            <th width="90">
                              {el.label}/{new Date().getFullYear()}
                            </th>
                          );
                        })}

                      <th width="90">{t('Declaration.totalAchat')} </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th> {t('Declaration.chttc')}</th>
                      {dateTab.map((el) => {
                        return (
                          <td>
                            {calcul_CA_tcc.length && calcul_CA_tcc(el.date)}
                          </td>
                        );
                      })}
                      <td>{calcul_total_CA()}</td>
                    </tr>
                    <tr>
                      <th>{t('Declaration.tcl')}</th>
                      {dateTab.map((el) => {
                        return (
                          <td>{calcul_Tcl.length && calcul_Tcl(el.date)}</td>
                        );
                      })}
                      <td>{calcul_total_Tcl()}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table table-bordered table-hover small">
                  <thead>
                    <tr style={{ backgroundColor: "#5DA6FB" }}>
                      <th width="200">{t('Declaration.DATE')} </th>
                      {dateFilter.map((el) => {
                        return (
                          <th width="90">
                            {monthNames[el]}/{new Date(start).getFullYear()}
                          </th>
                        );
                      })}

                      <th width="90">{t('Declaration.recapTotal')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th> {t('Declaration.chttc')} </th>
                      {dateFilter.map((el) => {
                        return (
                          <td>{calcul_CA_tcc.length && calcul_CA_tcc(el)}</td>
                        );
                      })}

                      <td>{calcul_total_CA(s, e)}</td>
                    </tr>
                    <tr>
                      <th>TCL</th>
                      {dateFilter.map((el) => {
                        return <td>{calcul_Tcl.length && calcul_Tcl(el)}</td>;
                      })}

                      <td>{calcul_total_Tcl(s, e)}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = function (store) {

  return {
    facture: store.facture.facture,
    exercice: store.exercice.Exercice,
  };
};
export default connect(mapStateToProps, { GetallFacture, Getallexercice })(
  Declaration
);
