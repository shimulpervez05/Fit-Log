import "./globals.css";
import Footer from "@/components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";

export const metadata = {
  title: "FitLog | Workout Library",
  description:
    "FitLog is a dark, no-nonsense workout library and daily workout planner.",
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
