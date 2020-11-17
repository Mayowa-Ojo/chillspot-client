import React, { useState } from 'react'
import tw from "twin.macro";
import Slick from "react-slick";

import { Bucket, Button, Image, Text, FlexBox, StoryCard } from "../../components"
import { Jumbotron, SearchBox , SearchInput, Marker, StorieSlider, SliderArrow, SliderFilter } from './styles';
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

   const [sliderFilter, setSliderFilter] = useState("popular");

   return (
      <Bucket css={[tw`bg-chill-gray1 h-full`]}>
         <FlexBox css={[tw`items-start`]}>
            <Jumbotron>
               <Image src="https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/mountain-1624284_1280.jpg"></Image>
               <FlexBox isCol css={[tw`w-full h-full absolute inset-0 z-10 w-9/12 mx-8 items-start`]}>
                  <Text css={[tw`text-white font-bold text-4xl leading-tight`]}>The most beautiful places in the world!</Text>
                  <Text css={[tw`text-white font-medium text-c-18`]}>Find your next adventure.</Text>
                  <Button css={[tw`bg-chill-indigo2 px-4 mt-4 text-c-18 font-semibold inline-flex items-center`]}>
                     Explore
                     <ChevronIcon css={[tw`stroke-current text-white ml-2 w-3 h-3`]}/>
                  </Button>
                  <Marker top="10%" left="100%">
                     <MarkerIcon css={[tw`w-5 h-5 fill-current text-white hover:text-yellow-400 cursor-pointer`]}/>
                  </Marker>
                  <Marker top="20%" left="50%">
                     <MarkerIcon css={[tw`w-5 h-5 fill-current text-white hover:text-yellow-400 cursor-pointer`]}/>
                  </Marker>
                  <Marker top="75%" left="15%">
                     <MarkerIcon css={[tw`w-5 h-5 fill-current text-white hover:text-yellow-400 cursor-pointer`]}/>
                  </Marker>
                  <Marker top="68%" left="92%">
                     <MarkerIcon css={[tw`w-5 h-5 fill-current text-white hover:text-yellow-400 cursor-pointer`]}/>
                  </Marker>
                  <Marker top="82%" left="55%">
                     <MarkerIcon css={[tw`w-5 h-5 fill-current text-white hover:text-yellow-400 cursor-pointer`]}/>
                  </Marker>
                  <Marker top="50%" left="50%">
                     <MarkerIcon css={[tw`w-5 h-5 fill-current text-white hover:text-yellow-400 cursor-pointer`]}/>
                  </Marker>
               </FlexBox>
            </Jumbotron>

            <Bucket css={[tw`w-2/5 mx-10 mt-8`]}>
               <SearchBox>
                  <SearchInput placeholder='Search... press "/" to focus'/>
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
                  <SliderFilter isActive={sliderFilter === "rating"} onClick={() => setSliderFilter("rating")}>
                     <Text css={[tw`text-c-15 font-semibold cursor-pointer`]}>
                        Rating
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
                  <Slick {...sliderSettings}>
                     <StoryCard isSlider />
                     <StoryCard isSlider />
                     <StoryCard isSlider />
                  </Slick>
               </StorieSlider>

               <Bucket css={[tw`mt-8`]}>
                  <Button css={[tw`text-c-18 font-semibold px-4 rounded-md bg-chill-indigo2`]}>Share your story</Button>
               </Bucket>

               <FlexBox css={[tw`justify-start mt-8`]}>
                  <GithubIcon css={[tw`w-5 h-5 fill-current text-chill-gray4 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
                  <InstagramIcon css={[tw`w-5 h-5 fill-current text-chill-gray4 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
                  <TwitterIcon css={[tw`w-5 h-5 fill-current text-chill-gray4 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
               </FlexBox>

               <FlexBox css={[tw`justify-start mt-8`]}>
                  <Bucket as="span" css={[tw`inline-block w-8 h-8 mr-2 rounded-full overflow-hidden`]}>
                     <Image src="https://avatars1.githubusercontent.com/u/46647640?s=400&u=2be345c5e5575fc1088c232b138660e6749a44f3&v=4"/>
                  </Bucket>
                  <Text css={[tw`font-semibold`]}>
                     Designed and developed by <Bucket as="span" css={[tw`cursor-pointer hover:text-chill-indigo1`]}>@unorthodev</Bucket>
                  </Text>
               </FlexBox>
            </Bucket>
         </FlexBox>
      </Bucket>
   )
}

export default Home;
