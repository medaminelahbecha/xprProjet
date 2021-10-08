import React from 'react'
import { useTranslation } from 'react-i18next'

export const   LanguageSelector = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }
console.log(i18n.language)
  return (
    <div >

    <select onChange={changeLanguage} value={i18n.language} class="custom-select">

  <option  value="en" name="language">&#x1F1FA;&#x1F1F8; English</option>
  <option  value="fr-FR" name="language"  selected="selected">&#127464;&#127477; Francais</option>
  <option value="ar-AR" name="language" >&#x1F1F9;&#x1F1F3;  Arabe</option>
</select>
    
    </div>
  )
}

export default LanguageSelector
