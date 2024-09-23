import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>כרטיס המזל של bfree</title>
          <meta name="description" content="ררוכשים ב-200₪ ומעלה בחנות הווצאפ שלנו ומקבלים כרטיס גירוד" />
          <link rel="stylesheet" href="/styles/tailwind.css" />
          <link rel="icon" href="/bfree-logo-removebg-preview.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;