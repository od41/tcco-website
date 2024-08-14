import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='favicon.png'
        />
        <link rel='manifest' href='site.webmanifest' />
        <link rel='shortcut icon' href='favicon.ico' />
        <meta name='msapplication-TileColor' content='#CCFF00' />
        <meta name='theme-color' content='#000000' />
        <meta
          name='msapplication-config'
          content='browserconfig.xml'
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}