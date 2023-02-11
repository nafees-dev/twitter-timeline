import React, { useEffect, useState, useRef, useCallback } from "react";
import { RequestApi } from "../../api";
import { calculateSize } from "../../utils";
import { GET_TIMELINES, LIKE_POST } from "../../api/urls";
import CustomCard from "../../components/Card";
import { IPost } from "../../interface/timeline.interface";
import { MainComponent, Wrapper, SideBarComponent, SummaryComponent, LabelText } from "./styled";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/Loader";

const TwitterTimeline = () => {
  const [postList, setPostList] = useState<Array<IPost>>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMBs, setTotalMBs] = useState(0);
  const listInnerRef = useRef();

  useEffect(() => {
    getTimelines(currentPage);
  }, []);

  const getTimelines = async (page = 1) => {
    setLoading(true);
    GET_TIMELINES.queryParams = `?page=${page}`;

    const result = await RequestApi(GET_TIMELINES);
    if (result.error) return;

    const totalPages = result.data.totalPages;
    dataSize([...postList, ...result.data.data]);
    setTotalPages(totalPages);
    setPostList([...postList, ...result.data.data]);
    setLoading(false);
  };

  const dataSize = (data: Array<any>) => {
    const calMBs = calculateSize(data);
    setTotalMBs(calMBs);
  };

  // It's returning the 404 on request, I have reported this issue over email
  const getLikes = async (data: any = []) => {
    if (data.length === 0) return null;
    LIKE_POST.body = {
      post_id: data[0].id,
    };
    const result = await RequestApi(LIKE_POST);
    console.log(result);
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
    [loading, postList, totalPages]
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
        <MainComponent ref={listInnerRef}>
          <InfiniteScroll initialLoad={false} pageStart={0} loadMore={onLoadMore} threshold={250} hasMore={hasMore && !loading} loader={<Loader />} useWindow={false}>
            {postList.map((item, index) => (
              <React.Fragment key={index}>
                <CustomCard key={index} postData={item} />
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
