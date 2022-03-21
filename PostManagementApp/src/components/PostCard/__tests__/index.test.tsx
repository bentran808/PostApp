import React from 'react';
import PostCard from '../index';

import { render } from '../../../utils/test-utils';

describe('Post Card Component', () => {
  it('renders correctly', () => {
    const props = {
      item: {
        author: {
          id: '621c4188dece66a40dad2951',
          avatar: 'https://picsum.photos/200',
          name: 'Admin',
          gender: 'male',
          email: 'admin@admin.com',
          phone: '+84 (919) 507231',
          address: '199 Bergen Street, Bowie, Oregon, 7933',
          role: 'admin'
        },
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
      },
      onShowImage: jest.fn(),
      onEdit: jest.fn(),
      onDelete: jest.fn()
    };

    const component = render(<PostCard {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
