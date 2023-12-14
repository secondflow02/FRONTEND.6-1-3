import { useState } from 'react';
import styled from 'styled-components';

const MainPagination = ({ items, itemsPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPage = Math.ceil(items.length / itemsPage);

    const startIndex = (currentPage - 1) * itemsPage;
    const endIndex = Math.min(startIndex + itemsPage, items.length);

    const currentItems = items.slice(startIndex, endIndex);

    const handleChange = pageNum => {
        setCurrentPage(pageNum);
    };

    return (
        <>
            <Styled.Ul>
                {currentItems.map((item, index) => (
                    <Styled.Li key={index}>{item}</Styled.Li>
                ))}
            </Styled.Ul>

            <Styled.BtnWrapper>
                {Array.from({ length: totalPage }).map((_, index) => (
                    <Styled.PageBtn
                        key={index + 1}
                        onClick={() => handleChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </Styled.PageBtn>
                ))}
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
    border: 1px solid #000;
    margin-top: 10px;
    padding-left: 10px;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const PageBtn = styled.button`
    width: 40px;
    height: 40px;
    font-size: 20px;
    background-color: #ddddff;
    border-radius: 35%;
    margin: 2px;
    &:hover {
        cursor: pointer;
        color: #fff;
        background-color: #000;
    }
`;

const Styled = {
    Ul,
    Li,
    BtnWrapper,
    PageBtn,
};
