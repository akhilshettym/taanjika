import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtFormDetail from "@/features/artforms/components/ArtFormDetail";
import { getArtFormBySlug, getArtFormSlugs } from "@/features/artforms/services/artforms.service";

interface ArtFormPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getArtFormSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ArtFormPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artForm = await getArtFormBySlug(slug);

  if (!artForm) {
    return {
      title: "Art Form Not Found",
    };
  }

  return {
    title: artForm.seo.title,
    description: artForm.seo.description,
    keywords: artForm.seo.keywords,
    openGraph: {
      title: artForm.seo.title,
      description: artForm.seo.description,
      images: [
        {
          url: artForm.images.cover,
          alt: artForm.images.alt,
        },
      ],
    },
  };
}

export default async function ArtFormPage({ params }: ArtFormPageProps) {
  const { slug } = await params;
  const artForm = await getArtFormBySlug(slug);

  if (!artForm) {
    notFound();
  }

  return <ArtFormDetail artForm={artForm} />;
}
