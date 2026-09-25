import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FitLog | Workout Library",
  description: "A dark, focused workout library and daily plan tracker.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          {children}
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}
