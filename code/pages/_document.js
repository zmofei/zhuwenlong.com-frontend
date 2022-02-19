import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        const isEng = this.props.__NEXT_DATA__.props.lanStr === 'en';
        const GID = isEng ? 'G-7CETM03NTR' : 'G-TDFKD4X8PR'
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