interface Feed {
    url: string;
    title: string;
    content?: string;
    source: string;
    date: Date;
    thumbnail?: string;
}

export default Feed;
