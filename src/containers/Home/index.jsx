import React, { useState, useContext, useEffect, useCallback, useRef } from "react"
import tw from "twin.macro";
import Slick from "react-slick";
import { Link, useHistory, useLocation } from "react-router-dom";

import { StoreContext } from "../../store";
import types from "../../store/types";
import httpRequest from "../../services/http";
import { requestEndpoints } from "../../constants";
import { Bucket, Button, Image, Text, FlexBox, StoryCard, Tooltip } from "../../components"
import { Jumbotron, SearchBox , SearchInput, Marker, StorieSlider, SliderArrow, SliderFilter, JumbotronButton } from "./styles";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import { ReactComponent as ChevronIcon } from "../../assets/svg/chevron.svg";
import { ReactComponent as MarkerIcon } from "../../assets/svg/marker.svg";
import { ReactComponent as GithubIcon } from "../../assets/svg/github.svg";
import { ReactComponent as InstagramIcon } from "../../assets/svg/instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitter.svg";

const SliderArrowPrev = ({ onClick }) => (
   <SliderArrow css={["left: 50px; top: 50%; transform: translate(0, -50%);"]} onClick={onClick}>
      <ChevronIcon css={[tw`w-2 h-2 stroke-current text-white transform rotate-180`]} />
   </SliderArrow>
);

const SliderArrowNext = ({ onClick }) => (
   <SliderArrow css={["right: 0px; top: 50%; transform: translate(0, -50%);"]} onClick={onClick}>
      <ChevronIcon css={[tw`w-2 h-2 stroke-current text-white`]} />
   </SliderArrow>
);

