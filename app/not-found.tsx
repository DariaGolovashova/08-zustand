import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page dose note exist",

  openGraph: {
    title: "Page not found",
    description: "This page dose note exist",
    url: "https://your-site.vercel.app/404",
    // замінити тут,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
