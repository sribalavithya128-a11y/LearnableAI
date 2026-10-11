import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

export const metadata = {
  title: "LearnAble AI - Accessible Learning Transformation Platform",
  description:
    "AI-Based Accessible Learning Content Transformation Platform. Convert educational content into simplified text, speech, and multilingual resources in English and Tamil.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" data-font-size="medium" data-spacing="normal">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
