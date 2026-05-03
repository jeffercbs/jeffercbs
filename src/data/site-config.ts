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
    title: 'Blog',
    subtitle: 'Artículos y proyectos sobre programación y tecnología.',
    description: 'Artículos, tutoriales y proyectos sobre desarrollo web, arquitectura de software y tecnología en español.',
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
            text: 'Contacto',
            href: '/contact'
        },
        {
            text: 'Términos',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'github',
            href: 'https://github.com/jeffercbs'
        },
        {
            text: 'linkedin',
            href: 'https://www.linkedin.com/in/jeffercbs'
        },
        {
            text: 'youtube',
            href: 'https://www.youtube.com/@jeffercbs'
        }
    ],
    hero: {
        title: 'Artículos y proyectos',
        text: 'Un espacio para explorar ideas sobre desarrollo de software, arquitectura y tecnología. Contenido en español.',
        actions: []
    },
    subscribe: {
        title: 'Newsletter',
        text: 'Próximamente disponible.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
