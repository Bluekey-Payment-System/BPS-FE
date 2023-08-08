import Button from "@/components/common/CommonBtns/Button/Button";
import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";

const Ian = () => {
  return (
    <div>
      <Button size="large" theme="bright" type="button">text</Button>
      <ChipButton>비밀번호 재발급</ChipButton>
      <ChipButton size="large">아티스트 추가</ChipButton>
      <ChipButton size="large">수록곡 추가</ChipButton>
    </div>
  );
};

export default Ian;
