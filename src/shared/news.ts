export class News{
    id: string;
    name: string;
    description: string;
    category: string;
    country: string;
    language: string;
    url: string;
}

export class TopNews{
    author: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
    source: Source;
}

export class Source{
    id: string;
    name: string;
}