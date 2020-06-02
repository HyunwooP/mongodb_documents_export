export type OptionModel = {
    split: string;
    url: string;
    charSet: string;
    target: Array<string>,
    outputPath: string
}

export type CollectionModel = {
    name: string;
    documents: object[];
}
