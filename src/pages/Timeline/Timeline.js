import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.js";
import { getPostAPI, getPostOldAPI, getPostRecentsAPI } from "../../api/getPostAPI.js";
import { PageBody, Loading, TrendingBox, TrendingTitle, Hashtag, LoadPost } from "./style.js";
import PostCard from "../../components/PostCard/PostCard.js";
import PublishCard from "../../components/PublishCard/PublishCard.js";
import { useContext } from "react";
import Context from "../../contexts/auth.js";
import axios from "axios";
import { useNavigate } from "react-router";
import { GoSync } from "react-icons/go";
import useInterval from "use-interval";
import SectionSearchInput from "../../components/SearchNameInput/SectionSearch.js";
import InfiniteScroll from "react-infinite-scroller";
import PageLoad from "../../components/Load/Load.js";

export default function Timeline() {

    const { user } = useContext(Context);
    const [load, setLoad] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [userNewPosts, setUserNewPosts] = useState([]);
    const [hasMoreOldPosts, setHasMoreOldPosts] = useState(true)
    const [trending, setTrending] = useState([]);
    const navigate = useNavigate();
    const [follow, setFollow] = useState([]);

    async function getPosts() {
        const getPostRes = await getPostAPI(user);
        if (getPostRes.success) {
            setUserPosts(getPostRes.postsRetrived);
            setLoad(false);
            return;
        }
    }

    useInterval(() => {
        checkNewPosts();
    }, 15000);

    async function checkNewPosts() {
        if (userPosts.length === 0) {
            const getPostRes = await getPostRecentsAPI(user, "2000-01-1 10:11:06.588596");
            if (getPostRes.success) {
                const newPosts = getPostRes.postsRetrived;
                setUserNewPosts(newPosts);
                return;
            }
        }
        else {
            const getPostRes = await getPostRecentsAPI(user, userPosts[0].createdAt);
            if (getPostRes.success) {
                const newPosts = getPostRes.postsRetrived;
                setUserNewPosts(newPosts);
                return;
            }
        }
    }

    function addNewPosts() {
        if (userPosts.length === 0) {
            setUserPosts([...userNewPosts]);
            setUserNewPosts([]);
            return;
        }
        else {
            setUserPosts([...userNewPosts, ...userPosts]);
            setUserNewPosts([]);
            return;
        }
    }


    async function checkOldPosts() {
        const lastDate = (userPosts[userPosts.length - 1].createdAt);

        const getPostRes = await getPostOldAPI(user, lastDate);
        if (getPostRes.success) {
            const oldPosts = getPostRes.postsRetrived;
            if (oldPosts.length === 0) {
                setHasMoreOldPosts(false);
                return;
            }

            setUserPosts(userPosts.concat(oldPosts));
            return;
        }
    }

    function renderTimeline() {
        if (userPosts.length > 0) {
            return (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={checkOldPosts}
                    hasMore={hasMoreOldPosts}
                    loader={<PageLoad />}
                >
                    {userPosts.map(
                        (postProp) => <PostCard
                            getPosts={getPosts}
                            currentUser={user.id}
                            userPost={postProp}
                            key={((postProp.repostUserName) ?
                                "Repost" + postProp.repostUserName + postProp.id
                                : postProp.id)}
                        />
                    )}
                </InfiniteScroll>
            );
        }
        else {
            return (
                <Loading data-test="message">
                    {!follow?.length > 0 ?
                        <p>You don't follow anyone yet. <br />Search for new friends!</p> :
                        <p>No posts found from your friends</p>
                    }
                </Loading>
            );
        }
    }

    useEffect(() => {
        getPosts();

        axios.get(`${process.env.REACT_APP_API_URL}/followers`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }).then((res) => {
            setFollow(res.data)
        }).catch((err) => {
            console.log(err.message);
        })

        axios.get(`${process.env.REACT_APP_API_URL}/trending`)
            .then((res) => {
                setTrending(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }, []);

    return (
        <>
            <Header userImage={user.pictureUrl} />
            <PageBody>
                <SectionSearchInput display="mobile" />
                <div>
                    <h4>timeline</h4>
                    <PublishCard
                        userImage={user.pictureUrl}
                        userPosts={userPosts}
                        getPosts={getPosts}
                    />
                    <h5 name="mobile">timeline</h5>
                    {userNewPosts.length !== 0 ?
                        <LoadPost onClick={addNewPosts} data-test="load-btn">
                            <div>
                                {userNewPosts.length} new posts, load more!
                                <GoSync style={{ margin: "0px 20px" }} color="white" size='16' />
                            </div>
                        </LoadPost>
                        :
                        <></>
                    }
                    {load ? (<PageLoad />) : renderTimeline()}
                </div>
                <TrendingBox data-test="trending">
                    <TrendingTitle>trending</TrendingTitle>
                    <div>
                        {trending.map(e =>
                            <Hashtag data-test="hashtag"
                                key={e.hashtag}
                                onClick={() =>
                                    navigate(`/hashtag/${e.hashtag.replace("#", "")}`)}
                            >
                                {e.hashtag}
                            </Hashtag>
                        )}
                    </div>
                </TrendingBox>
            </PageBody>
        </>
    );
}