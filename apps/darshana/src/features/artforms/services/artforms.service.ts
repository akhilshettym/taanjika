import { ART_FORMS } from "../data/artforms.data";
import type { ArtForm } from "../types/artforms.types";

export async function getAllArtForms(): Promise<ArtForm[]> {
  return ART_FORMS.filter((artForm) => artForm.display.published).sort(
    (a, b) => a.display.sortOrder - b.display.sortOrder,
  );
}

export async function getFeaturedArtForms(): Promise<ArtForm[]> {
  const artForms = await getAllArtForms();

  return artForms.filter((artForm) => artForm.display.featured);
}

export async function getArtFormBySlug(slug: string): Promise<ArtForm | null> {
  const artForms = await getAllArtForms();

  return artForms.find((artForm) => artForm.slug === slug) ?? null;
}

export async function getArtFormSlugs(): Promise<string[]> {
  const artForms = await getAllArtForms();

  return artForms.map((artForm) => artForm.slug);
}
