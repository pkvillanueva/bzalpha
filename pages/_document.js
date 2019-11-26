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
          <script> </script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script> </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument;
