"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PT_Serif, Open_Sans, Space_Mono } from "next/font/google";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fontMap: { [key: string]: string } = {
  serif: ptSerif.className,
  sansSerif: openSans.className,
  monospace: spaceMono.className,
};

export default function FontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontName = useSelector((state: RootState) => state.font.fontName);
  const fontClass = fontMap[fontName] || ptSerif.className;

  return <div className={fontClass}>{children}</div>;
}
