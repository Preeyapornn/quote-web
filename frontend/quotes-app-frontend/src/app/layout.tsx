import { AuthProvider } from "../../context/AuthContext";
import { Pacifico } from "next/font/google";


const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${pacifico.className} bg-[#f4f1eb]`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
