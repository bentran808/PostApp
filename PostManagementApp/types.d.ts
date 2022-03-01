type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    AddPost: undefined;
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
    title: string;
    content: string;
    photos: Array;
    likes: Array;
    comments: Array;
    createdAt: Number;
    updatedAt: Number;
    id: Number;
};
