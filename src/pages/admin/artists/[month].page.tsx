import ArtistsMainLayout from "@/components/artist/ArtistsMainLayout/ArtistsMainLayout";
import ArtistsStatusTable from "@/components/artist/ArtistsStatusTable/ArtistsStatusTable";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { MOCK_ARTISTS } from "@/constants/mock";
import { ITEMS_PER_ARTISTS_TABLE } from "@/constants/pagination";

const ArtistsStatusPage = () => {
  // TODO: url의 pageParam을 받아 api fetch
  const mockArtists = MOCK_ARTISTS;

  return (
    <ArtistsMainLayout
      title="아티스트 현황"
      dropdownElement={
        <MonthPickerDropdown />
      }
      searchBarElement={(
        <SearchBar
          placeholder="검색어를 입력해주세요."
          onClick={() => { console.log("검색!"); }}
        />
      )}
    >
      <ArtistsStatusTable
        artistList={mockArtists.contents}
        paginationElement={(
          <Pagination
            activePage={1}
            totalItems={mockArtists.totalItems}
            itemsPerPage={ITEMS_PER_ARTISTS_TABLE}
          />
        )}
      />
    </ArtistsMainLayout>
  );
};

export default ArtistsStatusPage;
