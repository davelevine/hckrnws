import { GetServerSideProps, NextPage } from "next";
import { PageProps } from "~/types/story";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CenteredText } from "~/components/Common/Fragments";
import Pagination from "~/components/Common/Pagination";

// Dynamically import StoryListItem to enable code splitting
const StoryListItem = dynamic(() => import("~/components/StoryListItem"));

const TopStoriesList: NextPage<PageProps> = (props: PageProps) => {
  const router = useRouter();
  const { number } = router.query;
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = props;

  useEffect(() => {
    if (data && data.length === 0) {
      setHasError(true);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    router.push(`/top/${page}`);
  };

  if (hasError) {
    return <CenteredText>Oops! Something went wrong :(</CenteredText>;
  }

  if (!data && !isLoading) {
    return <CenteredText>Loading...</CenteredText>;
  }

  return (
    <Fragment>
      <Head>
        <title>{`Top HN - Page ${number}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex-1">
        {data?.map((story) => (
          <StoryListItem story={story} key={story.id} />
        ))}
        <Pagination
          currentPage={parseInt(number as string)}
          onChangePage={handlePageChange}
        />
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const number = params?.number || 1;

  const TOP_BASE_URL = "https://api.xdv.com/news";
  const fetchUrl = `${TOP_BASE_URL}?page=${number}`;

  try {
    const response = await fetch(fetchUrl);
    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};

export default TopStoriesList;
