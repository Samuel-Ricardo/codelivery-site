import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import theme from '@themes/global'
import { Mapping } from '@/components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Codelivery</title>
        <meta name="description" content="Nice Delivery APP :D" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ThemeProvider theme={theme} >
          <SnackbarProvider maxSnack={2}>
            <CssBaseline />
            <Mapping/>
          </SnackbarProvider>
        </ThemeProvider>
      </main>
    </>
  )
}
