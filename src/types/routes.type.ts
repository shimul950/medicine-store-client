// [
//     {
//         title: "Blog Management",
//         items: [
//             {
//                 title: "Create Blog",
//                 url: "/create-blog",
//             },
//         ]
//     }
// ]


export interface Route {
    title: string;
    url?: string;
    items?: {
        title: string;
        url: string;
    }[];
}