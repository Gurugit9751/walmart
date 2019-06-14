export const FilterMenus = [
    {
        id: 1,
        title: "Price",
        sortfield: "price"
    },
    {
        id: 2,
        title: "ReviewRating",
        sortfield: "reviewRating"
    },
    {
        id: 3,
        title: "ReviewCount",
        sortfield: "reviewCount"
    }
];
export const SearchInputMenus = [
    {
        id: 1,
        title: "MinPrice",
        type: "number",
        name: "minPrice"
    },
    {
        id: 2,
        title: "MaxPrice",
        type: "number",
        name: "maxPrice"
    },
    {
        id: 3,
        title: "MinRating",
        type: "number",
        name: "minReviewRating"
    },
    {
        id: 4,
        title: "MaxRating",
        type: "number",
        name: "maxReviewRating"
    },
    {
        id: 5,
        title: "MinCount",
        type: "number",
        name: "minReviewCount"
    },
    {
        id: 6,
        title: "MaxCount",
        type: "number",
        name: "maxReviewCount"         
    }
];

let baseUrl = "http://localhost:5000";
export const queryURL=`${baseUrl}/walmartproducts/1/20`;
export const FilterQuery=`${baseUrl}/products/filter`;
export const ImgSrcURL = "https://mobile-tha-server.firebaseapp.com/";
export const MoreDetailsURL = `${baseUrl}/walmartproducts/`;