import React, { useEffect } from "react";
import Header from "../components/menu/header";
import Menu from "../components/menu/menu";
import { Line, Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { GetallFacture } from "../action/factureaction";
import { useTranslation } from "react-i18next";
let dateTab = [
  { date: "01", label: "janvier" },
  { date: "02", label: "fevrier" },
  { date: "03", label: "mars" },
  { date: "04", label: "avril" },
  { date: "05", label: "mai" },
  { date: "06", label: "juin" },
  { date: "07", label: "juillet" },
  { date: "08", label: "aout" },
  { date: "09", label: "septembre" },
  { date: "10", label: "october" },
  { date: "11", label: "novembre" },
  { date: "12", label: "décembre" },
];
let tabenarabe = [
  { date: "01", label: " ْيَنَايِر" },
  { date: "02", label: "ْفَبْرَايِر" },
  { date: "03", label: "مَارِسْ" },
  { date: "04", label: "أَبْرِيلْ" },
  { date: "05", label: "مَايُو" },
  { date: "06", label: "يُونْيُو" },
  { date: "07", label: "يُولِيُو" },
  { date: "08", label: "أَغُسْطُسْ" },
  { date: "09", label: "سِبْتَمْبَر" },
  { date: "10", label: "أُكْتُوبَرْ" },
  { date: "11", label: "نُوفَمْبَرْ" },
  { date: "12", label: "دِيسَمْبَرْ" },
];
function Dashboard(props) {
  const events = [
<<<<<<< HEAD
    { id: "1", description: "Déclaration Mensuelle du mois de Décembre pour les PP", descriptionarabe:"التصريح الشهري لشهر ديسمبر للأفراد" , date: "15-01-" },
    { id: "2", description: "CNSS - Déclaration 4 Trim 4",descriptionarabe:"" , date: "15-01-" },
    { id: "3", description: "Déclaration Mensuelle du mois de Décembre pour les PM",descriptionarabe:"التصريح الشهري لشهر ديسمبر للشركات", date: "21-01-" },
    { id: "4", description: "Dépôt Déclaration Appurement BC",descriptionarabe:"", date: "28-01-" },
    { id: "5", description: "Déclaration Mensuelle du mois de Janvier pour les PP",descriptionarabe:"التصريح الشهري لشهر يناير للأفراد", date: "15-02-" },
    { id: "6", description: "Déclaration annuelle de l\'impôt sur le revenue des PP",descriptionarabe:"", date: "25-02-" },
    { id: "7", description: "Déclaration de la plus value de cession des actions et parts sociales non rattachées au bilan",descriptionarabe:"", date: "25-02-" },
    { id: "8", description: "Déclaration Mensuelle du mois de Janvier pour les PM",descriptionarabe:"التصريح الشهري لشهر يناير للشركات", date: "28-02-" },
   { id: "9", description: "`Vignettes PP (Numéros paires)",descriptionarabe:" للأفراد المصغرات ", date: "05-03-" },
  { id: "10", description: "Déclaration Mensuelle du mois de Février pour les PP",descriptionarabe:"التصريح الشهري لشهر ْفَبْرَايِر للأفراد", date: "15-03-" },
  { id: "11", description: "La déclaration de l'impôt sur les sociétés et de l'avance due par les sociétés de personnes ou assimilées",descriptionarabe:"", date: "25-03-" },
  { id: "12", description: "Déclaration Mensuelle du mois de Février pour les PM", descriptionarabe:"التصريح الشهري لشهر ْفَبْرَايِر للشركات",date: "28-03-" },
  { id: "13", description: "Vignettes PP(numéros impaires)",descriptionarabe:"", date: "5-04-" },
  { id: "14", description: "Déclaration Mensuelle du mois de Mars pour les PP", descriptionarabe:"التصريح الشهري لشهر مَارِسْ للأفراد",date: "15-04-" },
  { id: "15", description: "CNSS - Déclaration 1 Trim 1",descriptionarabe:"خلاص الصندوق الوطني للضمان الاجتماعي للثلاثية الاولى", date: "15-04-" },
  { id: "16", description: "Déclaration annuelle de l'impôt sur le revenu des commerçants y compris les personnes soumises au régime forfaitaire",descriptionarabe:"تصريح ضريبة الدخل السنوي للمتداولين بما في ذلك الأشخاص الخاضعين لنظام السعر الثابت", date: "25-04-" },
  { id: "17", description: "Déclaration Mensuelle du mois de Mars pour les PM",descriptionarabe:"التصريح الشهري لشهر مَارِسْ للشركات", date: "28-04-" },
  { id: "18", description: "déclaration d'employeurs",descriptionarabe:"تصريح صاحب العمل", date: "30-04-" },
  {
    description: `Vignettes (voitures de locations ou voitures aquises dans le cadre d'un contrat de leasing)`,
    descriptionarabe:"تأجير السيارات المشتراة بموجب عقد إيجار",
    id: "19",
    date: "05-05-"
   },
  {
    description: `Déclaration Mensuelle du mois d'Avril pour les PP`,
    descriptionarabe:"التصريح الشهري لشهر ابريل للأفراد",
    id: "20",
    date: "15-05-"
  },
  {
    description: `Déclaration annuelle de l'impôt sur le revenu 
    ( industruels, prestataires de services et métiers non commerciales y compris les Personnes les soumises au régime forfaitaire`,
    descriptionarabe:"إقرار ضريبة الدخل السنوي",
    id:"21",
    date: "25-05-"
 
  },
  {
    description: `Déclaration Mensuelle du mois d'Avril pour les PM`,
    descriptionarabe:"التصريح الشهري لشهر ابريل للشركات",
    id:"22",
    date: "15-06-",
  },
  {
    description: `Déclaration de l'impôt sur les sociétés`,
    id:"23",
    date: "25-06-",
    descriptionarabe:" إقرار ضرائب الشركات",
  },

  {
    description: `Déclaration du premier accompte provisionnel PP`,
    descriptionarabe:"إقرار الدفعة المؤقتة الأولى للشخص الطبيعي",
    id:"24",
    date: "25-06-",
    descriptionarabe:" إقرار ضرائب الشركات",
  },
  {
    description: `Déclaration du premier accompte provisionnel pour les PM`,
    descriptionarabe:"إقرار الدفعة المؤقتة الأولى الشخص المعنوي ",
    id:"24",
    date: "28-06-",
  },
  {
    description: `Déclaration Mensuelle du mois de Mai pour les PM`,
    descriptionarabe:"التصريح الشهري لشهر مايو للأشخاص الاعتباريين",
    id:"25",
    date: "28-06-",

  },
  {
    description: `Déclaration Mensuelle du mois de Juin pour les PP`,
    descriptionarabe:"التصريح الشهري لشهر يونيو للأفراد",
    id:"26",
    date: "15-07-",
  },
  {
    description: `CNSS - Déclaration 2 Trim 2 `,
    descriptionarabe:"الصندوق الوطني للضمان الاجتماعي. - الإعلان 2 تريم 2",
    id:"27",
    date: "15-07-",
    bymonth: 7,
    bymonthday: 15,

  },
  {
    description: `IRPP (artisanat)`,
    descriptionarabe:"ضَرِيبَةُ الدَّخْل (حِرَف)",
    id:"27",
    date: "25-07-"
  },
  {
    description: `Déclaration Mensuelle du mois de Juin pour les PM`,
    id:"28",
    date: "28-07-"
  },
  {
    description: 'Dépôt Déclaration Appurement BC ',
    id:"29",
    date: "28-07-"
  },
  {
    description: `Déclaration Mensuelle du mois de Juillet pour les PP`,
    id:"30",
    date: "15-08-"
  },
  {
    description: `IRPP (agriculture et pêche)`,
    id:"31",
    date: "25-08-"
  },
  {
    description: `Déclaration Mensuelle du mois de Juillet pour les PM`,
    id:"32",
    date: "28-08-"
  },
  {
    description: `Déclaration Mensuelle du mois de Août pour les PP`,
    id:"33",
    date: "15-09-"
  },
  {
    description: `Déclaration du deuxième accompte provisionnel PP`,
    id:"34",
    date: "25-09-"

  },
  {
    description: `Déclaration du deuxième accompte provisionnel PM`,
    id:"35",
    date: "28-09-"
  },
  {
    description: `Déclaration Mensuelle du mois de Août pour les PM`,
    id:"36",
    date: "28-09-"
  },
  {
    description: `Déclaration Mensuelle du mois de Septembre pour les PP`,
    id:"37",
    date: "15-10-"
  },
  {
    description: `CNSS - Déclaration 3 Trim 3 `,
    id:"38",
    date: "15-10-"

  },
  {
    description: `Déclaration Mensuelle du mois de Septembre pour les PM`,
    id:"39",
    date: "28-10-"

  },
  {
    description: 'Dépôt Déclaration Appurement BC ',
    id:"40",
    date: "28-10-"
  },
  {
    description: `Déclaration Mensuelle du mois d'Octobre pour les PP`,
    id:"41",
    date: "15-11-"
  },
  {
    description: `Déclaration Mensuelle du mois d'Octobre pour les PM`,
    id:"42",
    date: "28-11-"
  },

  {
    description: `Déclaration Mensuelle du mois de Novembre pour les PP`,
    id:"43",
    date: "15-12-"
  }

];
=======
    {
      id: "1",
      description: "Déclaration Mensuelle du mois de Décembre pour les PP",
      descriptionarabe: "التصريح الشهري لشهر ديسمبر للأفراد",
      date: "15-01-",
    },
    {
      id: "2",
      description: "CNSS - Déclaration 4 Trim 4",
      descriptionarabe: "",
      date: "15-01-",
    },
    {
      id: "3",
      description: "Déclaration Mensuelle du mois de Décembre pour les PM",
      descriptionarabe: "التصريح الشهري لشهر ديسمبر للشركات",
      date: "21-01-",
    },
    {
      id: "4",
      description: "Dépôt Déclaration Appurement BC",
      descriptionarabe: "",
      date: "28-01-",
    },
    {
      id: "5",
      description: "Déclaration Mensuelle du mois de Janvier pour les PP",
      descriptionarabe: "التصريح الشهري لشهر يناير للأفراد",
      date: "15-02-",
    },
    {
      id: "6",
      description: "Déclaration annuelle de l'impôt sur le revenue des PP",
      descriptionarabe: "",
      date: "25-02-",
    },
    {
      id: "7",
      description:
        "Déclaration de la plus value de cession des actions et parts sociales non rattachées au bilan",
      descriptionarabe: "",
      date: "25-02-",
    },
    {
      id: "8",
      description: "Déclaration Mensuelle du mois de Janvier pour les PM",
      descriptionarabe: "التصريح الشهري لشهر يناير للشركات",
      date: "28-02-",
    },
    {
      id: "9",
      description: "`Vignettes PP (Numéros paires)",
      descriptionarabe: " للأفراد المصغرات ",
      date: "05-03-",
    },
    {
      id: "10",
      description: "Déclaration Mensuelle du mois de Février pour les PP",
      descriptionarabe: "التصريح الشهري لشهر ْفَبْرَايِر للأفراد",
      date: "15-03-",
    },
    {
      id: "11",
      description:
        "La déclaration de l'impôt sur les sociétés et de l'avance due par les sociétés de personnes ou assimilées",
      descriptionarabe: "",
      date: "25-03-",
    },
    {
      id: "12",
      description: "Déclaration Mensuelle du mois de Février pour les PM",
      descriptionarabe: "التصريح الشهري لشهر ْفَبْرَايِر للشركات",
      date: "28-03-",
    },
    {
      id: "13",
      description: "Vignettes PP(numéros impaires)",
      descriptionarabe: "",
      date: "5-04-",
    },
    {
      id: "14",
      description: "Déclaration Mensuelle du mois de Mars pour les PP",
      descriptionarabe: "التصريح الشهري لشهر مَارِسْ للأفراد",
      date: "15-04-",
    },
    {
      id: "15",
      description: "CNSS - Déclaration 1 Trim 1",
      descriptionarabe: "خلاص الصندوق الوطني للضمان الاجتماعي للثلاثية الاولى",
      date: "15-04-",
    },
    {
      id: "16",
      description:
        "Déclaration annuelle de l'impôt sur le revenu des commerçants y compris les personnes soumises au régime forfaitaire",
      descriptionarabe:
        "تصريح ضريبة الدخل السنوي للمتداولين بما في ذلك الأشخاص الخاضعين لنظام السعر الثابت",
      date: "25-04-",
    },
    {
      id: "17",
      description: "Déclaration Mensuelle du mois de Mars pour les PM",
      descriptionarabe: "التصريح الشهري لشهر مَارِسْ للشركات",
      date: "28-04-",
    },
    {
      id: "18",
      description: "déclaration d'employeurs",
      descriptionarabe: "تصريح صاحب العمل",
      date: "30-04-",
    },
  ];
>>>>>>> 48607a93e216d91e5a1b4ba1f8ff63054de35698

  let now = new Date();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    props.GetallFacture();
  }, []);
  const calcul_tvacollecter = () => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "client" && el.validation == true)
        .length > 0
    ) {
      let tvaCollecte = props.facture.filter(
        (el) => el.type == "client" && el.validation == true
      );
      if (tvaCollecte.length > 0) {
        tvaCollecte = tvaCollecte
          .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));
        return Number(tvaCollecte.toString().replace(/\s/g, ""))
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      } else return 0.0;
    }
  };
  const calcul_tvadudectible = () => {
    if (
      props.facture.length > 0 &&
      props.facture.filter(
        (el) => el.type == "fournisseur" && el.validation == true
      ).length > 0
    ) {
      let tvaDeductible = props.facture.filter(
        (el) => el.type == "fournisseur" && el.validation == true
      );
      if (tvaDeductible.length > 0) {
        tvaDeductible = tvaDeductible
          .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));
        return Number(tvaDeductible.toString().replace(/\s/g, ""))
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      }
    } else return 0.0;
  };
  const calcul_credit = () => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "client" && el.validation == true)
        .length > 0
    ) {
      let calCredit = props.facture.filter(
        (el) => el.type == "client" && el.validation == true
      );
      if (calCredit.length > 0) {
        calCredit = calCredit
          .map((el) => el.montant_ttc.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));
        return Number(calCredit.toString().replace(/\s/g, ""))
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      } else return 0.0;
    }
  };
  const calcul_debit = () => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "fournisseur").length > 0
    ) {
      let calDebit = props.facture.filter(
        (el) => el.type == "fournisseur" && el.validation == true
      );
      if (calDebit.length > 0) {
        calDebit = calDebit
          .map((el) => el.montant_ttc.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));
        return Number(calDebit.toString().replace(/\s/g, ""))
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      } else return 0.0;
    }
  };
  const calcul_DMI = (date) => {
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let years = date.getFullYear();
    let compare = `${month}/${years}`;

    let tabcollecter = props.facture.filter(
      (el) => el.type == "client" && el.date_creation.includes(compare)
    );
    let tabdudectible = props.facture.filter(
      (el) => el.type == "fournisseur" && el.date_creation.includes(compare)
    );
    if (tabcollecter.length > 0 && tabdudectible.length > 0) {
      let datacollecter = tabcollecter
        .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
        .filter(function (x) {
          return x !== undefined;
        })
        .reduce((a, b) => Number(a) + Number(b));
      let datadudectible = tabdudectible
        .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
        .filter(function (x) {
          return x !== undefined;
        })
        .reduce((a, b) => Number(a) + Number(b));
      let result = datacollecter - datadudectible;
      return Number(result.toString().replace(/\s/g, ""))
        .toFixed(3)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    } else if (tabcollecter.length > 0) {
      let datacollecter = tabcollecter
        .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
        .filter(function (x) {
          return x !== undefined;
        })
        .reduce((a, b) => Number(a) + Number(b));
      return Number(datacollecter.toString().replace(/\s/g, ""))
        .toFixed(3)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    } else if (tabdudectible.length > 0) {
      let datadudectible = tabdudectible
        .map((el) => el.montant_tva.replace(/\,/g, ".").replace(/\s/g, ""))
        .filter(function (x) {
          return x !== undefined;
        })
        .reduce((a, b) => Number(a) + Number(b));
      return -Number(datadudectible.toString().replace(/\s/g, ""))
        .toFixed(3)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    } else return 0.0;
  };

  const calcul_montantTTC_fournisseur = (date) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "fournisseur").length > 0
    ) {
      let calDebit = props.facture
        .filter((el) => el.type == "fournisseur" && el.validation == true)
        .filter((el) => el.date_creation.substr(3, 2) == date);

      if (calDebit.length > 0) {
        calDebit = calDebit
          .map((el) => el.montant_ttc.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));
      }

      return Number(calDebit.toString().replace(/\s/g, ""))
        .toFixed(3)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    }
  };
  const calcul_montantTTC_client = (date) => {
    if (
      props.facture.length > 0 &&
      props.facture.filter((el) => el.type == "client").length > 0
    ) {
      let calCredit = props.facture
        .filter((el) => el.type == "client" && el.validation == true)
        .filter((el) => el.date_creation.substr(3, 2) == date);
      if (calCredit.length > 0) {
        calCredit = calCredit
          .map((el) => el.montant_ttc.replace(/\,/g, ".").replace(/\s/g, ""))
          .filter(function (x) {
            return x !== undefined;
          })
          .reduce((a, b) => Number(a) + Number(b));
      }

      return Number(calCredit.toString().replace(/\s/g, ""))
        .toFixed(3)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    }
  };

  const dataLine = {
    labels:
      i18n.language === "fr-FR" || i18n.language === "en"
        ? dateTab.map((el) => {
            return el.label;
          })
        : tabenarabe.map((el) => {
            return el.label;
          }),
    datasets: [
      {
        label:
          i18n.language === "fr-FR"
            ? "Revenus"
            : i18n.language === "en"
            ? "Income"
            : "دخل",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(111,179,87,1)",
        borderColor: "rgba(111,179,87,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(111,179,87,1)",
        pointBackgroundColor: "rgba(111,179,87,1)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(111,179,87,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dateTab.map((el) => {
          return calcul_montantTTC_client(el.date);
        }),
      },
      {
        label:
          i18n.language === "fr-FR"
            ? "Charges"
            : i18n.language === "en"
            ? "expenses"
            : " نفقات",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(241,95,89,1)",
        borderColor: "rgba(241,95,89,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(241,95,89,1)",
        pointBackgroundColor: "rgba(241,95,89,1)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(241,95,89,1)",
        pointHoverBorderColor: "rgba(241,95,89,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dateTab.map((el) => {
          return calcul_montantTTC_fournisseur(el.date);
        }),
      },
    ],
  };

  const handelchange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="dashbord">
        <form>
          <div className="">
            <div className="d-flex justify-content-around">
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-green ">
                  <div className="inner">
                    <h3>{calcul_credit()}</h3>

                    <p>{t("Dashboard.Totalrevenues")}</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-sort-amount-down-alt"
                      style={{ fontSize: "40px" }}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-red  ">
                  <div className="inner">
                    <h3>{calcul_debit()}</h3>

                    <p> {t("Dashboard.Totalcharge")}</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-sort-amount-up-alt"
                      style={{ fontSize: "40px" }}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-yellow">
                  <div className="inner">
                    <h3>{calcul_tvadudectible()}</h3>

                    <p>{t("Dashboard.Total_tvaDecuct")}</p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-balance-scale-right"
                      style={{ fontSize: "40px" }}
                    ></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="small-box  bg-blue ">
                  <div className="inner">
                    <h3>{calcul_tvacollecter()}</h3>

                    <p> {t("Dashboard.Total_tvaCollectee")} </p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-balance-scale-left"
                      style={{ fontSize: "40px" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <br />
        <br />
        <div className="d-flex justify-content-around">
          <div className="col-7">
            <Bar data={dataLine} options={{ responsive: true }} />
          </div>

          <div className="col-5">
            <div className="row">
              <div
                className="col-8"
                style={{
                  marginTop: "-50px",
                  marginLeft: "90px",
                }}
              >
                <div
                  className="small-box bg-orange"
                  style={{ minHeight: "4cm" }}
                >
                  <div className="inner">
                    <h3>{calcul_DMI(new Date())}</h3>

                    <p>{t("Dashboard.DMIEstimation")} </p>
                  </div>
                  <div className="icon">
                    <i
                      className="fa fa-calendar-alt"
                      style={{ fontSize: "40px" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-8"
                style={{ marginTop: "30px", marginLeft: "90px" }}
              >
                <div className="card">
                  <div className="card-header bg-primary">
                    <h4 className="card-title ">
                      {" "}
                      {t("Dashboard.Evennements")}
                    </h4>
                  </div>
                  <div>
                    <div>
                      {events
                        .filter(
                          (el) => el.date.substr(3, 2) == now.getMonth() + 1
                        )
                        .map((el) => {
                          return (
                            <div className="external-event ">
                              {el.date + now.getFullYear()}{" "}
                              {i18n.language === "fr-FR" ||
                              i18n.language === "en"
                                ? el.description
                                : el.descriptionarabe}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
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
  };
};
export default connect(mapStateToProps, { GetallFacture })(Dashboard);
