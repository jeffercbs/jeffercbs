export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    website: 'https://jeffercbs.tech',
    title: 'Software Engineer | Consultor Tecnológico & Educador',
    subtitle: 'Empezando a crear más contenido en Español sobre programación y tecnología.',
    description: 'Ingeniero de Software en Bogotá con más de 3 años de experiencia en desarrollo web, arquitectura de software y soluciones digitales escalables. Consultor tecnológico y creador de contenido sobre programación y tecnología. Ayudo a empresas y startups a transformar ideas en productos digitales innovadores, optimizando sistemas y potenciando su crecimiento en el mundo digital.',
    image: {
        src: '',
        alt: ''
    },
    headerNavLinks: [
        {
            text: 'Inicio',
            href: '/'
        },
        {
            text: 'Proyectos',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'Sobre mi',
            href: '/about'
        },
        {
            text: 'Contactame',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: "github",
            href: "https://github.com/jeffercbs",
        },
        {
            text: "platzi",
            href: "https://platzi.com/p/jeffercbs/",
        },
        {
            text: "linkedin",
            href: "https://www.linkedin.com/in/jeffercbs",
        },
        {
            text: "twitch",
            href: "https://www.twitch.tv/jeffercbs",
        },
        {
            text: "instagram",
            href: "https://www.instagram.com/jeffercbs.dev/",
        },
        {
            text: "youtube",
            href: "https://www.youtube.com/@jeffercbs",
        },
    ],
    hero: {
        title: 'Hola, bienvenido a mi rincon de la Web!',
        text: "Soy Jeferson Barrero, Software Engineer con más de 3 años de experiencia desarrollando software. Originario de Ibagué, Tolima y actualmente en Bogotá D.C, mi pasión por la programación comenzó a los 14 años. He participado en eventos como Platzi Conf y Colombia Tech Fest, donde disfruto conectar con la comunidad tech y compartir conocimientos. Creo firmemente que el crecimiento viene del intercambio de ideas.",
        image: {
            src: '',
            alt: ''
        },
        actions: [
            {
                text: 'Contactame',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: 'Subscribete a mi Newsletter',
        text: 'Proximamente disponible.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
