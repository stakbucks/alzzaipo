import { getUserPortfolios } from "../../api/kakaoLoginApi";
import * as S from "./style";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { IPortfolio } from "./interface";
import PortfolioItem from "../../components/PortfolioItem/PortfolioItem";
function Portfolio() {
  const { data } = useQuery<IPortfolio>(["id", "portfolio"], getUserPortfolios);
  console.log(data?.data);
  return (
    <S.Wrapper>
      <S.Title>포트폴리오</S.Title>
      <S.Container>
        {data?.data.map((item) => (
          <PortfolioItem key={item.portfolioId} item={item} />
        ))}
      </S.Container>
    </S.Wrapper>
  );
}
export default Portfolio;
