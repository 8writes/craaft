/** @format */

import HorizontalNav from "@/navigation/horizontal";
import VerticalNav from "@/navigation/vertical";

export default function OverviewLayout({children}) {
  return (
    <section className="flex">
      <VerticalNav />
      <>
      <HorizontalNav />
      {children}
      </>
    </section>
  )
}
