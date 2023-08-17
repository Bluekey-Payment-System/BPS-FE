import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import SectionLayout from "@/components/common/Layouts/SectionLayout";

const Ian = () => {
  return (
    <MainLayout title="페이지 레이아웃">
      <ArtboardLayout>
        <div style={{ width: "730px" }}>
          <SectionLayout title="위 섹션">
            <div>위 섹션 내용물</div>
          </SectionLayout>
          <SectionHr isThick />
          <SectionLayout title="아래 섹션">
            <div>아래 섹션 내용물</div>
          </SectionLayout>
        </div>
      </ArtboardLayout>
    </MainLayout>
  );
};

export default Ian;
