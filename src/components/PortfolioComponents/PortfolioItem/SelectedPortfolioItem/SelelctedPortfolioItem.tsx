import { deletePortfolioItem } from "../../../../apis/api/portfolioApi";
import { IPortfolioItem } from "../../../../pages/Portfolio/interface";
import * as S from "./style";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { loggedInInfoAtom } from "../../../../atoms/loggedInInfo/loggedInInfoAtom";
import { useState } from "react";
import PortfolioEdit from "../../PortfolioAddEditModal/PortfolioEdit/PortfolioEdit";
function SelectedPortfolioItem({
  item,
  setSelected,
  setEditing,
}: {
  item: IPortfolioItem;
  setSelected: React.Dispatch<
    React.SetStateAction<IPortfolioItem | null | undefined>
  >;
  setEditing: React.Dispatch<
    React.SetStateAction<IPortfolioItem | null | undefined>
  >;
}) {
  const queryClient = useQueryClient();
  const loggedInInfo = useRecoilValue(loggedInInfoAtom);
  const handleEditClick = () => {
    setSelected(null);
    setEditing(item);
  };
  const handleXClicked = () => {
    setSelected(null);
  };
  const handleDeleteClick = async () => {
    await deletePortfolioItem(item);
    await queryClient.invalidateQueries([
      "portfolio",
      loggedInInfo.data.nickname,
    ]);
    setSelected(null);
  };
  return (
    <S.ModalWrapper>
      <S.Item layoutId={item.portfolioId + ""}>
        <S.ItemTitle>{item.stockName}</S.ItemTitle>
        <S.InfoWrapper>
          <S.InfoLabel>수익률: {item.profitRate}%</S.InfoLabel>
        </S.InfoWrapper>
        <S.ProfitRangeBar>
          <S.ProfitRange
            profitRate={item.profitRate > 300 ? 300 : item.profitRate}
          />
        </S.ProfitRangeBar>
        <S.InfoWrapper>
          <S.InfoLabel>청약일: </S.InfoLabel>
          <S.Info>{" " + item.subscribeStartDate}</S.Info>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.InfoLabel>상장일: </S.InfoLabel>
          <S.Info>{" " + item.subscribeEndDate}</S.Info>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.InfoLabel>증권사: </S.InfoLabel>
          <S.Info>{" " + item.agents}</S.Info>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.InfoLabel>공모가: </S.InfoLabel>
          <S.Info>{" " + item.fixedOfferingPrice}</S.Info>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.InfoLabel>수익: </S.InfoLabel>
          <S.Info>{" " + item.profit}</S.Info>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.InfoLabel>메모: </S.InfoLabel>
          <S.Info>{" " + item.memo}</S.Info>
        </S.InfoWrapper>
        <S.Btns>
          <S.Btn onClick={handleEditClick}>수정</S.Btn>
          <S.Btn onClick={handleDeleteClick}>삭제</S.Btn>
        </S.Btns>
        <S.XBtn onClick={handleXClicked}>X</S.XBtn>
      </S.Item>
    </S.ModalWrapper>
  );
}
export default SelectedPortfolioItem;
