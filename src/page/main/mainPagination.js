import { useRef, useState } from 'react';
import styled from 'styled-components';

const MainPagination = ({ items, itemsPage }) => {
    const [currentpage, setCurrentPage] = useState(1);

    const pageGroup = Math.ceil(currentpage / itemsPage);
    const totalpage = Math.ceil(items.length / itemsPage);

    //lastPage => 페이지 번호버튼 fix하기 위해 사용
    const lastPage = Math.min(pageGroup * itemsPage, totalpage);
    // pageGroup * itemsPage > totalpage ? totalpage : pageGroup * itemsPage;

    //firstPage =>
    const firstPage = Math.max(currentpage - (itemsPage - 1), 1);
    // currentpage - (itemsPage - 1) <= 0 ? 1 : lastPage - (itemsPage - 1);

    const startIndex = useRef(0);
    const endIndex = useRef(10);

    const currentItems = items.slice(startIndex.current, endIndex.current);

    // console.log(items.length, 'items length');
    // console.log(itemsPage, 'itemsPage');
    console.log(startIndex);
    console.log(endIndex);
    // console.log(currentItems, 'currentItems');
    // console.log(firstPage, 'firstPage');
    // console.log(lastPage, 'lastPage');
    // console.log(totalpage, 'totalPage');
    //rlaw

    const handleChange = pageNum => {
        setCurrentPage(pageNum);
        console.log(currentpage);

        startIndex.current += 10;
        endIndex.current += 10;
    };

    return (
        <>
            <Styled.Ul>
                {currentItems.map((item, index) => (
                    <Styled.Li key={index}>{item}</Styled.Li>
                ))}
            </Styled.Ul>

            <Styled.BtnWrapper>
                {Array.from({ length: totalpage }, (_, index) => index + 1).map(
                    page => (
                        <Styled.PageBtn
                            key={page}
                            onClick={() => handleChange(page)}
                        >
                            d{page}
                        </Styled.PageBtn>
                    ),
                )}
            </Styled.BtnWrapper>
        </>
    );
};
export default MainPagination;
const Ul = styled.ul`
    list-style: none;
    padding-left: 40px;
`;
const Li = styled.li`
    border-radius: 5px solid #000;
`;
const BtnWrapper = styled.div``;
const PageBtn = styled.button`
    width: 40px;
    height: 40px;
    font-size: 20px;
    background-color: #ddddff;
    border-radius: 35%;
    margin: 2px;
    &:hover {
        cursor: pointer;
        color: #000;
        background-color: #ddeeff;
    }
`;
const Styled = {
    Ul,
    Li,
    BtnWrapper,
    PageBtn,
};
