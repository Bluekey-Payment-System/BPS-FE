import ArtistsMainLayout from "@/components/artist/ArtistsMainLayout/ArtistsMainLayout";
import ArtistsStatusTable from "@/components/artist/ArtistsStatusTable/ArtistsStatusTable";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { ITEMS_PER_ARTISTS_TABLE } from "@/constants/pagination";
import useToast from "@/hooks/useToast";
import { useArtistsStatusGet } from "@/services/queries/artists/useArtistsStatus";

const ArtistsStatusPage = () => {
  const { showToast } = useToast();
  const {
    artistsStatus, isLoading, isError, isFetching,
  } = useArtistsStatusGet(1, ITEMS_PER_ARTISTS_TABLE, "2023-08");

  if (isLoading || isFetching) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (!artistsStatus) return <div>데이터 없음</div>;

  return (
    <ArtistsMainLayout
      title="아티스트 현황"
      dropdownElement={
        <MonthPickerDropdown />
      }
      searchBarElement={(
        <SearchBar
          placeholder="검색어를 입력해주세요."
          onClick={() => { showToast("검색"); }}
        />
      )}
    >
      <ArtistsStatusTable
        artistList={artistsStatus.contents}
        paginationElement={(
          <Pagination
            activePage={1}
            totalItems={artistsStatus.totalItems}
            itemsPerPage={ITEMS_PER_ARTISTS_TABLE}
          />
        )}
      />
    </ArtistsMainLayout>
  );
};

export default ArtistsStatusPage;
