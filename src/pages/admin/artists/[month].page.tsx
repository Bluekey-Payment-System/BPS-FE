import ArtistsMainLayout from "@/components/artist/ArtistsMainLayout/ArtistsMainLayout";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import SearchBar from "@/components/common/SearchBar/SearchBar";

const ArtistsStatusPage = () => {
  return (
    <ArtistsMainLayout
      title="아티스트 현황"
      dropdownElement={
        <MonthPickerDropdown />
    }
      searchBarElement={<SearchBar placeholder="검색어를 입력해주세요." onClick={() => { console.log("검색!"); }} />}
    >
      <div>
        아티스트 현황 테이블
      </div>
    </ArtistsMainLayout>
  );
};

export default ArtistsStatusPage;
