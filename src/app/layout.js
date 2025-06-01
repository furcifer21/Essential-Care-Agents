import "../../resources/sass/app.scss";
import PageLoader from "../../components/loaders/PageLoader";
import { Toaster } from "sonner"

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon.png" />
            <script src='https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.5/lottie.min.js'></script>
        </head>
        <body>
            <PageLoader/>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                classNames: {
                error: 'error-toast',
                success: 'success-toast',
                },
              }}
            />
        </body>
      </html>
  );
}
