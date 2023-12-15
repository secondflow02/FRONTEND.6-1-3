import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MainPagination from './mainPagination';

const MainPage = () => {
    const [issues, setIssues] = useState([]);

    //총 이슈의 갯수 200개 추가로 구현
    const [emptyIssues, setEmptyIssues] = useState(new Array(100).fill(null));

    //itemPage를 상태로 관리하여 'n개씩보이기' 버튼 함수에 활용
    const [itemsPage, setItemsPage] = useState(10);

    const navigate = useNavigate();

    //현재 페이지
    const [currentPage, setCurrentPage] = useState(1);

    const token = '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';
    const repoOwner = 'angular';
    const repoName = 'angular-cli';
    const perPage = 200;

    // issues.map으로 div에 issues를 다 뿌려줌
    const issuesItems = issues.map(issues => {
        return (
            <Styled.Wrapper
                key={issues?.id}
                onClick={() => onDetail(issues?.id)}
            >
                <Styled.Container>
                    <h2>{issues?.title.substring(0, 30)}......</h2>
                    <p>{issues?.number}</p>
                    <div>
                        <p>{issues?.user.login}</p>
                    </div>
                </Styled.Container>
                <Styled.CtContainer>
                    <p>{issues?.body.substring(0, 150)}......</p>
                    <p>{issues?.comments}</p>
                    <p>{issues?.updated_at}</p>
                </Styled.CtContainer>
            </Styled.Wrapper>
        );
    });
    //버튼 'n개씩보이기' 이벤트 함수
    const onClickView = newItemsPage => {
        setItemsPage(newItemsPage);
    };
    // 목록 클릭시 상세보기
    const onDetail = issusId => {
        // state에 issues안에서 issue.id 와 issusId 가 같은 걸 찾아서 담는다
        navigate('/Detail/${issusId}', {
            state: {
                issueData: issues.find(issue => issue.id === issusId),
            },
        });
    };

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                // Fetch issue data
                const issuseResponse = await axios.get(
                    `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            page: currentPage,
                            per_page: perPage,
                        },
                    },
                );
                setIssues([...issuseResponse.data, ...emptyIssues.slice()]);
            } catch (error) {
                console.error('Error', error);
            }
        };
        fetchRepoData();
    }, [repoOwner, repoName, token, emptyIssues]);

    console.log(issues);

    return (
        <>
            <BtnWrapper>
                <Styled.Button>생성순</Styled.Button>
                <Styled.Button>데이트순</Styled.Button>
                <Styled.Button>댓글순</Styled.Button>
                <Styled.Button onClick={() => onClickView(10)}>
                    10개씩보기
                </Styled.Button>
                <Styled.Button onClick={() => onClickView(20)}>
                    20개씩보기
                </Styled.Button>
                <Styled.Button onClick={() => onClickView(50)}>
                    50개씩보기
                </Styled.Button>
            </BtnWrapper>
            <div>
                {issues.length > 0 ? (
                    <MainPagination items={issuesItems} itemsPage={itemsPage} />
                ) : (
                    <p>No issues</p>
                )}
            </div>
        </>
    );
};

export default MainPage;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    &:hover {
        cursor: pointer;
    }
`;
const BtnWrapper = styled.div`
    margin-left: 43%;
`;
const Button = styled.button`
    font-size: 15px;
    border-radius: 10%;
    margin: 2px;
    &:hover {
        cursor: pointer;
        color: #000;
        background-color: #ddddff;
    }
`;
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;
const CtContainer = styled.div``;

const Styled = {
    BtnWrapper,
    Button,
    Wrapper,
    Container,
    CtContainer,
};
