import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon.png" />
        <link rel="manifest" href="site.webmanifest" />
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="msapplication-TileColor" content="#CCFF00" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-config" content="browserconfig.xml" />

        <meta charSet="UTF-8" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:locale" content="en_US" />
        <meta name="author" content="TCCo." />
        <meta property="og:image" content="https://tcco.co/favicon-2.png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Connecting SMB Communities" />
        <meta name="keywords" content="Community, Africa, Business, SMB, SME" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
