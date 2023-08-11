import AlbumCard from "@/components/common/AlbumCard/AlbumCard";

const Home = () => {
  // 현재 next.config.js에 s3 url을 등록하지 않아, 테스트하실 거라면 albumCoverUrl을 null로 전달해주세요!
  // const imageUrl = "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/d4cd7774-0bc4-49b0-a0d9-9ddb73614bdc-20220408_155146.jpg";
  return (
    <AlbumCard albumCoverUrl={null} albumId={1} albumTitle="Great Days Great Days Great Days " accessAdmin />
  );
};

export default Home;
