import { Space_Grotesk } from "next/font/google";
import { Navbar } from "../components/Navbar";
import "./globals.css";

// Space Grotesk is a variable font (300–700), so we don't pin a weight —
// next/font loads the full axis and self-hosts it. Exposed as a CSS variable
// that globals.css wires into Tailwind's --font-sans.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Lucio Villena — SWE / ML Engineer",
  description:
    "Computer Engineering @ UCF. Real-time computer-vision systems, LLM fine-tuning pipelines, and full-stack products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen bg-ink text-paper font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