const Home = () => {
   const sliderSettings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      centerMode: true,
      nextArrow: <SliderArrowNext />,
      prevArrow: <SliderArrowPrev />
   }

   const locationMarkers = [
      { location: "51° 07’ N | -115° 33’ W", top: "10%", left: "100%", slug: "UBl39AHBn--Banff-National-Park"},
      { location: "50° 03’ N | 19° 56’ E", top: "20%", left: "50%", slug: "jz4ePgjoGI-Wawel-Royal-Castle"},
      { location: "41° 08’ N | 8° 36’ W", top: "75%", left: "15%", slug: "W-DBS_vxrn-Bali"},
      { location: "8° 19’ S | 115° 05’ E", top: "68%", left: "92%", slug: "cwA4jDUEKJ-Mt.-Pulag-National-Park"},
      { location: "16° 35’ N | 120° 54’ E", top: "82%", left: "55%", slug: "hvO6wfZ6Cz-Palacio-da-Bolsa"},
      { location: "55° 56’ N | 3° 12’ E", top: "50%", left: "50%", slug: "PIE1ZIhbNV-Edinburgh-Castle"}
   ]

   const context = useContext(StoreContext);
   const { state: { stories, global }, dispatch } = context;
   const [sliderFilter, setSliderFilter] = useState("popular");
   const [searchQuery, setSearchQuery] = useState("");
   const [isMounted, setIsMounted] = useState(false);
   const location = useLocation();
   const history = useHistory();

   const searchBoxRef = useRef(null);

   useEffect(() => {
      setIsMounted(true);

      return () => {
         setIsMounted(false);
      }
   }, []);

   const handleSearch = async (e) => {
      if(e.key !== "Enter") return;

      if(!isMounted) return; // prevent calling setState on an unmounted component

      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: searchResponse } = await httpRequest(
            requestEndpoints.stories.search(searchQuery), {
            method: "GET"
         });

         dispatch({
            namespace: "stories",
            type: types.SET_STORIES_FEED,
            payload: searchResponse.data.stories
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });

         history.push("/stories", {shouldNotFetchStories: true});
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Oops! something went wrong, please check your network and try again."
            }
         });
      }

      setSearchQuery("");
   }

   useEffect(() => {
      const handleSearchFocus = (e) => {
         if(!e.altKey || e.key !== "s") return;

         searchBoxRef.current.focus();
      }

      window && window.addEventListener("keydown", handleSearchFocus);

      return () => { // cleanup
         window && window.removeEventListener("keydown", handleSearchFocus);
      }
   }, []);

   const fetchStories = useCallback(async () => {
      // if(stories.feed.length > 0) return;

      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: response } = await httpRequest(requestEndpoints.stories.feed(sliderFilter, "5"), {
            method: "GET"
         });

         dispatch({
            namespace: "stories",
            type: types.SET_STORIES_FEED,
            payload: response.data.stories
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Oops! something went wrong, please check your network and try again."
            }
         });
         console.error(err.response || err.message);
      }
   }, [dispatch, sliderFilter]);

   useEffect(() => {
      void async function() {
         await fetchStories();
      }();
   }, [fetchStories]);

   return (
      <Bucket css={[tw`bg-chill-gray1 h-full`]}>
         <FlexBox css={[tw`items-start`]}>
            <Jumbotron>
               <Image src="https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/travel-illustration.png"></Image>
               <FlexBox isCol css={[tw`w-full h-full absolute inset-0 z-10 w-9/12 mx-8 items-start`]}>
                  <Text css={[tw`text-white font-bold text-4xl leading-tight`]}>The most beautiful places in the world!</Text>
                  <Text css={[tw`text-white font-medium text-c-18 mt-2`]}>Find your next adventure.</Text>
                  <Link to="/login">
                     <JumbotronButton>
                        Get started
                        <ChevronIcon css={[tw`stroke-current text-chill-indigo2 ml-2 w-3 h-3`]}/>
                     </JumbotronButton>
                  </Link>
                  { locationMarkers.map((marker, idx) => (
                     <Marker top={marker.top} left={marker.left} key={idx}>
                        <Link to={{pathname: `/x/story/${marker.slug}`, state: {background: location, component: "story"}}}>
                        <Tooltip content={marker.location} placement="top" isLight>
                           <MarkerIcon css={[tw`w-5 h-5 fill-current text-white hover:text-green-400 cursor-pointer`]}/>
                        </Tooltip>
                        </Link>
                     </Marker>
                  ))}
               </FlexBox>
            </Jumbotron>

            <Bucket css={[tw`w-2/5 mx-10 mt-8`]}>
               <SearchBox>
                  <SearchInput
                     placeholder="Search for stories, tags, locations... [alt+s]"
                     onKeyDown={handleSearch}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     ref={searchBoxRef}
                  />
                  <SearchIcon css={[tw`w-4 h-4 absolute right-0 top-0 mr-4 mt-3`]} />
               </SearchBox>

               <Bucket css={[tw`mt-8`]}>
                  <Text css={[tw`font-semibold text-3xl`]}>Discover</Text>
               </Bucket>

               <FlexBox css={[tw`justify-start mt-4`]}>
                  <SliderFilter isActive={sliderFilter === "popular"} onClick={() => setSliderFilter("popular")}>
                     <Text css={[tw`text-c-15 font-semibold cursor-pointer`]}>
                        Popular
                     </Text>
                     <Bucket as="span" css={[tw`inline-block bg-chill-indigo1 w-1 h-1 rounded-full invisible`]}></Bucket>
                  </SliderFilter>
                  <SliderFilter isActive={sliderFilter === "following"} onClick={() => setSliderFilter("following")}>
                     <Text css={[tw`text-c-15 font-semibold cursor-pointer`]}>
                        Following
                     </Text>
                     <Bucket as="span" css={[tw`inline-block bg-chill-indigo1 w-1 h-1 rounded-full invisible`]}></Bucket>
                  </SliderFilter>
                  <SliderFilter isActive={sliderFilter === "recent"} onClick={() => setSliderFilter("recent")}>
                     <Text css={[tw`text-c-15 font-semibold cursor-pointer`]}>
                        Recent
                     </Text>
                     <Bucket as="span" css={[tw`inline-block bg-chill-indigo1 w-1 h-1 rounded-full invisible`]}></Bucket>
                  </SliderFilter>
               </FlexBox>

               <StorieSlider>
                  {global.status === "done" &&
                  <Slick {...sliderSettings}>
                     {stories.feed.map((story, idx) => (
                        <StoryCard isSlider story={story} key={idx} />
                     ))}
                  </Slick>
                  }
               </StorieSlider>

               <Link to={{ pathname: "/x/new", state: { background: location, component: "newStory" }}}>
               <Bucket css={[tw`mt-8`]}>
                  <Button css={[tw`text-c-15 font-semibold px-4 py-2 rounded-md bg-chill-indigo2`]}>Share your story</Button>
               </Bucket>
               </Link>

               <FlexBox css={[tw`justify-start mt-8`]}>
                  <GithubIcon css={[tw`w-5 h-5 fill-current text-chill-gray4 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
                  <InstagramIcon css={[tw`w-5 h-5 fill-current text-chill-gray4 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
                  <TwitterIcon css={[tw`w-5 h-5 fill-current text-chill-gray4 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
               </FlexBox>

               <FlexBox css={[tw`justify-start mt-8`]}>
                  <Bucket as="span" css={[tw`inline-block w-8 h-8 mr-2 rounded-full overflow-hidden`]}>
                     <Image src="https://avatars1.githubusercontent.com/u/46647640?s=400&u=2be345c5e5575fc1088c232b138660e6749a44f3&v=4"/>
                  </Bucket>
                  <Text css={[tw`font-medium`]}>
                     Designed and developed by <Text as="a" href="https://github.com/Mayowa-Ojo" css={[tw`cursor-pointer font-semibold hover:text-chill-indigo1`]}>Mayowa Ojo</Text>
                  </Text>
               </FlexBox>
            </Bucket>
         </FlexBox>
      </Bucket>
   )
}

export default Home;
