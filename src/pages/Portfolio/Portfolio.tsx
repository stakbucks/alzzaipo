import * as S from "./style";
import * as PS from "../../styles/PageStyle";
import { useQuery } from "react-query";
import { IPortfolio, IPortfolioItem } from "./interface";
import PortfolioItem from "../../components/PortfolioComponents/PortfolioItem/PortfolioItem";
import { getUserPortfolios } from "../../apis/api/portfolioApi";
import { useRecoilValue } from "recoil";
import { loggedInInfoAtom } from "../../atoms/loggedInInfo/loggedInInfoAtom";
import { ILoggedInInfoAtom } from "../../atoms/loggedInInfo/interface";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SelectedPortfolioItem from "../../components/PortfolioComponents/PortfolioItem/SelectedPortfolioItem/SelelctedPortfolioItem";
import PortfolioAdd from "../../components/PortfolioComponents/PortfolioAddEditModal/PortfolioAdd/PortfolioAdd";
import PortfolioEdit from "../../components/PortfolioComponents/PortfolioAddEditModal/PortfolioEdit/PortfolioEdit";
import { ModalWrapper } from "../../components/PortfolioComponents/PortfolioItem/SelectedPortfolioItem/style";

function Portfolio() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<IPortfolioItem | null>();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<IPortfolioItem | null>();
  const loggedInInfo = useRecoilValue<ILoggedInInfoAtom>(loggedInInfoAtom);
  const { data } = useQuery<IPortfolio>(
    ["portfolio", loggedInInfo.data.nickname],
    getUserPortfolios,
    { staleTime: 30000 }
  );

  if (!loggedInInfo.data.status) navigate("/");

  const handleAdd = () => {
    setAdding(true);
  };
  const handleSelect = (item: IPortfolioItem) => {
    setSelected(item);
  };
  const handleUnselect = () => {
    setSelected(null);
  };

  return (
    <>
      <PS.Wrapper>
        <PS.Title>포트폴리오</PS.Title>
        <S.AddBtn onClick={handleAdd}>추가하기</S.AddBtn>
        <S.Container>
          {data?.data.map((item) => (
            <S.ItemContainer
              transition={{ duration: 0 }}
              onClick={() => handleSelect(item)}
              layoutId={item.portfolioId + ""}
              key={item.portfolioId}
            >
              <PortfolioItem item={item} />
            </S.ItemContainer>
          ))}
        </S.Container>
        {selected ? (
          <SelectedPortfolioItem
            item={selected}
            setSelected={setSelected}
            setEditing={setEditing}
          />
        ) : null}
      </PS.Wrapper>
      {adding ? <PortfolioAdd setAdding={setAdding} /> : null}
      {editing ? (
        <PortfolioEdit
          item={editing}
          setSelected={setSelected}
          setEditing={setEditing}
        />
      ) : null}
    </>
  );
}
export default Portfolio;
