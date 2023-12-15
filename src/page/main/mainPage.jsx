import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import MainPagination from './mainPagination';

const MainPage = () => {
    const [issues, setIssues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = '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';
    const repoOwner = 'angular';
    const repoName = 'angular-cli';
    const perPage = 200;

    const issuesItems = issues.map(issues => {
        return (
            <Styled.Wrapper key={issues.id}>
                <Styled.Container>
                    <h2>{issues.title.substring(0, 30)}......</h2>
                    <p>{issues.number}</p>
                    <div>
                        <p>{issues.author_association}</p>
                    </div>
                </Styled.Container>
                <Styled.CtContainer>
                    <p>{issues.body.substring(0, 150)}......</p>
                    <p>{issues.comments}</p>
                    <p>{issues.updated_at}</p>
                </Styled.CtContainer>
            </Styled.Wrapper>
        );
    });
    //버튼 클릭시
    const onClickVew = itemsPage => {
        if (issues.length > 0) {
            itemsPage = 1;
        }
        console.log(itemsPage, 'itemsPage');
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

                setIssues(issuseResponse.data);
            } catch (error) {
                console.error('Error fetching repository data:', error);
            }
        };
        fetchRepoData();
    }, [repoOwner, repoName, token]);

    console.log(issues);

    return (
        <>
            <BtnWrapper>
                <Styled.Button>생성순</Styled.Button>
                <Styled.Button>업데이트순</Styled.Button>
                <Styled.Button>댓글순</Styled.Button>
                <Styled.Button
                    onClick={itemsPage => {
                        onClickVew(5);
                    }}
                >
                    10개씩보기
                </Styled.Button>

                <Styled.Button>20개씩보기</Styled.Button>
                <Styled.Button>50개씩보기</Styled.Button>
            </BtnWrapper>
            <div>
                {issues.length > 0 ? (
                    <MainPagination items={issuesItems} itemsPage={10} />
                ) : (
                    <p>No issues found</p>
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
