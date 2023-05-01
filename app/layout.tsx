import { Suspense } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import ReactQueryProvider from './ReactQueryProvider';
import './globals.css';
import 'swiper/swiper-bundle.min.css';
import Loading from './loading';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
