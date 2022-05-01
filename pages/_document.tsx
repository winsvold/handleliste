import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import {DocumentContext, RenderPage} from "next/dist/shared/lib/utils";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    return await renderServersideStyledComponentsStylesheet(ctx);
  }
}

// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
async function renderServersideStyledComponentsStylesheet(ctx: DocumentContext & { renderPage: RenderPage }) {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
}
