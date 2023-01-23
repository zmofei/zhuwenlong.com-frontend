import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        const isEng = this.props.__NEXT_DATA__.props.lanStr === 'en';
        const GID = 'G-TDFKD4X8PR'; //isEng ? 'G-7CETM03NTR' : 'G-TDFKD4X8PR'
        // const BID = 'fd40bbc7c0543c608930f67616c6aecb' //isEng ? '6a6fda2e8bf81ade13dd6d2b3cb9ec41' : 'fd40bbc7c0543c608930f67616c6aecb'
        return (
            <Html>
                <Head>
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GID}', {
                                    page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />

                    <script src='/static/js/mapbox-gl-2.9.1.js'></script>
                    <link href='/static/css/mapbox-gl-2.9.1.css' rel='stylesheet' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument