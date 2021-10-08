import React from 'react'
import { useTranslation } from 'react-i18next'
export default function Notfound() {
  const { t, i18n } = useTranslation()
    return (
        <>
         <section id="not-found">
         <small>{t('404.titel')}</small>
    <div class="circles">
      <p>404<br/>
       <small>{t('404.description')}</small>
      </p>
      <span class="circle big"></span>
      <span class="circle med"></span>
      <span class="circle small"></span>
    </div>
  </section>
    </>
    )
}