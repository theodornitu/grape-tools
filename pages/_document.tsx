import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" />

        <link rel="shortcut icon" href="favicon.png" type="image/png" />
        <link rel="icon" href="favicon.png" type="image/png" />


        <script defer data-domain="grape.tools" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
