import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps ( ctx ) {
    const props = await Document.getInitialProps( ctx );
    return { ...props };
  }

  render () {
    return (
      <Html className="no-trans">
        <Head>
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={ {
              __html: `
                /* https://github.com/ant-design/ant-design/issues/16037#issuecomment-483140458 */
                /* Not only antd, but also any other style if you want to use ssr. */
                *, *::before, *::after {
                  transition: none!important;
                }
              `
            } }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/static/scripts.js" />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
