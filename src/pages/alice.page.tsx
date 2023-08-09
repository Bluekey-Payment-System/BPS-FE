/**
 * EmptyData 컴포넌트 사용 예시
 *
 * - EmptyData를 감싸는 컨테이너 요소에 flex 속성 부여해서 "alignItems: center"로 세로 정렬해야 합니다.
 */
import EmptyData from "@/components/common/EmptyData/EmptyData";

const Home = () => {
  return (
    <div style={{ backgroundColor: "lightgray", padding: "50px" }}>

      <div style={{
        backgroundColor: "white", height: 800, display: "flex", alignItems: "center",
      }}
      >
        <EmptyData type="no-search-result" />
      </div>
    </div>
  );
};

export default Home;
