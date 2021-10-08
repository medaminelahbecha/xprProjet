import React, { useState, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import Dropzone from 'react-dropzone'
import { postFacture } from "../../action/factureaction";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {  useHistory } from "react-router-dom";
//import Axios from 'axios'
import { useTranslation } from 'react-i18next'
function ScanerFacture(props) {
  const history = useHistory();
  const { addToast } = useToasts();
  const [value, setValue] = useState("");
  const handleChange = (value) => {
    setValue(value);
  };
  const { t, i18n } = useTranslation()
  const [selectedFile, setSelectedFile] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [disabled , setdisabled] = useState(false);
  const [send , setsend] = useState(false)
  const [file, setfile] = useState([])

  const changeHandler = (event) => {
    setSelectedFile(event);
    setIsSelected(true);
    setfile({file : window.URL.createObjectURL(event[0])})
    console.log(event)
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    if(value=="" )
    { addToast("choisir  type de facture", {
      appearance: "error",
      autoDismiss: true,
    });
  }

  else {
    setdisabled(true)
    // Create an object of formData
    const data = new FormData();
    // Update the formData object
    data.append("file", selectedFile[0]);
    data.append('facture', value);
    props.postFacture(data);
    setSelectedFile([])
    setsend(true)
  }
  };

  useEffect(() => {
    console.log("counter updated");
    if (props.facture == "facture added!") {
      history.push("/piececomptable");
    }
  }, [props.facture]);

  return (
    <>
      <Header />
      <Menu />
      <div
        className="parametre"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        
          <div className="container d-flex ">
           
                <div className="col-sm">
                  <div className="controle-me">
                    <button onClick={() => handleChange("client")}
                      
                      className={value=="client" ?"card-scanner bg-primary" : "card-scanner text-center"}
                      style={{ width: " 18rem", color: "black" }}
                    >
                      <img
                        src="/template/img/client.png"
                        className="card-img-top"
                        alt="..."
                      />
                      <p>
                        <b>  {t('ScanerFacture.Client')}   </b>
                      </p>
                    </button>
                  </div>
                </div>
                <div className="col-sm">
                  <button onClick={() => handleChange ("fournisseur")}
                    className={value=="fournisseur" ?"card-scanner bg-primary" : "card-scanner text-center"}
                    style={{ width: " 18rem", color: "black" }}
                  >
                    <img
                      src="/template/img/fournisseur.png"
                      className="card-img-top"
                      alt="..."
                    />

                    <p>
                      <b> {t('ScanerFacture.Fournisseur')}  </b>
                    </p>
                  </button>
                </div>
         
            </div>
         
            <div className=" text-center">
              <br />

              {selectedFile.length > 0 &&
          <>
            
              <img
                alt="Preview"
               src={file.file}
               width="200px"
               height="200px"
               class="rounded-circle photo-facture"
                
              />
            
          </>
  }        <br/><br/>

          {send ? <div class="spinner-border text-light" role="status" data-toggle="tooltip" data-placement="top" title="extraction des donner">
  <span class="sr-only">Loading...</span>
</div>   : isSelected ? (
                 
                  <button onClick={handleSubmission} className="btn-primary btn-file " disabled={disabled}>
                  {/*  Voir la facture selectedFile.length>0 && selectedFile[0].name */}
                  <span>
                  {t('ScanerFacture.suivant')} 
                  </span>
                  </button>
                
                ) : (
<>
            
                       <Dropzone
        onDrop={changeHandler}
        //accept={["image/*" , "*.pdf"]}
        minSize={1024}
        maxSize={3072000}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>{t('ScanerFacture.dropzone')}  </p>
          </div>
        )}
      </Dropzone>
    </>
                )}
            

         
           
     </div>
    <br/><br/><br/>
     </div>
    </>
  );
}
const mapStateToProps = function (store) {
  console.log(store.facture);
  return {
    facture: store.facture.Message,
  };
};
const mapdispatchtoprops = (disptach) => ({
  postFacture: (obj) => disptach(postFacture(obj)),
});

export default connect(mapStateToProps, mapdispatchtoprops)(ScanerFacture);

