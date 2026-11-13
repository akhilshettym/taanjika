import type { ArtForm } from "../types/artforms.types";

export const ART_FORMS: ArtForm[] = [
    {
        id: "artform_001",
        slug: "madhubani",
        name: "Madhubani",
        shortName: "Madhubani Art",
        tagline: "Stories drawn from tradition, colour and nature.",

        shortDescription:
            "An expressive folk art from the Mithila region, celebrated for intricate patterns, vibrant colours and stories inspired by mythology and everyday life.",

        origin: {
            place: "Mithila",
            region: "Bihar",
            country: "India",
            coordinates: "26.35° N, 86.07° E",
        },

        images: {
            cover: "/images/art-forms/madhubani/cover.png",
            detail: "/images/art-forms/madhubani/cover.png",
            alt: "Traditional Madhubani painting featuring intricate floral and geometric patterns",
        },

        metadata: {
            period: "Centuries-old folk tradition",
            category: "Handcrafted by artisans, this piece embodies Indian folk traditions.",
            primaryMaterials: [
                "Handmade paper",
                "Natural pigments",
                "Bamboo pens",
                "Cotton and brushes",
            ],
            traditionalArtists: "Traditionally practised by women of the Mithila region",
        },

        introduction: {
            heading: "A story woven through every line.",
            description: [
                "Madhubani painting, also known as Mithila art, is one of India's most distinctive traditional painting styles. Originating in the Mithila region of Bihar, this art form is known for its intricate line work, bold compositions and symbolic storytelling.",
                "Historically, paintings were created on freshly plastered mud walls and floors during festivals, weddings and other important occasions. Over time, artists brought this tradition onto handmade paper, cloth and canvas, making the artwork accessible beyond its place of origin.",
                "The compositions frequently draw inspiration from Hindu mythology, nature, folklore and everyday life. Figures, animals, flowers and celestial elements are arranged in carefully balanced compositions.",
                "A defining characteristic of Madhubani art is the use of elaborate patterns and detailed filling within the outlines. Empty spaces are often filled with geometric motifs, fine lines and decorative elements.",
                "Traditional colour palettes were prepared using natural sources such as turmeric, indigo, flowers, leaves and soot. Contemporary artists also work with commercially available pigments and a wider range of materials.",
                "Every composition carries a sense of rhythm and storytelling. The artwork is not simply decorative; it represents cultural memory, personal expression and a tradition passed across generations.",
            ],
        },

        sections: {
            originAndHistory: {
                id: "origin",
                title: "Origin & History",
                description:
                    "Madhubani painting originates from the Mithila cultural region, which spans parts of northern Bihar in India and adjoining areas of Nepal. Traditionally, paintings were created on household walls and floors for ceremonial occasions. The practice gradually developed into a recognised painting tradition on paper and other portable surfaces.",
                points: [
                    "Rooted in the Mithila cultural region.",
                    "Traditionally associated with festivals, weddings and rituals.",
                    "Passed down through generations of artists.",
                    "Now practised and exhibited internationally.",
                ],
            },

            makingProcess: {
                id: "making",
                title: "How Is It Made?",
                description:
                    "The process begins with preparing a suitable surface and planning the composition. Artists draw the principal figures and outlines before filling the spaces with intricate motifs, colours and patterns. Depending on the style, the work may use fine line work, double outlines, dense pattern filling or bold areas of colour.",
                points: [
                    "Surface preparation and composition planning.",
                    "Drawing the main outlines by hand.",
                    "Adding decorative motifs and intricate details.",
                    "Applying colours and completing the fine line work.",
                    "Final inspection and finishing.",
                ],
            },

            materials: {
                id: "materials",
                title: "Materials & Techniques",
                description:
                    "Traditional Madhubani artists used locally available natural materials. Handmade paper, cloth and canvas are common contemporary surfaces. Natural pigments remain important to the tradition, although many artists also use modern paints and drawing materials.",
                points: [
                    "Handmade paper, cloth or canvas.",
                    "Natural and contemporary pigments.",
                    "Bamboo pens, brushes and fine drawing tools.",
                    "Fine outlines, repetitive patterns and decorative filling.",
                ],
            },

            artisticAdaptations: {
                id: "adaptations",
                title: "Contemporary Artistic Adaptations",
                description:
                    "Contemporary artists continue to explore Madhubani through new compositions, subjects and surfaces. Alongside traditional mythology and nature-inspired subjects, artists interpret contemporary life, environmental themes and personal narratives while retaining the visual language of the tradition.",
                points: [
                    "Modern interpretations of traditional subjects.",
                    "Contemporary colour palettes.",
                    "New formats, including canvas and mixed media.",
                    "Individual expressions within established regional styles.",
                ],
            },

            culturalSignificance: {
                id: "culture",
                title: "Cultural Significance",
                description:
                    "Madhubani is an important expression of Mithila's cultural identity. Its visual language preserves stories, beliefs, rituals and everyday experiences. The tradition has also created opportunities for generations of artists and helped bring regional artistic practices to a wider audience.",
                points: [
                    "A significant part of Mithila's cultural heritage.",
                    "Associated with ceremonial and festive traditions.",
                    "A living tradition of intergenerational knowledge.",
                ],
            },

            contemporaryPractice: {
                id: "contemporary",
                title: "Madhubani Art Today",
                description:
                    "Today, Madhubani is practised by artists across generations, with works appearing in galleries, exhibitions, private collections and contemporary interiors. Artists continue to preserve traditional techniques while exploring new subjects and personal artistic identities.",
            },
        },

        characteristics: [
            "Intricate line work",
            "Dense decorative patterns",
            "Nature-inspired compositions",
            "Mythological storytelling",
            "Distinctive colour palettes",
            "Hand-drawn detailing",
        ],

        shop: {
            enabled: true,
            label: "Shop Madhubani Artworks",
            href: "/products?artForm=madhubani",
        },

        seo: {
            title: "Madhubani Art | Traditional Indian Folk Art",
            description:
                "Discover Madhubani art, its Mithila origins, traditional techniques, materials and contemporary artistic interpretations.",
            keywords: [
                "Madhubani art",
                "Mithila painting",
                "Indian folk art",
                "Traditional Indian paintings",
            ],
        },

        display: {
            featured: true,
            sortOrder: 1,
            published: true,
        },
    },

    {
        id: "artform_002",
        slug: "warli",
        name: "Warli",
        shortName: "Warli Art",
        tagline: "The simplicity of life expressed through art.",

        shortDescription:
            "A captivating tribal painting tradition from Maharashtra, known for its geometric figures, earthy backgrounds and storytelling inspired by community life and nature.",

        origin: {
            place: "Palghar and surrounding regions",
            region: "Maharashtra",
            country: "India",
            coordinates: "19.69° N, 72.77° E",
        },

        images: {
            cover: "/images/art-forms/warli/cover.png",
            detail: "/images/art-forms/warli/cover.png",
            alt: "Traditional Warli painting with white geometric human figures on an earthy background",
        },

        metadata: {
            period: "Long-standing Adivasi painting tradition",
            category: "Handcrafted by artisans, this piece embodies Indian tribal traditions.",
            primaryMaterials: [
                "Mud-plastered surfaces",
                "Rice paste",
                "Natural pigments",
                "Bamboo brushes",
            ],
            traditionalArtists: "Traditionally practised by Warli Adivasi communities",
        },

        introduction: {
            heading: "Life, nature and community in simple forms.",
            description: [
                "Warli painting is a traditional art form associated with the Warli Adivasi communities of Maharashtra, particularly in the northern Konkan region.",
                "Its visual language is distinctive for its simple geometric figures, usually created using white pigment against an earthy red or brown background.",
                "The circle, triangle and square form the foundation of many Warli compositions. These shapes are used to represent people, animals, trees, homes and elements of the natural world.",
                "Traditional paintings were often created on the walls of homes during important ceremonies and celebrations. The compositions depicted farming, dancing, hunting, community gatherings and everyday activities.",
                "Rather than relying on perspective or realistic proportions, Warli artists use rhythm, repetition and interconnected figures to create movement and tell stories.",
                "Contemporary Warli artists continue this tradition on paper, canvas and other surfaces, introducing new themes while retaining the distinctive geometric language.",
            ],
        },

        sections: {
            originAndHistory: {
                id: "origin",
                title: "Origin & History",
                description:
                    "Warli painting is rooted in the cultural practices of Warli Adivasi communities in Maharashtra. It has historically been associated with domestic walls and ritual spaces, reflecting relationships between people, nature, agriculture and community life.",
                points: [
                    "Originates in the northern Konkan region of Maharashtra.",
                    "Closely connected to Warli Adivasi cultural practices.",
                    "Traditionally associated with ceremonial wall paintings.",
                    "Represents community life and the natural environment.",
                ],
            },

            makingProcess: {
                id: "making",
                title: "How Is It Made?",
                description:
                    "A traditional Warli painting begins with preparing an earthy wall surface. Artists use white rice paste to draw figures and compositions, traditionally with simple brushes made from bamboo. The figures are arranged into scenes depicting everyday life, rituals and nature.",
                points: [
                    "Preparing an earthy or mud-based background.",
                    "Creating the composition using geometric forms.",
                    "Drawing figures with white pigment.",
                    "Building scenes through repetition and rhythm.",
                    "Adding the final details by hand.",
                ],
            },

            materials: {
                id: "materials",
                title: "Materials & Techniques",
                description:
                    "Traditional Warli paintings use natural materials, including earth-based surfaces and white pigment prepared from rice paste. Contemporary works may use handmade paper, canvas and modern paints while retaining the traditional visual style.",
                points: [
                    "Mud-plastered walls or prepared surfaces.",
                    "Rice paste and white natural pigment.",
                    "Bamboo brushes and handmade tools.",
                    "Geometric forms and repetitive compositions.",
                ],
            },

            artisticAdaptations: {
                id: "adaptations",
                title: "Contemporary Artistic Adaptations",
                description:
                    "Modern Warli artists experiment with new formats, colours and subjects. While traditional works often use a restrained palette, contemporary interpretations may introduce additional colours and larger compositions for galleries and interiors.",
                points: [
                    "Contemporary subjects and storytelling.",
                    "Canvas and handmade paper adaptations.",
                    "Expanded colour palettes.",
                    "Modern compositions using traditional geometry.",
                ],
            },

            culturalSignificance: {
                id: "culture",
                title: "Cultural Significance",
                description:
                    "Warli art communicates the close relationship between communities and their natural environment. Its scenes document agricultural life, celebrations, rituals and collective experiences, making it an important expression of community identity and cultural knowledge.",
                points: [
                    "Preserves community traditions and stories.",
                    "Reflects a close relationship with nature.",
                    "Celebrates collective life and cultural practices.",
                ],
            },

            contemporaryPractice: {
                id: "contemporary",
                title: "Warli Art Today",
                description:
                    "Warli has moved from traditional architectural surfaces into contemporary art, textiles, installations and interiors. Artists continue to reinterpret the form while keeping its recognisable geometric language and cultural associations alive.",
            },
        },

        characteristics: [
            "Geometric human figures",
            "White-on-earthy compositions",
            "Circular dance formations",
            "Scenes from everyday life",
            "Nature-inspired storytelling",
            "Repetitive visual rhythm",
        ],

        shop: {
            enabled: true,
            label: "Shop Warli Artworks",
            href: "/products?artForm=warli",
        },

        seo: {
            title: "Warli Art | Traditional Tribal Painting of Maharashtra",
            description:
                "Explore Warli art, its cultural origins, geometric storytelling, traditional materials and contemporary interpretations.",
            keywords: [
                "Warli art",
                "Warli painting",
                "Maharashtra tribal art",
                "Indian tribal painting",
            ],
        },

        display: {
            featured: true,
            sortOrder: 2,
            published: true,
        },
    },

    {
        id: "artform_003",
        slug: "kinnala",
        name: "Kinnala",
        shortName: "Kinnala Art",
        tagline: "A craft tradition shaped by imagination and devotion.",

        shortDescription:
            "A traditional Karnataka craft known for its vibrant wooden figures, mythological subjects and distinctive handcrafted decorative sculptures.",

        origin: {
            place: "Kinhal (Kinnal)",
            region: "Koppal, Karnataka",
            country: "India",
            coordinates: "15.40° N, 76.62° E",
        },

        images: {
            cover: "/images/art-forms/kinnala/cover.png",
            detail: "/images/art-forms/kinnala/cover.png",
            alt: "Traditional Kinnal craft featuring a colourful handcrafted wooden sculpture",
        },

        metadata: {
            period: "Traditional craft heritage of Karnataka",
            category: "Carved by regional artisans, this artwork celebrates Indian woodcraft.",
            primaryMaterials: [
                "Lightweight wood",
                "Natural and contemporary pigments",
                "Traditional adhesives",
            ],
            traditionalArtists: "Traditionally practised by Kinnal craft artisans",
        },

        introduction: {
            heading: "Where craftsmanship meets imagination.",
            description: [
                "Kinnala, more commonly known as Kinnal or Kinhal craft, is a traditional handicraft associated with the village of Kinhal in the Koppal district of Karnataka.",
                "The craft is known for its expressive wooden figures, decorative sculptures, mythological characters and vibrant painted surfaces.",
                "Traditional artisans transform lightweight wooden forms into carefully shaped figures, using carving, joining, modelling and painting techniques.",
                "The subjects often draw inspiration from Hindu mythology, religious traditions, folk narratives and decorative motifs.",
                "Kinnal craft is especially valued for the skill involved in shaping expressive forms and creating detailed ornamental surfaces.",
                "Today, artisans continue to preserve this regional tradition while developing contemporary decorative objects and artistic interpretations.",
            ],
        },

        sections: {
            originAndHistory: {
                id: "origin",
                title: "Origin & History",
                description:
                    "Kinnal craft is associated with Kinhal village in the Koppal district of Karnataka. The tradition is known for handcrafted wooden objects and painted figures, with historical connections to regional temple, ceremonial and decorative traditions.",
                points: [
                    "Originates in Kinhal village, Karnataka.",
                    "A distinctive regional handicraft tradition.",
                    "Traditionally associated with religious and decorative subjects.",
                    "Practised by generations of specialist artisans.",
                ],
            },

            makingProcess: {
                id: "making",
                title: "How Is It Made?",
                description:
                    "The process generally involves selecting and preparing suitable wood, shaping individual elements, assembling the figure and refining its surface. Traditional craft methods also include the use of modelling materials, decorative details and hand-painted finishes.",
                points: [
                    "Selecting and preparing suitable wood.",
                    "Hand-shaping and carving individual elements.",
                    "Assembling the composition.",
                    "Adding decorative and ornamental details.",
                    "Applying pigments and finishing the artwork.",
                ],
            },

            materials: {
                id: "materials",
                title: "Materials & Techniques",
                description:
                    "Kinnal artisans traditionally work with lightweight wood and locally used materials for shaping and finishing. Painted details and decorative elements give the finished figures their distinctive character.",
                points: [
                    "Lightweight wooden components.",
                    "Traditional modelling and joining materials.",
                    "Pigments and decorative finishes.",
                    "Hand-carving, shaping and painting techniques.",
                ],
            },

            artisticAdaptations: {
                id: "adaptations",
                title: "Contemporary Artistic Adaptations",
                description:
                    "Contemporary practitioners explore new subjects, scales and decorative applications while retaining the craft's distinctive hand-shaped and painted character. Modern adaptations can include decorative sculptures, collectible objects and contemporary interior pieces.",
                points: [
                    "Contemporary decorative sculptures.",
                    "New subjects and compositions.",
                    "Adaptations for modern interiors.",
                    "Individual interpretations by contemporary artisans.",
                ],
            },

            culturalSignificance: {
                id: "culture",
                title: "Cultural Significance",
                description:
                    "Kinnal craft represents a valuable part of Karnataka's regional artisan heritage. It preserves specialist woodworking and decorative skills, connecting contemporary audiences with the craftsmanship and cultural narratives of the region.",
                points: [
                    "A distinctive Karnataka craft tradition.",
                    "Preserves traditional artisan knowledge.",
                    "Reflects regional religious and decorative culture.",
                ],
            },

            contemporaryPractice: {
                id: "contemporary",
                title: "Kinnal Craft Today",
                description:
                    "Kinnal craft continues through artisan communities, exhibitions, heritage initiatives and contemporary decorative applications. The preservation of specialist techniques remains central to sustaining this regional craft tradition.",
            },
        },

        characteristics: [
            "Hand-shaped wooden figures",
            "Expressive sculptural forms",
            "Vibrant painted finishes",
            "Mythological subjects",
            "Ornamental detailing",
            "Traditional craftsmanship",
        ],

        shop: {
            enabled: true,
            label: "Shop Kinnala Artworks",
            href: "/products?artForm=kinnala",
        },

        seo: {
            title: "Kinnal Craft | Traditional Karnataka Handicraft",
            description:
                "Discover Kinnal craft from Karnataka, its origins, traditional wooden craftsmanship, materials and contemporary artistic expressions.",
            keywords: [
                "Kinnal craft",
                "Kinnala art",
                "Karnataka handicrafts",
                "Traditional woodcraft",
            ],
        },

        display: {
            featured: true,
            sortOrder: 3,
            published: true,
        },
    },

    {
        id: "artform_004",
        slug: "gond",
        name: "Gond",
        shortName: "Gond Art",
        tagline: "Stories of nature, brought to life through lines and imagination.",

        shortDescription:
            "A vibrant tribal painting tradition from central India, celebrated for its intricate patterns, rhythmic lines, nature-inspired subjects and rich visual storytelling.",

        origin: {
            place: "Central India",
            region: "Madhya Pradesh, particularly the Gond communities of the region",
            country: "India",
            coordinates: "22.97° N, 78.66° E",
        },

        images: {
            cover: "/images/art-forms/gond/cover.png",
            detail: "/images/art-forms/gond/cover.png",
            alt: "Traditional Gond painting featuring colourful nature-inspired forms and intricate patterns",
        },

        metadata: {
            period: "Traditional tribal art heritage of central India",
            category: "Created by indigenous artisans, this piece honors tribal traditions.",
            primaryMaterials: [
                "Handmade paper and canvas",
                "Natural and contemporary pigments",
                "Pen and ink for detailed patterns",
            ],
            traditionalArtists: "Traditionally practised by Gond community artists",
        },

        introduction: {
            heading: "Every line tells a story of nature.",
            description: [
                "Gond art is a traditional painting practice associated with the Gond communities of central India, particularly Madhya Pradesh.",
                "The tradition reflects the close relationship between the Gond people, their natural surroundings, folklore and spiritual beliefs.",
                "Animals, birds, trees, forests and everyday elements of nature are among the most recognisable subjects in Gond paintings.",
                "Artists build their compositions using carefully arranged dots, dashes, lines, curves and intricate repetitive patterns.",
                "Distinctive colours and rhythmic detailing give the paintings a sense of movement, texture and visual depth.",
                "While rooted in community traditions and storytelling, contemporary Gond artists continue to explore new subjects, materials and artistic expressions.",
            ],
        },

        sections: {
            originAndHistory: {
                id: "origin",
                title: "Origin & History",
                description:
                    "Gond art is rooted in the cultural traditions of the Gond communities of central India. Its visual language draws inspiration from folklore, nature, community life and traditional beliefs. Over time, these artistic practices developed into distinctive forms of painting, gaining wider recognition through the work of contemporary Gond artists.",
                points: [
                    "Associated with Gond communities across central India.",
                    "Strong cultural roots in Madhya Pradesh.",
                    "Inspired by folklore, nature and community traditions.",
                    "Traditionally connected with storytelling and the surrounding environment.",
                    "Developed into a recognised contemporary painting tradition.",
                ],
            },

            makingProcess: {
                id: "making",
                title: "How Is It Made?",
                description:
                    "Gond paintings begin with an outline of the chosen subject, often an animal, bird, tree or imaginative natural form. Artists gradually fill the composition with intricate patterns made using dots, lines, dashes and repeated shapes. Layered colours and detailed markings bring the subject to life.",
                points: [
                    "Selecting a subject inspired by nature, folklore or daily life.",
                    "Sketching the main composition and outlining its forms.",
                    "Filling shapes with distinctive dots, lines and repetitive patterns.",
                    "Applying colours to create contrast and visual rhythm.",
                    "Adding fine details and finishing touches by hand.",
                ],
            },

            materials: {
                id: "materials",
                title: "Materials & Techniques",
                description:
                    "Traditional Gond painting practices have evolved with the availability of different surfaces and pigments. Contemporary artists commonly work with handmade paper, canvas and other suitable surfaces, using brushes, pens and a variety of pigments to create their intricate visual language.",
                points: [
                    "Handmade paper and canvas surfaces.",
                    "Natural pigments and contemporary colours.",
                    "Fine brushes, pens and drawing tools.",
                    "Intricate dot, line and dash patterns.",
                    "Layered colouring and repetitive decorative detailing.",
                ],
            },

            artisticAdaptations: {
                id: "adaptations",
                title: "Contemporary Artistic Adaptations",
                description:
                    "Contemporary Gond artists continue to reinterpret traditional visual themes through new compositions, colour palettes and materials. The art form has expanded beyond traditional surfaces into contemporary paintings, illustrations, murals and decorative applications while retaining its distinctive pattern-based identity.",
                points: [
                    "Contemporary nature-inspired paintings.",
                    "Modern interpretations of traditional folklore.",
                    "Illustrations and mixed-media compositions.",
                    "Decorative artwork for contemporary interiors.",
                    "New subjects explored through traditional pattern techniques.",
                ],
            },

            culturalSignificance: {
                id: "culture",
                title: "Cultural Significance",
                description:
                    "Gond art represents an important expression of the cultural identity and artistic knowledge of Gond communities. Its themes reflect relationships with forests, animals, nature, folklore and traditional beliefs, helping preserve stories and visual practices across generations.",
                points: [
                    "Reflects the cultural identity of Gond communities.",
                    "Preserves traditional stories, folklore and visual knowledge.",
                    "Celebrates the relationship between people and nature.",
                    "Represents a distinctive tradition of central Indian tribal art.",
                    "Provides contemporary recognition to community-based artistic practices.",
                ],
            },

            contemporaryPractice: {
                id: "contemporary",
                title: "Gond Art Today",
                description:
                    "Gond art continues to evolve through the work of established and emerging community artists. Its distinctive visual language is now appreciated in galleries, exhibitions, contemporary collections and interior spaces, creating opportunities for traditional artistic knowledge to reach wider audiences.",
            },
        },

        characteristics: [
            "Intricate dots and repetitive patterns",
            "Nature-inspired subjects",
            "Animals, birds and forest imagery",
            "Rhythmic lines and decorative detailing",
            "Vibrant and contrasting colours",
            "Folklore and visual storytelling",
        ],

        shop: {
            enabled: true,
            label: "Shop Gond Artworks",
            href: "/products?artForm=gond",
        },

        seo: {
            title: "Gond Art | Traditional Indian Tribal Painting",
            description:
                "Discover Gond art from central India, its cultural origins, nature-inspired subjects, intricate patterns and contemporary artistic expressions.",
            keywords: [
                "Gond art",
                "Gond painting",
                "Indian tribal art",
                "Madhya Pradesh folk art",
                "Traditional Gond artwork",
                "Nature-inspired Indian paintings",
            ],
        },

        display: {
            featured: true,
            sortOrder: 3,
            published: true,
        },
    },
];