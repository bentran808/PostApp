import moment from 'moment';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, Colors, Menu, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../hooks';
import { selectCurrentUser } from '../../redux/slices';
import { colors } from '../../theme/Colors';
import { DefaultAvatar } from '../../theme/Images';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import { styles } from './CommentsListStyles';

type Props = {
  commentsOfItem: PostComment[];
  visible: string;
  editComment: string;
  editContent: string;
  setVisible: (value: string) => void;
  setEditComment: (value: string) => void;
  onSetEditContent: (value: string) => void;
  onDeleteComment: (id: number) => void;
  onEditComment: (id: number, value: string) => void;
};

const CommentsList = ({
  commentsOfItem,
  visible,
  editComment,
  editContent,
  setVisible,
  setEditComment,
  onSetEditContent,
  onDeleteComment,
  onEditComment
}: Props) => {
  const currentUser = useAppSelector((state) => selectCurrentUser(state));
  const userId = currentUser?.id;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <FlatList
      testID="commentList"
      data={commentsOfItem}
      renderItem={({ item }) => {
        const isAuthorComment = item.author.id === userId || isAdmin;
        return (
          <View style={styles.commentWrapper}>
            <View style={styles.commentList}>
              <View style={styles.commentInfo}>
                <Image
                  defaultSource={DefaultAvatar}
                  source={{
                    uri: item.author.avatar
                  }}
                  style={styles.commentAvatar}
                />
                <Text style={styles.commentUserName}>{item.author.name}</Text>
                <Text style={styles.commentTime}>
                  {moment(new Date(item.updatedAt || 0)).fromNow()}
                </Text>
              </View>
              {isAuthorComment && (
                <Menu
                  visible={visible === `comment-${item.id}`}
                  onDismiss={() => setVisible('')}
                  anchor={
                    <TouchableOpacity
                      onPress={() => setVisible(`comment-${item.id}`)}
                      testID="MenuOfComment"
                    >
                      <Ionicons name="ellipsis-vertical" size={16} color={Colors.black} />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setVisible('');
                      setEditComment(`comment-${item.id}`);
                      onSetEditContent(item.content);
                    }}
                    title="Edit"
                    testID="EditOfComment"
                  />
                  <Menu.Item
                    onPress={() => {
                      setVisible('');
                      onDeleteComment(item.id);
                    }}
                    title="Delete"
                    testID="DeleteOfComment"
                  />
                </Menu>
              )}
            </View>
            {editComment === `comment-${item.id}` ? (
              <View style={styles.commentInput}>
                <TextInput
                  mode="outlined"
                  value={editContent}
                  activeOutlineColor={colors.royalBlue}
                  style={{
                    width: windowWidth / 2,
                    height: windowHeight / 20
                  }}
                  onChangeText={(itemValue) => onSetEditContent(itemValue)}
                  placeholder="Write a comment"
                  right={
                    editContent ? (
                      <TextInput.Icon
                        name="close-circle-outline"
                        size={18}
                        onPress={() => onSetEditContent('')}
                        testID="clearEditComment"
                      />
                    ) : undefined
                  }
                />
                <Button
                  color={colors.royalBlue}
                  labelStyle={styles.text_sm}
                  uppercase={false}
                  disabled={editContent === ''}
                  onPress={() => {
                    onEditComment(item.id, editContent);
                    setEditComment('');
                  }}
                  testID="buttonSave"
                >
                  Save
                </Button>
                <Button
                  color={colors.royalBlue}
                  labelStyle={styles.text_sm}
                  uppercase={false}
                  onPress={() => {
                    setEditComment('');
                    onSetEditContent(item.content);
                  }}
                  testID="buttonCancel"
                >
                  Cancel
                </Button>
              </View>
            ) : (
              <Text>{item.content}</Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default React.memo(CommentsList);
