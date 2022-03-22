import moment from 'moment';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Slider from 'react-native-hook-image-slider';
import { Button, Colors, Menu, TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/Colors';
import { useAppSelector } from '../../hooks';
import { selectCurrentUser } from '../../redux/slices';
import { DefaultAvatar } from '../../theme/Images';
import { windowWidth } from '../../utils/Dimensions';
import { formatPrice } from '../../utils/helpers';
import CommentsList from '../CommentsList';
import { styles } from './PostCardStyles';

type PostCardProps = {
  item: Post;
  isMyPost?: Boolean;
  likesOfItem?: PostLike[];
  commentsOfItem?: PostComment[];
  onShowImage: (photos: Photo[]) => void;
  onEdit: () => void;
  onDelete: () => void;
  onLikePost?: (postId: number) => void;
  onUnlikePost?: (likeId: number) => void;
  onAddNewComment?: (postId: number, content: string) => void;
  onDeleteComment?: (commentId: number) => void;
  onEditComment?: (commentId: number, editContent: string) => void;
  onApprovePost?: () => void;
  onRejectPost?: () => void;
};

const PostCard = ({
  item,
  isMyPost = false,
  likesOfItem = [],
  commentsOfItem = [],
  onShowImage,
  onEdit,
  onDelete,
  onLikePost = () => {},
  onUnlikePost = () => {},
  onAddNewComment = () => {},
  onDeleteComment = () => {},
  onEditComment = () => {},
  onApprovePost = () => {},
  onRejectPost = () => {}
}: PostCardProps) => {
  const [visible, setVisible] = useState('');
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [visibleComment, setVisibleComment] = useState(false);
  const [editComment, setEditComment] = useState('');
  const [content, setContent] = useState('');
  const [editContent, setEditContent] = useState('');
  const currentUser = useAppSelector((state) => selectCurrentUser(state));
  const userId = currentUser?.id;
  const isAdmin = currentUser?.role === 'admin';
  const isAuthor = userId === item.author.id || isAdmin;
  const likedPost = likesOfItem.find((like) => like.author.id === userId);
  const numberOfLikes = likesOfItem.length;
  const numberOfComments = commentsOfItem.length;
  const likeIcon = likedPost ? 'heart' : 'heart-outline';
  const likeIconColor = likedPost ? colors.royalBlue : colors.nightRider;
  const likeBackground = likedPost ? '#2e64e515' : 'transparent';
  let likeText = 'Like';
  let commentText = 'Comment';

  if (numberOfLikes === 1) {
    likeText = '1 Like';
  } else if (numberOfLikes > 1) {
    likeText = numberOfLikes + ' Likes';
  }

  if (numberOfComments === 1) {
    commentText = '1 Comment';
  } else if (numberOfComments > 1) {
    commentText = numberOfComments + ' Comments';
  }

  return (
    <View style={styles.card} key={`Post-${item.id}`}>
      <TouchableOpacity testID="showImage" onPress={() => onShowImage(item.photos)}>
        <View style={{ width: windowWidth * 0.9 }}>
          <Slider
            images={item.photos.map((photo: { uri: string }) => photo.uri)}
            imageHeight={200}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.infoSection}>
        <View>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postPrice}>{formatPrice(Number(item.price))}</Text>
          <Text style={styles.postTime}>{moment(new Date(item.updatedAt || 0)).fromNow()}</Text>
          <View style={styles.postLocation}>
            <Ionicons name="md-location-outline" size={20} color={Colors.black} />
            <Text style={styles.postAddress}>{item.address}</Text>
          </View>
        </View>
        {isAuthor && (
          <Menu
            visible={visible === `post-${item.id}`}
            onDismiss={() => setVisible('')}
            anchor={
              <TouchableOpacity onPress={() => setVisible(`post-${item.id}`)} testID="Menu">
                <Ionicons name="ellipsis-vertical" size={20} color={Colors.black} />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                setVisible('');
                onEdit();
              }}
              title="Edit"
              testID="MenuEdit"
            />
            <Menu.Item
              onPress={() => {
                setVisible('');
                onDelete();
              }}
              title="Delete"
              testID="Menu.Delete"
            />
          </Menu>
        )}
      </View>
      {visibleDetails && (
        <View testID="contentDetails">
          <View style={styles.divider} />
          <View style={styles.userInfo}>
            <Image
              defaultSource={DefaultAvatar}
              source={{
                uri: item.author.avatar
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{item.author.name}</Text>
            </View>
          </View>
          <Text style={styles.postText}>{item.description}</Text>
          <View style={styles.postLocation}>
            <FontAwesome name="building-o" size={20} color={Colors.black} />
            <Text style={styles.postAddress}>Product Company: {item.company}</Text>
          </View>
          <View style={styles.postLocation}>
            <Ionicons name="pricetags-outline" size={20} color={Colors.black} />
            <Text style={styles.postAddress}>Type of product: {item.type}</Text>
          </View>
          <View style={styles.postLocation}>
            <Ionicons name="md-calendar-outline" size={20} color={Colors.black} />
            <Text style={styles.postAddress}>Year of registration: {item.year}</Text>
          </View>
          <View style={styles.postLocation}>
            <Ionicons name="md-card-outline" size={20} color={Colors.black} />
            <Text style={styles.postAddress}>Status: {item.status ? 'Used' : 'New'}</Text>
          </View>
        </View>
      )}
      <Button
        testID="showDetails"
        color={colors.nightRider}
        icon={visibleDetails ? 'chevron-up' : 'chevron-down'}
        labelStyle={styles.text_sm}
        uppercase={false}
        onPress={() => setVisibleDetails(!visibleDetails)}
      >
        {visibleDetails ? 'Show less' : 'Show more'}
      </Button>
      {isMyPost ? (
        isAdmin ? (
          <>
            <View style={styles.divider} />
            <View style={styles.buttonControls}>
              <Button
                mode="contained"
                icon="check"
                color={colors.royalBlue}
                onPress={onApprovePost}
              >
                Approve
              </Button>
              <Button
                mode="contained"
                icon="close"
                color={colors.freeSpeechRed}
                onPress={onRejectPost}
              >
                Reject
              </Button>
            </View>
          </>
        ) : (
          item.pending && (
            <>
              <View style={styles.divider} />
              <Text style={styles.emptyList}>This post is pending approval</Text>
            </>
          )
        )
      ) : (
        <>
          <View style={styles.divider} />
          <View style={styles.interactionWrapper}>
            <TouchableOpacity
              onPress={() => (likedPost ? onUnlikePost(likedPost.id) : onLikePost(item.id || 0))}
              style={[
                styles.interaction,
                {
                  backgroundColor: likeBackground
                }
              ]}
              testID="likeButton"
            >
              <Ionicons name={likeIcon} size={25} color={likeIconColor} />
              <Text style={[styles.interactionText, { color: likeIconColor }]}>{likeText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.interaction}
              onPress={() => {
                setVisibleComment(true);
              }}
              testID="commentButton"
            >
              <Ionicons name="md-chatbubble-outline" size={25} />
              <Text style={styles.interactionText}>{commentText}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {visibleComment && (
        <>
          {numberOfComments ? <View style={styles.divider} /> : undefined}
          <CommentsList
            commentsOfItem={commentsOfItem}
            visible={visible}
            editComment={editComment}
            editContent={editContent}
            setVisible={setVisible}
            setEditComment={setEditComment}
            onSetEditContent={setEditContent}
            onDeleteComment={onDeleteComment}
            onEditComment={onEditComment}
          />
          <View style={styles.divider} />
          <View style={styles.commentWrapper} testID="commentWrapper">
            <TextInput
              mode="outlined"
              value={content}
              activeOutlineColor={colors.royalBlue}
              style={styles.commentInput}
              onChangeText={(itemValue) => setContent(itemValue)}
              placeholder="Write a comment"
              right={
                content ? (
                  <TextInput.Icon
                    name="close-circle-outline"
                    size={18}
                    onPress={() => setContent('')}
                  />
                ) : undefined
              }
              testID="inputComment"
            />
            <Button
              color={colors.royalBlue}
              uppercase={false}
              disabled={content === ''}
              onPress={() => {
                onAddNewComment(item.id || 0, content);
                setContent('');
              }}
              testID="buttonAddComment"
            >
              Send
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default PostCard;
