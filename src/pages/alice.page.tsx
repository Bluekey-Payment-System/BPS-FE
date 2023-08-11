import AlbumCard from "@/components/common/AlbumCard/AlbumCard";

const Home = () => {
  const imageUrl = "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/d4cd7774-0bc4-49b0-a0d9-9ddb73614bdc-20220408_155146.jpg";
  return (
    <AlbumCard albumCoverUrl={imageUrl} albumId={1} albumTitle="Great Days Great Days Great Days " accessAdmin />
  );
};

export default Home;
