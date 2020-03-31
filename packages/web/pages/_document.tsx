import Document from 'next/document'
import {ServerStyleSheet} from 'styled-components'

export default class extends Document {
  static async getInitialProps(context) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage
    context.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheet.collectStyles(<App {...props}/>)
    })

    const initialProps = await Document.getInitialProps(context)
    return {
      ...initialProps,
      styles: [
        // @ts-ignore
        ...initialProps.styles,
        ...sheet.getStyleElement()
      ]
    }
  }
}
