import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps ( ctx ) {
    const props = await Document.getInitialProps( ctx );
    return { ...props };
  }

  render () {
    return (
      <Html>
        <Head>
          <style>
            { `html {
              visibility: hidden;
              opacity: 0;
            }` }
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
          <style>
            { `html {
              visibility: visible;
              opacity: 1;
            }` }
          </style>
          <script> </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument;
