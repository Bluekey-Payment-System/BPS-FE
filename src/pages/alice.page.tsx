import { CSVLink } from "react-csv";

const headers = [
  { label: "이름", key: "name" },
  { label: "전화번호", key: "number" },
  { label: "이메일", key: "email" },
];

const data = [
  { name: "kim", number: "12345", email: "nhy" },
  { name: "lee", number: "21555", email: "dfe" },
  { name: "park", number: "64467", email: "kih" },
];

const AlicePage = () => {
  return (
    <CSVLink
      headers={headers}
      data={data}
      filename="엑셀파일 다운로드 테스트"
      target="_blank"
    >
      Export Excel
    </CSVLink>
  );
};

export default AlicePage;
