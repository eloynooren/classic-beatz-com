import React from "react";
//import AdSense from 'react-adsense'
import * as styles from './GoogleAd.module.css'

export const GoogleAd = () => {
    return (
        <div className={styles.googleAd}>
            <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1395673546456957"
                    crossOrigin="anonymous"></script>
            {/*}<!-- Ad-responsive -->*/}
            <ins className="adsbygoogle"
                 style={{ display: 'block'}}
                 data-ad-client="ca-pub-1395673546456957"
                 data-ad-slot="8970195000"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            {/*<AdSense.Google
                 style={{ display: 'block'}}
                 client="ca-pub-1395673546456957"
                 slot="8970195000"
                 format="auto"/>*/}
        </div>
    )
}

export default GoogleAd
