import { AuthProvider } from "../../context/AuthContext";
import { Pacifico } from "next/font/google";
import { Metadata } from "next";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Quotes Web",
  description: "Welcome to Quotes Web - Your source for inspiring quotes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/public/logoQuote.png" />
      </head>
      <body className={`${pacifico.className} bg-[#f4f1eb]`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
