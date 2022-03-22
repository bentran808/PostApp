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

const mockUser = {
  id: '621c4188dece66a40dad2951',
  avatar: 'https://picsum.photos/200',
  name: 'Admin',
  gender: 'male',
  email: 'admin@admin.com',
  phone: '+84 (919) 507231',
  address: '199 Bergen Street, Bowie, Oregon, 7933',
  role: 'admin'
};

const mockPost = {
  author: mockUser,
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
    }
  ],
  pending: false,
  createdAt: 1647507076963,
  updatedAt: 1647511146749,
  id: 2
};

const mockLikes = [
  {
    author: mockUser,
    postId: 2,
    createdAt: 1647509052801,
    updatedAt: 1647509052801,
    id: 1
  }
];

const mockCommentsList = [
  {
    author: mockUser,
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

export { initialUser, mockUser, mockPost, mockLikes, mockCommentsList };