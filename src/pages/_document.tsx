/* eslint-disable react/no-danger */
import React from 'react';
import { extractCritical } from '@emotion/server';
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

type ExtendedDocumentProps = DocumentProps & {
  ids: string[];
  css: string;
};

export default class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <style
            data-emotion-css={(this.props as ExtendedDocumentProps).ids.join(
              ' '
            )}
            dangerouslySetInnerHTML={{
              __html: (this.props as ExtendedDocumentProps).css,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
