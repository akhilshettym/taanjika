import type { Metadata } from "next";

import ArtForms from "@/features/artforms/ArtForms";
import { getAllArtForms } from "@/features/artforms/services/artforms.service";

export const metadata: Metadata = {
  title: "Explore Art Forms | Our Heritage",
  description:
    "Discover India's traditional art forms, their origins, techniques, cultural significance and the artists who keep them alive.",
};

export default async function ArtFormsPage() {
  const artForms = await getAllArtForms();

  return <ArtForms artForms={artForms} />;
}
