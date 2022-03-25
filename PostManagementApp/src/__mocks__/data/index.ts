const initialUser = {
  id: '',
  avatar: '',
  name: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  role: ''
};

const mockAdmin = {
  id: '621c4188dece66a40dad2951',
  avatar: 'https://picsum.photos/200',
  name: 'Admin',
  gender: 'male',
  email: 'admin@admin.com',
  phone: '+84 (919) 507231',
  address: '199 Bergen Street, Bowie, Oregon, 7933',
  role: 'admin'
};

const mockUser = {
  id: '621c41883112f1c216433dcf',
  avatar: 'https://picsum.photos/200',
  name: 'Mcintyre Morrison',
  gender: 'male',
  email: 'test1@email.com',
  phone: '+84 (838) 539391',
  address: '313 Menahan Street, Aurora, North Dakota, 9139',
  role: 'user'
};

const mockPost = {
  author: mockAdmin,
  company: 'bb',
  year: 2222,
  type: 'b',
  status: true,
  price: 23333111,
  address: '199 Bergen Street, Bowie, Oregon, 7933',
  title: 'bb update',
  description: 'bb',
  photos: [
    {
      height: 480,
      uri: 'file:///data/user/0/com.PostManagementApp/cache/rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
      width: 480,
      fileName: 'rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
      type: 'image/jpeg',
      fileSize: 6689
    },
    {
      height: 480,
      uri: 'file:///data/user/0/com.PostManagementApp/cache/rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
      width: 480,
      fileName: 'rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
      type: 'image/jpeg',
      fileSize: 6689
    }
  ],
  pending: false,
  createdAt: 1647507076963,
  updatedAt: 1647511146749,
  id: 2
};

const mockLikes = [
  {
    author: mockAdmin,
    postId: 2,
    createdAt: 1647509052801,
    updatedAt: 1647509052801,
    id: 1
  }
];

const mockCommentsList = [
  {
    author: mockAdmin,
    postId: 2,
    content: 'test',
    createdAt: 1647509052801,
    updatedAt: 1647509052801,
    id: 1
  },
  {
    author: {
      id: '621c4188e8365653f9326450',
      avatar: 'https://picsum.photos/200',
      name: 'Frost Spence',
      gender: 'male',
      email: 'frostspence@entogrok.com',
      phone: '+84 (859) 508289',
      address: '745 Blake Avenue, Belmont, District Of Columbia, 4099',
      role: 'user'
    },
    postId: 2,
    content: 'test2',
    createdAt: 1647509052801,
    updatedAt: 0,
    id: 2
  }
];

const mockNewPost = {
  author: mockAdmin,
  company: 'qwe',
  year: 2021,
  type: 'qwe',
  status: true,
  price: 10000,
  address: 'qwe',
  title: 'qwe',
  description: 'qwe',
  photos: [],
  pending: true
};

const mockEditedPost = {
  '2': mockPost,
  '3': {
    id: 3,
    ...mockNewPost
  }
};

const mockApprovedPost = {
  '2': mockPost,
  '3': {
    id: 3,
    ...mockNewPost,
    pending: false
  }
};

const mockLike = {
  author: mockAdmin,
  postId: 2,
  createdAt: 1647509052801,
  updatedAt: 1647509052801,
  id: 2
};

const mockNewComment = {
  author: mockAdmin,
  postId: 2,
  content: 'abc',
  createdAt: 1647509052801,
  updatedAt: 1647509052801,
  id: 3
};

const mockPhotos = [
  {
    fileName: 'rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
    fileSize: 6689,
    height: 480,
    type: 'image/jpeg',
    uri: 'file:///data/user/0/com.PostManagementApp/cache/rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
    width: 480
  },
  {
    fileName: 'rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
    fileSize: 6689,
    height: 480,
    type: 'image/jpeg',
    uri: 'file:///data/user/0/com.PostManagementApp/cache/rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
    width: 480
  }
];

export {
  initialUser,
  mockAdmin,
  mockUser,
  mockPost,
  mockLikes,
  mockCommentsList,
  mockNewPost,
  mockEditedPost,
  mockApprovedPost,
  mockLike,
  mockNewComment,
  mockPhotos
};
