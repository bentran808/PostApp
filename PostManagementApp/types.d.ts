type RootStackParamList = {
  Home: undefined;
  HomeScreen: {
    data: Post;
  };
  Login: undefined;
  AddPostScreen:
    | {
        isMyPost?: boolean;
        editedPost: Post;
      }
    | undefined;
  ShowImageScreen: {
    photos: Photo[];
  };
  MyPostScreen: undefined;
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
  address?: string;
  title: string;
  description: string;
  photos: Array;
  pending?: boolean;
  createdAt?: number;
  updatedAt?: number;
  id?: number;
};

type PostLike = {
  author: User;
  id: number;
  postId: number;
  createdAt: number;
  updatedAt: number;
};

type PostComment = {
  author: User;
  id: number;
  postId: number;
  content: string;
  createdAt: number;
  updatedAt: number;
};

type Photo = {
  height: number;
  uri: string;
  width: number;
  fileName: string;
  type: string;
  fileSize: number;
};
