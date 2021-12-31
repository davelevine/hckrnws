import { FlexColumn } from "styles/";
import { SpaceBetween } from "styles/";
import Link from "next/link";
import { TBaseStory } from "types/story";
import { styled } from "../../stitches.config";
import Meta from "./Common/Meta";
import useWindowSize from "hooks/useWindowSize";
import { Size } from "types/size";

type Props = {
  story: TBaseStory;
};

const Text = styled("span", {
  fontSize: "12px",
  marginLeft: "4px",
});

const StoryListItem: React.FC<Props> = (props: Props) => {
  const {
    story: { title, user, url, id, points, comments_count, time, domain },
  } = props;

  const size: Size = useWindowSize();

  // Assigning a number greater than the compared value, so that it defaults to false
  const isMobile = (size?.width ?? 641) < 640;

  // To hide the job posting's that have no discussions around them
  if (!user) return null;

  return (
    <Box>
      <Link href={`/stories/${id}`} passHref>
        <Title>
          {title} {isMobile && <Text>({domain})</Text>}
        </Title>
      </Link>
      <SpaceBetween>
        <FlexColumn>
          <Meta
            id={id}
            points={points}
            comments={comments_count}
            time={time}
            user={user}
            url={url}
            domain={domain}
          />
        </FlexColumn>
      </SpaceBetween>
    </Box>
  );
};

const Box = styled("div", {
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  background: "none",
  marginBottom: "8px",
  transition: "0.2s",
  borderBottom: "1px dotted",
  "&:hover": {
    background: "$hovered",
    borderRadius: "4px",
    borderColor: "transparent",
  },

  "@phone": {
    padding: "8px",
  },
});

const Title = styled("h4", {
  fontSize: "$2",
  color: "$primaryText",
  whiteSpace: "break-spaces",
  fontWeight: 500,
  cursor: "pointer",
});

export default StoryListItem;
