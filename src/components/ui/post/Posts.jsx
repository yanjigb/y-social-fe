
import axios from "axios";
import {
  lazy,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import "./style/post.css";

import AppAdvertise from "components/features/app-advertise";
import Global from "constant/global";
import SocketEvent from "constant/socket-event";
import { useCurrentUser } from "hooks";
import { getPostByID } from "redux/request/postRequest";
import RequiredBanner from "./components/RequiredBanner";

const Post = lazy(() => import("./Post"));

const Posts = ({ socket }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const loadingRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const currentUser = useCurrentUser();

  if (!currentUser) return <RequiredBanner />;

  const handleSocket = {
    updatePost: useCallback(
      (data) => {
        const { _id } = data;

        getPostByID(_id, dispatch).then((data) => {
          const originalPost = data.data;
          setPosts((prevPosts) => {
            const updatePost = prevPosts.map((p) =>
              p._id === originalPost._id ? originalPost : p,
            );

            return updatePost;
          });
        });
      },
      [dispatch],
    ),
    uploadPost: useCallback((data) => {
      setPosts((prevPosts) => [data, ...prevPosts]);
    }, []),
    deletePost: useCallback((data) => {
      const { _id } = data;
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((p) => p._id !== _id);
        return updatedPosts;
      });
    }, []),
  };

  useEffect(() => {
    socket = io(Global.SOCKET_URL);

    socket.on(SocketEvent.UPDATED_POST, handleSocket.updatePost);
    socket.on(SocketEvent.UPLOADED_POST, handleSocket.uploadPost);
    socket.on(SocketEvent.DELETED_POST, handleSocket.deletePost);

    return () => {
      socket.off(SocketEvent.UPDATED_POST, handleSocket.updatePost);
      socket.off(SocketEvent.UPLOADED_POST, handleSocket.uploadPost);
      socket.off(SocketEvent.DELETED_POST, handleSocket.deletePost);
    };
  }, [
    handleSocket.updatePost,
    handleSocket.uploadPost,
    handleSocket.deletePost,
    socket,
  ]);

  const fetchPosts = async () => {
    const res = await axios.get(
      Global.SOCKET_URL + `/api/v1/post/all-posts?limit=5&skip=${page * 5}`,
    );
    const { posts } = res.data;

    if (posts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prevPost) => [...prevPost, ...posts]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchMorePosts = useCallback(() => {
    fetchPosts();
  }, [page]);

  // Auto load more post
  const onIntersection = useCallback(
    (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        fetchMorePosts();
      }
    },
    [fetchMorePosts, hasMore],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [posts, onIntersection]);

  return (
    <div className="posts">
      <AppAdvertise userID={currentUser._id} className="mb-4" />
      <PostList postList={posts} socket={socket} />
      <LoadingBar
        currentUser={currentUser}
        hasMore={hasMore}
        loadingRef={loadingRef}
      />
    </div>
  );
};

const PostList = ({ postList, socket }) => {
  return postList.map((post) => (
    <Post
      key={post._id}
      postID={post._id}
      image={post.img}
      video={post.video}
      userID={post.userID}
      desc={post.desc}
      likes={post.likes}
      shares={post.shares}
      comments={post.comments}
      socket={socket}
      createdAt={post.createdAt}
      updatedAt={post.updatedAt}
    />
  ));
};

const LoadingBar = ({ currentUser, hasMore, loadingRef }) => {
  return (
    currentUser &&
    hasMore && (
      <div
        className="d-flex justify-content-center fs-3 fw-bold my-3"
        ref={loadingRef}
      >
        Loading...
      </div>
    )
  );
};

export default memo(Posts, isEqual);
