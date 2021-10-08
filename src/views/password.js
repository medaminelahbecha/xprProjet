import React , {useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {UpdateUser , getoneuser} from '../action/useraction'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
const Password = (props) => {
  const history = useHistory();
  const { t, i18n } = useTranslation()
  useEffect(() => {
   let id = decodeURI(props.location.search.slice(1)).trim()
    props.getoneuser(id)
  }, [])
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("champ obligatoire"),
    confirmer: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "les mots de passe doivent correspondre"
      )
      .required("champ obligatoire"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    let state = {
      _id  : decodeURI(props.location.search.slice(1)).trim(),
      password : data.password
    }
    let id = decodeURI(props.location.search.slice(1)).trim()
    localStorage.setItem('iduseradmin', id)
    console.log(errors);
props.UpdateUser(state)
if(props.location.hash=="#forget"){
  history.push('/')
}
else{
if(props.userconnected.length >0)
{ if(props.userconnected[0].role =="User")
        history.push('/')
    else
        history.push('/bienvenue1')
}
}
}
  return (
    <div>
      <body>
        <nav className="navbar navbar-dark bg-light">
          <Link className="navbar-brand" to="#">
            <img
              src="/template/img/xpr1.png"
              width="188"
              height="30px"
              alt=""
            />
          </Link>
        </nav>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <p className="connexion">
              <b>  {t('Password.titel')}</b>
            </p>

            <p className="email pl-5">{t('Password.mpasse')}</p>

            <div className="input-group m-auto">
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                name="password"
                ref={register}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <b className="error">{errors.password?.message}</b>
            </div>
            <p className="email pl-5">{t('Password.cmpasse')}</p>
            <div className="input-group m-auto">
              <input
                type="password"
                className={`form-control ${
                  errors.confirmer ? "is-invalid" : ""
                }`}
                
                name="confirmer"
                ref={register}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <b className="error">{errors.confirmer?.message}</b>
            </div>
            <br />
            <br />

            <br />
            <br />
            <div className="row">
              <div className="col-4">
                <button type="submit" className="login-btn">
                {t('Password.btn')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </body>
    </div>
  );
};
const mapStateToProps = function (store) {
  return {
    userconnected: store.user.Users,

}
}
export default connect(mapStateToProps,{getoneuser ,UpdateUser })(Password)

