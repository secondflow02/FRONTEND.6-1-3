import { useState } from 'react';
import styled from 'styled-components';

const MainPagination = ({ items, itemsPage }) => {
    //currentPage: 현재표시된 페이지번호
    //itemsPage : 한페이지에 표시되어야하는 아이템의 갯수
    const [currentPage, setCurrentPage] = useState(1);

    const [clickBtn, setClickBtn] = useState([]);

    const totalPage = Math.ceil(items.length / itemsPage);

    //현재 페이지의 첫 번째 아이템이 전체 아이템 목록에서 몇 번째 인덱스에 위치해야 하는지를 결정??
    const startIndex = (currentPage - 1) * itemsPage;

    //마지막인덱스 = startIndex+itemPage 와 item길이중 작은값을 선택
    //=>현재페이지에서 보여야하는 아이템이 실제 아이템의 갯수를 초과하지 않도록 보장
    const endIndex = Math.min(startIndex + itemsPage, items.length);

    //현재 페이지에서 표시되어야하는 아이템들 배열
    const currentItems = items.slice(startIndex, endIndex);

    //나타내는 페이지 수를 handle하는 함수
    const handleChange = pageNum => {
        setCurrentPage(pageNum);
        //클릭 시 clickBtn에 pagenNum 전송
        setClickBtn(() => [pageNum]);
    };

    //'이전' 버튼함수
    const onPrevBtn = () => {
        if (currentPage > 1) {
            handleChange(currentPage - 1);
        }
    };

    // '다음' 버튼함수
    const onNextBtn = () => {
        if (currentPage < totalPage) {
            handleChange(currentPage + 1);
        }
    };
    return (
        <>
            <Styled.Wrapper>
                <Styled.Container>
                    <Styled.Ul>
                        {currentItems.map((item, index) => (
                            <Styled.Li key={index}>{item}</Styled.Li>
                        ))}
                    </Styled.Ul>
                </Styled.Container>
            </Styled.Wrapper>
            <Styled.BtnWrapper>
                <Styled.PageBtn onClick={onPrevBtn}>이전</Styled.PageBtn>
                {Array.from({ length: totalPage }).map((_, index) => (
                    <Styled.PageBtn
                        key={index + 1}
                        onClick={() => handleChange(index + 1)}
                        className={clickBtn.includes(index + 1) ? 'active' : ''}
                    >
                        {index + 1}
                    </Styled.PageBtn>
                ))}
                <Styled.PageBtn onClick={onNextBtn}>다음</Styled.PageBtn>
            </Styled.BtnWrapper>
        </>
    );
};
export default MainPagination;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: 800px;
    border: 1px solid #000;
`;

const Ul = styled.ul`
    margin: 0;
    width: 800px;
    margin-left: -40px;
    list-style: none;
`;

const Li = styled.li`
    border-bottom: 1px solid #000;
    margin-top: 10px;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const PageBtn = styled.button`
    width: 40px;
    height: 40px;
    font-size: 20px;
    /* background-color: #ddddff; */

    border-radius: 35%;
    margin: 2px;
    &:hover {
        cursor: pointer;
        color: #fff;
        background-color: #ddddff;
    }
    &.active {
        background-color: #ddddff;
    }
`;

const Styled = {
    Wrapper,
    Container,
    Ul,
    Li,
    BtnWrapper,
    PageBtn,
};
