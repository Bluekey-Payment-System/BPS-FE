import AlbumListSection from "@/components/album/AlbumListSection/AlbumListSection";
import { MEMBER_TYPE } from "@/types/enums/user.enum";

const AdminAlbumListPage = () => {
  return (
    <AlbumListSection userType={MEMBER_TYPE.ADMIN} />
  );
};

export default AdminAlbumListPage;
