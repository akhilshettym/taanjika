export interface ArtFormSection {
    id: string;
    title: string;
    description: string;
    image?: string;
    points?: string[];
}

export interface ArtForm {
    id: string;
    slug: string;
    name: string;
    shortName: string;
    tagline: string;
    shortDescription: string;

    origin: {
        place: string;
        region: string;
        country: string;
        coordinates?: string;
    };

    images: {
        cover: string;
        detail: string;
        alt: string;
    };

    metadata: {
        period?: string;
        category: string;
        primaryMaterials: string[];
        traditionalArtists?: string;
    };

    introduction: {
        heading: string;
        description: string[];
    };

    sections: {
        originAndHistory: ArtFormSection;
        makingProcess: ArtFormSection;
        materials: ArtFormSection;
        artisticAdaptations: ArtFormSection;
        culturalSignificance: ArtFormSection;
        contemporaryPractice: ArtFormSection;
    };

    characteristics: string[];

    shop: {
        enabled: boolean;
        label: string;
        href: string;
    };

    seo: {
        title: string;
        description: string;
        keywords: string[];
    };

    display: {
        featured: boolean;
        sortOrder: number;
        published: boolean;
    };
}