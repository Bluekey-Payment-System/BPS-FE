// import Tooltip from "@/components/common/Tooltip/Tooltip";
import PortalRoot from "@/components/common/Tooltip/TooltipRoot";

// import Chip from "@/components/common/Chip/Chip";

const Home = () => {
  return (
    <PortalRoot
      message="이름이 매우 긴 아티스트입니다"
    >
      <div style={{ width: 100, height: 100 }}>호버해보세요</div>
    </PortalRoot>
  );
};

export default Home;
