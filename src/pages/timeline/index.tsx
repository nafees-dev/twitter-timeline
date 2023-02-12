import React, { useEffect, useState, useCallback } from "react";
import { RequestApi } from "../../api";
import { calculateSize } from "../../utils";
import { GET_TIMELINES, LIKE_POST, UNLIKE_POST } from "../../api/urls";
import CustomCard from "../../components/Card";
import { IPost } from "../../interface/timeline.interface";
import { MainComponent, Wrapper, SideBarComponent, SummaryComponent, LabelText } from "./styled";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/Loader";

const TwitterTimeline = () => {
  const [postList, setPostList] = useState<Array<IPost>>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMBs, setTotalMBs] = useState(0);
  /* NOTE: This should be handle from backend side but there is no attribute on payload
     that's why for now creating it on frontend for test demo
  */
  const [likedPost, setLikedPost] = useState<Array<string>>([]);

  // const getTimelines = async (page = 1) => {
  //   setLoading(true);
  //   GET_TIMELINES.queryParams = `?page=${page}`;

  //   const result = await RequestApi(GET_TIMELINES);
  //   if (result.error) return;

  //   const totalPages = result.data.totalPages;
  //   dataSize([...postList, ...result.data.data]);
  //   setTotalPages(totalPages);
  //   setPostList([...postList, ...result.data.data]);
  //   setLoading(false);
  // };

  const getTimelines = useCallback(
    async (page: any) => {
      setLoading(true);
      GET_TIMELINES.queryParams = `?page=${page}`;

      const result = await RequestApi(GET_TIMELINES);
      if (result.error) return;

      const totalPages = result.data.totalPages;
      dataSize([...postList, ...result.data.data]);
      setTotalPages(totalPages);
      setPostList([...postList, ...result.data.data]);
      setLoading(false);
    },
    [postList]
  );

  useEffect(() => {
    getTimelines(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataSize = (data: Array<any>) => {
    const calMBs = calculateSize(data);
    setTotalMBs(calMBs);
  };

  const onLikeAndUnLikePost = async (post_id: string, index: number) => {
    const formData = new FormData();
    formData.append("post_id", post_id);
    // Check if it's already liked then call the unlike api
    const isAlreadyLiked = likedPost.includes(post_id);
    let CONDITION_OBJECT: any = {};
    isAlreadyLiked ? (CONDITION_OBJECT = UNLIKE_POST) : (CONDITION_OBJECT = LIKE_POST);
    CONDITION_OBJECT.body = formData;
    const result = await RequestApi(CONDITION_OBJECT);

    if (result.data.status === "ok") {
      const newPostList = [...postList];
      if (isAlreadyLiked) {
        let newLikedPost = [...likedPost];
        newLikedPost.splice(likedPost.indexOf(post_id), 1);
        setLikedPost(newLikedPost);
        newPostList[index].likes_count = postList[index].likes_count - 1;
      } else {
        newPostList[index].likes_count = postList[index].likes_count + 1;
        setLikedPost([...likedPost, post_id]);
      }
      setPostList(newPostList);
    }
  };

  const onLoadMore = useCallback(
    async (page: any) => {
      page = page + 1;

      if (loading) return;

      if (page <= totalPages && page !== 0) {
        getTimelines(page);
      }
      if (totalPages && page > totalPages) {
        setHasMore(false);
      }
    },
    [loading, totalPages, getTimelines]
  );

  /* 
    NOTE:
      The Sidebar componenet and Summary component would be in layout page, but I have to implement just timeline 
      that's why I placed it here.
  */
  return (
    <>
      <Wrapper>
        <SideBarComponent />
        <MainComponent>
          <InfiniteScroll initialLoad={false} pageStart={0} loadMore={onLoadMore} threshold={400} hasMore={hasMore && !loading} loader={<Loader />} useWindow={false}>
            {postList.map((item, index) => (
              <React.Fragment key={index}>
                <CustomCard key={index} index={index} postData={item} onLikeAndUnlikePost={onLikeAndUnLikePost} likedPost={likedPost} />
              </React.Fragment>
            ))}
          </InfiniteScroll>
        </MainComponent>

        <SummaryComponent>
          <LabelText>Total Size: {totalMBs} MB</LabelText>
          <LabelText>Total Post: {postList.length} Post</LabelText>
        </SummaryComponent>
      </Wrapper>
    </>
  );
};

export default TwitterTimeline;
