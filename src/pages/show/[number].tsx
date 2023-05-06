import { NextPage } from "next";
import { PageProps } from "~/types/story";
import StoryListItem from "~/components/StoryListItem";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Pagination from "~/components/Common/Pagination";
import { CenteredText } from "~/components/Common/Fragments";

const ShowStoriesList: NextPage<PageProps> = () => {
  const router = useRouter();
  const { number } = router.query;
  const [data, setData] = useState<PageProps["data"]>([]);

  useEffect(() => {
    const fetchStoryData = async () => {
      const response = await fetch(`https://api.xdv.com/show?page=${number}`);
      const data = await response.json();
      setData(data);
    };

    if (number) {
      fetchStoryData();
    }
  }, [number]);

  if (!data) return <CenteredText>Loading...</CenteredText>;

  if (data.length === 0)
    return <CenteredText>Oops! Something went wrong :(</CenteredText>;

  const handlePageChange = (page: number) => {
    router.push(`/show/${page}`);
  };

  return (
    <Fragment>
      <Head>
        <title>{`Show HN - Page ${number}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex-1">
        {data.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
        <Pagination
          currentPage={parseInt(number as string)}
          onChangePage={handlePageChange}
          totalPages={2}
        />
      </div>
    </Fragment>
  );
};

export default ShowStoriesList;