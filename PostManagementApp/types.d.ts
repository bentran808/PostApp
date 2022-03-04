type RootStackParamList = {
    Home: undefined;
    HomeScreen: undefined;
    Login: undefined;
    AddPost:
        | {
              editedId: Number;
          }
        | undefined;
    ShowImage: {
        url: {};
    };
};

type User = {
    id: string;
    avatar: string;
    name: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    role: string;
};

type Post = {
    author: User;
    company: string;
    year: number;
    type: string;
    status: boolean;
    price: number;
    address: string;
    title: string;
    description: string;
    photos: Array;
    likes: Array;
    comments: Array;
    createdAt: Number;
    updatedAt: Number;
    id: Number;
};

type PostLike = {
    author: User;
    id: Number;
    postId: Number;
    createdAt: Number;
    updatedAt: Number;
};

type PostComment = {
    author: User;
    id: Number;
    postId: Number;
    content: string;
    createdAt: Number;
    updatedAt: Number;
};
