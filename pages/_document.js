import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps ( ctx ) {
    const props = await Document.getInitialProps( ctx );
    return { ...props };
  }

  render () {
    return (
      <Html className="no-trans">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="/static/chrome-fix.js" />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
