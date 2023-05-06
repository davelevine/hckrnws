import { NextPage } from "next";
import { useRouter } from "next/router";
import { TDetailedStory } from "~/types/story";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Meta from "~/components/Common/Meta";
import CommentList from "~/components/Comments/CommentList";
import { BackIcon, StarIcon } from "~/icons";
import { useTheme } from "next-themes";
import { Size } from "~/types/size";
import useWindowSize from "~/hooks/useWindowSize";
import useStore from "~/store/useStore";
import { decode } from "html-entities";
import InnerHTMLText from "~/components/Common/InnerHTMLText";

type Props = {
  errorCode: false | number;
};

const Story: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const { errorCode } = props;
  const [storyData, setStoryData] = useState<TDetailedStory | null>(null);
  const [isStoryStarred, setIsStoryStarred] = useState(false);

  const size: Size = useWindowSize();

  const starStory = useStore((state) => state.starStory);
  const starred = useStore((state) => state.starred);

  const { theme } = useTheme();
  const stroke = theme === "light" ? "#161618" : "#FFFFFF";

  const onClickBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const isMobile = (size?.width ?? 641) < 640;

  const handleStar = () => {
    const isStoryStarred = starred?.some((story) => story.id === id);
    if (isStoryStarred) {
      const filteredStories = starred?.filter((story) => story.id !== id);
      starStory(filteredStories);
    } else {
      starStory([...starred, story]);
    }
  };

useEffect(() => {
  if (storyData) {
    setIsStoryStarred(starred?.some((story) => story.id === storyData.id));
  }
}, [starred, storyData]);

  useEffect(() => {
    const fetchStoryData = async () => {
      const { id } = router.query;
      const response = await fetch(`https://api.xdv.com/item/${id}`);
      const data = await response.json();
      setStoryData(data);
    };

    fetchStoryData();
  }, [router.query]);

  if (errorCode) {
    return <div>Oops! Something went wrong :(</div>;
  }

  if (!storyData) {
    return <div>Loading...</div>;
  }

  const { title, id, points, user, time, content, comments, domain, url } = storyData;

  const story = {
    id,
    title,
    points,
    user,
    time,
    url,
    domain,
    comments_count: comments.length,
  };

  return (
    <Fragment>
      <Head>
        <title>{decode(title)} - Hacker News</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex flex-col flex-1">
        <button
          className="px-2 py-1 bg-transparent rounded flex items-center mb-2 w-fit group hover:bg-hover"
          onClick={onClickBack}
        >
          <BackIcon className="w-3 h-3 text-icon group-hover:text-primary" />
          <span className="text-base ml-1 font-serif text-secondary group-hover:text-primary">
            Back
          </span>
        </button>
        <div className="flex flex-col p-4 bg-primary border border-primary rounded">
          <h2 className="text-lg md:text-xl font-medium text-primary m-0 mb-1 font-serif">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {decode(title)}
            </a>
          </h2>
          <div className="flex items-center">
            <Meta
              time={time}
              points={points}
              user={user}
              isDetailedView
              comments={comments.length}
              url={url}
            />
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <p className="text-sm ml-0.5 text-secondary font-normal font-serif">
              by <span className="font-semibold text-primary">{user}</span>
            </p>
            <button
              className="flex mr-2 p-1 w-fit items-center cursor-pointer rounded border-none hover:bg-hover"
              onClick={handleStar}
            >
              <StarIcon
                className={`h-3 w-3 ${
                  isStoryStarred ? "text-amber-400" : "text-icon"
                }`}
              />
              <span className="text-sm ml-1 text-secondary font-serif">
                {isStoryStarred ? "Starred" : "Star"}
              </span>
            </button>
          </div>
          {content && <InnerHTMLText content={content} isDescription />}
        </div>
        <CommentList comments={comments} op={user} />
      </div>
    </Fragment>
  );
};

export default Story;