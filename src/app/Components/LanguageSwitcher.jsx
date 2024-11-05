import React from 'react'
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
    const router = useRouter();
    const changeLanguage = (locale) => {
        router.push(router.pathname, router.asPath, { locale });
      };
  return (
    <div>
    <button onClick={() => changeLanguage('en')}>English</button>
    <button onClick={() => changeLanguage('ar')}>العربية</button>
  </div>
  )
}

export default LanguageSwitcher