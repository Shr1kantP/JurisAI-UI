import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Landing from "./components/landing";
import Loginpage from "./components/Loginpage";
import LegalAssistantHistoryPage from "./components/history/history";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Landing/>
    </div>
  );
}
